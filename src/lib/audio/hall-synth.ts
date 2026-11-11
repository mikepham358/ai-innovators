export type BeatPulseListener = (payload: {
  step: number;
  beatInBar: number;
  intensity: number;
}) => void;

type BrowserAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

interface ChordVoicing {
  bass: number;
  pad: number[];
  arp: number[];
}

// Chill futuristic A-minor9 -> F-maj9 -> D-minor9 -> E-min7 progression
const PROGRESSION: ChordVoicing[] = [
  {
    bass: 110.0, // A2
    pad: [220.0, 261.63, 329.63, 392.0, 493.88],
    arp: [523.25, 659.25, 783.99, 987.77],
  },
  {
    bass: 87.31, // F2
    pad: [174.61, 261.63, 329.63, 392.0, 440.0],
    arp: [440.0, 523.25, 659.25, 783.99],
  },
  {
    bass: 73.42, // D2
    pad: [146.83, 261.63, 329.63, 349.23, 440.0],
    arp: [440.0, 587.33, 659.25, 880.0],
  },
  {
    bass: 82.41, // E2
    pad: [164.81, 246.94, 293.66, 392.0, 493.88],
    arp: [493.88, 587.33, 783.99, 987.77],
  },
];

// Syncopated 16-step groove patterns
const KICK_STEPS = new Set([0, 7, 10]);
const SNARE_STEPS = new Set([4, 12]);
const HAT_LEVELS = [
  0.08, 0.03, 0.12, 0.04, 0.07, 0.03, 0.14, 0.05, 0.08, 0.03, 0.13, 0.04, 0.07,
  0.05, 0.16, 0.06,
];
const ARP_STEPS: Record<number, number> = {
  0: 0,
  3: 1,
  6: 2,
  10: 3,
  13: 1,
  14: 2,
};

export interface SynthStartOptions {
  startLevel?: number;
  targetLevel?: number;
  rampSeconds?: number;
}

export class HallSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delaySend: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private timerId: number | null = null;
  private pauseTimeoutId: number | null = null;

  private isPlayingState = false;
  private isArmed = false;
  private bpm = 108;
  private currentStep = 0;
  private barIndex = 0;
  private nextNoteTime = 0;
  private listener: BeatPulseListener | null = null;
  private playStateListener: ((playing: boolean) => void) | null = null;

  private pendingStartLevel = 0.2;
  private pendingTargetLevel = 0.8;
  private pendingRampSeconds = 10;

  private rampStartVal = 0.2;
  private rampTargetVal = 0.8;
  private rampDurationSec = 10;
  private rampStartTime = 0;

  public onBeat(listener: BeatPulseListener | null) {
    this.listener = listener;
  }

  public onPlayStateChange(listener: ((playing: boolean) => void) | null) {
    this.playStateListener = listener;
  }

  public setBpm(nextBpm: number) {
    this.bpm = Math.max(70, Math.min(140, nextBpm));
  }

  public getIsPlaying(): boolean {
    return this.isPlayingState;
  }

  public getVolumePercent(): number {
    if (!this.isPlayingState) return 0;
    if (!this.ctx || this.rampDurationSec <= 0) {
      return Math.round(this.rampTargetVal * 100);
    }
    const elapsed = Math.max(0, this.ctx.currentTime - this.rampStartTime);
    const progress = Math.min(1, elapsed / this.rampDurationSec);
    const currentVal =
      this.rampStartVal + (this.rampTargetVal - this.rampStartVal) * progress;
    return Math.round(currentVal * 100);
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const audioWin = window as BrowserAudioWindow;
      const AudioCtor = window.AudioContext ?? audioWin.webkitAudioContext;
      if (!AudioCtor) return null;

      const ctx = new AudioCtor();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);

      // Gentle master glue compressor calibrated for up to 80% output gain
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-12, ctx.currentTime);
      compressor.knee.setValueAtTime(18, ctx.currentTime);
      compressor.ratio.setValueAtTime(2.8, ctx.currentTime);
      compressor.attack.setValueAtTime(0.008, ctx.currentTime);
      compressor.release.setValueAtTime(0.18, ctx.currentTime);

      master.connect(compressor);
      compressor.connect(ctx.destination);

      // Airy stereo-feel dotted delay bus for synth keys and sparkles
      const delay = ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.36, ctx.currentTime);
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.28, ctx.currentTime);
      const delayTone = ctx.createBiquadFilter();
      delayTone.type = "lowpass";
      delayTone.frequency.setValueAtTime(2200, ctx.currentTime);
      const delayReturn = ctx.createGain();
      delayReturn.gain.setValueAtTime(0.32, ctx.currentTime);

      delay.connect(delayTone);
      delayTone.connect(feedback);
      feedback.connect(delay);
      delayTone.connect(delayReturn);
      delayReturn.connect(master);

      const delaySend = ctx.createGain();
      delaySend.gain.setValueAtTime(1.0, ctx.currentTime);
      delaySend.connect(delay);

      // Shared white-noise buffer for hi-hats & rimshot snare
      const sampleRate = ctx.sampleRate;
      const buffer = ctx.createBuffer(1, sampleRate * 0.4, sampleRate);
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < channel.length; i += 1) {
        channel[i] = Math.random() * 2 - 1;
      }

      this.ctx = ctx;
      this.masterGain = master;
      this.delaySend = delaySend;
      this.noiseBuffer = buffer;

      // Start immediately whenever the browser hardware stream finishes waking up to "running"
      ctx.addEventListener("statechange", () => {
        if (
          (ctx.state as AudioContextState) === "running" &&
          this.isArmed &&
          !this.isPlayingState
        ) {
          this.beginPlaybackNow();
        }
      });
    }

    return this.ctx;
  }

  private beginPlaybackNow() {
    if (
      !this.ctx ||
      !this.masterGain ||
      (this.ctx.state as AudioContextState) !== "running" ||
      !this.isArmed ||
      this.isPlayingState
    ) {
      return;
    }

    const clampedStart = Math.max(0.0001, Math.min(1, this.pendingStartLevel));
    const clampedTarget = Math.max(0.0001, Math.min(1, this.pendingTargetLevel));
    const safeRamp = Math.max(0, this.pendingRampSeconds);

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(clampedStart, now);
    if (safeRamp > 0.02) {
      this.masterGain.gain.linearRampToValueAtTime(
        clampedTarget,
        now + safeRamp,
      );
    } else {
      this.masterGain.gain.setValueAtTime(clampedTarget, now);
    }

    this.rampStartVal = clampedStart;
    this.rampTargetVal = clampedTarget;
    this.rampDurationSec = safeRamp;
    this.rampStartTime = now;

    this.isPlayingState = true;
    this.nextNoteTime = now + 0.04;
    this.timerId = window.setInterval(() => this.scheduler(), 25);

    const cb = this.playStateListener;
    if (cb) {
      queueMicrotask(() => {
        if (this.isPlayingState) {
          cb(true);
        }
      });
    }
  }

  public nudgeResume(): boolean {
    if (!this.isArmed) return false;
    const ctx = this.ensureContext();
    if (!ctx) return false;

    if ((ctx.state as AudioContextState) === "running") {
      this.beginPlaybackNow();
      return this.isPlayingState;
    }

    if (ctx.state === "suspended") {
      void ctx
        .resume()
        .then(() => {
          if (
            (ctx.state as AudioContextState) === "running" &&
            this.isArmed &&
            !this.isPlayingState
          ) {
            this.beginPlaybackNow();
          }
        })
        .catch(() => undefined);
    }

    return false;
  }

  public async startOrResume(
    options: SynthStartOptions = {},
  ): Promise<boolean> {
    const {
      startLevel = 0.2,
      targetLevel = 0.8,
      rampSeconds = 10,
    } = options;

    this.pendingStartLevel = startLevel;
    this.pendingTargetLevel = targetLevel;
    this.pendingRampSeconds = rampSeconds;
    this.isArmed = true;

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return false;

    if (this.pauseTimeoutId !== null) {
      window.clearTimeout(this.pauseTimeoutId);
      this.pauseTimeoutId = null;
    }

    if ((ctx.state as AudioContextState) === "running") {
      if (this.isPlayingState) {
        // Re-apply ramp cleanly if already running (e.g. unpausing)
        const now = ctx.currentTime;
        const clampedStart = Math.max(0.0001, Math.min(1, startLevel));
        const clampedTarget = Math.max(0.0001, Math.min(1, targetLevel));
        const safeRamp = Math.max(0, rampSeconds);
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(clampedStart, now);
        if (safeRamp > 0.02) {
          this.masterGain.gain.linearRampToValueAtTime(
            clampedTarget,
            now + safeRamp,
          );
        } else {
          this.masterGain.gain.setValueAtTime(clampedTarget, now);
        }
        this.rampStartVal = clampedStart;
        this.rampTargetVal = clampedTarget;
        this.rampDurationSec = safeRamp;
        this.rampStartTime = now;
        return true;
      }
      this.beginPlaybackNow();
      return true;
    }

    // Resume without arbitrary timeout: statechange + .then() start audio the instant hardware wakes up
    try {
      await ctx.resume();
    } catch {
      return false;
    }

    if ((ctx.state as AudioContextState) === "running" && this.isArmed) {
      this.beginPlaybackNow();
      return true;
    }

    return false;
  }

  public pause() {
    this.isArmed = false;
    if (!this.isPlayingState) return;
    this.isPlayingState = false;
    this.playStateListener?.(false);

    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    const ctx = this.ctx;
    const master = this.masterGain;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.14);

      this.pauseTimeoutId = window.setTimeout(() => {
        if (!this.isPlayingState && this.ctx?.state === "running") {
          void this.ctx.suspend();
        }
      }, 170);
    }
  }

  public dispose() {
    this.pause();
    if (this.pauseTimeoutId !== null) {
      window.clearTimeout(this.pauseTimeoutId);
      this.pauseTimeoutId = null;
    }
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.masterGain = null;
    this.delaySend = null;
    this.noiseBuffer = null;
    this.listener = null;
  }

  private scheduler() {
    if (!this.ctx || !this.isPlayingState) return;
    const scheduleAheadTime = 0.14;

    while (this.nextNoteTime < this.ctx.currentTime + scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.barIndex, this.nextNoteTime);
      this.advanceStep();
    }
  }

  private advanceStep() {
    const secondsPerBeat = 60 / this.bpm;
    const sixteenth = secondsPerBeat / 4;
    // Slight chill swing on odd 16th steps for organic groove
    const swingOffset =
      this.currentStep % 2 === 1 ? -sixteenth * 0.08 : sixteenth * 0.08;
    this.nextNoteTime += sixteenth + swingOffset;

    this.currentStep += 1;
    if (this.currentStep >= 16) {
      this.currentStep = 0;
      this.barIndex = (this.barIndex + 1) % PROGRESSION.length;
    }
  }

  private scheduleStep(step: number, bar: number, time: number) {
    const chord = PROGRESSION[bar];
    let pulseIntensity = 0.16;

    if (KICK_STEPS.has(step)) {
      this.triggerKick(time, step === 0 ? 1.0 : 0.72);
      pulseIntensity = step === 0 ? 1.0 : 0.78;
    }

    if (SNARE_STEPS.has(step)) {
      this.triggerSnare(time);
      pulseIntensity = Math.max(pulseIntensity, 0.82);
    }

    const hatLevel = HAT_LEVELS[step] ?? 0.05;
    if (hatLevel > 0) {
      this.triggerHiHat(time, hatLevel, step % 4 === 2);
      pulseIntensity = Math.max(pulseIntensity, step % 4 === 2 ? 0.54 : 0.28);
    }

    // Warm Electric Piano / Synth Pad Swell on bar start & syncopated step 6
    if (step === 0 || step === 6) {
      const duration = step === 0 ? 1.35 : 0.9;
      const gain = step === 0 ? 0.095 : 0.055;
      this.triggerWarmChord(time, chord.pad, duration, gain);
      this.triggerSubBass(time, chord.bass, step === 0 ? 0.85 : 0.55);
      pulseIntensity = Math.max(pulseIntensity, step === 0 ? 0.96 : 0.64);
    }

    // Deep sub bass pulse on step 10 to lock groove with kick
    if (step === 10) {
      this.triggerSubBass(time, chord.bass * 1.5, 0.35);
    }

    // Airy Pentatonic Sparkle Arpeggio
    if (step in ARP_STEPS) {
      const noteFreq = chord.arp[ARP_STEPS[step] % chord.arp.length];
      this.triggerSparkle(time, noteFreq);
      pulseIntensity = Math.max(pulseIntensity, 0.62);
    }

    // Dispatch beat event cleanly timed to audio clock
    if (this.ctx && this.listener) {
      const delayMs = Math.max(0, (time - this.ctx.currentTime) * 1000);
      const beatInBar = Math.floor(step / 4);
      const listener = this.listener;
      window.setTimeout(() => {
        if (this.isPlayingState) {
          listener({ step, beatInBar, intensity: pulseIntensity });
        }
      }, delayMs);
    }
  }

  private triggerKick(time: number, accent: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(126, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.44 * accent, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  private triggerSnare(time: number) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    // Crisp filtered noise snap
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1850, time);
    filter.Q.setValueAtTime(1.1, time);

    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.14, time);
    nGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.13);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.masterGain);
    if (this.delaySend) {
      const wet = this.ctx.createGain();
      wet.gain.setValueAtTime(0.16, time);
      nGain.connect(wet);
      wet.connect(this.delaySend);
    }
    noise.start(time);
    noise.stop(time + 0.15);

    // Woody rimshot fundamental
    const body = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    body.type = "triangle";
    body.frequency.setValueAtTime(215, time);
    body.frequency.exponentialRampToValueAtTime(125, time + 0.065);
    bGain.gain.setValueAtTime(0.12, time);
    bGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
    body.connect(bGain);
    bGain.connect(this.masterGain);
    body.start(time);
    body.stop(time + 0.09);
  }

  private triggerHiHat(time: number, level: number, open: boolean) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(7600, time);

    const gain = this.ctx.createGain();
    const decay = open ? 0.14 : 0.045;
    gain.gain.setValueAtTime(level, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
    noise.stop(time + decay + 0.02);
  }

  private triggerSubBass(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(340, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.22, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + duration + 0.03);
  }

  private triggerWarmChord(
    time: number,
    frequencies: number[],
    duration: number,
    gainAmount: number,
  ) {
    if (!this.ctx || !this.masterGain) return;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1650, time);
    filter.frequency.exponentialRampToValueAtTime(760, time + duration);

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gainAmount, time + 0.045);
    env.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    filter.connect(env);
    env.connect(this.masterGain);
    if (this.delaySend) {
      const wet = this.ctx.createGain();
      wet.gain.setValueAtTime(0.35, time);
      env.connect(wet);
      wet.connect(this.delaySend);
    }

    for (let i = 0; i < frequencies.length; i += 1) {
      const osc = this.ctx.createOscillator();
      osc.type = i % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(frequencies[i], time);
      osc.detune.setValueAtTime(i % 2 === 0 ? -5 : 6, time);
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    }
  }

  private triggerSparkle(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.058, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.26);

    osc.connect(gain);
    gain.connect(this.masterGain);
    if (this.delaySend) {
      const wet = this.ctx.createGain();
      wet.gain.setValueAtTime(0.55, time);
      gain.connect(wet);
      wet.connect(this.delaySend);
    }

    osc.start(time);
    osc.stop(time + 0.3);
  }
}

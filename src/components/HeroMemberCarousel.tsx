"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  Crown,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DIVISION_BADGE_CLASSES,
  MemberSpotlightModal,
} from "@/components/MemberSpotlightModal";
import {
  getMemberRankLabel,
  MemberRankIcon,
} from "@/components/MemberRankBadge";
import {
  ALL_DIVISION_META,
  TEAM_MEMBERS,
  type DivisionAccent,
  type DivisionCode,
  type TeamMember,
} from "@/data/club-data";
import { HallSynthEngine } from "@/lib/audio/hall-synth";

// Division-complete runway order: PM -> DOT -> PR -> ER -> LOG -> HR
// Keeps each Head/Co-Head paired consecutively with every member of their division (29 total)
const ORDERED_HERO_MEMBERS: TeamMember[] = [...TEAM_MEMBERS];

const EQUALIZER_WEIGHTS = [0.55, 0.95, 0.72, 1.0, 0.64];

interface CarouselTrackGroupProps {
  members: TeamMember[];
  accentByCode: Record<DivisionCode, DivisionAccent>;
  onSelect: (member: TeamMember) => void;
  isDuplicate?: boolean;
}

function CarouselTrackGroup({
  members,
  accentByCode,
  onSelect,
  isDuplicate = false,
}: CarouselTrackGroupProps) {
  return (
    <div
      aria-hidden={isDuplicate || undefined}
      className="flex shrink-0 items-stretch gap-3.5 pr-3.5 sm:gap-4 sm:pr-4"
    >
      {members.map((member) => {
        const isLeader = member.tier !== "member";
        const badgeStyle =
          DIVISION_BADGE_CLASSES[accentByCode[member.divisionCode]];

        return (
          <button
            key={`${isDuplicate ? "dup" : "main"}-${member.id}`}
            type="button"
            tabIndex={isDuplicate ? -1 : 0}
            onClick={() => onSelect(member)}
            aria-label={
              isDuplicate
                ? undefined
                : `Xem hồ sơ ${member.name} - ${member.role}`
            }
            className={`group mirror-card ${
              isLeader ? "mirror-card-executive" : ""
            } flex w-[148px] shrink-0 flex-col overflow-hidden rounded-2xl text-left transition duration-300 hover:-translate-y-1.5 sm:w-[168px] md:w-[186px]`}
          >
            <div className="mirror-frame relative aspect-[1587/2245] w-full overflow-hidden rounded-t-[15px] border-x-0 border-t-0 bg-[#06091e]">
              <Image
                src={member.imageSrc}
                alt={isDuplicate ? "" : `${member.name} - ${member.role}`}
                fill
                sizes="(max-width: 640px) 150px, 190px"
                loading="eager"
                decoding="async"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div aria-hidden="true" className="mirror-glint absolute inset-0" />
              <div
                aria-hidden="true"
                className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between border-t border-white/15 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent px-3 py-2.5">
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider ${badgeStyle}`}
                >
                  <MemberRankIcon
                    member={member}
                    className="h-2.5 w-2.5 shrink-0"
                  />
                  {member.divisionCode}
                </span>
                <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-wider text-slate-200/85">
                  {getMemberRankLabel(member)}
                </span>
              </div>

              <div className="mt-1.5">
                <p className="truncate font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-wide text-white sm:text-[13px]">
                  {member.name}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-blue-200/85">
                  {member.roleVi}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function HeroMemberCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [slowMode, setSlowMode] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [userMuted, setUserMuted] = useState(false);
  const [pendingAutoBeat, setPendingAutoBeat] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const engineRef = useRef<HallSynthEngine | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const beatButtonRef = useRef<HTMLButtonElement | null>(null);
  const pauseButtonRef = useRef<HTMLButtonElement | null>(null);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const decayTimerRef = useRef<number | null>(null);
  const userMutedRef = useRef(false);
  const isPausedRef = useRef(false);
  const hasAutoStartedRef = useRef(false);

  const { divisionByCode, accentByCode } = useMemo(() => {
    const divMap = {} as Record<DivisionCode, (typeof ALL_DIVISION_META)[number]>;
    const accMap = {} as Record<DivisionCode, DivisionAccent>;
    for (const div of ALL_DIVISION_META) {
      divMap[div.code] = div;
      accMap[div.code] = div.accent;
    }
    return { divisionByCode: divMap, accentByCode: accMap };
  }, []);

  const resetVisualBars = useCallback(() => {
    if (stageRef.current) {
      stageRef.current.style.setProperty("--beat-energy", "0");
    }
    for (const bar of barRefs.current) {
      if (bar) {
        bar.style.transform = "scaleY(0.28)";
      }
    }
  }, []);

  const ensureEngine = useCallback(() => {
    if (!engineRef.current) {
      const engine = new HallSynthEngine();
      engine.onBeat(({ step, intensity }) => {
        if (stageRef.current) {
          stageRef.current.style.setProperty(
            "--beat-energy",
            intensity.toFixed(2),
          );
        }

        barRefs.current.forEach((bar, index) => {
          if (!bar) return;
          const phaseOffset = ((step + index * 3) % 5) / 4;
          const level = Math.min(
            1,
            Math.max(
              0.24,
              0.25 + intensity * EQUALIZER_WEIGHTS[index] * (0.65 + phaseOffset * 0.45),
            ),
          );
          bar.style.transform = `scaleY(${level.toFixed(2)})`;
        });

        if (decayTimerRef.current !== null) {
          window.clearTimeout(decayTimerRef.current);
        }
        decayTimerRef.current = window.setTimeout(() => {
          if (stageRef.current) {
            stageRef.current.style.setProperty("--beat-energy", "0.18");
          }
          for (const bar of barRefs.current) {
            if (bar) {
              bar.style.transform = "scaleY(0.32)";
            }
          }
        }, 145);
      });
      engineRef.current = engine;
    }
    return engineRef.current;
  }, []);

  // Default beat ON when opening the web at constant 50% volume
  // Works synchronously on mount AND catches late AudioContext wakeup + every valid user gesture
  useEffect(() => {
    let active = true;
    const unlockEvents = [
      "pointerdown",
      "mousedown",
      "pointerup",
      "mouseup",
      "touchend",
      "click",
      "keydown",
    ] as const;

    const detachUnlock = () => {
      for (const evt of unlockEvents) {
        window.removeEventListener(evt, handleFirstGesture, true);
      }
    };

    const engine = ensureEngine();
    engine.setBpm(108);

    engine.onPlayStateChange((playing) => {
      if (!active) return;
      if (playing) {
        hasAutoStartedRef.current = true;
        setMusicPlaying(true);
        setPendingAutoBeat(false);
        detachUnlock();
      } else {
        setMusicPlaying(false);
      }
    });

    function handleFirstGesture(event: Event) {
      if (userMutedRef.current || isPausedRef.current || hasAutoStartedRef.current) {
        detachUnlock();
        return;
      }
      const target = event.target;
      if (
        target instanceof Node &&
        (beatButtonRef.current?.contains(target) ||
          pauseButtonRef.current?.contains(target))
      ) {
        // Explicit button clicks handle toggle directly without double-firing
        return;
      }
      engine.nudgeResume();
    }

    function handleVisibilityOrPageShow() {
      if (
        document.visibilityState === "visible" &&
        !userMutedRef.current &&
        !isPausedRef.current &&
        !engine.getIsPlaying()
      ) {
        engine.nudgeResume();
      }
    }

    for (const evt of unlockEvents) {
      window.addEventListener(evt, handleFirstGesture, {
        capture: true,
        passive: true,
      });
    }
    document.addEventListener("visibilitychange", handleVisibilityOrPageShow);
    window.addEventListener("pageshow", handleVisibilityOrPageShow);

    // Arm and start at steady 50% volume right on page mount
    void engine.startOrResume({
      startLevel: 0.5,
      targetLevel: 0.5,
      rampSeconds: 0,
    });

    return () => {
      active = false;
      detachUnlock();
      document.removeEventListener("visibilitychange", handleVisibilityOrPageShow);
      window.removeEventListener("pageshow", handleVisibilityOrPageShow);
      if (decayTimerRef.current !== null) {
        window.clearTimeout(decayTimerRef.current);
      }
      engineRef.current?.onPlayStateChange(null);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [ensureEngine]);

  async function startMusicIfAllowed(bpm: number, forceUnmute = false) {
    if (!forceUnmute && userMutedRef.current) return;
    const engine = ensureEngine();
    engine.setBpm(bpm);
    const started = await engine.startOrResume({
      startLevel: 0.5,
      targetLevel: 0.5,
      rampSeconds: 0,
    });
    if (started) {
      hasAutoStartedRef.current = true;
      setMusicPlaying(true);
      setPendingAutoBeat(false);
    }
  }

  function stopMusic() {
    engineRef.current?.pause();
    setMusicPlaying(false);
    resetVisualBars();
  }

  function handleToggleMusic() {
    if (musicPlaying) {
      userMutedRef.current = true;
      setUserMuted(true);
      setPendingAutoBeat(false);
      stopMusic();
      return;
    }

    userMutedRef.current = false;
    setUserMuted(false);
    if (isPaused) {
      isPausedRef.current = false;
      setIsPaused(false);
    }
    const bpm = slowMode ? 84 : 108;
    void startMusicIfAllowed(bpm, true);
  }

  function handleToggleTempo() {
    const nextSlow = !slowMode;
    setSlowMode(nextSlow);
    const nextBpm = nextSlow ? 84 : 108;
    engineRef.current?.setBpm(nextBpm);
    if (!isPaused && !userMuted) {
      void startMusicIfAllowed(nextBpm);
    }
  }

  function handleTogglePlayPause() {
    if (isPaused) {
      // Resume carousel & music smoothly on beat
      isPausedRef.current = false;
      setIsPaused(false);
      if (!userMuted) {
        void startMusicIfAllowed(slowMode ? 84 : 108);
      }
    } else {
      // Pause carousel & fade/pause beat cleanly
      isPausedRef.current = true;
      setIsPaused(true);
      stopMusic();
    }
  }

  function handleSelectMember(member: TeamMember) {
    setSelectedMember(member);
    if (!isPaused && !userMuted && !musicPlaying) {
      void startMusicIfAllowed(slowMode ? 84 : 108);
    }
  }

  const currentBpm = slowMode ? 84 : 108;
  const trackStyle = {
    "--marquee-duration": slowMode ? "84s" : "56s",
  } as CSSProperties;

  return (
    <div
      ref={stageRef}
      style={{ "--beat-energy": "0" } as CSSProperties}
      className="relative border-t border-white/10 bg-gradient-to-b from-indigo-950/30 via-[#050718]/80 to-[#050718] pb-6 pt-5 sm:pb-8 sm:pt-6"
    >
      {/* Beat-Synced Ambient Runway Spotlight */}
      <div
        aria-hidden="true"
        style={{
          opacity: "calc(0.45 + var(--beat-energy, 0) * 0.55)",
          transform: "scaleY(calc(1 + var(--beat-energy, 0) * 0.16))",
        }}
        className="pointer-events-none absolute inset-x-0 top-0 h-44 origin-top bg-[radial-gradient(ellipse_62%_100%_at_50%_0%,rgba(129,140,248,0.22),transparent_72%)] transition-[opacity,transform] duration-150 ease-out"
      />

      {/* Editorial Hall of Innovators Header Bar */}
      <div className="relative flex w-full flex-wrap items-center justify-between gap-3 px-4 pb-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            style={{
              boxShadow:
                "0 0 calc(20px + var(--beat-energy, 0) * 18px) rgba(129, 140, 248, calc(0.2 + var(--beat-energy, 0) * 0.35))",
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/30 bg-gradient-to-r from-slate-200/15 via-indigo-400/20 to-fuchsia-400/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-shadow duration-150"
          >
            <Crown className="h-3.5 w-3.5 text-indigo-200" />
            HALL OF INNOVATORS • GEN 1.0
          </span>
          <p className="text-xs font-medium text-slate-200 sm:text-sm">
            Tự hào{" "}
            <strong className="text-white">{ORDERED_HERO_MEMBERS.length}</strong>{" "}
            gương mặt kiến tạo AI Vinschool Grand Park
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Interactive Runway Synth Beat Control + Live Equalizer */}
          <button
            ref={beatButtonRef}
            type="button"
            onClick={handleToggleMusic}
            aria-label={
              musicPlaying
                ? "Tạm tắt nhạc nền theo nhịp Hall of Innovators"
                : "Bật nhạc nền theo nhịp Hall of Innovators"
            }
            className={`group inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-semibold transition ${
              musicPlaying || (pendingAutoBeat && !userMuted)
                ? "border-cyan-300/45 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-fuchsia-500/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.22)] hover:brightness-110"
                : "border-white/15 bg-white/[0.05] text-slate-200 hover:border-cyan-300/40 hover:bg-white/10 hover:text-white"
            }`}
          >
            {musicPlaying ? (
              <Volume2 className="h-3.5 w-3.5 text-cyan-300" />
            ) : pendingAutoBeat && !userMuted ? (
              <Volume2 className="h-3.5 w-3.5 animate-pulse text-cyan-300" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-200" />
            )}

            {/* 5-Bar Live Equalizer Synced to Web Audio Beat */}
            <span
              aria-hidden="true"
              className="flex h-3.5 items-end gap-[2px]"
            >
              {EQUALIZER_WEIGHTS.map((_, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    barRefs.current[index] = el;
                  }}
                  style={{ transform: "scaleY(0.28)" }}
                  className={`h-full w-[2.5px] origin-bottom rounded-full transition-transform duration-100 ${
                    musicPlaying
                      ? index % 2 === 0
                        ? "bg-cyan-300"
                        : "bg-fuchsia-300"
                      : pendingAutoBeat && !userMuted
                        ? "animate-pulse bg-cyan-300/80"
                        : "bg-slate-500"
                  }`}
                />
              ))}
            </span>

            <span>
              {userMuted ? "Đã tắt nhạc" : `Beat ${currentBpm} BPM • 50%`}
            </span>
          </button>

          <button
            type="button"
            onClick={handleToggleTempo}
            className="hidden rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-white/30 hover:text-white sm:inline-flex"
          >
            {slowMode ? "Nhịp: Thư thái (84 BPM)" : "Nhịp: Tiêu chuẩn (108 BPM)"}
          </button>

          <button
            ref={pauseButtonRef}
            type="button"
            onClick={handleTogglePlayPause}
            aria-label={isPaused ? "Chạy tiếp carousel và nhạc" : "Tạm dừng carousel và nhạc"}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
          >
            {isPaused ? (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-300" />
                <span>Chạy tiếp</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-blue-200" />
                <span>Tạm dừng</span>
              </>
            )}
          </button>

          <Link
            href="#divisions"
            className="inline-flex items-center gap-1 rounded-lg border border-fuchsia-300/30 bg-fuchsia-500/15 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/25"
          >
            <span>5 Phân Ban</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Beat-Reactive Top Titanium Hairline */}
      <div
        aria-hidden="true"
        style={{
          opacity: "calc(0.45 + var(--beat-energy, 0) * 0.55)",
        }}
        className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent transition-opacity duration-150"
      />

      {/* Panoramic Obsidian Mirror Runway */}
      <div className="hero-marquee-stage hero-marquee-mask relative overflow-hidden py-2">
        <div
          className="hero-marquee-track"
          data-paused={isPaused || Boolean(selectedMember)}
          style={trackStyle}
        >
          <CarouselTrackGroup
            members={ORDERED_HERO_MEMBERS}
            accentByCode={accentByCode}
            onSelect={handleSelectMember}
          />
          <CarouselTrackGroup
            members={ORDERED_HERO_MEMBERS}
            accentByCode={accentByCode}
            onSelect={handleSelectMember}
            isDuplicate
          />
        </div>
      </div>

      {/* Beat-Reactive Mirrored Floor Ambient Glow */}
      <div
        aria-hidden="true"
        style={{
          opacity: "calc(0.4 + var(--beat-energy, 0) * 0.6)",
        }}
        className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-indigo-200/45 to-transparent transition-opacity duration-150"
      />
      <div
        aria-hidden="true"
        style={{
          opacity: "calc(0.3 + var(--beat-energy, 0) * 0.7)",
        }}
        className="h-4 w-full bg-gradient-to-b from-indigo-400/18 to-transparent blur-sm transition-opacity duration-150"
      />

      <MemberSpotlightModal
        member={selectedMember}
        membersList={ORDERED_HERO_MEMBERS}
        division={
          selectedMember
            ? divisionByCode[selectedMember.divisionCode]
            : undefined
        }
        onClose={() => setSelectedMember(null)}
        onSelect={setSelectedMember}
      />
    </div>
  );
}

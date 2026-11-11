"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  driftX: number;
  driftY: number;
  color: string;
  isDiamond: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  life: number;
  maxLife: number;
  hueColor: string;
  glowColor: string;
}

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const STAR_PALETTE = [
  "255, 255, 255", // Pearl white
  "224, 242, 254", // Cool ice blue
  "237, 233, 254", // Soft lavender
  "252, 231, 243", // Champagne rose
  "186, 230, 253", // Sapphire tint
];

const METEOR_THEMES = [
  { hue: "224, 242, 254", glow: "56, 189, 248" },   // Celestial cyan-pearl
  { hue: "245, 208, 254", glow: "217, 70, 239" },   // Subtle orchid-magenta
  { hue: "255, 255, 255", glow: "199, 210, 254" },  // Pure diamond silver
  { hue: "221, 214, 254", glow: "139, 92, 246" },   // Royal violet mist
];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function buildStars(width: number, height: number): Star[] {
  const area = width * height;
  const count = Math.min(135, Math.max(58, Math.round(area / 16500)));
  const stars: Star[] = [];

  for (let i = 0; i < count; i += 1) {
    const tierRoll = Math.random();
    const isDiamond = tierRoll > 0.91;
    const radius = isDiamond
      ? randomBetween(1.15, 1.85)
      : tierRoll > 0.62
        ? randomBetween(0.75, 1.35)
        : randomBetween(0.35, 0.85);

    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius,
      baseAlpha: isDiamond
        ? randomBetween(0.45, 0.78)
        : randomBetween(0.18, 0.62),
      twinkleSpeed: randomBetween(0.45, 1.55),
      phase: Math.random() * Math.PI * 2,
      driftX: randomBetween(-3.2, -0.6),
      driftY: randomBetween(0.2, 1.4),
      color: STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)],
      isDiamond,
    });
  }

  return stars;
}

function createShootingStar(width: number, height: number): ShootingStar {
  const theme = METEOR_THEMES[Math.floor(Math.random() * METEOR_THEMES.length)];
  const fromTopEdge = Math.random() < 0.72;
  const startX = fromTopEdge
    ? randomBetween(width * 0.14, width * 1.06)
    : randomBetween(width * 0.78, width * 1.08);
  const startY = fromTopEdge
    ? randomBetween(-30, height * 0.24)
    : randomBetween(height * 0.06, height * 0.48);

  // Diagonal luxury glide: top-right toward bottom-left (~142 deg to ~158 deg)
  const angleRad = (randomBetween(140, 158) * Math.PI) / 180;
  const speed = randomBetween(540, 880);

  return {
    x: startX,
    y: startY,
    vx: Math.cos(angleRad) * speed,
    vy: Math.sin(angleRad) * speed,
    length: randomBetween(115, 220),
    width: randomBetween(1.2, 2.0),
    life: 0,
    maxLife: randomBetween(0.95, 1.65),
    hueColor: theme.hue,
    glowColor: theme.glow,
  };
}

export function CosmicGalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = buildStars(width, height);
    const meteors: ShootingStar[] = [];
    const dustMotes: DustMote[] = [];

    let nextMeteorDelay = randomBetween(0.8, 1.6);
    let elapsed = 0;
    let lastTimestamp = performance.now();
    let rafId = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = buildStars(width, height);
    };

    const drawNebulaVeil = (timeSec: number) => {
      // Soft slow-breathing cosmic depth accents
      const driftA = Math.sin(timeSec * 0.08) * 32;
      const driftB = Math.cos(timeSec * 0.06) * 28;

      const gradCyan = ctx.createRadialGradient(
        width * 0.18 + driftA,
        height * 0.22 + driftB * 0.5,
        0,
        width * 0.18 + driftA,
        height * 0.22 + driftB * 0.5,
        Math.max(width, height) * 0.42,
      );
      gradCyan.addColorStop(0, "rgba(56, 189, 248, 0.048)");
      gradCyan.addColorStop(0.55, "rgba(30, 58, 138, 0.022)");
      gradCyan.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradCyan;
      ctx.fillRect(0, 0, width, height);

      const gradOrchid = ctx.createRadialGradient(
        width * 0.84 - driftB,
        height * 0.34 + driftA * 0.6,
        0,
        width * 0.84 - driftB,
        height * 0.34 + driftA * 0.6,
        Math.max(width, height) * 0.38,
      );
      gradOrchid.addColorStop(0, "rgba(192, 132, 252, 0.045)");
      gradOrchid.addColorStop(0.5, "rgba(168, 85, 247, 0.018)");
      gradOrchid.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradOrchid;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStar = (star: Star, timeSec: number) => {
      const pulse = 0.64 + 0.36 * Math.sin(timeSec * star.twinkleSpeed + star.phase);
      const alpha = Math.max(0.06, Math.min(0.95, star.baseAlpha * pulse));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`;
      ctx.fill();

      if (star.isDiamond) {
        const arm = star.radius * (3.1 + pulse * 1.4);
        ctx.save();
        ctx.strokeStyle = `rgba(${star.color}, ${(alpha * 0.48).toFixed(3)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(star.x - arm, star.y);
        ctx.lineTo(star.x + arm, star.y);
        ctx.moveTo(star.x, star.y - arm);
        ctx.lineTo(star.x, star.y + arm);
        ctx.stroke();

        const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, arm * 1.1);
        halo.addColorStop(0, `rgba(${star.color}, ${(alpha * 0.35).toFixed(3)})`);
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(star.x, star.y, arm * 1.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawFrame = (dt: number, animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      drawNebulaVeil(elapsed);

      for (const star of stars) {
        if (animate) {
          star.x += star.driftX * dt;
          star.y += star.driftY * dt;

          if (star.x < -8) star.x = width + 8;
          if (star.x > width + 8) star.x = -8;
          if (star.y < -8) star.y = height + 8;
          if (star.y > height + 8) star.y = -8;
        }
        drawStar(star, elapsed);
      }

      if (!animate) return;

      // Spawn random subtle shooting stars
      nextMeteorDelay -= dt;
      if (nextMeteorDelay <= 0) {
        meteors.push(createShootingStar(width, height));
        // Occasional twin companion meteor shortly after for subtle awe
        const isTwin = Math.random() < 0.22;
        nextMeteorDelay = isTwin ? randomBetween(0.45, 0.95) : randomBetween(2.3, 5.4);
      }

      // Render fine stardust left behind shooting stars
      for (let i = dustMotes.length - 1; i >= 0; i -= 1) {
        const mote = dustMotes[i];
        mote.life += dt;
        if (mote.life >= mote.maxLife) {
          dustMotes.splice(i, 1);
          continue;
        }
        mote.x += mote.vx * dt;
        mote.y += mote.vy * dt;
        const fade = Math.pow(1 - mote.life / mote.maxLife, 1.7);
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${mote.color}, ${(fade * 0.48).toFixed(3)})`;
        ctx.fill();
      }

      // Render active shooting stars
      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const meteor = meteors[i];
        meteor.life += dt;
        if (meteor.life >= meteor.maxLife) {
          meteors.splice(i, 1);
          continue;
        }

        meteor.x += meteor.vx * dt;
        meteor.y += meteor.vy * dt;

        // Occasional delicate dust glint in the wake
        if (Math.random() < 0.35) {
          dustMotes.push({
            x: meteor.x + randomBetween(-2, 2),
            y: meteor.y + randomBetween(-2, 2),
            vx: meteor.vx * 0.05 + randomBetween(-8, 8),
            vy: meteor.vy * 0.05 + randomBetween(-8, 8),
            life: 0,
            maxLife: randomBetween(0.32, 0.65),
            size: randomBetween(0.45, 1.05),
            color: meteor.hueColor,
          });
        }

        const progress = meteor.life / meteor.maxLife;
        const envelope =
          progress < 0.16
            ? progress / 0.16
            : Math.pow(1 - (progress - 0.16) / 0.84, 1.45);

        const speedMag = Math.hypot(meteor.vx, meteor.vy);
        const dirX = meteor.vx / speedMag;
        const dirY = meteor.vy / speedMag;
        const tailLen = meteor.length * (0.55 + envelope * 0.45);
        const tailX = meteor.x - dirX * tailLen;
        const tailY = meteor.y - dirY * tailLen;

        // Soft luminous outer tail glow
        const outerGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        outerGrad.addColorStop(0, `rgba(${meteor.glowColor}, ${(0.34 * envelope).toFixed(3)})`);
        outerGrad.addColorStop(0.35, `rgba(${meteor.glowColor}, ${(0.14 * envelope).toFixed(3)})`);
        outerGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.save();
        ctx.lineCap = "round";
        ctx.strokeStyle = outerGrad;
        ctx.lineWidth = meteor.width * 3.1;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Crisp pearlescent meteor core tail
        const coreGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${(0.92 * envelope).toFixed(3)})`);
        coreGrad.addColorStop(0.28, `rgba(${meteor.hueColor}, ${(0.55 * envelope).toFixed(3)})`);
        coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = meteor.width;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Subtle crystalline head flare
        const headGlow = ctx.createRadialGradient(
          meteor.x,
          meteor.y,
          0,
          meteor.x,
          meteor.y,
          meteor.width * 5.2,
        );
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${(0.95 * envelope).toFixed(3)})`);
        headGlow.addColorStop(0.4, `rgba(${meteor.glowColor}, ${(0.45 * envelope).toFixed(3)})`);
        headGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.width * 5.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const tick = (now: number) => {
      if (!document.hidden) {
        const dt = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
        elapsed += dt;
        drawFrame(dt, true);
      }
      lastTimestamp = now;
      rafId = window.requestAnimationFrame(tick);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMotionChange = () => {
      window.cancelAnimationFrame(rafId);
      if (motionQuery.matches) {
        drawFrame(0, false);
      } else {
        lastTimestamp = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        lastTimestamp = performance.now();
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibility);

    if (motionQuery.matches) {
      drawFrame(0, false);
    } else {
      lastTimestamp = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

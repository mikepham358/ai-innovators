"use client";

import { useEffect } from "react";

const SELECTOR = ".glass-card, .mirror-card, .mirror-frame, .mirror-subbox";
const SWEEP_DURATION_MS = 1180;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function isEligibleBox(
  el: HTMLElement,
  vw: number,
  vh: number,
  now: number,
  cooldownMs: number,
  cooldowns: WeakMap<Element, number>,
): boolean {
  if (el.getAttribute("data-mirror-gleam") === "true") return false;
  if (el.matches(":hover")) return false;

  const lastAt = cooldowns.get(el);
  if (lastAt !== undefined && now - lastAt < cooldownMs) return false;

  // Avoid firing inner .mirror-frame separately when its enclosing .mirror-card already sweeps it
  if (el.classList.contains("mirror-frame")) {
    const outerCard = el.closest(".mirror-card");
    if (
      outerCard &&
      outerCard !== el &&
      el.querySelector(":scope > .mirror-sweep") !== null
    ) {
      return false;
    }
  }

  // Avoid parent & child gleaming at the exact same moment
  if (el.parentElement?.closest('[data-mirror-gleam="true"]')) return false;
  if (el.querySelector('[data-mirror-gleam="true"]')) return false;

  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;

  const rect = el.getBoundingClientRect();
  if (rect.width < 48 || rect.height < 38) return false;
  if (rect.bottom < 24 || rect.top > vh - 24) return false;
  if (rect.right < 16 || rect.left > vw - 16) return false;

  return true;
}

export function MirrorGlintOrchestrator() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const cooldowns = new WeakMap<Element, number>();
    const activeCleanups = new Set<number>();
    const activeElements = new Set<HTMLElement>();
    let nextTimerId: number | null = null;
    let disposed = false;

    const triggerElement = (el: HTMLElement, now: number) => {
      el.setAttribute("data-mirror-gleam", "true");
      cooldowns.set(el, now);
      activeElements.add(el);

      const cleanupId = window.setTimeout(() => {
        activeCleanups.delete(cleanupId);
        activeElements.delete(el);
        el.removeAttribute("data-mirror-gleam");
      }, SWEEP_DURATION_MS);

      activeCleanups.add(cleanupId);
    };

    const scheduleNext = (delayMs: number) => {
      if (disposed || motionQuery.matches) return;
      nextTimerId = window.setTimeout(() => {
        runCycle();
      }, delayMs);
    };

    const runCycle = () => {
      if (disposed || motionQuery.matches) return;

      if (document.hidden) {
        scheduleNext(1600);
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const now = Date.now();
      const allNodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

      // Shorter cooldown on sparse pages (e.g. login/privacy with only 2-3 boxes)
      const cooldownMs = allNodes.length <= 6 ? 3400 : 7200;
      const eligible = allNodes.filter((el) =>
        isEligibleBox(el, vw, vh, now, cooldownMs, cooldowns),
      );

      if (eligible.length > 0) {
        const firstIndex = Math.floor(Math.random() * eligible.length);
        const first = eligible[firstIndex];
        triggerElement(first, now);

        // Occasionally pick a second well-separated element on dense sections
        if (eligible.length >= 6 && Math.random() < 0.36) {
          const firstRect = first.getBoundingClientRect();
          const distant = eligible.filter((candidate, idx) => {
            if (idx === firstIndex) return false;
            if (first.contains(candidate) || candidate.contains(first)) {
              return false;
            }
            const r = candidate.getBoundingClientRect();
            const dist = Math.hypot(r.left - firstRect.left, r.top - firstRect.top);
            return dist > 260;
          });

          if (distant.length > 0) {
            const second = distant[Math.floor(Math.random() * distant.length)];
            const staggerDelay = Math.round(randomBetween(180, 420));
            const staggerId = window.setTimeout(() => {
              activeCleanups.delete(staggerId);
              if (!disposed && !document.hidden) {
                triggerElement(second, Date.now());
              }
            }, staggerDelay);
            activeCleanups.add(staggerId);
          }
        }
      }

      scheduleNext(Math.round(randomBetween(1150, 2350)));
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (nextTimerId !== null) {
          window.clearTimeout(nextTimerId);
          nextTimerId = null;
        }
        for (const el of activeElements) {
          el.removeAttribute("data-mirror-gleam");
        }
        activeElements.clear();
      } else if (nextTimerId === null) {
        scheduleNext(700);
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);
    scheduleNext(650);

    return () => {
      disposed = true;
      motionQuery.removeEventListener("change", handleMotionChange);
      if (nextTimerId !== null) {
        window.clearTimeout(nextTimerId);
      }
      for (const id of activeCleanups) {
        window.clearTimeout(id);
      }
      activeCleanups.clear();
      for (const el of activeElements) {
        el.removeAttribute("data-mirror-gleam");
      }
      activeElements.clear();
    };
  }, []);

  return null;
}

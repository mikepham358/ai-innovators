"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { ArrowDownRight, Crown, Pause, Play } from "lucide-react";
import {
  DIVISION_BADGE_CLASSES,
  MemberSpotlightModal,
} from "@/components/MemberSpotlightModal";
import {
  CLUB_DIVISIONS,
  TEAM_MEMBERS,
  type DivisionAccent,
  type DivisionCode,
  type TeamMember,
} from "@/data/club-data";

const TIER_PRIORITY: Record<TeamMember["tier"], number> = {
  executive: 0,
  head: 1,
  member: 2,
};

// Proud runway order: President & VP first, then Heads/Co-Heads, then Division Members
const ORDERED_HERO_MEMBERS: TeamMember[] = [...TEAM_MEMBERS].sort(
  (a, b) => TIER_PRIORITY[a.tier] - TIER_PRIORITY[b.tier],
);

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
                : `Xem hồ sơ ${member.name} — ${member.role}`
            }
            className={`group mirror-card ${
              isLeader ? "mirror-card-executive" : ""
            } flex w-[148px] shrink-0 flex-col overflow-hidden rounded-2xl text-left transition duration-300 hover:-translate-y-1.5 sm:w-[168px] md:w-[186px]`}
          >
            <div className="relative aspect-[1587/2245] w-full overflow-hidden bg-[#06091e]">
              <Image
                src={member.imageSrc}
                alt={isDuplicate ? "" : `${member.name} — ${member.role}`}
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
                  {isLeader && <Crown className="h-2.5 w-2.5" />}
                  {member.divisionCode}
                </span>
                <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-wider text-slate-300/80">
                  {member.tier === "executive"
                    ? "CHỦ NHIỆM"
                    : member.tier === "head"
                      ? "TRƯỞNG BAN"
                      : "GEN 1.0"}
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const { divisionByCode, accentByCode } = useMemo(() => {
    const divMap = {} as Record<DivisionCode, (typeof CLUB_DIVISIONS)[number]>;
    const accMap = {} as Record<DivisionCode, DivisionAccent>;
    for (const div of CLUB_DIVISIONS) {
      divMap[div.code] = div;
      accMap[div.code] = div.accent;
    }
    return { divisionByCode: divMap, accentByCode: accMap };
  }, []);

  const trackStyle = {
    "--marquee-duration": slowMode ? "84s" : "56s",
  } as CSSProperties;

  return (
    <div className="relative border-t border-white/10 bg-gradient-to-b from-indigo-950/30 via-[#050718]/80 to-[#050718] pb-8 pt-6 sm:pb-10 sm:pt-7">
      {/* Subtle Ambient Spotlight Behind Runway */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(129,140,248,0.16),transparent_72%)]"
      />

      {/* Editorial Hall of Innovators Header Bar */}
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pb-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/30 bg-gradient-to-r from-slate-200/15 via-indigo-400/20 to-fuchsia-400/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(129,140,248,0.22)]">
            <Crown className="h-3.5 w-3.5 text-indigo-200" />
            HALL OF INNOVATORS • GEN 1.0
          </span>
          <p className="text-xs font-medium text-slate-200 sm:text-sm">
            Tự hào{" "}
            <strong className="text-white">{ORDERED_HERO_MEMBERS.length}</strong>{" "}
            gương mặt kiến tạo AI Vinschool Grand Park
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSlowMode((prev) => !prev)}
            className="hidden rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-white/30 hover:text-white sm:inline-flex"
          >
            {slowMode ? "Nhịp: Thư thái" : "Nhịp: Tiêu chuẩn"}
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Tiếp tục chạy carousel" : "Tạm dừng carousel"}
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
            <span>7 Chuyên Ban</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Top Titanium Hairline */}
      <div
        aria-hidden="true"
        className="mx-auto mb-4 h-px max-w-6xl bg-gradient-to-r from-transparent via-slate-200/35 to-transparent"
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
            onSelect={setSelectedMember}
          />
          <CarouselTrackGroup
            members={ORDERED_HERO_MEMBERS}
            accentByCode={accentByCode}
            onSelect={setSelectedMember}
            isDuplicate
          />
        </div>
      </div>

      {/* Mirrored Floor Ambient Glow */}
      <div
        aria-hidden="true"
        className="mx-auto mt-3 h-px max-w-6xl bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="mx-auto h-4 max-w-5xl bg-gradient-to-b from-indigo-400/12 to-transparent blur-sm"
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

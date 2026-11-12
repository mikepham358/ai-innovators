"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Crown,
  Layers,
  Maximize2,
  Users,
} from "lucide-react";
import { MemberSpotlightModal } from "@/components/MemberSpotlightModal";
import {
  getMemberRankLabel,
  MEMBER_RANK_PILL_CLASSES,
  MemberRankIcon,
} from "@/components/MemberRankBadge";
import {
  ALL_DIVISION_META,
  CLUB_DIVISIONS,
  EXECUTIVE_DIVISION,
  TEAM_MEMBERS,
  type DivisionAccent,
  type DivisionCode,
  type DivisionItem,
  type TeamMember,
} from "@/data/club-data";

type FilterView = "ALL" | "LEADERS" | DivisionCode;

const ACCENT_STYLES: Record<
  DivisionAccent,
  {
    badge: string;
    dot: string;
    ring: string;
    panelGlow: string;
  }
> = {
  violet: {
    badge: "border-violet-300/30 bg-violet-500/15 text-violet-200",
    dot: "bg-violet-400",
    ring: "hover:border-violet-300/45",
    panelGlow: "from-violet-500/12 via-indigo-500/6 to-transparent",
  },
  blue: {
    badge: "border-blue-300/30 bg-blue-500/15 text-blue-200",
    dot: "bg-blue-400",
    ring: "hover:border-blue-300/45",
    panelGlow: "from-blue-500/12 via-cyan-500/6 to-transparent",
  },
  fuchsia: {
    badge: "border-fuchsia-300/30 bg-fuchsia-500/15 text-fuchsia-200",
    dot: "bg-fuchsia-400",
    ring: "hover:border-fuchsia-300/45",
    panelGlow: "from-fuchsia-500/12 via-purple-500/6 to-transparent",
  },
  cyan: {
    badge: "border-cyan-300/30 bg-cyan-500/15 text-cyan-200",
    dot: "bg-cyan-400",
    ring: "hover:border-cyan-300/45",
    panelGlow: "from-cyan-500/12 via-sky-500/6 to-transparent",
  },
  emerald: {
    badge: "border-emerald-300/30 bg-emerald-500/15 text-emerald-200",
    dot: "bg-emerald-400",
    ring: "hover:border-emerald-300/45",
    panelGlow: "from-emerald-500/12 via-teal-500/6 to-transparent",
  },
  amber: {
    badge: "border-amber-300/30 bg-amber-500/15 text-amber-200",
    dot: "bg-amber-400",
    ring: "hover:border-amber-300/45",
    panelGlow: "from-amber-500/12 via-orange-500/6 to-transparent",
  },
  rose: {
    badge: "border-rose-300/30 bg-rose-500/15 text-rose-200",
    dot: "bg-rose-400",
    ring: "hover:border-rose-300/45",
    panelGlow: "from-rose-500/12 via-pink-500/6 to-transparent",
  },
};

function getMembersByDivision(code: DivisionCode): TeamMember[] {
  return TEAM_MEMBERS.filter((member) => member.divisionCode === code);
}

function getTierPill(
  member: TeamMember,
  accent: DivisionAccent,
): { label: string; className: string } {
  const label = getMemberRankLabel(member);
  if (member.tier === "executive") {
    return {
      label,
      className:
        "border-indigo-200/45 bg-gradient-to-r from-indigo-400/30 via-fuchsia-400/20 to-amber-300/20 text-white shadow-[0_0_18px_rgba(129,140,248,0.28)]",
    };
  }
  if (member.tier === "head") {
    return {
      label,
      className:
        "border-slate-200/40 bg-gradient-to-r from-slate-200/20 to-blue-400/18 text-slate-100 shadow-[0_0_14px_rgba(148,163,184,0.18)]",
    };
  }
  return {
    label,
    className: MEMBER_RANK_PILL_CLASSES[accent],
  };
}

interface PosterMirrorCardProps {
  member: TeamMember;
  accent: DivisionAccent;
  onSelect: (member: TeamMember) => void;
  showFloorReflection?: boolean;
  sizes?: string;
}

function PosterMirrorCard({
  member,
  accent,
  onSelect,
  showFloorReflection = false,
  sizes = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 260px",
}: PosterMirrorCardProps) {
  const accentStyle = ACCENT_STYLES[accent];
  const tierPill = getTierPill(member, accent);
  const isLeader = member.tier !== "member";

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onSelect(member)}
        aria-label={`Xem chân dung ${member.name} - ${member.role}`}
        className={`group mirror-card ${
          isLeader ? "mirror-card-executive" : ""
        } ${accentStyle.ring} flex w-full flex-col overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
      >
        {/* Obsidian Mirror Poster Viewport */}
        <div className="mirror-frame relative aspect-[1587/2245] w-full overflow-hidden rounded-t-[15px] border-x-0 border-t-0 bg-[#06091e]">
          <Image
            src={member.imageSrc}
            alt={`${member.name} - ${member.role}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />

          {/* Optical static glass glint & dynamic specular sweep */}
          <div aria-hidden="true" className="mirror-glint absolute inset-0" />
          <div
            aria-hidden="true"
            className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
          />

          {/* Subtle frosted expand chip on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-full border border-white/25 bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100"
          >
            <Maximize2 className="h-3 w-3" />
            Phóng to
          </span>
        </div>

        {/* Obsidian Mirror Plinth */}
        <div className="relative flex flex-1 flex-col justify-between border-t border-white/12 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent px-3.5 py-3 sm:px-4 sm:py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${tierPill.className}`}
            >
              <MemberRankIcon
                member={member}
                className="h-2.5 w-2.5 shrink-0"
              />
              {tierPill.label}
            </span>
            <span
              className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold ${accentStyle.badge}`}
            >
              {member.divisionCode}
            </span>
          </div>

          <div className="mt-2">
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold tracking-wide text-white sm:text-[15px]">
              {member.name}
            </h4>
            <p className="mt-0.5 text-xs text-slate-300/90">{member.roleVi}</p>
          </div>
        </div>
      </button>

      {/* Luxury Reflected Horizon Pedestal */}
      {showFloorReflection && (
        <div aria-hidden="true" className="px-3">
          <div className="mt-1.5 h-px bg-gradient-to-r from-transparent via-slate-200/45 to-transparent" />
          <div className="mirror-floor-reflection mx-1 h-5 overflow-hidden rounded-b-xl bg-gradient-to-b from-slate-200/20 via-indigo-400/12 to-transparent sm:h-6" />
        </div>
      )}
    </div>
  );
}

interface DivisionHeaderStripProps {
  division: DivisionItem;
  memberCountLabel: string;
}

function DivisionHeaderStrip({
  division,
  memberCountLabel,
}: DivisionHeaderStripProps) {
  const accent = ACCENT_STYLES[division.accent];

  return (
    <div
      className={`group mirror-card relative overflow-hidden rounded-2xl bg-gradient-to-r ${accent.panelGlow} p-5 sm:p-6`}
    >
      <div aria-hidden="true" className="mirror-glint absolute inset-0" />
      <div
        aria-hidden="true"
        className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
      />
      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${accent.badge}`}
            >
              BAN {division.code}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300/80">
              {division.englishTag}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-0.5 text-xs text-slate-200">
              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
              {memberCountLabel}
            </span>
          </div>

          <h3 className="mt-2.5 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white sm:text-2xl">
            {division.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            {division.role}
          </p>
          {division.partnerNote && (
            <p className="mt-2 text-xs text-cyan-200/90">{division.partnerNote}</p>
          )}
        </div>

        <ul className="flex flex-col gap-2 border-t border-white/10 pt-3 lg:min-w-[270px] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          {division.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 text-xs text-slate-200 sm:text-sm"
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface DivisionDossierCardProps {
  division: DivisionItem;
  memberCountLabel: string;
  footerAction?: {
    label: string;
    onClick: () => void;
  };
}

function DivisionDossierCard({
  division,
  memberCountLabel,
  footerAction,
}: DivisionDossierCardProps) {
  const accent = ACCENT_STYLES[division.accent];

  return (
    <div
      className={`group mirror-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${accent.panelGlow} p-5 sm:p-6`}
    >
      <div aria-hidden="true" className="mirror-glint absolute inset-0" />
      <div
        aria-hidden="true"
        className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${accent.badge}`}
          >
            BAN {division.code}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-slate-200">
            <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
            {memberCountLabel}
          </span>
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-300/75">
          {division.englishTag}
        </p>
        <h3 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
          {division.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
          {division.role}
        </p>
        {division.partnerNote && (
          <p className="mirror-subbox mt-2.5 rounded-xl border-cyan-300/25 p-3 text-xs leading-relaxed text-cyan-100">
            {division.partnerNote}
          </p>
        )}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Trọng tâm nhiệm vụ
        </p>
        <ul className="mt-2.5 space-y-2">
          {division.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-xs text-slate-200"
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {footerAction && (
          <button
            type="button"
            onClick={footerAction.onClick}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/35 bg-cyan-500/15 px-4 py-2.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/25"
          >
            <span>{footerAction.label}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function DivisionsShowcase() {
  const [activeView, setActiveView] = useState<FilterView>("ALL");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const divisionByCode = useMemo(() => {
    const map = {} as Record<DivisionCode, DivisionItem>;
    for (const div of ALL_DIVISION_META) {
      map[div.code] = div;
    }
    return map;
  }, []);

  const pmMembers = useMemo(() => getMembersByDivision("PM"), []);
  const dotMembers = useMemo(() => getMembersByDivision("DOT"), []);
  const prMembers = useMemo(() => getMembersByDivision("PR"), []);
  const erMembers = useMemo(() => getMembersByDivision("ER"), []);
  const logMembers = useMemo(() => getMembersByDivision("LOG"), []);
  const hrMembers = useMemo(() => getMembersByDivision("HR"), []);
  const leaderMembers = useMemo(
    () => TEAM_MEMBERS.filter((m) => m.tier !== "member"),
    [],
  );

  // Ordered sequence used for Next/Prev inside the Lightbox
  const activeLightboxSequence = useMemo(() => {
    if (activeView === "LEADERS") return leaderMembers;
    if (activeView !== "ALL") return getMembersByDivision(activeView);
    return TEAM_MEMBERS;
  }, [activeView, leaderMembers]);

  const lightboxList = useMemo(() => {
    if (!selectedMember) return TEAM_MEMBERS;
    const inActive = activeLightboxSequence.some(
      (m) => m.id === selectedMember.id,
    );
    return inActive ? activeLightboxSequence : TEAM_MEMBERS;
  }, [selectedMember, activeLightboxSequence]);

  return (
    <div className="mt-8">
      {/* Smart Mirror Filter Bar */}
      <div className="mirror-card rounded-2xl p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView("ALL")}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
              activeView === "ALL"
                ? "border-slate-200/50 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/25 text-white shadow-[0_0_24px_rgba(99,102,241,0.3)]"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Toàn cảnh 5 Phân ban</span>
            <span className="rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[11px]">
              {TEAM_MEMBERS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("LEADERS")}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
              activeView === "LEADERS"
                ? "border-slate-200/50 bg-gradient-to-r from-indigo-500/30 via-slate-300/20 to-fuchsia-500/25 text-white shadow-[0_0_24px_rgba(165,180,252,0.28)]"
                : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
            }`}
          >
            <Crown className="h-3.5 w-3.5" />
            <span>Ban Chủ Nhiệm &amp; Trưởng Ban</span>
            <span className="rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[11px]">
              {leaderMembers.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("PM")}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
              activeView === "PM"
                ? "border-slate-200/50 bg-white/[0.14] text-white shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${ACCENT_STYLES[EXECUTIVE_DIVISION.accent].dot}`}
            />
            <span className="font-mono font-bold">PM</span>
            <span className="hidden md:inline">• Ban Chủ Nhiệm</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-200">
              {pmMembers.length}
            </span>
          </button>

          <div
            aria-hidden="true"
            className="mx-1 hidden h-6 w-px bg-white/15 sm:block"
          />

          {CLUB_DIVISIONS.map((div) => {
            const count = String(getMembersByDivision(div.code).length);
            const isSelected = activeView === div.code;
            const accent = ACCENT_STYLES[div.accent];

            return (
              <button
                key={div.code}
                type="button"
                onClick={() => setActiveView(div.code)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                  isSelected
                    ? "border-slate-200/50 bg-white/[0.14] text-white shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                <span className="font-mono font-bold">{div.code}</span>
                <span className="hidden md:inline">• {div.name.replace("Ban ", "")}</span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-200">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: EXECUTIVE BOARD + 5 DIVISIONS - SMART HIERARCHICAL ARCHITECTURE */}
      {activeView === "ALL" && (
        <div className="mt-10 space-y-12">
          {/* Executive Board - Ban Chủ Nhiệm */}
          <div className="space-y-6">
            <DivisionHeaderStrip
              division={divisionByCode.PM}
              memberCountLabel={`${pmMembers.length} Ban Chủ Nhiệm`}
            />
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {pmMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.PM.accent}
                  onSelect={setSelectedMember}
                  showFloorReflection
                  sizes="(max-width: 640px) 92vw, 380px"
                />
              ))}
            </div>
          </div>

          {/* 1. PR - Header Strip + 8 Members (4x2 symmetry) */}
          <div className="space-y-5">
            <DivisionHeaderStrip
              division={divisionByCode.PR}
              memberCountLabel="2 Lãnh đạo • 6 Thành viên"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {prMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.PR.accent}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          </div>

          {/* 2. HR - Header Strip + 4 Members (1x4 full row symmetry) */}
          <div className="space-y-5">
            <DivisionHeaderStrip
              division={divisionByCode.HR}
              memberCountLabel="1 Trưởng ban • 1 Phó ban • 2 Thành viên"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {hrMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.HR.accent}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          </div>

          {/* 3. LOG - Header Strip + 6 Members */}
          <div className="space-y-5">
            <DivisionHeaderStrip
              division={divisionByCode.LOG}
              memberCountLabel="2 Đồng điều hành • 4 Thành viên"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
              {logMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.LOG.accent}
                  onSelect={setSelectedMember}
                  sizes="(max-width: 640px) 46vw, (max-width: 1280px) 30vw, 240px"
                />
              ))}
            </div>
          </div>

          {/* 4. DOT - 1 Dossier + 7 Members = 8 tiles (4x2 symmetry) */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              <DivisionDossierCard
                division={divisionByCode.DOT}
                memberCountLabel="1 Trưởng ban • 6 Thành viên"
              />
              {dotMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.DOT.accent}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          </div>

          {/* 5. ER - Split Dossier + 2 Portraits */}
          <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <DivisionDossierCard
                division={divisionByCode.ER}
                memberCountLabel="1 Trưởng ban • 1 Thành viên"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-8">
              {erMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.ER.accent}
                  onSelect={setSelectedMember}
                  sizes="(max-width: 640px) 46vw, 420px"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: EXECUTIVE + HEADS COUNCIL (10 LEADERS) */}
      {activeView === "LEADERS" && (
        <div className="mt-10 space-y-8">
          <div className="group mirror-card relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/15 via-slate-200/8 to-fuchsia-500/15 p-5 sm:p-6">
            <div aria-hidden="true" className="mirror-glint absolute inset-0" />
            <div
              aria-hidden="true"
              className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
            />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                  Hội Đồng Lãnh Đạo Gen 1.0
                </p>
                <h3 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                  Ban Chủ Nhiệm &amp; Trưởng / Phó 5 Phân Ban Chuyên Trách
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {leaderMembers.length} gương mặt dẫn dắt điều phối 5 phân ban
                  PR, HR, LOG, DOT và ER toàn câu lạc bộ.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold text-white">
                <Crown className="h-4 w-4 text-indigo-200" />
                {leaderMembers.length} LÃNH ĐẠO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {leaderMembers.map((member) => (
              <PosterMirrorCard
                key={member.id}
                member={member}
                accent={divisionByCode[member.divisionCode].accent}
                onSelect={setSelectedMember}
                showFloorReflection
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 280px"
              />
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: INDIVIDUAL DIVISION FOCUS */}
      {activeView !== "ALL" && activeView !== "LEADERS" && (
        <div className="mt-10 space-y-8">
          {(() => {
            const currentDiv = divisionByCode[activeView];
            const members = getMembersByDivision(activeView);
            const gridClass =
              members.length <= 2
                ? "mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
                : members.length === 6
                  ? "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6"
                  : "grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4";

            return (
              <>
                <DivisionHeaderStrip
                  division={currentDiv}
                  memberCountLabel={`${members.length} thành viên`}
                />

                {members.length === 1 ? (
                  <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
                    <DivisionDossierCard
                      division={currentDiv}
                      memberCountLabel="1 Trưởng ban điều phối"
                    />
                    <PosterMirrorCard
                      member={members[0]}
                      accent={currentDiv.accent}
                      onSelect={setSelectedMember}
                      showFloorReflection
                    />
                  </div>
                ) : (
                  <div className={gridClass}>
                    {members.map((member) => (
                      <PosterMirrorCard
                        key={member.id}
                        member={member}
                        accent={currentDiv.accent}
                        onSelect={setSelectedMember}
                        showFloorReflection={activeView === "PM"}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      <MemberSpotlightModal
        member={selectedMember}
        membersList={lightboxList}
        division={
          selectedMember
            ? divisionByCode[selectedMember.divisionCode]
            : undefined
        }
        onClose={() => setSelectedMember(null)}
        onSelect={setSelectedMember}
      />

      {/* Footer note */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
        <div className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-300" />
          <span>
            {TEAM_MEMBERS.length} chân dung thành viên Gen 1.0 • Nhấn vào từng
            khung gương để xem khổ lớn và điều hướng bằng phím mũi tên.
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
          VGP2026 • ZERO PII SHOWCASE
        </span>
      </div>
    </div>
  );
}

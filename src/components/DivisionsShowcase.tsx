"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  Layers,
  Maximize2,
  Palette,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  CLUB_DIVISIONS,
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

function getTierPill(member: TeamMember): { label: string; className: string } {
  if (member.tier === "executive") {
    return {
      label: member.role === "PRESIDENT" ? "CHỦ NHIỆM" : "PHÓ CHỦ NHIỆM",
      className:
        "border-indigo-200/40 bg-gradient-to-r from-indigo-400/25 via-fuchsia-400/20 to-slate-200/20 text-white",
    };
  }
  if (member.tier === "head") {
    const label = member.role.includes("CO-HEAD")
      ? "ĐỒNG TRƯỞNG BAN"
      : member.role.includes("VICE HEAD")
        ? "PHÓ BAN"
        : "TRƯỞNG BAN";
    return {
      label,
      className:
        "border-slate-200/35 bg-gradient-to-r from-slate-200/20 to-blue-400/15 text-slate-100",
    };
  }
  return {
    label: "THÀNH VIÊN",
    className: "border-white/15 bg-white/[0.06] text-slate-300",
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
  const tierPill = getTierPill(member);
  const isLeader = member.tier !== "member";

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onSelect(member)}
        aria-label={`Xem chân dung ${member.name} — ${member.role}`}
        className={`group mirror-card ${
          isLeader ? "mirror-card-executive" : ""
        } ${accentStyle.ring} flex w-full flex-col overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
      >
        {/* Obsidian Mirror Poster Viewport */}
        <div className="relative aspect-[1587/2245] w-full overflow-hidden bg-[#06091e]">
          <Image
            src={member.imageSrc}
            alt={`${member.name} — ${member.role}`}
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
              {isLeader && <Crown className="h-2.5 w-2.5 text-slate-100" />}
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
      className={`mirror-card overflow-hidden rounded-2xl bg-gradient-to-r ${accent.panelGlow} p-5 sm:p-6`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
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
      className={`mirror-card flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${accent.panelGlow} p-5 sm:p-6`}
    >
      <div>
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
          <p className="mt-2.5 rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-3 text-xs leading-relaxed text-cyan-100">
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
    for (const div of CLUB_DIVISIONS) {
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
    if (activeView === "PH") return prMembers;
    if (activeView !== "ALL") return getMembersByDivision(activeView);
    return TEAM_MEMBERS;
  }, [activeView, leaderMembers, prMembers]);

  const selectedIndex = useMemo(() => {
    if (!selectedMember) return -1;
    const idx = activeLightboxSequence.findIndex(
      (m) => m.id === selectedMember.id,
    );
    if (idx !== -1) return idx;
    return TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);
  }, [selectedMember, activeLightboxSequence]);

  const lightboxList = useMemo(() => {
    if (!selectedMember) return TEAM_MEMBERS;
    const inActive = activeLightboxSequence.some(
      (m) => m.id === selectedMember.id,
    );
    return inActive ? activeLightboxSequence : TEAM_MEMBERS;
  }, [selectedMember, activeLightboxSequence]);

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
        return;
      }
      if (event.key === "ArrowRight") {
        setSelectedMember((current) => {
          if (!current) return null;
          const idx = lightboxList.findIndex((m) => m.id === current.id);
          return lightboxList[(idx + 1) % lightboxList.length] ?? current;
        });
      } else if (event.key === "ArrowLeft") {
        setSelectedMember((current) => {
          if (!current) return null;
          const idx = lightboxList.findIndex((m) => m.id === current.id);
          return (
            lightboxList[(idx - 1 + lightboxList.length) % lightboxList.length] ??
            current
          );
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember, lightboxList]);

  const stepSelectedMember = (delta: number) => {
    if (!selectedMember) return;
    const idx = lightboxList.findIndex((m) => m.id === selectedMember.id);
    if (idx === -1) return;
    const nextIdx = (idx + delta + lightboxList.length) % lightboxList.length;
    setSelectedMember(lightboxList[nextIdx] ?? selectedMember);
  };

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
            <span>Toàn cảnh 7 Ban</span>
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
            <span>Ban Điều Hành &amp; Trưởng Ban</span>
            <span className="rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[11px]">
              {leaderMembers.length}
            </span>
          </button>

          <div
            aria-hidden="true"
            className="mx-1 hidden h-6 w-px bg-white/15 sm:block"
          />

          {CLUB_DIVISIONS.map((div) => {
            const count =
              div.code === "PH"
                ? "PR×PH"
                : String(getMembersByDivision(div.code).length);
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

      {/* VIEW 1: ALL 7 DIVISIONS — SMART HIERARCHICAL ARCHITECTURE */}
      {activeView === "ALL" && (
        <div className="mt-10 space-y-12">
          {/* 1. PM — Executive Spotlight */}
          <div className="space-y-6">
            <DivisionHeaderStrip
              division={divisionByCode.PM}
              memberCountLabel={`${pmMembers.length} Ban Chủ Nhiệm`}
            />
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {pmMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.PM.accent}
                  onSelect={setSelectedMember}
                  showFloorReflection
                  sizes="(max-width: 640px) 92vw, 320px"
                />
              ))}
            </div>
          </div>

          {/* 2. DOT — 1 Dossier + 7 Members = 8 tiles (4x2 symmetry) */}
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

          {/* 3. PR — Header Strip + 8 Members (4x2 symmetry) */}
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

          {/* 4. LOG — Header Strip + 6 Members (3x2 symmetry) */}
          <div className="space-y-5">
            <DivisionHeaderStrip
              division={divisionByCode.LOG}
              memberCountLabel="2 Đồng điều hành • 4 Thành viên"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {logMembers.map((member) => (
                <PosterMirrorCard
                  key={member.id}
                  member={member}
                  accent={divisionByCode.LOG.accent}
                  onSelect={setSelectedMember}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 350px"
                />
              ))}
            </div>
          </div>

          {/* 5. ER — Split Dossier + 2 Portraits */}
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
                  sizes="(max-width: 640px) 46vw, 360px"
                />
              ))}
            </div>
          </div>

          {/* 6 & 7. HR & PH — Twin Dedicated Division Studios */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* HR */}
            <div className="mirror-card rounded-3xl p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DivisionDossierCard
                  division={divisionByCode.HR}
                  memberCountLabel="1 Trưởng ban điều phối"
                />
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

            {/* PH */}
            <div className="mirror-card rounded-3xl p-4 sm:p-5">
              <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
                <DivisionDossierCard
                  division={divisionByCode.PH}
                  memberCountLabel="Liên kết PR × PH"
                  footerAction={{
                    label: "Xem đội ngũ Thiết kế",
                    onClick: () => setActiveView("PH"),
                  }}
                />
                <div className="mirror-card flex flex-col justify-between overflow-hidden rounded-2xl border-cyan-300/25 bg-gradient-to-b from-cyan-500/12 via-slate-900/80 to-indigo-950/90 p-5">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/15 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-cyan-100">
                      <Palette className="h-3.5 w-3.5" />
                      STUDIO NHẬN DIỆN
                    </div>
                    <h4 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                      Hệ sinh thái Ấn phẩm GEN 1.0
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      Chịu trách nhiệm toàn bộ ngôn ngữ thị giác kim loại bạc — kính
                      khói cho bộ 26 chân dung thành viên, khung sự kiện VGP2026
                      và bộ AI Learning Toolkit.
                    </p>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Phối hợp trực tiếp</span>
                      <span className="font-semibold text-cyan-200">Ban PR</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Hạng mục chủ lực</span>
                      <span className="font-semibold text-white">
                        Poster &amp; Identity
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: EXECUTIVE + HEADS COUNCIL (9 LEADERS) */}
      {activeView === "LEADERS" && (
        <div className="mt-10 space-y-8">
          <div className="mirror-card rounded-2xl bg-gradient-to-r from-indigo-500/15 via-slate-200/8 to-fuchsia-500/15 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                  Hội Đồng Lãnh Đạo Gen 1.0
                </p>
                <h3 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                  Ban Chủ Nhiệm &amp; Trưởng / Phó Các Ban Chuyên Trách
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  9 gương mặt dẫn dắt điều phối chuyên môn, truyền thông, đối ngoại,
                  hậu cần và nhân sự toàn câu lạc bộ.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold text-white">
                <Crown className="h-4 w-4 text-indigo-200" />
                {leaderMembers.length} LÃNH ĐẠO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3 lg:gap-7">
            {leaderMembers.map((member) => (
              <PosterMirrorCard
                key={member.id}
                member={member}
                accent={divisionByCode[member.divisionCode].accent}
                onSelect={setSelectedMember}
                showFloorReflection
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 340px"
              />
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: INDIVIDUAL DIVISION FOCUS */}
      {activeView !== "ALL" && activeView !== "LEADERS" && (
        <div className="mt-10 space-y-8">
          {activeView === "PH" ? (
            <>
              <DivisionHeaderStrip
                division={divisionByCode.PH}
                memberCountLabel="Phối hợp sản xuất cùng Ban PR"
              />
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                {prMembers.map((member) => (
                  <PosterMirrorCard
                    key={member.id}
                    member={member}
                    accent={divisionByCode.PH.accent}
                    onSelect={setSelectedMember}
                  />
                ))}
              </div>
            </>
          ) : (
            (() => {
              const currentDiv = divisionByCode[activeView];
              const members = getMembersByDivision(activeView);
              const gridClass =
                members.length <= 2
                  ? "mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2"
                  : members.length === 6
                    ? "grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
                    : "grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4";

              return (
                <>
                  <DivisionHeaderStrip
                    division={currentDiv}
                    memberCountLabel={`${members.length} thành viên`}
                  />

                  {members.length === 1 ? (
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
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
            })()
          )}
        </div>
      )}

      {/* LUXURY OBSIDIAN MIRROR LIGHTBOX */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Chân dung ${selectedMember.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030512]/90 p-4 backdrop-blur-2xl sm:p-6"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="mirror-card mirror-card-executive relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl lg:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Đóng cửa sổ"
              className="absolute top-3.5 right-3.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white backdrop-blur-md transition hover:border-white/45 hover:bg-slate-900"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Full Poster View */}
            <div className="relative flex min-h-[380px] flex-1 items-center justify-center bg-[#05081d] p-4 sm:min-h-[520px] sm:p-6">
              <div className="relative aspect-[1587/2245] h-[54vh] max-h-[640px] w-auto overflow-hidden rounded-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
                <Image
                  src={selectedMember.imageSrc}
                  alt={`${selectedMember.name} — ${selectedMember.role}`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 460px"
                  className="object-cover"
                />
                <div aria-hidden="true" className="mirror-glint absolute inset-0" />
              </div>
            </div>

            {/* Member Dossier Sidebar */}
            <div className="flex w-full flex-col justify-between border-t border-white/12 bg-gradient-to-b from-white/[0.05] to-transparent p-5 sm:p-7 lg:w-80 lg:border-t-0 lg:border-l">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${
                      ACCENT_STYLES[divisionByCode[selectedMember.divisionCode].accent]
                        .badge
                    }`}
                  >
                    BAN {selectedMember.divisionCode}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-300">
                    {selectedIndex + 1} / {lightboxList.length}
                  </span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                  {selectedMember.name}
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold tracking-wider text-blue-200">
                  {selectedMember.role}
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {selectedMember.roleVi}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                    <span>{divisionByCode[selectedMember.divisionCode].name}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {divisionByCode[selectedMember.divisionCode].role}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => stepSelectedMember(-1)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Trước
                </button>
                <button
                  type="button"
                  onClick={() => stepSelectedMember(1)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                >
                  Sau
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
        <div className="inline-flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-300" />
          <span>
            26 chân dung thành viên Gen 1.0 • Nhấn vào từng khung gương để xem khổ
            lớn và điều hướng bằng phím mũi tên.
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
          VGP2026 • ZERO PII SHOWCASE
        </span>
      </div>
    </div>
  );
}

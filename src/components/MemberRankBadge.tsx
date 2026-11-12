import { Crown, Cpu, ShieldCheck } from "lucide-react";
import type { DivisionAccent, DivisionCode, TeamMember } from "@/data/club-data";

export const MEMBER_RANK_PILL_CLASSES: Record<DivisionAccent, string> = {
  violet:
    "border-violet-300/40 bg-gradient-to-r from-violet-500/25 via-indigo-500/20 to-fuchsia-500/15 text-violet-100 shadow-[0_0_16px_rgba(139,92,246,0.22)]",
  blue:
    "border-blue-300/40 bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/15 text-blue-100 shadow-[0_0_16px_rgba(59,130,246,0.22)]",
  fuchsia:
    "border-fuchsia-300/40 bg-gradient-to-r from-fuchsia-500/25 via-pink-500/20 to-purple-500/15 text-fuchsia-100 shadow-[0_0_16px_rgba(217,70,239,0.22)]",
  cyan:
    "border-cyan-300/40 bg-gradient-to-r from-cyan-500/25 via-sky-500/20 to-teal-500/15 text-cyan-100 shadow-[0_0_16px_rgba(6,182,212,0.22)]",
  emerald:
    "border-emerald-300/40 bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-cyan-500/15 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.22)]",
  amber:
    "border-amber-300/40 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-yellow-500/15 text-amber-100 shadow-[0_0_16px_rgba(245,158,11,0.22)]",
  rose:
    "border-rose-300/40 bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-amber-500/15 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.22)]",
};

export const MEMBER_DIVISION_CALLSIGN: Record<DivisionCode, string> = {
  PM: "NAVIGATOR",
  PR: "SIGNAL",
  HR: "PRISM",
  LOG: "AEGIS OPS",
  DOT: "TECH CORE",
  ER: "NEXUS",
};

function LightningBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

function OrbitNexusBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
    </svg>
  );
}

function CrystalGemBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="m12 21 3-12-3-6-3 6 3 12z" />
    </svg>
  );
}

function NorthStarBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2 14.9 9.1 22 12l-7.1 2.9L12 22l-2.9-7.1L2 12l7.1-2.9L12 2z" />
    </svg>
  );
}

export function MemberRankIcon({
  member,
  className = "h-3 w-3 shrink-0",
}: {
  member: TeamMember;
  className?: string;
}) {
  if (member.tier !== "member") {
    return (
      <Crown
        aria-hidden="true"
        className={`${className} ${
          member.tier === "executive" ? "text-amber-200" : "text-slate-100"
        }`}
      />
    );
  }

  switch (member.divisionCode) {
    case "DOT":
      return <Cpu aria-hidden="true" className={`${className} text-blue-300`} />;
    case "PR":
      return (
        <LightningBadge className={`${className} text-fuchsia-300`} />
      );
    case "ER":
      return <OrbitNexusBadge className={`${className} text-emerald-300`} />;
    case "LOG":
      return (
        <ShieldCheck
          aria-hidden="true"
          className={`${className} text-amber-300`}
        />
      );
    case "HR":
      return <CrystalGemBadge className={`${className} text-rose-300`} />;
    case "PM":
    default:
      return <NorthStarBadge className={`${className} text-violet-300`} />;
  }
}

export function getMemberRankLabel(member: TeamMember): string {
  if (member.tier === "executive") {
    return member.role === "PRESIDENT" ? "CHỦ NHIỆM" : "PHÓ CHỦ NHIỆM";
  }
  if (member.tier === "head") {
    if (member.role.includes("CO-HEAD")) return "ĐỒNG TRƯỞNG BAN";
    if (member.role.includes("VICE HEAD")) return "PHÓ BAN";
    return "TRƯỞNG BAN";
  }
  return MEMBER_DIVISION_CALLSIGN[member.divisionCode];
}

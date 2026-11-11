"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import {
  getMemberRankLabel,
  MEMBER_RANK_PILL_CLASSES,
  MemberRankIcon,
} from "@/components/MemberRankBadge";
import type {
  DivisionAccent,
  DivisionItem,
  TeamMember,
} from "@/data/club-data";

export const DIVISION_BADGE_CLASSES: Record<DivisionAccent, string> = {
  violet: "border-violet-300/35 bg-violet-500/20 text-violet-100",
  blue: "border-blue-300/35 bg-blue-500/20 text-blue-100",
  fuchsia: "border-fuchsia-300/35 bg-fuchsia-500/20 text-fuchsia-100",
  cyan: "border-cyan-300/35 bg-cyan-500/20 text-cyan-100",
  emerald: "border-emerald-300/35 bg-emerald-500/20 text-emerald-100",
  amber: "border-amber-300/35 bg-amber-500/20 text-amber-100",
  rose: "border-rose-300/35 bg-rose-500/20 text-rose-100",
};

interface MemberSpotlightModalProps {
  member: TeamMember | null;
  membersList: TeamMember[];
  division?: DivisionItem;
  onClose: () => void;
  onSelect: (member: TeamMember) => void;
}

export function MemberSpotlightModal({
  member,
  membersList,
  division,
  onClose,
  onSelect,
}: MemberSpotlightModalProps) {
  const currentIndex = member
    ? membersList.findIndex((item) => item.id === member.id)
    : -1;

  useEffect(() => {
    if (!member) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const step = (delta: number) => {
      if (membersList.length === 0) return;
      const baseIndex = membersList.findIndex((item) => item.id === member.id);
      const nextIndex =
        (baseIndex + delta + membersList.length) % membersList.length;
      const nextMember = membersList[nextIndex];
      if (nextMember) onSelect(nextMember);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, membersList, onClose, onSelect]);

  if (!member) return null;

  const badgeClass = division
    ? DIVISION_BADGE_CLASSES[division.accent]
    : DIVISION_BADGE_CLASSES.violet;
  const rankBadgeClass = division
    ? MEMBER_RANK_PILL_CLASSES[division.accent]
    : MEMBER_RANK_PILL_CLASSES.violet;

  const handleStep = (delta: number) => {
    if (membersList.length === 0) return;
    const baseIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      (baseIndex + delta + membersList.length) % membersList.length;
    const nextMember = membersList[nextIndex];
    if (nextMember) onSelect(nextMember);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chân dung ${member.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030512]/90 p-4 backdrop-blur-2xl sm:p-6"
      onClick={onClose}
    >
      <div
        className="mirror-card mirror-card-executive relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl lg:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-3.5 right-3.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-white backdrop-blur-md transition hover:border-white/45 hover:bg-slate-900"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Poster Mirror Stage */}
        <div className="relative flex min-h-[380px] flex-1 items-center justify-center bg-[#05081d] p-4 sm:min-h-[520px] sm:p-6">
          <div className="group mirror-frame relative aspect-[1587/2245] h-[54vh] max-h-[640px] w-auto overflow-hidden rounded-2xl">
            <Image
              src={member.imageSrc}
              alt={`${member.name} - ${member.role}`}
              fill
              sizes="(max-width: 1024px) 80vw, 460px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <div aria-hidden="true" className="mirror-glint absolute inset-0" />
            <div
              aria-hidden="true"
              className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
            />
          </div>
        </div>

        {/* Member Details Sidebar */}
        <div className="flex w-full flex-col justify-between border-t border-white/12 bg-gradient-to-b from-white/[0.05] to-transparent p-5 sm:p-7 lg:w-80 lg:border-t-0 lg:border-l">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${badgeClass}`}
              >
                <MemberRankIcon member={member} className="h-3.5 w-3.5 shrink-0" />
                BAN {member.divisionCode}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${rankBadgeClass}`}
              >
                <MemberRankIcon member={member} className="h-3 w-3 shrink-0" />
                {getMemberRankLabel(member)}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-slate-300">
                {currentIndex + 1} / {membersList.length}
              </span>
            </div>

            <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
              {member.name}
            </h3>
            <p className="mt-1 font-mono text-xs font-semibold tracking-wider text-blue-200">
              {member.role}
            </p>
            <p className="mt-1 text-sm text-slate-300">{member.roleVi}</p>

            {division && (
              <div className="mirror-subbox mt-6 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                  <span>{division.name}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {division.role}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

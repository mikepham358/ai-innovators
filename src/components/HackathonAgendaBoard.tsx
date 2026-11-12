"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Layers,
  MapPin,
  Mic,
  ShieldCheck,
} from "lucide-react";
import {
  HACKATHON_BTC_AGENDA,
  HACKATHON_PARTICIPANT_AGENDA,
  HACKATHON_PITCHING_SHIFTS,
  type BtcRoleCode,
  type HackathonAudience,
} from "@/data/club-data";

type BtcFilter = "ALL" | BtcRoleCode;

const BTC_ROLE_STYLES: Record<
  BtcRoleCode,
  {
    label: string;
    pill: string;
    dot: string;
    highlightBox: string;
  }
> = {
  CORE: {
    label: "Core Team",
    pill: "border-violet-300/35 bg-violet-500/15 text-violet-200",
    dot: "bg-violet-400",
    highlightBox: "border-violet-300/30 bg-violet-500/10 text-violet-100",
  },
  PR: {
    label: "PR • Truyền Thông",
    pill: "border-fuchsia-300/35 bg-fuchsia-500/15 text-fuchsia-200",
    dot: "bg-fuchsia-400",
    highlightBox: "border-fuchsia-300/30 bg-fuchsia-500/10 text-fuchsia-100",
  },
  LOG: {
    label: "LOG • Hậu Cần",
    pill: "border-amber-300/35 bg-amber-500/15 text-amber-200",
    dot: "bg-amber-400",
    highlightBox: "border-amber-300/30 bg-amber-500/10 text-amber-100",
  },
  DOT: {
    label: "DOT • Đào Tạo",
    pill: "border-blue-300/35 bg-blue-500/15 text-blue-200",
    dot: "bg-blue-400",
    highlightBox: "border-blue-300/30 bg-blue-500/10 text-blue-100",
  },
  HR: {
    label: "HR • Nhân Sự",
    pill: "border-rose-300/35 bg-rose-500/15 text-rose-200",
    dot: "bg-rose-400",
    highlightBox: "border-rose-300/30 bg-rose-500/10 text-rose-100",
  },
  ER: {
    label: "ER • Đối Ngoại",
    pill: "border-emerald-300/35 bg-emerald-500/15 text-emerald-200",
    dot: "bg-emerald-400",
    highlightBox: "border-emerald-300/30 bg-emerald-500/10 text-emerald-100",
  },
};

const BTC_FILTER_ORDER: BtcRoleCode[] = ["CORE", "PR", "LOG", "DOT", "HR", "ER"];

export function HackathonAgendaBoard() {
  const [audience, setAudience] = useState<HackathonAudience>("participant");
  const [btcFilter, setBtcFilter] = useState<BtcFilter>("ALL");
  const [expandedRoleCards, setExpandedRoleCards] = useState<Record<string, boolean>>({});
  const [expandAllRoles, setExpandAllRoles] = useState(false);

  const visibleSlots = useMemo(() => {
    if (audience === "participant") {
      return HACKATHON_PARTICIPANT_AGENDA;
    }
    if (btcFilter === "ALL") {
      return HACKATHON_BTC_AGENDA;
    }
    return HACKATHON_BTC_AGENDA.filter((slot) =>
      slot.roleTasks?.some((rt) => rt.role === btcFilter),
    );
  }, [audience, btcFilter]);

  const roleCounts = useMemo(() => {
    const counts: Record<BtcRoleCode, number> = {
      CORE: 0,
      PR: 0,
      LOG: 0,
      DOT: 0,
      HR: 0,
      ER: 0,
    };
    for (const slot of HACKATHON_BTC_AGENDA) {
      for (const task of slot.roleTasks ?? []) {
        counts[task.role] += 1;
      }
    }
    return counts;
  }, []);

  const toggleCardRoles = (id: string) => {
    setExpandedRoleCards((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? expandAllRoles),
    }));
  };

  const handleToggleAllRoles = () => {
    const next = !expandAllRoles;
    setExpandAllRoles(next);
    setExpandedRoleCards({});
  };

  return (
    <div className="glass-card flex flex-col justify-between rounded-2xl p-5 sm:p-6 lg:col-span-7">
      <div>
        {/* Header + Smart Audience Switcher */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-blue-300" />
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                Lịch trình Chính thức (23/01/2027)
              </h3>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
              {audience === "btc"
                ? "Chế độ Ban Tổ Chức: đầy đủ 9 chặng từ điểm danh Ekip (06:30), checklist 5 phân ban đến thu dọn & tổng kết (16:00+)."
                : "Chế độ Thí sinh tham gia: đầy đủ 8 chặng từ Check-in Sảnh chính (07:25), 8 phòng thi đấu, 10 lượt Pitching đến Trao giải (15:35)."}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Chọn đối tượng xem lịch trình Hackathon"
            className="mirror-subbox inline-flex shrink-0 items-center gap-1.5 rounded-xl p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={audience === "participant"}
              onClick={() => setAudience("participant")}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                audience === "participant"
                  ? "bg-gradient-to-r from-blue-600/85 via-cyan-600/75 to-emerald-600/75 text-white shadow-[0_0_20px_rgba(14,165,233,0.35)]"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5 text-cyan-200" />
              <span>Thí sinh tham gia</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={audience === "btc"}
              onClick={() => setAudience("btc")}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                audience === "btc"
                  ? "bg-gradient-to-r from-violet-600/80 via-indigo-600/80 to-blue-600/80 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-200" />
              <span>Ban Tổ Chức (BTC)</span>
            </button>
          </div>
        </div>

        {/* Contextual Smart Bar per Audience */}
        {audience === "btc" ? (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 font-mono text-blue-200">
                <Clock className="h-3.5 w-3.5 text-fuchsia-300" />
                Khung BTC: 06:30 - 16:00+ • Lọc nhiệm vụ theo phân ban:
              </span>
              {btcFilter === "ALL" && (
                <button
                  type="button"
                  onClick={handleToggleAllRoles}
                  className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.05] px-2 py-1 text-[11px] font-medium text-slate-200 transition hover:border-white/30 hover:text-white"
                >
                  <span>
                    {expandAllRoles ? "Thu gọn checklist ban" : "Mở tất cả checklist ban"}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      expandAllRoles ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setBtcFilter("ALL")}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                  btcFilter === "ALL"
                    ? "border-blue-300/45 bg-blue-500/20 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <span>Tất cả chặng</span>
                <span className="font-mono text-[10px] text-slate-200/80">
                  {HACKATHON_BTC_AGENDA.length}
                </span>
              </button>

              {BTC_FILTER_ORDER.map((role) => {
                const style = BTC_ROLE_STYLES[role];
                const isSelected = btcFilter === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setBtcFilter(role)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${
                      isSelected
                        ? `${style.pill} font-semibold shadow-[0_0_12px_rgba(255,255,255,0.1)]`
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    <span className="font-mono">{role}</span>
                    <span className="font-mono text-[10px] opacity-80">
                      {roleCounts[role]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-emerald-500/10 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-100">
                <Mic className="h-3.5 w-3.5 text-cyan-300" />
                Lịch chia cặp Vòng Pitching (10 Lượt • 5 phút set-up + 20 phút trình bày)
              </span>
              <span className="font-mono text-[11px] text-emerald-200">
                Check-in lúc 07:25 tại Sảnh chính
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {HACKATHON_PITCHING_SHIFTS.map((shift) => (
                <div
                  key={shift.pair}
                  className="rounded-lg border border-white/12 bg-slate-950/60 px-2.5 py-2"
                >
                  <p className="font-mono text-[11px] font-bold text-white">
                    {shift.pair}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Setup: <span className="text-slate-200">{shift.setupTime}</span>
                  </p>
                  <p className="text-[10px] text-cyan-200">
                    Pitch: <span className="font-semibold">{shift.pitchTime}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agenda Grid */}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {visibleSlots.map((slot, index) => {
            const isFullSpanTail =
              visibleSlots.length % 2 === 1 && index === visibleSlots.length - 1;
            const roleTasks = slot.roleTasks ?? [];
            const focusedRoleTask =
              audience === "btc" && btcFilter !== "ALL"
                ? roleTasks.find((rt) => rt.role === btcFilter)
                : undefined;
            const isRolesOpen = expandedRoleCards[slot.id] ?? expandAllRoles;

            return (
              <article
                key={slot.id}
                className={`mirror-subbox flex flex-col justify-between gap-2.5 rounded-xl p-3.5 ${
                  isFullSpanTail ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-fuchsia-300">
                      {String(index + 1).padStart(2, "0")} • {slot.time}
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                      {slot.phase}
                    </span>
                  </div>

                  <h4 className="mt-1.5 text-sm font-bold text-white">
                    {slot.title}
                  </h4>

                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3 shrink-0 text-blue-300" />
                    <span>{slot.location}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-300">{slot.lead}</span>
                  </p>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {slot.detail}
                  </p>

                  <ul className="mt-2 space-y-1">
                    {slot.highlights.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-200/95"
                      >
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-cyan-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BTC Division Tasks Footer */}
                {audience === "btc" && roleTasks.length > 0 && (
                  <div className="border-t border-white/10 pt-2">
                    {focusedRoleTask ? (
                      <div
                        className={`rounded-lg border px-2.5 py-2 text-[11px] leading-relaxed ${
                          BTC_ROLE_STYLES[focusedRoleTask.role].highlightBox
                        }`}
                      >
                        <span className="font-mono font-bold">
                          Nhiệm vụ {focusedRoleTask.role}:
                        </span>{" "}
                        {focusedRoleTask.task}
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleCardRoles(slot.id)}
                          className="flex w-full items-center justify-between gap-2 text-left text-[11px] text-slate-300 transition hover:text-white"
                        >
                          <span className="flex flex-wrap items-center gap-1">
                            {roleTasks.map((rt) => (
                              <span
                                key={rt.role}
                                className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                                  BTC_ROLE_STYLES[rt.role].pill
                                }`}
                              >
                                {rt.role}
                              </span>
                            ))}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-blue-200">
                            <span>{isRolesOpen ? "Ẩn" : "Chi tiết"}</span>
                            <ChevronDown
                              className={`h-3 w-3 transition-transform ${
                                isRolesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </button>

                        {isRolesOpen && (
                          <div className="mt-2 space-y-1.5">
                            {roleTasks.map((rt) => (
                              <div
                                key={rt.role}
                                className="flex items-start gap-2 rounded-lg border border-white/8 bg-slate-950/50 px-2.5 py-1.5 text-[11px] leading-relaxed text-slate-200"
                              >
                                <span
                                  className={`mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                                    BTC_ROLE_STYLES[rt.role].pill
                                  }`}
                                >
                                  {rt.role}
                                </span>
                                <span>{rt.task}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

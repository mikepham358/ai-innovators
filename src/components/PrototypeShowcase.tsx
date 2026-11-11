"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  Monitor,
  PlayCircle,
  RotateCw,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { SAMPLE_PROTOTYPES, type PrototypeItem } from "@/data/club-data";

const PROTOTYPE_ACCENTS: Record<
  PrototypeItem["accent"],
  {
    badge: string;
    borderActive: string;
    glow: string;
    dot: string;
    button: string;
  }
> = {
  violet: {
    badge: "border-violet-300/35 bg-violet-500/15 text-violet-200",
    borderActive:
      "border-violet-300/55 shadow-[0_24px_56px_-18px_rgba(139,92,246,0.38)]",
    glow: "from-violet-500/15 via-indigo-500/8 to-transparent",
    dot: "bg-violet-400",
    button:
      "border-violet-300/40 bg-gradient-to-r from-violet-600/85 to-indigo-600/85 text-white hover:brightness-110",
  },
  blue: {
    badge: "border-blue-300/35 bg-blue-500/15 text-blue-200",
    borderActive:
      "border-blue-300/55 shadow-[0_24px_56px_-18px_rgba(59,130,246,0.38)]",
    glow: "from-blue-500/15 via-cyan-500/8 to-transparent",
    dot: "bg-blue-400",
    button:
      "border-blue-300/40 bg-gradient-to-r from-blue-600/85 to-indigo-600/85 text-white hover:brightness-110",
  },
  emerald: {
    badge: "border-emerald-300/35 bg-emerald-500/15 text-emerald-200",
    borderActive:
      "border-emerald-300/55 shadow-[0_24px_56px_-18px_rgba(16,185,129,0.38)]",
    glow: "from-emerald-500/15 via-teal-500/8 to-transparent",
    dot: "bg-emerald-400",
    button:
      "border-emerald-300/40 bg-gradient-to-r from-emerald-600/85 to-teal-600/85 text-white hover:brightness-110",
  },
  fuchsia: {
    badge: "border-fuchsia-300/35 bg-fuchsia-500/15 text-fuchsia-200",
    borderActive:
      "border-fuchsia-300/55 shadow-[0_24px_56px_-18px_rgba(217,70,239,0.38)]",
    glow: "from-fuchsia-500/15 via-purple-500/8 to-transparent",
    dot: "bg-fuchsia-400",
    button:
      "border-fuchsia-300/40 bg-gradient-to-r from-fuchsia-600/85 to-violet-600/85 text-white hover:brightness-110",
  },
};

export function PrototypeShowcase() {
  const [activeId, setActiveId] = useState<string>(SAMPLE_PROTOTYPES[0].id);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [iframeReloadKey, setIframeReloadKey] = useState<number>(0);
  const [loadedIframeUrl, setLoadedIframeUrl] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeModel =
    SAMPLE_PROTOTYPES.find((item) => item.id === activeId) ??
    SAMPLE_PROTOTYPES[0];
  const accent = PROTOTYPE_ACCENTS[activeModel.accent];
  const steps = activeModel.workflowSteps ?? [];
  const currentStep = steps[activeStepIndex] ?? steps[0];
  const isIframeLoading =
    activeModel.embedMode === "iframe" &&
    loadedIframeUrl !== `${activeModel.url}#${iframeReloadKey}`;

  const handleSelectModel = (model: PrototypeItem) => {
    setActiveId(model.id);
    setActiveStepIndex(0);
    if (model.embedMode === "iframe") {
      setLoadedIframeUrl(null);
    }
  };

  const handleReloadIframe = () => {
    setLoadedIframeUrl(null);
    setIframeReloadKey((prev) => prev + 1);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(activeModel.url);
      setCopiedId(activeModel.id);
      window.setTimeout(() => {
        setCopiedId((current) =>
          current === activeModel.id ? null : current,
        );
      }, 1800);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      {/* LEFT COLUMN: 4 PROTOTYPE SELECTOR CARDS */}
      <div className="space-y-3.5 lg:col-span-5">
        {SAMPLE_PROTOTYPES.map((item) => {
          const itemAccent = PROTOTYPE_ACCENTS[item.accent];
          const isActive = item.id === activeModel.id;

          return (
            <div
              key={item.id}
              className={`mirror-card overflow-hidden rounded-2xl transition ${
                isActive
                  ? `mirror-card-executive ${itemAccent.borderActive} bg-gradient-to-br ${itemAccent.glow}`
                  : "hover:border-white/30"
              }`}
            >
              <button
                type="button"
                onClick={() => handleSelectModel(item)}
                aria-pressed={isActive}
                className="w-full p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-300">
                      MÔ HÌNH {item.number}
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${itemAccent.badge}`}
                    >
                      {item.subject}
                    </span>
                  </div>

                  {item.embedMode === "iframe" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-200">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      LIVE WEB PREVIEW
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                      <span className={`h-1.5 w-1.5 rounded-full ${itemAccent.dot}`} />
                      {item.platform}
                    </span>
                  )}
                </div>

                <h3 className="mt-2.5 font-[family-name:var(--font-space-grotesk)] text-base font-bold leading-snug text-white sm:text-lg">
                  {item.title}
                </h3>

                <p
                  className={`mt-2 text-xs leading-relaxed text-slate-300 ${
                    isActive ? "" : "line-clamp-2"
                  }`}
                >
                  {item.description}
                </p>

                {isActive && (
                  <div className="mt-4 rounded-xl border border-white/12 bg-white/[0.04] p-3">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                      {item.outcomeLabel}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-200">
                      {item.outcome}
                    </p>
                  </div>
                )}
              </button>

              <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-white/[0.02] px-5 py-2.5">
                <button
                  type="button"
                  onClick={() => handleSelectModel(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 transition hover:text-white"
                >
                  <PlayCircle className="h-3.5 w-3.5 text-blue-300" />
                  <span>{isActive ? "Đang hiển thị preview" : "Xem preview ngay"}</span>
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 transition hover:text-blue-200"
                >
                  <span>Mở liên kết</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: INTEGRATED LUXURY BROWSER PREVIEW CONSOLE */}
      <div className="lg:sticky lg:top-24 lg:col-span-7">
        <div className="mirror-card mirror-card-executive overflow-hidden rounded-3xl">
          {/* Browser Chrome Top Bar */}
          <div className="border-b border-white/12 bg-[#070b22]/90 px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Traffic lights + Platform status */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="hidden font-mono text-[11px] font-semibold text-slate-300 sm:inline">
                  PREVIEW • MÔ HÌNH {activeModel.number}
                </span>
              </div>

              {/* Viewport & Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewportMode("desktop")}
                  aria-label="Chế độ màn hình Desktop"
                  title="Xem khung Desktop"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                    viewportMode === "desktop"
                      ? "border-white/35 bg-white/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode("mobile")}
                  aria-label="Chế độ màn hình Mobile"
                  title="Xem khung Mobile"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                    viewportMode === "mobile"
                      ? "border-white/35 bg-white/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>

                {activeModel.embedMode === "iframe" && (
                  <button
                    type="button"
                    onClick={handleReloadIframe}
                    aria-label="Tải lại trang preview"
                    title="Tải lại bản preview"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:text-white"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                )}

                <a
                  href={activeModel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ml-1 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${accent.button}`}
                >
                  <span>Mở trang gốc</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Browser Address Bar */}
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-white/12 bg-[#040615]/90 px-3 py-1.5">
              <div className="flex min-w-0 items-center gap-2">
                <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="truncate font-mono text-[11px] text-slate-300">
                  {activeModel.url}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
              >
                {copiedId === activeModel.id ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Chép link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PREVIEW VIEWPORT STAGE */}
          <div className="relative bg-[#040718] p-3 sm:p-4">
            <div
              className={`mx-auto overflow-hidden rounded-2xl border border-white/15 bg-[#070b22] transition-all duration-300 ${
                viewportMode === "mobile" ? "max-w-[390px]" : "w-full"
              }`}
            >
              {activeModel.embedMode === "iframe" ? (
                /* REAL LIVE EMBEDDED WEB APP (sat-pratice.vercel.app) */
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/10 bg-emerald-500/10 px-4 py-2 text-[11px] text-emerald-100">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <Globe className="h-3.5 w-3.5 text-emerald-300" />
                      Nhúng trực tiếp Web App tương tác (bạn có thể bấm dùng thử ngay)
                    </span>
                    <span className="font-mono text-[10px] text-emerald-300">
                      HTTP 200 • LIVE
                    </span>
                  </div>

                  {isIframeLoading && (
                    <div className="flex h-[540px] flex-col items-center justify-center gap-3 bg-[#070b22] text-slate-300 sm:h-[580px]">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
                      <p className="font-mono text-xs">
                        Đang nạp giao diện tương tác SAT Practice Platform...
                      </p>
                    </div>
                  )}

                  <iframe
                    key={`${activeModel.id}-${iframeReloadKey}`}
                    src={activeModel.url}
                    title={activeModel.title}
                    onLoad={() =>
                      setLoadedIframeUrl(`${activeModel.url}#${iframeReloadKey}`)
                    }
                    className={`w-full bg-white ${
                      isIframeLoading
                        ? "pointer-events-none h-0 opacity-0"
                        : "h-[540px] opacity-100 sm:h-[580px]"
                    }`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                  />
                </div>
              ) : (
                /* INTERACTIVE STUDIO PREVIEW FOR GOOGLE-PROTECTED LINKS (X-Frame-Options: DENY) */
                <div
                  className={`relative flex min-h-[540px] flex-col justify-between bg-gradient-to-br ${accent.glow} p-5 sm:min-h-[580px] sm:p-6`}
                >
                  <div aria-hidden="true" className="mirror-glint absolute inset-0" />

                  <div className="relative z-10 space-y-5">
                    {/* Transparent technical policy banner + instant launch button */}
                    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/15 bg-slate-950/65 p-4 backdrop-blur-md sm:flex-row sm:items-center">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                        <div>
                          <p className="text-xs font-semibold text-white">
                            Không gian xem trước tương tác • {activeModel.platform}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
                            Theo chính sách bảo mật của Google,{" "}
                            {activeModel.platform} mở trực tiếp đầy đủ tính năng ở
                            cửa sổ riêng — bấm{" "}
                            <strong>Mở trên {activeModel.platform}</strong> hoặc
                            khám phá quy trình Socratic tương tác ngay bên dưới.
                          </p>
                        </div>
                      </div>

                      <a
                        href={activeModel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${accent.button}`}
                      >
                        <span>Mở trên {activeModel.platform}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    {/* Interactive Workspace Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${accent.badge}`}
                        >
                          <Sparkles className="h-3 w-3" />
                          {activeModel.platformBadge}
                        </span>
                        <h4 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white sm:text-xl">
                          {activeModel.shortTitle} — Môn {activeModel.subject}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectModel(SAMPLE_PROTOTYPES[2])}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-200 transition hover:bg-emerald-500/25"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Thử Live Web App (Mô hình 03) →
                      </button>
                    </div>

                    {/* Interactive Workflow Simulator Tabs */}
                    {steps.length > 0 && currentStep && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {steps.map((step, index) => (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => setActiveStepIndex(index)}
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                index === activeStepIndex
                                  ? "border-white/40 bg-white/15 text-white shadow-inner"
                                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {step.tabLabel}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                          <div className="rounded-2xl border border-white/12 bg-slate-950/60 p-4">
                            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                              <Terminal className="h-3.5 w-3.5" />
                              <span>Lệnh &amp; Ngữ cảnh Học sinh</span>
                            </div>
                            <p className="mt-2.5 text-xs leading-relaxed text-slate-100 sm:text-sm">
                              “{currentStep.promptExample}”
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-4">
                            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-fuchsia-300">
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>Phản hồi Socratic của Mô hình</span>
                            </div>
                            <p className="mt-2.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                              {currentStep.assistantBehavior}
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px] text-slate-200">
                              <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                              {currentStep.pedagogyFocus}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Core Architecture Highlights */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {activeModel.highlights.map((hl) => (
                        <div
                          key={hl}
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-200"
                        >
                          <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                          {hl}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Value Card */}
                  <div className="relative z-10 mt-5 rounded-2xl border border-white/15 bg-slate-950/70 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                      {activeModel.outcomeLabel}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-100 sm:text-sm">
                      {activeModel.outcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

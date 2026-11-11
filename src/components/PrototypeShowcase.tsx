"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  Maximize2,
  Monitor,
  RotateCw,
  Smartphone,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { SAMPLE_PROTOTYPES, type PrototypeItem } from "@/data/club-data";

const CARD_THEMES: Record<
  PrototypeItem["accent"],
  {
    foilBorder: string;
    badge: string;
    cornerPip: string;
    aura: string;
    dot: string;
    ctaButton: string;
    medallionGlow: string;
  }
> = {
  violet: {
    foilBorder: "border-violet-300/30 hover:border-violet-200/60",
    badge: "border-violet-300/35 bg-violet-500/15 text-violet-100",
    cornerPip: "text-violet-200",
    aura: "from-violet-500/20 via-indigo-500/10 to-transparent",
    dot: "bg-violet-400",
    ctaButton:
      "border-violet-300/45 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:brightness-110",
    medallionGlow: "from-violet-500/25 via-indigo-500/10 to-slate-950/90",
  },
  blue: {
    foilBorder: "border-blue-300/30 hover:border-blue-200/60",
    badge: "border-blue-300/35 bg-blue-500/15 text-blue-100",
    cornerPip: "text-blue-200",
    aura: "from-blue-500/20 via-cyan-500/10 to-transparent",
    dot: "bg-blue-400",
    ctaButton:
      "border-blue-300/45 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110",
    medallionGlow: "from-blue-500/25 via-cyan-500/10 to-slate-950/90",
  },
  emerald: {
    foilBorder: "border-emerald-300/35 hover:border-emerald-200/70",
    badge: "border-emerald-300/40 bg-emerald-500/15 text-emerald-100",
    cornerPip: "text-emerald-200",
    aura: "from-emerald-500/20 via-teal-500/10 to-transparent",
    dot: "bg-emerald-400",
    ctaButton:
      "border-emerald-300/45 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110",
    medallionGlow: "from-emerald-500/25 via-teal-500/10 to-slate-950/90",
  },
  fuchsia: {
    foilBorder: "border-fuchsia-300/30 hover:border-fuchsia-200/60",
    badge: "border-fuchsia-300/35 bg-fuchsia-500/15 text-fuchsia-100",
    cornerPip: "text-fuchsia-200",
    aura: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    dot: "bg-fuchsia-400",
    ctaButton:
      "border-fuchsia-300/45 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-110",
    medallionGlow: "from-fuchsia-500/25 via-purple-500/10 to-slate-950/90",
  },
};

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getSuitIcon(id: string, className: string) {
  switch (id) {
    case "model-1":
      return <BookOpen className={className} />;
    case "model-2":
      return <Terminal className={className} />;
    case "model-3":
      return <Globe className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

function CardMiniWireframe({ item }: { item: PrototypeItem }) {
  const theme = CARD_THEMES[item.accent];

  return (
    <div
      className={`relative flex h-36 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br ${theme.medallionGlow} p-3 shadow-inner`}
    >
      {/* Mini browser top dots + live pill */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
        <div className="flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
        <span className="truncate rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-200">
          {getHostname(item.url)}
        </span>
      </div>

      {/* Center bespoke visual motif */}
      <div className="my-auto flex items-center justify-center">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/[0.08] shadow-[0_0_28px_rgba(255,255,255,0.12)] backdrop-blur-md transition duration-500 group-hover:scale-110">
          {getSuitIcon(item.id, `h-6 w-6 ${theme.cornerPip}`)}
        </div>
      </div>

      {/* Bottom status indicator */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-mono font-semibold text-slate-300">
          {item.platform}
        </span>
        {item.embedMode === "iframe" ? (
          <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            LIVE WEB
          </span>
        ) : (
          <span className="font-mono text-slate-300/80">INTERACTIVE</span>
        )}
      </div>
    </div>
  );
}

export function PrototypeShowcase() {
  const [openModelId, setOpenModelId] = useState<string | null>(null);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [iframeReloadKey, setIframeReloadKey] = useState<number>(0);
  const [loadedIframeKey, setLoadedIframeKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeModel = openModelId
    ? SAMPLE_PROTOTYPES.find((item) => item.id === openModelId) ?? null
    : null;

  useEffect(() => {
    if (!activeModel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModelId(null);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const delta = event.key === "ArrowRight" ? 1 : -1;
        setOpenModelId((currentId) => {
          if (!currentId) return null;
          const idx = SAMPLE_PROTOTYPES.findIndex((p) => p.id === currentId);
          const next =
            SAMPLE_PROTOTYPES[
              (idx + delta + SAMPLE_PROTOTYPES.length) %
                SAMPLE_PROTOTYPES.length
            ];
          return next ? next.id : currentId;
        });
        setActiveStepIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModel]);

  const handleOpenCard = (item: PrototypeItem) => {
    setOpenModelId(item.id);
    setActiveStepIndex(0);
    setLoadedIframeKey(null);
  };

  const handleReloadIframe = () => {
    setLoadedIframeKey(null);
    setIframeReloadKey((prev) => prev + 1);
  };

  const handleCopyUrl = async (item: PrototypeItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);
      window.setTimeout(() => {
        setCopiedId((curr) => (curr === item.id ? null : curr));
      }, 1800);
    } catch {
      // Clipboard may be blocked in unsupported contexts
    }
  };

  const currentStep =
    activeModel?.workflowSteps?.[activeStepIndex] ??
    activeModel?.workflowSteps?.[0];
  const isIframeLoading =
    activeModel?.embedMode === "iframe" &&
    loadedIframeKey !== `${activeModel.url}#${iframeReloadKey}`;

  return (
    <div className="mt-10">
      {/* 4 LUXURY COLLECTIBLE TAROT/PLAYING CARDS DECK */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SAMPLE_PROTOTYPES.map((item) => {
          const theme = CARD_THEMES[item.accent];

          return (
            <div key={item.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => handleOpenCard(item)}
                aria-label={`Mở Web Preview: ${item.title}`}
                className={`group mirror-card mirror-card-executive ${theme.foilBorder} relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-gradient-to-b ${theme.aura} p-4 text-left transition duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:p-5`}
              >
                {/* Static optical mirror glint + dynamic specular sweep */}
                <div aria-hidden="true" className="mirror-glint absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
                />

                {/* Inner Ornamental Card Frame Hairline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 rounded-[14px] border border-white/10"
                />

                {/* Top Corner Indices (Collector Card Header) */}
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="flex flex-col items-center leading-none">
                    <span
                      className={`font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold tracking-tight ${theme.cornerPip}`}
                    >
                      {item.number}
                    </span>
                    <span className="mt-1">
                      {getSuitIcon(item.id, `h-3.5 w-3.5 ${theme.cornerPip}`)}
                    </span>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${theme.badge}`}
                  >
                    {item.subject}
                  </span>
                </div>

                {/* Center Mini Browser Artwork */}
                <div className="relative z-10 mt-4">
                  <CardMiniWireframe item={item} />
                </div>

                {/* Editorial Card Content */}
                <div className="relative z-10 mt-4 flex-1">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300/80">
                    {item.platformBadge}
                  </p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-base font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Action Seal + Inverted Corner Pip */}
                <div className="relative z-10 mt-5 border-t border-white/12 pt-3.5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-blue-200">
                      {item.outcomeLabel}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-200">
                      {item.outcome}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white transition group-hover:text-blue-200">
                      <Maximize2 className="h-3.5 w-3.5" />
                      Mở Web Preview
                    </span>
                    <span
                      aria-hidden="true"
                      className={`rotate-180 font-[family-name:var(--font-space-grotesk)] text-sm font-extrabold ${theme.cornerPip} opacity-70`}
                    >
                      {item.number}
                    </span>
                  </div>
                </div>
              </button>

              {/* Floor Mirror Reflection Under Each Card */}
              <div aria-hidden="true" className="px-4">
                <div className="mt-1.5 h-px bg-gradient-to-r from-transparent via-slate-200/35 to-transparent" />
                <div className="mirror-floor-reflection mx-1 h-4 overflow-hidden rounded-b-xl bg-gradient-to-b from-slate-200/18 via-indigo-400/10 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* CLICK CARD -> FULL OBSIDIAN WEB PREVIEW THEATER MODAL */}
      {activeModel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Web Preview: ${activeModel.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030512]/90 p-3 backdrop-blur-2xl sm:p-5"
          onClick={() => setOpenModelId(null)}
        >
          <div
            className="mirror-card mirror-card-executive flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top Switcher Tabs Bar Across All 4 Cards */}
            <div className="flex items-center justify-between gap-3 border-b border-white/12 bg-[#070b22] px-4 py-2.5 sm:px-5">
              <div className="flex items-center gap-2 overflow-x-auto">
                <div
                  className="mr-1 hidden items-center gap-1.5 sm:flex"
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>

                {SAMPLE_PROTOTYPES.map((tab) => {
                  const isTabActive = tab.id === activeModel.id;
                  const tabTheme = CARD_THEMES[tab.accent];
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleOpenCard(tab)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                        isTabActive
                          ? "border-white/35 bg-white/15 text-white shadow-inner"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${tabTheme.dot}`}
                      />
                      <span className="font-mono">{tab.number}</span>
                      <span>{tab.shortTitle}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setOpenModelId(null)}
                aria-label="Đóng trình xem"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-white/45 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Browser Address & Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 bg-[#050819] px-4 py-2.5 sm:px-5">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/12 bg-[#02040e] px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="truncate font-mono text-xs text-slate-200">
                  {activeModel.url}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyUrl(activeModel)}
                  className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
                >
                  {copiedId === activeModel.id ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Chép</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewportMode("desktop")}
                  aria-label="Khung Desktop"
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
                  aria-label="Khung Mobile"
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
                    aria-label="Tải lại web preview"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:text-white"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                  </button>
                )}

                <a
                  href={activeModel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-bold transition ${
                    CARD_THEMES[activeModel.accent].ctaButton
                  }`}
                >
                  <span>Mở trang gốc</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Browser Stage Viewport */}
            <div className="flex-1 overflow-y-auto bg-[#030616] p-3 sm:p-4">
              <div
                className={`mx-auto overflow-hidden rounded-2xl border border-white/15 bg-[#070b22] transition-all duration-300 ${
                  viewportMode === "mobile" ? "max-w-[400px]" : "w-full"
                }`}
              >
                {activeModel.embedMode === "iframe" ? (
                  <div className="relative">
                    {isIframeLoading && (
                      <div className="flex h-[64vh] min-h-[460px] flex-col items-center justify-center gap-3 bg-[#070b22] text-slate-300">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
                        <p className="font-mono text-xs">
                          Đang nạp trang web trực tiếp ({getHostname(activeModel.url)})...
                        </p>
                      </div>
                    )}

                    <iframe
                      key={`${activeModel.id}-${iframeReloadKey}`}
                      src={activeModel.url}
                      title={activeModel.title}
                      onLoad={() =>
                        setLoadedIframeKey(
                          `${activeModel.url}#${iframeReloadKey}`,
                        )
                      }
                      className={`w-full bg-white ${
                        isIframeLoading
                          ? "pointer-events-none h-0 opacity-0"
                          : "h-[64vh] min-h-[480px] opacity-100"
                      }`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ) : (
                  <div
                    className={`relative flex min-h-[480px] flex-col justify-between bg-gradient-to-br ${
                      CARD_THEMES[activeModel.accent].aura
                    } p-5 sm:p-7`}
                  >
                    <div aria-hidden="true" className="mirror-glint absolute inset-0" />

                    <div className="relative z-10 space-y-5">
                      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/15 bg-slate-950/70 p-4 backdrop-blur-md sm:flex-row sm:items-center">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                                CARD_THEMES[activeModel.accent].badge
                              }`}
                            >
                              MÔ HÌNH {activeModel.number} • {activeModel.platform}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400">
                              {getHostname(activeModel.url)}
                            </span>
                          </div>
                          <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white sm:text-xl">
                            {activeModel.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            Trang {activeModel.platform} bảo vệ phiên Google bằng
                            chính sách trình duyệt không cho nhúng iframe ngoài
                            miền — nhấn{" "}
                            <strong className="text-white">
                              Mở trang gốc ngay
                            </strong>{" "}
                            hoặc trải nghiệm quy trình vận hành Socratic bên dưới.
                          </p>
                        </div>

                        <a
                          href={activeModel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                            CARD_THEMES[activeModel.accent].ctaButton
                          }`}
                        >
                          <span>Mở trang gốc ngay</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>

                      {activeModel.workflowSteps &&
                        activeModel.workflowSteps.length > 0 &&
                        currentStep && (
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {activeModel.workflowSteps.map((step, index) => (
                                <button
                                  key={step.id}
                                  type="button"
                                  onClick={() => setActiveStepIndex(index)}
                                  className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                                    index === activeStepIndex
                                      ? "border-white/40 bg-white/15 text-white"
                                      : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
                                  }`}
                                >
                                  {step.tabLabel}
                                </button>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div className="rounded-2xl border border-white/12 bg-slate-950/65 p-4 sm:p-5">
                                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                                  <Terminal className="h-3.5 w-3.5" />
                                  <span>Lệnh &amp; Ngữ cảnh Học sinh</span>
                                </div>
                                <p className="mt-2.5 text-xs leading-relaxed text-slate-100 sm:text-sm">
                                  “{currentStep.promptExample}”
                                </p>
                              </div>

                              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-4 sm:p-5">
                                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-fuchsia-300">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  <span>Phản hồi Socratic của Mô hình</span>
                                </div>
                                <p className="mt-2.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                                  {currentStep.assistantBehavior}
                                </p>
                                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px] text-slate-200">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      CARD_THEMES[activeModel.accent].dot
                                    }`}
                                  />
                                  {currentStep.pedagogyFocus}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {activeModel.highlights.map((hl) => (
                          <div
                            key={hl}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs text-slate-200"
                          >
                            <span
                              className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${
                                CARD_THEMES[activeModel.accent].dot
                              }`}
                            />
                            {hl}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 mt-6 rounded-2xl border border-white/15 bg-slate-950/75 p-4 backdrop-blur-md">
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
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Lock,
  Maximize2,
  MapPin,
  RotateCw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { ADVISOR_PROFILE, type AdvisorProfileData } from "@/data/club-data";

function GoogleWordmark() {
  return (
    <svg
      viewBox="0 0 74 24"
      aria-label="Google"
      className="h-4 w-auto shrink-0 sm:h-5"
    >
      <path
        fill="#4285F4"
        d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z"
      />
      <path
        fill="#EA4335"
        d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
      />
      <path
        fill="#FBBC05"
        d="M38.24 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
      />
      <path
        fill="#4285F4"
        d="M53.17 7.3v.19c-.57-.68-1.67-1.3-3.06-1.3-2.9 0-5.56 2.55-5.56 5.83 0 3.26 2.66 5.79 5.56 5.79 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.51v.81zm-2.88 8.22c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.54 3.1-3.54 1.74 0 3.1 1.52 3.1 3.54 0 2.02-1.36 3.52-3.1 3.52z"
      />
      <path fill="#34A853" d="M58.45.6h2.53v16.86h-2.53z" />
      <path
        fill="#EA4335"
        d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.97-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.74-3.45 3.05-3.45z"
      />
    </svg>
  );
}

function renderOverviewParagraph(
  text: string,
  frameworkLink: AdvisorProfileData["frameworkLink"],
) {
  const index = text.indexOf(frameworkLink.label);
  if (index === -1) {
    return text;
  }

  const before = text.slice(0, index);
  const after = text.slice(index + frameworkLink.label.length);

  return (
    <>
      {before}
      <a
        href={frameworkLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#1a73e8] underline-offset-2 hover:underline"
      >
        {frameworkLink.label}
      </a>
      {after}
    </>
  );
}

function GoogleEduDirectoryCanvas({
  profile,
}: {
  profile: AdvisorProfileData;
}) {
  return (
    <div
      style={{ aspectRatio: "2.35 / 1" }}
      className="@container w-full overflow-y-auto overflow-x-hidden bg-white text-[#202124] shadow-inner"
    >
      {/* Authentic Google for Education Directory Top Navigation */}
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-[#dadce0] bg-white/98 px-3 py-2 backdrop-blur-sm @2xl:px-6 @2xl:py-2.5">
        <div className="flex min-w-0 items-center gap-2 @2xl:gap-5">
          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <GoogleWordmark />
            <span className="text-xs font-normal tracking-tight text-[#5f6368] @2xl:text-base">
              for Education
            </span>
          </a>

          <a
            href="https://edudirectory.withgoogle.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded bg-[#f1f3f4] px-3 py-1.5 text-xs text-[#5f6368] transition hover:bg-[#e8eaed] @lg:flex @lg:w-64 @2xl:w-80"
          >
            <Search className="h-3.5 w-3.5 shrink-0 text-[#5f6368]" />
            <span className="truncate">Search any service, need, or location</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded border border-[#dadce0] bg-white px-2 py-1 text-[10px] font-medium text-[#3c4043] @2xl:px-2.5 @2xl:text-xs">
            <Globe className="h-3 w-3 text-[#5f6368]" />
            <span>EN</span>
          </span>
        </div>
      </div>

      {/* Full-Width Official Classroom Banner */}
      <div className="mirror-frame relative aspect-[3694/600] w-full overflow-hidden bg-[#e8eaed]">
        <Image
          src={profile.bannerImage}
          alt={`Google for Education Directory Banner - ${profile.name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="mirror-glint absolute inset-0 opacity-50" />
      </div>

      {/* Two-Column Directory Content */}
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-3 pb-6 @md:flex-row @md:gap-5 @md:px-5 @md:pb-8 @2xl:gap-8 @2xl:px-8 @2xl:pb-10">
        {/* Left Identity & Badge Column */}
        <div className="shrink-0 @md:w-[175px] @2xl:w-[235px]">
          <div className="flex items-end gap-3 @md:block">
            <div className="mirror-frame relative -mt-6 h-12 w-12 shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-white ring-2 ring-cyan-200/50 @md:-mt-8 @md:h-16 @md:w-16 @2xl:-mt-14 @2xl:h-28 @2xl:w-28 @2xl:border-4">
              <Image
                src={profile.portraitImage}
                alt={profile.name}
                fill
                sizes="128px"
                className="object-cover"
              />
              <div aria-hidden="true" className="mirror-glint absolute inset-0 opacity-60" />
            </div>

            <div className="pt-1 @md:pt-2 @2xl:pt-3">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold leading-tight text-[#202124] @md:text-[15px] @2xl:text-[21px]">
                {profile.name}
              </h3>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-[#5f6368] @2xl:mt-1 @2xl:text-sm">
                <MapPin className="h-3 w-3 shrink-0 text-[#5f6368]" />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>

          {/* Official Google Certified Innovator Lightbulb Badge */}
          <div className="mt-2.5 flex items-center gap-2.5 rounded-xl border border-[#e8eaed] bg-[#f8f9fa] px-2.5 py-2 @md:mt-3 @md:flex-col @md:items-center @md:py-2.5 @md:text-center @2xl:mt-4 @2xl:py-3.5">
            <Image
              src={profile.badgeImage}
              alt="Google for Education Certified Innovator"
              width={52}
              height={40}
              className="h-6 w-auto shrink-0 @2xl:h-10"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-normal text-[#5f6368] @2xl:text-xs">
                Google for Education
              </p>
              <p className="text-[11px] font-semibold text-[#202124] @2xl:text-sm">
                Certified Innovator
              </p>
            </div>
          </div>

          {/* Verified Links & Primary Google Action */}
          <div className="mt-2.5 hidden space-y-1.5 @md:block @2xl:mt-3">
            {profile.quickLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 truncate text-[11px] text-[#1a73e8] hover:underline @2xl:text-xs"
              >
                <Link2 className="h-3 w-3 shrink-0 text-[#5f6368]" />
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded bg-[#1a73e8] px-2.5 py-1.5 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#1557b0] @2xl:mt-3 @2xl:px-3 @2xl:py-2 @2xl:text-xs"
          >
            <span>View Full Profile</span>
            <ExternalLink className="h-3 w-3 @2xl:h-3.5 @2xl:w-3.5" />
          </a>
        </div>

        {/* Right Bio & Resources Column */}
        <div className="min-w-0 flex-1 @md:pt-2.5 @2xl:pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1f3f4] pb-1.5 @2xl:pb-2">
            <h4 className="text-xs font-medium text-[#3c4043] @md:text-sm @2xl:text-[19px]">
              Overview
            </h4>
            <span className="rounded-full bg-[#e8f0fe] px-2 py-0.5 text-[10px] font-medium text-[#1967d2] @2xl:px-2.5 @2xl:text-[11px]">
              #MEL26 • EdTech &amp; AI Safety
            </span>
          </div>

          <div className="mt-2.5 space-y-2 text-[11px] leading-relaxed text-[#3c4043] @md:text-xs @2xl:mt-3 @2xl:space-y-2.5 @2xl:text-[14.5px]">
            {profile.overviewParagraphs.map((paragraph, idx) => (
              <p key={idx}>
                {renderOverviewParagraph(paragraph, profile.frameworkLink)}
              </p>
            ))}
          </div>

          {/* Directory Open Resource Card */}
          <div className="mt-3 rounded-xl border border-[#dadce0] bg-[#f8f9fa] p-2.5 @2xl:mt-4 @2xl:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1967d2]">
                Directory Resource • MIT License
              </span>
              <a
                href={profile.featuredResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1a73e8] hover:underline @2xl:text-xs"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <a
              href={profile.featuredResource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-xs font-semibold text-[#202124] hover:text-[#1a73e8] @2xl:text-sm"
            >
              {profile.featuredResource.title}
            </a>
            <p className="mt-1 text-[10.5px] leading-relaxed text-[#5f6368] @2xl:text-xs">
              {profile.featuredResource.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const HIGHLIGHT_STYLES = [
  {
    Icon: Award,
    iconClasses: "border-cyan-400/35 bg-cyan-500/12 text-cyan-300",
  },
  {
    Icon: BookOpen,
    iconClasses: "border-fuchsia-400/35 bg-fuchsia-500/12 text-fuchsia-300",
  },
  {
    Icon: ShieldCheck,
    iconClasses: "border-emerald-400/35 bg-emerald-500/12 text-emerald-300",
  },
] as const;

export default function AdvisorSpotlight() {
  const [profile, setProfile] = useState<AdvisorProfileData>(ADVISOR_PROFILE);
  const [syncSource, setSyncSource] = useState<"snapshot" | "live">("snapshot");
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchLiveProfile() {
    const response = await fetch("/api/advisor-profile", { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as {
      source?: string;
      profile?: AdvisorProfileData;
    };
  }

  async function syncFromGoogleDirectory() {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const payload = await fetchLiveProfile();
      if (payload?.profile) {
        setProfile(payload.profile);
        setSyncSource(
          payload.source === "google-live-api" ? "live" : "snapshot",
        );
      }
    } catch {
      // Keep verified snapshot if network request fails.
    } finally {
      setIsSyncing(false);
    }
  }

  useEffect(() => {
    let active = true;
    void fetchLiveProfile()
      .then((payload) => {
        if (!active || !payload?.profile) return;
        setProfile(payload.profile);
        setSyncSource(
          payload.source === "google-live-api" ? "live" : "snapshot",
        );
      })
      .catch(() => {
        // Keep verified snapshot if network request fails.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  async function handleCopyUrl() {
    try {
      await navigator.clipboard.writeText(profile.profileUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1800);
    } catch {
      setCopiedUrl(false);
    }
  }

  return (
    <div id="advisor" className="mt-14 scroll-mt-24 border-t border-white/10 pt-12">
      {/* Split-Screen Showcase: Left Smart Info Panel / Right 2.35:1 Google Preview */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:items-center xl:gap-8">
        {/* Left Half: Smartly Structured Advisor Overview */}
        <div className="mirror-card mirror-card-executive flex flex-col justify-between gap-4 rounded-3xl p-5 sm:p-6 xl:p-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/12 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
              <span>{profile.roleBadge}</span>
            </div>

            <h3 className="mt-3.5 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="bg-gradient-to-r from-cyan-200 via-blue-100 to-fuchsia-200 bg-clip-text text-transparent">
                {profile.vietnameseName}
              </span>
            </h3>

            <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-emerald-300 sm:text-lg">
              {profile.vietnameseTitle}
            </p>

            <p className="mt-3 border-l-2 border-cyan-400/45 pl-3.5 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              Đồng hành cố vấn học thuật và định hướng AI an toàn chuẩn quốc tế cho
              hệ sinh thái AI INNOVATORS Vinschool Grand Park.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/12 pt-3.5">
            {profile.highlights.map((item, idx) => {
              const style =
                HIGHLIGHT_STYLES[idx] ?? HIGHLIGHT_STYLES[HIGHLIGHT_STYLES.length - 1];
              const Icon = style.Icon;
              return (
                <div
                  key={item}
                  className="mirror-subbox flex items-center gap-3 rounded-2xl px-3.5 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${style.iconClasses}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-slate-100 sm:text-[13.5px]">
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Half: Parallel 2.35 : 1 Google Directory Cinema Preview */}
        <div className="flex flex-col justify-center">
          <div className="group mirror-card mirror-card-executive relative overflow-hidden rounded-3xl shadow-[0_24px_80px_-24px_rgba(37,99,235,0.4)]">
            {/* Compact Two-Tier Luxury Browser Chrome Bar */}
            <div className="border-b border-white/12 bg-[#06091e]/95 px-3.5 py-2.5 sm:px-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/12 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>
                      {syncSource === "live" ? "Google Live Sync" : "Verified Official"}
                    </span>
                  </div>

                  <span className="rounded-full border border-cyan-300/30 bg-cyan-500/12 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-200">
                    2.35 : 1
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => void syncFromGoogleDirectory()}
                    aria-label="Đồng bộ lại dữ liệu từ Google Edu Directory"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-slate-300 transition hover:border-white/25 hover:text-white"
                  >
                    <RotateCw
                      className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-cyan-300" : ""}`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Phóng to cửa sổ xem trước 2.35:1"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-slate-300 transition hover:border-white/25 hover:text-white"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={profile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-300/45 bg-gradient-to-r from-[#1a73e8] to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:brightness-110"
                  >
                    <span>Mở trang gốc</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Live Google Directory Address Pill */}
              <div className="mt-2 flex min-w-0 items-center gap-2 rounded-xl border border-white/12 bg-slate-900/90 px-3 py-1.5">
                <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-mono text-[11px] text-slate-200 transition hover:text-white"
                >
                  {profile.profileUrl}
                </a>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  aria-label="Sao chép liên kết Google Edu Directory"
                  className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {copiedUrl ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-300">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Strict 2.35 : 1 CinemaScope Google Website Preview Canvas */}
            <GoogleEduDirectoryCanvas profile={profile} />

            {/* Subtle Interactive Footnote Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#050819]/95 px-4 py-2 text-[11px] text-slate-400">
              <span>
                Cuộn khung 2.35 : 1 •{" "}
                <strong className="text-slate-200">{profile.name}</strong> (
                <span className="font-mono text-cyan-300">
                  edudirectory.withgoogle.com
                </span>
                )
              </span>
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-blue-300 transition hover:text-white"
              >
                <span>Xác thực trên Google</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Luxury Floor Mirror Horizon Under Cinema Frame */}
          <div aria-hidden="true" className="px-4 sm:px-8">
            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />
            <div className="mirror-floor-reflection mx-2 h-4 overflow-hidden rounded-b-2xl bg-gradient-to-b from-slate-200/20 via-indigo-400/10 to-transparent" />
          </div>
        </div>
      </div>

      {/* Optional Full-Screen Cinema Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020412]/88 p-3 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Xem trước hồ sơ Google Edu Directory - ${profile.name}`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="mirror-card mirror-card-executive flex max-h-[94vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/12 bg-slate-950/95 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                  Google for Education Global • 2.35 : 1 Cinema Preview
                </p>
                <p className="truncate text-sm font-bold text-white sm:text-base">
                  {profile.vietnameseName} ({profile.name}) - {profile.vietnameseTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-blue-300/45 bg-[#1a73e8] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1557b0]"
                >
                  <span>Mở website Google</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Đóng cửa sổ xem trước"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-slate-300 transition hover:bg-white/15 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-3 sm:p-5">
              <div className="overflow-hidden rounded-2xl border border-white/15">
                <GoogleEduDirectoryCanvas profile={profile} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

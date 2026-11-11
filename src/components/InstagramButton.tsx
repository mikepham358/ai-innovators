import { CLUB_META } from "@/data/club-data";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function InstagramButton({
  variant = "hero",
}: {
  variant?: "navbar" | "hero" | "footer";
}) {
  if (variant === "navbar") {
    return (
      <a
        href={CLUB_META.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram chính thức ${CLUB_META.name} (${CLUB_META.instagramHandle})`}
        className="group inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-gradient-to-r from-[#f58529]/15 via-[#dd2a7b]/15 to-[#8134af]/15 px-3 py-2 text-xs font-semibold text-fuchsia-100 shadow-sm transition hover:border-fuchsia-300/60 hover:from-[#f58529]/25 hover:via-[#dd2a7b]/25 hover:to-[#8134af]/25 hover:text-white"
      >
        <InstagramGlyph className="h-4 w-4 text-pink-300 transition group-hover:scale-110 group-hover:text-pink-200" />
        <span className="hidden lg:inline">Instagram</span>
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={CLUB_META.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-gradient-to-r from-[#f58529]/12 via-[#dd2a7b]/12 to-[#8134af]/12 px-3 py-1.5 text-xs font-semibold text-pink-200 transition hover:border-fuchsia-300/60 hover:text-white"
      >
        <InstagramGlyph className="h-3.5 w-3.5 text-pink-300 transition group-hover:scale-110" />
        <span>{CLUB_META.instagramHandle}</span>
      </a>
    );
  }

  return (
    <a
      href={CLUB_META.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/35 bg-gradient-to-r from-[#f58529]/15 via-[#dd2a7b]/18 to-[#8134af]/20 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/20 transition hover:border-pink-300/65 hover:from-[#f58529]/25 hover:via-[#dd2a7b]/28 hover:to-[#8134af]/30"
    >
      <InstagramGlyph className="h-4 w-4 text-pink-300 transition group-hover:scale-110 group-hover:text-pink-200" />
      <span>Instagram {CLUB_META.instagramHandle}</span>
    </a>
  );
}

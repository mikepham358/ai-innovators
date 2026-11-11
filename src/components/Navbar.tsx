import { Suspense } from "react";
import Link from "next/link";
import { Code2, LogIn } from "lucide-react";
import { AuthNavStatus } from "./AuthNavStatus";

const NAV_LINKS = [
  { href: "/#mission", label: "Sứ mệnh" },
  { href: "/#workshops", label: "4 Workshop" },
  { href: "/#hackathon", label: "Hackathon 28/11" },
  { href: "/#divisions", label: "7 Chuyên ban" },
];

function AuthNavFallback() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 sm:text-sm"
    >
      <LogIn className="h-4 w-4 text-blue-300" />
      <span>Đăng nhập Gmail</span>
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050718]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/40 bg-gradient-to-br from-blue-600/30 via-violet-600/30 to-fuchsia-600/30 text-white shadow-inner transition group-hover:scale-105">
            <Code2 className="h-5 w-5 text-blue-200" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-wide text-white sm:text-lg">
                AI INNOVATORS
              </span>
              <span className="hidden rounded-md border border-fuchsia-400/30 bg-fuchsia-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-fuchsia-200 sm:inline-block">
                VGP2026
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wider text-blue-200/80">
              SAFE AI — STRONGER MINDS
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Suspense fallback={<AuthNavFallback />}>
            <AuthNavStatus />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

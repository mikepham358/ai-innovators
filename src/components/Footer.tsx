import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { CLUB_META } from "@/data/club-data";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#040614]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-white">
              {CLUB_META.name}
            </span>
            <span className="rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] text-blue-200">
              {CLUB_META.cohort}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {CLUB_META.school} • Dự án {CLUB_META.flagship} ({CLUB_META.slogan})
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-300/90">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              Tuân thủ nguyên tắc Zero PII • Không công khai dữ liệu cá nhân học sinh
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
          <Link href="/#workshops" className="hover:text-white">
            4 Workshop
          </Link>
          <Link href="/#hackathon" className="hover:text-white">
            Hackathon 28/11
          </Link>
          <Link href="/login" className="hover:text-white">
            Đăng nhập Gmail
          </Link>
          <Link href="/portal" className="hover:text-white">
            Cổng Thành Viên
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Bảo mật
          </Link>
          <Link href="/terms" className="hover:text-white">
            Điều khoản
          </Link>
        </div>
      </div>
    </footer>
  );
}

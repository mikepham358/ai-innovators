import Link from "next/link";
import { LogIn, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function AuthNavStatus() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 px-4 py-2 text-xs font-semibold text-blue-100 transition hover:border-fuchsia-400/60 hover:bg-blue-500/25 sm:text-sm"
      >
        <LogIn className="h-4 w-4 text-blue-300" />
        <span>Đăng nhập Gmail</span>
      </Link>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:brightness-110 sm:text-sm"
      >
        <LogIn className="h-4 w-4" />
        <span>Đăng nhập Gmail</span>
      </Link>
    );
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Thành viên";

  return (
    <Link
      href="/portal"
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/25 sm:text-sm"
    >
      <ShieldCheck className="h-4 w-4 text-emerald-300" />
      <span className="max-w-[140px] truncate">{displayName}</span>
      <span className="hidden rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200 sm:inline">
        Portal
      </span>
    </Link>
  );
}

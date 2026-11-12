import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PartsPromptBuilder } from "@/components/PartsPromptBuilder";
import { CLUB_META, WORKSHOPS } from "@/data/club-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

async function PortalContent() {
  const configured = isSupabaseConfigured();
  let userEmail = "hoc-sinh@gmail.com (Chế độ xem trước)";
  let userName = "Thành viên AI INNOVATORS";
  let avatarUrl: string | null = null;
  let isAuthenticated = false;

  if (configured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (!user) {
      redirect("/login?next=/portal");
    }

    isAuthenticated = true;
    userEmail = user.email ?? "Chưa có email";
    userName =
      (user.user_metadata?.full_name as string | undefined) ??
      user.email?.split("@")[0] ??
      "Thành viên AI INNOVATORS";
    avatarUrl = (user.user_metadata?.avatar_url as string | undefined) ?? null;
  }

  return (
    <div className="w-full space-y-8 px-4 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
      {!configured ? (
        <div className="mirror-subbox rounded-2xl border-amber-300/40 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100 sm:text-sm">
          <strong>Chế độ xem trước Portal:</strong> Dự án chưa gắn{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> và{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. Sau khi kết nối Supabase
          Auth trên Vercel, trang <code>/portal</code> sẽ tự động yêu cầu học
          sinh đăng nhập Gmail tại <code>/login</code>.
        </div>
      ) : null}

      {/* Member Identity Card */}
      <section className="glass-card neon-border rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <div className="mirror-frame relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-blue-300/45">
                <Image
                  src={avatarUrl}
                  alt={userName}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
                <div aria-hidden="true" className="mirror-glint absolute inset-0" />
              </div>
            ) : (
              <div className="mirror-frame flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-blue-300/45 bg-gradient-to-br from-blue-600/45 to-fuchsia-600/45 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                <div aria-hidden="true" className="mirror-glint absolute inset-0" />
                <span className="relative z-10">{userName.charAt(0).toUpperCase()}</span>
              </div>
            )}

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>
                  {isAuthenticated
                    ? "Đã xác thực qua Google (Gmail)"
                    : "Preview Mode"}
                </span>
              </div>
              <h1 className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                Xin chào, {userName}
              </h1>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-slate-300">
                <Mail className="h-3.5 w-3.5 text-blue-300" />
                <span>{userEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#hackathon"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:text-sm"
            >
              <Calendar className="h-4 w-4 text-fuchsia-300" />
              <span>Lịch Hackathon 23/01</span>
            </Link>

            {isAuthenticated ? (
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-2.5 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/25 sm:text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Đăng xuất</span>
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
              >
                <span>Đi tới trang Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Interactive PARTS Socratic Prompt Builder */}
      <PartsPromptBuilder />

      {/* Workshop Checklist */}
      <section className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-300" />
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            Lộ trình chuẩn bị Hackathon ({CLUB_META.hackathonDate})
          </h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {WORKSHOPS.map((ws) => (
            <div
              key={ws.number}
              className="mirror-subbox rounded-xl p-4"
            >
              <span className="font-mono text-xs font-semibold text-fuchsia-300">
                {ws.number}
              </span>
              <h3 className="mt-1 text-sm font-bold text-white">{ws.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {ws.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-300" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PortalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="w-full px-4 py-16 text-center text-sm text-slate-300 sm:px-8 lg:px-12 xl:px-16">
              Đang tải Cổng Thành Viên AI INNOVATORS...
            </div>
          }
        >
          <PortalContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

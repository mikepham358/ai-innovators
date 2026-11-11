import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Info, Lock, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Navbar } from "@/components/Navbar";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

async function LoginCardContent({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : "/portal";

  const configured = isSupabaseConfigured();

  if (configured) {
    const supabase = await createClient();
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        redirect(nextPath);
      }
    }
  }

  return (
    <div className="glass-card neon-border w-full max-w-md rounded-3xl p-7 sm:p-9">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">
        <Lock className="h-3.5 w-3.5" />
        <span>AI INNOVATORS MEMBER PORTAL</span>
      </div>

      <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
        Đăng nhập bằng Gmail
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        Dành cho học sinh tham gia Hackathon và thành viên CLB AI INNOVATORS
        (Vinschool Grand Park).
      </p>

      {params.error ? (
        <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
          {params.error}
        </div>
      ) : null}

      <div className="mt-6">
        <GoogleSignInButton enabled={configured} nextPath={nextPath} />
      </div>

      {!configured ? (
        <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100">
          <div className="flex items-center gap-2 font-bold text-amber-200">
            <Info className="h-4 w-4 shrink-0" />
            <span>Chưa kích hoạt biến môi trường Supabase</span>
          </div>
          <p className="mt-1.5 text-amber-100/90">
            Nút đăng nhập Google sẽ hoạt động ngay sau khi bạn thêm{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> và{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> trong Vercel Project
            Settings → Environment Variables (xem hướng dẫn chi tiết ở{" "}
            <code>README.md</code>).
          </p>
          <Link
            href="/portal"
            className="mt-3 inline-flex items-center gap-1.5 font-semibold text-white underline underline-offset-4"
          >
            <span>Xem trước giao diện Portal (Preview)</span>
          </Link>
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-slate-300">
        <div className="flex items-center gap-2 font-semibold text-emerald-300">
          <ShieldCheck className="h-4 w-4" />
          <span>Cam kết bảo mật Zero PII</span>
        </div>
        <p className="mt-1">
          Hệ thống chỉ sử dụng Tên hiển thị, Email Google và ảnh đại diện để xác
          thực phiên truy cập; không thu thập số điện thoại hay thông tin nhạy
          cảm của học sinh.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Quay lại trang chủ AI INNOVATORS</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-14 sm:px-6">
        <Suspense
          fallback={
            <div className="glass-card w-full max-w-md rounded-3xl p-9 text-center text-sm text-slate-300">
              Đang tải cổng đăng nhập Google...
            </div>
          }
        >
          <LoginCardContent {...props} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

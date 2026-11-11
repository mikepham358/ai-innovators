import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="glass-card neon-border max-w-lg rounded-2xl p-8 text-center">
        <div className="mirror-subbox mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border-fuchsia-400/35 bg-fuchsia-500/15 text-fuchsia-300">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Không thể hoàn tất đăng nhập Google
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Phiên xác thực OAuth đã hết hạn hoặc đường dẫn Redirect URL trên
          Supabase / Google Cloud Console chưa khớp với tên miền hiện tại.
        </p>
        <div className="mirror-subbox mt-6 rounded-xl p-4 text-left text-xs text-slate-300">
          <p className="font-semibold text-blue-300">Gợi ý kiểm tra nhanh:</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>
              Kiểm tra mục <strong>Redirect URLs</strong> trong Supabase
              Authentication đã có đường dẫn <code>/auth/callback</code> của
              trang web này chưa.
            </li>
            <li>
              Kiểm tra <strong>Google OAuth Consent Screen</strong> đã thêm
              Gmail của bạn vào Test Users (nếu app đang ở chế độ Testing) hoặc
              đã Publish.
            </li>
          </ul>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:brightness-110"
          >
            <RotateCcw className="h-4 w-4" />
            Thử đăng nhập lại
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}

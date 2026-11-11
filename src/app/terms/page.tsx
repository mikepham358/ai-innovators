import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CLUB_META } from "@/data/club-data";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <div className="glass-card rounded-3xl p-7 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">
            <BookOpen className="h-3.5 w-3.5" />
            <span>ACADEMIC INTEGRITY & TERMS</span>
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
            Điều khoản Sử dụng — {CLUB_META.name}
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Cập nhật: 11/11/2026 • {CLUB_META.flagship} ({CLUB_META.slogan})
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-200">
            <section>
              <h2 className="font-bold text-white">1. Mục đích học thuật</h2>
              <p className="mt-1.5 text-slate-300">
                Cổng thông tin {CLUB_META.name} được xây dựng phục vụ hoạt động
                giáo dục, chuỗi Workshop AI Literacy và cuộc thi AI Learning
                Hackathon tại {CLUB_META.school}.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-white">2. Quy tắc sử dụng AI có trách nhiệm</h2>
              <p className="mt-1.5 text-slate-300">
                Thành viên cam kết ứng dụng AI theo định hướng{" "}
                <strong>Socratic & Productive Struggle</strong>: dùng AI để gợi
                mở, phản biện và kiểm chứng nguồn tin; không sao chép thụ động
                và không đưa dữ liệu cá nhân (PII) của bản thân hay bạn bè vào
                các mô hình AI công cộng.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-white">3. Tài khoản truy cập</h2>
              <p className="mt-1.5 text-slate-300">
                Thành viên tự chịu trách nhiệm bảo mật tài khoản Google cá nhân
                khi đăng nhập vào Cổng Thành Viên và sử dụng nền tảng đúng mục
                đích học tập lành mạnh.
              </p>
            </section>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Quay lại trang chủ</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

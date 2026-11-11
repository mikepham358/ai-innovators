import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CLUB_META } from "@/data/club-data";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full flex-1 px-4 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="glass-card rounded-3xl p-7 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ZERO PII COMPLIANCE</span>
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
            Chính sách Bảo mật - {CLUB_META.name}
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Cập nhật: 11/11/2026 • Áp dụng cho {CLUB_META.school} ({CLUB_META.flagship})
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-200">
            <section>
              <h2 className="font-bold text-white">1. Phạm vi dữ liệu thu thập</h2>
              <p className="mt-1.5 text-slate-300">
                Khi học sinh hoặc thành viên đăng nhập vào Cổng Thành Viên bằng
                Google (Gmail) qua Supabase Auth, hệ thống chỉ yêu cầu các quyền
                cơ bản (<code>openid</code>, <code>email</code>,{" "}
                <code>profile</code>) để hiển thị Tên, địa chỉ Email và ảnh đại
                diện phục vụ xác thực phiên truy cập.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-white">2. Cam kết Zero PII</h2>
              <p className="mt-1.5 text-slate-300">
                Website tuân thủ nguyên tắc bảo vệ dữ liệu cá nhân học đường
                theo Nghị định 13/2023/NĐ-CP và chuẩn Đạo đức AI của UNESCO:
                không thu thập số điện thoại, số CCCD, địa chỉ nhà riêng, không
                công khai thông tin định danh cá nhân học sinh trên các trang
                công khai và không chia sẻ dữ liệu người dùng cho bên thứ ba
                vì mục đích thương mại.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-white">3. Công cụ Prompt & Học tập</h2>
              <p className="mt-1.5 text-slate-300">
                Nội dung bạn nhập vào công cụ thiết kế câu lệnh{" "}
                <strong>PARTS Builder</strong> chạy trực tiếp trên trình duyệt
                cá nhân, kèm cảnh báo tự động nếu phát hiện email hoặc số điện
                thoại trong prompt.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-white">4. Liên hệ & Hỗ trợ</h2>
              <p className="mt-1.5 text-slate-300">
                Mọi yêu cầu chỉnh sửa hoặc xóa thông tin phiên đăng nhập vui
                lòng liên hệ Giáo viên Cố vấn CLB qua email{" "}
                <span className="text-blue-300">mikepham358@gmail.com</span>.
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

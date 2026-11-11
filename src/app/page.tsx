import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Cpu,
  Layers,
  LogIn,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AdvisorSpotlight from "@/components/AdvisorSpotlight";
import { DivisionsShowcase } from "@/components/DivisionsShowcase";
import { Footer } from "@/components/Footer";
import { HeroMemberCarousel } from "@/components/HeroMemberCarousel";
import { InstagramButton } from "@/components/InstagramButton";
import { Navbar } from "@/components/Navbar";
import { PrototypeShowcase } from "@/components/PrototypeShowcase";
import {
  BLOOM_STAGES,
  CLUB_META,
  CLUB_PILLARS,
  HACKATHON_AGENDA,
  HACKATHON_SCORECARD,
  WORKSHOPS,
} from "@/data/club-data";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="w-full px-4 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-12 xl:px-16">
            <div className="grid items-center gap-8 lg:grid-cols-12 xl:gap-12">
              <div className="lg:col-span-6">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/15 px-3.5 py-1.5 text-xs font-semibold text-blue-100">
                  <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
                  <span>{CLUB_META.school}</span>
                  <span className="text-blue-400">•</span>
                  <span className="font-mono text-fuchsia-200">
                    {CLUB_META.cohort}
                  </span>
                </div>

                <h1 className="metallic-title mt-5 font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem] xl:text-[3.85rem] lg:leading-[1.06]">
                  AI INNOVATORS
                </h1>
                <p className="mt-2 font-mono text-sm font-semibold tracking-[0.22em] text-fuchsia-300 sm:text-base">
                  {CLUB_META.flagship} - {CLUB_META.slogan}
                </p>

                <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">
                  Câu lạc bộ học sinh tiên phong xây dựng năng lực{" "}
                  <strong className="text-white">AI Literacy</strong>, tư duy gợi
                  mở <strong className="text-blue-200">Socratic AI</strong> và
                  chuẩn bảo mật học đường{" "}
                  <strong className="text-emerald-300">Zero PII</strong>.
                </p>

                <blockquote className="mirror-subbox mt-5 rounded-2xl border-violet-300/30 p-4 text-sm italic leading-relaxed text-blue-100">
                  “{CLUB_META.coreQuestion}”
                </blockquote>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-700/30 transition hover:brightness-110"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Đăng nhập Thành viên (Gmail)</span>
                  </Link>
                  <Link
                    href="#workshops"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <span>Khám phá 4 Workshop</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <InstagramButton variant="hero" />
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {CLUB_META.standards.map((badge) => (
                    <span
                      key={badge}
                      className="mirror-subbox inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="group mirror-card mirror-card-executive neon-border overflow-hidden rounded-3xl p-2.5">
                  <div className="mirror-frame relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#070a24]">
                    <Image
                      src="/images/hero-banner.png"
                      alt="AI INNOVATORS - Safe AI, Stronger Minds Banner"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div aria-hidden="true" className="mirror-glint absolute inset-0" />
                    <div
                      aria-hidden="true"
                      className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
                    />
                  </div>
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-3 pb-1.5 pt-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1.5 font-medium text-blue-200">
                      <Calendar className="h-3.5 w-3.5 text-fuchsia-300" />
                      AI Learning Hackathon: {CLUB_META.hackathonDate}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      80–100 Học sinh • 20 Đội thi
                    </span>
                  </div>
                </div>
                <div aria-hidden="true" className="px-6">
                  <div className="mt-1.5 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />
                  <div className="mirror-floor-reflection mx-2 h-4 overflow-hidden rounded-b-xl bg-gradient-to-b from-slate-200/18 via-indigo-400/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          <HeroMemberCarousel />
        </section>

        {/* Core Pillars + Official Club Poster */}
        <section
          id="mission"
          className="w-full px-4 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16"
        >
          <div className="grid items-center gap-10 lg:grid-cols-12 xl:gap-12">
            <div className="lg:col-span-5">
              <div className="group mirror-card mirror-card-executive neon-border mx-auto max-w-sm overflow-hidden rounded-3xl p-2.5 lg:max-w-xl">
                <div className="mirror-frame relative aspect-[1587/2245] w-full overflow-hidden rounded-2xl bg-[#070a24]">
                  <Image
                    src="/images/club-poster.png"
                    alt="Poster chính thức CLB AI INNOVATORS - Safe AI, Stronger Minds"
                    fill
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div aria-hidden="true" className="mirror-glint absolute inset-0" />
                  <div
                    aria-hidden="true"
                    className="mirror-sweep absolute inset-y-0 -left-1/2 w-1/2"
                  />
                </div>
              </div>
              <div aria-hidden="true" className="mx-auto max-w-sm px-6 lg:max-w-xl">
                <div className="mt-1.5 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />
                <div className="mirror-floor-reflection mx-2 h-4 overflow-hidden rounded-b-xl bg-gradient-to-b from-slate-200/18 via-indigo-400/10 to-transparent" />
              </div>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                  Định hướng CLB AI INNOVATORS
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                  Từ <span className="text-blue-300">AI Skills</span> đến tư duy{" "}
                  <span className="text-fuchsia-300">AI Literacy</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Biết thao tác AI không đồng nghĩa với biết sử dụng AI an toàn và
                  hiệu quả. VIN BEYOND AI chuyển hóa AI từ “cỗ máy trả đáp án”
                  thành người đồng hành rèn luyện tư duy độc lập cho học sinh.
                </p>
              </div>

              <div className="grid gap-4">
                {CLUB_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="glass-card rounded-2xl p-5 transition hover:border-blue-400/40"
                  >
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-300">
                      {pillar.badge}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                      {pillar.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {pillar.items.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-slate-200"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Bloom Progression */}
        <section className="border-y border-white/10 bg-slate-950/45 py-16 sm:py-20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                Tiến trình phát triển năng lực (Bloom’s Taxonomy)
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                Hành trình 4 nấc: Hiểu → Thử → Xây → Chia sẻ
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BLOOM_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="glass-card flex flex-col justify-between rounded-2xl p-6 transition hover:-translate-y-1 hover:border-violet-400/45"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-blue-300">
                        {stage.step}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-fuchsia-200">
                        {stage.en}
                      </span>
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                      {stage.vi}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Pre-Hackathon Workshops */}
        <section
          id="workshops"
          className="w-full px-4 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-4xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                Chương trình đào tạo Pre-Hackathon
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                Chuỗi 4 Workshop Năng Lực AI
              </h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Được dẫn dắt bởi Ban Đào tạo (DOT) và Cố vấn Sư phạm, trang bị nền
                tảng lý thuyết, an toàn dữ liệu và kỹ năng chế tác nguyên mẫu.
              </p>
            </div>
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/15 px-4 py-2.5 text-xs font-semibold text-blue-100 transition hover:bg-blue-500/25 sm:text-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>Mở PARTS Prompt Builder</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {WORKSHOPS.map((ws) => (
              <article
                key={ws.number}
                className="glass-card flex flex-col justify-between rounded-2xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 font-mono text-xs font-semibold text-blue-200">
                      {ws.number}
                    </span>
                    <Cpu className="h-5 w-5 text-violet-300" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                    {ws.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-fuchsia-200/90">
                    {ws.subtitle}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {ws.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {ws.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-white/10 bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AI Learning Hackathon Day */}
        <section
          id="hackathon"
          className="border-y border-white/10 bg-slate-950/50 py-16 sm:py-20"
        >
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Sự kiện trọng điểm
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                  AI Learning Hackathon 2026
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-200 sm:text-sm">
                <span className="mirror-subbox inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2">
                  <Calendar className="h-4 w-4 text-fuchsia-300" />
                  {CLUB_META.hackathonDate} ({CLUB_META.hackathonTime})
                </span>
                <span className="mirror-subbox inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2">
                  <MapPin className="h-4 w-4 text-blue-300" />
                  {CLUB_META.hackathonLocation}
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              {/* Scorecard */}
              <div className="glass-card rounded-2xl p-6 lg:col-span-5">
                <div className="flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-fuchsia-300" />
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                    5 Tiêu chí Chấm điểm (Scorecard)
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Trợ lý AI được đánh giá không phải vì giải nhanh nhất, mà vì khả
                  năng dẫn dắt học sinh tự suy nghĩ an toàn.
                </p>
                <div className="mt-5 space-y-3.5">
                  {HACKATHON_SCORECARD.map((item) => (
                    <div
                      key={item.label}
                      className="mirror-subbox rounded-xl p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-white">
                          {item.label}
                        </span>
                        <span className="rounded-md bg-gradient-to-r from-blue-600/40 to-fuchsia-600/40 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-100">
                          {item.weight}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Agenda */}
              <div className="glass-card rounded-2xl p-6 lg:col-span-7">
                <div className="flex items-center gap-2.5">
                  <Layers className="h-5 w-5 text-blue-300" />
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                    Lịch trình Ngày hội Thi đấu (28/11/2026)
                  </h3>
                </div>
                <div className="mt-5 space-y-4">
                  {HACKATHON_AGENDA.map((slot) => (
                    <div
                      key={slot.time}
                      className="mirror-subbox flex flex-col gap-2 rounded-xl p-4 sm:flex-row sm:items-start sm:gap-5"
                    >
                      <div className="shrink-0 font-mono text-xs font-bold text-fuchsia-300 sm:w-32 sm:pt-0.5">
                        {slot.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {slot.title}
                          </h4>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-blue-200">
                            {slot.lead}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">
                          {slot.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Prototypes & Live Showcase */}
        <section
          id="prototypes"
          className="border-y border-white/10 bg-white/[0.02] py-16 sm:py-20"
        >
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-4xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Sản Phẩm Mẫu • Minh Chứng Năng Lực Thực Thi
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
                Các Mô Hình &amp; Sản Phẩm AI Đã Triển Khai
              </h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Danh mục các sản phẩm và nguyên mẫu thực tế mà thành viên câu lạc
                bộ đã ứng dụng AI để sáng tạo trong các môn học trước đó - chạm vào
                từng thẻ bài để mở Web Preview tương tác của sản phẩm gốc.
              </p>
            </div>

            <PrototypeShowcase />
          </div>
        </section>

        {/* 7 Divisions */}
        <section
          id="divisions"
          className="w-full px-4 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16"
        >
          <div className="max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              Mô hình Classroom as a Career Lab • Zero PII
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
              7 Ban Chuyên Trách (Gen 1.0)
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Đội ngũ Ban Chủ Nhiệm, Trưởng ban và thành viên nòng cốt vận hành theo
              chuẩn tổ chức chuyên nghiệp - trưng bày theo từng ban trong không gian
              gương kính khói sang trọng, bảo lưu tuyệt đối thông tin định danh cá nhân.
            </p>
          </div>

          <DivisionsShowcase />

          <AdvisorSpotlight />
        </section>

        {/* Member Portal CTA */}
        <section className="w-full px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12 xl:px-16">
          <div className="neon-border glass-card rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-4xl">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Cổng Thành Viên & Học Sinh
                </span>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
                  Đăng nhập bằng Gmail để mở AI Learning Toolkit
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Truy cập trình thiết kế câu lệnh Socratic chuẩn{" "}
                  <strong>PARTS</strong>, bộ kiểm tra{" "}
                  <strong>Zero PII</strong> và tài nguyên ôn tập trước ngày
                  Hackathon 28/11/2026.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
              >
                <LogIn className="h-4 w-4 text-blue-600" />
                <span>Đăng nhập bằng Google</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

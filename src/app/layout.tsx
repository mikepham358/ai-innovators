import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://ai-innovators-vgp.vercel.app"
  ),
  title: "AI INNOVATORS - Safe AI, Stronger Minds | Vinschool Grand Park",
  description:
    "Câu lạc bộ Học sinh AI INNOVATORS (Gen 1.0 • VGP2026) - Dự án VIN BEYOND AI: Phổ cập AI Literacy, Prompt Engineering PARTS, AI Safety & AI Learning Hackathon.",
  openGraph: {
    title: "AI INNOVATORS - Safe AI, Stronger Minds",
    description:
      "Cộng đồng học sinh tiên phong về AI có trách nhiệm, tư duy Socratic và Zero PII tại Vinschool Grand Park.",
    images: ["/images/hero-banner.png"],
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "_KlO4IuAnf87EFkL-OW67DCPfaTfglvNSdjtrH5rIq8",
  },
};

import { CosmicGalaxyCanvas } from "@/components/CosmicGalaxyCanvas";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="cyber-bg min-h-full flex flex-col text-slate-100 selection:bg-fuchsia-500/30 selection:text-white">
        <CosmicGalaxyCanvas />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

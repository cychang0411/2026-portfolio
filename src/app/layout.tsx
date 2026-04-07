import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vicky-chang.com"),
  title: "Vicky Chang | UX/UI Designer",
  description:
    "A responsive UX/UI designer portfolio inspired by keynote-grade Bento layouts, featuring selected work, playground experiments, daily frames, and bilingual content.",
  openGraph: {
    title: "Vicky Chang | UX/UI Designer",
    description:
      "A responsive UX/UI designer portfolio inspired by keynote-grade Bento layouts, featuring selected work, playground experiments, daily frames, and bilingual content.",
    url: "https://vicky-chang.com",
    siteName: "Vicky Chang Portfolio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicky Chang | UX/UI Designer",
    description:
      "A responsive UX/UI designer portfolio inspired by keynote-grade Bento layouts, featuring selected work, playground experiments, daily frames, and bilingual content.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hans"
      className={cn("h-full", "antialiased", inter.variable, geistMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

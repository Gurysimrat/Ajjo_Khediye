import type { Metadata, Viewport } from "next";

// Self-hosted fonts via @fontsource — avoids Google Fonts fetch at
// build time (network-restricted environments). Weights match the
// previous next/font/google config.
import "@fontsource/fredoka/400.css";
import "@fontsource/fredoka/500.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";
import "@fontsource-variable/noto-sans-gurmukhi";

import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ajjo Khediye | ਅੱਜੋ ਖੇਡੀਏ",
  description:
    "A living Punjabi storybook — play, explore, and grow up with Uda Singh and friends in the village of Ajjo Khediye.",
};

export const viewport: Viewport = {
  themeColor: "#FBF3E4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-ink font-body overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

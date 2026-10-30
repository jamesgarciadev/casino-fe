import type { Metadata } from "next";
import { JetBrains_Mono, Work_Sans } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const display = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const body = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "0dds.bet Admin", template: "%s · 0dds.bet Admin" },
  description: "Internal console for moderators, admins and owners.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

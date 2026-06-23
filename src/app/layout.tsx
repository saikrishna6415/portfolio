import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saikrishna Kotagiri — Full Stack Developer",
  description:
    "Senior Full Stack Developer specializing in React, React Native, and modern backend technologies. Building high-performance apps with exceptional UX.",
  keywords: [
    "Full Stack Developer",
    "React",
    "React Native",
    "UI/UX",
    "Web Development",
    "Mobile Development",
    "TypeScript",
  ],
  authors: [{ name: "Saikrishna Kotagiri" }],
  creator: "Saikrishna Kotagiri",
  openGraph: {
    title: "Saikrishna Kotagiri — Full Stack Developer",
    description:
      "Senior Full Stack Developer specializing in React, React Native, and modern backend technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saikrishna Kotagiri — Full Stack Developer",
    description:
      "Senior Full Stack Developer specializing in React, React Native, and modern backend technologies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}
      >
        <ThemeProvider>
          <ClientThemeProvider>{children}</ClientThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

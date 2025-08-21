import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClientThemeProvider } from "@/components/ClientThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saikrishna Kotagiri - Full Stack Developer",
  description: "Full stack developer with expertise in React, React Native, and modern backend technologies. Focused on creating high-performance applications with exceptional user experiences.",
  keywords: ["Full Stack Developer", "React", "React Native", "UI/UX", "Web Development", "Mobile Development"],
  authors: [{ name: "Saikrishna Kotagiri" }],
  creator: "Saikrishna Kotagiri",
  openGraph: {
    title: "Saikrishna Kotagiri - Full Stack Developer",
    description: "Full stack developer with expertise in React, React Native, and modern backend technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saikrishna Kotagiri - Full Stack Developer",
    description: "Full stack developer with expertise in React, React Native, and modern backend technologies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ClientThemeProvider>
            {children}
          </ClientThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

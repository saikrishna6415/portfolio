import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saikrishna Kotagiri | Senior Full Stack Developer",
  description: "Senior Full Stack Developer specializing in React, React Native, Node.js and modern web technologies. Expert in creating high-performance, responsive applications.",
  authors: [
    { name: "Saikrishna Kotagiri" }
  ],
  keywords: [
    "Full Stack Developer", 
    "React Developer", 
    "React Native Developer", 
    "JavaScript Engineer", 
    "TypeScript Developer", 
    "Frontend Engineer", 
    "Web Developer", 
    "Mobile App Developer",
    "Node.js Developer"
  ],
  creator: "Saikrishna Kotagiri",
  publisher: "Saikrishna Kotagiri",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    title: "Saikrishna Kotagiri | Senior Full Stack Developer",
    description: "Senior Full Stack Developer specializing in React, React Native, Node.js and modern web technologies.",
    url: "https://saikrishna-kotagiri.com",
    siteName: "Saikrishna Kotagiri Portfolio",
    images: [
      {
        url: '/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: "Saikrishna Kotagiri"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Saikrishna Kotagiri | Senior Full Stack Developer",
    description: "Senior Full Stack Developer specializing in React, React Native, Node.js and modern web technologies.",
    images: ['/images/profile.jpg']
  },
  icons: {
    icon: '/images/profile.jpg',
    apple: '/images/profile.jpg',
  },
  metadataBase: new URL('https://saikrishna-kotagiri.com'),
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/profile.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/images/profile.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-accent focus:outline-accent"
        >
          Skip to content
        </a>
        <ScrollProgressBar showPercentage height={3} />
        <Providers>
          {children}
          <Analytics />

          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}

"use client";

import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import CustomCursor from "@/components/CustomCursor";
import MarqueeStrip from "@/components/MarqueeStrip";
import WaveDivider from "@/components/WaveDivider";
import MatrixHudOverlay from "@/components/MatrixHudOverlay";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";

// Lazy load non-critical sections
const Experience = lazy(() => import("@/sections/Experience"));
const Skills = lazy(() => import("@/sections/Skills"));
const Publications = lazy(() => import("@/sections/Publications"));
const Contact = lazy(() => import("@/sections/Contact"));
const Workspace = lazy(() => import("@/sections/Workspace"));

const SectionLoading = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(124,58,237,0.3)", borderTopColor: "#7c3aed" }} />
  </div>
);

export default function Home() {
  return (
    <>
      {/* Global unique experiences */}
      <CustomCursor />
      <MatrixHudOverlay />

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[9990]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.028,
          mixBlendMode: "overlay",
        }}
      />

      <Header />
      <main id="main-content">
        <Hero />

        {/* Morphing Wave & Marquee between Hero and About */}
        <WaveDivider accentColor="#7c3aed" height={60} />
        <MarqueeStrip direction="left" speed={40} accent="#7c3aed" />

        <About />
        <Suspense fallback={<SectionLoading />}>
          <Experience />
        </Suspense>

        {/* Morphing Wave & Marquee between Experience and Projects */}
        <WaveDivider accentColor="#06b6d4" height={60} flip />
        <MarqueeStrip direction="right" speed={30} accent="#06b6d4" />

        <Suspense fallback={<SectionLoading />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Skills />
        </Suspense>

        {/* Morphing Wave & Marquee between Skills and Workspace */}
        <WaveDivider accentColor="#ec4899" height={60} />
        <MarqueeStrip direction="left" speed={45} accent="#ec4899" />

        <Suspense fallback={<SectionLoading />}>
          <Workspace />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Publications />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

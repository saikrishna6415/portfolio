"use client";

import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";

// Lazy load non-critical sections
const Experience = lazy(() => import("@/sections/Experience"));
const Skills = lazy(() => import("@/sections/Skills"));
const Publications = lazy(() => import("@/sections/Publications"));
const Contact = lazy(() => import("@/sections/Contact"));
const Workspace = lazy(() => import("@/sections/Workspace"));

// Loading fallbacks
const SectionLoading = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-accent/30 border-t-accent animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Suspense fallback={<SectionLoading />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Skills />
        </Suspense>
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
    </>
  );
}

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Publications from "@/sections/Publications";
import Contact from "@/sections/Contact";
import Workspace from "@/sections/Workspace";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Workspace />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

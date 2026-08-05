"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Sparkles } from "lucide-react";
import { scrollToSection, initSmoothScrolling } from "@/utils/scrollTransition";
import { audioSynth } from "@/utils/audioSynth";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Workspace", href: "#workspace" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hudMode, setHudMode] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cleanup = initSmoothScrolling();
    return cleanup;
  }, []);

  useEffect(() => {
    const handleScrollActiveSection = () => {
      if (isScrollingRef.current) return;
      const scrollPosition = window.scrollY + 180;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].href.replace("#", ""));
        return;
      }
      let currentSection = "home";
      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollActiveSection);
    handleScrollActiveSection();
    return () => {
      window.removeEventListener("scroll", handleScrollActiveSection);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    audioSynth.playClickBlip();
    const id = href.replace("#", "");
    isScrollingRef.current = true;
    setActiveSection(id);
    scrollToSection(id);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const active = audioSynth.toggleAudio();
    setSoundEnabled(active);
    if (active) audioSynth.playSuccessBurst();
  };

  const toggleHudMode = () => {
    audioSynth.playClickBlip();
    setHudMode(!hudMode);
    document.documentElement.classList.toggle("hud-mode");
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Unique pill nav bar */}
        <div
          className={`pointer-events-auto relative flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-[#080b14]/90 backdrop-blur-xl border border-[rgba(124,58,237,0.3)] shadow-[0_0_35px_rgba(124,58,237,0.2)]"
              : "bg-[#080b14]/65 backdrop-blur-lg border border-[rgba(255,255,255,0.08)]"
          }`}
        >
          {/* Brand Logo & Live Pulse */}
          <Link
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            onMouseEnter={() => audioSynth.playHoverPop()}
            className="mr-2 px-2.5 py-1 flex items-center gap-2 group"
          >
            <div className="font-mono text-xs font-bold text-white tracking-widest flex items-center gap-1">
              <span className="text-cyan-400 font-black">[</span>
              <span>SK</span>
              <span className="text-cyan-400 font-black">]</span>
            </div>
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </Link>

          <div className="w-px h-4 bg-white/10 mr-1" />

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  onMouseEnter={() => audioSynth.playHoverPop()}
                  className={`relative px-3 py-1.5 text-xs font-mono tracking-tight rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-violet-400/40 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="w-px h-4 bg-white/10 mx-1 hidden lg:block" />

          {/* Interactive Audio Synth Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            onMouseEnter={() => audioSynth.playHoverPop()}
            className={`p-2 rounded-full transition-all text-xs font-mono flex items-center gap-1.5 ${
              soundEnabled
                ? "bg-violet-500/20 text-cyan-300 border border-violet-400/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title={soundEnabled ? "Audio Synth FX Enabled" : "Enable Audio Synth FX"}
          >
            {soundEnabled ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
            <span className="hidden sm:inline text-[10px]">{soundEnabled ? "SFX ON" : "SFX"}</span>
          </button>

          {/* Unique Matrix HUD Mode Toggle */}
          <button
            type="button"
            onClick={toggleHudMode}
            onMouseEnter={() => audioSynth.playHoverPop()}
            className={`p-2 rounded-full transition-all text-xs font-mono flex items-center gap-1.5 ${
              hudMode
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Toggle Matrix HUD Overlay"
          >
            <Sparkles size={14} className={hudMode ? "text-cyan-400 animate-spin-slow" : ""} />
            <span className="hidden sm:inline text-[10px]">{hudMode ? "HUD MODE" : "HUD"}</span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-full text-slate-400 hover:text-white transition-all ml-1"
            onClick={() => {
              audioSynth.playClickBlip();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden pointer-events-auto"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-[#080b14]/95 backdrop-blur-2xl border border-violet-500/30 rounded-2xl p-3 shadow-2xl space-y-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                        isActive
                          ? "bg-violet-600/25 text-cyan-300 border border-violet-500/40"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
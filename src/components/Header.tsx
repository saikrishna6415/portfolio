"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection, initSmoothScrolling } from "@/utils/scrollTransition";

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

      const scrollPosition = window.scrollY + 180; // height of header + buffer
      
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
    // Initial check
    handleScrollActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScrollActiveSection);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
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

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Pill nav container */}
        <div
          className={`relative flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-[#0d1117]/85 backdrop-blur-xl border border-[rgba(124,58,237,0.25)] shadow-[0_0_30px_rgba(124,58,237,0.12)]"
              : "bg-[#0d1117]/50 backdrop-blur-md border border-[rgba(255,255,255,0.06)]"
          }`}
        >
          {/* Logo mark */}
          <Link
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="mr-3 px-3 py-1.5 group flex items-center gap-1.5"
          >
            <span className="font-display font-bold text-sm text-white tracking-tight">
              SK
            </span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-[rgba(255,255,255,0.1)] mr-1" />

          {/* Desktop nav items */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-[var(--text-secondary)] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activePillBorder"
                      className="absolute inset-0 rounded-full border border-[var(--accent)]/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — drops down from header */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-[#0d1117]/95 backdrop-blur-2xl border border-[rgba(124,58,237,0.2)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[var(--accent)]/15 text-white border border-[var(--accent)]/25"
                          : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      )}
                      {item.name}
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
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Monitor, Laptop, Cpu, LayoutGrid, Headphones, Coffee, ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import Image from "next/image";

const workspaceImages = [
  {
    src: "/images/workspace-1.jpg",
    alt: "Main development setup",
    title: "Main Workstation",
    description: "Where I spend most of my time developing applications",
  },
  {
    src: "/images/workspace-2.jpg",
    alt: "Mobile development environment",
    title: "Mobile Testing Station",
    description: "Where I test and debug mobile applications",
  },
  {
    src: "/images/workspace-3.jpg",
    alt: "Collaborative workspace",
    title: "Collaboration Corner",
    description: "Where I brainstorm and collaborate with teams",
  },
];

const specs = [
  { icon: <Laptop size={18} />, label: "Machine", value: "M3 Max MacBook Pro", color: "#7c3aed" },
  { icon: <Monitor size={18} />, label: "Display", value: "Dual 4K Monitors", color: "#06b6d4" },
  { icon: <Cpu size={18} />, label: "Memory", value: "32GB Unified RAM", color: "#ec4899" },
  { icon: <LayoutGrid size={18} />, label: "IDE", value: "VSCode + Custom Setup", color: "#a78bfa" },
  { icon: <Headphones size={18} />, label: "Audio", value: "Noise-Cancelling ANC", color: "#f59e0b" },
  { icon: <Coffee size={18} />, label: "Fuel", value: "Strong Filter Coffee ☕", color: "#10b981" },
];

export default function Workspace() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prev = () => setCurrent(c => (c === 0 ? workspaceImages.length - 1 : c - 1));
  const next = () => setCurrent(c => (c + 1) % workspaceImages.length);

  return (
    <section id="workspace" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] opacity-15"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(124,58,237,0.2) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Header */}
        <motion.div className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          Setup
        </motion.div>
        <motion.h2 className="font-display font-bold mb-16 text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          My Dev{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}>
            Workspace
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3 group"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={current} className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <Image src={workspaceImages[current].src} alt={workspaceImages[current].alt}
                    fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  {/* Overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,8,16,0.8) 0%, transparent 50%)" }} />
                  {/* Mouse glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124,58,237,0.2) 0%, transparent 60%)` }} />
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-display font-semibold text-white text-lg">{workspaceImages[current].title}</div>
                    <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{workspaceImages[current].description}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => setModal(current)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}>
                <Maximize2 size={15} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {workspaceImages.map((img, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden transition-all duration-200"
                  style={{ border: `1px solid ${i === current ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.06)"}`, opacity: i === current ? 1 : 0.5 }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Tech specs ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display font-bold text-white text-2xl mb-2">Where the Magic Happens</h3>
            <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
              My workspace is engineered for peak productivity — powerful hardware, an ergonomic setup, and a distraction-free environment designed to ship exceptional software.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specs.map((spec, i) => (
                <motion.div key={spec.label}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  whileHover={{ borderColor: `${spec.color}35`, boxShadow: `0 0 20px ${spec.color}20`, y: -2 }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${spec.color}18`, color: spec.color }}>
                    {spec.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>{spec.label}</div>
                    <div className="text-sm font-medium text-white">{spec.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div className="mt-6 p-5 rounded-xl" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
              <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
                &ldquo;A clean workspace is the foundation of clean code. Every tool here is chosen intentionally to maximize focus and flow.&rdquo;
              </p>
              <div className="mt-2 text-xs font-mono" style={{ color: "var(--accent)" }}>— Saikrishna Kotagiri</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(null)}>
            <motion.div className="relative max-w-5xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <Image src={workspaceImages[modal].src} alt={workspaceImages[modal].alt} fill className="object-cover" sizes="100vw" />
              <button onClick={() => setModal(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white z-10"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                id="workspace-modal-close" aria-label="Close lightbox">
                <X size={18} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(5,8,16,0.9), transparent)" }}>
                <div className="font-display font-semibold text-white text-xl">{workspaceImages[modal].title}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{workspaceImages[modal].description}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
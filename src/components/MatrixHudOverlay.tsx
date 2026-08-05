"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, ShieldCheck, Radio } from "lucide-react";

export default function MatrixHudOverlay() {
  const [active, setActive] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setActive(document.documentElement.classList.contains("hud-mode"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // FPS Counter Simulator
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
    }, 1500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-[9980] overflow-hidden"
      >
        {/* Corner Target Reticles */}
        <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-[10px] text-cyan-400/80 bg-black/60 px-3 py-1.5 rounded border border-cyan-500/30 backdrop-blur-md">
          <Cpu size={12} className="animate-pulse text-cyan-400" />
          <span>HUD // MATRIX ACTIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-3 font-mono text-[10px] text-violet-400/80 bg-black/60 px-3 py-1.5 rounded border border-violet-500/30 backdrop-blur-md">
          <Activity size={12} className="text-emerald-400" />
          <span>FPS: {fps}</span>
          <span className="text-slate-500">|</span>
          <ShieldCheck size={12} className="text-cyan-400" />
          <span>SECURE</span>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-black/60 px-3 py-1.5 rounded border border-white/10 backdrop-blur-md">
          <Radio size={12} className="text-rose-400 animate-pulse" />
          <span>SYS.LATENCY: 12ms</span>
        </div>

        {/* Diagonal Corner Lines */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/60" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/60" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/60" />

        {/* Scanline Sweep */}
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_15px_#06b6d4]"
        />
      </motion.div>
    </AnimatePresence>
  );
}

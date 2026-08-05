"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { createTimeline, stagger } from "animejs";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowDown, Sparkles, Terminal } from "lucide-react";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import { useScramble } from "@/hooks/useScramble";
import { triggerParticleBurst } from "@/utils/animeEffects";
import { audioSynth } from "@/utils/audioSynth";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const svgTextRef = useRef<SVGTextElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  const { output: matterText, scramble: rescramble } = useScramble({ text: "Matter", speed: 35, revealDelay: 600 });

  // Cursor glow tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Anime.js v4 Entrance Choreography
    const timeline = createTimeline({
      defaults: { ease: "outExpo" },
    });

    // 1. Draw SVG Background Stencil
    if (svgTextRef.current) {
      const textEl = svgTextRef.current as unknown as SVGGeometryElement;
      const len = typeof textEl.getTotalLength === "function" ? textEl.getTotalLength() : 1000;
      timeline.add(svgTextRef.current, {
        strokeDashoffset: [len, 0],
        opacity: [0, 0.09],
        duration: 2200,
        ease: "inOutCubic",
      });
    }

    // 2. Cascade Heading Words
    if (heroHeadingRef.current) {
      const words = heroHeadingRef.current.querySelectorAll(".anime-word");
      timeline.add(
        words,
        {
          opacity: [0, 1],
          translateY: [40, 0],
          rotateZ: [5, 0],
          scale: [0.9, 1],
          delay: stagger(90),
          duration: 1000,
          ease: "outElastic(1, .6)",
        },
        "-=1800"
      );
    }

    // 3. Spiral Social Icons In
    if (socialIconsRef.current) {
      const icons = socialIconsRef.current.querySelectorAll(".anime-social");
      timeline.add(
        icons,
        {
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [-180, 0],
          delay: stagger(70, { start: 100 }),
          duration: 800,
          ease: "outBack",
        },
        "-=600"
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    audioSynth.playSuccessBurst();
    if (ctaBtnRef.current) {
      triggerParticleBurst(ctaBtnRef.current, { count: 24, distance: 90 });
    }
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  const roles = [
    "Full Stack Developer",
    "React & React Native Expert",
    "UI/UX Enthusiast",
    "Performance Optimizer",
  ];

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com/saikrishna6415", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/saikrishna-kotagiri", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://twitter.com/name__is_sai", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "https://instagram.com/saikrishna.kotagiri", label: "Instagram" },
    { icon: <Mail size={18} />, href: "mailto:saikrishnakotagiri16@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050810]"
    >
      {/* Cursor-following ambient radial glow */}
      {mounted && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(650px circle at ${springX.get()}px ${springY.get()}px, rgba(124,58,237,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[650px] h-[650px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 70%)",
            filter: "blur(50px)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Anime.js SVG Line-Draw Stencil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
        <svg viewBox="0 0 1200 300" className="w-full max-w-6xl h-auto">
          <text
            ref={svgTextRef}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.5"
            className="font-display font-black text-[130px] md:text-[180px] tracking-tighter opacity-0"
          >
            SAIKRISHNA
          </text>
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Asymmetric Cyber Magazine Header Tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-violet-950/40 border border-violet-500/30 font-mono text-[11px] text-cyan-300 mb-8"
        >
          <Terminal size={12} className="text-violet-400" />
          <span>[ 00 // SENIOR SOLUTION ARCHITECT ]</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 text-left">

            {/* Typewriter Command Chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.25)] shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-cyan-300 tracking-wider">
                  {">"}
                  &nbsp;
                  <AnimatedTypewriter
                    phrases={roles}
                    typingSpeed={70}
                    deletingSpeed={35}
                    className="text-cyan-300"
                  />
                  <span className="opacity-70">_</span>
                </span>
              </div>
            </motion.div>

            {/* Kinetic Title */}
            <div className="space-y-2">
              <h1
                ref={heroHeadingRef}
                className="font-display font-bold leading-[1.08] tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", color: "#f8fafc" }}
              >
                <span className="anime-word inline-block opacity-0">Building</span>{" "}
                <span
                  className="anime-word inline-block bg-clip-text text-transparent opacity-0"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #c084fc 0%, #06b6d4 50%, #ec4899 100%)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer-slide 4s linear infinite",
                  }}
                >
                  Digital
                </span>
                <br />
                <span className="anime-word inline-block text-white opacity-0">Architectures</span>{" "}
                <span className="anime-word inline-block text-white opacity-0">That</span>{" "}
                <span
                  className="anime-word relative inline-block cursor-pointer font-mono opacity-0"
                  style={{
                    WebkitTextStroke: "2px rgba(192,132,252,0.7)",
                    color: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                  onMouseEnter={() => {
                    audioSynth.playHoverPop();
                    rescramble();
                  }}
                  title="Hover to scramble"
                >
                  {matterText}
                </span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-xl text-slate-300 font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Senior Solution Architect with{" "}
              <span className="text-white font-semibold underline decoration-cyan-400/50 underline-offset-4">5+ years</span> crafting
              ultra-fast{" "}
              <span className="text-violet-300 font-medium">React</span>,{" "}
              <span className="text-cyan-300 font-medium">React Native</span> &{" "}
              <span className="text-emerald-300 font-medium">Spring Boot</span> architectures — scaling mobile & web platforms worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a
                ref={ctaBtnRef}
                href="#contact"
                onClick={handleCtaClick}
                onMouseEnter={() => {
                  audioSynth.playHoverPop();
                  if (ctaBtnRef.current) {
                    triggerParticleBurst(ctaBtnRef.current, { count: 14, distance: 55 });
                  }
                }}
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_35px_rgba(124,58,237,0.5)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
              >
                <Sparkles size={16} className="text-cyan-300 animate-pulse" />
                <span className="relative z-10">Start Project / Hire</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </a>

              <a
                href="#experience"
                onMouseEnter={() => audioSynth.playHoverPop()}
                onClick={(e) => {
                  e.preventDefault();
                  audioSynth.playClickBlip();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider font-medium text-slate-200 border border-white/15 bg-white/5 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-500/10"
              >
                Explore Track Record
              </a>
            </motion.div>

            {/* Social Icons */}
            <div ref={socialIconsRef} className="flex items-center gap-3 pt-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => audioSynth.playHoverPop()}
                  className="anime-social w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                >
                  {social.icon}
                </a>
              ))}

              <div className="flex items-center gap-2 ml-3 text-slate-400 font-mono text-xs">
                <div className="w-px h-5 bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Q3/Q4 Roles</span>
              </div>
            </div>
          </div>

          {/* Right Profile 3D Glass Hologram Column (5 cols) */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">
              {/* Rotating Orbit Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-violet-500/30 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              />

              {/* Glowing Radial Orb */}
              <div
                className="absolute inset-8 rounded-full animate-glow-pulse pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Profile Image - Hex Clip */}
              <motion.div
                className="absolute inset-10 overflow-hidden hex-clip bg-gradient-to-br from-violet-900/30 to-cyan-900/30 shadow-2xl border border-white/10"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Saikrishna Kotagiri — Senior Full Stack Developer"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </motion.div>

              {/* Floating Badge - Top Right */}
              <motion.div
                className="absolute -top-3 -right-2 glass-card px-3.5 py-2.5 rounded-xl shadow-2xl border border-violet-500/30"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🚀</span>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Architecture</div>
                    <div className="text-xs font-semibold text-white">Solution Lead</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge - Bottom Left */}
              <motion.div
                className="absolute -bottom-3 -left-2 glass-card px-3.5 py-2.5 rounded-xl shadow-2xl border border-cyan-500/30"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Experience</div>
                    <div className="text-xs font-semibold text-white">5+ Years</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
            scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-400"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
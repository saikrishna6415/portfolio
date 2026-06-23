"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowDown } from "lucide-react";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import { useScramble } from "@/hooks/useScramble";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
      {/* ── Cursor-following glow ── */}
      {mounted && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(600px circle at ${springX.get()}px ${springY.get()}px, rgba(124,58,237,0.07), transparent 70%)`,
          }}
          // We use a plain div that updates via spring below
        />
      )}

      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Violet orb top-left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Cyan orb bottom-right */}
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
            animationDelay: "1.5s",
          }}
        />
        {/* Fuchsia orb center-right */}
        <div
          className="absolute top-1/2 right-[15%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "glow-pulse 5s ease-in-out infinite 3s",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Giant stencil text (background) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span
          className="font-display font-black select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 18vw, 220px)",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          SAIKRISHNA
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text content ── */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Terminal typewriter pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                <span className="font-mono text-xs text-[var(--accent-cyan)] tracking-wider">
                  {">"}
                  &nbsp;
                  <AnimatedTypewriter
                    phrases={roles}
                    typingSpeed={70}
                    deletingSpeed={35}
                    className="text-[var(--accent-cyan)]"
                  />
                  <span className="opacity-70">_</span>
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text-primary)" }}>
                Building{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #06b6d4 60%, #ec4899 100%)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer-slide 4s linear infinite",
                  }}
                >
                  Digital
                </span>
                <br />
                <span className="text-white">Solutions That</span>{" "}
                <span
                  className="relative inline-block cursor-pointer font-mono"
                  style={{
                    WebkitTextStroke: "2px rgba(167,139,250,0.6)",
                    color: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                  onMouseEnter={rescramble}
                  title="hover me"
                >
                  {matterText}
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Senior Full Stack Developer with{" "}
              <span className="text-white font-medium">5+ years</span> crafting
              high-performance{" "}
              <span style={{ color: "var(--accent-hover)" }}>React</span> &{" "}
              <span style={{ color: "var(--accent-cyan)" }}>React Native</span>{" "}
              applications — across web, iOS & Android.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
              >
                <span className="relative z-10">Let&apos;s Work Together</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </a>
              <a
                href="#experience"
                onClick={(e) => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
                style={{
                  color: "var(--text-primary)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; e.currentTarget.style.background = "rgba(124,58,237,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                View Experience
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="flex items-center gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(124,58,237,0.15)",
                    borderColor: "rgba(124,58,237,0.4)",
                    color: "#a78bfa",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                >
                  {social.icon}
                </motion.a>
              ))}

              {/* Divider + status */}
              <div className="flex items-center gap-2 ml-2" style={{ color: "var(--text-muted)" }}>
                <div className="w-px h-5 bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono">Available for work</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Profile visual ── */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">

              {/* Outer rotating ring — violet */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px dashed rgba(124,58,237,0.35)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              />

              {/* Inner rotating ring — cyan */}
              <motion.div
                className="absolute inset-5 rounded-full"
                style={{
                  border: "1px dashed rgba(6,182,212,0.25)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              />

              {/* Orbiting dots */}
              {[
                { color: "#7c3aed", size: 10, radius: 0, delay: 0, dur: 25 },
                { color: "#06b6d4", size: 8, radius: 20, delay: 1.5, dur: 18 },
                { color: "#ec4899", size: 6, radius: 10, delay: 3, dur: 22 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full shadow-lg"
                  style={{
                    width: dot.size,
                    height: dot.size,
                    backgroundColor: dot.color,
                    boxShadow: `0 0 10px ${dot.color}`,
                    top: "50%",
                    left: "50%",
                    marginTop: -dot.size / 2,
                    marginLeft: -dot.size / 2,
                  }}
                  animate={{
                    x: [
                      `${(50 + dot.radius) * (i % 2 === 0 ? 1 : -1)}%`,
                      `${(50 + dot.radius) * (i % 2 === 0 ? -1 : 1)}%`,
                      `${(50 + dot.radius) * (i % 2 === 0 ? 1 : -1)}%`,
                    ],
                    y: [
                      `${-(50 + dot.radius)}%`,
                      `${50 + dot.radius}%`,
                      `${-(50 + dot.radius)}%`,
                    ],
                  }}
                  transition={{
                    duration: dot.dur,
                    ease: "linear",
                    repeat: Infinity,
                    delay: dot.delay,
                  }}
                />
              ))}

              {/* Glow behind image */}
              <div
                className="absolute inset-8 rounded-full animate-glow-pulse"
                style={{
                  background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Profile image — hex clip */}
              <motion.div
                className="absolute inset-10 overflow-hidden hex-clip"
                style={{
                  background: "linear-gradient(135deg, #7c3aed22, #06b6d422)",
                }}
                whileHover={{ scale: 1.03 }}
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

              {/* Floating badge — top right */}
              <motion.div
                className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-xl shadow-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <div>
                    <div className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>Open to</div>
                    <div className="text-xs font-semibold text-white">Opportunities</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-xl shadow-xl"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <div className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>Experience</div>
                    <div className="text-xs font-semibold text-white">5+ Years</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — left */}
              <motion.div
                className="absolute top-1/2 -left-12 -translate-y-1/2 glass-card px-3 py-2 rounded-xl shadow-xl"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold" style={{ color: "var(--accent-hover)" }}>20+</div>
                  <div className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>Projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)" }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
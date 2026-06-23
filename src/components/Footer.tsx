"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: <Github size={18} />, href: "https://github.com/saikrishna6415", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/saikrishna-kotagiri", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://twitter.com/name__is_sai", label: "Twitter" },
    { icon: <Mail size={18} />, href: "mailto:saikrishnakotagiri16@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Publications", href: "#publications" },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Top glow divider */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.5), rgba(236,72,153,0.5), transparent)" }} />

      {/* Giant CTA section */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        {/* Background stencil */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-display font-black select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(60px, 16vw, 200px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.03)",
              color: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            LET&apos;S TALK
          </span>
        </div>

        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "glow-pulse 5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "glow-pulse 4s ease-in-out infinite 2s",
            }}
          />
        </div>

        {/* CTA content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="section-label justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.div>

          <motion.h2
            className="font-display font-bold mb-6 text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Have an idea?{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa 0%, #06b6d4 50%, #ec4899 100%)", backgroundSize: "200%", animation: "shimmer-slide 4s linear infinite" }}
            >
              Let&apos;s build it.
            </span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg mb-10 max-w-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I&apos;m always open to new opportunities, interesting projects, and creative collaborations.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            href="mailto:saikrishnakotagiri16@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-semibold text-base md:text-lg text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              boxShadow: "0 0 0 rgba(124,58,237,0)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(124,58,237,0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            saikrishnakotagiri16@gmail.com
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Social row */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
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
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(5,8,16,0.6)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo + location */}
            <div className="flex items-center gap-4">
              <Link href="#home" className="font-display font-bold text-xl text-white">
                SK<span style={{ color: "var(--accent)" }}>.</span>
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                <MapPin size={11} />
                Hyderabad, India
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-mono transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              © {currentYear} Saikrishna Kotagiri
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
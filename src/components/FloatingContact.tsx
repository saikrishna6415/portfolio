"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/utils/scrollTransition";

const methods = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: "saikrishnakotagiri16@gmail.com",
    short: "Send an email",
    action: () => window.open("mailto:saikrishnakotagiri16@gmail.com"),
    color: "#7c3aed",
  },
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: "+91 9989966415",
    short: "Call me",
    action: () => window.open("tel:+919989966415"),
    color: "#06b6d4",
  },
  {
    icon: <Linkedin size={16} />,
    label: "LinkedIn",
    value: "saikrishna-kotagiri",
    short: "Connect on LinkedIn",
    action: () => window.open("https://linkedin.com/in/saikrishna-kotagiri", "_blank"),
    color: "#0077b5",
  },
];

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Expanded panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="w-72 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(13,17,23,0.92)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)",
                }}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Panel header */}
                <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-display font-semibold text-white text-sm">Available Now</span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    Open to projects & opportunities
                  </p>
                </div>

                {/* Contact methods */}
                <div className="p-3 space-y-1">
                  {methods.map((m, i) => (
                    <motion.button
                      key={m.label}
                      onClick={m.action}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group"
                      style={{ color: "var(--text-secondary)" }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.04)", x: 2 }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{ background: `${m.color}18`, color: m.color }}>
                        {m.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-mono tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                        <div className="text-sm text-white truncate">{m.short}</div>
                      </div>
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: m.color }} />
                    </motion.button>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-3 pb-3">
                  <motion.button
                    onClick={() => { scrollToSection("contact"); setIsExpanded(false); }}
                    className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Open Contact Form
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.button
            onClick={() => setIsExpanded(v => !v)}
            className="relative w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: isExpanded
                ? "rgba(239,68,68,0.9)"
                : "linear-gradient(135deg, #7c3aed, #a78bfa)",
              boxShadow: isExpanded
                ? "0 0 30px rgba(239,68,68,0.4)"
                : "0 0 30px rgba(124,58,237,0.5)",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label={isExpanded ? "Close contact" : "Open contact"}
          >
            {/* Pulse ring when closed */}
            {!isExpanded && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(167,139,250,0.5)" }}
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <MessageCircle size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

const items = [
  "React Native", "TypeScript", "Node.js", "Spring Boot", "AWS Lambda",
  "Firebase", "Redux", "GraphQL", "MongoDB", "PostgreSQL", "Fastlane",
  "Docker", "CI/CD", "React", "iOS SDK", "Android SDK", "Next.js",
  "Framer Motion", "REST APIs", "Microservices",
];

interface MarqueeStripProps {
  direction?: "left" | "right";
  speed?: number;
  accent?: string;
}

export default function MarqueeStrip({ direction = "left", speed = 35, accent = "#7c3aed" }: MarqueeStripProps) {
  // Duplicate to fill seamlessly
  const doubled = [...items, ...items];
  const distance = direction === "left" ? "-50%" : "0%";
  const start = direction === "left" ? "0%" : "-50%";

  return (
    <div className="relative overflow-hidden py-4 select-none"
      style={{
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: [start, distance] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
            />
            <span className="font-mono text-sm tracking-wide" style={{ color: "var(--text-muted)" }}>
              {item}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

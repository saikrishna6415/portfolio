"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    title: "Associate Solution Architect",
    company: "Lillia",
    location: "Mumbai, Maharashtra (Remote)",
    period: "June 2020 – Present",
    current: true,
    color: "#7c3aed",
    glowColor: "rgba(124,58,237,0.25)",
    tags: ["React Native", "Redux", "Spring Boot", "AWS", "Firebase", "Fastlane"],
    description: [
      "Designed & developed a cross-platform iOS/Android app for chronic health management with React Native & Redux — features include meal/activity log, chat, and device data integration.",
      "Integrated native modules & SDKs (Apple HealthKit, Android sensor libraries), and collaborated on back-end API development using Java Spring Boot.",
      "Built scalable backend with AWS (S3 + Lambda) and Firebase (Auth, Realtime DB), reducing release cycle by ~70% via automated CI/CD with Fastlane & GitHub Actions.",
      "Refactored codebase following best practices, achieving ~30% faster startup time and significantly reduced crash rates.",
    ],
  },
  {
    title: "Software Engineer",
    company: "MountBlue Technologies",
    location: "Bangalore",
    period: "Feb 2020 – May 2020",
    current: false,
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.2)",
    tags: ["React", "Node.js", "Express", "REST APIs", "Agile"],
    description: [
      "Trained in full-stack JavaScript development — React, Node.js, Express.js, REST APIs.",
      "Studied Agile/Scrum, SDLC, and production system troubleshooting.",
      "Collaborated with cross-functional teams to deliver client projects on time.",
      "Gained hands-on experience in modern web development technologies and best practices.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.div>

        {/* Section heading */}
        <motion.h2
          className="font-display font-bold mb-16 text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Where I&apos;ve{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}
          >
            Worked
          </span>
        </motion.h2>

        <div ref={sectionRef} className="relative">
          {/* Glowing timeline spine */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background: "linear-gradient(180deg, #7c3aed 0%, #06b6d4 50%, #ec4899 100%)",
                boxShadow: "0 0 12px rgba(124,58,237,0.4)",
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-10 pl-16 md:pl-20">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: typeof experiences[number];
  index: number;
}) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline bullet */}
      <div
        className="absolute -left-[3.2rem] md:-left-[3.5rem] top-6 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: exp.color,
          boxShadow: `0 0 16px ${exp.glowColor}`,
          border: "3px solid var(--background)",
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{ scale: exp.current ? [1, 1.4, 1] : 1, opacity: exp.current ? [1, 0.6, 1] : 1 }}
          transition={{ duration: 2, repeat: exp.current ? Infinity : 0 }}
        />
      </div>

      {/* Horizontal connector */}
      <div
        className="absolute -left-9 md:-left-10 top-[2.1rem] w-6 h-px"
        style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
      />

      {/* Glass card */}
      <div
        className="relative rounded-2xl p-6 md:p-8 overflow-hidden group transition-all duration-300 hover:shadow-2xl"
        style={{
          background: "rgba(13,17,23,0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${exp.color}40`;
          e.currentTarget.style.boxShadow = `0 0 40px ${exp.glowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top-right glow accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${exp.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Company badge */}
        <div className="absolute top-5 right-5 md:top-6 md:right-6">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
            style={{
              background: `${exp.color}15`,
              border: `1px solid ${exp.color}35`,
              color: exp.color,
            }}
          >
            <Briefcase size={11} />
            {exp.current ? "Current" : "Past"}
          </div>
        </div>

        {/* Header */}
        <div className="mb-5 pr-20">
          <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1">
            {exp.title}
          </h3>
          <div className="font-semibold text-base" style={{ color: exp.color }}>
            {exp.company}
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {exp.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {exp.period}
            </span>
          </div>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2.5 mb-6">
          {exp.description.map((item, i) => (
            <motion.li
              key={i}
              className="flex gap-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <ChevronRight
                size={14}
                className="flex-shrink-0 mt-0.5"
                style={{ color: exp.color }}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tag row */}
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span key={tag} className="tech-pill" style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}0d` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
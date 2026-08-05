"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { animate } from "animejs";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const experiences = [
  {
    title: "Associate Solution Architect",
    company: "Lillia",
    location: "Mumbai, Maharashtra (Remote)",
    period: "June 2020 – Present",
    current: true,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.25)",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && svgLineRef.current) {
      const totalLen = svgLineRef.current.getTotalLength?.() || 1200;
      animate(svgLineRef.current, {
        strokeDashoffset: [totalLen, 0],
        strokeDasharray: totalLen,
        duration: 1800,
        ease: "inOutCubic",
      });
    }
  }, [inView]);

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section label */}
        <motion.div
          className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          02 // EXPERIENCE
        </motion.div>

        {/* Section heading reveal */}
        <div className="mb-16">
          <SectionReveal>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Engineering{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c084fc, #06b6d4)" }}
              >
                Track Record
              </span>
            </h2>
          </SectionReveal>
        </div>

        <div className="relative">
          {/* SVG Animated Timeline Line-Draw */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-4 -ml-2 pointer-events-none">
            <svg className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path
                ref={svgLineRef}
                d="M8,0 L8,2000"
                stroke="url(#timelineGrad)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
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
  exp: (typeof experiences)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (cardInView && cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateX: [-40, 0],
        rotateZ: [-2, 0],
        duration: 800,
        delay: index * 150,
        ease: "outElastic(1, .8)",
      });
    }
  }, [cardInView, index]);

  return (
    <div ref={cardRef} className="relative opacity-0">
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
          animate(e.currentTarget, {
            scale: 1.015,
            translateY: -4,
            duration: 350,
            ease: "outQuad",
          });
          e.currentTarget.style.borderColor = `${exp.color}40`;
          e.currentTarget.style.boxShadow = `0 0 40px ${exp.glowColor}`;
        }}
        onMouseLeave={(e) => {
          animate(e.currentTarget, {
            scale: 1,
            translateY: 0,
            duration: 350,
            ease: "outQuad",
          });
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
            {exp.current ? "Current Role" : "Previous Role"}
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
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <ChevronRight
                size={14}
                className="flex-shrink-0 mt-0.5"
                style={{ color: exp.color }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Tag row */}
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span key={tag} className="tech-pill cursor-default" style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}0d` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
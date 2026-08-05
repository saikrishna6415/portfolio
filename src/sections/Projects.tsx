"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { animate } from "animejs";
import { Monitor, Smartphone, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import SectionReveal from "@/components/SectionReveal";
import { scrambleText } from "@/utils/animeEffects";

const projects = [
  {
    title: "React Native SDK",
    platform: "Mobile",
    type: "Full-time",
    description:
      "Engineered an SDK to streamline integration of proprietary services into third-party apps — reducing partner integration time by 60%.",
    tags: ["React Native", "TypeScript", "SDK", "Android/iOS"],
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
    number: "01",
    emoji: "🧩",
  },
  {
    title: "White-Label Healthcare App",
    platform: "Mobile",
    type: "Full-time",
    description:
      "Architected a white-label mobile app for a clinic chain — patient management, appointment scheduling, and remote consultations.",
    tags: ["React Native", "Firebase", "Healthcare", "White-Label"],
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    number: "02",
    emoji: "🏥",
  },
  {
    title: "Fitness & Health App",
    platform: "Mobile",
    type: "Full-time",
    description:
      "Contributed to a leading fitness app — workout tracking, diet planning, and live-streaming classes for 100k+ users.",
    tags: ["React Native", "Redux", "Node.js", "Streaming"],
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    number: "03",
    emoji: "💪",
  },
  {
    title: "Parenting Support Platform",
    platform: "Web",
    type: "Full-time",
    description:
      "Enhanced a high-traffic parenting web platform — performance optimization, SEO improvements, and new community features.",
    tags: ["React", "SEO", "Performance", "Community"],
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
    number: "04",
    emoji: "👨‍👩‍👧",
  },
  {
    title: "Restaurant Discovery App",
    platform: "Web",
    type: "Freelance",
    description:
      "Designed and developed a restaurant discovery & reservations web app with robust search and Google Maps integration.",
    tags: ["React", "Node.js", "Google Maps API", "UX"],
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    number: "05",
    emoji: "🍽️",
  },
  {
    title: "Educational Treasure Hunt",
    platform: "Mobile",
    type: "Freelance",
    description:
      "Interactive location-based treasure hunt game for children — gamification + geolocation to encourage outdoor learning.",
    tags: ["React Native", "Gamification", "Geolocation", "Kids"],
    accent: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    number: "06",
    emoji: "🗺️",
  },
  {
    title: "Digital Newspaper Platform",
    platform: "Web",
    type: "Freelance",
    description:
      "Built the front-end for a responsive e-paper platform — intuitive reading experience for a major digital publisher.",
    tags: ["React", "Responsive", "UI/UX", "Publishing"],
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.25)",
    number: "07",
    emoji: "📰",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at 100% 100%, rgba(6,182,212,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10" ref={sectionRef}>
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            className="section-label mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionReveal>
              <h2
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
              >
                Projects &{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #ec4899)" }}
                >
                  Builds
                </span>
              </h2>
            </SectionReveal>

            <motion.p
              className="text-sm font-mono md:text-right"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Scroll horizontally →
            </motion.p>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 px-4 md:px-8 lg:px-16 pb-8 overflow-x-auto snap-x snap-mandatory"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(124,58,237,0.4) transparent",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
            touchAction: "pan-x",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-4" />
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true });

  useEffect(() => {
    if (cardInView && cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        rotateY: [-45, 0],
        translateY: [40, 0],
        scale: [0.9, 1],
        duration: 900,
        delay: index * 100,
        easing: "outElastic(1, .8)",
      });

      if (numberRef.current) {
        scrambleText(numberRef.current, project.number, { duration: 1000 });
      }
    }
  }, [cardInView, index, project.number]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 snap-start w-[300px] md:w-[360px] lg:w-[400px] opacity-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <TiltCard
        tiltAmount={8}
        glareColor={`${project.glow}`}
        className="flex flex-col rounded-2xl overflow-hidden group cursor-pointer h-full"
        style={{
          background: "rgba(13,17,23,0.85)",
          border: "1px solid rgba(255,255,255,0.06)",
          minHeight: "460px",
          boxShadow: "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Color glow top border */}
        <div
          className="h-1 w-full flex-shrink-0"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, ${project.accent}60)`,
            boxShadow: `0 0 16px ${project.glow}`,
          }}
        />

        {/* Card content */}
        <div className="flex flex-col flex-1 p-6 md:p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div
              ref={numberRef}
              className="text-4xl font-display font-black leading-none select-none opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              style={{ color: project.accent }}
            >
              {project.number}
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                style={{
                  background: `${project.accent}15`,
                  border: `1px solid ${project.accent}30`,
                  color: project.accent,
                }}
              >
                {project.platform === "Mobile" ? <Smartphone size={10} /> : <Monitor size={10} />}
                {project.platform}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-muted)",
                }}
              >
                {project.type}
              </span>
            </div>
          </div>

          {/* Emoji + Title */}
          <div className="mb-3">
            <span className="text-3xl mb-2 block">{project.emoji}</span>
            <h3
              className="font-display font-bold text-xl md:text-2xl text-white leading-tight group-hover:text-opacity-90 transition-colors"
            >
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="tech-pill"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}30`,
                  background: `${project.accent}0d`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer arrow */}
          <div className="flex items-center gap-2 text-xs font-mono mt-auto pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
            <span>View details</span>
            <div
              className="group-hover:translate-x-1.5 transition-transform duration-200"
              style={{ color: project.accent }}
            >
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
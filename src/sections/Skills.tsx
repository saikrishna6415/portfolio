"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import SectionReveal from "@/components/SectionReveal";
import { animateElasticCounter } from "@/utils/animeEffects";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "⚛️",
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.2)",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "React Native", level: 92, icon: "📱" },
      { name: "TypeScript", level: 88, icon: "🔷" },
      { name: "JavaScript", level: 90, icon: "🟨" },
      { name: "CSS / Tailwind", level: 85, icon: "🎨" },
      { name: "Redux", level: 88, icon: "💜" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "⚙️",
    color: "#68A063",
    glow: "rgba(104,160,99,0.2)",
    skills: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Express.js", level: 83, icon: "🚀" },
      { name: "Spring Boot", level: 80, icon: "🌱" },
      { name: "Java", level: 78, icon: "☕" },
      { name: "REST APIs", level: 90, icon: "🔗" },
      { name: "GraphQL", level: 70, icon: "⬡" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "☁️",
    color: "#FF9900",
    glow: "rgba(255,153,0,0.2)",
    skills: [
      { name: "AWS S3 + Lambda", level: 78, icon: "🟠" },
      { name: "Firebase", level: 88, icon: "🔥" },
      { name: "GitHub Actions", level: 80, icon: "⚡" },
      { name: "Fastlane", level: 75, icon: "🏎️" },
      { name: "Docker", level: 72, icon: "🐋" },
      { name: "CI/CD", level: 82, icon: "🔄" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "🗄️",
    color: "#336791",
    glow: "rgba(51,103,145,0.25)",
    skills: [
      { name: "PostgreSQL", level: 75, icon: "🐘" },
      { name: "MongoDB", level: 78, icon: "🍃" },
      { name: "Firebase Realtime", level: 85, icon: "⚡" },
      { name: "Redis", level: 65, icon: "❤️" },
      { name: "DynamoDB", level: 68, icon: "🟠" },
      { name: "Firestore", level: 85, icon: "🔥" },
    ],
  },
];

function AnimeSkillBar({ level, color }: { level: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true });

  useEffect(() => {
    if (inView && fillRef.current) {
      animate(fillRef.current, {
        width: ["0%", `${level}%`],
        duration: 1400,
        easing: "outElastic(1, .75)",
      });
    }
  }, [inView, level]);

  return (
    <div ref={barRef} className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        ref={fillRef}
        className="h-full rounded-full"
        style={{
          width: "0%",
          background: `linear-gradient(90deg, ${color}, ${color}90)`,
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const active = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(600px circle at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)",
              "radial-gradient(600px circle at 80% 50%, rgba(6,182,212,0.06) 0%, transparent 60%)",
              "radial-gradient(600px circle at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section label */}
        <motion.div
          className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Technical Arsenal
        </motion.div>

        <div className="mb-4">
          <SectionReveal>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Skills &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}
              >
                Expertise
              </span>
            </h2>
          </SectionReveal>
        </div>

        <motion.p
          className="mb-12 max-w-xl text-base"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          An arsenal of modern technologies built through 5+ years of shipping real products.
        </motion.p>

        {/* Category selector tabs */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
              style={{
                color: activeCategory === cat.id ? "white" : "var(--text-secondary)",
                background:
                  activeCategory === cat.id ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                border:
                  activeCategory === cat.id
                    ? `1px solid ${cat.color}50`
                    : "1px solid rgba(255,255,255,0.07)",
                boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.glow}` : "none",
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ background: `${cat.color}10` }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {active.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} color={active.color} glow={active.glow} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Overall proficiency bar */}
        <motion.div
          className="mt-16 rounded-2xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--text-muted)" }}>
            Overall Proficiency
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Frontend", value: 92, color: "#61DAFB" },
              { label: "Backend", value: 81, color: "#68A063" },
              { label: "Cloud/DevOps", value: 78, color: "#FF9900" },
              { label: "Databases", value: 76, color: "#336791" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <span style={{ color: item.color }}>{item.value}%</span>
                </div>
                <AnimeSkillBar level={item.value} color={item.color} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
  color,
  glow,
}: {
  skill: { name: string; level: number; icon: string };
  index: number;
  color: string;
  glow: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: [20, 0],
        duration: 600,
        delay: index * 60,
        easing: "outElastic(1, .8)",
      });
    }

    if (numRef.current) {
      animateElasticCounter(numRef.current, skill.level, { suffix: "%", duration: 1200 });
    }
  }, [index, skill.level]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl p-5 overflow-hidden group cursor-default transition-all duration-300 opacity-0"
      style={{
        background: "rgba(13,17,23,0.7)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        animate(e.currentTarget, {
          translateY: -5,
          scale: 1.02,
          duration: 300,
          easing: "outQuad",
        });
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${glow}`;
      }}
      onMouseLeave={(e) => {
        animate(e.currentTarget, {
          translateY: 0,
          scale: 1,
          duration: 300,
          easing: "outQuad",
        });
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="relative z-10">
        {/* Icon + name row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{skill.icon}</span>
            <span className="font-display font-semibold text-sm text-white">{skill.name}</span>
          </div>
          <span
            ref={numRef}
            className="font-mono text-xs font-bold"
            style={{ color }}
          >
            0%
          </span>
        </div>

        {/* Progress bar */}
        <AnimeSkillBar level={skill.level} color={color} />

        {/* Level label */}
        <div className="mt-3 text-right">
          <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
            {skill.level >= 90
              ? "Expert"
              : skill.level >= 80
              ? "Advanced"
              : skill.level >= 70
              ? "Proficient"
              : "Competent"}
          </span>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { MapPin, Code2, Zap, BookOpen } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import InteractiveConsole from "@/components/InteractiveConsole";
import { animateElasticCounter } from "@/utils/animeEffects";

function AnimeCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numRef, { once: true });

  useEffect(() => {
    if (inView && numRef.current) {
      animateElasticCounter(numRef.current, target, { suffix, duration: 1600 });
    }
  }, [inView, target, suffix]);

  return (
    <span ref={numRef} className="tabular-nums inline-block">
      0{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && bentoGridRef.current) {
      const cards = bentoGridRef.current.children;
      animate(cards, {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.95, 1],
        delay: stagger(100, { start: 100 }),
        duration: 800,
        ease: "outElastic(1, .75)",
      });
    }
  }, [inView]);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-30"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-20"
          style={{
            background: "radial-gradient(circle at 0% 100%, rgba(6,182,212,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section label & heading reveal */}
        <motion.div
          className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          01 // ARCHITECTURE & VISION
        </motion.div>

        <div className="mb-12">
          <SectionReveal>
            <h2 className="font-display font-bold text-white text-3xl md:text-5xl">
              Architecting Applications with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400">
                Precision & Passion
              </span>
            </h2>
          </SectionReveal>
        </div>

        {/* Bento Grid */}
        <div
          ref={bentoGridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(140px,auto)]"
        >
          {/* ── Cell 1: Big quote (spans 8 cols) ── */}
          <div
            className="md:col-span-8 relative rounded-2xl p-8 md:p-10 overflow-hidden group opacity-0"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
            />
            <div className="absolute top-4 left-8 font-display font-black text-[120px] leading-none select-none"
              style={{ color: "rgba(124,58,237,0.06)" }}>
              &ldquo;
            </div>
            <p className="relative z-10 font-display text-xl md:text-2xl lg:text-3xl font-semibold leading-tight text-white">
              Building digital experiences that feel{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}
              >
                fast, intuitive,
              </span>{" "}
              and alive.
            </p>
            <p className="relative z-10 mt-4 text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Senior Full Stack Developer with 5+ years shipping high-performance web & mobile apps
              across React, React Native, and modern backend stacks.
            </p>
          </div>

          {/* ── Cell 2: Years stat ── */}
          <div
            className="md:col-span-4 relative rounded-2xl p-6 flex flex-col justify-between group overflow-hidden opacity-0"
            style={{
              background: "rgba(6,182,212,0.07)",
              border: "1px solid rgba(6,182,212,0.18)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.15)" }}>
              <Zap size={18} style={{ color: "var(--accent-cyan)" }} />
            </div>
            <div>
              <div className="font-display font-black text-6xl md:text-7xl leading-none text-white">
                <AnimeCounter target={5} suffix="+" />
              </div>
              <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "var(--accent-cyan)" }}>
                Years Experience
              </div>
            </div>
          </div>

          {/* ── Cell 3: Projects stat ── */}
          <div
            className="md:col-span-3 relative rounded-2xl p-6 flex flex-col justify-between group overflow-hidden opacity-0"
            style={{
              background: "rgba(236,72,153,0.07)",
              border: "1px solid rgba(236,72,153,0.18)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(236,72,153,0.15)" }}>
              <Code2 size={18} style={{ color: "var(--accent-fuchsia)" }} />
            </div>
            <div>
              <div className="font-display font-black text-6xl md:text-7xl leading-none text-white">
                <AnimeCounter target={20} suffix="+" />
              </div>
              <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "var(--accent-fuchsia)" }}>
                Projects Shipped
              </div>
            </div>
          </div>

          {/* ── Cell 4: Articles stat ── */}
          <div
            className="md:col-span-3 relative rounded-2xl p-6 flex flex-col justify-between group overflow-hidden opacity-0"
            style={{
              background: "rgba(124,58,237,0.07)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.15)" }}>
              <BookOpen size={18} style={{ color: "var(--accent-hover)" }} />
            </div>
            <div>
              <div className="font-display font-black text-6xl md:text-7xl leading-none text-white">
                <AnimeCounter target={8} suffix="+" />
              </div>
              <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "var(--accent-hover)" }}>
                Articles Published
              </div>
            </div>
          </div>

          {/* ── Cell 5: Bio text ── */}
          <div
            className="md:col-span-6 relative rounded-2xl p-6 md:p-8 overflow-hidden opacity-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{ background: "linear-gradient(180deg, #7c3aed, #06b6d4, #ec4899)" }}
            />
            <div className="pl-4 space-y-3 text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                Expert in{" "}
                <span className="text-white font-medium">CI/CD</span> (Jenkins, GitHub Actions),
                automated testing & Agile — reducing release cycles by{" "}
                <span style={{ color: "var(--accent-cyan)" }} className="font-medium">~70%</span>.
              </p>
              <p>
                Backend depth in{" "}
                <span className="text-white font-medium">Java Spring Boot</span> &{" "}
                <span className="text-white font-medium">Node.js</span>, cloud-native with{" "}
                <span style={{ color: "var(--accent-hover)" }} className="font-medium">AWS</span> &{" "}
                <span style={{ color: "var(--accent-hover)" }} className="font-medium">Firebase</span>.
              </p>
              <p>
                Passionate about optimizing app performance — cutting load times by{" "}
                <span style={{ color: "var(--accent-fuchsia)" }} className="font-medium">~30%</span> and
                reducing crash rates for thousands of users.
              </p>
            </div>
          </div>

          {/* ── Cell 6: Location/availability ── */}
          <div
            className="md:col-span-4 relative rounded-2xl p-6 overflow-hidden group flex flex-col justify-between opacity-0"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Dot-grid map decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.5) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(124,58,237,0.15)" }}>
                <MapPin size={18} style={{ color: "var(--accent-hover)" }} />
              </div>
              <div className="font-display font-semibold text-lg text-white">Hyderabad, India</div>
              <div className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>Open to remote worldwide</div>
            </div>
            <div className="relative z-10 mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400">Available now</span>
            </div>
          </div>

          {/* ── Cell 7: Tech highlights ── */}
          <div
            className="md:col-span-8 relative rounded-2xl p-6 overflow-hidden opacity-0"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
              Core Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "React", color: "#61DAFB" },
                { name: "React Native", color: "#61DAFB" },
                { name: "TypeScript", color: "#3178C6" },
                { name: "Node.js", color: "#68A063" },
                { name: "Java / Spring Boot", color: "#f89820" },
                { name: "AWS", color: "#FF9900" },
                { name: "Firebase", color: "#FFCA28" },
                { name: "Redux", color: "#764ABC" },
                { name: "PostgreSQL", color: "#336791" },
                { name: "Docker", color: "#2496ED" },
                { name: "GitHub Actions", color: "#2088FF" },
                { name: "Fastlane", color: "#00F200" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="tech-pill cursor-pointer inline-block"
                  style={{
                    borderColor: `${tech.color}30`,
                    color: tech.color,
                    background: `${tech.color}0d`,
                  }}
                  onMouseEnter={(e) => {
                    animate(e.currentTarget, {
                      scale: [1, 1.15, 1],
                      rotate: [0, 4, -4, 0],
                      duration: 450,
                      ease: "outElastic(1, .5)",
                    });
                  }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Code Terminal Console */}
        <InteractiveConsole />
      </div>
    </section>
  );
}
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ExternalLink, ChevronDown, ChevronUp, Tag } from "lucide-react";
import Link from "next/link";

const publications = [
  {
    title: "LLM-Aided System Design: How AI Assistants Help Draft Architecture Patterns",
    date: "2024",
    readTime: 10,
    url: "https://medium.com/@saikrishnakotagiri16/llm-aided-system-design-how-ai-assistants-help-draft-architecture-patterns-d633e2a7e8a4",
    description: "Exploring how large language models can assist in creating robust software architecture designs with practical applications.",
    fullDescription: "This article explores how AI assistants like ChatGPT and Claude can be leveraged to draft system architecture patterns. I discuss the benefits of using LLMs in the architecture design process, how they can help generate design alternatives, identify edge cases, and provide documentation.",
    tags: ["System Design", "LLM", "AI", "Architecture"],
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.2)",
    emoji: "🤖",
  },
  {
    title: "Building Intelligent AI Agents with n8n: A Practical Guide",
    date: "2024",
    readTime: 8,
    url: "https://medium.com/@saikrishnakotagiri16/building-intelligent-ai-agents-with-n8n-a-practical-guide-90af853532e7",
    description: "A step-by-step guide to creating AI agents using n8n automation workflows with practical implementation examples.",
    fullDescription: "In this comprehensive guide, I demonstrate how to build intelligent AI agents using n8n's workflow automation platform. The article walks through creating agents that can perform complex tasks by orchestrating different AI capabilities and APIs.",
    tags: ["Automation", "n8n", "AI Agents", "Workflow"],
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.2)",
    emoji: "⚙️",
  },
  {
    title: "Breaking the Performance Barrier: How We Optimised MongoDB Aggregation Queries",
    date: "2023",
    readTime: 12,
    url: "https://medium.com/@saikrishnakotagiri16/breaking-the-performance-barrier-how-we-optimised-mongodb-aggregation-queries-42a4790268a9",
    description: "Deep dive into performance optimization techniques for MongoDB aggregation pipelines with real-world examples and benchmarks.",
    fullDescription: "This technical deep-dive explores advanced techniques for optimizing MongoDB aggregation queries. Based on real-world experience, I share how our team significantly improved query performance by restructuring aggregation pipelines, implementing strategic indexing, and using MongoDB's query profiling tools.",
    tags: ["MongoDB", "Performance", "Optimization", "Backend"],
    accent: "#10b981",
    glow: "rgba(16,185,129,0.2)",
    emoji: "⚡",
  },
  {
    title: "Why Microservices Should Own Their Data and How It Benefits You",
    date: "2023",
    readTime: 9,
    url: "https://medium.com/@saikrishnakotagiri16/why-microservices-should-own-their-data-and-how-it-benefits-you-7c88d0b2e262",
    description: "An exploration of the Database-per-Service pattern in microservice architecture and its advantages for scalability and maintenance.",
    fullDescription: "In this article, I advocate for the 'Database-per-Service' pattern in microservice architectures. Drawing from experience implementing this approach, I explain how data ownership by individual services leads to better isolation, reduced coupling, and improved scalability.",
    tags: ["Microservices", "Architecture", "Scalability", "DevOps"],
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    emoji: "🏗️",
  },
  {
    title: "Scaling React Native Apps: Best Practices",
    date: "2022",
    readTime: 11,
    url: "https://medium.com/@saikrishnakotagiri16/scaling-react-native-apps-best-practices-4162aa779937",
    description: "A comprehensive guide to building and scaling React Native applications while maintaining performance and code quality.",
    fullDescription: "This comprehensive guide covers essential strategies for scaling React Native applications effectively. Drawing from my experience building large-scale production apps, I discuss architectural patterns, state management approaches, code organization, and performance optimization techniques.",
    tags: ["React Native", "Scaling", "Performance", "Architecture"],
    accent: "#ec4899",
    glow: "rgba(236,72,153,0.2)",
    emoji: "📱",
  },
  {
    title: "Integrating React Native as an SDK Into an Existing iOS App",
    date: "2022",
    readTime: 10,
    url: "https://medium.com/@saikrishnakotagiri16/integrating-react-native-as-an-sdk-into-a-existing-ios-app-f659cc1645a",
    description: "A technical guide for iOS developers looking to incorporate React Native components into their native application.",
    fullDescription: "This step-by-step guide demonstrates how to integrate React Native into an existing iOS application as a reusable SDK. I cover the entire process from initial setup to advanced implementation details, including Cocoapods integration, bridge configuration, and module communication.",
    tags: ["React Native", "iOS", "SDK", "Integration"],
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    emoji: "🍎",
  },
  {
    title: "Using React Native as an SDK in Your Native Android App",
    date: "2022",
    readTime: 10,
    url: "https://medium.com/stackademic/using-react-native-as-an-sdk-in-your-native-android-app-5c4b6b40ad5f",
    description: "Learn how to embed React Native features into an existing Android native application through a modular SDK approach.",
    fullDescription: "This technical article guides Android developers through the process of integrating React Native components into existing native applications. I provide a detailed walkthrough of creating a modular React Native SDK for Android, including Gradle configuration, JavaScript bundling, and native module bridges.",
    tags: ["React Native", "Android", "SDK", "Integration"],
    accent: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    emoji: "🤖",
  },
];

export default function Publications() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="publications" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] opacity-20"
          style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(124,58,237,0.2) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Header */}
        <motion.div className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          Writing
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.h2 className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            Publications &{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #ec4899)" }}>
              Articles
            </span>
          </motion.h2>
          <motion.a href="https://medium.com/@saikrishnakotagiri16" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono transition-colors"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            whileHover={{ color: "#a78bfa" }}>
            View all on Medium <ExternalLink size={13} />
          </motion.a>
        </div>

        {/* Publications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} index={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? null : i)} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationCard({ pub, index, expanded, onToggle, inView }: {
  pub: typeof publications[number];
  index: number;
  expanded: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "rgba(13,17,23,0.75)",
        border: `1px solid ${expanded ? `${pub.accent}35` : "rgba(255,255,255,0.06)"}`,
        boxShadow: expanded ? `0 0 40px ${pub.glow}` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={e => {
        if (!expanded) {
          (e.currentTarget as HTMLElement).style.borderColor = `${pub.accent}25`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${pub.glow}`;
        }
      }}
      onMouseLeave={e => {
        if (!expanded) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }
      }}
      onClick={onToggle}
    >
      {/* Color top accent */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${pub.accent}, transparent)` }} />

      <div className="p-5 md:p-6">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pub.emoji}</span>
            <div className="flex items-center gap-3 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1"><Clock size={10} /> {pub.readTime} min read</span>
              <span>·</span>
              <span>{pub.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={pub.url} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ background: `${pub.accent}15`, color: pub.accent }}
              title="Read on Medium">
              <ExternalLink size={13} />
            </Link>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-muted)" }}>
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-base md:text-lg text-white leading-snug mb-2 group-hover:text-white transition-colors" style={{ letterSpacing: "-0.02em" }}>
          {pub.title}
        </h3>

        {/* Short description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
          {pub.description}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="text-sm leading-relaxed mb-4 pt-2 border-t" style={{ color: "var(--text-secondary)", borderColor: "rgba(255,255,255,0.06)" }}>
                {pub.fullDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {pub.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
              style={{ background: `${pub.accent}0d`, border: `1px solid ${pub.accent}25`, color: pub.accent }}>
              <Tag size={8} /> {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
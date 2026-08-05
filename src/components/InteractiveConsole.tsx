"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Play, Copy, Check } from "lucide-react";
import { scrambleText } from "@/utils/animeEffects";

const sampleSnippets = [
  {
    name: "Architectural Overview",
    cmd: "run saikrishna.profile()",
    output: `[SUCCESS] Profile Loaded:
• Name: Saikrishna Kotagiri
• Role: Senior Solution Architect & Full Stack Lead
• Experience: 5+ Years
• Core Expertise: React, React Native, Java Spring Boot, AWS, Firebase
• Status: Available for Architecture & Lead Development Roles`,
  },
  {
    name: "Tech Stack Matrix",
    cmd: "fetch saikrishna.stack()",
    output: `[ANALYZING STACK]:
├── Frontend: React 19, Next.js, React Native, TypeScript, TailwindCSS
├── Backend: Java Spring Boot, Node.js, Express, REST & GraphQL
├── Cloud & Infra: AWS (S3, Lambda), Firebase, Docker, CI/CD
└── Performance: ~70% release speedup, ~30% startup optimization`,
  },
  {
    name: "Contact Quick-Connect",
    cmd: "connect saikrishna.contact()",
    output: `[DIRECT CHANNEL OPEN]:
• Email: saikrishnakotagiri16@gmail.com
• Phone: +91 9989966415
• Location: Hyderabad, India (Open to Remote Worldwide)
• Response SLA: < 24 Hours`,
  },
];

export default function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState(0);
  const [output, setOutput] = useState(sampleSnippets[0].output);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLPreElement>(null);

  const handleRun = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setIsRunning(true);
    setOutput("Executing script...");

    setTimeout(() => {
      setIsRunning(false);
      setOutput(sampleSnippets[tabIndex].output);
      if (outputRef.current) {
        scrambleText(outputRef.current, sampleSnippets[tabIndex].output, { duration: 800 });
      }
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippets[activeTab].cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl my-12 text-left border"
      style={{
        background: "rgba(9, 12, 20, 0.95)",
        borderColor: "rgba(124,58,237,0.3)",
        boxShadow: "0 0 50px rgba(124,58,237,0.15)",
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-3">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <Terminal size={14} className="text-violet-400" />
          <span className="font-mono text-xs font-semibold text-slate-300">
            saikrishna.dev ~ terminal console
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy command"}</span>
        </button>
      </div>

      {/* Preset Command Tabs */}
      <div className="flex flex-wrap gap-1.5 p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
        {sampleSnippets.map((snip, i) => (
          <button
            key={i}
            onClick={() => handleRun(i)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === i
                ? "bg-violet-600/30 text-violet-200 border border-violet-500/50 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            <Play size={10} className={activeTab === i ? "text-cyan-400 fill-cyan-400" : "text-slate-500"} />
            <span>{snip.name}</span>
          </button>
        ))}
      </div>

      {/* Console Display Body */}
      <div className="p-5 font-mono text-xs md:text-sm space-y-4">
        {/* Command Line Prompt */}
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="text-emerald-400 font-bold">$</span>
          <span>{sampleSnippets[activeTab].cmd}</span>
          {isRunning && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="w-2 h-4 bg-cyan-400 inline-block"
            />
          )}
        </div>

        {/* Command Output */}
        <pre
          ref={outputRef}
          className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono select-text py-2"
          style={{ minHeight: "140px" }}
        >
          {output}
        </pre>
      </div>

      {/* Status Footer */}
      <div className="px-5 py-2.5 border-t flex items-center justify-between text-[11px] font-mono text-slate-500" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Runtime Active</span>
        </div>
        <div>Press any tab to execute live snippet</div>
      </div>
    </div>
  );
}

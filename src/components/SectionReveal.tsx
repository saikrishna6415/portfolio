"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  barColor?: string;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  barColor = "linear-gradient(90deg, #7c3aed, #06b6d4)",
}: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const tl = createTimeline({
              defaults: { ease: "inOutQuint" },
              delay: delay,
            });

            if (barRef.current && contentRef.current) {
              tl.add(barRef.current, {
                width: ["0%", "100%"],
                duration: 450,
                ease: "inOutQuint",
              })
                .add(contentRef.current, {
                  opacity: [0, 1],
                  translateY: [15, 0],
                  duration: 1,
                  ease: "inOutQuint",
                }, "-=50")
                .add(barRef.current, {
                  left: ["0%", "100%"],
                  width: ["100%", "0%"],
                  duration: 450,
                  ease: "inOutQuint",
                });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={containerRef} className={`relative inline-block overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
      <div
        ref={barRef}
        className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none rounded-sm"
        style={{
          background: barColor,
          width: "0%",
        }}
      />
    </div>
  );
}

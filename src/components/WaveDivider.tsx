"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface WaveDividerProps {
  accentColor?: string;
  height?: number;
  flip?: boolean;
}

export default function WaveDivider({
  accentColor = "#7c3aed",
  height = 70,
  flip = false,
}: WaveDividerProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  const path1 =
    "M0,32 Q360,64 720,24 T1440,32 L1440,80 L0,80 Z";
  const path2 =
    "M0,48 Q360,8 720,56 T1440,16 L1440,80 L0,80 Z";
  const path3 =
    "M0,16 Q360,52 720,16 T1440,48 L1440,80 L0,80 Z";

  useEffect(() => {
    if (!pathRef.current) return;

    const anim = animate(pathRef.current, {
      d: [
        { value: path1 },
        { value: path2 },
        { value: path3 },
        { value: path1 },
      ],
      easing: "inOutSine",
      duration: 10000,
      loop: true,
    });

    return () => {
      anim.pause();
    };
  }, [path1, path2, path3]);

  return (
    <div
      className="relative w-full overflow-hidden select-none pointer-events-none z-10 opacity-70"
      style={{
        height: `${height}px`,
        transform: flip ? "rotate(180deg)" : "none",
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wave-grad-${accentColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={path1}
          fill={`url(#wave-grad-${accentColor.replace('#', '')})`}
        />
      </svg>
    </div>
  );
}

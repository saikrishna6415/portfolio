"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltAmount?: number;
  glareColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  style = {},
  tiltAmount = 12,
  glareColor = "rgba(167,139,250,0.08)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 22 });
  const springY = useSpring(y, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  // Glare position (follows mouse)
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {children}

      {/* Glare overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
          style={{ transformStyle: "preserve-3d", translateZ: 1 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, ${glareColor} 0%, transparent 65%)`,
              opacity: 0.9,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

"use client";

import { ReactNode, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  depth?: number;
  stiffness?: number;
}

export default function FloatingCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)",
  depth = 30,
  stiffness = 300,
}: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // For smoother animation
  const rotateX = useSpring(useTransform(y, [-100, 100], [depth, -depth]), {
    stiffness,
    damping: 30,
  });
  
  const rotateY = useSpring(useTransform(x, [-100, 100], [-depth, depth]), {
    stiffness,
    damping: 30,
  });
  
  // For glare effect
  const glareX = useTransform(x, [-100, 100], ["100%", "0%"]);
  const glareY = useTransform(y, [-100, 100], ["0%", "100%"]);
  const glareOpacity = useTransform(
    y, 
    [-100, 0, 100],
    [0.3, 0, 0.3]
  );
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // Get the middle of the card
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the distance from the center
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  };
  
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: "1000px",
      }}
      whileHover={{ scale: 1.03 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 70%)`,
          opacity: glareOpacity,
          display: isHovered ? "block" : "none",
        }}
      />
      
      {/* Card content */}
      <div className="relative z-0">{children}</div>
    </motion.div>
  );
} 
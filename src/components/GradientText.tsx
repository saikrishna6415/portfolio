"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GradientTextProps {
  text: string;
  className?: string;
  gradientColors?: string[];
}

export default function GradientText({ 
  text, 
  className = "", 
  gradientColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"] 
}: GradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const gradientElement = textRef.current;
    
    // Create animation
    let start: number | null = null;
    const duration = 8000; // 8 seconds per cycle
    
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % duration) / duration;
      
      // Update gradient position
      gradientElement.style.backgroundPosition = `${progress * 200}% 50%`;
      
      requestAnimationFrame(step);
    };
    
    const animationFrame = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  const gradient = `linear-gradient(90deg, ${gradientColors.join(', ')})`;
  
  return (
    <motion.h1
      ref={textRef}
      className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
      style={{ 
        backgroundImage: gradient, 
        backgroundSize: "200% 100%",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.h1>
  );
} 
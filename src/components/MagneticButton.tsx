"use client";

import { ReactNode, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  magneticStrength = 0.5,
  onClick,
  href,
}: MagneticButtonProps) {
  const [scope, animate] = useAnimate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const moveX = (clientX - centerX) * magneticStrength;
    const moveY = (clientY - centerY) * magneticStrength;
    
    animate(scope.current, { 
      x: moveX, 
      y: moveY,
      scale: 1.05
    }, { 
      type: "spring",
      damping: 10,
      stiffness: 200,
      mass: 0.2
    });
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  const handleMouseLeave = () => {
    // Reset position with a small delay for a smoother effect
    timeoutRef.current = setTimeout(() => {
      animate(scope.current, { 
        x: 0, 
        y: 0,
        scale: 1
      }, { 
        type: "spring",
        damping: 20,
        stiffness: 150
      });
    }, 50);
  };
  
  const buttonContent = (
    <motion.div
      ref={scope}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
  
  return href ? (
    <a href={href} className="inline-block">
      {buttonContent}
    </a>
  ) : (
    buttonContent
  );
} 
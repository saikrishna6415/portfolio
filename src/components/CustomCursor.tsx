"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // For smoother animation with slight lag
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    // Add a data-cursor attribute to elements that should change cursor to pointer
    const addCursorClasses = () => {
      document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach((el) => {
        el.setAttribute("data-cursor", "pointer");
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      
      // Check if hovering over an interactive element
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("[data-cursor='pointer']"));
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Initialize cursor classes
    addCursorClasses();
    
    // Set up event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);
  
  return (
    <>
      {/* Hide the default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
      
      {/* Custom cursor - only show on desktop */}
      <div className="hidden md:block">
        {/* Outer cursor circle */}
        <motion.div
          className="fixed top-0 left-0 w-10 h-10 rounded-full border border-accent pointer-events-none z-50"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible ? 1 : 0,
            scale: isPointer ? 1.5 : 1,
          }}
          transition={{ scale: { duration: 0.15 } }}
        />
        
        {/* Inner cursor dot */}
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-50"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible ? 1 : 0,
            scale: isPointer ? 0 : 1,
          }}
          transition={{ scale: { duration: 0.1 } }}
        />
      </div>
    </>
  );
} 
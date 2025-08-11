"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  showPercentage?: boolean;
  showToTopButton?: boolean;
}

export default function ScrollProgressBar({
  color = "#3b82f6",
  height = 4,
  showPercentage = false,
  showToTopButton = false,
}: ScrollProgressBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create a smoother animation with spring physics
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Transform the progress to percentage for display
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Control visibility of back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 20% of viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.2);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 origin-left"
        style={{ 
          scaleX,
          backgroundColor: color,
          height: height,
        }}
      />
      
      {/* Percentage indicator */}
      {showPercentage && (
        <motion.div 
          className="fixed top-4 right-4 bg-card/80 backdrop-blur-sm border border-border-light rounded-full px-3 py-1 text-xs font-medium z-50 shadow-lg"
          style={{ opacity: isVisible ? 1 : 0 }}
          animate={{ y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span>{scrollPercentage.get().toFixed(0)}%</motion.span>
        </motion.div>
      )}
      
      {/* Back to top button */}
      {showToTopButton && (
        <motion.button
          className="fixed bottom-8 right-8 p-3 bg-card/80 backdrop-blur-sm border border-border-light rounded-full shadow-lg text-accent z-50"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            y: isVisible ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </>
  );
} 
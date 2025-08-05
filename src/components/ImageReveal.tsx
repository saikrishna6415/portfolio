"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  revealDirection?: "left" | "right" | "top" | "bottom" | "center";
  overlayColor?: string;
  priority?: boolean;
  quality?: number;
  children?: React.ReactNode;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className = "",
  revealDirection = "left",
  overlayColor = "rgba(59, 130, 246, 0.9)",
  priority = false,
  quality = 85,
  children
}: ImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define animation variants based on reveal direction
  const overlayVariants = {
    hidden: () => {
      switch (revealDirection) {
        case "left":
          return { x: "-100%" };
        case "right":
          return { x: "100%" };
        case "top":
          return { y: "-100%" };
        case "bottom":
          return { y: "100%" };
        case "center":
          return { scale: 0, opacity: 0 };
        default:
          return { x: "-100%" };
      }
    },
    visible: () => {
      switch (revealDirection) {
        case "center":
          return { scale: 1, opacity: 1 };
        default:
          return { x: 0, y: 0 };
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with zoom effect */}
      <motion.div
        className="w-full h-full"
        variants={imageVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <Image 
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
          priority={priority}
          quality={quality}
        />
      </motion.div>
      
      {/* Overlay with reveal animation */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-center items-center p-6"
        style={{ backgroundColor: overlayColor }}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        variants={overlayVariants}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-white text-center"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 
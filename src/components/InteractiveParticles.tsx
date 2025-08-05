"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import the animation optimizer utilities
import { useLowPowerMode, getOptimizedParticleCount, shouldEnableAnimation } from "@/utils/animationOptimizer";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

interface InteractiveParticlesProps {
  count?: number;
  maxSize?: number;
  minSize?: number;
  speed?: number;
  colors?: string[];
  className?: string;
  interactive?: boolean;
  interactionDistance?: number;
  interactionStrength?: number;
}

export default function InteractiveParticles({
  count = 40,
  maxSize = 8,
  minSize = 2,
  speed = 0.5,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
  className = "",
  interactive = true,
  interactionDistance = 100,
  interactionStrength = 3
}: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  // Use the low power mode hook to detect device capabilities
  const isLowPower = useLowPowerMode();
  
  // Optimize the particle count based on device capabilities
  const optimizedCount = getOptimizedParticleCount(isLowPower, count);
  
  // Check if complex animations should be enabled
  const enableComplexEffects = shouldEnableAnimation('complex', isLowPower);

  // Create initial particles on mount
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Regenerate particles when canvas is resized
      createParticles();
    };
    
    // Generate random particles using optimized count
    const createParticles = () => {
      const particles: Particle[] = [];
      
      for (let i = 0; i < optimizedCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    // Handle touch movement
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        setMousePos({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        });
      }
    };
    
    // Add event listeners if interactive mode is enabled and not in low power mode
    window.addEventListener("resize", resizeCanvas);
    if (interactive && !isLowPower) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("mouseleave", () => setMousePos({ x: -1000, y: -1000 }));
    }
    
    // Initialize
    resizeCanvas();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (interactive && !isLowPower) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mouseleave", () => setMousePos({ x: -1000, y: -1000 }));
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [optimizedCount, maxSize, minSize, colors, speed, interactive, isLowPower]);

// Update the animation loop to use optimized effects
// Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }
        
        // Mouse interaction - only if complex effects are enabled
        if (interactive && enableComplexEffects) {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (interactionDistance - distance) / interactionDistance;
            
            // Push particle away from mouse
            particle.vx -= Math.cos(angle) * force * interactionStrength * 0.02;
            particle.vy -= Math.sin(angle) * force * interactionStrength * 0.02;
          }
        }
        
        // Apply some drag
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos, interactive, interactionDistance, interactionStrength, enableComplexEffects]);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ touchAction: "none" }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      />
    </div>
  );
} 
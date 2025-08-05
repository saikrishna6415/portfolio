"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const [paths, setPaths] = useState<Array<{ d: string; color: string }>>([]);
  
  useEffect(() => {
    // Generate random wave paths for the SVG
    const generateWaves = () => {
      const newPaths = [];
      const colors = [
        "rgba(59, 130, 246, 0.05)", // blue
        "rgba(139, 92, 246, 0.07)", // purple
        "rgba(236, 72, 153, 0.05)", // pink
        "rgba(16, 185, 129, 0.06)", // green
      ];
      
      // Generate 4 different waves
      for (let i = 0; i < 4; i++) {
        const points = [];
        const segments = 8;
        const randomize = () => Math.random() * 50 - 25;
        
        // Create control points for a smooth curve
        for (let j = 0; j <= segments; j++) {
          const x = (j / segments) * 2000;
          const y = 400 + randomize() * (i + 1) * 2;
          points.push({ x, y });
        }
        
        // Convert points to an SVG path
        let d = `M${points[0].x},${points[0].y}`;
        
        for (let j = 0; j < points.length - 1; j++) {
          const cp1x = points[j].x + 200;
          const cp1y = points[j].y + randomize();
          const cp2x = points[j + 1].x - 200;
          const cp2y = points[j + 1].y + randomize();
          const x = points[j + 1].x;
          const y = points[j + 1].y;
          
          d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
        }
        
        // Close the path
        d += ` L2000,1000 L0,1000 Z`;
        
        newPaths.push({
          d,
          color: colors[i],
        });
      }
      
      setPaths(newPaths);
    };
    
    generateWaves();
  }, []);
  
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 2000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path.d}
            fill={path.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              d: path.d.replace(/(\d+\.\d+|\d+)/g, (match) => {
                // Only animate the y coordinates (every 2nd number)
                const num = parseFloat(match);
                const isYCoordinate = (index % 2 === 1);
                if (isYCoordinate) {
                  return String(num - 15 + Math.random() * 30);
                }
                return match;
              })
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
} 
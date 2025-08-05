"use client";

import { useTheme } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Fallback state in case ThemeProvider is not available
  const [localTheme, setLocalTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  let theme: "light" | "dark";
  let toggleTheme: () => void;
  
  // Try to use the ThemeProvider, but have a fallback
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (e) {
    // Fallback if ThemeProvider is not available
    theme = localTheme;
    toggleTheme = () => {
      const newTheme = localTheme === "light" ? "dark" : "light";
      setLocalTheme(newTheme);
      
      // Manually update class on document
      if (typeof document !== "undefined") {
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
        }
        
        // Store in localStorage
        localStorage.setItem("theme", newTheme);
      }
    };
  }

  // Handle initial theme state
  useEffect(() => {
    setMounted(true);
    
    // Try to get theme from localStorage or system preference
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (storedTheme) {
        setLocalTheme(storedTheme);
      } else if (prefersDark) {
        setLocalTheme("dark");
      }
    }
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        className="relative p-3 rounded-full bg-gradient-to-br from-background to-card shadow-lg border border-border overflow-hidden"
        style={{ 
          boxShadow: theme === "light" 
            ? "0 0 15px rgba(59, 130, 246, 0.3)" 
            : "0 0 15px rgba(59, 130, 246, 0.5)" 
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-accent opacity-10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="relative z-10"
          initial={false}
          animate={{ 
            rotate: theme === "light" ? 0 : 180,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { type: "spring", stiffness: 200, damping: 10 },
            scale: { duration: 1.5, repeat: Infinity }
          }}
        >
          {theme === "light" ? (
            <Sun size={22} className="text-primary" />
          ) : (
            <Moon size={22} className="text-primary" />
          )}
        </motion.div>
        
        {/* Animated stars (visible in dark mode) */}
        {theme === "dark" && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5 + Math.random(), 
                  delay: Math.random() * 2,
                  repeat: Infinity
                }}
                style={{ 
                  top: `${15 + Math.random() * 70}%`,
                  left: `${15 + Math.random() * 70}%`,
                }}
              />
            ))}
          </>
        )}
        
        {/* Animated rays (visible in light mode) */}
        {theme === "light" && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-accent/40 origin-center"
                style={{
                  width: '2px',
                  height: '8px',
                  borderRadius: '4px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-1px',
                  marginTop: '-4px',
                  transformOrigin: 'center bottom',
                  transform: `rotate(${i * 45}deg) translateY(-15px)`,
                }}
                animate={{ 
                  scaleY: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.05, 
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </motion.button>
    </motion.div>
  );
} 
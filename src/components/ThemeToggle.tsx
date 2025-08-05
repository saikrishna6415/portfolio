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
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="p-2 rounded-full bg-card text-primary border border-border"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
} 
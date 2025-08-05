"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-card opacity-80 z-0">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full bg-accent/10 blur-[120px]"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
      </div>
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text content - spans 3 columns */}
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full font-medium mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Senior Full Stack Developer
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl xl:text-7xl font-bold text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Crafting <span className="text-accent">Digital</span> Experiences That <span className="text-accent">Inspire</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-secondary max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I build high-performance web and mobile applications with React, React Native, and modern backend technologies. Passionate about clean code, intuitive UX, and scalable architecture.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a 
                href="#contact" 
                className="px-8 py-4 bg-accent text-white font-medium rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Connect
              </motion.a>

              <motion.a 
                href="#about" 
                className="px-8 py-4 bg-transparent border border-border text-primary font-medium rounded-lg hover:bg-card/50 transition-all"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { icon: <Github size={20} />, href: "https://github.com/saikrishna6415", label: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/saikrishna-kotagiri", label: "LinkedIn" },
                { icon: <Twitter size={20} />, href: "https://twitter.com/name__is_sai", label: "Twitter" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-full text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Image container - spans 2 columns */}
          <motion.div 
            className="lg:col-span-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Animated border */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-accent"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              />
              
              {/* Animated dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/30"
                  initial={{ 
                    x: Math.cos(i * Math.PI / 2) * 180, 
                    y: Math.sin(i * Math.PI / 2) * 180,
                    scale: 0.8 
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.5,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-8px",
                    marginTop: "-8px",
                    transform: `translate(${Math.cos(i * Math.PI / 2) * 180}px, ${Math.sin(i * Math.PI / 2) * 180}px)`,
                  }}
                />
              ))}
              
              {/* Profile image */}
              <motion.div 
                className="absolute inset-4 rounded-full overflow-hidden border-8 border-card shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Saikrishna Kotagiri"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.span 
          className="text-secondary text-sm mb-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Scroll Down
        </motion.span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="text-accent" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
} 
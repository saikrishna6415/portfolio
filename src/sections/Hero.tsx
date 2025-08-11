"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

// Import the new components
import GradientText from "@/components/GradientText";
import AnimatedBackground from "@/components/AnimatedBackground";
import MagneticButton from "@/components/MagneticButton";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import { useLowPowerMode, shouldEnableAnimation, getOptimizedParticleCount } from "@/utils/animationOptimizer";

function getWindowSize() {
  if (typeof window === "undefined") return { width: 1200, height: 800 };
  return { width: window.innerWidth, height: window.innerHeight };
}

function generateParticles(count: number) {
  const { width, height } = getWindowSize();
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    scale: Math.random() * 0.5 + 0.5,
    width: Math.random() * 20 + 5,
    height: Math.random() * 20 + 5,
    opacity: Math.random() * 0.5 + 0.2,
    duration: 20 + Math.random() * 30,
    animX: [Math.random() * width, Math.random() * width, Math.random() * width],
    animY: [Math.random() * height, Math.random() * height, Math.random() * height],
  }));
}

export default function Hero() {
  const isLowPower = useLowPowerMode();
  const enableDecorative = shouldEnableAnimation('decorative', isLowPower);
  const optimizedParticleCount = getOptimizedParticleCount(isLowPower, 20);
  const [particles, setParticles] = useState(() => generateParticles(optimizedParticleCount));
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      setParticles(generateParticles(optimizedParticleCount));
      hasInitialized.current = true;
    }
  }, [optimizedParticleCount]);

  const roles = [
    "Full Stack Developer",
    "React & React Native Expert",
    "UI/UX Enthusiast",
    "Performance Optimizer",
    "Problem Solver"
  ];

  const iconContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Replace gradient background with AnimatedBackground */}
      {enableDecorative && <AnimatedBackground className="opacity-70 z-0" />}

      {/* Keep your existing floating particles */}
      {enableDecorative && particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/20"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
          }}
          animate={{
            x: particle.animX,
            y: particle.animY,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            opacity: particle.opacity,
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
                className="inline-block px-4 py-2 bg-accent/10 rounded-full font-medium mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedTypewriter
                  phrases={roles}
                  typingSpeed={80}
                  deletingSpeed={40}
                  className="text-accent"
                />
              </motion.div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-primary">Transforming Ideas  </span>
              <GradientText
                text="Into Seamless Experiences"
                className=""
                gradientColors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
              />
            </h1>

            <motion.p
              className="text-xl text-secondary max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Full stack developer with expertise in <span className="text-accent font-medium">React</span>, <span className="text-accent font-medium">React Native</span>, and modern backend technologies. Focused on creating high-performance applications with exceptional user experiences.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton href="#contact" magneticStrength={0.3}>
                <div className="px-8 py-4 bg-accent text-white font-medium rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all">
                  Let&apos;s Work Together
                </div>
              </MagneticButton>

              <MagneticButton href="#experience" magneticStrength={0.3}>
                <div className="px-8 py-4 bg-transparent border border-border text-primary font-medium rounded-lg hover:bg-card/50 transition-all">
                  View My Experience
                </div>
              </MagneticButton>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 pt-6"
              variants={iconContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: <Github size={20} />, href: "https://github.com/saikrishna6415", label: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/saikrishna-kotagiri", label: "LinkedIn" },
                { icon: <Twitter size={20} />, href: "https://twitter.com/name__is_sai", label: "Twitter" }
              ].map((social, index) => (
                <motion.div key={index} variants={iconVariants}>
                  <MagneticButton magneticStrength={0.6}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-card border border-border rounded-full text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  </MagneticButton>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Rest of the component remains the same */}
          {/* Image container - spans 2 columns */}
          <motion.div 
            className="lg:col-span-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Animated border */}
              {enableDecorative && (
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                />
              )}
              
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
                  alt="Professional headshot of Saikrishna Kotagiri, a senior full stack developer, showing him smiling against a neutral background"
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
      {/* <motion.div 
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
      </motion.div> */}
    </section>
  );
} 
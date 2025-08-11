"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, Cpu, Monitor, LayoutGrid, Laptop, Coffee, Headphones } from "lucide-react";
import ImageReveal from "@/components/ImageReveal";

export default function Workspace() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % workspaceImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? workspaceImages.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    // Move focus to close button when modal opens
    setTimeout(() => {
      const closeBtn = document.getElementById('workspace-modal-close');
      closeBtn?.focus();
    }, 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setMousePosition({ x, y });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const featureIconVariants = {
    hidden: { scale: 0, rotate: -15 },
    visible: (custom: number) => ({
      scale: 1,
      rotate: 0,
      transition: { 
        delay: custom * 0.1 + 0.3, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }
    }),
    hover: { 
      scale: 1.15, 
      rotate: 5,
      transition: { duration: 0.2 } 
    }
  };

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotateRight = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);
  const rotateLeft = useTransform(scrollYProgress, [0, 0.5, 1], [0, -2, 0]);
  const opacityScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  const currentImage = workspaceImages[currentIndex];

  return (
    <section 
      id="workspace" 
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-card/10"
      ref={sectionRef}
    >
      {/* Floating elements */}
      <motion.div 
        className="absolute top-[20%] left-[10%] w-16 h-16 rounded-full bg-accent/5 blur-md"
        style={{ y: y1, rotate: rotateRight, opacity: opacityScale }}
      />
      <motion.div 
        className="absolute top-[50%] right-[15%] w-24 h-24 rounded-full bg-accent/10 blur-md"
        style={{ y: y2, rotate: rotateLeft, opacity: opacityScale }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-full bg-accent/8 blur-md"
        style={{ y: y3, rotate: rotateRight, opacity: opacityScale }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            My Development Workspace
          </motion.h2>
          
          <motion.div 
            className="flex justify-center items-center mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="h-1 w-10 bg-accent rounded-full mx-1"></div>
            <div className="h-1 w-20 bg-accent rounded-full mx-1"></div>
            <div className="h-1 w-10 bg-accent rounded-full mx-1"></div>
          </motion.div>
          
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-secondary"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Where innovation happens — a glimpse into my development environment
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Workspace images with gallery */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              className="absolute -inset-4 rounded-xl bg-gradient-to-r from-accent/20 to-purple-500/20 blur-md opacity-70"
              animate={{
                background: [
                  "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                  "linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
                  "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative rounded-xl overflow-hidden bg-card border border-border-light shadow-xl aspect-[3/2]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold">{currentImage.title}</h3>
                      <p className="text-sm opacity-80">{currentImage.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive 3D tilt effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2) 0%, transparent 60%)`,
                }}
              />
              
              {/* Navigation arrows */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-primary flex items-center justify-center z-10 hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft size={18} />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-primary flex items-center justify-center z-10 hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={18} />
              </motion.button>
              
              {/* Enlarge button */}
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 text-primary flex items-center justify-center z-10 hover:bg-white transition-colors"
                onClick={() => openModal(currentIndex)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize2 size={18} />
              </motion.button>
            </div>

            {/* Thumbnail indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {workspaceImages.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Workspace details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-primary"
              variants={itemVariants}
            >
              Where the Magic Happens
            </motion.h3>
            
            <motion.p 
              className="text-lg text-secondary"
              variants={itemVariants}
            >
              My workspace is designed for maximum productivity, with powerful hardware, ergonomic accessories, and a clean, distraction-free setup that allows me to focus on creating exceptional software.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              {workspaceFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-4"
                  variants={featureIconVariants}
                  custom={index}
                  whileHover="hover"
                >
                  <div className="p-3 rounded-lg bg-accent/10 text-accent">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="pt-4"
              variants={itemVariants}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Interested in my development process?
                <ArrowRight size={16} className="ml-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Full-screen image modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="workspace-modal-title"
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <ImageReveal
                  src={workspaceImages[modalImageIndex].src}
                  alt={workspaceImages[modalImageIndex].alt}
                  className="w-full h-full"
                  revealDirection="center"
                  overlayColor="rgba(59, 130, 246, 0.3)"
                >
                  <h3 id="workspace-modal-title" className="text-2xl font-bold mb-2">{workspaceImages[modalImageIndex].title}</h3>
                  <p className="text-lg opacity-90">{workspaceImages[modalImageIndex].description}</p>
                </ImageReveal>
              </div>
              
              {/* Modal navigation */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex((prev) => 
                    prev === 0 ? workspaceImages.length - 1 : prev - 1
                  );
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous image"
              >
                <ArrowLeft size={24} />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex((prev) => 
                    (prev + 1) % workspaceImages.length
                  );
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next image"
              >
                <ArrowRight size={24} />
              </motion.button>
              
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                id="workspace-modal-close"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const workspaceImages = [
  {
    src: "/images/workspace-1.jpg",
    alt: "My development setup",
    title: "Main Workstation",
    description: "Where I spend most of my time developing applications",
    orientation: "landscape"
  },
  {
    src: "/images/workspace-2.jpg",
    alt: "Mobile development environment",
    title: "Mobile Testing Station",
    description: "Where I test and debug mobile applications",
    orientation: "portrait"
  },
  {
    src: "/images/workspace-3.jpg",
    alt: "Collaborative workspace",
    title: "Collaboration Corner",
    description: "Where I brainstorm ideas and collaborate with teams",
    orientation: "portrait"
  }
];

const workspaceFeatures = [
  {
    icon: <Monitor size={22} />,
    title: "Dual 4K Monitors",
    description: "Ultra-wide screens for multitasking efficiency and code clarity"
  },
  {
    icon: <Laptop size={22} />,
    title: "M3 Max MacBook Pro",
    description: "Powerful machine optimized for development and running multiple environments"
  },
  {
    icon: <Cpu size={22} />,
    title: "High-Performance Setup",
    description: "32GB RAM and SSD storage for lightning-fast performance"
  },
  {
    icon: <LayoutGrid size={22} />,
    title: "Custom Development Tools",
    description: "Optimized IDE setup with productivity-focused extensions"
  },
  {
    icon: <Headphones size={22} />,
    title: "Acoustic Environment",
    description: "Noise-cancelling headphones for deep focus sessions"
  },
  {
    icon: <Coffee size={22} />,
    title: "Inspiration Zone",
    description: "Thoughtfully designed space that stimulates creativity"
  }
]; 
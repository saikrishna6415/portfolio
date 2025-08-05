"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Coffee, Laptop, Monitor } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";

export default function Workspace() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const workspaceImages = [
    {
      src: "/images/workspace-1.jpg",
      alt: "My main workspace setup",
      orientation: "landscape" as const
    },
    {
      src: "/images/workspace-3.jpg",
      alt: "Another angle of my workspace - mobile view",
      orientation: "landscape" as const
    },
    {
      src: "/images/workspace-1.jpg",
      alt: "My main workspace setup",
      orientation: "landscape" as const
    },
    {
      src: "/images/workspace-2.jpg",
      alt: "My development environment - mobile view",
      orientation: "landscape" as const
    }
  ];

  const features = [
    {
      icon: <Laptop className="text-blue-500 w-6 h-6" />,
      title: "High-Performance Setup",
      description: "Optimized development environment for maximum productivity and efficiency"
    },
    {
      icon: <Monitor className="text-blue-500 w-6 h-6" />,
      title: "Multi-Screen Display",
      description: "Multiple monitors for efficient multitasking and development workflows"
    },
    {
      icon: <Code className="text-blue-500 w-6 h-6" />,
      title: "Custom Development Tools",
      description: "Personalized toolset carefully selected for optimal coding experience"
    },
    {
      icon: <Coffee className="text-blue-500 w-6 h-6" />,
      title: "Dedicated Work Space",
      description: "Carefully arranged environment designed for focus and creativity"
    }
  ];

  return (
    <section id="workspace" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Development Environment</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Where the magic happens. My workspace is designed for productivity and efficiency, 
              reflecting my dedication to delivering quality work.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full">
              <ImageGallery images={workspaceImages} />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Crafted for Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                My workspace is more than just equipment—it&apos;s a reflection of my dedication to 
                software development and my commitment to creating exceptional digital experiences. 
                Every element has been carefully selected to maximize productivity and creativity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
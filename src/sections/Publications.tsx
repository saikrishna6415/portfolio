"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Publications() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Random particle positions for each card
  const particlePositions = publications.map(() => 
    Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3
    }))
  );

  if (inView && controls) {
    controls.start("visible");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: custom * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const expandCard = (index: number) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  return (
    <section id="publications" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-card/10 to-background">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[80px]"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            Publications & Articles
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
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Sharing knowledge through technical articles and case studies
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500
                ${activeCard === index ? 'lg:col-span-2 h-auto' : 'h-full bg-card border border-border-light'}
                ${hoveredCard === index ? 'shadow-xl' : 'shadow-lg'}
              `}
              variants={cardVariants}
              custom={index}
              whileHover={activeCard === null ? "hover" : {}}
              onClick={() => expandCard(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card background with animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-card to-background opacity-80"
                  animate={{
                    background: hoveredCard === index 
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(0, 0, 0, 0))' 
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0))'
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {hoveredCard === index && particlePositions[index].map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent/40"
                    initial={{ 
                      opacity: 0,
                      x: particle.x + '%',
                      y: particle.y + '%' 
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary pr-4">
                    {pub.title}
                  </h3>
                  <motion.div
                    className="flex-shrink-0 p-2 rounded-full bg-accent/10 text-accent"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {activeCard === index ? (
                      <BookOpen size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </motion.div>
                </div>

                <div className="text-sm text-muted mb-4">
                  Published {pub.date} • {pub.readTime} min read
                </div>

                <AnimatePresence>
                  {activeCard === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-grow"
                    >
                      <p className="text-secondary mb-6 leading-relaxed">
                        {pub.fullDescription}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {pub.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <Link
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-accent hover:text-accent-hover transition-colors gap-1 font-medium"
                        >
                          Read Full Article
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-secondary line-clamp-2 flex-grow">
                      {pub.description}
                    </p>
                  )}
                </AnimatePresence>

                {activeCard !== index && (
                  <motion.div 
                    className="flex justify-end mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent hover:text-accent-hover transition-colors gap-1 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read Article
                      <ExternalLink size={14} />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const publications = [
  {
    title: "Building Cross-Platform Apps with React Native",
    date: "March 2023",
    readTime: 8,
    url: "https://medium.com/@saikrishnakotagiri/building-cross-platform-apps-react-native",
    description: "A comprehensive guide to developing high-performance mobile applications that work seamlessly across iOS and Android platforms.",
    fullDescription: "React Native has revolutionized mobile development by enabling developers to create native apps for both iOS and Android with a single codebase. In this comprehensive guide, I walk through the entire development process from setting up your environment to optimizing performance for production-ready applications. I cover best practices for state management, navigation patterns, and integrating with native modules when necessary. The article includes real-world examples from my experience building apps used by thousands of users, with practical tips for avoiding common pitfalls and ensuring a smooth user experience across different device types and screen sizes.",
    tags: ["React Native", "Mobile Development", "JavaScript", "Cross-Platform"]
  },
  {
    title: "Optimizing React Native Performance for Production Apps",
    date: "July 2023",
    readTime: 12,
    url: "https://medium.com/@saikrishnakotagiri/optimizing-react-native-performance",
    description: "Learn how to identify and resolve performance bottlenecks in React Native applications to create smoother user experiences.",
    fullDescription: "Performance optimization is critical for ensuring a good user experience in production React Native applications. This article dives deep into techniques I've used to reduce startup time by 30% and improve overall responsiveness in complex apps. I cover memory management, rendering optimization with useMemo and useCallback, list virtualization techniques, image optimization strategies, and reducing bundle size. The guide includes tools and metrics for measuring performance improvements, with before-and-after comparisons from real projects. I also explore native optimization techniques like Hermes engine configuration and proper use of native modules when JavaScript performance isn't enough for demanding features.",
    tags: ["Performance Optimization", "React Native", "Mobile", "JavaScript"]
  },
  {
    title: "Integrating Health SDKs with React Native Applications",
    date: "October 2023",
    readTime: 10,
    url: "https://medium.com/@saikrishnakotagiri/health-sdks-react-native",
    description: "A practical guide to connecting health and fitness data from Apple HealthKit and Google Fit into your React Native applications.",
    fullDescription: "Health and fitness apps require seamless integration with platform-specific health services like Apple HealthKit and Google Fit. This article provides a step-by-step guide for implementing these integrations in a React Native application, based on my experience developing a chronic health management app. I cover permission handling, data synchronization patterns, background updates, and creating a unified API that works across platforms. The guide includes code examples for reading and writing various health metrics, handling privacy concerns appropriately, and maintaining data consistency between the app and platform health stores. I also discuss testing strategies for health integrations, which can be particularly challenging due to the sensitive nature of health data.",
    tags: ["HealthKit", "Google Fit", "React Native", "Mobile Health"]
  },
  {
    title: "Effective CI/CD Pipelines for Mobile Applications",
    date: "January 2024",
    readTime: 9,
    url: "https://medium.com/@saikrishnakotagiri/cicd-mobile-apps",
    description: "How to set up automated testing, building, and deployment workflows for mobile applications using GitHub Actions and Fastlane.",
    fullDescription: "Continuous Integration and Continuous Deployment (CI/CD) are essential for maintaining quality and speeding up release cycles in mobile application development. This article details the CI/CD pipeline I implemented for a React Native project, which reduced release preparation time by 70%. I explain how to configure GitHub Actions for automated testing on pull requests, setting up Fastlane for automated builds, and implementing both beta distribution through TestFlight/Firebase App Distribution and production deployment to the App Store and Google Play. The guide covers environment-specific configuration, secure credential management, and strategies for parallel processing to minimize pipeline execution time. I also include troubleshooting tips for common CI/CD issues specific to mobile app development.",
    tags: ["CI/CD", "GitHub Actions", "Fastlane", "DevOps"]
  }
]; 
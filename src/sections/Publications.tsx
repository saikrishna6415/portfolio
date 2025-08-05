"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import InteractiveParticles from "@/components/InteractiveParticles";

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
        <InteractiveParticles 
          count={80}
          colors={["#3b82f6", "#8b5cf6", "#6366f1", "#0ea5e9"]}
          speed={0.3}
          interactionDistance={120}
        />
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

// Update the publications array with the real articles
const publications = [
  {
    title: "LLM-Aided System Design: How AI Assistants Help Draft Architecture Patterns",
    date: "2024",
    readTime: 10,
    url: "https://medium.com/@saikrishnakotagiri16/llm-aided-system-design-how-ai-assistants-help-draft-architecture-patterns-d633e2a7e8a4",
    description: "Exploring how large language models can assist in creating robust software architecture designs with practical applications.",
    fullDescription: "This article explores how AI assistants like ChatGPT and Claude can be leveraged to draft system architecture patterns. I discuss the benefits of using LLMs in the architecture design process, how they can help generate design alternatives, identify edge cases, and provide documentation. The guide includes practical examples, best practices, and limitations to consider when incorporating AI into your system design workflow.",
    tags: ["System Design", "LLM", "AI", "Software Architecture", "DevOps"]
  },
  {
    title: "Building Intelligent AI Agents with n8n: A Practical Guide",
    date: "2024",
    readTime: 8,
    url: "https://medium.com/@saikrishnakotagiri16/building-intelligent-ai-agents-with-n8n-a-practical-guide-90af853532e7",
    description: "A step-by-step guide to creating AI agents using n8n automation workflows with practical implementation examples.",
    fullDescription: "In this comprehensive guide, I demonstrate how to build intelligent AI agents using n8n's workflow automation platform. The article walks through creating agents that can perform complex tasks by orchestrating different AI capabilities and APIs. I cover the entire process from basic setup to advanced implementations, including examples of data processing, decision-making logic, and integration with external services to create fully functional autonomous agents.",
    tags: ["Automation", "n8n", "AI Agents", "Workflow", "Integration"]
  },
  {
    title: "Breaking the Performance Barrier: How We Optimised MongoDB Aggregation Queries",
    date: "2023",
    readTime: 12,
    url: "https://medium.com/@saikrishnakotagiri16/breaking-the-performance-barrier-how-we-optimised-mongodb-aggregation-queries-42a4790268a9",
    description: "Deep dive into performance optimization techniques for MongoDB aggregation pipelines with real-world examples and benchmarks.",
    fullDescription: "This technical deep-dive explores advanced techniques for optimizing MongoDB aggregation queries. Based on real-world experience, I share how our team significantly improved query performance by restructuring aggregation pipelines, implementing strategic indexing, and using MongoDB's query profiling tools. The article includes before-and-after performance benchmarks, code examples, and a systematic approach to identifying and resolving performance bottlenecks in complex database operations.",
    tags: ["MongoDB", "Database", "Performance", "Optimization", "Backend"]
  },
  {
    title: "Why Microservices Should Own Their Data and How It Benefits You",
    date: "2023",
    readTime: 9,
    url: "https://medium.com/@saikrishnakotagiri16/why-microservices-should-own-their-data-and-how-it-benefits-you-7c88d0b2e262",
    description: "An exploration of the 'Database-per-Service' pattern in microservice architecture and its advantages for scalability and maintenance.",
    fullDescription: "In this article, I advocate for the 'Database-per-Service' pattern in microservice architectures. Drawing from experience implementing this approach, I explain how data ownership by individual services leads to better isolation, reduced coupling, and improved scalability. The article discusses implementation strategies, challenges in data consistency, and practical solutions for managing distributed data while maintaining system integrity and performance.",
    tags: ["Microservices", "Architecture", "Database Design", "Scalability", "DevOps"]
  },
  {
    title: "Scaling React Native Apps: Best Practices",
    date: "2022",
    readTime: 11,
    url: "https://medium.com/@saikrishnakotagiri16/scaling-react-native-apps-best-practices-4162aa779937",
    description: "A comprehensive guide to building and scaling React Native applications while maintaining performance and code quality.",
    fullDescription: "This comprehensive guide covers essential strategies for scaling React Native applications effectively. Drawing from my experience building large-scale production apps, I discuss architectural patterns, state management approaches, code organization, performance optimization techniques, and testing strategies. The article provides practical recommendations for teams facing the challenges of growing and maintaining complex React Native codebases while ensuring app performance and developer productivity.",
    tags: ["React Native", "Mobile Development", "Scaling", "Performance", "Architecture"]
  },
  {
    title: "Integrating React Native as an SDK Into an Existing iOS App",
    date: "2022",
    readTime: 10,
    url: "https://medium.com/@saikrishnakotagiri16/integrating-react-native-as-an-sdk-into-a-existing-ios-app-f659cc1645a",
    description: "A technical guide for iOS developers looking to incorporate React Native components into their native application.",
    fullDescription: "This step-by-step guide demonstrates how to integrate React Native into an existing iOS application as a reusable SDK. I cover the entire process from initial setup to advanced implementation details, including Cocoapods integration, bridge configuration, module communication, and handling navigation between native and React Native components. The article addresses common challenges and provides practical solutions for developers looking to gradually adopt React Native in legacy iOS projects.",
    tags: ["React Native", "iOS", "SDK", "Integration", "Mobile Development"]
  },
  {
    title: "Using React Native as an SDK in Your Native Android App",
    date: "2022",
    readTime: 10,
    url: "https://medium.com/stackademic/using-react-native-as-an-sdk-in-your-native-android-app-5c4b6b40ad5f",
    description: "Learn how to embed React Native features into an existing Android native application through a modular SDK approach.",
    fullDescription: "This technical article guides Android developers through the process of integrating React Native components into existing native applications. I provide a detailed walkthrough of creating a modular React Native SDK for Android, including Gradle configuration, JavaScript bundling, native module bridges, and handling component lifecycle within the native environment. The guide includes code examples, troubleshooting tips, and best practices for maintaining a hybrid app with optimal performance.",
    tags: ["React Native", "Android", "SDK", "Integration", "Mobile Development"]
  }
]; 
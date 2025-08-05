"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import FloatingCard from "@/components/FloatingCard";

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const barContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (width: number) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Animated Underline */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0, width: 0 }}
            animate={inView ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-1 w-10 bg-accent rounded-full mx-1"></div>
            <div className="h-1 w-20 bg-accent rounded-full mx-1"></div>
            <div className="h-1 w-10 bg-accent rounded-full mx-1"></div>
          </motion.div>
          
          <motion.p 
            className="mt-4 text-lg text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            An arsenal of modern technologies I use to build exceptional digital experiences
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Interactive Skill Categories */}
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.title} 
              variants={categoryVariants}
              className="relative"
            >
              <motion.div
                className="absolute -left-4 h-full w-1 bg-accent rounded-full opacity-80"
                initial={{ height: 0 }}
                animate={inView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
              />
              
              <div className="mb-6">
                <div className="flex items-center">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20 -ml-5 z-10"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15,
                      delay: 0.2 * idx 
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="ml-4 text-2xl font-bold text-primary">{category.title}</h3>
                </div>
              </div>
              
              {/* Grid of skill cards - Replace with FloatingCard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillCardVariants}
                    className="relative"
                  >
                    <FloatingCard
                      className="bg-card rounded-xl p-6 border border-border-light shadow-lg overflow-hidden h-full"
                      glareColor={`rgba(59, 130, 246, 0.2)`}
                      depth={15}
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-lg text-primary">{skill.name}</h4>
                          <span className="text-accent font-medium">{skill.level}%</span>
                        </div>
                        
                        <motion.div 
                          className="h-2 bg-border rounded-full overflow-hidden"
                          variants={barContainerVariants}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
                            variants={barVariants}
                            custom={skill.level}
                          />
                        </motion.div>
                        
                        <div className="mt-4 text-sm text-secondary">
                          {skill.description}
                        </div>
                        
                        {/* Skill tags - Add floating effect to these as well */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {skill.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                              initial={{ opacity: 0, y: 10 }}
                              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                              transition={{ delay: 0.5 + (i * 0.1) }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(59, 130, 246, 0.2)"
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Skill data with icons, levels, descriptions and tags
const skillCategories = [
  {
    title: "Frontend Development",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M15 15h-4v-4h4v4z"></path><path d="M20.85 2.15 3.15 19.85a1 1 0 0 0 0 1.4l.6.6a1 1 0 0 0 1.4 0L22.85 4.15a1 1 0 0 0 0-1.4l-.6-.6a1 1 0 0 0-1.4 0Z"></path></svg>,
    skills: [
      {
        name: "React / React Native",
        level: 95,
        description: "Building responsive web and mobile interfaces with modern React patterns",
        tags: ["Hooks", "Context", "Redux", "Expo"]
      },
      {
        name: "JavaScript / TypeScript",
        level: 90,
        description: "Strongly-typed code with modern ECMAScript features",
        tags: ["ES6+", "Promises", "Async/Await", "Type Safety"]
      },
      {
        name: "CSS / Tailwind",
        level: 85,
        description: "Creating beautiful, responsive designs with modern CSS frameworks",
        tags: ["Flexbox", "Grid", "Animations", "Dark Mode"]
      }
    ]
  },
  {
    title: "Backend Development",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"></path><rect width="18" height="12" x="3" y="8" rx="2"></rect><path d="M10 15h.01M7 12h.01M7 15h.01"></path></svg>,
    skills: [
      {
        name: "Node.js / Express",
        level: 85,
        description: "Building performant APIs and server-side applications",
        tags: ["REST APIs", "Middleware", "Authentication"]
      },
      {
        name: "Java / Spring Boot",
        level: 80,
        description: "Enterprise-grade backend applications with Spring ecosystem",
        tags: ["Microservices", "MVC", "JPA"]
      },
      {
        name: "Databases",
        level: 75,
        description: "Working with SQL and NoSQL databases for different use cases",
        tags: ["MongoDB", "PostgreSQL", "Redis"]
      }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>,
    skills: [
      {
        name: "AWS Services",
        level: 70,
        description: "Using core AWS services for scalable infrastructure",
        tags: ["S3", "Lambda", "EC2", "DynamoDB"]
      },
      {
        name: "CI/CD",
        level: 75,
        description: "Implementing automated workflows for testing and deployment",
        tags: ["GitHub Actions", "Fastlane", "Docker"]
      },
      {
        name: "Firebase",
        level: 85,
        description: "Building applications with Firebase backend services",
        tags: ["Authentication", "Firestore", "Functions", "Hosting"]
      }
    ]
  }
]; 
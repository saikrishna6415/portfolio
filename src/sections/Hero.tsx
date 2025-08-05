"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.7,
        ease: "easeOut"
      },
    }),
  };

  return (
    <section id="home" className="pt-28 pb-16 md:py-32 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.span 
              className="inline-block text-sm sm:text-base text-blue-500 font-semibold tracking-widest uppercase mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="block text-blue-500 mt-2">Saikrishna Kotagiri</span>
            </motion.h1>

            <motion.h2 
              className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Senior Full Stack Developer
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              With 5+ years of experience building high-performance web and mobile applications 
              across iOS, Android, and Web platforms using React, React Native, and Redux.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Contact Me <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link 
                href="#experience" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                See My Work
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex space-x-5"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <motion.a 
                href="https://github.com/saikrishna6415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">GitHub</span>
                <Github size={24} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/saikrishna-kotagiri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href="mailto:saikrishnakotagiri16@gmail.com"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Email</span>
                <Mail size={24} />
              </motion.a>
              <motion.a 
                href="tel:+919989966415"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Phone</span>
                <Phone size={24} />
              </motion.a>
            </motion.div>
          </div>
          
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100 
            }}
          >
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                {/* Replace this placeholder with your actual image */}
                <Image 
                  src="/images/profile.jpg" 
                  alt="Saikrishna Kotagiri"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center items-start p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
} 
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 md:py-32 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Hi, I&apos;m</span>
              <span className="block text-blue-500">Saikrishna Kotagiri</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-6">
              Senior Full Stack Developer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              With 5+ years of experience building high-performance web and mobile applications 
              across iOS, Android, and Web platforms using React, React Native, and Redux.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Me <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link 
                href="#experience" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                See My Work
              </Link>
            </div>
            
            <div className="flex space-x-5">
              <a 
                href="https://github.com/saikrishna6415" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/saikrishna-kotagiri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:saikrishnakotagiri16@gmail.com"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">Email</span>
                <Mail size={24} />
              </a>
              <a 
                href="tel:+919989966415"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <span className="sr-only">Phone</span>
                <Phone size={24} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {/* Add your profile image here when available */}
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold">
                  SK
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
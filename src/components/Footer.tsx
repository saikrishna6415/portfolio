"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#home" className="text-xl font-bold">
              Saikrishna<span className="text-blue-500">.</span>
            </Link>
            <p className="mt-2 text-gray-400">
              Senior Full Stack Developer
            </p>
          </div>
          
          <div className="flex space-x-8 mb-6 md:mb-0">
            <Link href="#home" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="#experience" className="hover:text-blue-400 transition-colors">
              Experience
            </Link>
            <Link href="#skills" className="hover:text-blue-400 transition-colors">
              Skills
            </Link>
            <Link href="#publications" className="hover:text-blue-400 transition-colors">
              Publications
            </Link>
            <Link href="#contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/saikrishna6415" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/saikrishna-kotagiri" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:saikrishnakotagiri16@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Email</span>
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Saikrishna Kotagiri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
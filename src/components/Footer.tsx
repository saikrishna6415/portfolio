"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.05, duration: 0.5 }
    }),
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-card/30 border-t border-border-light relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-[30%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]"
          animate={{ 
            opacity: [0.4, 0.2, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Logo and description */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <Link href="#home" className="inline-block mb-6">
              <h3 className="text-2xl font-bold text-primary">
                Saikrishna<span className="text-accent">.</span>
              </h3>
            </Link>
            <p className="text-secondary max-w-md">
              Senior Full Stack Developer specializing in React Native, React.js, and modern backend technologies.
              Building innovative digital experiences that solve real-world problems.
            </p>
            
            <motion.div 
              className="flex space-x-4 mt-6"
              variants={itemVariants}
            >
              {[
                { icon: <Github size={20} />, href: "https://github.com/saikrishna6415", label: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/saikrishna-kotagiri", label: "LinkedIn" },
                { icon: <Twitter size={20} />, href: "https://twitter.com/name__is_sai", label: "Twitter" },
                { icon: <Mail size={20} />, href: "mailto:saikrishnakotagiri16@gmail.com", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-card border border-border rounded-full text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Navigation links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-primary mb-4">Navigation</h4>
            <motion.ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Publications", href: "#publications" }
              ].map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-secondary hover:text-accent transition-colors flex items-center"
                    variants={linkVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <span className="bg-border h-[1px] w-0 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-primary mb-4">Contact</h4>
            <address className="not-italic space-y-3 text-secondary">
              <motion.p variants={linkVariants} custom={0}>
                Mumbai, Maharashtra (Remote)
              </motion.p>
              <motion.p variants={linkVariants} custom={1}>
                <a 
                  href="tel:+919989966415" 
                  className="hover:text-accent transition-colors"
                >
                  +91 9989966415
                </a>
              </motion.p>
              <motion.p variants={linkVariants} custom={2}>
                <a 
                  href="mailto:saikrishnakotagiri16@gmail.com" 
                  className="hover:text-accent transition-colors"
                >
                  saikrishnakotagiri16@gmail.com
                </a>
              </motion.p>
            </address>
          </motion.div>
        </motion.div>
        
        {/* Bottom section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-sm text-muted mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Saikrishna Kotagiri. All rights reserved.
          </motion.p>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              href="/privacy"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
            <a 
              href="#contact"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Contact
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.a
        href="#home"
        className="fixed bottom-8 right-8 p-3 bg-accent text-white rounded-full shadow-lg shadow-accent/20 z-50 opacity-80 hover:opacity-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </motion.a>
    </footer>
  );
} 
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);
  
  // Add validation state
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  
  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  // Add reference to name input
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  // Animations
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const controls = useAnimation();
  const buttonControls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Floating particles animation
  const particleCount = 20;
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([]);
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      buttonControls.start("visible");
      
      // Generate particles
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 30 + 60}%)`,
      }));
      
      setParticles(newParticles);
    }
  }, [inView, controls, buttonControls]);

  // Auto-focus the name input field when section comes into view
  useEffect(() => {
    if (inView && nameInputRef.current) {
      // Small delay to ensure animation completes first
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 
          ? 'Name must be at least 2 characters' 
          : '';
      case 'email':
        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
          ? 'Please enter a valid email address' 
          : '';
      case 'subject':
        return value.trim().length < 3 
          ? 'Subject must be at least 3 characters' 
          : '';
      case 'message':
        return value.trim().length < 10 
          ? 'Message must be at least 10 characters' 
          : '';
      default:
        return '';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
      const errorMessage = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: errorMessage }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFieldFocus(null);
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const errorMessage = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });
    
    // Set errors
    setErrors(newErrors);
    
    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return; // Don't submit if there are validation errors
    }
    
    setFormStatus("submitting");
    
    try {
      // Formspree integration
      const response = await fetch("https://formspree.io/f/xldlpbkq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Reset touched state
        setTouched({
          name: false,
          email: false,
          subject: false,
          message: false
        });
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormStatus("idle");
        }, 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => {
          setFormStatus("idle");
        }, 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.04, 0.62, 0.23, 0.98],
        delay: 0.2
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.6
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0px 2px 5px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.1 }
    },
    submitting: {
      scale: [1, 0.95, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2 + 0.3,
        duration: 0.7,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    })
  };
  
  const statusVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-card/10">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-40"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: "blur(3px)",
          }}
          animate={{
            x: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            y: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
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
            Ready to Start Your Next Project?
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
            Have a project in mind or need a technical consultant? Let&apos;s discuss how we can work together to create exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Add testimonial quote for social proof */}
        <motion.div
          className="mb-16 max-w-3xl mx-auto bg-card/50 p-6 rounded-xl border border-border-light"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="text-4xl text-accent">&ldquo;</div>
            <div>
              <p className="text-lg italic text-secondary">
                Saikrishna brought exceptional technical expertise to our project. His full-stack capabilities and attention to user experience made our application both powerful and intuitive. I highly recommend him for any technical challenge.
              </p>
              <p className="mt-3 font-medium text-primary">
                — Engineering Director, Enterprise SaaS Company
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="flex flex-col space-y-2"
              variants={contactInfoVariants}
              custom={0}
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <p className="text-secondary mb-8">
                Feel free to reach out through any of the channels below. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
              </p>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={contactInfoVariants}
              custom={1}
            >
              <div className="p-3 bg-accent/10 rounded-full">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary">Email</h4>
                <motion.a 
                  href="mailto:saikrishnakotagiri16@gmail.com" 
                  className="text-secondary hover:text-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  saikrishnakotagiri16@gmail.com
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={contactInfoVariants}
              custom={2}
            >
              <div className="p-3 bg-accent/10 rounded-full">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary">Phone</h4>
                <motion.a 
                  href="tel:+919989966415" 
                  className="text-secondary hover:text-accent transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  +91 9989966415
                </motion.a>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-4"
              variants={contactInfoVariants}
              custom={3}
            >
              <div className="p-3 bg-accent/10 rounded-full">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-primary">Location</h4>
                <p className="text-secondary">Hyderabad, Telangana (Remote)</p>
              </div>
            </motion.div>

            <motion.div 
              className="pt-8"
              variants={contactInfoVariants}
              custom={4}
            >
              <h4 className="text-lg font-medium text-primary mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {[
                  { name: "LinkedIn", href: "https://linkedin.com/in/saikrishna-kotagiri", icon: "ri-linkedin-fill" },
                  { name: "GitHub", href: "https://github.com/saikrishna6415", icon: "ri-github-fill" },
                  { name: "Twitter", href: "https://twitter.com/name__is_sai", icon: "ri-twitter-fill" }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card border border-border rounded-full text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: 0.5 + (index * 0.1) }
                    }}
                  >
                    <span className="sr-only">{social.name}</span>
                    <i className={`${social.icon} text-xl`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 relative"
            variants={formVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div 
              className="absolute inset-0 bg-card border border-border-light rounded-xl shadow-xl z-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            
            <form 
              className="relative z-10 p-8 md:p-10"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="relative"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="name" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'name' || formData.name 
                        ? 'text-xs -top-2 bg-card px-2 ' + (errors.name && touched.name ? 'text-red-500' : 'text-accent') 
                        : 'text-secondary top-3'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus('name')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none transition-all duration-300 ${
                      errors.name && touched.name 
                        ? 'border-red-400 focus:border-red-500' 
                        : touched.name && !errors.name
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-border focus:border-accent'
                    }`}
                  />
                  {/* Validation indicator */}
                  {touched.name && (
                    <motion.div 
                      className="absolute right-3 top-3.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {errors.name ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>
                  )}
                  {/* Error message */}
                  {errors.name && touched.name && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 ml-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="relative"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'email' || formData.email 
                        ? 'text-xs -top-2 bg-card px-2 ' + (errors.email && touched.email ? 'text-red-500' : 'text-accent') 
                        : 'text-secondary top-3'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus('email')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none transition-all duration-300 ${
                      errors.email && touched.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : touched.email && !errors.email
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-border focus:border-accent'
                    }`}
                  />
                  {/* Validation indicator */}
                  {touched.email && (
                    <motion.div 
                      className="absolute right-3 top-3.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {errors.email ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>
                  )}
                  {/* Error message */}
                  {errors.email && touched.email && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 ml-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Subject field */}
                <motion.div
                  className="relative md:col-span-2"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="subject" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'subject' || formData.subject 
                        ? 'text-xs -top-2 bg-card px-2 ' + (errors.subject && touched.subject ? 'text-red-500' : 'text-accent')
                        : 'text-secondary top-3'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none transition-all duration-300 ${
                      errors.subject && touched.subject 
                        ? 'border-red-400 focus:border-red-500' 
                        : touched.subject && !errors.subject
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-border focus:border-accent'
                    }`}
                  />
                  {/* Validation indicator */}
                  {touched.subject && (
                    <motion.div 
                      className="absolute right-3 top-3.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {errors.subject ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>
                  )}
                  {/* Error message */}
                  {errors.subject && touched.subject && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 ml-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message field */}
                <motion.div
                  className="relative md:col-span-2"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'message' || formData.message 
                        ? 'text-xs -top-2 bg-card px-2 ' + (errors.message && touched.message ? 'text-red-500' : 'text-accent')
                        : 'text-secondary top-3'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus('message')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-transparent border rounded-lg outline-none transition-all duration-300 resize-none ${
                      errors.message && touched.message 
                        ? 'border-red-400 focus:border-red-500' 
                        : touched.message && !errors.message
                        ? 'border-green-400 focus:border-green-500'
                        : 'border-border focus:border-accent'
                    }`}
                  />
                  {/* Validation indicator */}
                  {touched.message && (
                    <motion.div 
                      className="absolute right-3 top-3.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {errors.message ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>
                  )}
                  {/* Error message */}
                  {errors.message && touched.message && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 ml-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                <div className="md:col-span-2 flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="px-8 py-4 bg-accent text-white font-medium rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all flex items-center justify-center space-x-2"
                    variants={buttonVariants}
                    initial="hidden"
                    animate={formStatus === "submitting" ? "submitting" : "visible"}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Form Status Messages */}
              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    className="absolute -bottom-16 left-0 right-0 p-6 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center justify-center space-x-3"
                    variants={statusVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <CheckCircle size={20} />
                    <span className="font-medium">Message received! I&apos;ll review your project details and get back to you within 24-48 hours.</span>
                  </motion.div>
                )}
                
                {formStatus === "error" && (
                  <motion.div
                    className="absolute -bottom-16 left-0 right-0 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center justify-center space-x-2"
                    variants={statusVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AlertCircle size={18} />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
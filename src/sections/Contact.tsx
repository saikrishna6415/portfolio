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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get In Touch</h2>
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
          <p className="max-w-2xl mx-auto text-lg text-secondary">
            Let&apos;s discuss how I can help bring your ideas to life
          </p>
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
                <p className="text-secondary">Mumbai, Maharashtra (Remote)</p>
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
                        ? 'text-xs -top-2 text-accent bg-card px-2' 
                        : 'text-secondary top-3'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFieldFocus('name')}
                    onBlur={() => setFieldFocus(null)}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent rounded-lg outline-none transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'email' || formData.email 
                        ? 'text-xs -top-2 text-accent bg-card px-2' 
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
                    onBlur={() => setFieldFocus(null)}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent rounded-lg outline-none transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="relative md:col-span-2"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="subject" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'subject' || formData.subject 
                        ? 'text-xs -top-2 text-accent bg-card px-2' 
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
                    onBlur={() => setFieldFocus(null)}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent rounded-lg outline-none transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  className="relative md:col-span-2"
                  variants={itemVariants}
                >
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 transition-all duration-300 ${
                      fieldFocus === 'message' || formData.message 
                        ? 'text-xs -top-2 text-accent bg-card px-2' 
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
                    onBlur={() => setFieldFocus(null)}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-accent rounded-lg outline-none transition-all duration-300 resize-none"
                  />
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
                    className="absolute -bottom-16 left-0 right-0 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center justify-center space-x-2"
                    variants={statusVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <CheckCircle size={18} />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
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
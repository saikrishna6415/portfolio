"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { scrollToSection } from "@/utils/scrollTransition";

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show floating button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const contactMethods = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "saikrishnakotagiri16@gmail.com",
      action: () => window.open("mailto:saikrishnakotagiri16@gmail.com", "_blank")
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: "+91 9989966415",
      action: () => window.open("tel:+919989966415", "_blank")
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "saikrishna-kotagiri",
      action: () => window.open("https://linkedin.com/in/saikrishna-kotagiri", "_blank")
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Hyderabad, Telangana (Remote)",
      action: () => {}
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main floating button */}
          <motion.button
            onClick={handleContactClick}
            className="relative w-16 h-16 bg-accent text-white rounded-full shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="mx-auto" />
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle size={24} className="mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Expanded contact panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-20 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl p-6"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">Get in Touch</h3>
                  <p className="text-sm text-secondary">
                    Ready to work together? Let&apos;s discuss your project.
                  </p>
                  
                  {/* Contact methods */}
                  <div className="space-y-3">
                    {contactMethods.map((method, index) => (
                      <motion.div
                        key={method.label}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-border-light transition-colors cursor-pointer"
                        onClick={method.action}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-2 bg-accent/10 rounded-lg text-accent">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary">{method.label}</p>
                          <p className="text-xs text-secondary">{method.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick action button */}
                  <motion.button
                    onClick={() => {
                      scrollToSection("contact");
                      setIsExpanded(false);
                    }}
                    className="w-full mt-4 px-4 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

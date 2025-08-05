"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-lg text-secondary">
            <p className="mb-6">
              Senior Full Stack Developer (React / React Native) with 5+ years of experience building 
              high-performance web and mobile applications across iOS, Android, and Web platforms using 
              React, React Native, Redux.
            </p>
            
            {/* Visual divider with icon */}
            <div className="flex items-center justify-center my-8">
              <div className="h-[1px] bg-border-light flex-1"></div>
              <div className="mx-4 bg-accent/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="h-[1px] bg-border-light flex-1"></div>
            </div>
            
            <p className="mb-6">
              Strong backend knowledge in Java (Spring Boot) and Node.js (Express), with experience using 
              cloud services (AWS S3, Lambda, Firebase) to deliver scalable full-stack solutions.
            </p>
            
            {/* Visual callout box */}
            <div className="border-l-4 border-accent bg-accent/5 p-4 rounded my-8">
              <p className="italic text-secondary">
                &ldquo;Expert in development best practices including CI/CD (Jenkins, GitHub Actions), automated 
                testing, and Agile methodologies; passionate about optimizing app performance (e.g., reducing 
                load times by ~30%) to enhance user experience for thousands of users.&rdquo;
              </p>
            </div>
            
            <p>
              Published technical articles on mobile development best practices and SDK integrations, 
              demonstrating thought leadership and cross-platform development expertise.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light relative overflow-hidden group"
                whileHover={{ y: -5 }}
              >
                {/* Background decoration */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-accent/10" />
                
                <motion.div 
                  className="text-4xl text-accent mb-4 font-bold relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-primary relative">{stat.title}</h3>
                <p className="text-muted relative">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  {
    value: "5+",
    title: "Years of Experience",
    description: "Building responsive web and mobile applications"
  },
  {
    value: "20+",
    title: "Projects Completed",
    description: "Delivered on time with high user satisfaction"
  },
  {
    value: "8+",
    title: "Technical Articles",
    description: "Published on modern development practices"
  }
]; 
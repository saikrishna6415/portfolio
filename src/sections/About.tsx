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
    <section id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-lg">
            <p className="mb-6">
              Senior Full Stack Developer (React / React Native) with 5+ years of experience building 
              high-performance web and mobile applications across iOS, Android, and Web platforms using 
              React, React Native, Redux.
            </p>
            <p className="mb-6">
              Strong backend knowledge in Java (Spring Boot) and Node.js (Express), with experience using 
              cloud services (AWS S3, Lambda, Firebase) to deliver scalable full-stack solutions.
            </p>
            <p className="mb-6">
              Expert in development best practices including CI/CD (Jenkins, GitHub Actions), automated 
              testing, and Agile methodologies; passionate about optimizing app performance (e.g., reducing 
              load times by ~30 percentage) to enhance user experience for thousands of users.
            </p>
            <p>
              Published technical articles on mobile development best practices and SDK integrations, 
              demonstrating thought leadership and cross-platform development expertise.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="text-4xl text-blue-500 mb-4 font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.description}</p>
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
    value: "10+",
    title: "Projects Completed",
    description: "Delivered on time with high user satisfaction"
  },
  {
    value: "4+",
    title: "Technical Articles",
    description: "Published on modern development practices"
  }
]; 
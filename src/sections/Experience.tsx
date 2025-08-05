"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Senior React Native Developer",
    company: "Lillia",
    location: "Mumbai, Maharashtra (Remote)",
    period: "June 2020 – Present",
    description: [
      "Designed and developed a cross-platform mobile app (iOS & Android) for chronic health management using React Native and Redux, enabling features like meal / activity log, chat, and device data integration.",
      "Integrated native modules and SDKs (Apple HealthKit, Android sensor libraries) to extend app functionality, and collaborated on back-end API development using Java Spring Boot for data synchronization.",
      "Leveraged AWS (S3 for media storage, Lambda for serverless functions) and Firebase (Authentication, Realtime Database) to build a scalable, secure backend infrastructure.",
      "Established automated CI/CD pipelines with Fastlane and GitHub Actions, streamlining the build and deployment processes, and reducing the release cycle time by ~70 percentage.",
      "Optimized app performance and stability by refactoring code and following best practices, achieving a ~30 percentage faster startup time and significantly reducing crash rates."
    ]
  },
  {
    title: "Software Engineer",
    company: "MountBlue Technologies Private Limited",
    location: "Bangalore",
    period: "Feb 2020 – May 2020",
    description: [
      "Trained in full-stack JavaScript development (React, Node.js, Express.js, REST APIs)",
      "Studied Agile/Scrum, software development life cycles, and production system troubleshooting",
      "Collaborated with cross-functional teams to deliver client projects on time and within scope",
      "Gained experience in modern web development technologies and best practices"
    ]
  }
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div 
          ref={ref}
          className="relative"
        >
          {/* Timeline connector */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } md:gap-8`}
              >
                {/* Timeline bullet */}
                <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 transform -translate-x-1/2 md:-translate-x-1/2"></div>

                {/* Content */}
                <div className="ml-10 md:ml-0 md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Briefcase className="text-blue-500 mr-2" size={20} />
                    <h3 className="text-xl font-bold">{experience.title}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <div className="font-medium text-gray-700 dark:text-gray-300">{experience.company}</div>
                    <div className="text-gray-600 dark:text-gray-400">{experience.location}</div>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="mr-1" />
                      {experience.period}
                    </div>
                  </div>
                  
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {experience.description.map((item, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Spacer for alternate layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
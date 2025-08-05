"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

const publications = [
  {
    title: "Integrating React Native as an SDK into a Native Android App",
    url: "https://blog.stackademic.com/using-react-native-as-an-sdk-in-your-native-android-app-5c4b6b40ad5f?gi=0a6f2ca3555f",
    description: "A guide on how to integrate React Native components into existing Android applications using the React Native SDK approach."
  },
  {
    title: "Integrating React Native as an SDK into an Existing iOS App",
    url: "https://medium.com/@saikrishnakotagiri16/integrating-react-native-as-an-sdk-into-a-existing-ios-app-f659cc1645a",
    description: "Step-by-step tutorial on adding React Native views to an established iOS application."
  },
  {
    title: "Scaling React Native Apps: Best Practices",
    url: "https://medium.com/@saikrishnakotagiri16/scaling-react-native-apps-best-practices-4162aa779937",
    description: "Comprehensive guide to maintaining performance while growing React Native applications."
  },
  {
    title: "Why Microservices Should Own Their Data (And How It Benefits You)",
    url: "https://medium.com/@saikrishnakotagiri16/why-microservices-should-own-their-data-and-how-it-benefits-you-7c88d0b2e262",
    description: "Exploring the principles of data ownership in microservice architectures."
  }
];

export default function Publications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="publications" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Publications & Articles</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {publications.map((publication, index) => (
            <motion.a
              key={index}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
                  {publication.title}
                </h3>
                <ArrowUpRight className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {publication.description}
              </p>
              <div className="mt-4 text-blue-500 font-medium">Read article</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
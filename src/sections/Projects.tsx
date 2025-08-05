"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Briefcase, Monitor, Smartphone } from "lucide-react";

const projects = [
  {
    title: "React Native SDK Development",
    platform: "Mobile",
    employmentType: "Full-time",
    description: "Engineered a React Native SDK to streamline the integration of proprietary services into third-party mobile applications, reducing integration time for partners by 60%.",
    tags: ["React Native", "SDK", "TypeScript", "Android/iOS"],
    liveUrl: null,
  },
  {
    title: "White-Label Healthcare App",
    platform: "Mobile",
    employmentType: "Full-time",
    description: "Architected and built a white-label mobile application for a chain of healthcare clinics, enabling patient management, appointment scheduling, and remote consultations.",
    tags: ["React Native", "White-Label", "Healthcare", "Firebase"],
    liveUrl: null,
  },
  {
    title: "Fitness & Health App",
    platform: "Mobile",
    employmentType: "Full-time",
    description: "Contributed to a leading fitness application, implementing features for workout tracking, diet planning, and live-streaming classes to over 100k users.",
    tags: ["React Native", "Redux", "Node.js", "Fitness Tech"],
    liveUrl: null,
  },
  {
    title: "Parenting Support Platform",
    platform: "Web",
    employmentType: "Full-time",
    description: "Enhanced a high-traffic parenting support web platform, focusing on performance optimization, SEO, and implementing new community features for a better user experience.",
    tags: ["React", "Performance", "SEO", "Community Platform"],
    liveUrl: null,
  },
  {
    title: "Restaurant Discovery Web App",
    platform: "Web",
    employmentType: "Freelance",
    description: "Designed and developed a web application for restaurant discovery and reservations, featuring a user-friendly interface and a robust search functionality.",
    tags: ["React", "Node.js", "Google Maps API", "Restaurant Tech"],
    liveUrl: null,
  },
  {
    title: "Educational Treasure Hunt Game",
    platform: "Mobile",
    employmentType: "Freelance",
    description: "Created an interactive treasure hunt game for children, using location-based services and gamification to encourage outdoor activity and learning.",
    tags: ["React Native", "Gamification", "Kids App", "Geolocation"],
      liveUrl: null,
  },
  {
    title: "Digital Newspaper Platform",
    platform: "Web",
    employmentType: "Freelance",
    description: "Built the front-end for a responsive e-paper platform, providing an intuitive and engaging reading experience for a major digital publisher.",
    tags: ["React", "UI/UX", "Responsive Design", "Publishing"],
    liveUrl: null,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase() === 'mobile') return <Smartphone size={16} />;
    return <Monitor size={16} />;
  };

  return (
    <section ref={ref} id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A selection of projects that demonstrate my expertise in building robust and user-friendly applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col p-8"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-secondary mb-4">
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(project.platform)}
                    <span>{project.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{project.employmentType}</span>
                  </div>
                </div>

                <p className="text-secondary mb-6">{project.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
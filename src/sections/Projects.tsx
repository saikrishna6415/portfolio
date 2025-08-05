"use client";

import ParallaxSection from "@/components/ParallaxSection";

export default function Projects() {
  // Project images with their descriptions
  const projectImages = [
    {
      src: "/images/workspace-1.jpg",
      alt: "E-Commerce Mobile App",
      speed: 0.2
    },
    {
      src: "/images/workspace-2.jpg",
      alt: "Healthcare Dashboard",
      speed: 0.15
    },
    {
      src: "/images/workspace-3.jpg",
      alt: "Financial Analytics Platform",
      speed: 0.25
    },
    {
      src: "/images/workspace.jpg",
      alt: "Social Media Backend",
      speed: 0.18
    },
    {
      src: "/images/profile.jpg",
      alt: "Real-time Chat Application",
      speed: 0.22
    }
  ];

  return (
    <ParallaxSection
      images={projectImages}
      title="My Projects"
      subtitle="Dive into my portfolio of innovative solutions across various industries"
    />
  );
} 
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

// Image item component to handle individual parallax effects
function ParallaxImage({ 
  image, 
  index, 
  scrollYProgress 
}: { 
  image: { src: string; alt: string; speed?: number }; 
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const speed = image.speed || (index % 3 === 0 ? 0.2 : index % 3 === 1 ? 0.1 : 0.3);
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, index % 2 === 0 ? 200 * speed : -200 * speed]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1 + (index % 3) * 0.05, 1]
  );
  
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? 5 : -5]
  );

  // Position classes array
  const positions = [
    "top-1/4 left-[10%] w-1/4", // top left
    "top-1/3 right-[15%] w-1/3", // top right
    "top-2/3 left-[20%] w-1/4", // bottom left
    "top-1/2 right-[10%] w-1/5", // bottom right
    "top-1/4 left-[40%] w-1/4", // center top
    "bottom-[15%] right-[30%] w-1/4", // center bottom
  ];
  
  const position = positions[index % positions.length];
  
  return (
    <motion.div
      className={`absolute ${position} aspect-square shadow-xl rounded-lg overflow-hidden`}
      style={{ y, scale, rotate }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        style={{ objectFit: "cover" }}
        className="transition-all duration-500 hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
        loading="lazy"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white">
          <p className="text-sm font-medium">{image.alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Decorative element component
function DecorativeElement({
  className,
  scrollYProgress,
  yRange,
  opacityRange
}: {
  className: string;
  scrollYProgress: MotionValue<number>;
  yRange: [number, number];
  opacityRange: [number, number, number];
}) {
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], opacityRange);
  
  return (
    <motion.div
      className={className}
      style={{ y, opacity }}
    />
  );
}

interface ParallaxSectionProps {
  images: {
    src: string;
    alt: string;
    speed?: number;
  }[];
  title: string;
  subtitle?: string;
}

export default function ParallaxSection({ images, title, subtitle }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-secondary max-w-2xl text-center mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

     
      </div>

    </section>
  );
} 
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  {
    src: "/GSI-6221.jpg",
    alt: "M-taka presentation showcasing waste management strategies"
  },
  {
    src: "/GSI-6410.jpg", 
    alt: "CRICHOW project partnership presentation"
  },
  {
    src: "/MTK-0877.jpg",
    alt: "CRICHOW project presentation to stakeholders"
  },
  {
    src: "/HOK-1138.jpg",
    alt: "M-taka app demonstration in the field"
  },
  {
    src: "/GSI-6519.jpg",
    alt: "Project implementation discussion"
  }
];

export default function HeroBackgroundSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // Preload next image for smooth transitions
  useEffect(() => {
    const nextIndex = currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1;
    const img = new window.Image();
    img.src = heroImages[nextIndex].src;
  }, [currentImageIndex]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
          <Image
            src={heroImages[currentImageIndex].src}
            alt={heroImages[currentImageIndex].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={currentImageIndex === 0}
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Subtle gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 z-10"
        onClick={() => setCurrentImageIndex(
          currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
        )}
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all duration-300 z-10"
        onClick={() => setCurrentImageIndex(
          currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
        )}
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
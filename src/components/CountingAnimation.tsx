"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountingAnimationProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  triggerOnView?: boolean;
}

export default function CountingAnimation({
  from,
  to,
  duration = 2,
  className = "",
  triggerOnView = true
}: CountingAnimationProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(!triggerOnView);

  // Intersection Observer to trigger animation when element comes into view
  useEffect(() => {
    if (!triggerOnView) return;

    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [hasAnimated, triggerOnView]);

  // Animation effect
  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    const node = nodeRef.current;
    if (!node) return;

    // Set initial value
    node.textContent = from.toString();

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
      onComplete() {
        setHasAnimated(true);
      }
    });

    return () => controls.stop();
  }, [from, to, duration, isInView, hasAnimated]);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8
      }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {from}
    </motion.span>
  );
}
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ScrollRevealTextProps {
  text?: string;
  className?: string;
}

export const ScrollRevealText = ({ className }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  // Track scroll position of the heading element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 35%"]
  });
  
  const segments = [
    { text: "I'm the developer people trust to take an idea from", className: "text-neutral-900" },
    { text: "zero to something real", className: "font-medium text-brand" },
    { text: "— fast, solid, and", className: "text-neutral-900" },
    { text: "built to last.", className: "font-light text-neutral-500" }
  ];

  // Flatten words with their classes to assign global scroll indexes
  const allWords: { word: string; className: string; globalIndex: number }[] = [];
  let wordCount = 0;
  segments.forEach(seg => {
    const words = seg.text.split(" ");
    words.forEach(w => {
      allWords.push({
        word: w,
        className: seg.className,
        globalIndex: wordCount++
      });
    });
  });
  
  return (
    <h2 
      ref={containerRef} 
      className={cn("text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.3] tracking-tight flex flex-wrap justify-center", className)}
    >
      {allWords.map(({ word, className: wordClass, globalIndex }, i) => {
        // Distribute the animation range across all words
        const start = globalIndex / wordCount;
        const end = (globalIndex + 1.2) / wordCount; // slightly overlap transitions for smoothness
        
        // Interpolate scroll progress to opacity (retaining original colors)
        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
        
        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className={cn("mr-[0.22em] select-none inline-block transition-all duration-100 ease-out", wordClass)}
          >
            {word}
          </motion.span>
        );
      })}
    </h2>
  );
};

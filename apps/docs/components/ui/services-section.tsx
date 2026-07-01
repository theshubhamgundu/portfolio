'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Marquee } from '@/app/(home)/marquee';
import { 
  OpenAILogo, 
  MicrosoftLogo, 
  AirtableLogo, 
  NotionLogo, 
  N8nLogo, 
  GmailLogo 
} from '@/components/logos';

interface ServicesSectionProps {
  className?: string;
}

// 8-Point Radiating Star SVG from WebbHeads
const StarIcon = () => (
  <svg 
    className="size-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" 
    viewBox="0 0 256 256" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill="currentColor"
      d="M214.86,180.12a8,8,0,0,1-11,2.74L136,142.13V216a8,8,0,0,1-16,0V142.13L52.12,182.86a8,8,0,1,1-8.23-13.72L112.45,128,43.89,86.86a8,8,0,1,1,8.23-13.72L120,113.87V40a8,8,0,0,1,16,0v73.87l67.88-40.73a8,8,0,1,1,8.23,13.72L143.55,128l68.56,41.14A8,8,0,0,1,214.86,180.12Z"
    />
  </svg>
);

const ArrowDownRightIcon = () => (
  <div className="size-5 rounded-full bg-[#9d174d] dark:bg-pink-600 flex items-center justify-center mr-1.5 shrink-0">
    <svg className="size-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  </div>
);

const ArrowUpRightIcon = () => (
  <div className="size-5 rounded-full bg-[#9d174d] dark:bg-pink-600 flex items-center justify-center mr-1.5 shrink-0">
    <svg className="size-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  </div>
);

export const ServicesSection = ({ className }: ServicesSectionProps) => {
  const [uiuxState, setUiuxState] = useState<'before' | 'after'>('after');
  const [buildKey, setBuildKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUiuxState((prev) => (prev === 'before' ? 'after' : 'before'));
    }, 3500); // Transition automatically every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBuildKey((prev) => prev + 1);
    }, 6000); // Reset building animations loop every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.35,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const metrics = [
    {
      name: "Growth",
      beforeText: "Growth +10%",
      afterText: "Growth +250%",
      beforeX: "45%",
      afterX: "80%",
    },
    {
      name: "Efficiency",
      beforeText: "Efficiency -50%",
      afterText: "Efficiency +200%",
      beforeX: "30%",
      afterX: "58%",
    },
    {
      name: "Cost",
      beforeText: "Cost +100%",
      afterText: "Cost -100%",
      beforeX: "60%",
      afterX: "35%",
    }
  ];
  
  // Spoke endpoints relative to center (50%, 50%)
  const spokes = [
    { name: 'OpenAI', logo: <OpenAILogo className="size-6 text-emerald-600" />, x: 0, y: -100 },
    { name: 'Microsoft', logo: <MicrosoftLogo className="size-6 text-blue-600" />, x: 90, y: -50 },
    { name: 'Airtable', logo: <AirtableLogo className="size-6 text-red-500" />, x: 90, y: 50 },
    { name: 'Notion', logo: <NotionLogo className="size-6 text-black dark:text-white" />, x: 0, y: 100 },
    { name: 'n8n', logo: <N8nLogo className="size-6 text-orange-500" />, x: -90, y: 50 },
    { name: 'Gmail', logo: <GmailLogo className="size-6 text-red-600" />, x: -90, y: -50 },
  ];

  return (
    <section className={cn("col-span-full mt-16 md:mt-24 px-4 w-full select-none max-w-[1200px] mx-auto space-y-12", className)}>
      
      {/* Section Header */}
      <div className="text-center max-w-[800px] mx-auto space-y-3 mb-4">
        <h2 className="text-3xl sm:text-4xl font-jakarta font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Services & Expertise
        </h2>
        <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-jakarta leading-relaxed max-w-[650px] mx-auto">
          Turning complex business requirements into clean, automated, and high-performing systems.
        </p>
      </div>

      {/* 2-Column Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Card 1: AI Automation Services */}
        <div className="bg-white dark:bg-neutral-950 bg-gradient-to-b from-indigo-50/70 to-white dark:from-indigo-950/30 dark:to-neutral-950 border border-indigo-100/80 dark:border-indigo-900/30 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              AI Automation Services
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <StarIcon />
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Make Business Ease: </strong>
                  Simplify your process with automation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <StarIcon />
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Insights Drive Growth: </strong>
                  Leverage actionable data to scale with AI.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sub-card A: Data-driven */}
            <div className="bg-white/90 dark:bg-neutral-900/90 border border-neutral-100 dark:border-neutral-800/60 rounded-2xl p-6 shadow-md space-y-4">
              <div className="size-10 rounded-xl bg-purple-50 dark:bg-neutral-800 flex items-center justify-center text-purple-700 dark:text-purple-400">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 font-jakarta">Data-driven</h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Turn raw data into actionable insights that power smarter decisions and measurable growth.
                </p>
              </div>
            </div>

            {/* Sub-card B: Efficient Growth */}
            <div className="bg-white/90 dark:bg-neutral-900/90 border border-neutral-100 dark:border-neutral-800/60 rounded-2xl p-6 shadow-md space-y-4">
              <div className="size-10 rounded-xl bg-purple-50 dark:bg-neutral-800 flex items-center justify-center text-purple-700 dark:text-purple-400">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 font-jakarta font-semibold">Efficient Growth</h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Workflow Automation & Optimization (Hub & Spoke Animation) */}
        <div className="bg-white dark:bg-neutral-950 bg-gradient-to-b from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-neutral-950 border border-emerald-100/80 dark:border-emerald-900/30 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
          <div className="space-y-2">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Workflow Automation & Optimization
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Streamline repetitive tasks & keep your business running on autopilot with robust API linkages.
            </p>
          </div>

          {/* Animation Viewport */}
          <div className="relative w-full h-[280px] rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30 border border-neutral-100/70 dark:border-neutral-800/60 overflow-hidden flex items-center justify-center">
            
            {/* SVG Connecting Lines with Continuous Glowing Flow Animation */}
            <svg className="absolute inset-0 size-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <style>{`
                @keyframes svgFlow {
                  from { stroke-dashoffset: 24; }
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
              {/* Background solid connecting tracks */}
              {spokes.map((spoke, idx) => (
                <line 
                  key={`bg-${idx}`}
                  x1="50%" 
                  y1="50%" 
                  x2={`calc(50% + ${spoke.x}px)`} 
                  y2={`calc(50% + ${spoke.y}px)`} 
                  className="stroke-neutral-200/80 dark:stroke-neutral-800/90" 
                  strokeWidth="2" 
                />
              ))}
              {/* Overlay animated flowing glow streams */}
              {spokes.map((spoke, idx) => (
                <line 
                  key={`flow-${idx}`}
                  x1="50%" 
                  y1="50%" 
                  x2={`calc(50% + ${spoke.x}px)`} 
                  y2={`calc(50% + ${spoke.y}px)`} 
                  className="stroke-indigo-500 dark:stroke-purple-400" 
                  strokeWidth="2" 
                  strokeDasharray="6 18"
                  style={{
                    animation: 'svgFlow 1s linear infinite',
                    filter: 'drop-shadow(0px 0px 2px rgba(99, 102, 241, 0.5))'
                  }}
                />
              ))}
            </svg>

            {/* Hub: Center Custom S Logo */}
            <div className="absolute z-10 size-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shadow-lg">
              <img src="/s.png" alt="S Logo" className="size-9 object-contain" />
            </div>

            {/* Spokes: Outer Connected Logos */}
            {spokes.map((spoke, idx) => (
              <div
                key={idx}
                style={{ 
                  transform: `translate(${spoke.x}px, ${spoke.y}px)`
                }}
                className="absolute size-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shadow-md"
              >
                {spoke.logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Card 3: UI/UX Design (Interactive Before/After Toggle) */}
        <div className="bg-white dark:bg-neutral-950 bg-gradient-to-b from-pink-50/70 to-white dark:from-pink-950/20 dark:to-neutral-950 border border-pink-100/80 dark:border-pink-900/30 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
          <div className="space-y-2">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              UI/UX Design
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Deliver seamless user journeys with designs that convert and delight.
            </p>
          </div>

          {/* Animation Viewport */}
          <div className="relative w-full h-[280px] rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30 border border-neutral-100/70 dark:border-neutral-800/60 overflow-hidden flex flex-col justify-between p-6">
            
            {/* Top Right Badge (Before / After Cross-fade) */}
            <div className="absolute top-6 right-6 h-8 z-20">
              <AnimatePresence mode="popLayout">
                {uiuxState === 'before' ? (
                  <motion.div
                    key="before-badge"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center bg-[#fce7f3] dark:bg-pink-950/30 text-[#9d174d] dark:text-pink-300 px-3.5 py-1.5 rounded-full text-xs font-bold font-jakarta shadow-sm border border-pink-200/20"
                  >
                    <ArrowDownRightIcon />
                    Before
                  </motion.div>
                ) : (
                  <motion.div
                    key="after-badge"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center bg-[#fce7f3] dark:bg-pink-950/30 text-[#9d174d] dark:text-pink-300 px-3.5 py-1.5 rounded-full text-xs font-bold font-jakarta shadow-sm border border-pink-200/20"
                  >
                    <ArrowUpRightIcon />
                    After
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Layout with Left Vertical Accent Lines and Right Horizontal Sliders */}
            <div className="w-full flex items-center gap-4 mt-8 mb-4">
              {/* Left Vertical Lines */}
              <div className="flex items-center gap-1.5 shrink-0 pl-1">
                <div className="w-[2px] h-36 bg-gradient-to-b from-transparent via-purple-300/60 to-transparent dark:via-purple-500/25 rounded-full" />
                <div className="w-[3px] h-48 bg-gradient-to-b from-transparent via-purple-400/70 to-transparent dark:via-purple-500/40 rounded-full" />
                <div className="w-[2px] h-40 bg-gradient-to-b from-transparent via-purple-300/60 to-transparent dark:via-purple-500/25 rounded-full" />
              </div>

              {/* Sliders Container */}
              <div className="flex-1 flex flex-col gap-3 relative select-none">
                {metrics.map((metric, idx) => (
                  <div 
                    key={idx}
                    className="relative w-full h-[52px] border border-purple-200/50 dark:border-neutral-800/60 rounded-2xl bg-purple-50/15 dark:bg-neutral-900/30 flex items-center px-1"
                  >
                    <motion.div
                      animate={{
                        left: uiuxState === 'after' ? metric.afterX : metric.beforeX
                      }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)',
                        backgroundSize: '6px 6px, 100% 100%',
                      }}
                      className="absolute text-sm font-semibold font-jakarta text-purple-100 h-10 px-6 rounded-[14px] shadow-lg border border-purple-500/20 whitespace-nowrap flex items-center justify-center transform -translate-y-1/2 top-1/2 -translate-x-1/2"
                    >
                      {uiuxState === 'after' ? metric.afterText : metric.beforeText}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Skeleton Decor */}
            <div className="w-full space-y-2.5 mt-auto">
              <div className="h-2 w-[90%] bg-purple-100/50 dark:bg-neutral-800 rounded-full" />
              <div className="h-2 w-[75%] bg-purple-100/50 dark:bg-neutral-800 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 4: Product & System Development */}
        <div className="bg-white dark:bg-neutral-950 bg-gradient-to-b from-blue-50/70 to-white dark:from-blue-950/30 dark:to-neutral-950 border border-blue-100/80 dark:border-blue-900/30 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
          <div className="space-y-2">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Product & System Development
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Bringing custom digital products to life: high-performance landing pages, e-commerce systems, custom CRMs, AI automation workflows, and MVPs.
            </p>
          </div>

          {/* Animation Viewport */}
          <motion.div 
            whileHover="hover"
            className="relative w-full h-[280px] rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30 border border-neutral-100/70 dark:border-neutral-800/60 overflow-hidden flex flex-col items-center justify-center p-6"
          >
            {/* Video Mockup Player */}
            <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-purple-100/40 dark:border-neutral-800/80 flex items-center justify-center">
              <video 
                src="/web-app-dev.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen invert dark:invert-0"
              />
            </div>

            {/* Technology tags marquee running below */}
            <div className="w-full mt-4 flex flex-col gap-2 overflow-hidden relative select-none">
              
              {/* Row 1: Leftward infinite tag scroll */}
              <Marquee className="[--duration:20s] [--gap:0.5rem]" pauseOnHover>
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tag, idx) => (
                  <span 
                    key={`t1-${idx}`} 
                    className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/80 shadow-sm px-3 py-1 rounded-full text-xs font-semibold font-jakarta text-neutral-700 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </Marquee>

              {/* Row 2: Rightward infinite tag scroll */}
              <Marquee className="[--duration:25s] [--gap:0.5rem]" reverse pauseOnHover>
                {["Python", "Node.js", "FastAPI", "Docker", "n8n", "Airtable"].map((tag, idx) => (
                  <span 
                    key={`t2-${idx}`} 
                    className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/80 shadow-sm px-3 py-1 rounded-full text-xs font-semibold font-jakarta text-neutral-700 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </Marquee>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

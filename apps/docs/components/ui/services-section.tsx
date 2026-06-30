'use client';

import React, { useState, useRef } from 'react';
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

export const ServicesSection = ({ className }: ServicesSectionProps) => {
  const [uiuxState, setUiuxState] = useState<'before' | 'after'>('after');
  
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
    <section className={cn("col-span-full mt-16 md:mt-24 px-4 w-full select-none max-w-[1200px] mx-auto space-y-6", className)}>
      
      {/* 2-Column Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Card 1: AI Automation Services */}
        <div className="bg-gradient-to-b from-purple-50/30 to-white/50 dark:from-neutral-900/50 dark:to-neutral-950/50 border border-purple-100/40 dark:border-neutral-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-8">
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
        <div className="bg-gradient-to-b from-purple-50/30 to-white/50 dark:from-neutral-900/50 dark:to-neutral-950/50 border border-purple-100/40 dark:border-neutral-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
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
            
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 size-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {spokes.map((spoke, idx) => (
                <line 
                  key={idx}
                  x1="50%" 
                  y1="50%" 
                  x2={`calc(50% + ${spoke.x}px)`} 
                  y2={`calc(50% + ${spoke.y}px)`} 
                  className="stroke-neutral-200 dark:stroke-neutral-800" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                />
              ))}
            </svg>

            {/* Traveling Pulse dots */}
            {spokes.map((spoke, idx) => (
              <motion.div
                key={`pulse-${idx}`}
                animate={{
                  x: [0, spoke.x],
                  y: [0, spoke.y],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.35
                }}
                className="absolute size-2 rounded-full bg-indigo-500/80 shadow-[0_0_8px_#6366f1] pointer-events-none"
              />
            ))}

            {/* Hub: Center ChatGPT Logo */}
            <div className="absolute z-10 size-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shadow-lg">
              <svg className="size-8 text-neutral-800 dark:text-neutral-100 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.4 9.8c.5-1.5.3-3.2-.5-4.5-1.2-2-3.6-3.1-6-2.6-1.3-1.4-3.3-2-5.2-1.6C6.1 1.7 4.6 3.1 4 5 2.5 5.3 1.2 6.3.4 7.6c-1.2 2-.9 4.6.6 6.3-.5 1.5-.3 3.2.5 4.5 1.2 2 3.6 3.1 6 2.6 1.3 1.4 3.3 2 5.2 1.6 3.5-.6 5-2 5.6-3.9 1.5-.3 2.7-1.3 3.5-2.6 1.2-2 .9-4.6-.6-6.3zm-9.4 11.2c-1-.1-2-.5-2.7-1.1l.1-.1 4.2-2.4c.2-.1.3-.3.3-.6v-5.9l1.8 1c.1 0 .2.1.2.2v4.9c0 2.1-1.7 3.9-3.9 4zm-8.6-3.7c-.5-.8-.7-1.7-.5-2.6l.1.1 4.2 2.4c.2.1.5.1.7 0l5.1-2.9v2c0 .1 0 .2-.1.2l-4.3 2.5c-1.8 1.1-4.1.5-5.2-1.7zm-1-7.4c.1-.9.6-1.7 1.3-2.3v5.1c0 .2.1.5.4.6l5.1 2.9-1.8 1c-.1.1-.2.1-.2 0L5.3 14c-1.8-1-2.4-3.3-1.9-5.3zm15.6 1.9l-5.1-2.9 1.8-1c.1 0 .2 0 .2.1l4.3 2.5c1.8 1 2.4 3.3 1.9 5.3-.5.8-1.2 1.5-2.1 1.9V12.1c.1-.2-.1-.5-.4-.6zm1.8-2.7l-.1-.1-4.2-2.4c-.2-.1-.5-.1-.7 0l-5.1 2.9V6.1c0-.1 0-.2.1-.2l4.3-2.5c1.8-1.1 4.1-.5 5.2 1.7.5.8.7 1.7.5 2.6zM7.3 11.3l-1.8-1c-.1 0-.2-.1-.2-.2V5.2c0-2.1 1.7-3.9 3.9-4 .9.1 1.8.4 2.5 1l-.1.1-4.2 2.4c-.2.1-.3.3-.3.6v5zm1.9-1.5l1.4-1.4 1.4 1.4v2l-1.4 1.4-1.4-1.4z"/>
              </svg>
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
        <div className="bg-gradient-to-b from-purple-50/30 to-white/50 dark:from-neutral-900/50 dark:to-neutral-950/50 border border-purple-100/40 dark:border-neutral-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
          <div className="space-y-2">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              UI/UX Design
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Deliver seamless user journeys with designs that convert, delight, and scale.
            </p>
          </div>

          {/* Animation Viewport */}
          <div className="relative w-full h-[280px] rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30 border border-neutral-100/70 dark:border-neutral-800/60 overflow-hidden flex flex-col items-center justify-between p-6">
            
            {/* Toggle switch */}
            <div className="relative flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-full w-48 shadow-inner z-10">
              <motion.div
                className="absolute inset-y-1 bg-white dark:bg-neutral-700 rounded-full shadow-md z-0"
                layoutId="uiux-active-toggle"
                animate={{
                  x: uiuxState === 'before' ? 0 : 88,
                  width: 90
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button 
                onClick={() => setUiuxState('before')}
                className={cn(
                  "relative z-10 flex-1 py-1 text-xs font-semibold rounded-full transition-colors font-jakarta",
                  uiuxState === 'before' ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                )}
              >
                Before
              </button>
              <button 
                onClick={() => setUiuxState('after')}
                className={cn(
                  "relative z-10 flex-1 py-1 text-xs font-semibold rounded-full transition-colors font-jakarta",
                  uiuxState === 'after' ? "text-neutral-900 dark:text-white" : "text-neutral-400"
                )}
              >
                After
              </button>
            </div>

            {/* Dynamic Interactive Metrics layout */}
            <div className="relative w-full flex-1 flex items-end justify-center gap-6 pt-4">
              
              {/* Bar 1: Growth */}
              <div className="flex flex-col items-center gap-2 relative w-16">
                <motion.div 
                  initial={{ height: "30px" }}
                  animate={{
                    height: uiuxState === 'after' ? "158px" : "30px",
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="w-4 rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500 shadow-md"
                />
                
                {/* Floating pill badge */}
                <motion.div 
                  animate={{
                    y: uiuxState === 'after' ? -170 : -42
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute whitespace-nowrap bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-lg px-2.5 py-1 rounded-lg text-[10px] font-bold font-jakarta text-neutral-800 dark:text-neutral-100"
                >
                  {uiuxState === 'after' ? "Growth +250%" : "Growth +10%"}
                </motion.div>
              </div>

              {/* Bar 2: Efficiency */}
              <div className="flex flex-col items-center gap-2 relative w-16">
                <motion.div 
                  initial={{ height: "50px" }}
                  animate={{
                    height: uiuxState === 'after' ? "181px" : "50px",
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="w-4 rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500 shadow-md"
                />
                
                {/* Floating pill badge */}
                <motion.div 
                  animate={{
                    y: uiuxState === 'after' ? -193 : -62
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute whitespace-nowrap bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-lg px-2.5 py-1 rounded-lg text-[10px] font-bold font-jakarta text-neutral-800 dark:text-neutral-100"
                >
                  {uiuxState === 'after' ? "Efficiency +200%" : "Efficiency +15%"}
                </motion.div>
              </div>

              {/* Bar 3: Cost */}
              <div className="flex flex-col items-center gap-2 relative w-16">
                <motion.div 
                  initial={{ height: "190px" }}
                  animate={{
                    height: uiuxState === 'after' ? "10px" : "190px",
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={cn(
                    "w-4 rounded-t-lg shadow-md transition-colors duration-300",
                    uiuxState === 'after' ? "bg-emerald-500" : "bg-red-500"
                  )}
                />
                
                {/* Floating pill badge */}
                <motion.div 
                  animate={{
                    y: uiuxState === 'after' ? -22 : -202
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute whitespace-nowrap bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-lg px-2.5 py-1 rounded-lg text-[10px] font-bold font-jakarta text-neutral-800 dark:text-neutral-100"
                >
                  {uiuxState === 'after' ? "Cost -100%" : "Cost +150%"}
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Card 4: Web and App Development (3D-like Folder Animation) */}
        <div className="bg-gradient-to-b from-purple-50/30 to-white/50 dark:from-neutral-900/50 dark:to-neutral-950/50 border border-purple-100/40 dark:border-neutral-800/80 rounded-3xl p-8 shadow-xl flex flex-col justify-between gap-6 min-h-[460px]">
          <div className="space-y-2">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Web and App Development
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              From concept to launch — we create intelligent, high-performing web and mobile apps.
            </p>
          </div>

          {/* Animation Viewport */}
          <motion.div 
            whileHover="hover"
            className="relative w-full h-[280px] rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/30 border border-neutral-100/70 dark:border-neutral-800/60 overflow-hidden flex flex-col items-center justify-center p-6"
          >
            
            {/* Layered Folder Graphic */}
            <div className="relative w-48 h-36 flex items-end">
              
              {/* Back Tab of Folder */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-neutral-200/80 dark:bg-neutral-800/80 rounded-2xl border border-neutral-300/40 dark:border-neutral-700/40 shadow-inner z-0 flex items-start p-4">
                <div className="w-10 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-t-md absolute left-4 -top-3" />
              </div>

              {/* Shifting files/sheets inside (Slide up on parent hover) */}
              <motion.div 
                className="absolute inset-x-4 bottom-2 h-28 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-md z-10 flex flex-col p-3 gap-2 overflow-hidden"
                variants={{
                  hover: { y: -24 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center gap-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                  <div className="size-2.5 rounded-full bg-red-400" />
                  <div className="size-2.5 rounded-full bg-yellow-400" />
                  <div className="size-2.5 rounded-full bg-green-400" />
                </div>
                <div className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 space-y-1 select-none">
                  <p className="text-violet-500">const app = () =&gt; &#123;</p>
                  <p className="pl-3">return &lt;Portfolio /&gt;;</p>
                  <p className="text-violet-500">&#125;;</p>
                </div>
              </motion.div>

              {/* Front of Folder with Diagonal cut design */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-neutral-100 dark:bg-neutral-700 rounded-2xl border border-neutral-200/50 dark:border-neutral-600/50 shadow-md z-20" />
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

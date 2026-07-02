"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HomeIcon, MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden px-6 py-24 select-none">
      
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 bg-purple-500 animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-20 bg-sky-500 animate-[pulse_10s_infinite_delayed]" />
      </div>

      {/* Futuristic Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      {/* Main Card Content */}
      <div className="max-w-md w-full text-center space-y-8 z-10">
        
        {/* Glow Number Banner */}
        <div className="relative inline-block">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[120px] sm:text-[150px] font-black font-jakarta tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 select-none drop-shadow-[0_15px_15px_rgba(168,85,247,0.15)]"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 blur-[60px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-60 -z-10 pointer-events-none" />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-jakarta">
            Lost in Space?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-jakarta">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track to exploring premium digital experiences.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-300 select-none group"
          >
            <HomeIcon className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            Return Home
          </Link>
          <a
            href="https://github.com/theshubhamgundu"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-300 select-none group"
          >
            Explore Projects
            <MoveRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}

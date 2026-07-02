"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service or console
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden px-6 py-24 select-none">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-25 bg-red-500/20 animate-pulse" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      {/* Content */}
      <div className="max-w-md w-full text-center space-y-8 z-10">
        
        {/* Glow Error Icon */}
        <div className="relative inline-flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
          >
            <AlertCircle className="size-16" />
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-jakarta">
            Something went wrong!
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-jakarta">
            An unexpected error occurred while rendering this page. Let's try reloading or head back home.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300 select-none group"
          >
            <RefreshCw className="size-4 shrink-0 transition-transform group-hover:rotate-45" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-300 select-none"
          >
            Return Home
          </a>
        </motion.div>

      </div>
    </div>
  );
}

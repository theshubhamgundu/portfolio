import React from 'react';
import { cn } from '@/lib/cn';
import { Marquee } from '@/app/(home)/marquee';

export function CrossingRibbons() {
  const words = [
    "IMMERSIVE",
    "PROTECTED",
    "DEPENDABLE",
    "CAPTIVATING",
    "USER-FRIENDLY",
    "ADAPTIVE",
    "FLUID",
    "FUTURE-PROOF",
    "SEO-READY"
  ];

  return (
    <div className="relative w-full h-[100px] sm:h-[120px] md:h-[140px] overflow-hidden flex items-center justify-center my-1 md:my-2 select-none bg-transparent">
      {/* Ribbon 1: Back ribbon, slanted downwards, dark red */}
      <div className="absolute top-1/2 -translate-y-1/2 w-[125%] min-w-[1600px] h-9 md:h-11 bg-[#991b1b] shadow-lg border-y border-red-950/20 flex items-center rotate-[-3deg] z-0 origin-center">
        <Marquee className="[--duration:30s] [--gap:3rem]" pauseOnHover={false}>
          {words.map((word, idx) => (
            <div key={idx} className="flex items-center gap-12 text-white font-semibold tracking-widest text-xs sm:text-sm md:text-base whitespace-nowrap">
              <span>{word}</span>
              <span className="text-white/60 text-base">✦</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Ribbon 2: Front ribbon, slanted upwards, bright red */}
      <div className="absolute top-1/2 -translate-y-1/2 w-[125%] min-w-[1600px] h-9 md:h-11 bg-red-600 shadow-2xl border-y border-red-500/20 flex items-center rotate-[3deg] z-10 origin-center">
        <Marquee className="[--duration:25s] [--gap:3rem]" reverse pauseOnHover={false}>
          {words.map((word, idx) => (
            <div key={idx} className="flex items-center gap-12 text-white font-semibold tracking-widest text-xs sm:text-sm md:text-base whitespace-nowrap">
              <span>{word}</span>
              <span className="text-white/60 text-base">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

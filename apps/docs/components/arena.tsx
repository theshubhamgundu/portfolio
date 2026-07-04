"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const categories = ["E-Commerce", "Events", "Products", "Services", "SaaS"];

export function Arena() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCategoryIndex((prev) => (prev + 1) % categories.length);
        setFade(true);
      }, 200);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const row1 = [
    { title: "Samika", url: "https://samika.co/", image: "/client-screenshots/samika.png" },
    { title: "Karmara", url: "https://karmara.co/", image: "/client-screenshots/karmara.png" },
    { title: "Evaara Fragrance", url: "https://evaarafragrance.com/", image: "/client-screenshots/evara.png" },
    { title: "Zyva Millets", url: "https://www.zyvamillets.com/", image: "/client-screenshots/zyva.png" },
    { title: "Monalro", url: "https://mmonalro.com/", image: "/client-screenshots/monalro.png" },
    { title: "Gigi Energy", url: "https://gigienergy.com/", image: "/client-screenshots/gigi.png" },
    { title: "SA Caterers", url: "https://www.sacaterers.in/", image: "/client-screenshots/sa_cateers.png" },
    { title: "The Veg Venjan", url: "https://thevegvenjan.in/", image: "/client-screenshots/veg_venjan.png" },
    { title: "Plush Livings", url: "https://plushlivings.com/", image: "/client-screenshots/plush_livings.png" },
    { title: "Auork", url: "https://auork.com/", image: "/client-screenshots/aurok.png" }
  ];

  const row2 = [
    { title: "Makpop", url: "https://makpop.com/", image: "/client-screenshots/makpop.png" },
    { title: "Varde", url: "https://varde.in/", image: "/client-screenshots/varde.png" },
    { title: "Barky Brews", url: "https://www.barkybrews.com/", image: "/client-screenshots/barky_bews.png" },
    { title: "Swasti Botanicals", url: "https://www.swastibotanicals.com/", image: "/client-screenshots/swasti.png" },
    { title: "Feel Ambrosia", url: "https://feelambrosia.com/", image: "/client-screenshots/ambrosia.png" },
    { title: "Bakelette", url: "https://bakelette.in/", image: "/client-screenshots/bekelette.png" },
    { title: "Online Land Registry", url: "https://www.onlinelandregistry.uk/", image: "/client-screenshots/online_land_registry.png" },
    { title: "Land Registry Transfers", url: "https://www.landregistrytransfers.com/", image: "/client-screenshots/LRT.png" },
    { title: "Urban Miles", url: "https://urbanmiles-hyd.vercel.app/", image: "/client-screenshots/urban_miles.png" },
    { title: "NutriCrunch", url: "https://leena-nutricrunch.vercel.app/", image: "/client-screenshots/nutricrunch.png" }
  ];

  const row3 = [
    { title: "Quake Arena", url: "https://www.quakearena.in/", image: "/client-screenshots/quake.png" },
    { title: "ReelShoot", url: "https://itsreelshoot.in/", image: "/client-screenshots/reelshoot.png" },
    { title: "Eventry", url: "https://itsreelshoot.in/", image: "/client-screenshots/EVENTRY.png" },
    { title: "Monks", url: "https://karmara.co/", image: "/client-screenshots/MONKS.png" },
    { title: "ReelGod", url: "https://itsreelshoot.in/", image: "/client-screenshots/REELGOD.png" },
    { title: "Confab", url: "https://samika.co/", image: "/client-screenshots/confab.png" },
    { title: "Memory Cards", url: "https://feelambrosia.com/", image: "/client-screenshots/memory.png" },
    { title: "Sarang", url: "https://feelambrosia.com/", image: "/client-screenshots/sarang.png" },
    { title: "Vansh", url: "https://feelambrosia.com/", image: "/client-screenshots/vansh.png" },
    { title: "House of Peacock", url: "https://houseofpeacock.in/", image: "/client-screenshots/hop.png" }
  ];

  const renderCard = (item: { title: string; url: string; image: string }, idx: number) => (
    <div
      key={idx}
      className="relative w-[240px] md:w-[440px] h-[120px] md:h-[240px] shrink-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/50 shadow-lg rounded-2xl group cursor-default block"
    >
      {/* Fallback card placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900 z-0 select-none">
        <div className="size-9 rounded-full bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[11px] font-extrabold text-neutral-600 dark:text-neutral-300 shadow-sm">
          {item.title[0]}
        </div>
        <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 mt-2 tracking-wider font-mono uppercase">
          {item.title}
        </span>
      </div>

      {/* Optimized Next.js image with lazy loading and sizing */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 240px, 440px"
        loading="lazy"
        className="object-cover object-top opacity-100 select-none pointer-events-none z-10"
      />
    </div>
  );

  return (
    <div className="mt-6 md:mt-8 text-center animate-[fadeIn_0.5s_ease-out] w-full overflow-hidden">
      <div className="space-y-4 mb-16 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 select-none">
          <span>✦ SHOWCASE</span>
        </div>
        <h2 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          My Arena
        </h2>
        <p className="font-jakarta text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Explore the live websites and digital experiences built for my clients.
        </p>
      </div>

      {/* Relume-style full-viewport container with subtle gradient background */}
      <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-sky-500/[0.03] via-purple-500/[0.05] to-pink-500/[0.03] dark:from-sky-500/[0.01] dark:via-purple-500/[0.03] dark:to-pink-500/[0.01]">
        
        {/* Sliders Container - Rotated to create the "cross/diagonal" effect */}
        <div className="flex flex-col gap-6 md:gap-8 overflow-visible w-[150vw] md:w-[120vw] relative z-0 -rotate-12 scale-110 pointer-events-none">
          
          {/* Row 1: slides left */}
          <div className="flex flex-nowrap animate-marquee-left gap-6 md:gap-8">
            {[...row1, ...row1, ...row1].map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Row 2: slides right */}
          <div className="flex flex-nowrap animate-marquee-right gap-6 md:gap-8 ml-[-10vw]">
            {[...row2, ...row2, ...row2].map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Row 3: slides left */}
          <div className="flex flex-nowrap animate-marquee-left gap-6 md:gap-8">
            {[...row3, ...row3, ...row3].map((item, idx) => renderCard(item, idx))}
          </div>

        </div>

        {/* Center Floating Badge/Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <a
            href="https://github.com/theshubhamgundu"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-950 dark:bg-neutral-900 border border-neutral-800/80 text-white font-bold font-jakarta text-xs sm:text-sm px-6 py-4 rounded-full flex items-center gap-3 hover:bg-neutral-900 dark:hover:bg-neutral-850 shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap backdrop-blur-xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>80+ Startup Projects Shipped</span>
            <span className="text-neutral-700 dark:text-neutral-500">|</span>
            <span className={`text-pink-400 font-extrabold transition-opacity duration-200 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {categories[categoryIndex]} Projects →
            </span>
          </a>
        </div>

      </div>
    </div>
  );
}

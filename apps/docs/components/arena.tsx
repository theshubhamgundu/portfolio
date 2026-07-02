"use client";

import Image from "next/image";

export function Arena() {
  const items = [
    { title: "Samika", url: "https://samika.co/", image: "/client-screenshots/samika.png" },
    { title: "Karmara", url: "https://karmara.co/", image: "/client-screenshots/karmara.png" },
    { title: "Evaara Fragrance", url: "https://evaarafragrance.com/", image: "/client-screenshots/evara.png" },
    { title: "Zyva Millets", url: "https://www.zyvamillets.com/", image: "/client-screenshots/zyva.png" },
    { title: "Monalro", url: "https://mmonalro.com/", image: "/client-screenshots/monalro.png" },
    { title: "Gigi Energy", url: "https://gigienergy.com/", image: "/client-screenshots/gigi.png" },
    { title: "SA Caterers", url: "https://www.sacaterers.in/", image: "/client-screenshots/sa_cateers.png" },
    { title: "The Veg Venjan", url: "https://thevegvenjan.in/", image: "/client-screenshots/veg_venjan.png" },
    { title: "Plush Livings", url: "https://plushlivings.com/", image: "/client-screenshots/plush_livings.png" },
    { title: "Auork", url: "https://auork.com/", image: "/client-screenshots/auork.png" },
    { title: "Makpop", url: "https://makpop.com/", image: "/client-screenshots/makpop.png" },
    { title: "Varde", url: "https://varde.in/", image: "/client-screenshots/varde.png" },
    { title: "Barky Brews", url: "https://www.barkybrews.com/", image: "/client-screenshots/barky_bews.png" },
    { title: "Swasti Botanicals", url: "https://www.swastibotanicals.com/", image: "/client-screenshots/swasti.png" },
    { title: "Feel Ambrosia", url: "https://feelambrosia.com/", image: "/client-screenshots/ambrosia.png" },
    { title: "Bakelette", url: "https://bakelette.in/", image: "/client-screenshots/bekelette.png" },
    { title: "Online Land Registry", url: "https://www.onlinelandregistry.uk/", image: "/client-screenshots/online_land_registry.png" },
    { title: "Land Registry Transfers", url: "https://www.landregistrytransfers.com/", image: "/client-screenshots/LRT.png" },
    { title: "Urban Miles", url: "https://urbanmiles-hyd.vercel.app/", image: "/client-screenshots/urban_miles.png" },
    { title: "NutriCrunch", url: "https://leena-nutricrunch.vercel.app/", image: "/client-screenshots/nutricrunch.png" },
    { title: "Quake Arena", url: "https://www.quakearena.in/", image: "/client-screenshots/quake.png" },
    { title: "ReelShoot", url: "https://itsreelshoot.in/", image: "/client-screenshots/reelshoot.png" },
    { title: "Eventry", url: "https://itsreelshoot.in/", image: "/client-screenshots/EVENTRY.png" },
    { title: "Monks", url: "https://karmara.co/", image: "/client-screenshots/MONKS.png" },
    { title: "ReelGod", url: "https://itsreelshoot.in/", image: "/client-screenshots/REELGOD.png" },
    { title: "Confab", url: "https://samika.co/", image: "/client-screenshots/confab.png" },
    { title: "Memory Cards", url: "https://feelambrosia.com/", image: "/client-screenshots/memory.png" },
    { title: "Sarang", url: "https://feelambrosia.com/", image: "/client-screenshots/sarang.png" },
    { title: "Vansh", url: "https://feelambrosia.com/", image: "/client-screenshots/vansh.png" },
    { title: "Ixton Multimedia", url: "https://ixtonmultimedia.com/", image: "/client-screenshots/ixton_multimedia.png" }
  ];

  return (
    <div className="col-span-full p-8 md:p-12 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/30 bg-gradient-to-br from-sky-100/30 via-purple-100/20 to-sky-100/30 dark:from-sky-950/15 dark:via-purple-950/10 dark:to-sky-950/15 shadow-sm mt-8 text-left animate-[fadeIn_0.5s_ease-out]">
      <div className="space-y-4 mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 select-none">
          <span>✦ SHOWCASE</span>
        </div>
        <h2 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          My Arena
        </h2>
        <p className="font-jakarta text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Hover over each screenshot below to view the live client site in full color, and click to visit.
        </p>
      </div>

      {/* Relume style grid with floating badge */}
      <div className="relative w-full max-w-6xl mx-auto rounded-[2rem] overflow-hidden border border-neutral-200/50 dark:border-neutral-850/50 bg-neutral-950">
        
        {/* Tiled Grid (6 columns on large desktops, 5 on lg, 4 on md, 3 on sm, 2 on xs) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 p-2.5">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/50 shadow-md group cursor-pointer block"
              title={`Visit ${item.title}`}
            >
              {/* Fallback card placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-neutral-900 z-0 select-none">
                <div className="size-9 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-800 flex items-center justify-center text-[11px] font-extrabold text-neutral-355 shadow-inner group-hover:text-white transition-colors">
                  {item.title[0]}
                </div>
                <span className="text-[9px] font-bold text-neutral-500 mt-2 tracking-wider font-mono uppercase group-hover:text-neutral-400 transition-colors">
                  {item.title}
                </span>
              </div>

              {/* Optimized Next.js local image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-top opacity-35 dark:opacity-20 group-hover:opacity-100 group-hover:scale-102 transition-all duration-555 ease-in-out select-none pointer-events-none z-10"
              />

              {/* Tooltip Overlay */}
              <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/90 backdrop-blur-sm border border-neutral-800 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-between z-20">
                <span className="text-[9px] font-bold text-white font-jakarta truncate max-w-[80%]">
                  {item.title}
                </span>
                <svg className="size-3 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Center Floating Badge/Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 shadow-2xl hover:scale-103 transition-transform duration-300">
            <a
              href="https://github.com/theshubhamgundu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-extrabold font-jakarta text-xs sm:text-sm px-6 py-3.5 rounded-full flex items-center gap-1.5 hover:bg-neutral-50 transition-colors shadow-inner whitespace-nowrap"
            >
              <span className="text-pink-500">30+</span> Client Websites Built <span className="font-light ml-1">→</span>
            </a>
          </div>
        </div>

        {/* Dark overlay to fade back row items under badge */}
        <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none z-10" />
      </div>
    </div>
  );
}

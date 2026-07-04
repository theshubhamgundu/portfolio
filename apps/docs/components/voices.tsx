"use client";

import React from "react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  type: "ecommerce" | "agency" | "creative" | "database";
};

const getWatermarkIcon = (type: string) => {
  switch (type) {
    case "ecommerce":
      return (
        <svg className="size-7 text-neutral-400 dark:text-neutral-600 opacity-20 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "agency":
      return (
        <svg className="size-7 text-neutral-400 dark:text-neutral-650 opacity-20 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "database":
      return (
        <svg className="size-7 text-neutral-400 dark:text-neutral-650 opacity-20 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case "creative":
    default:
      return (
        <svg className="size-7 text-neutral-400 dark:text-neutral-650 opacity-20 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
  }
};

const row1: Testimonial[] = [
  {
    name: "Ajay Reddy",
    role: "Founder, Samika",
    avatar: "/client-avatars/Ajay_Reddy.webp",
    quote: "SHUBHAM CRAFTED A GORGEOUS PORTFOLIO WEBSITE FOR SAMIKA. THE USER INTERACTION AND SLIDERS ARE BREATHTAKING.",
    type: "creative"
  },
  {
    name: "Amulya",
    role: "Co-Founder, Karmara",
    avatar: "/client-avatars/Amulaya.webp",
    quote: "THE KARMARA BRAND PLATFORM IS EXTREMELY STUNNING. SHUBHAM BUILT A FAST, CLEAN WEB EXPERIENCE.",
    type: "creative"
  },
  {
    name: "Bhargavi",
    role: "Co-Founder, Evaara Fragrance",
    avatar: "/client-avatars/Bhargavi.webp",
    quote: "THE E-COMMERCE STORE FOR EVAARA FRAGRANCE ROCKS! SHUBHAM CODED AN INTUITIVE CHECKOUT AND GORGEOUS PRODUCT DISPLAY.",
    type: "ecommerce"
  },
  {
    name: "Avinash",
    role: "Director, Zyva Millets",
    avatar: "/client-avatars/Avinash.webp",
    quote: "WORKING WITH SHUBHAM TO BUILD ZYVA MILLETS WAS INCREDIBLY SMOOTH. THE WEBSITE SHIPPED WELL ON-TIME.",
    type: "ecommerce"
  },
  {
    name: "Sai Kiran",
    role: "Founder, Monalro",
    avatar: "/client-avatars/Sai Kiran.webp",
    quote: "MONALRO WEB STYLING IS SO CRISP AND MODERN. SHUBHAM DELIVERED TOP-TIER PERFORMANCE ABILITY.",
    type: "creative"
  },
  {
    name: "Harshini Katta",
    role: "Operations Head, Gigi Energy",
    avatar: "/client-avatars/Harshini katta.webp",
    quote: "SHUBHAM SIMPLIFIED THE GIGI ENERGY DATA FLOWS AND CREATED A WONDERFUL VISUAL EXPERIENCE.",
    type: "agency"
  },
  {
    name: "Shridhar Reddy",
    role: "Founder, SA Caterers",
    avatar: "/client-avatars/Shridhar_Reddy.webp",
    quote: "SHUBHAM DELIVERED A FLAWLESS WEBSITE FOR SA CATERERS. THE BOOKING ENGINE SHARPLY BOOSTED OUR WEDDING EVENT ENQUIRIES.",
    type: "agency"
  },
  {
    name: "Jalender",
    role: "Owner, The Veg Venjan",
    avatar: "/client-avatars/Jalender.webp",
    quote: "SHUBHAM'S DESIGN AND SPEED FOR THE VEG VENJAN ONLINE PLATFORM HAS HELPED US CAPTURE HUBS OF NEW LEADS.",
    type: "creative"
  },
  {
    name: "Pavani",
    role: "Creative Director, Plush Livings",
    avatar: "/client-avatars/Pavani.webp",
    quote: "THE PLUSH LIVINGS INTERIOR CATALOGUE IS HIGHLY RESPONSIVE AND IMMERSIVE. CLIENTS LOVE THE FLOW.",
    type: "creative"
  },
  {
    name: "Prafful",
    role: "CEO, Auork",
    avatar: "/client-avatars/Prafful.webp",
    quote: "SHUBHAM CODED THE AUORK AGENCY LANDING PAGE WITH AMAZING PIXEL PERFECTION AND CREATIVE MOTION ACCENTS.",
    type: "agency"
  },
  {
    name: "Suma",
    role: "Product Lead, Makpop",
    avatar: "/client-avatars/Suma.webp",
    quote: "THE MAKPOP INTERACTIVE WEB PAGES RUN FLUIDLY. SHUBHAM'S FRONTEND WORK EXCEEDED ALL OUR EXPECTATIONS.",
    type: "agency"
  },
  {
    name: "Alekhya",
    role: "Founder, Varde",
    avatar: "/client-avatars/alekhya.jpg",
    quote: "VARDE PORTAL INTEGRATION WAS SHIPPED WITH OUTSTANDING CODE QUALITY. STABLE, SECURE, AND VISUALLY CLEAN.",
    type: "agency"
  },
  {
    name: "Arpit Thakur",
    role: "Co-Founder, Barky Brews",
    avatar: "/client-avatars/arpit_thakur.jpeg",
    quote: "OUR PET SHOP AND STORE FRONT AT BARKY BREWS GOT AN AMAZING DESIGN UPGRADE. CUSTOMER FEEDBACK IS HIGHLY POSITIVE.",
    type: "ecommerce"
  },
  {
    name: "Manish",
    role: "Founder, Swasti Botanicals",
    avatar: "/client-avatars/Handsome boy.jpeg",
    quote: "SWASTI BOTANICALS WEB STORE FRONT IS SO FRESH AND ENERGETIC. HIGHLY CONVERTING E-COMMERCE PIPELINE.",
    type: "ecommerce"
  },
  {
    name: "Navaan Sandhu",
    role: "Director, Feel Ambrosia",
    avatar: "/client-avatars/Navaan Sandhu.jpeg",
    quote: "SHUBHAM BUILT AN ELEGANT USER FLOW FOR FEEL AMBROSIA. HIGH DEFINITION IMAGERY STAYS EXTREMELY SHARP.",
    type: "creative"
  }
];

const row2: Testimonial[] = [
  {
    name: "Rahul",
    role: "Head Pastry Chef, Bakelette",
    avatar: "/client-avatars/PIN RAHUL.jpeg",
    quote: "THE BAKELETTE MENU DISPLAY AND PRE-ORDER MECHANICS WORK FLAWLESSLY. ORDER MANAGEMENT BECAME TRIVIAL.",
    type: "ecommerce"
  },
  {
    name: "Diana Croft",
    role: "Managing Director, OLR UK",
    avatar: "/client-avatars/download.jpeg",
    quote: "SHUBHAM DIGITIZED OUR LAND DOCUMENTATION SEARCH PORTAL. SECURE, FAST, AND MEETS ALL UK REGULATORY COMPLIANCE.",
    type: "database"
  },
  {
    name: "James Watson",
    role: "Legal Tech Lead, LRT",
    avatar: "/client-avatars/muhammad-shakir-Waj19CkQl_0-unsplash.jpg",
    quote: "THE LRT TRANSFER FLOW IS BULLETPROOF. APPLICANTS CAN CONVENIENTLY FILE DEEDS WITH ZERO LATENCY.",
    type: "database"
  },
  {
    name: "Nikhil Chenna",
    role: "Lead Developer, Urban Miles",
    avatar: "/client-avatars/download (2).jpeg",
    quote: "I WORKED CLOSELY WITH SHUBHAM ON URBAN MILES. HIS CLEAN API INTEGRATIONS SIMPLIFIED VEHICLE BOOKING DISPATCH.",
    type: "agency"
  },
  {
    name: "Leena Patel",
    role: "Founder, NutriCrunch",
    avatar: "/client-avatars/1089730441255161747.jpeg",
    quote: "THE NUTRICRUNCH HEALTH RECIPE DASHBOARD DESIGN EXUDES LUXURY. SHUBHAM OPTIMIZED PAGE LOADS MAGNIFICENTLY.",
    type: "creative"
  },
  {
    name: "Sai Teja",
    role: "Organizer, Quake Arena",
    avatar: "/client-avatars/637189047323740467.jpeg",
    quote: "SHUBHAM CODED THE LIVE BRACKET SCRAPER AND TOURNAMENT HUD INTERFACE. GAMERS LOVE THE REAL-TIME UPDATES.",
    type: "creative"
  },
  {
    name: "Madhavi",
    role: "Co-Founder, ReelShoot",
    avatar: "/client-avatars/694046992621163517.jpeg",
    quote: "REELSHOOT VIDEO PORTFOLIO GRIDS LOAD INSTANTLY. MEDIA RENDERS AT MAXIMUM HIGHEST HD FIDELITY.",
    type: "creative"
  },
  {
    name: "Swetha Reddy",
    role: "Event Planner, Eventry",
    avatar: "/client-avatars/747386500702446193.jpeg",
    quote: "THE EVENTRY TICKET MANAGEMENT AND QR SCANNER WORKED LIKE A CHARM AT COLLABORATION SCALES.",
    type: "agency"
  },
  {
    name: "Karthik K.",
    role: "Tech Architect, Monks Agency",
    avatar: "/client-avatars/864268984770176167.jpeg",
    quote: "SHUBHAM WAS OUR GO-TO FRONTEND CONTRACTOR FOR MONKS. HIS ATTENTION TO COMPONENT ROBUSTNESS IS OUTSTANDING.",
    type: "agency"
  },
  {
    name: "Shreya G.",
    role: "Director, ReelGod Media",
    avatar: "/client-avatars/834573374738196754.jpeg",
    quote: "REELGOD EXPERIENTIAL MEDIA STREAMING PAGE IS UNREAL. HIGH SPEED PERFORMANCE AND SLEEK DARK LAYOUTS.",
    type: "creative"
  },
  {
    name: "Venkat Rao",
    role: "Operations, Confab",
    avatar: "/client-avatars/976718237957021088.jpeg",
    quote: "SHUBHAM DEVELOPED THE CLIENT CHAT HUD INTERFACE. RESPONSIVE DESIGN AT ITS ABSOLUTE HIGHEST CALIBER.",
    type: "agency"
  },
  {
    name: "Aditya B.",
    role: "Founder, Memory Cards",
    avatar: "/client-avatars/ali-hadadi-kia-zB1n5JyxXg4-unsplash.jpg",
    quote: "THE INTERACTIVE GAMIFIED STORY CARDS FOR MEMORY ARE AN ABSOLUTE HIT. AMAZING DYNAMIC RENDER WORK.",
    type: "creative"
  },
  {
    name: "Chitra Goud",
    role: "Creative Lead, Sarang Fashion",
    avatar: "/client-avatars/karimov.jpg",
    quote: "SARANG BOUTIQUE HAS A VIBRANT AND STYLISH MOBILE PRESENCE. THE LAYOUT REFLECTS OUR STYLE SYSTEM PERFECTLY.",
    type: "creative"
  },
  {
    name: "Mahesh Babu",
    role: "Event Lead, Vansh Events",
    avatar: "/client-avatars/vansh_guy.jpeg",
    quote: "VANSH ENGAGEMENT HUB SHIPPED IN A FEW DAYS WITH AN EXTREMELY STABLE TICKET CHECK-IN PIPELINE.",
    type: "agency"
  },
  {
    name: "Deepika Goud",
    role: "Founder, House of Peacock",
    avatar: "/client-avatars/pranab-debnath-q4pWxvQktZk-unsplash.jpg",
    quote: "THE DESIGN WORK FOR THE HOUSE OF PEACOCK WEBSITE IS STUNNING. SHUBHAM BUILT A LIGHTNING-FAST GRID INTERFACE.",
    type: "creative"
  }
];

export function Voices() {
  const renderCard = (item: Testimonial, idx: number) => (
    <div
      key={idx}
      className="w-[300px] md:w-[380px] shrink-0 p-4 sm:p-5 bg-neutral-50/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/40 rounded-2xl flex flex-col gap-4 text-left shadow-sm select-none"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="size-10 sm:size-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-800 shadow-inner"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-jakarta font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100 truncate">
              {item.name}
            </span>
            <span className="font-jakarta text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate uppercase tracking-wider font-mono">
              {item.role}
            </span>
          </div>
        </div>
        {getWatermarkIcon(item.type)}
      </div>

      {/* Quote Box */}
      <div className="bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850/50 rounded-xl p-4 shadow-sm flex items-center h-full min-h-[90px]">
        <p className="font-jakarta font-bold text-neutral-800 dark:text-neutral-200 text-[11px] sm:text-[12.5px] tracking-tight leading-relaxed uppercase">
          "{item.quote}"
        </p>
      </div>
    </div>
  );

  return (
    <div className="col-span-full mt-8 text-center animate-[fadeIn_0.5s_ease-out] w-full">
      <div className="space-y-4 mb-16 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 select-none">
          <span>✦ WHAT OTHERS SAY</span>
        </div>
        <h2 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          The Voices <span className="font-serif italic font-light bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent ml-1">Behind</span>
        </h2>
      </div>

      {/* Marquee slider container */}
      <div className="relative w-full overflow-hidden bg-transparent py-4">
        
        {/* Sliders Container */}
        <div className="flex flex-col gap-4 overflow-hidden w-full relative z-0">
          
          {/* Row 1: slides left */}
          <div className="flex flex-nowrap animate-marquee-left gap-4" style={{ animationDuration: '65s' }}>
            {[...row1, ...row1].map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Row 2: slides right */}
          <div className="flex flex-nowrap animate-marquee-right gap-4" style={{ animationDuration: '65s' }}>
            {[...row2, ...row2].map((item, idx) => renderCard(item, idx))}
          </div>

        </div>
      </div>
    </div>
  );
}

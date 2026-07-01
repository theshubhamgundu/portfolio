"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function CaseStudies() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const cases = [
    {
      title: "BulkBasket",
      shortTitle: "BULKBASKET",
      category: "Wholesale Grocery Platform",
      description: "A bulk grocery ordering platform that helps large families save more through quantity-based pricing, smart discounts, scheduled deliveries, and personalized reorder templates.",
      highlights: [
        "Quantity-based dynamic pricing for volume orders",
        "Personalized reorder templates and scheduled deliveries",
        "Integrated Stripe payments and multi-recipient tracking"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase", "Stripe"],
      image: "/banners/bulk_basket.png",
      color: "from-sky-500/25 to-cyan-500/10 dark:from-sky-950/40 dark:to-cyan-950/20",
      borderColor: "border-sky-500/40 dark:border-sky-400/20",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
      icon: (
        <svg className="size-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "Happeno",
      shortTitle: "HAPPENO",
      category: "Hyperlocal Discovery Platform",
      description: "A location-first platform that helps users discover live deals, events, gigs, restaurants, activities, and updates happening nearby through a real-time personalized feed.",
      highlights: [
        "PostGIS geospatial queries for nearby discovery",
        "Interactive map routing using Mapbox integration",
        "Progressive Web App (PWA) supporting offline access"
      ],
      tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "PostGIS", "Mapbox", "PWA"],
      image: "/banners/happeno.png",
      color: "from-purple-500/25 to-indigo-500/10 dark:from-purple-950/40 dark:to-indigo-950/20",
      borderColor: "border-purple-500/40 dark:border-purple-400/20",
      badgeColor: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      icon: (
        <svg className="size-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "GatePass",
      shortTitle: "GATEPASS",
      category: "Visitor Access Control",
      description: "A digital visitor and parking management solution for residential societies featuring visitor approvals, digital gate passes, parking allocation, and real-time access monitoring.",
      highlights: [
        "Instant QR code secure pass generation",
        "Real-time resident approval notification pipeline",
        "Parking spot allocation matching and optimization engine"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase", "QR Code"],
      image: "/banners/gatepass.png",
      color: "from-rose-500/25 to-pink-500/10 dark:from-rose-950/40 dark:to-pink-950/20",
      borderColor: "border-rose-500/40 dark:border-rose-400/20",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      icon: (
        <svg className="size-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      title: "ChargeMap Live",
      shortTitle: "CHARGEMAP",
      category: "Smart EV Management",
      description: "A real-time EV charging platform that enables users to locate available charging stations, reserve charging slots, monitor charger health, and optimize charging availability.",
      highlights: [
        "Real-time station slot booking and queue management",
        "WebSockets active charger health monitoring",
        "Interactive navigation mapping with Maps API integration"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Maps API", "WebSockets"],
      image: "/banners/charge_map.png",
      color: "from-cyan-500/25 to-teal-500/10 dark:from-cyan-950/40 dark:to-teal-950/20",
      borderColor: "border-cyan-500/40 dark:border-cyan-400/20",
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      icon: (
        <svg className="size-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "CampusNet",
      shortTitle: "CAMPUSNET",
      category: "Offline Communication Network",
      description: "A secure LAN-based communication platform enabling offline messaging, file sharing, announcements, and collaboration without requiring internet connectivity.",
      highlights: [
        "LAN peer detection using WebSocket connections",
        "Offline synchronization with high-speed local file transfer",
        "SQLite and Hive local database state storage"
      ],
      tech: ["Flutter", "Dart", "Hive", "Material Design", "LAN", "WebSocket", "SQLite"],
      image: "/banners/campus_net.png",
      color: "from-sky-500/25 to-blue-500/10 dark:from-sky-950/40 dark:to-sky-950/20",
      borderColor: "border-sky-500/40 dark:border-sky-400/20",
      badgeColor: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
      icon: (
        <svg className="size-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "TelecomCare AI",
      shortTitle: "TELECOM AI",
      category: "AI Telecom Assistant",
      description: "An intelligent telecom support platform with personalized dashboards, history-aware AI chat, automated voice escalation, and smart customer assistance.",
      highlights: [
        "LangChain history-aware customer service chat flow",
        "ChromaDB semantic search on support documentation",
        "Automated voice call escalation and user dashboard sync"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "LangChain", "ChromaDB", "OpenAI"],
      image: "/banners/telecom_ai.png",
      color: "from-violet-500/25 to-purple-500/10 dark:from-violet-950/40 dark:to-purple-950/20",
      borderColor: "border-violet-500/40 dark:border-violet-400/20",
      badgeColor: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
      icon: (
        <svg className="size-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "CareerCompass AI",
      shortTitle: "CAREER AI",
      category: "AI Career Intelligence",
      description: "AI career guidance platform offering personalized career recommendations, resume analysis, interview preparation, salary insights, and strategic learning roadmaps.",
      highlights: [
        "OpenAI powered interactive resume scoring and feedback",
        "Automated learning roadmap generator based on goals",
        "Salary intelligence modeling using PostgreSQL analytics"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "OpenAI", "ChromaDB", "PostgreSQL"],
      image: "/banners/career_compas_ai.png",
      color: "from-amber-500/25 to-orange-500/10 dark:from-amber-950/40 dark:to-orange-950/20",
      borderColor: "border-amber-500/40 dark:border-amber-400/20",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      icon: (
        <svg className="size-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V5a2 2 0 00-2-2H4a2 2 0 00-2 2v6c0 4.3 1.217 8.317 3.321 11.72M12 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054-.09A13.916 13.916 0 0015 5v6c0 4.3-1.217 8.317-3.321 11.72M13.25 10A1.25 1.25 0 1112 8.75 1.25 1.25 0 0113.25 10z" />
        </svg>
      )
    }
  ];

  const activeCase = cases[expandedIndex];

  return (
    <div className="col-span-full p-8 md:p-12 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/30 bg-gradient-to-br from-sky-100/30 via-purple-100/20 to-sky-100/30 dark:from-sky-950/15 dark:via-purple-950/10 dark:to-sky-950/15 shadow-sm mt-8 text-left">
      <div className="space-y-4 mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 select-none">
          <span>✦ PORTFOLIO</span>
        </div>
        <h2 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          Case Studies
        </h2>
        <p className="font-jakarta text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Hover over each card to view its technical specifications and features.
        </p>
      </div>

      {/* Separate Details Panel Above */}
      <div className={cn(
        "w-full max-w-6xl mx-auto mb-8 px-4 min-h-[220px] lg:min-h-[180px] flex flex-col justify-between border-2 backdrop-blur-md rounded-3xl p-6 md:p-8 transition-all duration-500 shadow-xl relative overflow-hidden bg-white/70 dark:bg-neutral-950/40",
        activeCase.borderColor
      )}>
        
        {/* Dynamic Glow Circles */}
        <div className={cn("absolute -right-24 -bottom-24 size-72 rounded-full blur-[110px] opacity-15 dark:opacity-25 transition-all duration-700 bg-gradient-to-br z-0", activeCase.color)} />
        <div className={cn("absolute -left-24 -top-24 size-72 rounded-full blur-[110px] opacity-10 dark:opacity-15 transition-all duration-700 bg-gradient-to-br z-0", activeCase.color)} />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className={cn("text-[9px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase font-jakarta shadow-sm", activeCase.badgeColor)}>
              ✦ {activeCase.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Title and Description */}
            <div className="lg:col-span-7 space-y-2">
              <h3 className="font-jakarta text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 leading-tight">
                {activeCase.title}
              </h3>
              <p className="font-jakarta text-xs sm:text-sm text-neutral-650 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {activeCase.description}
              </p>
            </div>

            {/* Highlights Checklist */}
            <div className="lg:col-span-5 space-y-2 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-800 lg:pl-8">
              {activeCase.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 text-xs text-neutral-600 dark:text-neutral-450">
                  <svg className="size-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/30 mt-6 relative z-10">
          {activeCase.tech.map((t, i) => (
            <span
              key={i}
              className="text-[9px] font-mono font-medium px-2.5 py-0.5 rounded bg-neutral-200/50 text-neutral-800 dark:bg-neutral-850 dark:text-neutral-350 border border-neutral-200/40 dark:border-neutral-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Cards Carousel below */}
      <div className="w-full flex justify-center overflow-hidden py-4">
        <div className="flex flex-col lg:flex-row w-full max-w-[1500px] items-stretch justify-center gap-3">
          {cases.map((c, idx) => {
            const isExpanded = idx === expandedIndex;
            return (
              <div
                key={idx}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-[2rem] border bg-neutral-950 transition-all duration-550 ease-in-out shadow-lg flex flex-col justify-end group w-full aspect-[1.87/1] lg:aspect-auto lg:w-[8.5rem] h-[340px] lg:h-[20rem]",
                  isExpanded ? cn("lg:w-[37.5rem] border-2", c.borderColor) : "border-neutral-200/60 dark:border-neutral-850/60"
                )}
                onMouseEnter={() => setExpandedIndex(idx)}
              >
                {/* High-resolution banner image filling the entire card */}
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="600px"
                  className="absolute left-0 top-0 max-w-none select-none pointer-events-none z-0 object-cover object-left h-full w-full lg:w-[37.5rem] lg:h-[20rem]"
                  priority={idx < 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

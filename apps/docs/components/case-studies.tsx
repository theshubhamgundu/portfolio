"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import ShubsssDevImage from "@/app/(home)/shubsss-dev.jpeg";
import {
  ReactLogo,
  TypescriptLogo,
  NodejsLogo,
  TailwindcssLogo,
  VercelLogo,
  GitLogo,
  GithubLogo,
  PrismaLogo,
} from "@/components/logos";

// ─── Inline Tech Logos ────────────────────────────────────────────────────────
const ExpressLogo = () => <span className="font-sans font-extrabold italic text-[10px]">ex</span>;
const PostgresSqlLogo = () => <svg viewBox="0 0 24 24" className="size-full text-blue-600" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>;
const SupabaseLogo = () => <svg viewBox="0 0 24 24" className="size-full text-emerald-500" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 12.5V8.2l5.5 3.3-5.5 3z"/></svg>;
const StripeLogo = () => <svg viewBox="0 0 24 24" className="size-full text-indigo-500" fill="currentColor"><path d="M13.93 10.09c0-1.07-.76-1.57-2.06-1.57-.96 0-1.92.36-2.58.74V7.12c.74-.29 1.94-.52 3-.52 2.65 0 4.19 1.18 4.19 3.53v6.33c0 .87.16 1.18.42 1.34v.15h-2.58c-.14-.23-.22-.61-.22-1.08h-.07c-.6.78-1.74 1.29-2.91 1.29-2.22 0-3.66-1.22-3.66-3.13 0-2.45 2.15-3.26 4.96-3.26h1.51v-.38zm-1.51 5.92c1.37 0 2.4-1.04 2.4-2.12v-1h-1.37c-1.68 0-2.73.49-2.73 1.54 0 .97.77 1.58 1.7 1.58z"/></svg>;
const SvelteLogo = () => <svg viewBox="0 0 24 24" className="size-full text-orange-600" fill="currentColor"><path d="M19.097 10.98c0-3.308-2.692-6-6-6h-.825l-.834-.834a3.333 3.333 0 00-4.714 0l-2.714 2.714a3.333 3.333 0 000 4.714l.834.834v.825c0 3.308 2.692 6 6 6h.825l.834.834a3.333 3.333 0 004.714 0l2.714-2.714a3.333 3.333 0 000-4.714l-.834-.834v-.825zM12.272 17.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm0-7a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z"/></svg>;
const MapboxLogo = () => <svg viewBox="0 0 24 24" className="size-full text-blue-500" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-4.5-4.5 1.4-1.4 3.1 3.1 6.1-6.1 1.4 1.4-7.5 7.5z"/></svg>;
const PwaLogo = () => <span className="font-mono font-extrabold text-[9px]">PWA</span>;
const QrLogo = () => <svg viewBox="0 0 24 24" className="size-full" fill="currentColor"><path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h3v2h-3zm-2 2h2v3h-2zm4 0h1v2h-1zm-2 3h2v2h-2zm2 0h3v1h-3z"/></svg>;
const FastApiLogo = () => <svg viewBox="0 0 24 24" className="size-full text-teal-500" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.1-5.1 1.4 1.4-6.5 6.5z"/></svg>;
const PythonLogo = () => <svg viewBox="0 0 24 24" className="size-full text-yellow-500" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V8.2l5.5 3.3-5.5 3z"/></svg>;
const MapsLogo = () => <svg viewBox="0 0 24 24" className="size-full text-rose-500" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>;
const WsLogo = () => <span className="text-[9px] font-bold">WS</span>;
const FlutterLogo = () => <svg viewBox="0 0 24 24" className="size-full text-sky-500" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.7 0H14.314zM12.14 10.158L6.87 15.4 12.14 20.67 21.7 10.158H12.14z"/></svg>;
const DartLogo = () => <svg viewBox="0 0 24 24" className="size-full text-cyan-500" fill="currentColor"><path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm6 11.5l-6 3.3-6-3.3V9.2l6-3.3 6 3.3v4.3z"/></svg>;
const SqliteLogo = () => <span className="text-[9px] font-mono font-extrabold">SQL</span>;
const LangChainLogo = () => <span className="text-xs">🦜</span>;
const ChromaDbLogo = () => <span className="text-xs">💎</span>;
const OpenAiLogo = () => <svg viewBox="0 0 24 24" className="size-full text-emerald-600" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
const MotionLogo = () => <svg viewBox="0 0 24 24" className="size-full" fill="currentColor"><path d="M0 24V12h12L0 24zM12 12V0h12L12 12zM12 12H0l12-12v12zM12 12h12L12 24V12z"/></svg>;

const logoMap: Record<string, React.ReactNode> = {
  "React": <ReactLogo className="size-full" />,
  "TypeScript": <TypescriptLogo className="size-full" />,
  "Tailwind CSS": <TailwindcssLogo className="size-full text-sky-400" />,
  "Node.js": <NodejsLogo className="size-full text-emerald-600" />,
  "Express": <ExpressLogo />,
  "PostgreSQL": <PostgresSqlLogo />,
  "Supabase": <SupabaseLogo />,
  "Stripe": <StripeLogo />,
  "SvelteKit": <SvelteLogo />,
  "PostGIS": <PostgresSqlLogo />,
  "Mapbox": <MapboxLogo />,
  "PWA": <PwaLogo />,
  "QR Code": <QrLogo />,
  "FastAPI": <FastApiLogo />,
  "Python": <PythonLogo />,
  "Maps API": <MapsLogo />,
  "WebSockets": <WsLogo />,
  "WebSocket": <WsLogo />,
  "Flutter": <FlutterLogo />,
  "Dart": <DartLogo />,
  "Hive": <span className="text-xs">🍯</span>,
  "Material Design": <svg viewBox="0 0 24 24" className="size-full text-blue-600" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>,
  "LAN": <span className="text-[9px] font-bold">LAN</span>,
  "SQLite": <SqliteLogo />,
  "LangChain": <LangChainLogo />,
  "ChromaDB": <ChromaDbLogo />,
  "OpenAI": <OpenAiLogo />,
  "Vercel": <VercelLogo className="size-full" />,
  "Prisma": <PrismaLogo className="size-full" />,
  "Motion": <MotionLogo />,
  "Git": <GitLogo className="size-full text-orange-600" />,
  "GitHub": <GithubLogo className="size-full" />,
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const cases = [
  {
    title: "BulkBasket",
    category: "Wholesale Grocery Platform",
    description: "A bulk grocery ordering platform that helps large families save more through quantity-based pricing, smart discounts, scheduled deliveries, and personalized reorder templates.",
    highlights: ["Quantity-based dynamic pricing for volume orders", "Personalized reorder templates and scheduled deliveries", "Integrated Stripe payments and multi-recipient tracking"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase", "Stripe"],
    image: "/banners/bulk_basket.png",
    bg: "bg-[#1e3a8a]",
  },
  {
    title: "Happeno",
    category: "Hyperlocal Discovery Platform",
    description: "A location-first platform that helps users discover live deals, events, gigs, restaurants, activities, and updates happening nearby through a real-time personalized feed.",
    highlights: ["PostGIS geospatial queries for nearby discovery", "Interactive map routing using Mapbox integration", "Progressive Web App (PWA) supporting offline access"],
    tech: ["SvelteKit", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "PostGIS", "Mapbox", "PWA"],
    image: "/banners/happeno.png",
    bg: "bg-[#5b21b6]",
  },
  {
    title: "GatePass",
    category: "Visitor Access Control",
    description: "A digital visitor and parking management solution for residential societies featuring visitor approvals, digital gate passes, parking allocation, and real-time access monitoring.",
    highlights: ["Instant QR code secure pass generation", "Real-time resident approval notification pipeline", "Parking spot allocation matching and optimization engine"],
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase", "QR Code"],
    image: "/banners/gatepass.png",
    bg: "bg-[#9f1239]",
  },
  {
    title: "ChargeMap Live",
    category: "Smart EV Management",
    description: "A real-time EV charging platform enabling users to locate available stations, reserve slots, monitor charger health, and optimize charging availability.",
    highlights: ["Real-time station slot booking and queue management", "WebSockets active charger health monitoring", "Interactive navigation mapping with Maps API integration"],
    tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Maps API", "WebSockets"],
    image: "/banners/charge_map.png",
    bg: "bg-[#064e3b]",
  },
  {
    title: "CampusNet",
    category: "Offline Communication Network",
    description: "A secure LAN-based communication platform enabling offline messaging, file sharing, announcements, and collaboration without internet connectivity.",
    highlights: ["LAN peer detection using WebSocket connections", "Offline synchronization with high-speed local file transfer", "SQLite and Hive local database state storage"],
    tech: ["Flutter", "Dart", "Hive", "Material Design", "LAN", "WebSocket", "SQLite"],
    image: "/banners/campus_net.png",
    bg: "bg-[#0c4a6e]",
  },
  {
    title: "TelecomCare AI",
    category: "AI Telecom Assistant",
    description: "An intelligent telecom support platform with personalized dashboards, history-aware AI chat, automated voice escalation, and smart customer assistance.",
    highlights: ["LangChain history-aware customer service chat flow", "ChromaDB semantic search on support documentation", "Automated voice call escalation and user dashboard sync"],
    tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "LangChain", "ChromaDB", "OpenAI"],
    image: "/banners/telecom_ai.png",
    bg: "bg-[#3b0764]",
  },
  {
    title: "CareerCompass AI",
    category: "AI Career Intelligence",
    description: "AI career guidance platform offering personalized career recommendations, resume analysis, interview preparation, salary insights, and strategic learning roadmaps.",
    highlights: ["OpenAI powered interactive resume scoring and feedback", "Automated learning roadmap generator based on goals", "Salary intelligence modeling using PostgreSQL analytics"],
    tech: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "OpenAI", "ChromaDB", "PostgreSQL"],
    image: "/banners/career_compas_ai.png",
    bg: "bg-[#7c2d12]",
  },
];

const colorMap: Record<number, string> = {
  0: "rgba(30, 58, 138, 0.12)",   // BulkBasket - Blue
  1: "rgba(91, 33, 182, 0.12)",   // Happeno - Purple
  2: "rgba(159, 18, 57, 0.12)",   // GatePass - Rose
  3: "rgba(6, 78, 59, 0.12)",     // ChargeMap Live - Emerald/Green
  4: "rgba(12, 74, 110, 0.12)",   // CampusNet - Sky/Blue
  5: "rgba(59, 7, 100, 0.12)",    // TelecomCare AI - Violet/Purple
  6: "rgba(124, 45, 18, 0.12)",   // CareerCompass AI - Rust/Orange
};

// ─── Component ────────────────────────────────────────────────────────────────
export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLockRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 40, visible: false });

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (wheelLockRef.current !== null) {
        window.clearTimeout(wheelLockRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setCursor({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      visible: true,
    });
  };

  const handlePointerLeave = () => {
    setCursor((current) => ({ ...current, visible: false }));
  };

  // Forward wheel events from anywhere in the section into the right-side
  // horizontal scroll-snap container so scrolling moves left-to-right.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (wheelLockRef.current !== null) {
        return;
      }

      const direction = Math.sign(e.deltaY);
      if (direction === 0) {
        return;
      }

      const nextIndex = Math.max(0, Math.min(activeIndexRef.current + direction, cases.length - 1));
      if (nextIndex === activeIndexRef.current) {
        return;
      }

      // Prevent page scroll and move one project at a time.
      e.preventDefault();
      setActiveIndex(nextIndex);
      wheelLockRef.current = window.setTimeout(() => {
        wheelLockRef.current = null;
      }, 420);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, []);

  const active = cases[activeIndex];
  const PANEL_H = "h-[calc(100vh-12rem)] min-h-[44rem]";

  return (
    <div
      className="relative col-span-full w-full pt-16 pb-2 select-none overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >

      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute size-[42rem] rounded-full blur-[140px] opacity-70 transition-all"
          animate={{
            backgroundColor: colorMap[activeIndex] || "rgba(168, 85, 247, 0.12)",
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            opacity: cursor.visible ? 0.7 : 0.35,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
        <motion.div
          className="absolute size-[34rem] rounded-full blur-[140px] opacity-70 transition-all"
          animate={{
            backgroundColor: colorMap[(activeIndex + 2) % cases.length] || "rgba(236, 72, 153, 0.12)",
            left: `${100 - cursor.x}%`,
            top: `${100 - cursor.y}%`,
            opacity: cursor.visible ? 0.55 : 0.25,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </div>

      {/* ── Header ── */}
      <div className="text-center space-y-3 mb-16 px-4">
        <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
          Crafting Modern Experiences
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-none font-jakarta">
          VENTURE{" "}
          <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
            SHOWCASE
          </span>
        </h2>
      </div>

      {/* ── Desktop: full-area project viewer ── */}
      <div ref={sectionRef} className={cn("hidden lg:block w-full", PANEL_H)}>
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50 dark:bg-neutral-950 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="absolute inset-0">
                <img
                  src={active.image}
                  alt={active.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,transparent,rgba(0,0,0,0.2))]" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:p-12 text-white">
                <div className="max-w-xl space-y-4">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-white/70">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-jakarta">
                      {active.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
                      {active.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.tech.map((t, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/85 backdrop-blur-md"
                      >
                        {logoMap[t] && (
                          <span className="size-3 shrink-0 flex items-center justify-center">
                            {logoMap[t]}
                          </span>
                        )}
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: plain vertical stack ── */}
      <div className="lg:hidden px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50 dark:bg-neutral-950 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
          <div className="aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
            <img src={active.image} alt={active.title} loading="lazy" decoding="async" className="h-full w-full object-cover select-none pointer-events-none" />
          </div>
        </div>
      </div>

    </div>
  );
}

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

// ─── Component ────────────────────────────────────────────────────────────────
export function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Listen to scroll inside the right snap container
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActiveIndex(Math.max(0, Math.min(idx, cases.length - 1)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Click a dot → programmatically scroll to that card
  const scrollTo = (idx: number) => {
    scrollRef.current?.scrollTo({ top: idx * (scrollRef.current.clientHeight), behavior: "smooth" });
  };

  const active = cases[activeIndex];
  const PANEL_H = "h-[82vh]";

  return (
    <div className="col-span-full w-full py-16 select-none">

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

      {/* ── Desktop: sticky-left + snap-right ── */}
      <div className={cn("hidden lg:flex gap-12 items-stretch max-w-6xl mx-auto px-4 md:px-8", PANEL_H)}>

        {/* LEFT: info panel + timeline (fixed height, doesn't scroll) */}
        <div className="w-[42%] shrink-0 flex flex-col">
          <div className="relative flex-1 flex flex-col justify-center pr-14">

            {/* Vertical timeline line */}
            <div className="absolute right-5 top-6 bottom-6 w-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full">

              {/* Sliding avatar along the timeline */}
              <motion.div
                className="absolute -left-[14px] size-7 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 shadow-lg z-10"
                animate={{ top: `${(activeIndex / (cases.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                style={{ translateY: "-50%" }}
              >
                <div className="relative w-full h-full">
                  <Image src={ShubsssDevImage} alt="dev" fill sizes="28px" className="object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Project info — crossfades on index change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Index indicator */}
                <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-600">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
                </p>

                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-white font-jakarta">
                  <span className="text-red-500 mr-2">—</span>
                  {active.title}
                </h3>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {active.description}
                </p>

                <ul className="space-y-2">
                  {active.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      <span className="text-red-500 font-bold shrink-0 mt-0.5">+</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {active.tech.map((t, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] text-neutral-600 dark:text-neutral-400 shadow-sm"
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: scroll-snap container — one card per viewport-height slot */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-scroll rounded-2xl"
          style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {/* hide scrollbar on webkit */}
          <style>{`.snap-hide-scroll::-webkit-scrollbar { display: none; }`}</style>

          {cases.map((c, idx) => (
            <div
              key={idx}
              className="w-full h-full flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-auto block select-none pointer-events-none"
                style={{ maxHeight: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: plain vertical stack ── */}
      <div className="flex flex-col gap-16 lg:hidden max-w-xl mx-auto px-4">
        {cases.map((c, idx) => (
          <div key={idx} className="space-y-5">
            <div className="space-y-3">
              <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                {String(idx + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white font-jakarta flex items-center gap-2">
                <span className="text-red-500">—</span>
                {c.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {c.description}
              </p>
              <ul className="space-y-1.5">
                {c.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0">+</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.tech.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[11px] text-neutral-600 dark:text-neutral-400"
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
            <div className="overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-auto block select-none pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

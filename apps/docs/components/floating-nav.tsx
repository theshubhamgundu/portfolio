"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Box, Users, Folder, Feather, Command, Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function FloatingNav() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const initCal = () => {
      // Initialize Cal.com embed
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              let scr = d.createElement("script");
              scr.src = A;
              d.head.appendChild(scr);
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api: any = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              typeof namespace === "string"
                ? (cal.ns[namespace] = api) && p(api, ar)
                : p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, "https://app.cal.eu/embed/embed.js", "init");

      (window as any).Cal("init", { origin: "https://cal.eu" });
      (window as any).Cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false, layout: "month_view" });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => initCal());
      } else {
        setTimeout(initCal, 2000);
      }
    }
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const navItems = [
    { name: "Home", target: "home" },
    { name: "About", target: "about" },
    { name: "Work", target: "work" },
    { name: "Blogs", target: "blogs" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string, name: string) => {
    e.preventDefault();
    setActiveItem(name);
    setIsMobileOpen(false);
    
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(target);
    if (element) {
      // Get the nav height for offset
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] font-jakarta w-[calc(100%-2rem)] sm:w-auto max-w-[95vw]">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-[#E1E0CC]/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-neutral-200/50 dark:border-neutral-800/50">
          
          {/* Mobile: Hamburger + Book a Call only */}
          <div className="flex md:hidden items-center justify-between w-full px-1">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Active item indicator on mobile */}
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 select-none">
              {activeItem}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                data-cal-link="shubham-gundu/15min"
                data-cal-config='{"layout":"month_view"}'
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 dark:from-neutral-100 dark:to-neutral-300 text-[#E1E0CC] dark:text-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
              >
                Call
              </button>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-kinetic-menu"))}
                className="p-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <Command className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Desktop: Full navigation */}
          <div className="hidden md:flex items-center gap-1 pl-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={`#${item.target}`}
                  onClick={(e) => handleScroll(e, item.target, item.name)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive 
                      ? "text-[#E1E0CC] dark:text-black" 
                      : "text-neutral-600 hover:text-[#E1E0CC] hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-black dark:hover:bg-neutral-100"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}

            {/* More Dropdown Wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isMoreOpen 
                    ? "bg-neutral-900 text-[#E1E0CC] dark:bg-neutral-100 dark:text-black" 
                    : "text-neutral-600 hover:text-[#E1E0CC] hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-black dark:hover:bg-neutral-100"
                }`}
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[240px] p-2 bg-[#E1E0CC]/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl flex flex-col gap-1"
                  >
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Links</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">Socials & Profiles</div>
                      </div>
                    </a>
                    
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Uses</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">My gear & software</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: Divider + Right Actions */}
          <div className="hidden md:block w-[1px] h-6 bg-neutral-200 dark:bg-neutral-700 mx-2" />
          
          <div className="hidden md:flex items-center gap-2 pr-1">
            {/* Book a Call */}
            <button
              data-cal-link="shubham-gundu/15min"
              data-cal-config='{"layout":"month_view"}'
              className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 dark:from-neutral-100 dark:to-neutral-300 text-[#E1E0CC] dark:text-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
            >
              Book a Call
            </button>

            {/* Command Button */}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-kinetic-menu"))}
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Command className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: Full-screen slide-down menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-[60px] z-[99] md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            
            {/* Menu panel */}
            <div className="relative mx-4 mt-2 p-4 bg-[#E1E0CC]/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <a
                      key={item.name}
                      href={`#${item.target}`}
                      onClick={(e) => handleScroll(e, item.target, item.name)}
                      className={`px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 ${
                        isActive 
                          ? "bg-neutral-900 text-[#E1E0CC] dark:bg-neutral-100 dark:text-black" 
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </nav>
              
              {/* Divider */}
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />
              
              {/* More links */}
              <div className="flex flex-col gap-1">
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Links & Socials</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
                  <Folder className="w-4 h-4" />
                  <span className="text-sm font-medium">Uses & Gear</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Component() {
  // We need a ref for the parent container to scope GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        console.warn("CustomEase failed to load, falling back to default.", e);
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // 1. Arrow Animation (Removed from indicator, but keeping logic if arrow existed/restored elsewhere)
      // Since arrow is removed from JSX, this selector won't find anything, which is fine (safe check).
      const arrowLine = document.querySelector(".arrow-line");
      if (arrowLine) {
        const pathLength = (arrowLine as SVGPathElement).getTotalLength();
        gsap.set(arrowLine, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        arrowTl
          .to(arrowLine, { strokeDashoffset: 0, duration: 1, ease: "power2.out" })
          .to({}, { duration: 1.2 })
          .to(arrowLine, { strokeDashoffset: -pathLength, duration: 0.6, ease: "power2.in" })
          .set(arrowLine, { strokeDashoffset: pathLength });
      }

      // 2. Shape Hover
      // Updated Selectors: .menu-list-item -> .menu-list-item, .abstract-shapes -> .ambient-background-shapes
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        // Updated Selector: .shape -> .bg-shape
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        // Updated Selector: .shape-el -> .shape-element
        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 // Updated Selector: .shape -> .bg-shape
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item: any) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        // Updated Selectors: .nav -> .nav-overlay-wrapper, .menu -> .menu-content
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        // Updated Selector: .bg-panel -> .backdrop-layer
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        // Updated Selector: .menu-link -> .nav-link
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        
        // Updated Selector: .menu-button -> .nav-close-btn
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton ? Array.from(menuButton.querySelectorAll("p")) : [];
        // Updated Selector: .menu-button-icon -> .menu-button-icon (unchanged in CSS/JSX?) No, wait, CSS had .menu-button-icon
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon") ? [menuButton.querySelector(".menu-button-icon")] : [];

        const tl = gsap.timeline();
        
        if (isMenuOpen) {
            // OPEN
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<")
              // Animate Button Text Swapping if it exists
              .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
              .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
              
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            if (fadeTargets.length) {
                // Keep clearProps: "all" for blog entry fix
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            // CLOSE
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 120 }, "<")
              // Animate Button Text and Icon Back
              .to(menuButtonTexts, { yPercent: 0 }, "<")
              .to(menuButtonIcon, { rotate: 0 }, "<")

              .set(navWrap, { display: "none" });
        }

      }, containerRef);
      
      return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling and Custom Event for external toggle
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    const handleToggle = () => setIsMenuOpen(prev => !prev);
    
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("toggle-kinetic-menu", handleToggle);
    return () => {
        window.removeEventListener("keydown", handleEsc);
        window.removeEventListener("toggle-kinetic-menu", handleToggle);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="relative z-[200]">
        <div className="site-header-wrapper hidden">
          <header className="header">
            <div className="container is--full">
              <nav className="nav-row">
                <a href="#" aria-label="home" className="nav-logo-row w-inline-block"></a>
                <div className="nav-row__right">
                  {/* Clean Menu Indicator (Arrow Removed) */}
                  <div className="nav-toggle-label" onClick={toggleMenu} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                    <span className="toggle-text">click me</span>
                  </div>
                  
                  {/* Restored Menu Button */}
                  <button role="button" className="nav-close-btn" onClick={toggleMenu} style={{ pointerEvents: 'auto' }}>
                    <div className="menu-button-text">
                      <p className="p-large">Menu</p>
                      <p className="p-large">Close</p>
                    </div>
                    <div className="icon-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="menu-button-icon"
                      >
                        <path
                          d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </div>

      <section className="fixed inset-0 z-[200] pointer-events-none">
        <div data-nav="closed" className="nav-overlay-wrapper hidden absolute inset-0 pointer-events-auto">
          <div className="overlay absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu}></div>
          <nav className="menu-content absolute right-0 top-0 h-full w-full max-w-[500px] bg-neutral-100 dark:bg-neutral-900 shadow-2xl flex flex-col overflow-hidden translate-x-full">
            <div className="menu-bg absolute inset-0 pointer-events-none">
              <div className="backdrop-layer first absolute inset-0 bg-white/5 dark:bg-black/5"></div>
              <div className="backdrop-layer second absolute inset-0 bg-white/10 dark:bg-black/10"></div>
              <div className="backdrop-layer absolute inset-0 bg-transparent"></div>

              {/* Abstract shapes container */}
              <div className="ambient-background-shapes absolute inset-0 opacity-50">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full object-cover" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full object-cover" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(99,102,241,0.2)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(139,92,246,0.15)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full object-cover" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(236,72,153,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full object-cover" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(99,102,241,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(236,72,153,0.1)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5 absolute inset-0 w-full h-full object-cover" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper relative z-10 flex flex-col justify-center h-full p-12">
              
              {/* Close Button Inside Menu */}
              <button 
                onClick={closeMenu}
                className="absolute top-8 right-8 p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:scale-110 transition-transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <ul className="menu-list flex flex-col gap-6 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
                <li className="menu-list-item" data-shape="1">
                  <a href="#about" onClick={closeMenu} className="nav-link block hover:text-indigo-500 transition-colors">
                    <p className="nav-link-text m-0">About us</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#work" onClick={closeMenu} className="nav-link block hover:text-purple-500 transition-colors">
                    <p className="nav-link-text m-0">Our work</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#" onClick={closeMenu} className="nav-link block hover:text-pink-500 transition-colors">
                    <p className="nav-link-text m-0">Services</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="4">
                  <a href="#blogs" onClick={closeMenu} className="nav-link block hover:text-indigo-400 transition-colors">
                    <p className="nav-link-text m-0" data-menu-fade>Blog</p>
                  </a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <a href="#" onClick={closeMenu} className="nav-link block hover:text-purple-400 transition-colors">
                    <p className="nav-link-text m-0">Contact us</p>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

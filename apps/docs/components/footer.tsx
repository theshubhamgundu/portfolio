"use client";

import { GithubLogo } from "@/components/logos";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Showcase", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "mailto:hello@shubhamgundu.in" },
];

const MORE_LINKS = [
  { label: "GitHub", href: "https://github.com/theshubhamgundu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shubhamgundu" },
  { label: "Instagram", href: "https://instagram.com/shubham.gundu" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Skills", href: "#skills" },
];

export function Footer() {
  return (
    <footer className="w-full select-none border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-4">

        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">

          {/* Left: Contact + Capsules */}
          <div className="space-y-6 max-w-md">
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Contact me at</p>
              <a
                href="mailto:hello@shubhamgundu.in"
                className="text-base font-semibold text-neutral-900 dark:text-white font-jakarta hover:underline"
              >
                hello@shubhamgundu.in
              </a>
            </div>

            {/* Email input + button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "mailto:hello@shubhamgundu.in";
              }}
              className="flex items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 h-11 px-4 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-l-full outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
              />
              <button
                type="submit"
                className="h-11 px-6 text-sm font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-r-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {/* Playful capsule-shaped social icons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a href="https://github.com/theshubhamgundu" target="_blank" rel="noreferrer noopener" aria-label="GitHub"
                className="group flex items-center gap-2 h-10 px-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
                <GithubLogo className="size-4" />
                <span className="text-xs font-semibold">GitHub</span>
              </a>

              <a href="https://linkedin.com/in/shubhamgundu" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"
                className="group flex items-center gap-2 h-10 px-4 rounded-full bg-[#0A66C2] text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
                <LinkedinIcon className="size-4" />
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>

              <a href="https://instagram.com/shubham.gundu" target="_blank" rel="noreferrer noopener" aria-label="Instagram"
                className="group flex items-center gap-2 h-10 px-4 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
                <InstagramIcon className="size-4" />
                <span className="text-xs font-semibold">Instagram</span>
              </a>

              <a href="mailto:hello@shubhamgundu.in" aria-label="Email"
                className="group flex items-center gap-2 h-10 px-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm">
                <Mail className="size-4" />
                <span className="text-xs font-semibold">Mail</span>
              </a>

            </div>

            {/* Location pill */}
            <div className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 text-xs font-medium">
              <MapPin className="size-3" />
              India
              <ArrowRight className="size-3" />
            </div>
          </div>

          {/* Right: Link columns */}
          <div className="flex gap-8 sm:gap-16 md:gap-20">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">More Resources</h4>
              <ul className="space-y-3">
                {MORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Watermark */}
        <div className="mt-12 overflow-hidden px-4">
          <div
            className="text-[clamp(1.5rem,8.2vw,7rem)] font-black tracking-tighter leading-none text-black dark:text-white select-none pointer-events-none font-jakarta whitespace-nowrap text-center overflow-hidden"
          >
            SHUBHAM GUNDU
          </div>
        </div>

      </div>
    </footer>
  );
}

'use client';

import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import MainImg from './shubsss-dev.jpeg';
const NotebookImg = MainImg;
const OpenAPIImg = MainImg;
import { cva } from 'class-variance-authority';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  {
    ssr: false,
  },
);

export function DevWorkspacePreview() {
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'desktop'>('web');
  const [typedCode, setTypedCode] = useState('');

  const snippets = {
    web: `// server.js (Express & MongoDB)
const express = require('express');
const app = express();

app.get('/api/projects', async (req, res) => {
  const data = await Project.find({ client: 'International' });
  res.json({ status: 'success', data });
});

app.listen(5000, () => console.log('Server running on 5000'));`,
    mobile: `// main.dart (Flutter Mobile App)
import 'package:flutter/material.dart';

void main() => runApp(CampusConnectApp());

class CampusConnectApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark(),
      home: ChatScreen(title: 'P2P Offline Chat'),
    );
  }
}`,
    desktop: `// main.ts (Electron Desktop Client)
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true }
  });
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);`
  };

  // Auto cycle tabs every 6 seconds
  useEffect(() => {
    const tabs: ('web' | 'mobile' | 'desktop')[] = ['web', 'mobile', 'desktop'];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Simple typing effect when tab changes
  useEffect(() => {
    let currentText = '';
    let i = 0;
    const fullText = snippets[activeTab];
    setTypedCode('');

    const timer = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.slice(i, i + 5);
        i += 5;
        setTypedCode(currentText);
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="absolute top-[460px] md:top-[440px] lg:top-[380px] left-[4%] right-[4%] md:left-[8%] md:right-[8%] lg:left-[12%] lg:right-[12%] max-w-[1100px] mx-auto rounded-xl border border-fd-border bg-fd-card/70 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden h-[360px] md:h-[400px] transition-all duration-500 hover:shadow-brand/20 hover:border-brand/50 select-none z-10">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-fd-muted border-b border-fd-border">
        {/* MacOS Style Buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs font-mono text-fd-muted-foreground hidden sm:inline">
            workspace @ shubham-gundu
          </span>
        </div>

        {/* Interactive Tabs */}
        <div className="flex gap-1 md:gap-2">
          {(['web', 'mobile', 'desktop'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-mono rounded transition-all capitalize border border-transparent",
                activeTab === tab
                  ? "bg-brand text-brand-foreground font-semibold shadow-sm"
                  : "hover:bg-fd-accent text-fd-muted-foreground hover:text-fd-foreground"
              )}
            >
              {tab === 'web' && '🌐 Web'}
              {tab === 'mobile' && '📱 Mobile'}
              {tab === 'desktop' && '💻 Desktop'}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="flex-1 p-4 font-mono text-[10px] md:text-xs text-fd-foreground bg-black/40 overflow-y-auto border-b md:border-b-0 md:border-r border-fd-border relative">
          <div className="absolute top-2 right-4 text-[9px] text-fd-muted-foreground uppercase tracking-widest font-sans select-none">
            {activeTab === 'web' && 'Express API'}
            {activeTab === 'mobile' && 'Flutter Widget'}
            {activeTab === 'desktop' && 'Electron App'}
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed select-text text-left">
            <code>
              {typedCode}
              <span className="w-1.5 h-3.5 bg-brand inline-block animate-pulse ml-0.5 align-middle" />
            </code>
          </pre>
        </div>

        {/* Right Side: Visual Live Simulator */}
        <div className="w-full md:w-[40%] bg-fd-background/30 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated Background Gradients inside Simulator */}
          <div className="absolute inset-0 bg-radial-gradient from-brand/5 to-transparent pointer-events-none" />

          {activeTab === 'web' && (
            <div className="w-full max-w-[260px] aspect-video bg-fd-card border border-fd-border rounded-lg shadow-xl p-3 flex flex-col gap-2 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-1.5 border-b border-fd-border pb-1.5">
                <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/30" />
                <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/30" />
                <div className="h-2 w-20 bg-fd-muted rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-brand/20 border border-brand/40 rounded flex items-center justify-center text-brand text-[10px] font-bold">MERN</div>
                <div className="flex-1 flex flex-col gap-1.5 justify-center">
                  <div className="h-2 w-full bg-fd-muted rounded" />
                  <div className="h-2 w-2/3 bg-fd-muted rounded" />
                </div>
              </div>
              <div className="mt-auto flex justify-between items-center text-[9px] text-fd-muted-foreground border-t border-fd-border pt-1.5">
                <span>Clients: India & US</span>
                <span className="text-brand font-bold">● Active</span>
              </div>
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="w-[120px] h-[200px] bg-black border-4 border-fd-border rounded-[20px] shadow-2xl p-2 flex flex-col gap-1.5 relative animate-in fade-in slide-in-from-bottom-8 duration-500">
              {/* Phone Speaker/Camera Notch */}
              <div className="w-12 h-3 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg flex items-center justify-center">
                <div className="w-4 h-0.5 bg-fd-muted-foreground/30 rounded-full" />
              </div>
              {/* Screen Content */}
              <div className="flex-1 bg-fd-card rounded-[14px] overflow-hidden flex flex-col p-1.5 pt-3">
                <div className="text-[8px] font-bold text-brand mb-1">Campus Connect</div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="bg-fd-muted rounded p-1 text-[7px] text-left max-w-[80%]">Hey, are you on LAN?</div>
                  <div className="bg-brand/20 border border-brand/30 rounded p-1 text-[7px] text-right self-end max-w-[80%] text-brand">Yes, connected!</div>
                </div>
                <div className="h-2.5 w-full bg-fd-muted rounded-full mt-auto flex items-center px-1.5 text-[5px] text-fd-muted-foreground">
                  Type offline message...
                </div>
              </div>
            </div>
          )}

          {activeTab === 'desktop' && (
            <div className="w-[240px] h-[150px] bg-fd-card border border-fd-border rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-500">
              {/* Desktop Title Bar */}
              <div className="px-2.5 py-1 bg-fd-muted border-b border-fd-border flex justify-between items-center">
                <span className="text-[9px] font-mono text-fd-muted-foreground">Desktop App</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-fd-muted-foreground/30" />
                  <div className="w-1 h-1 rounded-full bg-fd-muted-foreground/30" />
                  <div className="w-1 h-1 rounded-full bg-fd-muted-foreground/30" />
                </div>
              </div>
              {/* Desktop Body */}
              <div className="flex-1 p-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 bg-brand-secondary/20 rounded flex items-center justify-center text-[8px] text-brand">💻</div>
                  <div className="flex-1">
                    <div className="h-1.5 w-12 bg-fd-muted rounded mb-1" />
                    <div className="h-1 w-full bg-fd-muted rounded" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  <div className="h-8 border border-fd-border rounded p-1 flex flex-col justify-between">
                    <span className="text-[6px] text-fd-muted-foreground">Tauri Bridge</span>
                    <span className="text-[8px] text-brand font-bold font-mono">100% Rust</span>
                  </div>
                  <div className="h-8 border border-fd-border rounded p-1 flex flex-col justify-between">
                    <span className="text-[6px] text-fd-muted-foreground">Performance</span>
                    <span className="text-[8px] text-brand-secondary font-bold font-mono">0% CPU</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    // apply some delay, otherwise on slower devices, it errors with uniform images not being fully loaded.
    setTimeout(() => {
      setShowShaders(true);
    }, 400);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full">
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === 'dark'
              ? ['#39BE1C', '#9c2f05', '#7A2A0000']
              : ['#fcfc51', '#ffa057', '#7A2A0020']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={visible ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}
      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#DF3F00' : '#fa8023'}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
          minPixelRatio={1}
        />
      )}
      <DevWorkspacePreview />
    </div>
  );
}



const previewButtonVariants = cva('w-20 h-8 text-sm font-medium transition-colors rounded-full', {
  variants: {
    active: {
      true: 'text-fd-primary-foreground',
      false: 'text-fd-muted-foreground',
    },
  },
});
export function PreviewImages(props: ComponentProps<'div'>) {
  const [active, setActive] = useState(0);
  const previews = [
    {
      image: MainImg,
      name: 'Vansh 2K26',
    },
    {
      image: NotebookImg,
      name: 'Happeno',
    },
    {
      image: OpenAPIImg,
      name: 'VHACK 2.0',
    },
  ];

  return (
    <div {...props} className={cn('relative grid', props.className)}>
      <div className="absolute flex flex-row left-1/2 -translate-1/2 bottom-0 z-2 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-20 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(var(--spacing) * 20 * ${active}))`,
          }}
        />
        {previews.map((item, i) => (
          <button
            key={i}
            className={cn(previewButtonVariants({ active: active === i }))}
            onClick={() => setActive(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {previews.map((item, i) => (
        <Image
          key={i}
          src={item.image}
          alt="preview"
          className={cn(
            'col-start-1 row-start-1 select-none',
            active === i ? 'animate-in fade-in slide-in-from-bottom-12 duration-800' : 'invisible',
          )}
        />
      ))}
    </div>
  );
}

const WritingTabs = [
  {
    name: 'Writer',
    value: 'writer',
  },
  {
    name: 'Developer',
    value: 'developer',
  },
  {
    name: 'Automation',
    value: 'automation',
  },
] as const;

export function Writing({
  tabs: tabContents,
}: {
  tabs: Record<(typeof WritingTabs)[number]['value'], ReactNode>;
}) {
  const [tab, setTab] = useState<(typeof WritingTabs)[number]['value']>('writer');

  return (
    <div className="col-span-full my-20">
      <h2 className="text-4xl text-brand mb-8 text-center font-medium tracking-tight">
        Anybody can write.
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px]">
        Native support for Markdown & MDX, offering intuitive, convenient and extensive syntax for
        non-dev writers, developers, and AI agents.
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
        {WritingTabs.map((item) => (
          <Fragment key={item.value}>
            <ArrowRight className="size-4 first:hidden" />
            <button
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-brand',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      {Object.entries(tabContents).map(([key, value]) => (
        <div
          key={key}
          aria-hidden={key !== tab}
          className={cn('animate-fd-fade-in', key !== tab && 'hidden')}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export function AgnosticBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#c6bb58"
        shape="warp"
        type="4x4"
        speed={visible ? 0.4 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}


export function ScrollAnimatedSection({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "col-span-full py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      {/* Passing isVisible state downward to child containers via custom class toggles */}
      <div className={cn("contents", isVisible ? "is-visible" : "is-hidden")}>
        {children}
      </div>
    </div>
  );
}

let observer: IntersectionObserver;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        observerTargets.get(entry.target)?.(entry);
      }
    }, {
      rootMargin: '200px 0px 200px 0px',
      threshold: 0.01
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}

// Achievements & Feedback Client Component
import { Marquee } from '@/app/(home)/marquee';
import { motion, AnimatePresence } from 'framer-motion';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const feedback = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/124599',
    user: 'Fest Coordinator',
    role: 'Vignan College Dean',
    message: `Shubham single-handedly built our ticketing system. The QR code check-in cleared crowds instantly.`,
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/35677084',
    user: 'Freelance Client',
    role: 'Full-Stack Product Owner',
    message: `Delivered a clean, robust mobile app for our business on-time. Gained great student industry exposure.`,
  },
  {
    user: 'Hackathon Judge',
    avatar: 'https://avatars.githubusercontent.com/u/38025074',
    role: 'Inter-College Jury',
    message: 'The JanAI multilingual voice assistant showed excellent innovation and practical civic application.',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/10645823',
    user: 'Aid-X Club',
    role: 'Tech Community Lead',
    message: `Shubham grew the club to 200+ members, leading workshops on Web Dev and GenAI with amazing energy.`,
  },
];

export function Feedback() {
  const achievements = [
    {
      id: 1,
      subtitle: "Student Innovation",
      title: "3× Hackathon Winner",
      logo: (
        <svg className="size-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a7 7 0 00-7 7v4a3 3 0 003 3h8a3 3 0 003-3V9a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      subtitle: "Ideathons & Coding",
      title: "Best Innovation Award",
      logo: (
        <svg className="size-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 3,
      subtitle: "Rapid Execution",
      title: "Zero-to-One Prototyping",
      logo: (
        <svg className="size-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-2.2 2.21l-3.3 1.65a1 1 0 01-1.34-1.34l1.65-3.3a6 6 0 012.21-2.2l6.23-3.12a1 1 0 011.34 1.34l-3.12 6.24zM10.15 15.15l-3.12-3.12M12.5 12.5l-4-4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 21a11.5 11.5 0 01-7.5-7.5" />
        </svg>
      )
    },
    {
      id: 4,
      subtitle: "Student Community",
      title: "Organized 8+ Hackathons",
      logo: (
        <svg className="size-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 5,
      subtitle: "Peer Mentorship",
      title: "Conducted 12+ Workshops",
      logo: (
        <svg className="size-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6M6 18.8V12m12 6.8V12" />
        </svg>
      )
    },
    {
      id: 6,
      subtitle: "In Last 6 Months",
      title: "Delivered 25+ Startup Apps",
      logo: (
        <svg className="size-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 7,
      subtitle: "Speed Programming",
      title: "Coding Contest 1st Place",
      logo: (
        <svg className="size-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="6" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      )
    },
    {
      id: 8,
      subtitle: "Aid-X Club President",
      title: "Led 350+ Club Members",
      logo: (
        <svg className="size-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 bg-gradient-to-b from-violet-50/70 to-white dark:from-violet-950/20 dark:to-neutral-950 border border-violet-100/80 dark:border-violet-900/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between overflow-hidden gap-6">
        <div className="space-y-4">
          <h3 className="text-xl lg:text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Milestones & Recognition
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Won top titles including Best Innovation across multiple inter-college hackathons, ideathons, and coding competitions, designing functional prototypes at speed.
          </p>

          {/* Interactive Achievements Deck - All 8 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-3 p-2.5 bg-neutral-50/40 dark:bg-neutral-900/40 rounded-xl border border-violet-100/10 dark:border-violet-900/10 transition-all hover:scale-[1.02] shadow-sm"
              >
                <div className="size-8 rounded-lg bg-white dark:bg-neutral-850 flex items-center justify-center border border-violet-100/20 dark:border-violet-900/20 shadow-sm shrink-0">
                  {ach.logo}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-neutral-400 font-medium leading-none mb-1">{ach.subtitle}</span>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate leading-tight">{ach.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative p-8 flex flex-col gap-8 overflow-hidden bg-white dark:bg-neutral-950 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent border border-rose-200/60 dark:border-rose-950/20 dark:from-rose-950/20 dark:to-transparent',
          }),
        )}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-jakarta font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Global Client Footprint
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[500px]">
              Highlighting active collaborations and software deliveries across major hubs in the **UK, India, and Australia**.
            </p>
          </div>
          {/* Live Indicator Dot */}
          <div className="flex items-center gap-1.5 bg-rose-500/10 dark:bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/20">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-rose-500"></span>
            </span>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-jakarta">Live Network</span>
          </div>
        </div>

        {/* 3-Column Split Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Side: Collaborations Checklist */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <svg className="size-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <h4 className="font-jakarta text-[13px] font-bold text-neutral-900 dark:text-neutral-100">
                  Trusted by Startups to Enterprises
                </h4>
                <p className="font-jakarta text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">
                  From early-stage ideas to scaling giants.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg className="size-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h4 className="font-jakarta text-[13px] font-bold text-neutral-900 dark:text-neutral-100">
                  Collaborations That Drive Impact
                </h4>
                <p className="font-jakarta text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">
                  Long-term partnerships built on trust.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg className="size-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-jakarta text-[13px] font-bold text-neutral-900 dark:text-neutral-100">
                  Delivering Across Time Zones
                </h4>
                <p className="font-jakarta text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">
                  Agile teams working, globally connected.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg className="size-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <div>
                <h4 className="font-jakarta text-[13px] font-bold text-neutral-900 dark:text-neutral-100">
                  Solutions That Scale Globally
                </h4>
                <p className="font-jakarta text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">
                  Built to solve problems, anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Globe Viewport - size constrained to 220px to prevent stretching */}
          <div className="md:col-span-4 flex items-center justify-center shrink-0">
            <div className="relative size-[225px] shrink-0 rounded-full bg-transparent overflow-hidden flex items-center justify-center">
              <RotatingEarth className="size-[220px] shrink-0" width={220} height={220} />
            </div>
          </div>

          {/* Right Side: Key Performance Metrics */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3.5 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-900 pt-5 md:pt-0">
            <div className="space-y-0.5">
              <span className="font-jakarta text-2xl font-black text-rose-500 block tracking-tight leading-none">4+</span>
              <span className="font-jakarta text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block tracking-wider uppercase">Countries Served</span>
            </div>

            <div className="space-y-0.5">
              <span className="font-jakarta text-2xl font-black text-rose-500 block tracking-tight leading-none">50+</span>
              <span className="font-jakarta text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block tracking-wider uppercase">Active Clients</span>
            </div>

            <div className="space-y-0.5">
              <span className="font-jakarta text-2xl font-black text-rose-500 block tracking-tight leading-none">80+</span>
              <span className="font-jakarta text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block tracking-wider uppercase">Projects Delivered</span>
            </div>

            <div className="space-y-0.5">
              <span className="font-jakarta text-2xl font-black text-rose-500 block tracking-tight leading-none">5+</span>
              <span className="font-jakarta text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block tracking-wider uppercase">Industry Domains</span>
            </div>

            <div className="space-y-0.5">
              <span className="font-jakarta text-2xl font-black text-rose-500 block tracking-tight leading-none">98%</span>
              <span className="font-jakarta text-[10px] font-bold text-neutral-500 dark:text-neutral-400 block tracking-wider uppercase">Client Retention</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}


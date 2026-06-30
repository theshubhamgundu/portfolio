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
import MainImg from './main.png';
import OpenAPIImg from './openapi.png';
import NotebookImg from './notebook.png';
import { cva } from 'class-variance-authority';
import HeroImage from './hero-preview.jpeg';
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


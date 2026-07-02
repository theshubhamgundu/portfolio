import Image from 'next/image';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  BatteryChargingIcon,
  FileIcon,
  FileTextIcon,
  Heart,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
  TimerIcon,
  Globe as GlobeIcon,
  Smartphone as SmartphoneIcon,
  Cpu as CpuIcon,
  Database as DatabaseIcon,
  Moon,
  Sun,
  Bot as BotIcon,
} from 'lucide-react';
import { Marquee } from '@/app/(home)/marquee';
import { MakeLogo, OpenAILogo, MicrosoftLogo, GmailLogo, AirtableLogo, N8nLogo, NotionLogo, GitLogo, GithubLogo, ReactLogo, NextjsLogo, TypescriptLogo, NodejsLogo, TailwindcssLogo, PythonLogo, DockerLogo, VercelLogo } from '@/components/logos';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import {
  AgnosticBackground,
  PreviewImages,
  Writing,
  ScrollAnimatedSection,
  Feedback,
} from '@/app/(home)/page.client';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { CaseStudies } from '@/components/case-studies';
import { Arena } from '@/components/arena';
import { Voices } from '@/components/voices';
import { CrossingRibbons } from '@/components/crossing-ribbons';
import { Skillset } from '@/components/skillset';
import { Component as Background } from '@/components/ui/background-snippets';
import { ScrollRevealText } from '@/components/ui/scroll-reveal-text';
import { ServicesSection } from '@/components/ui/services-section';
import ShadcnImage from './shadcn.png';
import ContributorCounter from '@/components/contributor-count';
import StoryImage from './story.png';
import ShubsssDevImage from './shubsss-dev.jpeg';
import Bg2Image from './bg-2.png';
import { story } from './story/client.story';

const owner = 'theshubhamgundu';
const repo = 'vhack_2.0';

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
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

const row1 = [
  '/brand-logos/l2.png',
  '/brand-logos/l3.png',
  '/brand-logos/l4.png',
  '/brand-logos/l5.png',
  '/brand-logos/l6.png',
  '/brand-logos/l8.png',
  '/brand-logos/l9.png',
  '/brand-logos/l10.png',
  '/brand-logos/l11.png',
  '/brand-logos/l12.png',
];
const row1Logos = [...row1, ...row1, ...row1];

const row2 = [
  '/brand-logos/l13.png',
  '/brand-logos/l16.webp',
  '/brand-logos/l17.png',
  '/brand-logos/l18.png',
  '/brand-logos/l19.svg',
  '/brand-logos/l21.png',
  '/brand-logos/l22.png',
  '/brand-logos/L!.webp',
  '/brand-logos/IMG_2479_ltxxzp.webp',
];
const row2Logos = [...row2, ...row2, ...row2];

const isInvertedLogo = (src: string) => {
  const whiteLogos = [
    '/brand-logos/L!.webp',
    '/brand-logos/l12.png',
    '/brand-logos/l22.png',
    '/brand-logos/l19.svg',
  ];
  return whiteLogos.includes(src);
};

export default function Page() {
  return (
    <main className="text-landing-foreground pt-0 pb-6 dark:text-landing-foreground-dark md:pb-12">
      <PrismaHero />
      <div className="relative">
        <Background />
        
        {/* Brand Logos Marquee */}
        <div className="border-y border-neutral-100/30 bg-transparent pt-8 pb-6 space-y-6">
          <p className="text-center font-jakarta text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300 select-none">
            Trusted by leading startups & creators
          </p>
          <Marquee className="[--duration:30s] [--gap:4.5rem]" pauseOnHover>
            {row1Logos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Brand logo"
                className={cn(
                  "h-10 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105",
                  isInvertedLogo(src) && "invert dark:invert-0"
                )}
              />
            ))}
          </Marquee>
          
          <Marquee className="[--duration:30s] [--gap:4.5rem]" reverse pauseOnHover>
            {row2Logos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Brand logo"
                className={cn(
                  "h-10 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105",
                  isInvertedLogo(src) && "invert dark:invert-0"
                )}
              />
            ))}
          </Marquee>
        </div>

        <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
        <ScrollAnimatedSection>
          {/* Left Side: Floating Pills */}
          <div className="flex flex-col gap-4 max-md:flex-row max-md:flex-wrap max-md:justify-center md:w-1/4">
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-100 ease-out hover:scale-105 w-fit [.is-hidden_&]:translate-x-[-120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-0 [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <SmartphoneIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">Android / iOS Dev</span>
            </div>
            
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-200 ease-out hover:scale-105 md:translate-x-4 w-fit [.is-hidden_&]:translate-x-[-120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-4 [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <GlobeIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">Web Development</span>
            </div>
            
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-300 ease-out hover:scale-105 w-fit [.is-hidden_&]:translate-x-[-120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-0 [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <CpuIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">Cloud & DevOps</span>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center max-w-[650px] px-4 space-y-6 transition-all duration-1000 ease-out [.is-hidden_&]:scale-[0.98] [.is-hidden_&]:opacity-25 [.is-visible_&]:scale-100 [.is-visible_&]:opacity-100">
            <div className="flex items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500 font-serif italic text-lg transition-colors duration-1000 [.is-hidden_&]:text-neutral-300/30 [.is-visible_&]:text-neutral-500">
              <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-800 transition-opacity duration-1000 [.is-hidden_&]:opacity-30" />
              Hello!
              <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-800 transition-opacity duration-1000 [.is-hidden_&]:opacity-30" />
            </div>
            
            <ScrollRevealText
              text="I'm the developer people trust to take an idea from zero to something real — fast, solid, and built to last."
            />
          </div>

          {/* Right Side: Floating Pills */}
          <div className="flex flex-col gap-4 max-md:flex-row max-md:flex-wrap max-md:justify-center md:items-end md:w-1/4">
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-100 ease-out hover:scale-105 w-fit [.is-hidden_&]:translate-x-[120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-0 [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-neutral-800 dark:bg-neutral-700 flex items-center justify-center text-white">
                <TerminalIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">System Design</span>
            </div>
            
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-200 ease-out hover:scale-105 md:-translate-x-4 w-fit [.is-hidden_&]:translate-x-[120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-[-16px] [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                <DatabaseIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">Backend Architecture</span>
            </div>
            
            <div className="flex items-center gap-3 bg-fd-card/85 dark:bg-neutral-900/85 backdrop-blur-md border px-4 py-2.5 rounded-full shadow-lg transition-all duration-700 delay-300 ease-out hover:scale-105 w-fit [.is-hidden_&]:translate-x-[120px] [.is-hidden_&]:opacity-0 [.is-visible_&]:translate-x-0 [.is-visible_&]:opacity-100">
              <div className="size-8 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                <BotIcon className="size-4" />
              </div>
              <span className="text-sm font-medium tracking-tight text-fd-foreground">Generative AI</span>
            </div>
          </div>
        </ScrollAnimatedSection>

        <ServicesSection />

        <Feedback />
        <Aesthetics />
        <CaseStudies />
      </div>

      <Voices />
      <Skillset />
      <CrossingRibbons />
      <Arena />
    </div>
  </main>
  );
}

function ForNonEnginners() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Tech Leadership.
      </h2>

      <div className={cn(cardVariants({ className: 'flex flex-col' }))}>
        <SettingsIcon className="text-brand mb-4" />
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Aid-X Club Founder & Lead
        </h3>
        <p className="mb-8">
          I founded our college tech club to bridge the gap between curriculum and industry.
          Led a community of 200+ members, organized 8 hackathons, and conducted 12+ hands-on workshops on Web Dev, AI/ML, and Cloud Computing.
        </p>
        <div className="flex flex-row items-center gap-2">
          <a
            href="https://github.com/theshubhamgundu"
            rel="noreferrer noopener"
            target="_blank"
            className={cn(buttonVariants({ variant: 'primary' }))}
          >
            GitHub Profile
          </a>
        </div>
      </div>
      <ServerCodeBlock
        lang="python"
        codeblock={{ title: 'janai_assistant.py' }}
        code={`from fastapi import FastAPI
from rag_pipeline import query_rag

app = FastAPI()

@app.post("/chat")
async def chat(query: str):
    # multillingual Generative AI voice-first assistant
    return {"response": query_rag(query)}`}
      />
    </>
  );
}

function Story() {
  return (
    <div className="relative col-span-full min-h-[570px] px-2 py-6 rounded-2xl z-2 border shadow-md">
      <Image
        src={StoryImage}
        alt=""
        className="absolute inset-0 size-full -z-1 pointer-events-none object-cover object-top rounded-2xl"
      />

      <div className="w-full m-auto max-w-[500px] text-start shadow-xl p-2 bg-fd-card/80 backdrop-blur-md rounded-xl border shadow-black/50 dark:bg-fd-card/50">
        <div className="pt-3 px-3">
          <h2
            className={cn(
              headingVariants({
                className: 'mb-4',
                variant: 'h3',
              }),
            )}
          >
            VHACK 2.0 Hackathon Portal
          </h2>
          <p className="text-sm mb-4">
            Developed a comprehensive hackathon management platform supporting end-to-end evaluation workflows and dashboards for ~2,000 live participants.
          </p>
          <a
            href="https://github.com/theshubhamgundu"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'primary', className: 'text-sm py-2 mb-4 w-fit' }))}
          >
            Explore Repo
          </a>
        </div>
        <story.WithControl />
      </div>
    </div>
  );
}

function Aesthetics() {
  return (
    <div className="col-span-full p-8 md:p-12 rounded-3xl border border-neutral-200/60 dark:border-neutral-800/30 bg-gradient-to-br from-sky-100/30 via-purple-100/20 to-emerald-100/30 dark:from-sky-950/20 dark:via-purple-950/10 dark:to-emerald-950/20 shadow-sm mt-16 md:mt-24 space-y-20 md:space-y-28">
      
      {/* Row 1: Team Photo and More About Us */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Circular Group Image & Rotating Stamp */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative size-[310px] sm:size-[380px] rounded-full border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={ShubsssDevImage}
              alt="Shubham Gundu"
              className="size-full object-cover object-top"
            />
          </div>
          {/* Overlapping Stamp Badge */}
          <div className="absolute -top-3 right-6 sm:-top-4 sm:right-8 size-28 rounded-full bg-[#e0f2fe] dark:bg-sky-950 border border-neutral-900 dark:border-neutral-100 shadow-md flex items-center justify-center">
            <svg className="absolute inset-0 size-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text className="text-[7.5px] font-extrabold fill-neutral-800 dark:fill-neutral-200 uppercase tracking-[0.14em] font-jakarta">
                <textPath href="#circlePath" startOffset="0%">
                  shubham gundu ✦ software developer ✦
                </textPath>
              </text>
            </svg>
            {/* Curved hand-drawn style arrow */}
            <svg className="size-6 text-neutral-800 dark:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18C9 13 13 9 18 6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h6v6" />
            </svg>
          </div>
        </div>

        {/* Right Side: Bio and Details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 relative pr-8 sm:pr-16 lg:pr-24">
          {/* Floating Hearts Icon - hand drawn mockup style */}
          <div className="absolute right-0 top-0 select-none">
            <svg className="size-24 text-black dark:text-neutral-200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                {/* Gradients for the hand-drawn hearts */}
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffccd5" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#fff5f6" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Large Heart - left */}
              <g className="animate-[float_5s_ease-in-out_infinite] origin-[30px_50px]">
                <path
                  d="M50 85 C20 60 10 40 25 25 C40 10 50 30 50 30 C50 30 60 10 75 25 C90 40 80 60 50 85 Z"
                  transform="translate(10, 10) scale(0.48) rotate(-15 50 50)"
                  fill="url(#heartGrad)"
                />
              </g>
              {/* Small Heart - right */}
              <g className="animate-[float-delayed_6s_ease-in-out_infinite] origin-[60px_60px]">
                <path
                  d="M50 85 C20 60 10 40 25 25 C40 10 50 30 50 30 C50 30 60 10 75 25 C90 40 80 60 50 85 Z"
                  transform="translate(42, 38) scale(0.3) rotate(15 50 50)"
                  fill="url(#heartGrad)"
                />
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between">
            {/* Pill Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 select-none">
              <span>✦ ABOUT</span>
            </div>
          </div>

          <h2 className="font-jakarta text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            More about me
          </h2>

          <div className="space-y-6 max-w-2xl">
            <p className="font-jakarta text-base sm:text-lg lg:text-xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
              I build functional technologies that help businesses optimize time and deliver exceptional user experiences.
            </p>
            <p className="font-jakarta text-sm sm:text-base lg:text-[17px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              By blending creativity, technology, and AI innovation, I craft digital solutions that drive real impact — from smart automation to high-converting websites and user-friendly apps that help brands grow smarter and faster.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: About summary and Vision/Mission/Values timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 md:pt-24 border-t border-neutral-100 dark:border-neutral-900">
        {/* Left Sub-column (About summary & button) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-jakarta text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-neutral-900 dark:text-neutral-50 leading-none">
              About
            </h3>
            <p className="font-jakarta text-base sm:text-lg lg:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
              My mission and vision guide everything I build — helping businesses embrace the future with smarter, faster, and more human-centered digital solutions.
            </p>
          </div>
        </div>

        {/* Right Sub-column (Vision, Mission, Values Timeline) */}
        <div className="lg:col-span-7 relative pl-12 flex flex-col gap-10">
          {/* Thin vertical connector line */}
          <div className="absolute left-[23px] top-[16px] bottom-[16px] w-[2px] bg-neutral-200 dark:bg-neutral-800" />

          {/* Vision Node */}
          <div className="relative space-y-2">
            <div className="absolute left-[-36px] top-[4px] size-6 rounded-full border-2 border-neutral-800 dark:border-neutral-200 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] dark:from-sky-900 dark:to-sky-950 shadow-sm" />
            <h4 className="font-jakarta text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-none">
              Vision
            </h4>
            <p className="font-jakarta text-sm sm:text-base lg:text-[17px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Transforming Businesses Digitally.
            </p>
          </div>

          {/* Mission Node */}
          <div className="relative space-y-2">
            <div className="absolute left-[-36px] top-[4px] size-6 rounded-full border-2 border-neutral-800 dark:border-neutral-200 bg-gradient-to-br from-[#f3e8ff] to-[#e9d5ff] dark:from-purple-900 dark:to-purple-950 shadow-sm" />
            <h4 className="font-jakarta text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-none">
              Mission
            </h4>
            <p className="font-jakarta text-sm sm:text-base lg:text-[17px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Helping brands build professional, high-performing digital identities through technology and automation.
            </p>
          </div>

          {/* Values Node */}
          <div className="relative space-y-2">
            <div className="absolute left-[-36px] top-[4px] size-6 rounded-full border-2 border-neutral-800 dark:border-neutral-200 bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] dark:from-emerald-900 dark:to-emerald-950 shadow-sm" />
            <h4 className="font-jakarta text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-50 leading-none">
              Values
            </h4>
            <p className="font-jakarta text-sm sm:text-base lg:text-[17px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Creativity, innovation, and integrity guide our every move — ensuring each project is built with purpose, precision, and a passion for progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnybodyCanWrite() {
  return (
    <Writing
      tabs={{
        writer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`<script lang="ts">
  import { onMount } from 'svelte';
  import { connectWebSocket } from './ws';
  let offers = [];
  onMount(() => {
    connectWebSocket((newOffer) => {
      offers = [newOffer, ...offers];
    });
  });
</script>`}
              lang="html"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Happeno offer engine
              </h3>
              <p>
                A real-time geospatial offer pipeline matching local deals to active shoppers in real-time.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Svelte & TypeScript frontend</li>
                <li>Node.js & WebSockets server</li>
                <li>Uber H3 hexagonal indexing</li>
                <li>Geospatial clustering queries</li>
                <li>Real-time push notifications</li>
                <li>Interactive map views</li>
              </ul>
            </div>
          </div>
        ),
        developer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`import { supabase } from '@/lib/supabase';

export async function checkInUser(ticketId: string) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ checked_in: true })
    .eq('id', ticketId);
  return { data, error };
}`}
              lang="ts"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Vansh 2K26 Registration
              </h3>
              <p>Ticketing and check-in architecture handling multi-attempt flows and on-ground QR code validation.</p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>React & Next.js App Router</li>
                <li>Supabase database & Auth</li>
                <li>QR Code generation & scanner</li>
                <li>Multi-attempt payment retries</li>
                <li>High concurrent user traffic (10K+)</li>
                <li>Real-time verification database</li>
              </ul>
            </div>
          </div>
        ),
        automation: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`import 'package:flutter/material.dart';
import 'package:nsd/nsd.dart';

void discoverLocalServices() async {
  final discovery = await startDiscovery('_http._tcp');
  discovery.addListener(() {
    print('Discovered: \${discovery.services}');
  });
}`}
              lang="dart"
            />

            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Campus Connect Mobile App
              </h3>
              <p>
                Offline peer-to-peer Wi-Fi app enabling chat, files sharing, and bulletin feeds in jammer-active campus zones.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Flutter & Dart codebase</li>
                <li>Local Wi-Fi discovery protocols</li>
                <li>Peer-to-peer offline networking</li>
                <li>Local database sync</li>
                <li>Multilingual bulletin feed</li>
                <li>No active internet required</li>
              </ul>
            </div>
          </div>
        ),
      }}
    />
  );
}


function ForEngineers() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Technologies & Education
      </h2>
      <Story />

      <div className={cn(cardVariants(), 'relative flex flex-col overflow-hidden z-2')}>
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Geospatial & Real-time Web
        </h3>
        <p className="mb-20">
          Experienced with structured database operations, geospatial clustering indexes, offline Wi-Fi service discovery, and real-time WebSockets.
        </p>
        <div className="flex flex-row gap-2 mt-auto bg-brand text-brand-foreground rounded-xl p-2 w-fit">
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Next.js</title>
            <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
          </svg>
          <svg
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            className="size-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>React</title>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          </svg>
        </div>

        <AgnosticBackground />
      </div>
      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col',
          }),
        )}
      >
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Education & History
        </h3>
        <p className="mb-8">
          Strong academic foundations in computer science, mathematics, and artificial intelligence models.
        </p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {[
            {
              name: 'B.Tech — AI & Data Science',
              description: 'Vignan Institute of Technology (Expected 2027) | CGPA: 8.0/10.0',
            },
            {
              name: 'Intermediate — MPC',
              description: 'R.D Junior College | Score: 95.3%',
            },
            {
              name: 'High School — SSC',
              description: 'S.S Sangh\'s English Medium High School | Score: 87%',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden"
            >
              <p className="font-medium text-nowrap">{item.name}</p>
              <p className="text-xs flex-1 @lg:text-end">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={cn(cardVariants())}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Core Skills & Languages
        </h3>
        <p className="mb-4">
          Fluent in multilingual communication and skilled in modern development tools.
        </p>
        <div className="flex flex-row w-fit items-center gap-4 mb-6">
          {[
            {
              href: 'https://github.com/theshubhamgundu',
              text: 'English (Fluent)',
            },
            {
              href: 'https://github.com/theshubhamgundu',
              text: 'Telugu (Native)',
            },
            {
              href: 'https://github.com/theshubhamgundu',
              text: 'Hindi & Marathi (Fluent)',
            },
          ].map((item) => (
            <span
              key={item.text}
              className="text-sm text-brand"
            >
              {item.text}
            </span>
          ))}
        </div>
        <ServerCodeBlock
          codeblock={{
            title: 'languages.ts',
          }}
          code={`export const programmingLanguages = {
  languages: ['Python', 'JavaScript', 'Dart', 'SQL'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Flutter'],
  tools: ['Git', 'GitHub', 'Postman', 'Figma']
};`.trim()}
          lang="ts"
        />
      </div>
      <div
        className={cn(cardVariants({ className: 'relative overflow-hidden min-h-[400px] z-2' }))}
      >
        <Image
          src={Bg2Image}
          alt=""
          className="absolute inset-0 size-full object-cover object-top -z-1"
        />
        <div className="absolute top-8 left-4 w-[70%] flex flex-col bg-neutral-50/80 backdrop-blur-lg border text-neutral-800 p-2 rounded-xl shadow-lg shadow-black dark:bg-neutral-900/80 dark:text-neutral-200">
          <p className="px-2 pb-2 font-medium border-b mb-2 text-neutral-500 dark:text-neutral-400">
            Skills Inventory
          </p>
          {['Python & JS', 'React & Next.js', 'Flutter & Dart', 'SQL Databases'].map((page) => (
            <div
              key={page}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-400/20"
            >
              <FileIcon className="stroke-neutral-500 size-4 dark:stroke-neutral-400" />
              <span className="text-sm">{page}</span>
              <div className="px-3 py-1 font-mono rounded-full bg-brand text-xs text-brand-foreground ms-auto">
                Skill
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-4 w-[70%] flex flex-col bg-neutral-100 text-neutral-800 rounded-xl border shadow-lg shadow-black dark:bg-neutral-900 dark:text-neutral-200">
          <div className="px-4 py-2 text-neutral-500 border-b font-medium dark:text-neutral-400">
            Developer Setup
          </div>
          <pre className="text-base text-neutral-800 overflow-auto p-4 dark:text-neutral-400">
            {`editor: Cursor
terminal: Warp / Ghostty
design: Figma
API testing: Postman / Bruno`}
          </pre>
        </div>
      </div>
      <div className={cn(cardVariants(), 'flex flex-col max-md:pb-0')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Freelance Experience
        </h3>
        <p className="mb-6">Independently built and delivered 4+ client projects with 100% on-time delivery, gaining practical industry exposure as a student developer.</p>
        <a
          href="mailto:shubsss29@gmail.com"
          className={cn(buttonVariants({ className: 'w-fit mb-8' }))}
        >
          Hire Me
        </a>
        <Search />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col p-0 overflow-hidden')}>
        <div className="p-6 mb-2">
          <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
            Aid-X Club Leadership
          </h3>
          <p className="mb-6">
            Conducted 12+ tech workshops and mentored students in building full-stack web and mobile application structures.
          </p>
          <a href="https://github.com/theshubhamgundu" target="_blank" rel="noreferrer noopener" className={cn(buttonVariants({ className: 'w-fit' }))}>
            GitHub Info
          </a>
        </div>
        <Image src={ShadcnImage} alt="shadcn" className="mt-auto flex-1 w-full object-cover" />
      </div>
    </>
  );
}

const searchItemVariants = cva('rounded-md p-2 text-sm text-fd-popover-foreground');

function Search() {
  return (
    <div className="flex select-none flex-col mt-auto bg-fd-popover rounded-xl border mask-[linear-gradient(to_bottom,white_40%,transparent_90%)] max-md:-mx-4">
      <div className="inline-flex items-center gap-2 px-4 py-3 text-sm text-fd-muted-foreground">
        <SearchIcon className="size-4" />
        Tech Stack Summary...
      </div>
      <div className="border-t p-2">
        {[
          ['Web Frontend', 'React, Next.js, HTML5, CSS3, JavaScript'],
          ['Mobile Apps', 'Flutter, Dart, React Native'],
          ['Backend & Database', 'Node.js, Supabase, SQL, REST APIs'],
          ['Languages & AI', 'Python, Generative AI, RAG, FastAPI'],
        ].map(([title, description], i) => (
          <div key={i} className={cn(searchItemVariants(), i === 0 && 'bg-fd-accent')}>
            <div className="flex flex-row items-center gap-2">
              <FileTextIcon className="size-4 text-fd-muted-foreground" />
              <p>{title}</p>
            </div>
            <p className="text-xs mt-2 text-fd-muted-foreground ps-6">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenSource() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Software Developer Portfolio
      </h2>

      <div className={cn(cardVariants({ className: 'flex flex-col' }))}>
        <Heart fill="currentColor" className="text-pink-500 mb-4" />
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          Let's collaborate
        </h3>
        <p className="mb-8">Always eager to learn new architectures, solve backend challenges, and build products.</p>
        <div className="mb-8 flex flex-row items-center gap-2">
          <a href="https://linkedin.com/in/shubhamgundu" target="_blank" rel="noreferrer noopener" className={cn(buttonVariants({ variant: 'primary' }))}>
            LinkedIn
          </a>
          <a
            href="https://github.com/theshubhamgundu"
            rel="noreferrer noopener"
            target="_blank"
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            GitHub Profile
          </a>
        </div>
        <ContributorCounter repoOwner={owner} repoName={repo} />
      </div>
      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col p-0 pt-8',
          }),
        )}
      >
        <h2 className="text-3xl text-center font-extrabold font-mono uppercase mb-4 lg:text-4xl">
          Shubham Gundu
        </h2>
        <p className="text-center font-mono text-xs opacity-50 mb-8">
          Hyderabad, Telangana, India
        </p>
        <div className="h-[200px] mt-auto overflow-hidden p-8 bg-gradient-to-b from-brand-secondary/10">
          <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-brand-secondary size-[500px] rounded-full" />
        </div>
      </div>

      <ul
        className={cn(
          cardVariants({
            className: 'flex flex-col gap-6 col-span-full',
          }),
        )}
      >
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <BatteryChargingIcon className="size-5" />
            Passionate Builder
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Always learning and implementing new architectures and tools to deliver excellent features.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Open Collaboration
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Active team lead and tech club founder, fostering open-source work and peer learning.
          </span>
        </li>
        <li>
          <span className="flex flex-row items-center gap-2 font-medium">
            <TimerIcon className="size-5" />
            Rapid Prototyping
          </span>
          <span className="mt-2 text-sm text-fd-muted-foreground">
            Ability to wireframe, build, and deploy functional prototypes at hackathon speeds.
          </span>
        </li>
        <li className="flex flex-row flex-wrap gap-2 mt-auto">
          <a href="https://github.com/theshubhamgundu" target="_blank" rel="noreferrer noopener" className={cn(buttonVariants())}>
            Open GitHub
          </a>
          <a
            href="https://linkedin.com/in/shubhamgundu"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
            )}
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </>
  );
}

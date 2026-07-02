import React from 'react';
import { cn } from '@/lib/cn';
import { 
  ReactLogo, 
  NextjsLogo, 
  TypescriptLogo, 
  NodejsLogo, 
  TailwindcssLogo, 
  DockerLogo, 
  VercelLogo, 
  GitLogo, 
  GithubLogo, 
  PrismaLogo 
} from '@/components/logos';

// Custom/Standard SVGs for the remaining logos to ensure premium display
const MotionLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 24V12h12L0 24zM12 12V0h12L12 12zM12 12H0l12-12v12zM12 12h12L12 24V12z" />
  </svg>
);

const SanityLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z" />
  </svg>
);

const ContentfulLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12h8a4 4 0 004-4v-8c0-6.627-5.373-12-12-12zm-3.5 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
  </svg>
);

const ExpressLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <span className="font-sans font-extrabold italic text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm tracking-tighter mr-0.5 select-none">ex</span>
);

const PostgreSqlLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const MongoDbLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C9.6 4.8 6 9.6 6 13.2c0 3.6 2.4 6 6 6.8 3.6-.8 6-3.2 6-6.8C18 9.6 14.4 4.8 12 0z" />
  </svg>
);

const ZustandLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <span className="text-xs sm:text-sm mr-0.5 select-none">🐻</span>
);

const ZodLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const PnpmLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 0h10v10H0V0zm14 0h10v10H14V0zM0 14h10v10H0V14zm14 0h10v10H14V14z" />
  </svg>
);

const BunLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <span className="text-xs sm:text-sm mr-0.5 select-none">🥟</span>
);

const AwsLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z" />
  </svg>
);

const ExpoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 3h20v4H2zm0 7h20v4H2zm0 7h20v4H2z" />
  </svg>
);

const ClerkLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const LinuxLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <span className="text-xs sm:text-sm mr-0.5 select-none">🐧</span>
);

interface TechPillProps {
  name: string;
  logo: React.ReactNode;
}

const TechPill = ({ name, logo }: TechPillProps) => (
  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 shadow-sm text-neutral-800 dark:text-neutral-200 font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 select-none hover:shadow-md cursor-default">
    <div className="flex items-center justify-center size-4 sm:size-4.5 shrink-0 text-neutral-600 dark:text-neutral-400">
      {logo}
    </div>
    <span>{name}</span>
  </div>
);

export function Skillset() {
  const row1 = [
    { name: "ReactJS", logo: <ReactLogo className="size-full" /> },
    { name: "NextJS", logo: <NextjsLogo className="size-full" /> },
    { name: "TypeScript", logo: <TypescriptLogo className="size-full" /> },
    { name: "Tailwind CSS", logo: <TailwindcssLogo className="size-full text-sky-400" /> },
    { name: "Motion", logo: <MotionLogo className="size-full" /> },
    { name: "Sanity", logo: <SanityLogo className="size-full text-red-500" /> }
  ];

  const row2 = [
    { name: "Contentful", logo: <ContentfulLogo className="size-full text-blue-500" /> },
    { name: "NodeJS", logo: <NodejsLogo className="size-full text-emerald-600" /> },
    { name: "ExpressJS", logo: <ExpressLogo /> },
    { name: "PostgreSQL", logo: <PostgreSqlLogo className="size-full text-blue-600" /> },
    { name: "MongoDB", logo: <MongoDbLogo className="size-full text-emerald-500" /> },
    { name: "Prisma", logo: <PrismaLogo className="size-full text-teal-600" /> }
  ];

  const row3 = [
    { name: "Zustand", logo: <ZustandLogo /> },
    { name: "Zod", logo: <ZodLogo className="size-full text-blue-800" /> },
    { name: "pnpm", logo: <PnpmLogo className="size-full text-amber-500" /> },
    { name: "Bun", logo: <BunLogo /> },
    { name: "Git", logo: <GitLogo className="size-full text-orange-600" /> },
    { name: "GitHub", logo: <GithubLogo className="size-full" /> },
    { name: "Vercel", logo: <VercelLogo className="size-full" /> }
  ];

  const row4 = [
    { name: "AWS", logo: <AwsLogo className="size-full text-orange-500" /> },
    { name: "Docker", logo: <DockerLogo className="size-full text-blue-600" /> },
    { name: "Expo", logo: <ExpoLogo className="size-full" /> },
    { name: "Clerk", logo: <ClerkLogo className="size-full text-indigo-500" /> },
    { name: "Linux", logo: <LinuxLogo /> }
  ];

  return (
    <div className="w-full mt-12 md:mt-16 text-center select-none px-4 max-w-[1000px] mx-auto space-y-10">
      
      {/* Title block */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50 select-none uppercase tracking-wider">
          <span>✦ MY SKILLSET</span>
        </div>
        <h2 className="font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-none">
          The Magic <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#ec4899] dark:from-[#f472b6] dark:to-[#db2777]">Behind</span>
        </h2>
      </div>

      {/* Grid rows */}
      <div className="flex flex-col gap-3 justify-center items-center max-w-[850px] mx-auto">
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
          {row1.map((item) => <TechPill key={item.name} name={item.name} logo={item.logo} />)}
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
          {row2.map((item) => <TechPill key={item.name} name={item.name} logo={item.logo} />)}
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
          {row3.map((item) => <TechPill key={item.name} name={item.name} logo={item.logo} />)}
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
          {row4.map((item) => <TechPill key={item.name} name={item.name} logo={item.logo} />)}
        </div>
      </div>
    </div>
  );
}

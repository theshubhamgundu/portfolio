import './global.css';
import type { Viewport } from 'next';
import { baseUrl, createMetadata } from '@/lib/metadata';
import { Body } from '@/app/layout.client';
import { Provider } from './provider';
import type { ReactNode } from 'react';
import { Geist, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { NextProvider } from 'fumadocs-core/framework/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata = createMetadata({
  title: {
    template: '%s | Shubham Gundu',
    default: 'Shubham Gundu — Software Developer Portfolio',
  },
  description: 'Software Developer | AI & Data Science . Specialist in building premium web applications, smart automated tools, and scalable architectures.',
  keywords: [
    'Shubham Gundu',
    'Software Developer',
    'AI & Data Science',
    'Vignan Institute of Technology',
    'Next.js Developer',
    'React Developer',
    'Python Developer',
    'Full Stack Engineer',
    'Freelance Web Developer',
    'FastAPI',
    'Flutter Developer',
    'Hyderabad Developer'
  ],
  authors: [{ name: 'Shubham Gundu', url: 'https://shubhamgundu.vercel.app' }],
  metadataBase: baseUrl,
});

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

const inject = `
const urlParams = new URLSearchParams(window.location.search);
const uwuParam = urlParams.get("uwu");

if (typeof uwuParam === 'string') {
    localStorage.setItem('uwu', uwuParam);
}

const item = localStorage.getItem('uwu')

if (item === 'true') {
    document.documentElement.classList.add("uwu")
}
`;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://shubhamgundu.vercel.app/#person",
      "name": "Shubham Gundu",
      "url": "https://shubhamgundu.vercel.app",
      "image": "https://shubhamgundu.vercel.app/s.png",
      "jobTitle": "Software Developer",
      "alumnusOf": {
        "@type": "CollegeOrUniversity",
        "name": "Vignan Institute of Technology"
      },
      "knowsAbout": [
        "Software Development",
        "Artificial Intelligence",
        "Data Science",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "FastAPI",
        "Dart",
        "Flutter",
        "SQL",
        "DevOps"
      ],
      "sameAs": [
        "https://github.com/theshubhamgundu",
        "https://linkedin.com/in/shubhamgundu",
        "https://instagram.com/shubham.gundu"
      ],
      "homeLocation": {
        "@type": "Place",
        "name": "Hyderabad, Telangana, India"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software Development Services Offered",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Full-Stack Web Application Development",
              "description": "High-performance web apps built with Next.js, SvelteKit, and React."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile Application Development",
              "description": "Premium native & cross-platform apps built using Flutter and React Native."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Generative AI Integration & Automation",
              "description": "Smart agentic workflow automation, vector databases (ChromaDB), and RAG pipelines."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://shubhamgundu.vercel.app/#website",
      "url": "https://shubhamgundu.vercel.app",
      "name": "Shubham Gundu — Software Developer Portfolio",
      "publisher": {
        "@id": "https://shubhamgundu.vercel.app/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://shubhamgundu.vercel.app/#profile",
      "url": "https://shubhamgundu.vercel.app",
      "name": "Shubham Gundu Professional Profile",
      "about": {
        "@id": "https://shubhamgundu.vercel.app/#person"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://shubhamgundu.vercel.app/#project-bulkbasket",
      "name": "BulkBasket",
      "description": "A wholesale grocery platform built using React, TypeScript, Node.js, PostgreSQL, and Stripe.",
      "url": "https://shubhamgundu.vercel.app",
      "creator": {
        "@id": "https://shubhamgundu.vercel.app/#person"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://shubhamgundu.vercel.app/#project-happeno",
      "name": "Happeno",
      "description": "A hyperlocal discovery platform built using SvelteKit, Supabase, PostgreSQL, PostGIS, Mapbox, and Progressive Web App technology.",
      "url": "https://shubhamgundu.vercel.app",
      "creator": {
        "@id": "https://shubhamgundu.vercel.app/#person"
      }
    },
    {
      "@type": "CreativeWork",
      "@id": "https://shubhamgundu.vercel.app/#project-gatepass",
      "name": "GatePass",
      "description": "A digital visitor and parking access control platform built using React, Express, PostgreSQL, and QR Code passes.",
      "url": "https://shubhamgundu.vercel.app",
      "creator": {
        "@id": "https://shubhamgundu.vercel.app/#person"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: inject }} />
        {/* Geo Positioning Meta Tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.385044;78.486671" />
        <meta name="ICBM" content="17.385044, 78.486671" />
        
        {/* JSON-LD Schema Structured Data for AEO/SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Body>
        <NextProvider>
          <Provider>
            {children}
            <Analytics />
          </Provider>
        </NextProvider>
      </Body>
    </html>
  );
}

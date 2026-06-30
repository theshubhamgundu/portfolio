import './global.css';
import type { Viewport } from 'next';
import { baseUrl, createMetadata } from '@/lib/metadata';
import { Body } from '@/app/layout.client';
import { Provider } from './provider';
import type { ReactNode } from 'react';
import { Geist, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { NextProvider } from 'fumadocs-core/framework/next';

export const metadata = createMetadata({
  title: {
    template: '%s | Shubham Gundu',
    default: 'Shubham Gundu — Software Developer Portfolio',
  },
  description: 'Software Developer | AI & Data Science Student Portfolio.',
  metadataBase: baseUrl,
});

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <Body>
        <NextProvider>
          <Provider>{children}</Provider>
        </NextProvider>
      </Body>
    </html>
  );
}

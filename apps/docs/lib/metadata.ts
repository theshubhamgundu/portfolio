import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  const baseCanonical = 'https://shubhamgundu.vercel.app';
  return {
    ...override,
    alternates: {
      canonical: baseCanonical,
      ...(override.alternates && typeof override.alternates === 'object' ? override.alternates : {}),
    },
    robots: override.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-placeholder-id',
      ...(override.verification && typeof override.verification === 'object' ? override.verification : {}),
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseCanonical,
      images: '/s.png',
      siteName: 'Shubham Gundu Portfolio',
      type: 'profile',
      locale: 'en_US',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/s.png',
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

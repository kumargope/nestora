import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import ViralDealsWidget from '@/components/ui/ViralDealsWidget';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'interior design ideas',
    'japandi interiors',
    'modern bedroom ideas',
    'minimalist living room',
    'luxury bathroom ideas',
    'small space solutions',
    'scandinavian interior design',
    'home decor inspiration',
  ],
  authors: [{ name: SITE_CONFIG.defaultAuthor.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Nestora Premium Interior Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <JsonLd type="WebSite" />
        <JsonLd type="Organization" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1A18] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ViralDealsWidget />
      </body>
    </html>
  );
}

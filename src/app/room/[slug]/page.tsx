import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROOMS_DATA } from '@/data/rooms';
import { ARTICLES_DATA } from '@/data/articles';
import { STYLES_DATA } from '@/data/styles';
import ArticleCard from '@/components/ui/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import StyleCard from '@/components/ui/StyleCard';
import AdBanner from '@/components/ads/AdBanner';
import { IconSparkles, IconCheck } from '@/components/ui/Icons';
import type { Metadata } from 'next';

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS_DATA[slug];

  if (!room) {
    return { title: 'Room Not Found' };
  }

  return {
    title: `Beautiful ${room.name} Ideas & Inspiration | NESTORA`,
    description: room.description,
    openGraph: {
      title: `${room.name} Interior Design Ideas — NESTORA`,
      description: room.description,
      images: [room.heroImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(ROOMS_DATA).map((slug) => ({ slug }));
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = ROOMS_DATA[slug];

  if (!room) {
    notFound();
  }

  const roomArticles = ARTICLES_DATA
    .filter((a) => a.roomSlug === room.slug)
    .sort((a, b) => {
      // Prioritize new lookbooks (pd-, kt-, bs-, px-, pt-, rg-, lt-, sf-, wd-, ar-, ho-, bt-) over legacy generated ones
      const aIsPD = a.id.startsWith('pd-');
      const bIsPD = b.id.startsWith('pd-');
      if (aIsPD && !bIsPD) return -1;
      if (!aIsPD && bIsPD) return 1;
      const aIsKT = a.id.startsWith('kt-');
      const bIsKT = b.id.startsWith('kt-');
      if (aIsKT && !bIsKT) return -1;
      if (!aIsKT && bIsKT) return 1;
      const aIsBS = a.id.startsWith('bs-');
      const bIsBS = b.id.startsWith('bs-');
      if (aIsBS && !bIsBS) return -1;
      if (!aIsBS && bIsBS) return 1;
      if (a.id.startsWith('px-') && !b.id.startsWith('px-')) return -1;
      if (!a.id.startsWith('px-') && b.id.startsWith('px-')) return 1;
      const aIsNew = a.id.startsWith('pd-') || a.id.startsWith('pt-') || a.id.startsWith('rg-') || a.id.startsWith('lt-') || a.id.startsWith('sf-') || a.id.startsWith('wd-') || a.id.startsWith('ar-') || a.id.startsWith('ho-') || a.id.startsWith('bt-') || a.id.startsWith('bd-') || a.id.startsWith('kt-');
      const bIsNew = b.id.startsWith('pd-') || b.id.startsWith('pt-') || b.id.startsWith('rg-') || b.id.startsWith('lt-') || b.id.startsWith('sf-') || b.id.startsWith('wd-') || b.id.startsWith('ar-') || b.id.startsWith('ho-') || b.id.startsWith('bt-') || b.id.startsWith('bd-') || b.id.startsWith('kt-');
      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;
      return 0;
    });
  const otherArticles = ARTICLES_DATA.filter((a) => a.roomSlug !== room.slug).slice(0, 3);
  const displayArticles = roomArticles.length > 0 ? roomArticles : ARTICLES_DATA.slice(0, 6);

  const styleList = Object.values(STYLES_DATA).slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      
      {/* ROOM HERO SECTION */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <Image
          src={room.heroImage}
          alt={room.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-black/30 to-black/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-amber-100 font-semibold border border-white/20">
            Room Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white">
            Beautiful {room.name} Ideas
          </h1>
          <p className="font-sans text-base sm:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
            {room.tagline}
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ name: 'Rooms', href: '/ideas' }, { name: room.name }]} />

        {/* INTRODUCTION & KEY TIPS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A18]">
              Designing Your Ideal {room.name}
            </h2>
            <p className="text-stone-700 leading-relaxed font-sans text-base">
              {room.description}
            </p>
            <p className="text-stone-600 leading-relaxed font-sans text-sm">
              Whether you are planning a complete architectural renovation or introducing curated seasonal decor upgrades, our editorial lookbooks offer actionable layout strategies, color palette formulas, and lighting guidelines.
            </p>

            {/* Popular Searches Tags */}
            <div className="pt-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-2">
                Popular {room.name} Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {room.popularSearches.map((term, idx) => (
                  <Link
                    key={idx}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="text-xs bg-[#F4F0E8] hover:bg-[#E8E2D5] text-stone-700 px-3 py-1.5 rounded-full transition-colors font-medium"
                  >
                    #{term}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Key Design Principles Box */}
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E6E0D4] shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#2D392F]">
              <IconSparkles size={16} />
              <span>Architectural Principles</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1A1A18]">
              {room.name} Golden Rules
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
              {room.keyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <IconCheck size={16} className="text-[#2D392F] mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AdBanner slot={`room-${slug}-top`} />

        {/* ARTICLES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18]">
              Latest {room.name} Lookbooks & Guides
            </h2>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              {displayArticles.length} Articles Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article, idx) => (
              <ArticleCard key={article.id || `${article.slug}-${idx}`} article={article} />
            ))}
          </div>
        </section>

        {/* RELATED STYLES */}
        <section className="bg-[#F4F0E8]/50 p-8 rounded-2xl border border-[#E6E0D4] space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-1">
              Explore Complementary Styles
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A18]">
              Recommended Styles for {room.name}s
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {styleList.map((style) => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </div>
        </section>

        {/* MORE ROOM IDEAS */}
        {otherArticles.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A18] border-b border-[#E6E0D4] pb-3">
              Inspiration for Other Rooms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}

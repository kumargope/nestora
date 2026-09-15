import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES_DATA } from '@/data/articles';
import { ROOMS_DATA } from '@/data/rooms';
import { STYLES_DATA } from '@/data/styles';
import { SAMPLE_PRODUCTS } from '@/data/products';
import ArticleCard from '@/components/ui/ArticleCard';
import RoomCard from '@/components/ui/RoomCard';
import StyleCard from '@/components/ui/StyleCard';
import ShopTheLook from '@/components/affiliate/ShopTheLook';
import NewsletterBox from '@/components/ui/NewsletterBox';
import AdBanner from '@/components/ads/AdBanner';
import { IconArrowRight, IconSparkles } from '@/components/ui/Icons';

export default function HomePage() {
  // Find exact or closest matching articles for Trending Ideas cards
  const trendingArticles = [
    ARTICLES_DATA.find((a) => a.roomSlug === 'bedroom' && a.styleSlug === 'modern') || ARTICLES_DATA[0],
    ARTICLES_DATA.find((a) => a.roomSlug === 'living-room' && a.styleSlug === 'japandi') || ARTICLES_DATA[1],
    ARTICLES_DATA.find((a) => a.category.toLowerCase().includes('small') || a.tags.includes('small spaces')) || ARTICLES_DATA[2],
    ARTICLES_DATA.find((a) => a.id.startsWith('ho-')) || ARTICLES_DATA.find((a) => a.roomSlug === 'home-office') || ARTICLES_DATA[3],
    ARTICLES_DATA.find((a) => a.roomSlug === 'kitchen' && a.styleSlug === 'minimalist') || ARTICLES_DATA[4],
    ARTICLES_DATA.find((a) => a.id.startsWith('bt-')) || ARTICLES_DATA.find((a) => a.roomSlug === 'bathroom') || ARTICLES_DATA[5],
  ];

  // Room cards list (7 required rooms)
  const roomList = [
    ROOMS_DATA['bedroom'],
    ROOMS_DATA['living-room'],
    ROOMS_DATA['kitchen'],
    ROOMS_DATA['bathroom'],
    ROOMS_DATA['dining-room'],
    ROOMS_DATA['home-office'],
    ROOMS_DATA['outdoor-space'] || ROOMS_DATA['outdoor'],
  ].filter(Boolean);

  // Style cards list (10 required styles)
  const styleList = Object.values(STYLES_DATA).slice(0, 10);

  // Featured articles list ("Fresh Inspiration")
  const freshInspirationArticles = ARTICLES_DATA.slice(6, 12);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1A1A18] text-white pt-12 pb-20">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury architectural living room featuring natural lighting and stone coffee table"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105 transform transition-transform duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-black/40 to-black/20" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-[0.25em] text-amber-100 font-medium">
            <IconSparkles size={14} />
            <span>Curated Interior Inspiration</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Design a Home You’ll Love Living In.
          </h1>

          <p className="font-sans text-base sm:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
            Discover beautiful interiors, timeless design ideas, and inspiring spaces for every room in your home.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ideas"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFFDF9] text-[#1A1A18] hover:bg-stone-200 font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Explore Ideas</span>
              <IconArrowRight size={16} />
            </Link>

            <a
              href="#browse-rooms"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Browse by Room</span>
            </a>
          </div>
        </div>
      </section>

      {/* AD BANNER PLACEHOLDER */}
      <AdBanner slot="home-top-leaderboard" />

      {/* 2. TRENDING IDEAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E6E0D4]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-1">
              Curated Lookbooks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A18]">
              Trending Ideas
            </h2>
          </div>
          <Link
            href="/ideas"
            className="mt-4 sm:mt-0 text-xs uppercase tracking-widest font-semibold text-[#2D392F] hover:underline flex items-center space-x-1"
          >
            <span>View All Ideas</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 3. BROWSE BY ROOM */}
      <section id="browse-rooms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-2">
            Spatial Navigation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A18] mb-3">
            Explore by Room
          </h2>
          <p className="text-sm text-stone-600 font-sans">
            Explore curated design ideas, room layouts, and color palettes tailored for every room in your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomList.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>

      {/* AD BANNER PLACEHOLDER */}
      <AdBanner slot="home-middle-ad" />

      {/* 4. EXPLORE BY STYLE ("Find Your Style") */}
      <section className="bg-[#F4F0E8]/60 py-16 border-y border-[#E6E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-1">
                Aesthetic Archetypes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A18]">
                Find Your Style
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-stone-600 max-w-md font-sans">
              From Japandi and Nordic minimalism to modern architectural grandeur and coastal warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {styleList.map((style) => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED ARTICLES ("Fresh Inspiration") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E6E0D4]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-1">
              Editorial Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1A1A18]">
              Fresh Inspiration
            </h2>
          </div>
          <Link
            href="/ideas"
            className="mt-4 sm:mt-0 text-xs uppercase tracking-widest font-semibold text-[#2D392F] hover:underline flex items-center space-x-1"
          >
            <span>Explore All Articles</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freshInspirationArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 6. SHOP THE LOOK SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShopTheLook products={SAMPLE_PRODUCTS.slice(0, 3)} title="Shop The Look: Curated Products" />
      </section>

      {/* 7. NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterBox />
      </section>

    </div>
  );
}

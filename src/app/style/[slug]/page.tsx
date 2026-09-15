import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { STYLES_DATA } from '@/data/styles';
import { ARTICLES_DATA } from '@/data/articles';
import ArticleCard from '@/components/ui/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AdBanner from '@/components/ads/AdBanner';
import { IconSparkles, IconCheck } from '@/components/ui/Icons';
import type { Metadata } from 'next';

interface StylePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StylePageProps): Promise<Metadata> {
  const { slug } = await params;
  const style = STYLES_DATA[slug];

  if (!style) {
    return { title: 'Style Not Found' };
  }

  return {
    title: `${style.name} Guide & Inspiration | NESTORA`,
    description: style.description,
    openGraph: {
      title: `${style.name} — NESTORA Style Guide`,
      description: style.description,
      images: [style.heroImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(STYLES_DATA).map((slug) => ({ slug }));
}

export default async function StylePage({ params }: StylePageProps) {
  const { slug } = await params;
  const style = STYLES_DATA[slug];

  if (!style) {
    notFound();
  }

  const styleArticles = ARTICLES_DATA.filter((a) => a.styleSlug === style.slug);
  const displayArticles = styleArticles.length > 0 ? styleArticles : ARTICLES_DATA.slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      
      {/* STYLE HERO SECTION */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <Image
          src={style.heroImage}
          alt={style.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-black/30 to-black/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-amber-100 font-semibold border border-white/20">
            Aesthetic Archetype
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white">
            {style.name}
          </h1>
          <p className="font-sans text-base sm:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
            {style.tagline}
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ name: 'Styles', href: '/ideas' }, { name: style.name }]} />

        {/* OVERVIEW & CHARACTERISTICS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-3xl font-semibold text-[#1A1A18]">
              What is {style.name}?
            </h2>
            <p className="text-stone-700 leading-relaxed font-sans text-base">
              {style.description}
            </p>

            {/* Key Characteristics */}
            <div className="pt-2">
              <h3 className="font-serif text-xl font-semibold text-[#1A1A18] mb-4">
                Core Design Characteristics
              </h3>
              <ul className="space-y-3">
                {style.characteristics.map((trait, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-stone-700 font-sans">
                    <IconCheck size={18} className="text-[#2D392F] mt-0.5 shrink-0" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Materials */}
            <div className="pt-4 border-t border-[#E6E0D4]">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-2">
                Essential Materials & Finishes:
              </span>
              <div className="flex flex-wrap gap-2">
                {style.keyMaterials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#FFFDF9] border border-[#E6E0D4] px-3 py-1 rounded-full text-stone-800 font-medium"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Color Palette Card */}
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E6E0D4] shadow-xs space-y-6">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#2D392F]">
              <IconSparkles size={16} />
              <span>Color Harmony</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1A1A18]">
              {style.name} Color Palette
            </h3>
            <p className="text-xs text-stone-600 font-sans">
              Use these curated tones as base wall colors, furniture upholstery, and accents.
            </p>

            <div className="space-y-3">
              {style.colorPalette.map((color, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#FBF9F5] border border-[#F4F0E8]">
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-8 h-8 rounded-full border border-stone-300 shadow-xs block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium text-stone-800">{color.name}</span>
                  </div>
                  <span className="text-xs font-mono text-stone-400">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        <AdBanner slot={`style-${slug}-top`} />

        {/* ARTICLES IN THIS STYLE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18]">
              Featured {style.name} Articles & Lookbooks
            </h2>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              {displayArticles.length} Lookbooks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article, idx) => (
              <ArticleCard key={article.id || `${article.slug}-${idx}`} article={article} />
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}

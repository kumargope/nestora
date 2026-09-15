import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CATEGORIES_DATA } from '@/data/categories';
import { ARTICLES_DATA } from '@/data/articles';
import ArticleCard from '@/components/ui/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AdBanner from '@/components/ads/AdBanner';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_DATA[slug];

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Ideas & Inspiration | NESTORA`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES_DATA).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES_DATA[slug];

  if (!category) {
    notFound();
  }

  const categoryArticles = ARTICLES_DATA
    .filter((a) => a.category.toLowerCase() === category.name.toLowerCase() || a.categorySlug === slug || a.slug.includes(slug))
    .sort((a, b) => {
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

  const displayArticles = categoryArticles.length > 0 ? categoryArticles : ARTICLES_DATA.slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      
      {/* CATEGORY HERO */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <Image
          src={category.heroImage}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-black/30 to-black/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs uppercase tracking-[0.25em] text-amber-100 font-semibold border border-white/20">
            Category Topic
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white">
            {category.name}
          </h1>
          <p className="font-sans text-base sm:text-lg text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs items={[{ name: 'Ideas', href: '/ideas' }, { name: category.name }]} />

        <AdBanner slot={`category-${slug}-top`} />

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18]">
              {category.name} Lookbooks & Guides
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

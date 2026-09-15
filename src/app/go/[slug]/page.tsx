import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/data/articles';
import { buildAmazonAffiliateUrl } from '@/lib/utils';
import { IconShoppingBag } from '@/components/ui/Icons';
import RedirectClient from './RedirectClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GoPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const primaryProduct = article.shopTheLook && article.shopTheLook.length > 0 ? article.shopTheLook[0] : null;
  const amazonUrl = buildAmazonAffiliateUrl(article.title, primaryProduct?.affiliateUrl);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">
        
        {/* Brand Tag */}
        <div className="inline-flex items-center space-x-2 bg-[#F4F0E8] border border-[#E6E0D4] rounded-full px-3.5 py-1 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-semibold tracking-widest text-[#2D392F] uppercase">
            Nestora Verified Deal
          </span>
        </div>

        {/* Product Image Preview */}
        <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md mb-6 border border-stone-200 bg-stone-100">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Title */}
        <h1 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A18] mb-2 leading-snug">
          {article.title}
        </h1>

        <p className="text-xs text-stone-500 mb-6 font-sans">
          Curated by Nestora • Verified Amazon In-Stock & Deals
        </p>

        {/* Interactive Client Countdown & Auto-Redirect */}
        <RedirectClient destinationUrl={amazonUrl} />

        {/* Fallback & Alternative Navigation */}
        <div className="mt-6 pt-6 border-t border-[#F4F0E8] w-full flex flex-col items-center space-y-3">
          <a
            href={amazonUrl}
            className="w-full py-3 px-6 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <IconShoppingBag size={16} />
            <span>Continue to Amazon Immediately</span>
          </a>

          <Link
            href={`/article/${article.slug}`}
            className="text-xs text-stone-500 hover:text-[#2D392F] font-medium transition-colors hover:underline"
          >
            ← Or explore full lookbook on Nestora
          </Link>
        </div>

      </div>
    </div>
  );
}

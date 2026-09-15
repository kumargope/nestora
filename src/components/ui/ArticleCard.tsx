import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { IconClock, IconShoppingBag, IconPinterest } from '@/components/ui/Icons';
import { SITE_CONFIG } from '@/lib/constants';
import { formatDate, buildAmazonAffiliateUrl } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export default function ArticleCard({ article, aspectRatio = 'landscape' }: ArticleCardProps) {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
  }[aspectRatio];

  const primaryProduct = article.shopTheLook && article.shopTheLook.length > 0 ? article.shopTheLook[0] : null;
  const buyUrl = buildAmazonAffiliateUrl(
    article.title,
    primaryProduct?.affiliateUrl
  );
  const articleUrl = `${SITE_CONFIG.url}/article/${article.slug}`;
  const isExternalBuy = true;

  return (
    <article className="group flex flex-col bg-[#FFFDF9] rounded-xl overflow-hidden border border-[#E6E0D4] shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Clickable Image Container */}
      <div className="relative w-full overflow-hidden">
        <Link href={`/article/${article.slug}`} className={`block relative w-full ${aspectClasses} overflow-hidden bg-stone-200 cursor-pointer`}>
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Category Overlay Badge */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="inline-block bg-[#FBF9F5]/90 backdrop-blur-md text-[#2D392F] text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1 rounded-full shadow-sm">
              {article.category}
            </span>
          </div>
        </Link>

        {/* Hover Pinterest Pin Button */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(articleUrl)}&media=${encodeURIComponent(article.heroImage)}&description=${encodeURIComponent(article.title + ' - ' + article.excerpt + ' #HomeDecor #AmazonFinds')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#E60023] hover:bg-[#b8001c] text-white text-[11px] font-semibold tracking-wider rounded-full shadow-md flex items-center space-x-1 cursor-pointer transition-transform hover:scale-105"
            title="Save to Pinterest"
          >
            <IconPinterest size={14} />
            <span>Save</span>
          </a>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center space-x-3 text-xs text-stone-500 mb-3">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <IconClock size={13} />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1A18] group-hover:text-[#2D392F] transition-colors leading-tight mb-3">
            <Link href={`/article/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>

          <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed font-sans mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Action Buttons: Explore & Buy Now */}
        <div className="pt-4 border-t border-[#F4F0E8] flex items-center justify-between gap-3">
          <Link
            href={`/article/${article.slug}`}
            className="text-xs uppercase tracking-wider font-semibold text-stone-600 hover:text-[#2D392F] transition-colors flex items-center space-x-1 hover:underline"
          >
            <span>Explore</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          {isExternalBuy ? (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-3.5 py-1.5 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs hover:shadow-md flex items-center space-x-1.5 cursor-pointer shrink-0 group/buy"
            >
              <IconShoppingBag size={14} className="transition-transform group-hover/buy:scale-110" />
              <span>Buy Now</span>
            </a>
          ) : (
            <Link
              href={buyUrl}
              className="px-3.5 py-1.5 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs hover:shadow-md flex items-center space-x-1.5 cursor-pointer shrink-0 group/buy"
            >
              <IconShoppingBag size={14} className="transition-transform group-hover/buy:scale-110" />
              <span>Buy Now</span>
            </Link>
          )}
        </div>

      </div>
    </article>
  );
}

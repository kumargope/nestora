import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES_DATA, getArticleBySlug } from '@/data/articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TableOfContents from '@/components/ui/TableOfContents';
import TipCallout from '@/components/ui/TipCallout';
import PinterestShareButton from '@/components/ui/PinterestShareButton';
import SocialShare from '@/components/ui/SocialShare';
import ShopTheLook from '@/components/affiliate/ShopTheLook';
import ArticleCard from '@/components/ui/ArticleCard';
import NewsletterBox from '@/components/ui/NewsletterBox';
import ArticleAd from '@/components/ads/ArticleAd';
import SidebarAd from '@/components/ads/SidebarAd';
import JsonLd from '@/components/seo/JsonLd';
import { formatDate, buildAmazonAffiliateUrl } from '@/lib/utils';
import { IconClock, IconShoppingBag, IconPinterest } from '@/components/ui/Icons';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [article.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
    },
  };
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES_DATA.filter(
    (a) => a.id !== article.id && (a.roomSlug === article.roomSlug || a.styleSlug === article.styleSlug)
  ).slice(0, 3);

  const articleUrl = `https://nestora.com/article/${article.slug}`;

  return (
    <>
      <JsonLd type="Article" article={article} />

      <article className="pb-16 pt-8">
        
        {/* HEADER CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <Breadcrumbs
            items={[
              { name: 'Ideas', href: '/ideas' },
              { name: article.category, href: `/category/${article.category.toLowerCase()}` },
              { name: article.title },
            ]}
          />

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-[#F4F0E8] text-[#2D392F] text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full border border-[#E6E0D4]">
              {article.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1A1A18] tracking-tight leading-[1.15] mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-xl text-stone-600 font-light leading-relaxed mb-6">
            {article.subtitle}
          </p>

          {/* Author & Publishing Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E6E0D4] text-xs text-stone-600">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-300">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-semibold text-stone-900 block font-serif text-sm">
                  {article.author.name}
                </span>
                <span className="text-stone-500 text-[11px]">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span>Published {formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center space-x-1 font-medium text-stone-800">
                <IconClock size={14} />
                <span>{article.readingTime}</span>
              </span>
            </div>
          </div>

          {/* Social Share Bar */}
          <SocialShare title={article.title} mediaUrl={article.heroImage} />

          {/* Pinterest Visitor Special Callout Banner */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#FFF5F5] via-[#FFFDF9] to-[#F4F0E8] border border-rose-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center shrink-0 shadow-sm">
                <IconPinterest size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E60023] block">
                  Found on Pinterest? Shop This Look
                </span>
                <p className="text-xs sm:text-sm font-medium text-stone-800">
                  Direct match for items featured in this photo with verified discounts.
                </p>
              </div>
            </div>
            <a
              href={buildAmazonAffiliateUrl(article.title, article.shopTheLook?.[0]?.affiliateUrl)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow hover:shadow-md flex items-center justify-center space-x-2 shrink-0 group/pbuy"
            >
              <IconShoppingBag size={15} className="group-hover/pbuy:scale-110 transition-transform" />
              <span>Shop on Amazon Now</span>
            </a>
          </div>

          {/* Featured Product Buy Now Banner */}
          {article.shopTheLook && article.shopTheLook.length > 0 && (
            <div className="mt-6 p-4 bg-[#F4F0E8]/70 border border-[#E6E0D4] rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden relative shrink-0 bg-stone-200 border border-stone-300">
                  <Image
                    src={article.shopTheLook[0].image || article.heroImage}
                    alt={article.shopTheLook[0].name || article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block">
                    Featured Item • {article.shopTheLook[0].merchant}
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-stone-900 line-clamp-1">
                    {article.shopTheLook[0].name}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {article.shopTheLook[0].price && (
                  <span className="font-mono text-sm font-semibold text-stone-800 bg-white px-2.5 py-1 rounded-md border border-stone-200">
                    {article.shopTheLook[0].price}
                  </span>
                )}
                <a
                  href={buildAmazonAffiliateUrl(article.shopTheLook[0].name || article.title, article.shopTheLook[0].affiliateUrl)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-4 py-2 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs hover:shadow-md flex items-center space-x-2 group/btn cursor-pointer"
                >
                  <IconShoppingBag size={14} className="transition-transform group-hover/btn:scale-110" />
                  <span>Buy Now</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* HERO IMAGE */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 my-8">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg bg-stone-200">
            <Image
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <PinterestShareButton
                url={articleUrl}
                mediaUrl={article.heroImage}
                description={article.title}
                variant="badge"
              />
            </div>
          </div>
          {article.heroImageCaption && (
            <p className="text-xs text-center text-stone-500 font-sans italic mt-3">
              Photo: {article.heroImageCaption}
            </p>
          )}
        </div>

        {/* MAIN BODY & SIDEBAR LAYOUT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* ARTICLE CONTENT BODY (8 Cols) */}
            <div className="lg:col-span-8 space-y-8 font-sans text-stone-800 leading-relaxed text-base sm:text-lg">
              
              {/* Excerpt Lead Paragraph */}
              <p className="font-serif text-xl sm:text-2xl text-stone-700 leading-relaxed italic border-l-2 border-[#2D392F] pl-4 py-1">
                "{article.excerpt}"
              </p>

              {/* Table of Contents */}
              {article.sections && article.sections.length > 0 && (
                <TableOfContents sections={article.sections} />
              )}

              <ArticleAd position="top" />

              {/* Sections Breakdown */}
              {article.sections && article.sections.map((section, idx) => (
                <section key={section.id || idx} id={section.id} className="space-y-4 pt-4 border-t border-[#F4F0E8]">
                  
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18] tracking-tight">
                    {section.title}
                  </h2>

                  <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
                    {section.content}
                  </p>

                  {/* Embedded Section Image if present */}
                  {section.image && (
                    <div className="my-6">
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm bg-stone-100">
                        <Image
                          src={section.image}
                          alt={section.imageAlt || section.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <PinterestShareButton
                            url={articleUrl}
                            mediaUrl={section.image}
                            description={`${article.title} - ${section.title}`}
                            variant="badge"
                          />
                        </div>
                      </div>
                      {section.imageCaption && (
                        <p className="text-xs text-stone-500 italic mt-2 text-center">
                          {section.imageCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section Tip Callout */}
                  {section.tip && (
                    <TipCallout title={section.tip.title} text={section.tip.text} />
                  )}

                  {/* In-article ad placement after second section */}
                  {idx === 1 && <ArticleAd position="middle" />}

                </section>
              ))}

              <ArticleAd position="bottom" />

              {/* SHOP THE LOOK AFFILIATE SECTION */}
              <ShopTheLook products={article.shopTheLook} title="Shop The Look for This Article" />

              {/* Tags Cloud */}
              <div className="pt-6 border-t border-[#E6E0D4]">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-2">
                  Related Topics & Tags:
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/ideas`}
                      className="text-xs bg-[#F4F0E8] hover:bg-[#E8E2D5] text-stone-800 px-3 py-1.5 rounded-full font-medium transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pinterest Pin Action Box */}
              <div className="p-6 bg-[#FFFDF9] rounded-2xl border border-[#E6E0D4] flex flex-col sm:flex-row items-center justify-between gap-4 my-8">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A18] mb-1">
                    Save This Article to Pinterest
                  </h3>
                  <p className="text-xs text-stone-600">
                    Bookmark these interior design ideas to your home decor moodboards.
                  </p>
                </div>
                <PinterestShareButton
                  url={articleUrl}
                  mediaUrl={article.heroImage}
                  description={article.title}
                />
              </div>

              {/* NEWSLETTER */}
              <NewsletterBox />

            </div>

            {/* SIDEBAR (4 Cols) */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Author Bio Box */}
              <div className="p-6 bg-[#FFFDF9] rounded-2xl border border-[#E6E0D4]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stone-300">
                    <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-serif text-base font-semibold text-[#1A1A18] block">
                      {article.author.name}
                    </span>
                    <span className="text-xs text-stone-500">
                      {article.author.role}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Nestora Editorial features curated interior lookbooks, room design guides, and timeless architectural inspiration for modern living.
                </p>
              </div>

              {/* Sidebar Ad Placement */}
              <SidebarAd />

              {/* Related Room Link */}
              <div className="p-6 bg-[#F4F0E8] rounded-2xl border border-[#E6E0D4]">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-500 block mb-1">
                  Explore More
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#1A1A18] mb-2">
                  More {article.category} Inspiration
                </h3>
                <p className="text-xs text-stone-600 font-sans mb-4">
                  Discover curated room guides and architectural tips tailored for {article.category.toLowerCase()}s.
                </p>
                <Link
                  href={`/room/${article.roomSlug}`}
                  className="inline-block text-xs uppercase tracking-wider font-semibold text-[#2D392F] hover:underline"
                >
                  Browse {article.category} Room Guide →
                </Link>
              </div>

            </aside>

          </div>
        </div>

        {/* RELATED ARTICLES BOTTOM GRID */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-[#E6E0D4]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-semibold text-[#1A1A18]">
                You May Also Enjoy
              </h2>
              <Link href="/ideas" className="text-xs uppercase tracking-wider font-semibold text-[#2D392F] hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel, idx) => (
                <ArticleCard key={rel.id || `${rel.slug}-${idx}`} article={rel} />
              ))}
            </div>
          </section>
        )}

      </article>
    </>
  );
}

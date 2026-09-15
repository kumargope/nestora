'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ARTICLES_DATA } from '@/data/articles';
import { ROOMS_DATA } from '@/data/rooms';
import { STYLES_DATA } from '@/data/styles';
import ArticleCard from '@/components/ui/ArticleCard';
import RoomCard from '@/components/ui/RoomCard';
import StyleCard from '@/components/ui/StyleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { IconSearch, IconX, IconSparkles, IconFilter, IconTag, IconShoppingBag, IconExternalLink, IconCheck } from '@/components/ui/Icons';
import { searchArticles, getRelatedSearchQueries } from '@/lib/search';
import { buildAmazonAffiliateUrl } from '@/lib/utils';
import AmazonDealModal from '@/components/ui/AmazonDealModal';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Ideas' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'beauty', label: 'Beauty & Skincare' },
  { id: 'kitchen', label: 'Kitchen & Dining' },
  { id: 'printable-craft', label: 'Printables & Crafts' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'patio', label: 'Patio & Outdoor' },
  { id: 'bathroom', label: 'Bathroom' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [modalQuery, setModalQuery] = useState(initialQuery);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
      setModalQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.trim();

  // Smart Search Engine with Synonym Expansion, Stemming & Partial Scoring
  const searchResults = useMemo(() => {
    if (!q) return [];
    return searchArticles(ARTICLES_DATA, q);
  }, [q]);

  // Related dynamic search keywords based on the query
  const relatedKeywords = useMemo(() => {
    if (!q) return [];
    return getRelatedSearchQueries(q);
  }, [q]);

  // Filter by category tab if selected
  const filteredResults = useMemo(() => {
    if (selectedTab === 'all') return searchResults;
    return searchResults.filter(({ article }) => {
      if (selectedTab === 'printable-craft') {
        return (
          article.id.startsWith('pd-') ||
          article.category.toLowerCase().includes('printable') ||
          article.category.toLowerCase().includes('craft') ||
          article.category.toLowerCase().includes('planner')
        );
      }
      if (selectedTab === 'beauty') {
        return article.categorySlug === 'beauty' || article.id.startsWith('bs-') || article.category.toLowerCase().includes('beauty') || article.category.toLowerCase().includes('skincare');
      }
      if (selectedTab === 'living-room') {
        return article.roomSlug === 'living-room';
      }
      if (selectedTab === 'bedroom') {
        return article.roomSlug === 'bedroom';
      }
      if (selectedTab === 'bathroom') {
        return article.roomSlug === 'bathroom';
      }
      if (selectedTab === 'lighting') {
        return article.roomSlug === 'lighting' || article.categorySlug === 'lighting';
      }
      if (selectedTab === 'patio') {
        return article.roomSlug === 'patio' || article.categorySlug === 'patio';
      }
      if (selectedTab === 'kitchen') {
        return article.roomSlug === 'kitchen' || article.roomSlug === 'dining-room';
      }
      return true;
    });
  }, [searchResults, selectedTab]);

  // Matching rooms preview
  const matchingRooms = useMemo(() => {
    if (!q) return [];
    const qLower = q.toLowerCase();
    return Object.values(ROOMS_DATA).filter((room) => {
      const name = room.name.toLowerCase();
      const desc = room.description.toLowerCase();
      return name.includes(qLower) || desc.includes(qLower) || qLower.includes(name);
    });
  }, [q]);

  // Matching styles preview
  const matchingStyles = useMemo(() => {
    if (!q) return [];
    const qLower = q.toLowerCase();
    return Object.values(STYLES_DATA).filter((style) => {
      const name = style.name.toLowerCase();
      const desc = style.description.toLowerCase();
      return name.includes(qLower) || desc.includes(qLower) || qLower.includes(name);
    });
  }, [q]);

  // Total results
  const totalResults = filteredResults.length;
  const displayedArticles = filteredResults.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResults.length;

  // Fallback recommended articles when results are low
  const fallbackArticles = useMemo(() => {
    if (filteredResults.length >= 4) return [];
    return ARTICLES_DATA.slice(0, 8);
  }, [filteredResults.length]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setVisibleCount(24);
    if (newQuery.trim()) {
      router.replace(`/search?q=${encodeURIComponent(newQuery.trim())}`, { scroll: false });
    } else {
      router.replace('/search', { scroll: false });
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setModalQuery(query.trim());
      setIsDealModalOpen(true);
      router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Search' }]} />

      {/* SEARCH BAR HEADER */}
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE5D9]/70 text-[#2D392F] text-xs font-semibold tracking-wider uppercase">
          <IconSparkles size={14} className="text-[#2D392F]" />
          <span>Smart Visual Search (2,000+ Curated Lookbooks)</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A18] tracking-tight">
          Find Any Interior, Kitchen, Beauty & Decor Idea
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Search by room, product, materials, cookware, printables, crafts, or style. Our smart engine matches synonyms and related aesthetic ideas instantly.
        </p>

        {/* INPUT BOX & FORM */}
        <form onSubmit={handleSearchSubmit} className="relative mt-6 shadow-sm rounded-2xl">
          <IconSearch size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Try: phone, meal planner, wall art, cookware, chef knife, sofa, gua sha..."
            autoFocus
            className="w-full pl-14 pr-36 py-4 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl text-stone-900 placeholder-stone-400 text-base shadow-xs focus:outline-none focus:border-[#2D392F] focus:ring-2 focus:ring-[#2D392F]/10 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <IconX size={18} />
              </button>
            )}
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer shrink-0"
              title="Search and view deals"
            >
              <IconShoppingBag size={14} />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* POPULAR SEARCH SUGGESTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-stone-600">
          <span className="text-stone-400 font-medium">Popular:</span>
          {['Meal Planner', 'Wall Art', 'Cookware', 'Crafts', 'Chef Knife', 'Sofa', 'Gua Sha', 'Japandi', 'Chandelier', 'Patio', 'Candle Making'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleQueryChange(term)}
              className={`px-3 py-1 rounded-full transition-colors text-xs font-medium cursor-pointer ${
                query.toLowerCase() === term.toLowerCase()
                  ? 'bg-[#2D392F] text-white'
                  : 'bg-[#F4F0E8] hover:bg-[#E8E2D5] text-stone-700'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* DYNAMIC RELATED KEYWORDS CHIPS */}
        {q && relatedKeywords.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
              <IconTag size={13} className="text-stone-400" />
              Related Searches:
            </span>
            {relatedKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleQueryChange(kw)}
                className="px-3 py-1 bg-stone-100 hover:bg-[#2D392F] hover:text-white border border-stone-200/80 rounded-full text-xs text-stone-700 transition-all cursor-pointer font-sans capitalize"
              >
                + {kw}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CATEGORY FILTER TABS */}
      {q && (
        <div className="border-b border-[#E6E0D4] pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold mr-1 shrink-0 flex items-center gap-1">
              <IconFilter size={14} /> Filter:
            </span>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedTab(tab.id);
                  setVisibleCount(24);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                  selectedTab === tab.id
                    ? 'bg-[#2D392F] text-white shadow-xs'
                    : 'bg-[#F4F0E8] text-stone-700 hover:bg-[#EAE4D6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS COUNT SUMMARY */}
      {q && (
        <div className="flex items-center justify-between text-sm text-stone-600">
          <p>
            Showing <strong className="text-stone-900 font-semibold">{totalResults}</strong> curated result{totalResults !== 1 ? 's' : ''} for &ldquo;<span className="text-[#2D392F] font-semibold">{query}</span>&rdquo;
            {selectedTab !== 'all' && (
              <span className="ml-2 text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md border border-stone-200">
                in {CATEGORY_TABS.find((t) => t.id === selectedTab)?.label}
              </span>
            )}
          </p>
          {totalResults > 0 && (
            <span className="text-xs text-stone-400 hidden sm:inline-block">
              Sorted by semantic relevance
            </span>
          )}
        </div>
      )}

      {/* MATCHING ROOMS & STYLES PREVIEW */}
      {q && (matchingRooms.length > 0 || matchingStyles.length > 0) && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-semibold text-[#1A1A18] border-b border-[#E6E0D4] pb-2">
            Matching Rooms & Interior Styles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRooms.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
            {matchingStyles.map((style) => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </div>
        </section>
      )}

      {/* MATCHING ARTICLES */}
      {q && displayedArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-2">
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A18]">
              Photo Lookbooks & Guides ({totalResults})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map(({ article, matchedTerms }, idx) => (
              <div key={article.id || `${article.slug}-${idx}`} className="flex flex-col">
                <ArticleCard article={article} />
                {matchedTerms && matchedTerms.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 px-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Matched:</span>
                    {matchedTerms.slice(0, 3).map((term) => (
                      <span
                        key={term}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-mono"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More Search Results */}
          {hasMore && (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 24)}
                className="px-10 py-4 bg-[#FFFDF9] hover:bg-[#F4F0E8] text-[#1A1A18] border border-[#E6E0D4] font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-200 shadow-xs cursor-pointer hover:border-stone-400"
              >
                Load More Results ({totalResults - visibleCount} remaining)
              </button>
            </div>
          )}
        </section>
      )}

      {/* ZERO RESULTS / SMART AMAZON DEALS SHOWCASE */}
      {q && totalResults === 0 && (
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E6E0D4] p-6 sm:p-10 shadow-sm text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs">
            <IconSparkles size={14} />
            <span>Exclusive Amazon Deals: Up to 20% – 50% OFF</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A18] tracking-tight">
              Top Amazon Deals for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto leading-relaxed">
              We found hundreds of top-rated &ldquo;{query}&rdquo; products, bestsellers, and discounted options available with fast Prime shipping!
            </p>
          </div>

          {/* Action Box */}
          <div className="max-w-md mx-auto p-5 bg-[#F4F0E8]/70 border border-[#E6E0D4] rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-700 font-medium px-1">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <IconCheck size={14} /> 20%+ Discount Available
              </span>
              <span className="text-stone-500 font-mono">Store: Amazon</span>
            </div>

            <a
              href={buildAmazonAffiliateUrl(query)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full py-4 px-6 bg-[#2D392F] hover:bg-[#1E2720] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <IconShoppingBag size={18} className="transition-transform group-hover:scale-110" />
              <span>Shop &ldquo;{query}&rdquo; on Amazon (Buy Now)</span>
              <IconExternalLink size={15} className="opacity-80" />
            </a>
          </div>

          {/* Quick Category Suggestions */}
          <div className="pt-2 text-xs text-stone-500 space-y-2">
            <span>Or explore popular home & interior collections below:</span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto pt-1">
              {['Sofa', 'Bedroom', 'Skincare', 'Gua Sha', 'Lighting', 'Patio', 'Dining', 'Wood'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQueryChange(term)}
                  className="px-3.5 py-1 bg-[#F4F0E8] hover:bg-[#2D392F] hover:text-white text-stone-700 text-xs font-medium rounded-full transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECOMMENDED IDEAS IF LOW / EMPTY RESULTS */}
      {fallbackArticles.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#E6E0D4]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-[#1A1A18] flex items-center gap-2">
              <IconSparkles size={18} className="text-[#2D392F]" />
              Trending Lookbooks You Might Like
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* DEFAULT INITIAL STATE WHEN SEARCH IS EMPTY */}
      {!q && (
        <section className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18]">
              Browse Curated Inspiration
            </h2>
            <p className="text-sm text-stone-600 font-light">
              Explore over 1,500 high-resolution photos across home design, furniture styling, and self-care rituals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES_DATA.slice(0, 18).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Amazon Deals Pop-up Modal */}
      <AmazonDealModal
        isOpen={isDealModalOpen}
        onClose={() => setIsDealModalOpen(false)}
        query={modalQuery || query}
      />

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500 font-serif">Loading search engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}

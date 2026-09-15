'use client';

import React, { useState, useMemo } from 'react';
import { ARTICLES_DATA } from '@/data/articles';
import { ROOM_NAVIGATION, STYLE_NAVIGATION } from '@/lib/constants';
import ArticleCard from '@/components/ui/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AdBanner from '@/components/ads/AdBanner';
import { IconSearch, IconFilter, IconX } from '@/components/ui/Icons';
import { expandSearchTerms } from '@/lib/search';

export default function IdeasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(18);

  const categories = [
    { name: 'All Categories', slug: 'all' },
    { name: 'Printables & Crafts', slug: 'Printable Planners' },
    { name: 'Beauty & Skincare', slug: 'Beauty & Skincare' },
    { name: 'Bedroom', slug: 'Bedroom' },
    { name: 'Living Room', slug: 'Living Room' },
    { name: 'Kitchen', slug: 'Kitchen' },
    { name: 'Bathroom', slug: 'Bathroom' },
    { name: 'Small Spaces', slug: 'Small Spaces' },
    { name: 'Home Office', slug: 'Home Office' },
    { name: 'Lighting', slug: 'Lighting' },
    { name: 'Wall Decor', slug: 'Wall Decor' },
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA
      .filter((article) => {
        // Room match
        if (selectedRoom !== 'all' && article.roomSlug !== selectedRoom) {
          return false;
        }
        // Style match
        if (selectedStyle !== 'all' && article.styleSlug !== selectedStyle) {
          return false;
        }
        // Category match
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'Printable Planners') {
            if (
              !article.id.startsWith('pd-') &&
              !article.category.toLowerCase().includes('printable') &&
              !article.category.toLowerCase().includes('craft') &&
              !article.category.toLowerCase().includes('planner')
            ) {
              return false;
            }
          } else if (article.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }
        // Smart search query match with synonym expansion
        if (searchQuery.trim()) {
          const { allTokens } = expandSearchTerms(searchQuery);
          const fullText = `${article.title} ${article.subtitle || ''} ${article.excerpt || ''} ${article.tags.join(' ')} ${article.roomSlug || ''} ${article.category || ''} ${article.style || ''}`.toLowerCase();
          const isMatch = allTokens.some((term) => fullText.includes(term));
          if (!isMatch) return false;
        }
        return true;
      })
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
  }, [selectedRoom, selectedStyle, selectedCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRoom('all');
    setSelectedStyle('all');
    setSelectedCategory('all');
    setVisibleCount(18);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <Breadcrumbs items={[{ name: 'Ideas & Inspiration' }]} />

      {/* Page Header */}
      <div className="border-b border-[#E6E0D4] pb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-2">
          Curated Photo Gallery ({ARTICLES_DATA.length}+ Design Lookbooks)
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1A1A18] mb-4">
          Interior Design & Home Ideas
        </h1>
        <p className="text-base text-stone-600 font-sans max-w-3xl leading-relaxed">
          Browse our complete collection of 2,000+ curated interior photography lookbooks, printable guides, architectural details, and luxury home ideas. Click any photo to explore full article details within Nestora.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E6E0D4] shadow-xs space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(18);
            }}
            placeholder="Search 200+ ideas (e.g., Japandi bedroom, small kitchen, lighting)..."
            className="w-full pl-12 pr-10 py-3.5 bg-[#FBF9F5] border border-[#E6E0D4] rounded-xl text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:border-[#2D392F]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <IconX size={18} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Room Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
              Filter by Room
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => {
                setSelectedRoom(e.target.value);
                setVisibleCount(18);
              }}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E6E0D4] rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#2D392F]"
            >
              <option value="all">All Rooms</option>
              {ROOM_NAVIGATION.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Style Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
              Filter by Interior Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => {
                setSelectedStyle(e.target.value);
                setVisibleCount(18);
              }}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E6E0D4] rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#2D392F]"
            >
              <option value="all">All Styles</option>
              {STYLE_NAVIGATION.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
              Category Topic
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setVisibleCount(18);
              }}
              className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#E6E0D4] rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#2D392F]"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Active Filter Tags & Reset */}
        {(selectedRoom !== 'all' || selectedStyle !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <div className="pt-4 border-t border-[#F4F0E8] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-stone-600">
              <IconFilter size={14} />
              <span>Showing {filteredArticles.length} matching design lookbooks</span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#2D392F] hover:underline font-semibold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      <AdBanner slot="ideas-top-ad" />

      {/* Article Grid */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, idx) => (
            <ArticleCard key={article.id || `${article.slug}-${idx}`} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FFFDF9] rounded-2xl border border-[#E6E0D4] p-8">
          <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-2">
            No Ideas Found
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
            We couldn't find any articles matching your search filters. Try clearing your filters or searching for broader terms like "bedroom" or "modern".
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#2D392F] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 18)}
            className="px-10 py-4 bg-[#FFFDF9] hover:bg-[#F4F0E8] text-[#1A1A18] border border-[#E6E0D4] font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-200 shadow-xs cursor-pointer"
          >
            Load More Photos ({filteredArticles.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}

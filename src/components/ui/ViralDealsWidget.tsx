'use client';

import React, { useState } from 'react';
import { IconSparkles, IconShoppingBag, IconX, IconExternalLink, IconCheck } from '@/components/ui/Icons';
import { buildAmazonAffiliateUrl } from '@/lib/utils';

export default function ViralDealsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const trendingItems = [
    { name: 'Kitchen Cookware & Pans', discount: 'Up to 45% OFF' },
    { name: 'Gua Sha & Skincare Rollers', discount: 'Up to 50% OFF' },
    { name: 'Japandi Bedding & Linen', discount: 'Up to 35% OFF' },
    { name: 'Pendant & Mushroom Lamps', discount: 'Up to 40% OFF' },
    { name: 'Printable Planners & Journals', discount: 'Best Deals' },
  ];

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-40 p-3 bg-[#2D392F] hover:bg-[#1f2821] text-white rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer border-2 border-amber-400/50"
        title="View Trending Deals"
      >
        <span className="relative flex h-3 w-3 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <IconSparkles size={18} className="text-amber-300" />
      </button>
    );
  }

  return (
    <>
      {/* Floating Pill Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-2 animate-bounceSubtle">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-2xl transition-all border border-amber-400/30 flex items-center space-x-2 cursor-pointer group hover:scale-105"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <IconShoppingBag size={15} className="text-amber-300 transition-transform group-hover:scale-110" />
          <span>Trending Deals (50% OFF)</span>
        </button>

        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="p-1.5 bg-white/90 hover:bg-white text-stone-500 hover:text-stone-800 rounded-full shadow-md border border-stone-200 text-xs transition-colors cursor-pointer"
          title="Minimize widget"
          aria-label="Minimize"
        >
          <IconX size={14} />
        </button>
      </div>

      {/* Floating Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-[#FFFDF9] rounded-3xl border border-[#E6E0D4] shadow-2xl p-6 sm:p-8 space-y-5 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-[11px] font-semibold uppercase tracking-wider">
                <IconSparkles size={13} className="text-amber-600" />
                <span>Today&apos;s Viral Amazon Finds</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1A1A18]">
                Up to 50% Off Top Home & Kitchen Deals
              </h3>
              <p className="text-xs text-stone-600">
                Handpicked viral aesthetic items currently on discount on Amazon.
              </p>
            </div>

            {/* Deals List */}
            <div className="space-y-2.5 pt-1">
              {trendingItems.map((item, idx) => (
                <a
                  key={idx}
                  href={buildAmazonAffiliateUrl(item.name)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F4F0E8]/70 hover:bg-[#2D392F] hover:text-white border border-[#E6E0D4] transition-all group/item cursor-pointer text-xs font-medium"
                >
                  <div className="flex items-center space-x-2 text-stone-800 group-hover/item:text-white">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-900 group-hover/item:bg-white/20 group-hover/item:text-amber-300 flex items-center justify-center text-[10px] font-bold">
                      #{idx + 1}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-emerald-700 group-hover/item:text-amber-300 font-bold">
                    <span>{item.discount}</span>
                    <IconExternalLink size={12} />
                  </div>
                </a>
              ))}
            </div>

            {/* Main Button */}
            <a
              href={buildAmazonAffiliateUrl('viral aesthetic home decor')}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 px-4 bg-[#2D392F] hover:bg-[#1f2821] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-center block"
            >
              <IconShoppingBag size={16} />
              <span>Explore All Trending Deals on Amazon &rarr;</span>
            </a>

          </div>
        </div>
      )}
    </>
  );
}

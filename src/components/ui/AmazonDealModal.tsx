'use client';

import React, { useEffect } from 'react';
import { IconX, IconShoppingBag, IconExternalLink, IconSparkles, IconCheck } from '@/components/ui/Icons';
import { buildAmazonAffiliateUrl } from '@/lib/utils';

interface AmazonDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

export default function AmazonDealModal({ isOpen, onClose, query }: AmazonDealModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !query.trim()) return null;

  const targetQuery = query.trim();
  const amazonUrl = buildAmazonAffiliateUrl(targetQuery);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl border border-[#E6E0D4] shadow-2xl overflow-hidden p-6 sm:p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close deals modal"
        >
          <IconX size={20} />
        </button>

        {/* Top Tag & Discount Callout */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
            <IconSparkles size={14} className="text-amber-600" />
            <span>Exclusive Deals Found</span>
          </div>

          <div>
            <span className="inline-block bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
              🔥 Up to 20% – 50% OFF Today
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A18] tracking-tight pt-1">
            Top Amazon Deals for &ldquo;{targetQuery}&rdquo;
          </h3>

          <p className="text-sm text-stone-600 font-sans max-w-sm mx-auto leading-relaxed">
            We matched your search with verified bestsellers, customer favorites, and discounted prices on Amazon.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="my-6 p-4 rounded-2xl bg-[#F4F0E8]/70 border border-[#E6E0D4] space-y-2.5 text-left">
          <div className="flex items-center space-x-2.5 text-xs text-stone-700 font-medium">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <IconCheck size={12} />
            </span>
            <span>Instant 20%+ discount applied on eligible items</span>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-stone-700 font-medium">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <IconCheck size={12} />
            </span>
            <span>Fast Prime Delivery & Verified Customer Reviews</span>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-stone-700 font-medium">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <IconCheck size={12} />
            </span>
            <span>Hassle-free return policy & secure Amazon checkout</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={onClose}
            className="w-full py-4 px-6 bg-[#2D392F] hover:bg-[#1f2821] text-white text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group cursor-pointer text-center"
          >
            <IconShoppingBag size={18} className="transition-transform group-hover:scale-110" />
            <span>View &ldquo;{targetQuery}&rdquo; on Amazon (Buy Now)</span>
            <IconExternalLink size={15} className="opacity-80" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            Or Continue Browsing Nestora Lookbooks
          </button>
        </div>

      </div>
    </div>
  );
}

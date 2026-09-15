'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { IconSearch, IconMenu, IconX } from '@/components/ui/Icons';
import MobileNav from './MobileNav';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Viral Top Announcement Bar */}
      <div className="bg-[#2D392F] text-[#FBF9F5] text-xs py-2 px-4 text-center tracking-wide font-medium flex flex-wrap items-center justify-center gap-1.5 z-50 relative border-b border-white/10">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        <span>🔥 <strong>Amazon Trending Deals:</strong> Up to 50% Off Top Home Decor & Aesthetic Finds</span>
        <span className="hidden sm:inline text-white/50">•</span>
        <a 
          href={`https://${SITE_CONFIG.amazonDomain || 'www.amazon.com'}/s?k=aesthetic+home+decor+deals&tag=${SITE_CONFIG.affiliateTag}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="underline text-amber-300 hover:text-white font-bold transition-colors cursor-pointer"
        >
          Shop Today&apos;s Deals &rarr;
        </a>
      </div>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FBF9F5]/90 border-b border-[#E6E0D4] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <IconMenu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center lg:items-start group">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#1A1A18] group-hover:text-[#2D392F] transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-stone-500 font-sans mt-0.5">
              {SITE_CONFIG.tagline}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors hover:text-[#2D392F] relative py-1 ${
                    isActive ? 'text-[#2D392F] font-semibold' : 'text-stone-700'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2D392F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger CTA */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="flex items-center space-x-2 p-2 sm:px-3 sm:py-2 text-stone-700 hover:text-[#2D392F] hover:bg-[#F4F0E8] rounded-full transition-colors"
              title="Search Nestora"
            >
              <IconSearch size={20} />
              <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-medium">Search</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

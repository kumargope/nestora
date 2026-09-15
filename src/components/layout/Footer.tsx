import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A18] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] font-semibold text-white block">
                {SITE_CONFIG.name}
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block mt-1">
                {SITE_CONFIG.tagline}
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono">
              Designed for global home enthusiasts & interior lovers.
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 mb-4">
              Explore Rooms
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/room/bedroom" className="hover:text-white transition-colors">Bedroom Ideas</Link>
              </li>
              <li>
                <Link href="/room/living-room" className="hover:text-white transition-colors">Living Room Ideas</Link>
              </li>
              <li>
                <Link href="/room/kitchen" className="hover:text-white transition-colors">Kitchen Ideas</Link>
              </li>
              <li>
                <Link href="/room/bathroom" className="hover:text-white transition-colors">Bathroom Ideas</Link>
              </li>
              <li>
                <Link href="/category/small-spaces" className="hover:text-white transition-colors">Small Space Ideas</Link>
              </li>
              <li>
                <Link href="/room/home-office" className="hover:text-white transition-colors">Home Office Ideas</Link>
              </li>
            </ul>
          </div>

          {/* Styles Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 mb-4">
              Design Styles
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/style/japandi" className="hover:text-white transition-colors">Japandi</Link>
              </li>
              <li>
                <Link href="/style/modern" className="hover:text-white transition-colors">Modern</Link>
              </li>
              <li>
                <Link href="/style/minimalist" className="hover:text-white transition-colors">Minimalist</Link>
              </li>
              <li>
                <Link href="/style/luxury" className="hover:text-white transition-colors">Luxury</Link>
              </li>
              <li>
                <Link href="/style/scandinavian" className="hover:text-white transition-colors">Scandinavian</Link>
              </li>
              <li>
                <Link href="/style/contemporary" className="hover:text-white transition-colors">Contemporary</Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200 mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
              </li>
              <li>
                <Link href="/pinterest-bot" className="text-red-400 hover:text-red-300 transition-colors font-medium">📌 Pinterest Bot</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© 2026 {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-stone-400">
            Beautiful Ideas for Better Homes
          </p>
        </div>

      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, ROOM_NAVIGATION, STYLE_NAVIGATION, SITE_CONFIG } from '@/lib/constants';
import { IconX, IconSearch, IconArrowRight } from '@/components/ui/Icons';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FBF9F5] shadow-2xl flex flex-col z-10 overflow-y-auto">
        <div className="p-6 flex items-center justify-between border-b border-[#E6E0D4]">
          <Link href="/" onClick={onClose} className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#1A1A18]">
            {SITE_CONFIG.name}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-600 hover:text-stone-900"
            aria-label="Close menu"
          >
            <IconX size={22} />
          </button>
        </div>

        {/* Quick Search */}
        <div className="p-4 border-b border-[#E6E0D4] bg-[#FFFDF9]">
          <Link
            href="/search"
            onClick={onClose}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#F4F0E8] text-stone-700 rounded-lg text-sm font-medium"
          >
            <span className="flex items-center space-x-2">
              <IconSearch size={18} />
              <span>Search ideas, rooms, styles...</span>
            </span>
            <IconArrowRight size={16} />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-6 flex-1">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 block mb-3">
              Navigation
            </span>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block text-base font-serif tracking-wide py-1 transition-colors ${
                        isActive ? 'text-[#2D392F] font-bold' : 'text-stone-800 hover:text-[#2D392F]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className="border-[#E6E0D4]" />

          {/* Rooms Quick Links */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 block mb-3">
              Explore by Room
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs text-stone-700">
              {ROOM_NAVIGATION.map((room) => (
                <li key={room.slug}>
                  <Link
                    href={`/room/${room.slug}`}
                    onClick={onClose}
                    className="block py-1 hover:text-[#2D392F]"
                  >
                    {room.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-[#E6E0D4]" />

          {/* Styles Quick Links */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 block mb-3">
              Popular Styles
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs text-stone-700">
              {STYLE_NAVIGATION.slice(0, 6).map((style) => (
                <li key={style.slug}>
                  <Link
                    href={`/style/${style.slug}`}
                    onClick={onClose}
                    className="block py-1 hover:text-[#2D392F]"
                  >
                    {style.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-6 border-t border-[#E6E0D4] bg-[#F4F0E8] text-center">
          <p className="text-xs text-stone-500 font-serif italic">
            “Beautiful Ideas for Better Homes”
          </p>
        </div>
      </div>
    </div>
  );
}

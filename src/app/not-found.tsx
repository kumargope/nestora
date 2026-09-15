import React from 'react';
import Link from 'next/link';
import { IconHome, IconSearch } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg space-y-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400 block">
          404 — Page Not Found
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#1A1A18]">
          Space Under Renovation
        </h1>

        <p className="text-base text-stone-600 font-sans leading-relaxed">
          The page or lookbook you are looking for has been moved, renamed, or does not exist in our architectural archives.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#2D392F] text-white hover:bg-[#1F2720] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <IconHome size={16} />
            <span>Return Home</span>
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F4F0E8] text-stone-800 hover:bg-[#E8E2D5] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <IconSearch size={16} />
            <span>Search Ideas</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

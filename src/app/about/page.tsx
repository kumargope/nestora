import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.name} — Our Mission & Design Philosophy`,
  description: SITE_CONFIG.description,
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Breadcrumbs items={[{ name: 'About Us' }]} />

      {/* HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block">
          Behind the Publication
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1A1A18]">
          Beautiful Ideas for Better Homes
        </h1>
        <p className="text-lg text-stone-600 font-sans font-light leading-relaxed">
          Nestora was founded on a simple conviction: thoughtful interior design transforms how we live, rest, and gather.
        </p>
      </div>

      {/* HERO HERO IMAGE */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg bg-stone-200">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
          alt="Modern architectural house with warm wood interior lighting"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      {/* EDITORIAL ESSAY */}
      <div className="prose prose-stone max-w-3xl mx-auto space-y-6 font-sans text-stone-700 leading-relaxed text-base sm:text-lg">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A18] font-semibold">
          Our Design Philosophy
        </h2>
        <p>
          At Nestora, we believe that true luxury in interior architecture lies in spatial harmony, organic natural materials, and purposeful simplicity rather than ostentatious ornamentation.
        </p>
        <p>
          Whether exploring the quiet wabi-sabi elegance of Japandi living rooms, the spatial efficiency of small bedroom storage solutions, or the luminous warmth of Scandinavian pine interiors, our mission is to deliver authentic, high-quality home inspiration.
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A18] font-semibold pt-4">
          Global Audience & Editorial Rigor
        </h2>
        <p>
          Reaching homeowners, interior stylists, and architects across the United States, Canada, the United Kingdom, Australia, and beyond, our publication curates high-resolution imagery, actionable architectural guidelines, and practical furniture recommendations.
        </p>
      </div>

      {/* CORE VALUES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E6E0D4]">
        <div className="p-6 bg-[#FFFDF9] rounded-xl border border-[#E6E0D4]">
          <h3 className="font-serif text-xl font-semibold text-[#1A1A18] mb-2">
            1. Spatial Serenity
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We prioritize uncluttered spatial discipline, balanced daylight filtering, and acoustic comfort in every room guide.
          </p>
        </div>

        <div className="p-6 bg-[#FFFDF9] rounded-xl border border-[#E6E0D4]">
          <h3 className="font-serif text-xl font-semibold text-[#1A1A18] mb-2">
            2. Tactile Authenticity
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We celebrate raw timber, honed natural stone slabs, woven textiles, and handcrafted ceramics that age with beauty.
          </p>
        </div>

        <div className="p-6 bg-[#FFFDF9] rounded-xl border border-[#E6E0D4]">
          <h3 className="font-serif text-xl font-semibold text-[#1A1A18] mb-2">
            3. Public Accessibility
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Nestora is 100% public and friction-free. Every article and lookbook is accessible to all visitors without mandatory signups.
          </p>
        </div>
      </div>

    </div>
  );
}

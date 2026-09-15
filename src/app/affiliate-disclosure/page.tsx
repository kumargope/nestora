import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Affiliate Disclosure — ${SITE_CONFIG.name}`,
  description: 'Nestora affiliate disclosure explaining how product links and recommendations operate transparently.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Affiliate Disclosure' }]} />

      <h1 className="font-serif text-4xl font-semibold text-[#1A1A18]">
        Affiliate Disclosure
      </h1>
      <p className="text-xs text-stone-500 font-mono">Last updated: March 1, 2026</p>

      <div className="prose prose-stone max-w-none space-y-6 font-sans text-stone-700 leading-relaxed text-sm sm:text-base">
        <div className="p-6 bg-[#FFFDF9] border border-[#E6E0D4] rounded-2xl shadow-xs">
          <p className="font-medium text-[#1A1A18]">
            Nestora may participate in affiliate programs. When you purchase through certain links on our website, we may earn a commission at no additional cost to you.
          </p>
        </div>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">Our Commitment to Transparency</h2>
        <p>
          Nestora aims to provide useful design inspiration, interior lookbooks, and curated product recommendations for modern homes. In some cases, links to products or merchant retailers featured in our content may be affiliate links.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">No Additional Cost to You</h2>
        <p>
          Clicking an affiliate link or making a purchase through a recommendation on Nestora does NOT increase the price you pay. The referral fee is paid directly by the retailer as part of their standard marketing program.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">Retailer Pricing & Availability</h2>
        <p>
          Prices, product availability, shipping terms, warranties, and special promotions are determined and controlled exclusively by the third-party merchant or retailer. Nestora does not sell products directly, manage inventory, or guarantee specific prices or stock levels.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">Commercial Link Standards</h2>
        <p>
          Outbound commercial links on Nestora utilize standard <code className="text-xs bg-[#F4F0E8] px-2 py-1 rounded">rel="noopener sponsored"</code> attributes to adhere strictly to search engine guidelines and consumer disclosure practices. Commercial or sponsored content will never be presented as an unvarnished editorial endorsement without proper disclosure.
        </p>

        <div className="pt-6 border-t border-[#E6E0D4] text-xs text-stone-600">
          Have questions about our website policies or product recommendations? Please get in touch via our{' '}
          <Link href="/contact" className="underline font-medium text-[#2D392F]">
            Contact Page
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

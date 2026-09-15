import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE_CONFIG.name}`,
  description: 'Terms of service governing the public use of Nestora interior design website.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <h1 className="font-serif text-4xl font-semibold text-[#1A1A18]">
        Terms of Service
      </h1>
      <p className="text-xs text-stone-500 font-mono">Last updated: March 1, 2026</p>

      <div className="prose prose-stone max-w-none space-y-6 font-sans text-stone-700 leading-relaxed text-sm sm:text-base">
        <p>
          Welcome to <strong>{SITE_CONFIG.name}</strong>. By accessing our public website at <a href={SITE_CONFIG.url}>{SITE_CONFIG.url}</a>, you agree to comply with and be bound by the following terms of service.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">1. Public Inspiration Content</h2>
        <p>
          All articles, room lookbooks, architectural guides, and design recommendations published on Nestora are provided for general informational and aesthetic inspiration purposes. While we strive for accuracy, users should verify building codes and architectural structural limits with licensed professionals.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">2. Intellectual Property Rights</h2>
        <p>
          The Nestora trademark, custom branding, layout design, typography arrangements, and written editorial content are protected by applicable intellectual property laws. Content may not be copied, reproduced, or republished without written permission.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">3. Commercial & Affiliate Content</h2>
        <p>
          Certain curated product recommendations may contain affiliate links. Nestora makes no representations or warranties regarding third-party product performance, pricing changes, or merchant availability.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">4. Governing Law</h2>
        <p>
          These terms are governed by the laws of the jurisdiction in which Nestora operates.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_CONFIG } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_CONFIG.name}`,
  description: 'Nestora privacy policy details how data is handled across our public interior design publication.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <h1 className="font-serif text-4xl font-semibold text-[#1A1A18]">
        Privacy Policy
      </h1>
      <p className="text-xs text-stone-500 font-mono">Last updated: March 1, 2026</p>

      <div className="prose prose-stone max-w-none space-y-6 font-sans text-stone-700 leading-relaxed text-sm sm:text-base">
        <p>
          At <strong>{SITE_CONFIG.name}</strong>, available at <a href={SITE_CONFIG.url}>{SITE_CONFIG.url}</a>, we respect your privacy. Nestora is a public content and interior inspiration website. <strong>We do not require user account registration, passwords, or personal login profiles to access any portion of our public content.</strong>
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">1. Information We Collect</h2>
        <p>
          Because Nestora operates without user registration or account signups:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>No User Account Data:</strong> We do not collect names, passwords, or personal account credentials.</li>
          <li><strong>Optional Email Subscriptions:</strong> If you voluntarily subscribe to our weekly newsletter, we collect your email address solely to send interior lookbooks. You can unsubscribe at any time.</li>
          <li><strong>Standard Web Analytics:</strong> Like most publications, we may aggregate non-personally identifiable technical logs (IP address, browser type, referring URL) to measure site speed and popular pages.</li>
        </ul>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">2. Advertising & Third-Party Cookies</h2>
        <p>
          Nestora uses standard web technologies and may work with advertising partners (such as Google AdSense) to display advertisements. These partners may use cookies or web beacons to serve ads based on non-identifiable browsing patterns across websites.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">3. External & Affiliate Links</h2>
        <p>
          Our articles contain curated links to external merchant websites and affiliate partners. When you click an external link, third-party sites may set cookies to track referrals. Nestora is not responsible for the privacy practices of external third-party sites.
        </p>

        <h2 className="font-serif text-xl font-semibold text-[#1A1A18]">4. Contact Privacy Officer</h2>
        <p>
          For privacy inquiries, please contact us at <a href="mailto:privacy@nestora.com" className="underline">privacy@nestora.com</a>.
        </p>
      </div>
    </div>
  );
}

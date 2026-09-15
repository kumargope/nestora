import React from 'react';
import Link from 'next/link';

export default function AffiliateDisclosureNotice() {
  return (
    <div className="p-3 bg-[#F4F0E8]/70 border border-[#E6E0D4] rounded-lg text-[11px] text-stone-500 my-4 flex items-center justify-between">
      <p>
        <span className="font-semibold text-stone-700">Editorial Disclosure:</span> Nestora may earn an affiliate commission on products purchased through curated links on this page.
      </p>
      <Link href="/affiliate-disclosure" className="underline hover:text-stone-800 ml-2 font-medium shrink-0">
        Learn More
      </Link>
    </div>
  );
}

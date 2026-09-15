'use client';

import Script from 'next/script';

export default function AdsterraSocialBar() {
  const socialBarUrl = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_URL;

  if (!socialBarUrl) return null;

  return (
    <Script
      src={socialBarUrl}
      strategy="afterInteractive"
    />
  );
}

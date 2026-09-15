import React from 'react';
import AdsterraBanner from './AdsterraBanner';

interface AdPlaceholderProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  label?: string;
}

export default function AdPlaceholder({
  slot,
  format = 'auto',
  className = '',
  label = 'Advertisement Placement',
}: AdPlaceholderProps) {
  // Check for Adsterra Configuration first
  const adsterra728 = process.env.NEXT_PUBLIC_ADSTERRA_728X90_KEY;
  const adsterra300 = process.env.NEXT_PUBLIC_ADSTERRA_300X250_KEY;

  if (adsterra728 && (format === 'horizontal' || format === 'auto')) {
    return <AdsterraBanner adKey={adsterra728} format="728x90" className={className} />;
  }

  if (adsterra300 && (format === 'rectangle' || format === 'vertical')) {
    return <AdsterraBanner adKey={adsterra300} format="300x250" className={className} />;
  }

  // In production, when Google AdSense publisher ID is present in ENV, real AdSense script can render here.
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (adClient) {
    return (
      <div className={`ad-container overflow-hidden text-center my-6 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Clean Adsterra / AdSense Placeholder UI
  const isHorizontal = format === 'horizontal' || format === 'auto';
  const targetFormat = isHorizontal ? '728x90' : '300x250';

  return (
    <div
      className={`my-8 p-4 bg-[#F4F0E8]/60 border border-dashed border-[#E6E0D4] rounded-lg text-center flex flex-col items-center justify-center min-h-[90px] text-stone-400 select-none ${className}`}
      data-ad-slot-id={slot}
    >
      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 mb-1">
        {label} ({targetFormat})
      </span>
      <span className="text-xs text-stone-400 font-mono">
        Adsterra / AdSense Ready • Set NEXT_PUBLIC_ADSTERRA_{targetFormat.replace('x', 'X')}_KEY
      </span>
    </div>
  );
}

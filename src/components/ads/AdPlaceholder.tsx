import React from 'react';

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
  label = 'Advertisement Placeholder',
}: AdPlaceholderProps) {
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

  // Development/Production Placeholder UI
  return (
    <div
      className={`my-8 p-4 bg-[#F4F0E8]/60 border border-dashed border-[#E6E0D4] rounded-lg text-center flex flex-col items-center justify-center min-h-[100px] text-stone-400 select-none ${className}`}
      data-ad-slot-id={slot}
    >
      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-400 mb-1">
        {label}
      </span>
      <span className="text-xs text-stone-400 font-mono">
        Slot #{slot} • Google AdSense Space
      </span>
    </div>
  );
}

import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export default function AdBanner({ slot = 'header-leaderboard-01', className = '' }: AdBannerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      <AdPlaceholder slot={slot} format="horizontal" label="Leaderboard Ad Placement" className="min-h-[90px]" />
    </div>
  );
}

import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface SidebarAdProps {
  slot?: string;
}

export default function SidebarAd({ slot = 'sidebar-sticky-01' }: SidebarAdProps) {
  return (
    <div className="sticky top-28">
      <AdPlaceholder slot={slot} format="vertical" label="Sidebar Skyscraper Ad" className="min-h-[250px]" />
    </div>
  );
}

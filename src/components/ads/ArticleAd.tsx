import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface ArticleAdProps {
  slot?: string;
  position?: 'top' | 'middle' | 'bottom';
}

export default function ArticleAd({ slot = 'article-in-feed-01', position = 'middle' }: ArticleAdProps) {
  const labels = {
    top: 'Article Intro Ad Placement',
    middle: 'In-Article Ad Placement',
    bottom: 'End of Article Ad Placement',
  };

  return (
    <div className="my-8">
      <AdPlaceholder slot={`${slot}-${position}`} format="rectangle" label={labels[position]} className="min-h-[160px]" />
    </div>
  );
}

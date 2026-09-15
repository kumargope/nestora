import React from 'react';
import { ArticleSection } from '@/types';
import { IconLayers } from '@/components/ui/Icons';

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="p-6 bg-[#FFFDF9] rounded-xl border border-[#E6E0D4] shadow-xs my-8">
      <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 mb-4 pb-3 border-b border-[#F4F0E8]">
        <IconLayers size={16} className="text-[#2D392F]" />
        <span>In This Article</span>
      </div>
      <ul className="space-y-2.5 text-sm font-sans">
        {sections.map((section, idx) => (
          <li key={section.id || idx}>
            <a
              href={`#${section.id}`}
              className="text-stone-700 hover:text-[#2D392F] hover:underline transition-colors flex items-start space-x-2"
            >
              <span className="text-stone-400 font-mono text-xs">{idx + 1}.</span>
              <span>{section.title}</span>
            </a>
          </li>
        ))}
        {/* Anchor link to shop the look if available */}
        <li>
          <a
            href="#shop-the-look"
            className="text-[#2D392F] font-medium hover:underline transition-colors flex items-start space-x-2"
          >
            <span className="text-[#2D392F] font-mono text-xs">•</span>
            <span>Shop The Look (Affiliate Products)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

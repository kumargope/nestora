'use client';

import React from 'react';
import { IconPinterest } from '@/components/ui/Icons';
import { generatePinterestShareUrl } from '@/lib/utils';

interface PinterestShareButtonProps {
  url: string;
  mediaUrl: string;
  description: string;
  className?: string;
  variant?: 'badge' | 'button';
}

export default function PinterestShareButton({
  url,
  mediaUrl,
  description,
  className = '',
  variant = 'button',
}: PinterestShareButtonProps) {
  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    const pinUrl = generatePinterestShareUrl(url, mediaUrl, description);
    window.open(pinUrl, '_blank', 'width=750,height=600,scrollbars=yes');
  };

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handlePin}
        className={`inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer ${className}`}
        title="Pin to Pinterest"
      >
        <IconPinterest size={14} />
        <span>Save</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePin}
      className={`flex items-center justify-center space-x-2 bg-[#E60023] hover:bg-[#AD001A] text-white px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs ${className}`}
    >
      <IconPinterest size={16} />
      <span>Pin to Pinterest</span>
    </button>
  );
}

'use client';

import React, { useState } from 'react';
import { IconShare2, IconPinterest, IconCheck } from '@/components/ui/Icons';

interface SocialShareProps {
  title: string;
  url?: string;
  mediaUrl?: string;
}

export default function SocialShare({ title, mediaUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePinterestPin = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const media = mediaUrl || '';
      const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        currentUrl
      )}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(title)}`;
      window.open(pinUrl, '_blank', 'width=750,height=600');
    }
  };

  return (
    <div className="flex items-center space-x-3 py-4 border-y border-[#E6E0D4] my-6">
      <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 flex items-center space-x-1">
        <IconShare2 size={14} />
        <span>Share:</span>
      </span>

      {/* Pinterest Share */}
      <button
        type="button"
        onClick={handlePinterestPin}
        className="px-3 py-1.5 bg-[#E60023] hover:bg-[#AD001A] text-white text-xs font-medium rounded-md flex items-center space-x-1.5 transition-colors"
        title="Pin to Pinterest"
      >
        <IconPinterest size={14} />
        <span>Pinterest</span>
      </button>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="px-3 py-1.5 bg-[#F4F0E8] hover:bg-[#E8E2D5] text-stone-800 text-xs font-medium rounded-md flex items-center space-x-1.5 transition-colors"
      >
        {copied ? (
          <>
            <IconCheck size={14} className="text-emerald-700" />
            <span className="text-emerald-800">Copied!</span>
          </>
        ) : (
          <span>Copy Link</span>
        )}
      </button>
    </div>
  );
}

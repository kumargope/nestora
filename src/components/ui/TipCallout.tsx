import React from 'react';
import { IconSparkles } from '@/components/ui/Icons';

interface TipCalloutProps {
  title?: string;
  text: string;
}

export default function TipCallout({ title = 'Architectural Advice', text }: TipCalloutProps) {
  return (
    <div className="my-8 p-6 bg-[#F4F0E8] border-l-4 border-[#2D392F] rounded-r-xl shadow-xs">
      <div className="flex items-center space-x-2 text-[#2D392F] text-xs uppercase tracking-[0.2em] font-semibold mb-2">
        <IconSparkles size={16} />
        <span>{title}</span>
      </div>
      <p className="text-sm sm:text-base text-stone-800 font-sans leading-relaxed italic">
        "{text}"
      </p>
    </div>
  );
}

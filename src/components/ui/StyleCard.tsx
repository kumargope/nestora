import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StyleInfo } from '@/types';
import { IconSparkles } from '@/components/ui/Icons';

interface StyleCardProps {
  style: StyleInfo;
}

export default function StyleCard({ style }: StyleCardProps) {
  return (
    <Link
      href={`/style/${style.slug}`}
      className="group bg-[#FFFDF9] rounded-xl overflow-hidden border border-[#E6E0D4] hover:border-[#2D392F] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-stone-200">
          <Image
            src={style.heroImage}
            alt={style.heroImageAlt || style.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-[#FBF9F5]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#2D392F] flex items-center space-x-1">
            <IconSparkles size={12} />
            <span>Style Guide</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-xl font-semibold text-[#1A1A18] group-hover:text-[#2D392F] transition-colors mb-1">
            {style.name}
          </h3>
          <p className="text-xs text-stone-500 font-sans line-clamp-2 leading-relaxed mb-4">
            {style.tagline}
          </p>

          {/* Color Palette Preview Dots */}
          <div className="flex items-center space-x-1.5 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium mr-1">Palette:</span>
            {style.colorPalette.map((color, idx) => (
              <span
                key={idx}
                className="w-4 h-4 rounded-full border border-stone-300 inline-block shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-3.5 bg-[#F4F0E8] border-t border-[#E6E0D4] flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-700 group-hover:text-[#2D392F]">
        <span>Explore Style</span>
        <span>→</span>
      </div>
    </Link>
  );
}

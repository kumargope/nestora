import React from 'react';
import { Product } from '@/types';
import AffiliateProductCard from './AffiliateProductCard';
import AffiliateDisclosureNotice from './AffiliateDisclosureNotice';
import { IconSparkles } from '@/components/ui/Icons';

interface ShopTheLookProps {
  products?: Product[];
  title?: string;
}

export default function ShopTheLook({ products, title = 'Shop The Look' }: ShopTheLookProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="shop-the-look" className="my-12 p-6 sm:p-8 bg-[#F4F0E8]/50 border border-[#E6E0D4] rounded-2xl">
      <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#2D392F] mb-1">
        <IconSparkles size={16} />
        <span>Curated Furniture & Decor</span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1A18] mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-stone-600 font-sans mb-6">
        Recreate this interior aesthetic with handpicked furniture, lighting, and decor pieces.
      </p>

      <AffiliateDisclosureNotice />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product, index) => (
          <AffiliateProductCard key={product.id || `${product.name || 'item'}-${index}`} product={product} />
        ))}
      </div>
    </section>
  );
}

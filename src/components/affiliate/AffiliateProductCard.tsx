import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { buildAmazonAffiliateUrl } from '@/lib/utils';
import { IconExternalLink, IconShoppingBag } from '@/components/ui/Icons';

interface AffiliateProductCardProps {
  product: Product;
}

export default function AffiliateProductCard({ product }: AffiliateProductCardProps) {
  const outboundUrl = buildAmazonAffiliateUrl(product.name || '', product.affiliateUrl);

  return (
    <div className="bg-[#FFFDF9] rounded-xl border border-[#E6E0D4] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
      
      {/* Product Image */}
      <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
        <Image
          src={product.image || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80'}
          alt={product.name || 'Product Image'}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs font-mono">
          {product.price}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block mb-1">
            Merchant: {product.merchant}
          </span>
          <h4 className="font-serif text-base font-semibold text-[#1A1A18] line-clamp-1 mb-1">
            {product.name}
          </h4>
          <p className="text-xs text-stone-600 line-clamp-2 font-sans mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buy Now Outbound Button */}
        <a
          href={outboundUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full py-3 px-4 bg-[#2D392F] hover:bg-[#1E2720] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs hover:shadow-md flex items-center justify-center space-x-2 group/btn cursor-pointer"
        >
          <IconShoppingBag size={15} className="transition-transform group-hover/btn:scale-110" />
          <span>Buy Now</span>
          <IconExternalLink size={13} className="opacity-80" />
        </a>
      </div>

    </div>
  );
}

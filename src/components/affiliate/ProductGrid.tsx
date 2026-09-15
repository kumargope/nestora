import React from 'react';
import { Product } from '@/types';
import AffiliateProductCard from './AffiliateProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <AffiliateProductCard key={product.id || `${product.name || 'item'}-${index}`} product={product} />
      ))}
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { IconChevronRight } from '@/components/ui/Icons';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center space-x-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
        <li>
          <Link href="/" className="hover:text-[#2D392F] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <IconChevronRight size={12} className="text-stone-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[#2D392F] transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

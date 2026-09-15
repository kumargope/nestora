import React from 'react';
import { Article } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
  type: 'WebSite' | 'Organization' | 'Article' | 'BreadcrumbList';
  article?: Article;
  breadcrumbs?: { name: string; url: string }[];
}

export default function JsonLd({ type, article, breadcrumbs }: JsonLdProps) {
  let schema: Record<string, unknown> = {};

  if (type === 'WebSite') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (type === 'Organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      sameAs: [
        'https://pinterest.com/nestora',
        'https://instagram.com/nestoradesign',
      ],
    };
  } else if (type === 'Article' && article) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: [article.heroImage],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_CONFIG.url}/article/${article.slug}`,
      },
    };
  } else if (type === 'BreadcrumbList' && breadcrumbs) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

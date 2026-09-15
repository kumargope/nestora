import { MetadataRoute } from 'next';
import { ARTICLES_DATA } from '@/data/articles';
import { ROOMS_DATA } from '@/data/rooms';
import { STYLES_DATA } from '@/data/styles';
import { CATEGORIES_DATA } from '@/data/categories';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Static routes
  const staticRoutes = [
    '',
    '/ideas',
    '/search',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/affiliate-disclosure',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Room routes
  const roomRoutes = Object.keys(ROOMS_DATA).map((slug) => ({
    url: `${baseUrl}/room/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Style routes
  const styleRoutes = Object.keys(STYLES_DATA).map((slug) => ({
    url: `${baseUrl}/style/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category routes
  const categoryRoutes = Object.keys(CATEGORIES_DATA).map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Article routes
  const articleRoutes = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: article.updatedAt || article.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...roomRoutes, ...styleRoutes, ...categoryRoutes, ...articleRoutes];
}

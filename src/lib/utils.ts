import { SITE_CONFIG } from './constants';

export function formatDate(dateString?: string): string {
  if (!dateString) return 'Recent';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function buildAmazonAffiliateUrl(
  keywordOrTitle: string,
  originalUrl?: string,
  customTag?: string
): string {
  const affiliateTag = customTag || SITE_CONFIG.affiliateTag || 'amzfinds063-20';
  const amazonDomain = SITE_CONFIG.amazonDomain || 'www.amazon.com';

  // 1. If originalUrl is already an Amazon link, ensure affiliate tag is attached
  if (originalUrl && (originalUrl.includes('amazon.') || originalUrl.includes('amzn.to'))) {
    try {
      const url = new URL(originalUrl);
      url.searchParams.set('tag', affiliateTag);
      return url.toString();
    } catch {
      return originalUrl;
    }
  }

  // 2. If originalUrl is a valid real external link (not example.com)
  if (originalUrl && !originalUrl.includes('example.com') && originalUrl.startsWith('http')) {
    try {
      const url = new URL(originalUrl);
      url.searchParams.set('tag', affiliateTag);
      url.searchParams.set('utm_source', 'nestora');
      return url.toString();
    } catch {
      return originalUrl;
    }
  }

  // 3. Generate targeted Amazon affiliate search query for the specific product or article title
  const cleanKeyword = (keywordOrTitle || 'home decor')
    .replace(/\s*\(\d+\)$/, '') // remove trailing batch numbers like "(1)"
    .replace(/[\[\]]/g, ' ')     // remove brackets
    .replace(/\s+/g, ' ')
    .trim();

  return `https://${amazonDomain}/s?k=${encodeURIComponent(cleanKeyword)}&tag=${encodeURIComponent(affiliateTag)}`;
}

export function buildAffiliateUrl(
  originalUrl?: string,
  merchant?: string,
  productTitle?: string
): string {
  return buildAmazonAffiliateUrl(productTitle || '', originalUrl);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generatePinterestShareUrl(url: string, mediaUrl: string, description: string): string {
  const pinUrl = new URL('https://pinterest.com/pin/create/button/');
  pinUrl.searchParams.set('url', url);
  pinUrl.searchParams.set('media', mediaUrl);
  pinUrl.searchParams.set('description', description);
  return pinUrl.toString();
}

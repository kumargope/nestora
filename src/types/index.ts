export type RoomSlug =
  | 'bedroom'
  | 'living-room'
  | 'kitchen'
  | 'bathroom'
  | 'dining-room'
  | 'home-office'
  | 'outdoor'
  | 'outdoor-space'
  | 'architecture'
  | 'wood'
  | 'lighting'
  | 'rugs'
  | 'patio';

export type StyleSlug =
  | 'japandi'
  | 'modern'
  | 'minimalist'
  | 'scandinavian'
  | 'luxury'
  | 'contemporary'
  | 'industrial'
  | 'bohemian'
  | 'boho' // added for compatibility
  | 'coastal'
  | 'traditional'
  | 'mediterranean';

export interface Product {
  id?: string;
  name?: string;
  merchant?: string;
  description?: string;
  price?: string;
  currency?: string;
  image?: string;
  affiliateUrl?: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
  store?: string; // optional store property
  link?: string; // optional link property for external URL
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  tip?: {
    title: string;
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  categorySlug?: string; // optional slug for category
  room?: string; // optional original room field
  style?: string; // optional original style field
  roomSlug: RoomSlug;
  styleSlug: StyleSlug;
  heroImage: string;
  heroImageAlt: string;
  heroImageCaption?: string;
  publishDate?: string; // optional original publishDate field
  publishedAt?: string;
  readTime?: string; // optional original readTime field
  imageUrl?: string; // optional original imageUrl field
  imageAlt?: string; // optional original imageAlt field
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  toc?: { id: string; title: string }[];
  content?: string;
  updatedAt: string;
  readingTime: string;
  featured?: boolean;
  trending?: boolean;
  sections: ArticleSection[];
  shopTheLook?: Product[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface RoomInfo {
  slug: RoomSlug;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  popularSearches: string[];
  keyTips: string[];
}

export interface StyleInfo {
  slug: StyleSlug;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  characteristics: string[];
  colorPalette: { name: string; hex: string }[];
  keyMaterials: string[];
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
}

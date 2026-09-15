# NESTORA — Premium Interior Design & Home Inspiration

> **"Beautiful Ideas for Better Homes"**

Nestora is a production-quality, editorial-style interior design and architectural inspiration website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

It targets English-speaking home enthusiasts across the US, UK, Canada, Australia, and worldwide, showcasing curated room lookbooks, interior styles (Japandi, Minimalist, Modern, Scandinavian, Luxury, etc.), architectural guidelines, and shop-the-look affiliate product curation.

---

## 🌟 Key Architecture Highlights

- **100% Public Access (Zero Auth Friction)**: No login, signup, password, or account creation popups. Every visitor can freely browse all articles, rooms, styles, and search features immediately.
- **Luxury Minimal Aesthetic**: Refined editorial color scheme featuring warm whites, soft beige, light stone, charcoal, and muted forest green accents.
- **Monetization Ready**: Built-in Google AdSense placeholders (`AdPlaceholder`, `AdBanner`, `ArticleAd`, `SidebarAd`) and environment-variable driven affiliate links (`ShopTheLook`, `AffiliateProductCard`, `ProductGrid`).
- **Pinterest Optimization**: Custom Pinterest pinning buttons (`PinterestShareButton`) with tall image support and open graph metadata.
- **Technical SEO Engine**: Dynamic `sitemap.xml`, `robots.txt`, Schema.org JSON-LD scripts (`Article`, `BreadcrumbList`, `WebSite`, `Organization`), semantic HTML, and metadata API.
- **Structured Data System**: Reusable TypeScript data models in `src/data/` designed for seamless future migration to a Headless CMS or PostgreSQL/Supabase database.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

```bash
# Clone or navigate to the nestora workspace folder
cd nestora

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore Nestora.

### Production Build

```bash
# Build static pages and TypeScript typecheck
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
nestora/
├── public/                     # Static public assets
├── src/
│   ├── app/                    # Next.js App Router pages & API handlers
│   │   ├── layout.tsx          # Root layout & global metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── ideas/page.tsx      # Filterable Inspiration catalog
│   │   ├── room/[slug]/        # Dynamic Room pages (Bedroom, Kitchen, etc.)
│   │   ├── style/[slug]/       # Dynamic Style pages (Japandi, Modern, etc.)
│   │   ├── category/[slug]/    # Dynamic Category pages (Lighting, Decor, etc.)
│   │   ├── article/[slug]/     # Magazine Editorial Article page with TOC & Shop The Look
│   │   ├── search/page.tsx     # Instant local/multi-field search engine
│   │   ├── about/page.tsx      # About Nestora & Design Philosophy
│   │   ├── contact/page.tsx    # Contact form
│   │   ├── privacy-policy/     # Privacy Policy (No auth notice)
│   │   ├── terms/              # Terms of Service
│   │   ├── affiliate-disclosure/ # Dedicated Affiliate Disclosure page
│   │   ├── sitemap.ts          # Dynamic sitemap generator
│   │   ├── robots.ts           # Dynamic robots.txt generator
│   │   └── not-found.tsx       # Custom 404 page
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileNav
│   │   ├── ui/                 # ArticleCard, RoomCard, StyleCard, Breadcrumbs, Icons, TipCallout, TableOfContents, PinterestShareButton, SocialShare, NewsletterBox
│   │   ├── ads/                # AdPlaceholder, AdBanner, ArticleAd, SidebarAd
│   │   ├── affiliate/          # ShopTheLook, AffiliateProductCard, ProductGrid, AffiliateDisclosureNotice
│   │   └── seo/                # JsonLd Schema.org script generator
│   ├── data/
│   │   ├── articles.ts         # Editorial articles data catalog
│   │   ├── rooms.ts            # Rooms dataset & tips
│   │   ├── styles.ts           # Styles dataset & color palettes
│   │   ├── categories.ts       # Decor categories dataset
│   │   └── products.ts         # Sample affiliate products dataset
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── lib/
│       ├── constants.ts        # Navigation links & site configuration
│       └── utils.ts            # Helper functions, affiliate link builders, dates
```

---

## ✍️ How to Add New Articles

Articles are stored as structured TypeScript objects in [`src/data/articles.ts`](file:///C:/Users/Mukesh/.gemini/antigravity/scratch/nestora/src/data/articles.ts).

To add a new article:

1. Open `src/data/articles.ts`.
2. Append a new `Article` object following the `Article` interface defined in `src/types/index.ts`:

```typescript
{
  id: 'art-31',
  slug: 'your-custom-article-slug',
  title: 'Article Title Here',
  subtitle: 'Inspiring subtitle text...',
  excerpt: 'Short excerpt describing the article...',
  category: 'Bedroom',
  roomSlug: 'bedroom',
  styleSlug: 'japandi',
  heroImage: 'https://images.unsplash.com/...',
  heroImageAlt: 'Alt text for image',
  author: { name: 'Elena Vance', role: 'Editor', avatar: '...' },
  publishedAt: '2026-03-10',
  readingTime: '6 min read',
  featured: true,
  sections: [
    {
      id: 'sec-1',
      title: '1. First Design Tip',
      content: 'Detailed editorial explanation...',
      image: 'https://images.unsplash.com/...',
      imageAlt: 'Image description',
      tip: {
        title: 'Architectural Advice',
        text: 'Actionable pro tip...'
      }
    }
  ],
  tags: ['Bedroom', 'Japandi', 'Lighting'],
  seoTitle: 'SEO Optimized Title | NESTORA',
  seoDescription: 'Meta description for Google search...'
}
```

3. Save the file. Next.js will automatically generate the dynamic route at `/article/your-custom-article-slug` and add it to `sitemap.xml`.

---

## 🖼️ How to Replace Images

Nestora uses high-resolution interior photography from Unsplash via Next.js `Image` optimization.

- All image remote patterns are configured in `next.config.ts`.
- To use your own licensed images, upload image files to the `public/images/` folder and update the image path string in `src/data/articles.ts` (e.g. `/images/my-bedroom.jpg`).

---

## 🛍️ How to Configure Affiliate Links

Outbound affiliate product links are managed via [`src/lib/utils.ts`](file:///C:/Users/Mukesh/.gemini/antigravity/scratch/nestora/src/lib/utils.ts) and `.env`.

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update your affiliate tag ID:
   ```env
   NEXT_PUBLIC_AFFILIATE_TAG=your-amazon-tag-20
   ```
3. Outbound product links in `ShopTheLook` and `AffiliateProductCard` automatically append `rel="noopener sponsored"` and attach your tag or UTM parameters.

---

## 📢 How to Enable Google AdSense

1. Create a `.env` file and set your Google AdSense Publisher ID:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
   ```
2. The ad components in `src/components/ads/` (`AdBanner`, `ArticleAd`, `SidebarAd`) will automatically switch from development placeholders to real `adsbygoogle` tags.

---

## 📄 License & Copyright

© 2026 **NESTORA**. All rights reserved. "Beautiful Ideas for Better Homes".

export const SITE_CONFIG = {
  name: 'NESTORA',
  tagline: 'Beautiful Ideas for Better Homes',
  description: 'Nestora is a home inspiration platform featuring interior design ideas, room guides, decorating inspiration, and design styles for modern homes.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nestora.com',
  affiliateTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || process.env.NEXT_PUBLIC_AFFILIATE_TAG || 'amzfinds063-20',
  amazonDomain: process.env.NEXT_PUBLIC_AMAZON_DOMAIN || 'www.amazon.com',
  defaultAuthor: {
    name: 'Nestora Editorial',
    role: 'Nestora Desk',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Rooms', href: '/room/bedroom' },
  { name: 'Styles', href: '/style/japandi' },
  { name: 'Decor', href: '/category/decor' },
  { name: 'Small Spaces', href: '/category/small-spaces' },
  { name: 'About', href: '/about' },
  { name: 'Pinterest Bot', href: '/pinterest-bot' },
];

export const ROOM_NAVIGATION = [
  { name: 'Bedroom', slug: 'bedroom', count: '45+ Ideas' },
  { name: 'Living Room', slug: 'living-room', count: '60+ Ideas' },
  { name: 'Kitchen', slug: 'kitchen', count: '40+ Ideas' },
  { name: 'Bathroom', slug: 'bathroom', count: '30+ Ideas' },
  { name: 'Dining Room', slug: 'dining-room', count: '25+ Ideas' },
  { name: 'Home Office', slug: 'home-office', count: '35+ Ideas' },
  { name: 'Outdoor Space', slug: 'outdoor-space', count: '20+ Ideas' },
];

export const STYLE_NAVIGATION = [
  { name: 'Japandi', slug: 'japandi', desc: 'Japanese functional minimalism meets Scandinavian warmth.' },
  { name: 'Modern', slug: 'modern', desc: 'Clean lines, sleek materials, and sophisticated spatial balance.' },
  { name: 'Minimalist', slug: 'minimalist', desc: 'Focus on essential form, light, and serene clutter-free spaces.' },
  { name: 'Scandinavian', slug: 'scandinavian', desc: 'Airy interiors, natural textures, and cozy hygge aesthetics.' },
  { name: 'Luxury', slug: 'luxury', desc: 'Opulent textures, brass accents, marble finishes, and architectural majesty.' },
  { name: 'Contemporary', slug: 'contemporary', desc: 'Fluid current design trends featuring curved furniture and bold statements.' },
  { name: 'Industrial', slug: 'industrial', desc: 'Raw concrete, exposed brick, dark iron frame work, and warm timber.' },
  { name: 'Bohemian', slug: 'bohemian', desc: 'Eclectic textiles, layered greenery, artisan pottery, and global influences.' },
  { name: 'Coastal', slug: 'coastal', desc: 'Breezy linen textures, light oak floors, ocean hues, and natural sunlight.' },
  { name: 'Traditional', slug: 'traditional', desc: 'Timeless mouldings, classic portraiture, warm woods, and rich upholstery.' },
];

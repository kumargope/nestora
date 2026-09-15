import { Article } from '@/types';

// Comprehensive synonym & semantic related keywords mapping
export const SYNONYM_MAP: Record<string, string[]> = {
  // Living & Seating
  sofa: ['couch', 'sectional', 'loveseat', 'seating', 'chaise', 'futon', 'lounge', 'living room'],
  couch: ['sofa', 'sectional', 'seating', 'loveseat', 'living room'],
  sectional: ['sofa', 'couch', 'modular sofa', 'living room', 'seating'],
  chair: ['accent chair', 'armchair', 'recliner', 'seating', 'stool', 'seat', 'bench', 'desk chair'],
  recliner: ['chair', 'armchair', 'accent chair', 'lounge', 'seating'],
  table: ['coffee table', 'side table', 'console', 'desk', 'dining table', 'nightstand', 'end table'],
  desk: ['table', 'workstation', 'study desk', 'office desk', 'home office', 'computer desk'],
  
  // Bedroom & Sleep
  bed: ['bedroom', 'bedframe', 'mattress', 'headboard', 'bedding', 'bunk bed', 'duvet', 'linen', 'sleeping'],
  bedroom: ['bed', 'master bedroom', 'wardrobe', 'nightstand', 'headboard', 'dresser', 'closet'],
  wardrobe: ['closet', 'dresser', 'storage', 'bedroom', 'cabinet'],
  nightstand: ['bedside table', 'side table', 'bedroom'],
  
  // Lighting
  light: ['lighting', 'lamp', 'chandelier', 'pendant', 'sconce', 'lantern', 'fixture', 'bulb', 'illumination'],
  lighting: ['light', 'lamp', 'chandelier', 'pendant', 'sconce', 'ambient', 'floor lamp', 'desk lamp', 'ceiling light'],
  lamp: ['lighting', 'light', 'floor lamp', 'desk lamp', 'table lamp', 'sconce', 'lantern'],
  chandelier: ['lighting', 'pendant light', 'ceiling light', 'fixture', 'crystal light'],
  sconce: ['wall light', 'lighting', 'wall sconce', 'fixture'],
  
  // Rugs & Floors
  rug: ['carpet', 'rugs', 'runner', 'mat', 'floor mat', 'textile', 'jute', 'wool rug'],
  carpet: ['rug', 'rugs', 'runner', 'mat', 'floor'],
  floor: ['flooring', 'hardwood', 'wood', 'rug', 'carpet', 'tile'],
  
  // Decor & Art
  art: ['wall art', 'wall decor', 'canvas', 'painting', 'frame', 'poster', 'sculpture', 'prints', 'printable art'],
  decor: ['accessories', 'art', 'vase', 'candle', 'sculpture', 'styling', 'plants', 'home decor', 'wall hanging', 'macrame'],
  mirror: ['vanity mirror', 'wall mirror', 'bathroom mirror', 'full length mirror', 'compact mirror'],
  wall: ['wall decor', 'wall art', 'wallpaper', 'panels', 'floating shelves', 'gallery wall', 'wall hanging', 'prints'],
  candle: ['candles', 'scented candle', 'candle making', 'soy candle', 'decor', 'warm ambiance', 'holder', 'wick'],
  vase: ['vases', 'ceramic vase', 'flower vase', 'planter', 'pottery'],
  clock: ['wall clock', 'timepiece', 'wall decor'],

  // Printables, Crafts & DIY
  planner: ['meal planner', 'budget tracker', 'journal', 'workout log', 'printable', 'stationery', 'organization', 'calendar'],
  journal: ['planner', 'gratitude journal', 'mental health journal', 'diary', 'printable', 'stationery', 'notebook'],
  printable: ['planner', 'art prints', 'wall art', 'flashcards', 'coloring pages', 'tracker', 'stationery', 'crafts'],
  craft: ['diy', 'crochet', 'knitting', 'macrame', 'embroidery', 'sewing', 'resin', 'polymer clay', 'paper craft', 'handcrafted'],
  soap: ['soap making', 'melt and pour', 'bath bomb', 'handcrafted soap', 'skincare', 'bath'],
  resin: ['epoxy resin', 'resin art', 'silicone mold', 'coasters', 'craft'],
  macrame: ['wall hanging', 'boho decor', 'plant hanger', 'cotton cord', 'craft', 'knotting', 'wall art'],
  stationery: ['planner', 'stickers', 'journal', 'washi tape', 'greeting cards', 'notebook', 'envelopes'],
  
  // Plants & Greenery
  plant: ['plants', 'green decor', 'indoor plant', 'succulent', 'planter', 'botanical', 'hanging plant', 'tree', 'flora'],
  plants: ['plant', 'green decor', 'indoor plant', 'succulent', 'planter', 'botanical', 'greenery'],
  flower: ['plant', 'plants', 'vase', 'botanical', 'floral', 'indoor plant'],
  planter: ['plant pot', 'plants', 'flower pot', 'vase'],
  
  // Wood & Materials
  wood: ['timber', 'oak', 'teak', 'walnut', 'hardwood', 'fluted', 'slatted', 'joinery', 'panel', 'wooden'],
  timber: ['wood', 'hardwood', 'oak', 'walnut', 'joinery', 'timber wood'],
  stone: ['marble', 'travertine', 'granite', 'limestone', 'quartzite', 'concrete'],
  marble: ['stone', 'countertop', 'island', 'luxury', 'table'],
  
  // Kitchen, Cookware & Dining
  kitchen: ['cook', 'cabinet', 'island', 'countertop', 'pantry', 'backsplash', 'sink', 'cookware', 'kitchen tools', 'appliances'],
  cookware: ['frying pan', 'cast iron', 'dutch oven', 'skillet', 'saucepan', 'pot', 'pan', 'baking dish', 'wok'],
  pan: ['frying pan', 'skillet', 'saucepan', 'cookware', 'wok', 'baking pan', 'sheet pan'],
  pot: ['stock pot', 'dutch oven', 'saucepan', 'cookware', 'steamer', 'pressure cooker'],
  skillet: ['frying pan', 'cast iron', 'cookware', 'pan'],
  knife: ['chef knife', 'santoku', 'paring knife', 'cleaver', 'bread knife', 'knife set', 'kitchen tools'],
  blender: ['mixer', 'food processor', 'juicer', 'smoothie', 'appliances', 'hand mixer'],
  oven: ['toaster oven', 'microwave', 'dutch oven', 'convection oven', 'appliances'],
  toaster: ['toaster oven', '4 slice toaster', 'appliances', 'bread maker'],
  coffee: ['espresso', 'french press', 'coffee maker', 'coffee grinder', 'mug', 'latte', 'cappuccino'],
  kettle: ['electric kettle', 'gooseneck kettle', 'tea maker', 'teapot'],
  mug: ['coffee mug', 'tea cup', 'travel mug', 'tumbler', 'cup', 'drinkware'],
  glass: ['water glass', 'wine glass', 'tumbler', 'cocktail glass', 'champagne', 'drinkware', 'highball'],
  bottle: ['water bottle', 'insulated bottle', 'flask', 'pitcher', 'thermos', 'drinkware'],
  baking: ['baking dish', 'cake pan', 'muffin pan', 'rolling pin', 'mixing bowl', 'cooling rack', 'pastry'],
  dining: ['dining table', 'dining room', 'dining chairs', 'bar stool', 'sideboard', 'dinner table', 'dinnerware'],
  cabinet: ['cupboard', 'storage', 'kitchen cabinets', 'wardrobe', 'pantry'],
  
  // Bathroom & Spa
  bathroom: ['bath', 'shower', 'tub', 'freestanding tub', 'vanity', 'sink', 'faucet', 'spa', 'tiles', 'washroom'],
  bath: ['bathroom', 'tub', 'soaking tub', 'shower', 'spa', 'jacuzzi'],
  shower: ['bathroom', 'shower curtain', 'rain shower', 'tiles', 'washroom'],
  tub: ['bathtub', 'freestanding tub', 'soak tub', 'bathroom'],
  
  // Outdoor & Patio
  patio: ['outdoor', 'terrace', 'balcony', 'garden', 'deck', 'pergola', 'fire pit', 'outdoor furniture', 'lounge'],
  outdoor: ['patio', 'terrace', 'garden', 'backyard', 'veranda', 'pergola'],
  garden: ['outdoor', 'patio', 'plants', 'greenery', 'backyard'],
  pergola: ['patio', 'outdoor canopy', 'shade', 'terrace'],
  
  // Storage & Organization
  storage: ['organizer', 'shelving', 'basket', 'closet', 'drawer', 'rack', 'box', 'organization', 'holder'],
  organizer: ['storage', 'shelf', 'holder', 'rack', 'basket', 'container', 'storage box', 'caddy'],
  shelf: ['shelves', 'floating shelf', 'bookshelf', 'storage', 'bookcase', 'display shelf'],
  basket: ['storage basket', 'woven basket', 'organizer', 'hamper'],
  
  // Beauty & Skincare
  beauty: ['skincare', 'makeup', 'cosmetic', 'facial', 'vanity', 'self care', 'wellness', 'spa', 'grooming'],
  skincare: ['beauty', 'facial', 'face', 'skin', 'cleansing', 'cream', 'serum', 'roller', 'mask', 'scrub'],
  facial: ['skincare', 'face', 'gua sha', 'roller', 'cleansing brush', 'steamer', 'mask', 'face care'],
  face: ['facial', 'skincare', 'face scrubber', 'mask', 'gua sha', 'cleanser'],
  makeup: ['cosmetics', 'brush', 'sponge', 'powder', 'foundation', 'lipstick', 'eyeshadow', 'blush', 'vanity', 'concealer'],
  cosmetic: ['makeup', 'beauty', 'organizer', 'bag', 'case', 'skincare', 'cosmetics'],
  brush: ['makeup brush', 'facial cleansing brush', 'hair brush', 'spoolie', 'round brush', 'paddle brush'],
  hair: ['claw clips', 'scrunchies', 'headband', 'dryer', 'flat iron', 'curler', 'comb', 'bonnet', 'styling'],
  nail: ['manicure', 'pedicure', 'nail file', 'nail polish', 'cuticle', 'clippers', 'press on nails', 'nail drill'],
  vanity: ['makeup organizer', 'dressing table', 'mirror', 'cosmetic storage', 'brush holder', 'vanity table'],
  spa: ['wellness', 'relaxation', 'skincare', 'bath', 'massage', 'self care', 'spa headband', 'facial'],
  
  // Aesthetic Styles
  minimalist: ['minimal', 'clean', 'simple', 'monochrome', 'sleek', 'modern'],
  japandi: ['wabi sabi', 'japanese', 'scandinavian', 'zen', 'organic wood', 'nordic'],
  modern: ['contemporary', 'sleek', 'stylish', 'mid century', 'architectural'],
  luxury: ['glam', 'high end', 'elegant', 'premium', 'gold', 'marble', 'velvet', 'luxurious'],
  cozy: ['warm', 'aesthetic', 'soft', 'hygge', 'blanket', 'cushion', 'throw pillow']
};

// Normalize and stem basic English words
export function normalizeWord(word: string): string {
  let w = word.toLowerCase().trim().replace(/[^\w\s]/g, '');
  if (w.endsWith('ies')) {
    w = w.slice(0, -3) + 'y';
  } else if (w.endsWith('es') && w.length > 4) {
    w = w.slice(0, -2);
  } else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    w = w.slice(0, -1);
  } else if (w.endsWith('ing') && w.length > 5) {
    w = w.slice(0, -3);
  }
  return w;
}

// Get expanded list of search terms (original + stems + synonyms)
export function expandSearchTerms(query: string): {
  originalTokens: string[];
  stemmedTokens: string[];
  synonymTokens: string[];
  allTokens: string[];
} {
  const rawTokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const originalTokens = Array.from(new Set(rawTokens));
  const stemmedTokens = Array.from(new Set(originalTokens.map(normalizeWord)));
  
  const synonyms: string[] = [];
  
  for (const token of originalTokens) {
    const norm = normalizeWord(token);
    // Check direct
    if (SYNONYM_MAP[token]) {
      synonyms.push(...SYNONYM_MAP[token]);
    }
    // Check normalized
    if (SYNONYM_MAP[norm]) {
      synonyms.push(...SYNONYM_MAP[norm]);
    }
  }

  // Also check if entire query is a multi-word key
  const cleanQ = query.toLowerCase().trim();
  if (SYNONYM_MAP[cleanQ]) {
    synonyms.push(...SYNONYM_MAP[cleanQ]);
  }

  const synonymTokens = Array.from(new Set(synonyms.map((s) => s.toLowerCase())));
  const allTokens = Array.from(new Set([...originalTokens, ...stemmedTokens, ...synonymTokens]));

  return { originalTokens, stemmedTokens, synonymTokens, allTokens };
}

export interface SearchMatchResult {
  article: Article;
  score: number;
  matchedTerms: string[];
  matchedFields: string[];
}

/**
 * Intelligent Smart Search across articles with fuzzy matching,
 * synonym expansion, partial hits, and relevance ranking.
 */
export function searchArticles(articles: Article[], query: string): SearchMatchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  const { originalTokens, stemmedTokens, synonymTokens } = expandSearchTerms(cleanQuery);
  const results: SearchMatchResult[] = [];

  for (const article of articles) {
    const title = article.title.toLowerCase();
    const subtitle = (article.subtitle || '').toLowerCase();
    const excerpt = (article.excerpt || '').toLowerCase();
    const category = (article.category || '').toLowerCase();
    const categorySlug = (article.categorySlug || '').toLowerCase();
    const room = (article.room || '').toLowerCase();
    const roomSlug = (article.roomSlug || '').toLowerCase();
    const style = (article.style || '').toLowerCase();
    const styleSlug = (article.styleSlug || '').toLowerCase();
    const tags = (article.tags || []).map((t) => t.toLowerCase());
    const shopProducts = (article.shopTheLook || []).map((p) => (p.name || '').toLowerCase());

    const allText = `${title} ${subtitle} ${excerpt} ${category} ${categorySlug} ${room} ${roomSlug} ${style} ${styleSlug} ${tags.join(' ')} ${shopProducts.join(' ')}`;

    let score = 0;
    const matchedTerms = new Set<string>();
    const matchedFields = new Set<string>();

    // 1. EXACT PHRASE MATCHING (Highest priority)
    if (title === cleanQuery) {
      score += 600;
      matchedTerms.add(cleanQuery);
      matchedFields.add('exact-title');
    } else if (title.includes(cleanQuery)) {
      score += 400;
      matchedTerms.add(cleanQuery);
      matchedFields.add('title');
    }

    if (tags.some((t) => t === cleanQuery || t.includes(cleanQuery))) {
      score += 250;
      matchedTerms.add(cleanQuery);
      matchedFields.add('tags');
    }

    if (roomSlug === cleanQuery || room.includes(cleanQuery) || category.includes(cleanQuery)) {
      score += 200;
      matchedTerms.add(cleanQuery);
      matchedFields.add('room/category');
    }

    // 2. INDIVIDUAL TERM MATCHING (Partial & Multi-keyword)
    let originalTermsMatched = 0;

    for (const term of originalTokens) {
      let termMatched = false;

      // In title
      if (title.includes(term)) {
        score += 120;
        termMatched = true;
        matchedFields.add('title');
      }
      // In tags
      if (tags.some((t) => t.includes(term))) {
        score += 90;
        termMatched = true;
        matchedFields.add('tags');
      }
      // In category / room / style
      if (category.includes(term) || room.includes(term) || roomSlug.includes(term) || style.includes(term) || styleSlug.includes(term)) {
        score += 70;
        termMatched = true;
        matchedFields.add('category/style');
      }
      // In subtitle / excerpt
      if (subtitle.includes(term) || excerpt.includes(term)) {
        score += 50;
        termMatched = true;
        matchedFields.add('description');
      }
      // In shop products
      if (shopProducts.some((p) => p.includes(term))) {
        score += 40;
        termMatched = true;
        matchedFields.add('products');
      }

      if (termMatched) {
        originalTermsMatched++;
        matchedTerms.add(term);
      }
    }

    // 3. STEMMED TERM MATCHING (Handling plurals/variations)
    for (const stem of stemmedTokens) {
      if (allText.includes(stem)) {
        score += 40;
        matchedTerms.add(stem);
        matchedFields.add('stem');
      }
    }

    // 4. SYNONYM & SEMANTIC MATCHING (Bringing related ideas)
    for (const syn of synonymTokens) {
      if (title.includes(syn)) {
        score += 60;
        matchedTerms.add(syn);
        matchedFields.add('synonym-title');
      } else if (tags.some((t) => t.includes(syn))) {
        score += 45;
        matchedTerms.add(syn);
        matchedFields.add('synonym-tag');
      } else if (allText.includes(syn)) {
        score += 30;
        matchedTerms.add(syn);
        matchedFields.add('synonym-text');
      }
    }

    // If zero matches, skip
    if (score === 0) continue;

    // 5. BONUS: Coverage ratio (if user typed 3 words and all 3 matched)
    if (originalTokens.length > 1) {
      const coverage = originalTermsMatched / originalTokens.length;
      if (coverage === 1) {
        score += 250; // All words present
      } else if (coverage >= 0.5) {
        score += 100; // More than half present
      }
    }

    // 6. Curated real photo series boost
    if (
      article.id.startsWith('pd-') ||
      article.id.startsWith('kt-') ||
      article.id.startsWith('bs-') ||
      article.id.startsWith('px-')
    ) {
      score += 150;
    } else if (
      article.id.startsWith('pt-') ||
      article.id.startsWith('rg-') ||
      article.id.startsWith('lt-') ||
      article.id.startsWith('sf-') ||
      article.id.startsWith('wd-') ||
      article.id.startsWith('ar-') ||
      article.id.startsWith('ho-') ||
      article.id.startsWith('bt-')
    ) {
      score += 100;
    }

    results.push({
      article,
      score,
      matchedTerms: Array.from(matchedTerms),
      matchedFields: Array.from(matchedFields),
    });
  }

  // Sort by highest score first
  return results.sort((a, b) => b.score - a.score);
}

// Generate dynamic related search queries for a given term
export function getRelatedSearchQueries(query: string): string[] {
  const q = query.toLowerCase().trim();
  const suggestions: string[] = [];

  for (const [key, syns] of Object.entries(SYNONYM_MAP)) {
    if (q.includes(key) || key.includes(q)) {
      suggestions.push(...syns.slice(0, 3));
    }
  }

  // Add category-level smart fallbacks
  if (suggestions.length === 0) {
    return ['Living room sofa', 'Japandi bedroom', 'Modern bathroom', 'Beauty skincare', 'Pendant lighting', 'Patio outdoor'];
  }

  return Array.from(new Set(suggestions)).slice(0, 6);
}

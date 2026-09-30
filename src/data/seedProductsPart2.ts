import { Product } from '../types';

export const seededProductsPart2: Product[] = [
  {
    id: 'prod-13',
    name: 'Handcrafted Fluted Ceramic Coffee Mug',
    brand: 'Earthen Objects',
    category: 'Home & Living',
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.9,
    reviewsCount: 420,
    inStock: true,
    stockCount: 80,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Generous 350ml hand-thrown stoneware mug with tactile ribbed body and ergonomic comfortable loop handle.',
    details: ['High-fired durable stoneware', 'Food safe, lead-free matte satin glaze', 'Microwave & dishwasher safe'],
    materials: 'Natural Terracotta Clay & Satin Glaze',
    whyWePickedIt: [
      'Beautiful ribbed shape feels comforting in two hands',
      'Thick walls keep brew hot longer without scalding your palms',
      'Microwave safe and easy to clean daily',
      'Affordable, great everyday product'
    ],
    moods: ['SLOW MORNING', 'COZY NIGHT', 'WORK MODE'],
    occasions: ['HOUSEWARMING', 'BIRTHDAY', 'SELF-CARE'],
    colors: [
      { name: 'Oat Cream', hex: '#F2EDE4' },
      { name: 'Warm Terracotta', hex: '#BF573F' },
      { name: 'Sage Celadon', hex: '#879789' }
    ],
    isVyraPick: true,
    isTrending: true,
    tags: ['coffee mug', 'ceramic', 'kitchen', 'home decor'],
    stats: { saved: 3200, wishlisted: 2400, reviews: 420, gifted: 890 },
    createdAt: '2026-07-15'
  },
  {
    id: 'prod-14',
    name: 'Artisanal Soy Wax Candle - Amber & Cedar',
    brand: 'Noma Botany',
    category: 'Home & Living',
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.8,
    reviewsCount: 260,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Hand-poured 220g natural soy wax candle infused with notes of warm smoked amber, virgin cedarwood, and vanilla bean.',
    details: ['50-hour clean soot-free burn time', 'Crackling natural unbleached wooden wick', 'Reusable amber glass vessel with gold lid'],
    materials: '100% Golden Soy Wax, Phthalate-free Fine Fragrance Oils',
    whyWePickedIt: [
      'Soft wood wick crackles gently like a miniature hearth',
      'Scent fills a room delicately without triggering headaches',
      'Amber jar becomes a pencil or cotton pad holder once finished'
    ],
    moods: ['COZY NIGHT', 'SLOW MORNING', 'SELF-CARE DAY'],
    occasions: ['HOUSEWARMING', 'BIRTHDAY', 'SELF-CARE'],
    isVyraPick: true,
    tags: ['candle', 'scented candle', 'soy candle', 'home decor'],
    stats: { saved: 1980, wishlisted: 1450, reviews: 260, gifted: 610 },
    createdAt: '2026-07-22'
  },
  {
    id: 'prod-15',
    name: 'Washed French Linen Throw Blanket',
    brand: 'Casa Nuvola',
    category: 'Home & Living',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pre-washed pure linen throw with subtle eyelash fringed borders. Drapes gorgeously over couch or bed.',
    details: ['130 x 180 cm generous drape size', 'Stone-washed for buttery touch straight from box', 'Breathable all-season comfort'],
    materials: '100% Pre-Washed Flax Linen',
    whyWePickedIt: [
      'Light enough for summer air conditioning, cozy enough for winter movie marathons',
      'Natural slub texture looks effortlessly styled even when tossed casually'
    ],
    moods: ['COZY NIGHT', 'SLOW MORNING'],
    occasions: ['HOUSEWARMING', 'FESTIVE', 'SELF-CARE'],
    colors: [
      { name: 'Oatmeal Natural', hex: '#DED3C4' },
      { name: 'Dusty Clay', hex: '#BA7A6A' }
    ],
    tags: ['blanket', 'throw', 'linen', 'bedsheet', 'home decor'],
    stats: { saved: 1450, wishlisted: 980, reviews: 110, gifted: 320 },
    createdAt: '2026-08-08'
  },
  {
    id: 'prod-16',
    name: 'Sculptural Ceramic Donut Vase',
    brand: 'Studio Forma',
    category: 'Home & Living',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.7,
    reviewsCount: 180,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Modern circular cutout vase with matte unglazed bisque exterior that elevates dry pampas or single stems.',
    details: ['20cm height x 18cm diameter', 'Watertight glazed interior for fresh flowers', 'Felt padded bottom to protect furniture'],
    materials: 'Stoneware Clay Ceramic with Bisque Matte Finish',
    whyWePickedIt: [
      'Geometric silhouette turns any plain desk or shelf into an art corner',
      'Pairs beautifully with 2-3 dried bunny tails or eucalyptus sprigs'
    ],
    moods: ['WORK MODE', 'SLOW MORNING'],
    occasions: ['HOUSEWARMING', 'BIRTHDAY'],
    colors: [
      { name: 'Chalk White', hex: '#EDECE8' },
      { name: 'Terracotta Matte', hex: '#BD644F' }
    ],
    tags: ['vase', 'wall art', 'home decor', 'ceramics'],
    stats: { saved: 1670, wishlisted: 1200, reviews: 180, gifted: 410 },
    createdAt: '2026-08-12'
  },
  {
    id: 'prod-17',
    name: 'Minimalist Dimmable LED Table Lamp',
    brand: 'Lumen Atelier',
    category: 'Home & Living',
    price: 1999,
    originalPrice: 2699,
    discount: 26,
    rating: 4.8,
    reviewsCount: 145,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Mushroom cap spun aluminum desk lamp with 3 color temperatures, stepless dimming, and USB-C rechargeable battery.',
    details: ['Warm 2700K to 4000K touch-sensitive dimming', 'Up to 14 hours cord-free illumination', 'Matte powder-coated metal body'],
    materials: 'Spun Aluminum & Frosted Acrylic Diffuser',
    whyWePickedIt: [
      'Cordless design lets you carry gentle warm ambient glow to patio, bedside, or dining table',
      'Diffused downward light prevents direct eye fatigue'
    ],
    moods: ['COZY NIGHT', 'WORK MODE'],
    occasions: ['HOUSEWARMING', 'BACK TO COLLEGE', 'BIRTHDAY'],
    colors: [
      { name: 'Sand Khaki', hex: '#D1C2A5' },
      { name: 'Muted Forest', hex: '#4E5F52' }
    ],
    isPriceDrop: true,
    previousPrice: 2699,
    savings: 700,
    tags: ['table lamp', 'lighting', 'home decor', 'desk setup'],
    stats: { saved: 1820, wishlisted: 1300, reviews: 145, gifted: 380 },
    createdAt: '2026-07-30'
  },
  {
    id: 'prod-18',
    name: 'Botanical Ceramide Dew Cleanser',
    brand: 'AURA BOTANICS',
    category: 'Beauty',
    price: 649,
    originalPrice: 850,
    discount: 24,
    rating: 4.9,
    reviewsCount: 340,
    inStock: true,
    stockCount: 55,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608248597359-56133a8c3d88?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Gentle pH-balanced 5.5 milky jelly cleanser packed with oat extract, 3 essential ceramides, and hyaluronic acid.',
    details: ['150ml pump bottle', '100% fragrance-free, sulfate-free, non-comedogenic', 'Melts light makeup and SPF effortlessly without stripping skin'],
    materials: 'Colloidal Oat, 3 Ceramides, Hyaluronic Acid, Glycerin',
    whyWePickedIt: [
      'Never leaves skin tight, squeaky, or parched',
      'Gentle enough for sensitive eyes and rosacea-prone skin',
      'Subtle milky slip rinses clean with zero residue'
    ],
    moods: ['SLOW MORNING', 'SELF-CARE DAY', 'COZY NIGHT'],
    occasions: ['SELF-CARE', 'BACK TO COLLEGE'],
    isVyraPick: true,
    tags: ['face wash', 'cleanser', 'skincare', 'beauty'],
    stats: { saved: 2700, wishlisted: 1980, reviews: 340, gifted: 540 },
    createdAt: '2026-07-18'
  },
  {
    id: 'prod-19',
    name: 'Rice & Niacinamide Barrier Moisturizer',
    brand: 'AURA BOTANICS',
    category: 'Beauty',
    price: 849,
    originalPrice: 1100,
    discount: 23,
    rating: 4.8,
    reviewsCount: 295,
    inStock: true,
    stockCount: 48,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Lightweight cloud-gel cream that locks in 72-hour moisture with 5% fermented rice water and 4% pure niacinamide.',
    details: ['80ml airless hygienic pump jar', 'Sinks in 30 seconds with velvet matte finish', 'Calms redness and refines pores'],
    materials: 'Rice Ferment, 4% Niacinamide, Squalane, Centella Asiatica',
    whyWePickedIt: [
      'Perfect weight for Indian climates — hydrating without stickiness',
      'Provides radiant lit-from-within glow under sunscreen'
    ],
    moods: ['SLOW MORNING', 'SELF-CARE DAY'],
    occasions: ['SELF-CARE', 'BACK TO COLLEGE'],
    isTrending: true,
    tags: ['moisturizer', 'skincare', 'beauty', 'cream'],
    stats: { saved: 2150, wishlisted: 1600, reviews: 295, gifted: 410 },
    createdAt: '2026-08-02'
  },
  {
    id: 'prod-20',
    name: 'Tinted Peptide Lip Butter - Toasted Honey',
    brand: 'LUMI Skin',
    category: 'Beauty',
    price: 499,
    originalPrice: 650,
    discount: 23,
    rating: 4.9,
    reviewsCount: 512,
    inStock: true,
    stockCount: 75,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Plumping peptide treatment that cushions dry lips in sheer, glossy warm caramel tint with vanilla bean extract.',
    details: ['15ml angled silicone tip applicator', 'Non-sticky high-shine mirror finish', 'Enriched with shea butter and palmitoyl tripeptide-1'],
    materials: 'Shea Butter, Peptides, Vitamin E, Plant Squalane',
    whyWePickedIt: [
      'The ultimate everyday lip savior that hydrates while looking polished',
      'Universally flattering nude wash suitable for every skin undertone'
    ],
    moods: ['CAMPUS DAY', 'WEEKEND OUT', 'DATE NIGHT'],
    occasions: ['BACK TO COLLEGE', 'BIRTHDAY', 'SELF-CARE'],
    colors: [
      { name: 'Toasted Honey', hex: '#C2895B' },
      { name: 'Dusty Petal', hex: '#BA6D75' }
    ],
    isVyraPick: true,
    tags: ['lip balm', 'lip butter', 'makeup', 'beauty'],
    stats: { saved: 3400, wishlisted: 2800, reviews: 512, gifted: 940 },
    createdAt: '2026-07-10'
  },
  {
    id: 'prod-21',
    name: 'Sandalwood & Fig Eau De Parfum 50ml',
    brand: 'Maison Sol',
    category: 'Beauty',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewsCount: 190,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An intimate, grounding skin scent opening with green fig leaf, blooming into creamy coconut milk and Mysore sandalwood.',
    details: ['50ml French glass flacon with wooden magnetic cap', '20% perfume oil concentration (Extrait strength)', 'Lasts 8+ hours closely on pulse points'],
    materials: 'Natural Fig Leaf, Mysore Sandalwood, Cashmere Woods, White Amber',
    whyWePickedIt: [
      'Subtle and magnetic rather than suffocating or synthetic',
      'Draws compliments whenever someone leans in close'
    ],
    moods: ['DATE NIGHT', 'WORK MODE', 'COZY NIGHT'],
    occasions: ['BIRTHDAY', 'WEDDING GUEST', 'FESTIVE'],
    isVyraPick: true,
    tags: ['perfume', 'fragrance', 'sandalwood', 'beauty', 'gift'],
    stats: { saved: 2100, wishlisted: 1540, reviews: 190, gifted: 530 },
    createdAt: '2026-07-29'
  },
  {
    id: 'prod-22',
    name: 'Hardcover Linen Dot-Grid Journal 160gsm',
    brand: 'Paper & Thought',
    category: 'Stationery',
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.9,
    reviewsCount: 380,
    inStock: true,
    stockCount: 60,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Lay-flat bound journal with 192 numbered pages of ultra-thick 160gsm bamboo paper that refuses ghosting or bleed-through.',
    details: ['160gsm archival acid-free bamboo paper', 'Opens 180° completely flat for comfortable sketching', 'Dual satin bookmark ribbons, elastic band & back expandable pocket'],
    materials: 'Natural Buckram Book Cloth Linen & FSC Bamboo Pulp',
    whyWePickedIt: [
      'Handle fountain pens, brush markers, and watercolor without a hint of bleeding',
      'Woven bookcloth cover feels sturdy in everyday backpacks'
    ],
    moods: ['SLOW MORNING', 'WORK MODE', 'CAMPUS DAY'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'BIRTHDAY'],
    colors: [
      { name: 'Oatmeal Natural', hex: '#E7DEC8' },
      { name: 'Sage Green', hex: '#7D9381' },
      { name: 'Terracotta Rust', hex: '#BA5943' }
    ],
    isVyraPick: true,
    tags: ['notebook', 'journal', 'stationery', 'college'],
    stats: { saved: 2300, wishlisted: 1720, reviews: 380, gifted: 680 },
    createdAt: '2026-07-12'
  },
  {
    id: 'prod-23',
    name: 'Solid Brass Mechanical Pencil 0.5mm',
    brand: 'Werkstatt Craft',
    category: 'Stationery',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.8,
    reviewsCount: 160,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Precision-machined hexagonal solid brass pencil with balanced center of gravity and brass clutch mechanism.',
    details: ['Hexagonal anti-roll profile', 'Uncoated brass develops unique personal patina over years of use', 'Includes pack of 30 high-polymer 2B leads'],
    materials: 'Solid Machined Brass',
    whyWePickedIt: [
      'Substantial heft in hand reduces writing strain',
      'An heirloom tool you will cherish for a lifetime'
    ],
    moods: ['WORK MODE', 'CAMPUS DAY'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'BIRTHDAY'],
    tags: ['pencil', 'brass', 'stationery', 'desk setup'],
    stats: { saved: 1240, wishlisted: 890, reviews: 160, gifted: 290 },
    createdAt: '2026-08-06'
  },
  {
    id: 'prod-24',
    name: 'Modular Birch Wood Desk Organizer',
    brand: 'Form & Line',
    category: 'Stationery',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.7,
    reviewsCount: 115,
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
    ],
    description: '4-piece interlocking magnetic birch trays tailored for pens, sticky notes, phone stand, and small desk accessories.',
    details: ['FSC-certified sustainable birch plywood', 'Concealed neodymium alignment magnets', 'Non-slip cork base feet'],
    materials: 'Birch Wood, Natural Oil Finish & Cork',
    whyWePickedIt: [
      'Rearrange pieces to fit your specific workspace layout',
      'Transforms desktop clutter into an inspiring calm zone'
    ],
    moods: ['WORK MODE'],
    occasions: ['WORK', 'BACK TO COLLEGE', 'HOUSEWARMING'],
    tags: ['desk organizer', 'stationery', 'wood', 'workspace'],
    stats: { saved: 1100, wishlisted: 820, reviews: 115, gifted: 230 },
    createdAt: '2026-08-15'
  }
];

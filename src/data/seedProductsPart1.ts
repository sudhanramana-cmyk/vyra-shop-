import { Product } from '../types';

export const seededProductsPart1: Product[] = [
  {
    id: 'prod-01',
    name: 'Oversized Heavyweight Cotton Tee',
    brand: 'VYRA Basics',
    category: 'Fashion',
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.8,
    reviewsCount: 238,
    inStock: true,
    stockCount: 45,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A boxy, breathable 280 GSM combed cotton tee tailored for daily ease and effortless drape.',
    details: ['280 GSM heavy combed organic cotton', 'Drop shoulder relaxed silhouette', 'Pre-shrunk to retain shape wash after wash'],
    materials: '100% Organic Combed Cotton',
    whyWePickedIt: [
      'Heavier weight that never clings',
      'Holds structural boxy shape after endless washes',
      'Ideal unisex everyday essential'
    ],
    moods: ['CAMPUS DAY', 'WEEKEND OUT', 'SLOW MORNING'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'TRAVEL'],
    colors: [
      { name: 'Warm Cream', hex: '#F5EFE6' },
      { name: 'Charcoal Wash', hex: '#373534' },
      { name: 'Terracotta', hex: '#C05A3E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isVyraPick: true,
    isTrending: true,
    tags: ['cotton', 'oversized', 't-shirt', 'casual'],
    stats: { saved: 1420, wishlisted: 950, reviews: 238, gifted: 310 },
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-02',
    name: 'Straight-Leg Japanese Denim Jeans',
    brand: 'Kuro Studio',
    category: 'Fashion',
    price: 2899,
    originalPrice: 3899,
    discount: 26,
    rating: 4.7,
    reviewsCount: 164,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Mid-rise straight fit jeans crafted in rigid cotton denim with a gentle stone wash finish.',
    details: ['13.5 oz non-stretch cotton twill', 'Button fly closure with vintage brass buttons', 'Classic 5-pocket styling'],
    materials: '100% Ring-Spun Cotton Denim',
    whyWePickedIt: [
      'Authentic vintage drape that flatters all heights',
      'Softens and molds to your body uniquely over time',
      'Pairs seamlessly with sneakers or loafers'
    ],
    moods: ['CAMPUS DAY', 'WEEKEND OUT', 'DATE NIGHT'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'TRAVEL'],
    colors: [
      { name: 'Vintage Stone Blue', hex: '#68829E' },
      { name: 'Raw Indigo', hex: '#1D2A44' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    isTrending: true,
    tags: ['denim', 'jeans', 'straight-leg', 'casual'],
    stats: { saved: 980, wishlisted: 740, reviews: 164, gifted: 120 },
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-03',
    name: 'Relaxed French Linen Camp Shirt',
    brand: 'Maison Sol',
    category: 'Fashion',
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Airy pure linen shirt featuring a relaxed camp collar and mother-of-pearl finish buttons.',
    details: ['100% Normandy flax linen', 'Cuban camp collar neckline', 'Breathable natural weave'],
    materials: '100% French Flax Linen',
    whyWePickedIt: [
      'Naturally thermoregulating for humid days',
      'Effortless unbuttoned layer over simple tank or tee',
      'Gets softer and more textured with every wash'
    ],
    moods: ['WEEKEND OUT', 'TRAVEL MODE', 'SLOW MORNING'],
    occasions: ['TRAVEL', 'FESTIVE', 'SELF-CARE'],
    colors: [
      { name: 'Olive Sage', hex: '#7D9381' },
      { name: 'Sunken Sand', hex: '#DECBB7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isVyraPick: true,
    tags: ['linen', 'shirt', 'summer', 'vacation'],
    stats: { saved: 1150, wishlisted: 890, reviews: 112, gifted: 240 },
    createdAt: '2026-08-14'
  },
  {
    id: 'prod-04',
    name: 'Cozy Oversized Fleece Pullover Hoodie',
    brand: 'VYRA Studio',
    category: 'Fashion',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    stockCount: 50,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-plush brushed fleece interior hoodie with double-layer hood and kangaroo front pouch.',
    details: ['360 GSM cotton-poly brushed fleece', 'Deep double-layered hood without awkward strings', 'Ribbed cuffs & hem'],
    materials: '80% Combed Cotton, 20% Recycled Polyester',
    whyWePickedIt: [
      'Heavyweight warmth without feeling stiff',
      'The quintessential companion for late study nights and chilly evenings',
      'Structured hood stands up nicely'
    ],
    moods: ['COZY NIGHT', 'CAMPUS DAY', 'TRAVEL MODE'],
    occasions: ['BACK TO COLLEGE', 'SELF-CARE', 'TRAVEL'],
    colors: [
      { name: 'Heather Mocha', hex: '#8C7A6B' },
      { name: 'Dusty Rose', hex: '#D49B8E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isTrending: true,
    tags: ['hoodie', 'fleece', 'cozy', 'college'],
    stats: { saved: 2100, wishlisted: 1450, reviews: 310, gifted: 620 },
    createdAt: '2026-08-05'
  },
  {
    id: 'prod-05',
    name: 'Tailored Pleated Wide-Leg Trousers',
    brand: 'Form & Line',
    category: 'Fashion',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.7,
    reviewsCount: 94,
    inStock: true,
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Fluid drape trousers with double front pleats and an elasticated hidden rear waistband for comfort.',
    details: ['Double pleat front detailing', 'Semi-elasticated comfort back waistband', 'Slash side pockets'],
    materials: 'Viscose Twill Blend',
    whyWePickedIt: [
      'Looks ultra-sharp for office or brunch while feeling as comfortable as loungewear',
      'High-waisted silhouette elongates the legs elegantly'
    ],
    moods: ['WORK MODE', 'DATE NIGHT', 'WEEKEND OUT'],
    occasions: ['WORK', 'WEDDING GUEST', 'FESTIVE'],
    colors: [
      { name: 'Warm Taupe', hex: '#B8A99A' },
      { name: 'Midnight Charcoal', hex: '#2B2B2B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['trousers', 'pleated', 'tailored', 'workwear'],
    stats: { saved: 820, wishlisted: 540, reviews: 94, gifted: 85 },
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-06',
    name: 'Minimalist Leather Court Sneakers',
    brand: 'Common Steps',
    category: 'Footwear',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.9,
    reviewsCount: 285,
    inStock: true,
    stockCount: 35,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Clean low-profile tennis sneakers in smooth full-grain leather with cushioned memory foam footbeds.',
    details: ['Supple grain leather upper', 'Vulcanized rubber outsoles with herringbone traction', 'Removable anti-fatigue insole'],
    materials: 'Leather Upper, Natural Rubber Sole',
    whyWePickedIt: [
      'The undisputed champion of versatile footwear',
      'Zero garish branding — pure, uncluttered lines',
      'Immediate all-day walking comfort without break-in blistering'
    ],
    moods: ['CAMPUS DAY', 'WORK MODE', 'TRAVEL MODE', 'WEEKEND OUT'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'TRAVEL'],
    colors: [
      { name: 'Chalk White', hex: '#FBFBFA' },
      { name: 'Oatmeal & Gum', hex: '#E5DCCF' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    isVyraPick: true,
    isTrending: true,
    tags: ['sneakers', 'leather', 'shoes', 'everyday'],
    stats: { saved: 1890, wishlisted: 1220, reviews: 285, gifted: 390 },
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-07',
    name: 'Suede Boston Mule Clogs',
    brand: 'Folk Soles',
    category: 'Footwear',
    price: 2799,
    originalPrice: 3499,
    discount: 20,
    rating: 4.7,
    reviewsCount: 142,
    inStock: true,
    stockCount: 19,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Slip-on cow suede clogs with contoured cork latex footbed and brass adjustable buckle.',
    details: ['Genuine velvety suede upper', 'Ergonomic anatomically-shaped cork footbed', 'Lightweight EVA outsole'],
    materials: 'Cow Suede Leather & Natural Cork',
    whyWePickedIt: [
      'Supreme slip-on convenience with effortless style',
      'Cork footbed molds directly to your unique foot arches'
    ],
    moods: ['SLOW MORNING', 'CAMPUS DAY', 'WEEKEND OUT'],
    occasions: ['BACK TO COLLEGE', 'TRAVEL', 'SELF-CARE'],
    colors: [
      { name: 'Warm Taupe Suede', hex: '#9E8B76' },
      { name: 'Sand Brown', hex: '#C2A688' }
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9'],
    tags: ['clogs', 'mules', 'suede', 'comfy'],
    stats: { saved: 920, wishlisted: 670, reviews: 142, gifted: 110 },
    createdAt: '2026-08-16'
  },
  {
    id: 'prod-08',
    name: 'Heavyweight Canvas Day Tote 16L',
    brand: 'VYRA Objects',
    category: 'Accessories',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.8,
    reviewsCount: 390,
    inStock: true,
    stockCount: 65,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Durable 16oz duck canvas tote featuring reinforced cross-stitched handles, laptop divider, and key leash.',
    details: ['16oz heavy organic cotton canvas', 'Fits up to 15.6" laptop comfortably', 'Internal zippered safety pocket & bottle sleeve'],
    materials: '100% Organic Duck Canvas with Solid Brass Rivets',
    whyWePickedIt: [
      'Thick enough to stand upright on its own',
      'Internal bottle holder prevents accidental drink spills',
      'Reinforced straps that never dig into tired shoulders'
    ],
    moods: ['CAMPUS DAY', 'WORK MODE', 'SLOW MORNING'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'TRAVEL'],
    colors: [
      { name: 'Natural Ecru', hex: '#F0ECE1' },
      { name: 'Moss Green', hex: '#627A67' },
      { name: 'Espresso', hex: '#3B2F2F' }
    ],
    isVyraPick: true,
    isTrending: true,
    tags: ['tote bag', 'canvas', 'college bag', 'daily'],
    stats: { saved: 2450, wishlisted: 1800, reviews: 390, gifted: 720 },
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-09',
    name: 'Flap Leather Crossbody Messenger',
    brand: 'Atelier Nu',
    category: 'Accessories',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Structured semi-vegetable tanned leather bag with magnetic snap closure and adjustable webbing strap.',
    details: ['Sustainably sourced smooth leather', 'Dual interior compartments + slip card sleeve', 'Water-resistant micro-twill lining'],
    materials: 'Top Grain Leather & Antique Brass',
    whyWePickedIt: [
      'Holds phone, Kindle, compact camera, keys, and lip balm with ease',
      'Magnetic closure snaps shut instinctively'
    ],
    moods: ['WEEKEND OUT', 'TRAVEL MODE', 'DATE NIGHT'],
    occasions: ['TRAVEL', 'BIRTHDAY', 'WORK'],
    colors: [
      { name: 'Caramel Tan', hex: '#9E693F' },
      { name: 'Ebony Black', hex: '#1C1B1A' }
    ],
    tags: ['crossbody', 'leather', 'bag', 'travel'],
    stats: { saved: 1100, wishlisted: 790, reviews: 88, gifted: 210 },
    createdAt: '2026-08-18'
  },
  {
    id: 'prod-10',
    name: 'Brushed Steel Minimalist Watch 38mm',
    brand: 'Krona Horology',
    category: 'Accessories',
    price: 3299,
    originalPrice: 4299,
    discount: 23,
    rating: 4.9,
    reviewsCount: 175,
    inStock: true,
    stockCount: 24,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Clean Bauhaus-inspired 38mm dial watch with Japanese Miyota quartz movement and genuine leather strap.',
    details: ['316L surgical stainless steel case', 'Scratch-resistant sapphire-coated glass', '50M water resistance (5 ATM)'],
    materials: 'Stainless Steel Case, Italian Calf Leather Band',
    whyWePickedIt: [
      'Subtle 38mm case diameter fits both slender and broad wrists seamlessly',
      'Crisp, unpretentious typography on dial face',
      'Quick-release spring bars to swap straps in 10 seconds'
    ],
    moods: ['WORK MODE', 'DATE NIGHT', 'CAMPUS DAY'],
    occasions: ['WORK', 'BIRTHDAY', 'WEDDING GUEST'],
    colors: [
      { name: 'Silver & Saddle Brown', hex: '#A78B71' },
      { name: 'Matte Black', hex: '#262626' }
    ],
    isVyraPick: true,
    tags: ['watch', 'minimal', 'accessories', 'gift'],
    stats: { saved: 1640, wishlisted: 1100, reviews: 175, gifted: 430 },
    createdAt: '2026-07-25'
  },
  {
    id: 'prod-11',
    name: '18K Gold Vermeil Flat Snake Chain',
    brand: 'Aura Studio',
    category: 'Accessories',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.8,
    reviewsCount: 132,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Liquid-like flexible herringbone chain in 925 sterling silver dipped in 2.5 microns of 18K yellow gold.',
    details: ['40cm length + 5cm extender chain', 'Tarnish-resistant anti-fade protective coating', 'Hypoallergenic & nickel-free'],
    materials: '18K Gold over 925 Sterling Silver',
    whyWePickedIt: [
      'Lies completely flat against the collarbone without twisting',
      'Instantly elevates a basic white tee into a styled outfit'
    ],
    moods: ['DATE NIGHT', 'WEEKEND OUT', 'WORK MODE'],
    occasions: ['BIRTHDAY', 'WEDDING GUEST', 'FESTIVE'],
    isTrending: true,
    tags: ['jewellery', 'necklace', 'gold', 'chain'],
    stats: { saved: 1350, wishlisted: 920, reviews: 132, gifted: 340 },
    createdAt: '2026-08-11'
  },
  {
    id: 'prod-12',
    name: 'Tortoiseshell Acetate Sunglasses',
    brand: 'Soleil Optics',
    category: 'Accessories',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.6,
    reviewsCount: 98,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Classic unisex D-frame sunglasses in warm amber tortoiseshell with UV400 polarized lenses.',
    details: ['Handmade cellulose acetate frame', '100% UVA/UVB Category 3 polarized protection', 'Sturdy 5-barrel hinges with hard case'],
    materials: 'Cellulose Acetate & TAC Polarized Lenses',
    whyWePickedIt: [
      'Warm amber tint softens glare without dulling colors',
      'Timeless silhouette that never goes out of style'
    ],
    moods: ['WEEKEND OUT', 'TRAVEL MODE', 'SLOW MORNING'],
    occasions: ['TRAVEL', 'SELF-CARE', 'BACK TO COLLEGE'],
    isPriceDrop: true,
    previousPrice: 1799,
    savings: 500,
    tags: ['sunglasses', 'accessories', 'eyewear', 'summer'],
    stats: { saved: 980, wishlisted: 710, reviews: 98, gifted: 190 },
    createdAt: '2026-08-04'
  }
];

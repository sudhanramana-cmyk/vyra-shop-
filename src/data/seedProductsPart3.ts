import { Product } from '../types';

export const seededProductsPart3: Product[] = [
  {
    id: 'prod-25',
    name: 'Matte Insulated Stainless Steel Flask 750ml',
    brand: 'Hydro Living',
    category: 'Fitness',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.9,
    reviewsCount: 460,
    inStock: true,
    stockCount: 70,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Double-walled vacuum insulated bottle keeping liquids icy cold for 24 hours or piping hot for 12 hours.',
    details: ['18/8 food-grade pro stainless steel', 'Sweat-proof powder coat finish with silicone base bumper', 'Wide mouth accommodates large ice cubes'],
    materials: '18/8 Pro-Grade Stainless Steel & BPA-Free Cap',
    whyWePickedIt: [
      'Zero metallic taste, keeps water crisp all day long',
      'Powder coat provides secure grip even with sweaty hands',
      'Never leaks inside a backpack or bag'
    ],
    moods: ['CAMPUS DAY', 'TRAVEL MODE', 'WORK MODE'],
    occasions: ['BACK TO COLLEGE', 'TRAVEL', 'WORK'],
    colors: [
      { name: 'Oat Stone', hex: '#DDD2C3' },
      { name: 'Sage Green', hex: '#6F8473' },
      { name: 'Terracotta', hex: '#BA5B43' }
    ],
    isVyraPick: true,
    isTrending: true,
    tags: ['water bottle', 'flask', 'fitness', 'college'],
    stats: { saved: 2900, wishlisted: 2100, reviews: 460, gifted: 780 },
    createdAt: '2026-07-08'
  },
  {
    id: 'prod-26',
    name: 'Natural Cork Non-Slip Yoga Mat 5mm',
    brand: 'Prana Ground',
    category: 'Fitness',
    price: 1999,
    originalPrice: 2799,
    discount: 28,
    rating: 4.8,
    reviewsCount: 178,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Eco-conscious 5mm exercise mat combining an organic cork surface with natural tree rubber base for superior joint cushioning.',
    details: ['Grip actually increases with moisture and sweat', 'Naturally antimicrobial, odor-resistant and easy to wipe clean', 'Includes woven cotton carrying strap'],
    materials: 'Sustainable Cork Oak Bark & Natural Tree Rubber',
    whyWePickedIt: [
      'No synthetic chemical odor common in plastic mats',
      'High-density tree rubber stays anchored to hardwood or tile'
    ],
    moods: ['SLOW MORNING', 'SELF-CARE DAY'],
    occasions: ['SELF-CARE', 'BIRTHDAY'],
    isVyraPick: true,
    tags: ['yoga mat', 'fitness', 'cork', 'exercise'],
    stats: { saved: 1540, wishlisted: 1080, reviews: 178, gifted: 310 },
    createdAt: '2026-07-26'
  },
  {
    id: 'prod-27',
    name: 'Weatherproof Tech & Cable Organizer Pouch',
    brand: 'Nomad Gear',
    category: 'Travel',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.8,
    reviewsCount: 245,
    inStock: true,
    stockCount: 42,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Origami-style expandable pouch with elastic webbing, zip pockets, and pen loops for chargers, cables, and powerbanks.',
    details: ['Recycled ripstop nylon with DWR water-resistant exterior', 'YKK weather-sealed zippers', 'Accordion fold opens wide on desk'],
    materials: 'Recycled 420D Ripstop Nylon',
    whyWePickedIt: [
      'Ends the nightmare of tangled cables in travel bags',
      'Small footprint that slips easily into backpacks'
    ],
    moods: ['TRAVEL MODE', 'CAMPUS DAY', 'WORK MODE'],
    occasions: ['TRAVEL', 'BACK TO COLLEGE', 'WORK'],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#D6C9B8' },
      { name: 'Charcoal Black', hex: '#262423' }
    ],
    isPriceDrop: true,
    previousPrice: 1199,
    savings: 400,
    tags: ['travel pouch', 'tech organizer', 'cables', 'travel'],
    stats: { saved: 1780, wishlisted: 1250, reviews: 245, gifted: 460 },
    createdAt: '2026-08-03'
  },
  {
    id: 'prod-28',
    name: 'Active Noise Cancelling True Wireless Earbuds',
    brand: 'Acoustic Sound',
    category: 'Electronics',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    stockCount: 32,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pebble-shaped matte charging case with hybrid 35dB noise cancellation, transparency mode, and 30-hour total battery life.',
    details: ['10mm bio-cellulose drivers for rich natural bass', '4-mic ENC array for crystal clear voice calls', 'IPX5 splash and sweat resistance'],
    materials: 'Soft-Touch Matte Polycarbonate & Silicone Tips',
    whyWePickedIt: [
      'Comfortable oval stem doesn’t produce painful ear fatigue after 3 hours',
      'Sturdy ambient awareness mode when walking outside'
    ],
    moods: ['CAMPUS DAY', 'WORK MODE', 'TRAVEL MODE'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'BIRTHDAY', 'TRAVEL'],
    colors: [
      { name: 'Oat Beige', hex: '#DDD2C3' },
      { name: 'Matte Slate', hex: '#3C454B' }
    ],
    isVyraPick: true,
    isTrending: true,
    tags: ['earbuds', 'wireless earphones', 'electronics', 'audio'],
    stats: { saved: 2600, wishlisted: 1950, reviews: 312, gifted: 590 },
    createdAt: '2026-07-16'
  },
  {
    id: 'prod-29',
    name: 'Walnut Wood Compact Bluetooth Speaker',
    brand: 'Lignum Audio',
    category: 'Electronics',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.9,
    reviewsCount: 168,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pocket-friendly portable acoustic speaker housed in genuine solid walnut wood with woven textile speaker grille.',
    details: ['5W dynamic driver with passive rear radiator for punchy bass', '10-hour playback with Bluetooth 5.3', 'USB-C fast charging with genuine leather carry loop'],
    materials: 'Solid American Walnut Wood & Linen Acoustic Cloth',
    whyWePickedIt: [
      'Real wooden acoustic chamber delivers warm, lifelike vocal resonance',
      'Looks like an intentional design object on nightstands rather than cheap black plastic'
    ],
    moods: ['SLOW MORNING', 'COZY NIGHT', 'WEEKEND OUT'],
    occasions: ['HOUSEWARMING', 'BIRTHDAY', 'SELF-CARE'],
    isVyraPick: true,
    tags: ['speaker', 'bluetooth speaker', 'electronics', 'wood'],
    stats: { saved: 1980, wishlisted: 1420, reviews: 168, gifted: 450 },
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-30',
    name: 'Vegan Leather MagSafe Card Wallet Stand',
    brand: 'VYRA Objects',
    category: 'Accessories',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    stockCount: 65,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Slim magnetic wallet that snaps directly to iPhone MagSafe or magnetic rings, holding 3 cards and folding into hands-free kickstand.',
    details: ['Dual high-strength N52 magnet array', 'Integrated 60° vertical and horizontal media stand', 'RFID blocking inner lining layer'],
    materials: 'Premium Recycled Vegan Leather & Steel Springs',
    whyWePickedIt: [
      'Snap directly to your phone so you can leave bulky wallets at home',
      'Props up FaceTime calls during desk work seamlessly'
    ],
    moods: ['CAMPUS DAY', 'WORK MODE', 'TRAVEL MODE'],
    occasions: ['BACK TO COLLEGE', 'WORK', 'BIRTHDAY'],
    colors: [
      { name: 'Warm Terracotta', hex: '#BA5943' },
      { name: 'Saddle Tan', hex: '#9E693F' },
      { name: 'Charcoal', hex: '#262423' }
    ],
    tags: ['phone case', 'mobile accessories', 'wallet', 'magsafe'],
    stats: { saved: 2100, wishlisted: 1590, reviews: 310, gifted: 510 },
    createdAt: '2026-08-07'
  },
  {
    id: 'prod-31',
    name: 'Slow Morning Coffee Ritual Box',
    brand: 'VYRA Curations',
    category: 'Gifts',
    price: 1799,
    originalPrice: 2399,
    discount: 25,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A curated gift box containing a hand-thrown ceramic mug, brass measuring scoop, freshly roasted Arabica beans (200g), and linen coaster.',
    details: ['Packed in keepsake kraft rigid gift box with embossed ribbon', 'Includes personalized gift message card', 'Ready-to-gift presentation'],
    materials: 'Ceramic, Solid Brass, Natural Linen, Fresh Arabica',
    whyWePickedIt: [
      'The ideal heartfelt gift that feels curated and deeply thoughtful',
      'Every item has everyday utility and longevity'
    ],
    moods: ['SLOW MORNING', 'WEEKEND OUT'],
    occasions: ['BIRTHDAY', 'HOUSEWARMING', 'FESTIVE'],
    isVyraPick: true,
    tags: ['gift box', 'coffee', 'gifts', 'curated'],
    stats: { saved: 2400, wishlisted: 1800, reviews: 142, gifted: 620 },
    createdAt: '2026-07-21'
  },
  {
    id: 'prod-32',
    name: 'Evening Unwind & Sleep Kit',
    brand: 'Noma Botany',
    category: 'Gifts',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.8,
    reviewsCount: 118,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Self-care bundle comprising pure silk eye mask, lavender chamomile pillow mist, and mini amber soy candle.',
    details: ['100% 22-momme Mulberry silk mask', 'Botanical essential oil sleep spray (50ml)', 'Mini 100g soy travel candle in amber jar'],
    materials: 'Mulberry Silk, Organic Lavender Distillate, Soy Wax',
    whyWePickedIt: [
      'Gentle pressure from the silk mask blocks light completely',
      'Calming ritual to transition smoothly into restful sleep'
    ],
    moods: ['COZY NIGHT', 'SELF-CARE DAY'],
    occasions: ['BIRTHDAY', 'SELF-CARE', 'HOUSEWARMING'],
    isVyraPick: true,
    tags: ['gift kit', 'self-care', 'sleep', 'gifts'],
    stats: { saved: 1850, wishlisted: 1350, reviews: 118, gifted: 490 },
    createdAt: '2026-07-27'
  }
];

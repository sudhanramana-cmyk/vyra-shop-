import { seededProductsPart1 } from './seedProductsPart1';
import { seededProductsPart2 } from './seedProductsPart2';
import { seededProductsPart3 } from './seedProductsPart3';
import { seededProductsPart4 } from './seedProductsPart4';
import { Product, Article, LookBundle, DaySegment, Coupon, Review, User } from '../types';

export const allInitialProducts: Product[] = [
  ...seededProductsPart1,
  ...seededProductsPart2,
  ...seededProductsPart3,
  ...seededProductsPart4
];

export const vyraArticles: Article[] = [
  {
    id: 'edit-1',
    title: "College essentials you'll actually use",
    subtitle: 'Beyond standard stationery: the everyday gear that survives four years on campus.',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    readTime: '4 min read',
    category: 'CAMPUS',
    excerpt: 'Skip the useless gadgets. We asked 80 university students what they actually reached for every single day: a 16oz canvas tote that stands upright, a 160gsm journal that doesn’t bleed, and noise-cancelling buds that carve out quiet in a bustling library.',
    productIds: ['prod-08', 'prod-22', 'prod-28', 'prod-25', 'prod-01']
  },
  {
    id: 'edit-2',
    title: 'Weekend outfits under ₹3,000',
    subtitle: 'High-rotation pieces you can wear to farmers markets, cafes, and rooftop hangs.',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    readTime: '3 min read',
    category: 'STYLE',
    excerpt: 'Editorial style does not require spending half your monthly budget. Start with a structured 280 GSM heavyweight tee, pair it with vintage wash denim, and finish with a tactile canvas tote.',
    productIds: ['prod-01', 'prod-02', 'prod-08', 'prod-12', 'prod-20']
  },
  {
    id: 'edit-3',
    title: "Small gifts that don't feel boring",
    subtitle: 'Understated, functional gestures people genuinely cherish and use daily.',
    coverImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    readTime: '5 min read',
    category: 'GIFTING',
    excerpt: 'Gift guides usually recommend novelty junk destined for drawers. Instead, gift tactile essentials: a hand-thrown ceramic mug that feels soothing on sleepy mornings, or a solid brass bookmark with heirloom heft.',
    productIds: ['prod-13', 'prod-49', 'prod-14', 'prod-31', 'prod-41']
  },
  {
    id: 'edit-4',
    title: 'Make your room feel better',
    subtitle: 'Simple tactile updates to turn a noisy bedroom into a sanctuary of calm.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    readTime: '4 min read',
    category: 'LIVING',
    excerpt: 'You do not need a full interior remodel. Dim the harsh overhead light in favor of a warm cordless mushroom lamp, light a cedar-and-amber soy candle, and drape a breathable pre-washed French linen throw across the bed.',
    productIds: ['prod-17', 'prod-14', 'prod-15', 'prod-16', 'prod-46']
  },
  {
    id: 'edit-5',
    title: 'Self-care essentials for a slow Sunday',
    subtitle: 'Unplugged rituals to recharge mind, skin, and spirit before Monday arrives.',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    readTime: '3 min read',
    category: 'RITUALS',
    excerpt: 'Turn your bathroom into a tranquil bathhouse. A barrier-gentle botanical cleanser, a rich fig and sandalwood fragrance on pulse points, and a cup of freshly ground pour-over in your favorite stoneware mug.',
    productIds: ['prod-18', 'prod-19', 'prod-21', 'prod-26', 'prod-32']
  },
  {
    id: 'edit-6',
    title: 'Travel essentials worth packing',
    subtitle: 'Compact, durable gear that keeps trips low-stress and lightweight.',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    readTime: '5 min read',
    category: 'JOURNEYS',
    excerpt: 'When packing light, every item must earn its spot. Keep chargers tangle-free in a weatherproof origami pouch, shield eyes with polarized tortoiseshell frames, and stay hydrated with a sweat-proof 750ml flask.',
    productIds: ['prod-27', 'prod-12', 'prod-25', 'prod-34', 'prod-48']
  }
];

export const lookBundles: LookBundle[] = [
  {
    id: 'look-1',
    title: 'The Modern Weekend Uniform',
    description: 'Effortless, structured everyday styling that transitions seamlessly from morning coffee to gallery strolls.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    tag: 'MOST POPULAR OUTFIT',
    productIds: ['prod-01', 'prod-02', 'prod-06', 'prod-08', 'prod-10'],
    bundleDiscountPercent: 15
  },
  {
    id: 'look-2',
    title: 'Warm Minimalist Workday',
    description: 'Breathe easy in tailored pleats, airy French linen, and understated silver accents.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=80',
    tag: 'EDITORIAL CURATION',
    productIds: ['prod-03', 'prod-05', 'prod-43', 'prod-09', 'prod-38'],
    bundleDiscountPercent: 15
  }
];

export const daySegments: DaySegment[] = [
  {
    id: 'MORNING',
    title: 'Slow Morning',
    subtitle: 'Awaken with intention',
    icon: 'Sun',
    tagline: 'Gentle sips, soft sunlight, and a hydrating morning skincare ritual.',
    productIds: ['prod-13', 'prod-18', 'prod-22', 'prod-26', 'prod-31']
  },
  {
    id: 'COLLEGE',
    title: 'Campus Day',
    subtitle: 'Focus, learn & move',
    icon: 'GraduationCap',
    tagline: 'Sturdy canvas bags, leak-proof hydration, and ANC earbuds for library marathons.',
    productIds: ['prod-08', 'prod-25', 'prod-28', 'prod-22', 'prod-01', 'prod-20']
  },
  {
    id: 'WORK',
    title: 'Work Flow',
    subtitle: 'Clear mind, clean desk',
    icon: 'Briefcase',
    tagline: 'Minimalist desk organizers, brass writing tools, and all-day tailored comfort.',
    productIds: ['prod-24', 'prod-23', 'prod-39', 'prod-10', 'prod-05']
  },
  {
    id: 'EVENING',
    title: 'Evening Unwind',
    subtitle: 'Golden hour transitions',
    icon: 'Sunset',
    tagline: 'Slip into relaxed loungewear, brew an evening herbal tea, and step out with friends.',
    productIds: ['prod-04', 'prod-07', 'prod-09', 'prod-29', 'prod-11']
  },
  {
    id: 'NIGHT',
    title: 'Cozy Night',
    subtitle: 'Sanctuary & restful sleep',
    icon: 'Moon',
    tagline: 'Dim amber lamps, crackling wood-wick candles, and crisp washed percale sheets.',
    productIds: ['prod-14', 'prod-17', 'prod-15', 'prod-36', 'prod-32', 'prod-41']
  }
];

export const initialCoupons: Coupon[] = [
  {
    code: 'VYRAFIRST',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 999,
    description: '15% OFF on your first purchase above ₹999',
    validUntil: '2026-12-31'
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 99,
    minOrderValue: 500,
    description: 'Free express shipping on orders above ₹500',
    validUntil: '2026-12-31'
  },
  {
    code: 'FESTIVE500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 2499,
    description: 'Flat ₹500 OFF on orders above ₹2,499',
    validUntil: '2026-12-31'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-13',
    userId: 'user-02',
    userName: 'Ananya Sharma',
    rating: 5,
    title: 'My absolute favorite morning companion',
    comment: 'The fluted texture feels so comforting between both hands. It retains heat remarkably well and looks like a bespoke pottery studio piece. Definitely getting another for gifting!',
    isVerified: true,
    helpfulCount: 28,
    createdAt: '2026-08-20'
  },
  {
    id: 'rev-2',
    productId: 'prod-01',
    userId: 'user-03',
    userName: 'Kabir Mehta',
    rating: 5,
    title: 'Heavyweight fabric done right',
    comment: 'Most brands claim "heavyweight" and deliver standard scratchy tees. This combed cotton has a real 280 GSM heft, doesn’t cling to your chest, and the collar stays tight after 6 machine washes.',
    isVerified: true,
    helpfulCount: 34,
    createdAt: '2026-08-15'
  },
  {
    id: 'rev-3',
    productId: 'prod-08',
    userId: 'user-04',
    userName: 'Rhea Sengupta',
    rating: 5,
    title: 'Fits my 15-inch laptop and water bottle upright!',
    comment: 'The internal bottle loop is a game-changer. No more worrying about water spilling across my notes. Sturdy canvas that stands on its own.',
    isVerified: true,
    helpfulCount: 42,
    createdAt: '2026-08-12'
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-admin',
    email: 'admin@vyra.store',
    name: 'VYRA Curators',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-demo',
    email: 'tanya@example.com',
    name: 'Tanya Roy',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98123 45678',
    savedAddresses: [
      {
        id: 'addr-1',
        name: 'Tanya Roy',
        phone: '+91 98123 45678',
        street: 'Flat 402, Green Glen Layout, Bellandur',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103',
        isDefault: true
      }
    ],
    createdAt: '2026-07-01'
  }
];

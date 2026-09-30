export type Category = 
  | 'Fashion'
  | 'Beauty'
  | 'Footwear'
  | 'Home & Living'
  | 'Accessories'
  | 'Electronics'
  | 'Fitness'
  | 'Travel'
  | 'Stationery'
  | 'Gifts';

export type Mood =
  | 'SLOW MORNING'
  | 'CAMPUS DAY'
  | 'WEEKEND OUT'
  | 'SELF-CARE DAY'
  | 'TRAVEL MODE'
  | 'WORK MODE'
  | 'COZY NIGHT'
  | 'DATE NIGHT';

export type Occasion =
  | 'BACK TO COLLEGE'
  | 'BIRTHDAY'
  | 'WEDDING GUEST'
  | 'TRAVEL'
  | 'FESTIVE'
  | 'WORK'
  | 'HOUSEWARMING'
  | 'SELF-CARE';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface ProductStats {
  saved: number;
  wishlisted: number;
  reviews: number;
  gifted: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  description: string;
  details: string[];
  materials?: string;
  whyWePickedIt: string[];
  moods: Mood[];
  occasions: Occasion[];
  colors?: ProductColor[];
  sizes?: string[];
  isVyraPick?: boolean;
  isTrending?: boolean;
  isPriceDrop?: boolean;
  previousPrice?: number;
  savings?: number;
  tags: string[];
  stats: ProductStats;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  savedAddresses?: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | 'ORDER PLACED'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT FOR DELIVERY'
  | 'DELIVERED';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  trackingId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Wallet';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
  expectedDelivery: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
  validUntil: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  readTime: string;
  category: string;
  excerpt: string;
  productIds: string[];
}

export interface LookBundle {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  productIds: string[];
  bundleDiscountPercent: number;
}

export interface DaySegment {
  id: 'MORNING' | 'COLLEGE' | 'WORK' | 'EVENING' | 'NIGHT';
  title: string;
  subtitle: string;
  icon: string;
  tagline: string;
  productIds: string[];
}

import { Product, User, Order, Review, Coupon, CartItem, WishlistItem } from '../types';
import { allInitialProducts, initialCoupons, initialReviews, initialUsers } from '../data/seedData';

export interface DatabaseState {
  products: Product[];
  users: (User & { passwordHash: string })[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  cart: Record<string, CartItem[]>; // userId -> CartItem[]
  wishlist: Record<string, WishlistItem[]>; // userId -> WishlistItem[]
}

// In-memory persistent database store for runtime
const state: DatabaseState = {
  products: [...allInitialProducts],
  users: [
    {
      ...initialUsers[0],
      passwordHash: '$2a$10$demoHashForAdmin1234567890' // 'admin123'
    },
    {
      ...initialUsers[1],
      passwordHash: '$2a$10$demoHashForUser1234567890' // 'password123'
    }
  ],
  orders: [
    {
      id: 'VYRA-ORD-9281',
      trackingId: 'TRK-98124982',
      userId: 'usr-demo',
      customerName: 'Tanya Roy',
      customerEmail: 'tanya@example.com',
      items: [
        {
          productId: 'prod-13',
          productName: 'Handcrafted Fluted Ceramic Coffee Mug',
          productImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
          price: 499,
          quantity: 2,
          selectedColor: 'Oat Cream'
        },
        {
          productId: 'prod-22',
          productName: 'Hardcover Linen Dot-Grid Journal 160gsm',
          productImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
          price: 699,
          quantity: 1,
          selectedColor: 'Sage Green'
        }
      ],
      subtotal: 1697,
      shipping: 0,
      discount: 254,
      total: 1443,
      status: 'SHIPPED',
      shippingAddress: {
        id: 'addr-1',
        name: 'Tanya Roy',
        phone: '+91 98123 45678',
        street: 'Flat 402, Green Glen Layout, Bellandur',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103'
      },
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      timeline: [
        {
          status: 'ORDER PLACED',
          timestamp: '2026-09-28 10:15 AM',
          description: 'Order placed via UPI payment',
          completed: true
        },
        {
          status: 'CONFIRMED',
          timestamp: '2026-09-28 10:30 AM',
          description: 'Payment confirmed & inventory locked',
          completed: true
        },
        {
          status: 'PACKED',
          timestamp: '2026-09-28 04:00 PM',
          description: 'Carefully wrapped in eco-friendly paper packaging',
          completed: true
        },
        {
          status: 'SHIPPED',
          timestamp: '2026-09-29 09:30 AM',
          description: 'Dispatched via BlueDart Express (TRK-98124982)',
          completed: true
        },
        {
          status: 'OUT FOR DELIVERY',
          timestamp: 'Expected Today',
          description: 'Courier agent assigned for doorstep delivery',
          completed: false
        },
        {
          status: 'DELIVERED',
          timestamp: 'Expected Today by 6 PM',
          description: 'Delivered to recipient',
          completed: false
        }
      ],
      expectedDelivery: 'Today by 6:00 PM',
      createdAt: '2026-09-28T10:15:00Z'
    }
  ],
  reviews: [...initialReviews],
  coupons: [...initialCoupons],
  cart: {
    'usr-demo': [
      {
        id: 'cart-1',
        productId: 'prod-08',
        product: allInitialProducts.find(p => p.id === 'prod-08')!,
        quantity: 1,
        selectedColor: 'Natural Ecru'
      }
    ]
  },
  wishlist: {
    'usr-demo': [
      {
        id: 'w-1',
        productId: 'prod-10',
        product: allInitialProducts.find(p => p.id === 'prod-10')!,
        addedAt: '2026-09-25T12:00:00Z'
      },
      {
        id: 'w-2',
        productId: 'prod-18',
        product: allInitialProducts.find(p => p.id === 'prod-18')!,
        addedAt: '2026-09-26T14:30:00Z'
      }
    ]
  }
};

export const dbStore = {
  // Products
  getProducts: (filters?: {
    search?: string;
    category?: string;
    mood?: string;
    occasion?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    rating?: number;
    sort?: string;
    isVyraPick?: boolean;
    isPriceDrop?: boolean;
    isTrending?: boolean;
  }) => {
    let list = [...state.products];

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters?.category && filters.category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters?.mood) {
      list = list.filter(p => p.moods.includes(filters.mood as any));
    }

    if (filters?.occasion) {
      list = list.filter(p => p.occasions.includes(filters.occasion as any));
    }

    if (filters?.minPrice !== undefined) {
      list = list.filter(p => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      list = list.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters?.brand) {
      list = list.filter(p => p.brand.toLowerCase() === filters.brand!.toLowerCase());
    }

    if (filters?.rating) {
      list = list.filter(p => p.rating >= filters.rating!);
    }

    if (filters?.isVyraPick) {
      list = list.filter(p => p.isVyraPick);
    }

    if (filters?.isPriceDrop) {
      list = list.filter(p => p.isPriceDrop || (p.savings && p.savings > 0));
    }

    if (filters?.isTrending) {
      list = list.filter(p => p.isTrending);
    }

    // Sorting
    switch (filters?.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'discount':
        list.sort((a, b) => b.discount - a.discount);
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.stats?.saved || 0) - (a.stats?.saved || 0));
        break;
    }

    return list;
  },

  getProductById: (id: string) => {
    return state.products.find(p => p.id === id);
  },

  addProduct: (product: Product) => {
    state.products.unshift(product);
    return product;
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    const idx = state.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    state.products[idx] = { ...state.products[idx], ...updates };
    return state.products[idx];
  },

  deleteProduct: (id: string) => {
    const idx = state.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    state.products.splice(idx, 1);
    return true;
  },

  // Users
  getUserByEmail: (email: string) => {
    return state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  getUserById: (id: string) => {
    return state.users.find(u => u.id === id);
  },

  createUser: (user: User & { passwordHash: string }) => {
    state.users.push(user);
    return user;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const idx = state.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    state.users[idx] = { ...state.users[idx], ...updates };
    return state.users[idx];
  },

  // Cart
  getCart: (userId: string): CartItem[] => {
    return state.cart[userId] || [];
  },

  addToCart: (userId: string, item: Omit<CartItem, 'id'>): CartItem[] => {
    if (!state.cart[userId]) state.cart[userId] = [];
    const existing = state.cart[userId].find(
      i =>
        i.productId === item.productId &&
        i.selectedColor === item.selectedColor &&
        i.selectedSize === item.selectedSize
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        ...item
      };
      state.cart[userId].push(newItem);
    }
    return state.cart[userId];
  },

  updateCartItem: (userId: string, itemId: string, quantity: number): CartItem[] => {
    if (!state.cart[userId]) return [];
    if (quantity <= 0) {
      state.cart[userId] = state.cart[userId].filter(i => i.id !== itemId);
    } else {
      const item = state.cart[userId].find(i => i.id !== itemId);
      const target = state.cart[userId].find(i => i.id === itemId);
      if (target) target.quantity = quantity;
    }
    return state.cart[userId];
  },

  removeFromCart: (userId: string, itemId: string): CartItem[] => {
    if (!state.cart[userId]) return [];
    state.cart[userId] = state.cart[userId].filter(i => i.id !== itemId);
    return state.cart[userId];
  },

  clearCart: (userId: string) => {
    state.cart[userId] = [];
  },

  // Wishlist
  getWishlist: (userId: string): WishlistItem[] => {
    return state.wishlist[userId] || [];
  },

  toggleWishlist: (userId: string, product: Product) => {
    if (!state.wishlist[userId]) state.wishlist[userId] = [];
    const idx = state.wishlist[userId].findIndex(i => i.productId === product.id);
    if (idx !== -1) {
      state.wishlist[userId].splice(idx, 1);
      // Decrement product stats
      if (product.stats) product.stats.saved = Math.max(0, product.stats.saved - 1);
      return { action: 'removed', items: state.wishlist[userId] };
    } else {
      state.wishlist[userId].push({
        id: `wish-${Date.now()}`,
        productId: product.id,
        product,
        addedAt: new Date().toISOString()
      });
      // Increment product stats
      if (product.stats) product.stats.saved += 1;
      return { action: 'added', items: state.wishlist[userId] };
    }
  },

  // Orders
  getOrders: (userId?: string) => {
    if (userId) {
      return state.orders.filter(o => o.userId === userId);
    }
    return state.orders;
  },

  getOrderById: (orderId: string) => {
    return state.orders.find(o => o.id === orderId || o.trackingId === orderId);
  },

  createOrder: (order: Order) => {
    state.orders.unshift(order);
    return order;
  },

  updateOrderStatus: (orderId: string, status: any) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return null;
    order.status = status;
    // Update timeline
    const item = order.timeline.find(t => t.status === status);
    if (item) item.completed = true;
    return order;
  },

  // Reviews
  getReviews: (productId: string) => {
    return state.reviews.filter(r => r.productId === productId);
  },

  addReview: (review: Review) => {
    state.reviews.unshift(review);
    // Update product rating
    const prod = state.products.find(p => p.id === review.productId);
    if (prod) {
      const prodReviews = state.reviews.filter(r => r.productId === review.productId);
      const avg = prodReviews.reduce((acc, r) => acc + r.rating, 0) / prodReviews.length;
      prod.rating = parseFloat(avg.toFixed(1));
      prod.reviewsCount = prodReviews.length;
    }
    return review;
  },

  // Coupons
  getCoupons: () => state.coupons,
  validateCoupon: (code: string, subtotal: number) => {
    const coupon = state.coupons.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) return { valid: false, message: 'Invalid coupon code' };
    if (subtotal < coupon.minOrderValue) {
      return { valid: false, message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}` };
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }
    return { valid: true, coupon, discount };
  },

  // Analytics (for Admin)
  getAnalytics: () => {
    const totalRevenue = state.orders.reduce((acc, o) => acc + (o.paymentStatus === 'PAID' ? o.total : 0), 0);
    const totalOrders = state.orders.length;
    const totalUsers = state.users.length;
    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const categorySales: Record<string, number> = {};
    state.orders.forEach(order => {
      order.items.forEach(item => {
        const prod = state.products.find(p => p.id === item.productId);
        const cat = prod?.category || 'Lifestyle';
        categorySales[cat] = (categorySales[cat] || 0) + item.price * item.quantity;
      });
    });

    const lowStockProducts = state.products.filter(p => p.stockCount <= 20);

    return {
      revenue: totalRevenue,
      orders: totalOrders,
      customers: totalUsers,
      averageOrderValue: aov,
      categorySales,
      lowStockProducts,
      recentOrders: state.orders.slice(0, 5)
    };
  },

  // Reset to initial seed
  resetSeed: () => {
    state.products = [...allInitialProducts];
    return state.products.length;
  }
};

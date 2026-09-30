import { Product, User, Order, Review, Coupon, CartItem, WishlistItem, Article, LookBundle, DaySegment } from '../types';
import { allInitialProducts, vyraArticles, lookBundles, daySegments, initialCoupons } from '../data/seedData';

const BASE_URL = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('vyra_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Products
  async getProducts(params?: {
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
  }): Promise<{ products: Product[]; total: number }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query.append(k, String(v));
        }
      });
    }

    try {
      const res = await fetch(`${BASE_URL}/products?${query.toString()}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      return { products: data.products || [], total: data.total || 0 };
    } catch (err: any) {
      console.warn('API error fetching products, falling back to local dataset:', err);
      // Fallback filtering
      let list = [...allInitialProducts];
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      if (params?.category && params.category !== 'All') {
        list = list.filter(p => p.category.toLowerCase() === params.category!.toLowerCase());
      }
      return { products: list, total: list.length };
    }
  },

  async getProduct(id: string): Promise<Product> {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      return data.product;
    } catch {
      const found = allInitialProducts.find(p => p.id === id);
      if (found) return found;
      throw new Error('Product not found');
    }
  },

  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('vyra_token', data.token);
    return data;
  },

  async register(data: { name: string; email: string; password: string; phone?: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Registration failed' }));
      throw new Error(err.error || 'Registration failed');
    }
    const resData = await res.json();
    localStorage.setItem('vyra_token', resData.token);
    return resData;
  },

  async getMe(): Promise<User | null> {
    const token = localStorage.getItem('vyra_token');
    if (!token) return null;
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: getAuthHeader()
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('vyra_token');
  },

  // Cart
  async getCart(): Promise<CartItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error('Failed to load cart');
      const data = await res.json();
      return data.items || [];
    } catch {
      const local = localStorage.getItem('vyra_cart');
      return local ? JSON.parse(local) : [];
    }
  },

  async addToCart(productId: string, quantity = 1, selectedColor?: string, selectedSize?: string): Promise<CartItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ productId, quantity, selectedColor, selectedSize })
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      const data = await res.json();
      return data.items;
    } catch {
      // Local fallback
      const product = allInitialProducts.find(p => p.id === productId);
      if (!product) return [];
      const current = await this.getCart();
      const existing = current.find(i => i.productId === productId && i.selectedColor === selectedColor);
      if (existing) {
        existing.quantity += quantity;
      } else {
        current.push({
          id: `cart-${Date.now()}`,
          productId,
          product,
          quantity,
          selectedColor,
          selectedSize
        });
      }
      localStorage.setItem('vyra_cart', JSON.stringify(current));
      return current;
    }
  },

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      return data.items;
    } catch {
      const current = await this.getCart();
      const updated = quantity <= 0 ? current.filter(i => i.id !== itemId) : current.map(i => i.id === itemId ? { ...i, quantity } : i);
      localStorage.setItem('vyra_cart', JSON.stringify(updated));
      return updated;
    }
  },

  async removeFromCart(itemId: string): Promise<CartItem[]> {
    return this.updateCartItem(itemId, 0);
  },

  // Wishlist
  async getWishlist(): Promise<WishlistItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/wishlist`, {
        headers: getAuthHeader()
      });
      const data = await res.json();
      return data.items || [];
    } catch {
      const local = localStorage.getItem('vyra_wishlist');
      return local ? JSON.parse(local) : [];
    }
  },

  async toggleWishlist(productId: string): Promise<{ action: 'added' | 'removed'; items: WishlistItem[] }> {
    try {
      const res = await fetch(`${BASE_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      return data;
    } catch {
      const current = await this.getWishlist();
      const idx = current.findIndex(i => i.productId === productId);
      const product = allInitialProducts.find(p => p.id === productId)!;
      let action: 'added' | 'removed' = 'added';
      if (idx !== -1) {
        current.splice(idx, 1);
        action = 'removed';
      } else {
        current.push({
          id: `w-${Date.now()}`,
          productId,
          product,
          addedAt: new Date().toISOString()
        });
      }
      localStorage.setItem('vyra_wishlist', JSON.stringify(current));
      return { action, items: current };
    }
  },

  // Orders
  async createOrder(orderData: any): Promise<Order> {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to place order');
    }
    const data = await res.json();
    return data.order;
  },

  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: getAuthHeader()
      });
      const data = await res.json();
      return data.orders || [];
    } catch {
      return [];
    }
  },

  async getOrder(id: string): Promise<Order | null> {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.order;
    } catch {
      return null;
    }
  },

  // Reviews
  async getReviews(productId: string): Promise<Review[]> {
    try {
      const res = await fetch(`${BASE_URL}/products/${productId}/reviews`);
      const data = await res.json();
      return data.reviews || [];
    } catch {
      return [];
    }
  },

  async addReview(productId: string, review: { rating: number; title: string; comment: string; userName?: string }): Promise<Review> {
    const res = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(review)
    });
    const data = await res.json();
    return data.review;
  },

  // Collections & Articles
  async getCollections(): Promise<{ articles: Article[]; looks: LookBundle[]; daySegments: DaySegment[] }> {
    try {
      const res = await fetch(`${BASE_URL}/collections`);
      if (!res.ok) throw new Error('Collections fetch error');
      return await res.json();
    } catch {
      return { articles: vyraArticles, looks: lookBundles, daySegments };
    }
  },

  // Coupons
  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount?: number; coupon?: Coupon; message?: string }> {
    try {
      const res = await fetch(`${BASE_URL}/coupons/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      return await res.json();
    } catch {
      const c = initialCoupons.find(x => x.code === code.toUpperCase());
      if (!c) return { valid: false, message: 'Invalid coupon' };
      if (subtotal < c.minOrderValue) return { valid: false, message: `Min order ₹${c.minOrderValue}` };
      const discount = c.discountType === 'percentage' ? Math.round((subtotal * c.discountValue) / 100) : c.discountValue;
      return { valid: true, discount, coupon: c };
    }
  },

  // Admin
  async getAdminAnalytics() {
    const res = await fetch(`${BASE_URL}/admin/analytics`, { headers: getAuthHeader() });
    return await res.json();
  },

  async updateProduct(id: string, updates: Partial<Product>) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(updates)
    });
    return await res.json();
  },

  async createProduct(data: Partial<Product>) {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return await res.json();
  },

  async updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ status })
    });
    return await res.json();
  }
};

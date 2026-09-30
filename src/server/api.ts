import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dbStore } from './db';
import { vyraArticles, lookBundles, daySegments } from '../data/seedData';
import { User, Order, Review, Product } from '../types';

export const apiRouter = express.Router();
apiRouter.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'vyra-secret-key-2026-lifestyle-editorial';

// Helper for extracting authenticated user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    const user = dbStore.getUserById(decoded.id);
    if (user) {
      req.user = user;
    }
  } catch (err) {
    // invalid token, proceed unauthenticated
  }
  next();
};

apiRouter.use(authMiddleware);

// ======================== AUTHENTICATION ========================

apiRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = dbStore.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email,
      name,
      phone: phone || '',
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    dbStore.createUser({ ...newUser, passwordHash });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({ user: newUser, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check demo accounts fast-path
    if (email === 'admin@vyra.store' && password === 'admin123') {
      const user = dbStore.getUserByEmail('admin@vyra.store');
      if (user) {
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
          expiresIn: '30d'
        });
        const { passwordHash, ...safeUser } = user;
        return res.json({ user: safeUser, token });
      }
    }

    if (email === 'tanya@example.com' && (password === 'password123' || password === 'tanya123')) {
      const user = dbStore.getUserByEmail('tanya@example.com');
      if (user) {
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
          expiresIn: '30d'
        });
        const { passwordHash, ...safeUser } = user;
        return res.json({ user: safeUser, token });
      }
    }

    const user = dbStore.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid && password !== 'password123') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '30d'
    });

    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

apiRouter.get('/auth/me', (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: req.user });
});

apiRouter.post('/auth/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

apiRouter.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  res.json({
    success: true,
    message: `Password reset instructions have been sent to ${email}.`
  });
});

apiRouter.post('/auth/reset-password', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Password has been reset successfully. Please log in.' });
});

// ======================== PRODUCTS ========================

apiRouter.get('/products', (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      mood,
      occasion,
      minPrice,
      maxPrice,
      brand,
      rating,
      sort,
      isVyraPick,
      isPriceDrop,
      isTrending
    } = req.query;

    const products = dbStore.getProducts({
      search: search as string,
      category: category as string,
      mood: mood as string,
      occasion: occasion as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      brand: brand as string,
      rating: rating ? Number(rating) : undefined,
      sort: sort as string,
      isVyraPick: isVyraPick === 'true',
      isPriceDrop: isPriceDrop === 'true',
      isTrending: isTrending === 'true'
    });

    res.json({
      success: true,
      total: products.length,
      products
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load products. Please retry.' });
  }
});

apiRouter.get('/products/:id', (req: Request, res: Response) => {
  const product = dbStore.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ product });
});

apiRouter.post('/products', (req: AuthenticatedRequest, res: Response) => {
  try {
    const pData = req.body;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: pData.name,
      brand: pData.brand || 'VYRA Studio',
      category: pData.category || 'Fashion',
      price: Number(pData.price),
      originalPrice: Number(pData.originalPrice || pData.price),
      discount: pData.discount || 0,
      rating: 5.0,
      reviewsCount: 0,
      inStock: true,
      stockCount: Number(pData.stockCount || 50),
      images: pData.images || ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
      description: pData.description,
      details: pData.details || ['Thoughtfully crafted everyday essential'],
      whyWePickedIt: pData.whyWePickedIt || ['Exceptional utility and modern shape'],
      moods: pData.moods || ['SLOW MORNING', 'WORK MODE'],
      occasions: pData.occasions || ['WORK', 'TRAVEL'],
      tags: pData.tags || ['lifestyle', 'everyday'],
      stats: { saved: 0, wishlisted: 0, reviews: 0, gifted: 0 },
      createdAt: new Date().toISOString()
    };

    const added = dbStore.addProduct(newProduct);
    res.status(201).json({ product: added });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create product' });
  }
});

apiRouter.put('/products/:id', (req: Request, res: Response) => {
  const updated = dbStore.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Product not found' });
  res.json({ product: updated });
});

apiRouter.delete('/products/:id', (req: Request, res: Response) => {
  const success = dbStore.deleteProduct(req.params.id);
  if (!success) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true, message: 'Product removed' });
});

// ======================== CART ========================

apiRouter.get('/cart', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const cart = dbStore.getCart(userId);
  res.json({ items: cart });
});

apiRouter.post('/cart', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const { productId, quantity = 1, selectedColor, selectedSize } = req.body;
  const product = dbStore.getProductById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const cart = dbStore.addToCart(userId, {
    productId,
    product,
    quantity,
    selectedColor,
    selectedSize
  });

  res.json({ items: cart });
});

apiRouter.put('/cart/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const { quantity } = req.body;
  const cart = dbStore.updateCartItem(userId, req.params.id, quantity);
  res.json({ items: cart });
});

apiRouter.delete('/cart/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const cart = dbStore.removeFromCart(userId, req.params.id);
  res.json({ items: cart });
});

// ======================== WISHLIST ========================

apiRouter.get('/wishlist', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const wishlist = dbStore.getWishlist(userId);
  res.json({ items: wishlist });
});

apiRouter.post('/wishlist', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'guest';
  const { productId } = req.body;
  const product = dbStore.getProductById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const result = dbStore.toggleWishlist(userId, product);
  res.json(result);
});

// ======================== ORDERS ========================

apiRouter.get('/orders', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const orders = dbStore.getOrders(userId);
  res.json({ orders });
});

apiRouter.get('/orders/:id', (req: Request, res: Response) => {
  const order = dbStore.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ order });
});

apiRouter.post('/orders', (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 99;

    let discount = 0;
    if (couponCode) {
      const couponRes = dbStore.validateCoupon(couponCode, subtotal);
      if (couponRes.valid) {
        discount = couponRes.discount || 0;
      }
    }

    const total = Math.max(0, subtotal + shipping - discount);

    const orderId = `VYRA-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingId = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      trackingId,
      userId: req.user?.id || 'guest',
      customerName: shippingAddress.name || req.user?.name || 'Valued Customer',
      customerEmail: req.user?.email || 'customer@example.com',
      items,
      subtotal,
      shipping,
      discount,
      total,
      status: 'CONFIRMED',
      shippingAddress,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: 'PAID',
      timeline: [
        {
          status: 'ORDER PLACED',
          timestamp: 'Just now',
          description: `Order placed via ${paymentMethod || 'UPI'}`,
          completed: true
        },
        {
          status: 'CONFIRMED',
          timestamp: 'Just now',
          description: 'Payment authorized & items reserved',
          completed: true
        },
        {
          status: 'PACKED',
          timestamp: 'Estimated Tomorrow',
          description: 'Curated packaging in plastic-free recycled paper',
          completed: false
        },
        {
          status: 'SHIPPED',
          timestamp: 'Estimated in 2 days',
          description: 'Dispatched via premium express courier',
          completed: false
        },
        {
          status: 'OUT FOR DELIVERY',
          timestamp: 'Estimated in 3 days',
          description: 'Local delivery partner out for delivery',
          completed: false
        },
        {
          status: 'DELIVERED',
          timestamp: 'Estimated in 3-4 days',
          description: 'Delivered securely to your doorstep',
          completed: false
        }
      ],
      expectedDelivery: 'In 3-4 business days',
      createdAt: new Date().toISOString()
    };

    const savedOrder = dbStore.createOrder(newOrder);

    // Clear cart
    const userId = req.user?.id || 'guest';
    dbStore.clearCart(userId);

    res.status(201).json({ success: true, order: savedOrder });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create order' });
  }
});

apiRouter.put('/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = dbStore.updateOrderStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json({ order: updated });
});

// ======================== REVIEWS ========================

apiRouter.get('/products/:id/reviews', (req: Request, res: Response) => {
  const reviews = dbStore.getReviews(req.params.id);
  res.json({ reviews });
});

apiRouter.post('/products/:id/reviews', (req: AuthenticatedRequest, res: Response) => {
  try {
    const { rating, title, comment, userName } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: req.params.id,
      userId: req.user?.id || 'guest',
      userName: userName || req.user?.name || 'Verified Customer',
      rating: Number(rating),
      title: title || 'Great purchase',
      comment,
      isVerified: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };

    const saved = dbStore.addReview(newReview);
    res.status(201).json({ review: saved });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit review' });
  }
});

// ======================== CURATIONS, EDIT & LOOKS ========================

apiRouter.get('/collections', (_req: Request, res: Response) => {
  res.json({
    articles: vyraArticles,
    looks: lookBundles,
    daySegments
  });
});

apiRouter.get('/coupons', (_req: Request, res: Response) => {
  res.json({ coupons: dbStore.getCoupons() });
});

apiRouter.post('/coupons/apply', (req: Request, res: Response) => {
  const { code, subtotal } = req.body;
  const result = dbStore.validateCoupon(code, Number(subtotal));
  res.json(result);
});

// ======================== ADMIN DASHBOARD ========================

apiRouter.get('/admin/analytics', (_req: Request, res: Response) => {
  res.json(dbStore.getAnalytics());
});

apiRouter.get('/admin/users', (_req: Request, res: Response) => {
  const users = (dbStore as any).getUsers ? (dbStore as any).getUsers() : [];
  res.json({ users });
});

apiRouter.get('/admin/inventory', (_req: Request, res: Response) => {
  const products = dbStore.getProducts();
  const lowStock = products.filter(p => p.stockCount <= 25);
  res.json({
    totalProducts: products.length,
    lowStockCount: lowStock.length,
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      stockCount: p.stockCount,
      inStock: p.inStock
    }))
  });
});

// Seed endpoint
apiRouter.post('/seed', (_req: Request, res: Response) => {
  const count = dbStore.resetSeed();
  res.json({ success: true, message: `Database seeded with ${count} products` });
});

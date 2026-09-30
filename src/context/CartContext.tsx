import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Coupon } from '../types';
import { api } from '../services/api';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, quantity?: number, selectedColor?: string, selectedSize?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  subtotal: number;
  freeShippingThreshold: number;
  amountAwayFromFreeShipping: number;
  freeShippingProgress: number;
  shippingFee: number;
  total: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    api.getCart()
      .then(items => setCart(items))
      .catch(() => setCart([]))
      .finally(() => setIsLoading(false));
  }, []);

  const addToCart = async (productId: string, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    try {
      const updated = await api.addToCart(productId, quantity, selectedColor, selectedSize);
      setCart(updated);
      showToast('Added to your bag', 'success');
      setIsCartOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Could not add item', 'error');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const updated = await api.updateCartItem(itemId, quantity);
      setCart(updated);
    } catch {
      showToast('Failed to update quantity', 'error');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updated = await api.removeFromCart(itemId);
      setCart(updated);
      showToast('Item removed from bag', 'info');
    } catch {
      showToast('Failed to remove item', 'error');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal + shippingFee - couponDiscount);

  const applyCoupon = async (code: string) => {
    const res = await api.validateCoupon(code, subtotal);
    if (res.valid && res.coupon && res.discount !== undefined) {
      setAppliedCoupon(res.coupon);
      setCouponDiscount(res.discount);
      showToast(`Coupon ${res.coupon.code} applied! Saved ₹${res.discount}`, 'success');
      return { success: true, message: 'Coupon applied successfully' };
    } else {
      showToast(res.message || 'Invalid coupon code', 'error');
      return { success: false, message: res.message || 'Invalid coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountAwayFromFreeShipping,
        freeShippingProgress,
        shippingFee,
        total,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

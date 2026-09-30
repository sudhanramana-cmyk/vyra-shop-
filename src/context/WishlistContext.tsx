import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem, Product } from '../types';
import { api } from '../services/api';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  isLoading: boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (item: WishlistItem) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    api.getWishlist()
      .then(items => setWishlist(items))
      .catch(() => setWishlist([]))
      .finally(() => setIsLoading(false));
  }, []);

  const isInWishlist = (productId: string) => {
    return wishlist.some(i => i.productId === productId);
  };

  const toggleWishlist = async (product: Product) => {
    try {
      const res = await api.toggleWishlist(product.id);
      setWishlist(res.items);
      if (res.action === 'added') {
        showToast('Saved to your wishlist', 'success');
      } else {
        showToast('Removed from wishlist', 'info');
      }
    } catch {
      showToast('Could not update saved items', 'error');
    }
  };

  const moveToCart = async (item: WishlistItem) => {
    await addToCart(item.productId, 1);
    await toggleWishlist(item.product);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        toggleWishlist,
        isInWishlist,
        moveToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};

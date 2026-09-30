import React from 'react';
import { Home, ShoppingBag, Compass, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { cart, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EADFD0] px-4 py-2 flex items-center justify-around shadow-lg">
      {/* HOME */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          activeTab === 'home' ? 'text-[#C05A3E]' : 'text-[#8C7A6B]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* SHOP */}
      <button
        onClick={() => setActiveTab('shop')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          activeTab === 'shop' ? 'text-[#C05A3E]' : 'text-[#8C7A6B]'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Shop</span>
      </button>

      {/* DISCOVER */}
      <button
        onClick={() => setActiveTab('discover')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          activeTab === 'discover' ? 'text-[#C05A3E]' : 'text-[#8C7A6B]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      {/* SAVED */}
      <button
        onClick={() => setActiveTab('saved')}
        className={`relative flex flex-col items-center gap-1 p-1 text-[10px] font-bold tracking-wider uppercase transition-colors ${
          activeTab === 'saved' ? 'text-[#C05A3E]' : 'text-[#8C7A6B]'
        }`}
      >
        <Heart className={`w-5 h-5 ${activeTab === 'saved' ? 'fill-[#C05A3E]' : ''}`} />
        <span>Saved</span>
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#C05A3E] text-white text-[9px] flex items-center justify-center font-bold">
            {wishlist.length}
          </span>
        )}
      </button>

      {/* CART */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 p-1 text-[10px] font-bold tracking-wider uppercase text-[#8C7A6B] hover:text-[#242120]"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {totalCartCount > 0 && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#2E241F] text-white text-[9px] flex items-center justify-center font-bold">
            {totalCartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

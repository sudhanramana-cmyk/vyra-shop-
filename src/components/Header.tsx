import React from 'react';
import { Search, Heart, ShoppingBag, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, openSearch }) => {
  const { cart, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, openAuthModal, isAdmin } = useAuth();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADFD0] transition-all">
      {/* Announcement Bar */}
      <div className="bg-[#2E241F] text-[#F5EFE6] text-center py-2 px-4 text-[11px] sm:text-xs tracking-wider uppercase font-medium">
        <span>Free Shipping on Orders Above ₹999</span>
        <span className="mx-3 opacity-40">•</span>
        <span>Easy 15-Day Doorstep Returns</span>
        <span className="mx-3 opacity-40 hidden sm:inline">•</span>
        <span className="hidden sm:inline">Crafted for Everyday Joy</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('home')}
            className="group text-left focus:outline-none"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#242120] group-hover:text-[#B24C30] transition-colors">
                VYRA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C05A3E]"></span>
            </div>
            <p className="text-[10px] tracking-widest uppercase font-medium text-[#8C7A6B] -mt-1 hidden sm:block">
              Everyday Living
            </p>
          </button>
        </div>

        {/* Center Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-semibold text-[#5A4B43]">
          <button
            onClick={() => setActiveTab('shop')}
            className={`transition-colors py-1 relative ${
              activeTab === 'shop' ? 'text-[#B24C30]' : 'hover:text-[#242120]'
            }`}
          >
            Shop
            {activeTab === 'shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B24C30]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('discover')}
            className={`transition-colors py-1 relative ${
              activeTab === 'discover' ? 'text-[#B24C30]' : 'hover:text-[#242120]'
            }`}
          >
            Discover
            {activeTab === 'discover' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B24C30]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`transition-colors py-1 relative ${
              activeTab === 'collections' ? 'text-[#B24C30]' : 'hover:text-[#242120]'
            }`}
          >
            Collections
            {activeTab === 'collections' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B24C30]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('trending')}
            className={`transition-colors py-1 relative ${
              activeTab === 'trending' ? 'text-[#B24C30]' : 'hover:text-[#242120]'
            }`}
          >
            Trending
            {activeTab === 'trending' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B24C30]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`transition-colors py-1 relative ${
              activeTab === 'edit' ? 'text-[#B24C30]' : 'hover:text-[#242120]'
            }`}
          >
            The Edit
            {activeTab === 'edit' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B24C30]"></span>
            )}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 text-[#5A4B43] hover:text-[#242120] transition-colors p-2 rounded-full hover:bg-[#EFE8DD]"
            aria-label="Search products"
          >
            <Search className="w-5 h-5" />
            <span className="hidden xl:inline text-xs font-normal tracking-normal text-[#8C7A6B]">
              Search normal everyday items...
            </span>
          </button>

          {/* Saved / Wishlist */}
          <button
            onClick={() => setActiveTab('saved')}
            className="relative text-[#5A4B43] hover:text-[#242120] transition-colors p-2 rounded-full hover:bg-[#EFE8DD]"
            aria-label="Saved items"
          >
            <Heart className={`w-5 h-5 ${activeTab === 'saved' ? 'fill-[#C05A3E] text-[#C05A3E]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C05A3E] text-white text-[10px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-[#5A4B43] hover:text-[#242120] transition-colors p-2 rounded-full hover:bg-[#EFE8DD]"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2E241F] text-white text-[10px] flex items-center justify-center font-bold">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Profile / Admin Link */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-2 text-xs font-medium pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                  activeTab === 'account'
                    ? 'border-[#B24C30] text-[#B24C30] bg-[#FAF3EE]'
                    : 'border-[#DDD2C3] text-[#4A3B32] hover:border-[#8C7A6B]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#D49B8E] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${
                    activeTab === 'admin'
                      ? 'border-[#7D9381] text-[#3E5242] bg-[#EFF4F0]'
                      : 'border-[#DDD2C3] text-[#4E5F52] hover:bg-[#F2F6F3]'
                  }`}
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-4 h-4 text-[#627A67]" />
                  <span className="hidden md:inline">Admin</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#4A3B32] hover:text-[#242120] px-3 py-1.5 rounded-full border border-[#DDD2C3] hover:border-[#8C7A6B] transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

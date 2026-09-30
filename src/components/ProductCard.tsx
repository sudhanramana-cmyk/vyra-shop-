import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors?.[0]?.name;
    const defaultSize = product.sizes?.[0];
    addToCart(product.id, 1, defaultColor, defaultSize);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative bg-[#FDFBF7] rounded-xl overflow-hidden border border-[#EBE2D5] hover:border-[#D0C2B0] hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#F3ECE2]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isVyraPick && (
            <span className="bg-[#2E241F] text-[#FAF7F2] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
              VYRA Pick
            </span>
          )}
          {product.discount > 0 && !product.isVyraPick && (
            <span className="bg-[#C05A3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.isPriceDrop && (
            <span className="bg-[#DE7E6A] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
              Price Drop
            </span>
          )}
        </div>

        {/* Quick Save Heart Button */}
        <button
          onClick={handleToggleSave}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#C05A3E] text-white'
              : 'bg-white/80 hover:bg-white text-[#4A3B32] shadow-xs backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Subtle Quick Add on Hover */}
        <button
          onClick={handleQuickAdd}
          aria-label="Add to bag"
          className="absolute bottom-3 right-3 bg-[#2E241F] hover:bg-[#C05A3E] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all transform sm:group-hover:scale-105"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] uppercase tracking-wider font-semibold mb-1">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-[#4A3B32]">
              <Star className="w-3.5 h-3.5 fill-[#D49B8E] text-[#D49B8E]" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-[#A39284]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-semibold text-[#242120] line-clamp-1 group-hover:text-[#B24C30] transition-colors mb-2">
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-2 border-t border-[#F0E8DC]">
          <span className="text-base font-bold text-[#242120]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#9C8B7E] line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[11px] font-semibold text-[#C05A3E] ml-auto">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

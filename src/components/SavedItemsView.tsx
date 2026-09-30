import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface SavedItemsViewProps {
  onOpenDetails: (product: Product) => void;
  onExplore: () => void;
}

export const SavedItemsView: React.FC<SavedItemsViewProps> = ({ onOpenDetails, onExplore }) => {
  const { wishlist, toggleWishlist, moveToCart } = useWishlist();

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#EADFD0] gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-1">
            Curated Wishlist
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#242120]">
            Saved Items ({wishlist.length})
          </h2>
          <p className="text-xs text-[#7D6B5D] mt-1">
            Pieces you’ve bookmarked for your everyday wardrobe, desk, or living spaces.
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-16 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EFE8DD] text-[#8C7A6B] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#242120] mb-2">
            No saved items yet
          </h3>
          <p className="text-xs text-[#7D6B5D] max-w-xs mx-auto mb-6">
            Click the heart icon on any product card while browsing to curate your personal list.
          </p>
          <button
            onClick={onExplore}
            className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-7 py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-colors"
          >
            Start Exploring
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(item => {
            const p = item.product;
            return (
              <div
                key={item.id}
                className="group bg-[#FDFBF7] rounded-xl border border-[#E8DDD4] hover:border-[#8C7A6B] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => onOpenDetails(p)}
                    className="relative aspect-4/5 overflow-hidden bg-[#F3ECE2] cursor-pointer"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    {p.isPriceDrop && (
                      <span className="absolute top-3 left-3 bg-[#DE7E6A] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                        Price Drop
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#BA5943] flex items-center justify-center shadow-xs"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4" onClick={() => onOpenDetails(p)}>
                    <div className="text-[10px] text-[#8C7A6B] uppercase font-semibold mb-1">
                      {p.brand}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#242120] line-clamp-1 group-hover:text-[#C05A3E] transition-colors mb-2 cursor-pointer">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-base font-bold text-[#242120]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      {p.originalPrice > p.price && (
                        <span className="text-xs text-[#8C7A6B] line-through">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#627A67] font-semibold">
                      {p.inStock ? '✓ In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full bg-[#2E241F] hover:bg-[#C05A3E] text-white py-2.5 px-4 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

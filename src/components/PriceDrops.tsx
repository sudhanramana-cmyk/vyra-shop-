import React from 'react';
import { Product } from '../types';
import { Tag, BookmarkCheck, ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface PriceDropsProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onExploreCatalog: (filter: { isPriceDrop: boolean }) => void;
}

export const PriceDrops: React.FC<PriceDropsProps> = ({ products, onOpenDetails, onExploreCatalog }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const priceDropProducts = products
    .filter(p => p.isPriceDrop || (p.originalPrice - p.price >= 300))
    .slice(0, 4);

  const handleSaveDeal = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(`Deal saved for ${product.name}!`, 'success');
  };

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#DE7E6A] mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Opportunities</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Price Drops
            </h2>
          </div>
          <button
            onClick={() => onExploreCatalog({ isPriceDrop: true })}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C05A3E] hover:text-[#B24C30] cursor-pointer mt-2 md:mt-0"
          >
            <span>View All Reduced Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Price Drop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceDropProducts.map(product => {
            const savings = product.savings || (product.originalPrice - product.price);
            const isSaved = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onOpenDetails(product)}
                className="group bg-[#FDFBF7] rounded-xl border border-[#E8DDD4] hover:border-[#C05A3E] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F3ECE2]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#DE7E6A] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
                      SAVE ₹{savings.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] text-[#8C7A6B] uppercase font-semibold mb-1">
                      {product.brand}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#242120] line-clamp-1 group-hover:text-[#C05A3E] transition-colors mb-3">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-bold text-[#242120]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#8C7A6B] line-through">
                        was ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={(e) => handleSaveDeal(e, product)}
                    className={`w-full py-2.5 px-4 rounded-md text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                      isSaved
                        ? 'bg-[#EFF4F0] text-[#3E5242] border-[#7D9381]'
                        : 'bg-[#FAF7F2] hover:bg-[#2E241F] text-[#2E241F] hover:text-white border-[#2E241F]'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-[#627A67]" />
                        <span>Deal Saved</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" />
                        <span>Save This Deal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

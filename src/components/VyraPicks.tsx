import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface VyraPicksProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const VyraPicks: React.FC<VyraPicksProps> = ({ products, onOpenDetails }) => {
  const vyraPicksList = products.filter(p => p.isVyraPick || (p.whyWePickedIt && p.whyWePickedIt.length > 0));
  const [activePickIndex, setActivePickIndex] = useState(0);

  const activeProduct = vyraPicksList[activePickIndex] || vyraPicksList[0];
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!activeProduct) return null;

  const isSaved = isInWishlist(activeProduct.id);

  return (
    <section className="py-16 md:py-24 border-b border-[#EADFD0] bg-[#F4EFE6]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Curation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120] mb-3">
            VYRA Picks
          </h2>
          <p className="text-sm text-[#7D6B5D]">
            We test dozens of everyday items and only recommend pieces that earn their keep on your shelf.
          </p>
        </div>

        {/* Featured Pick Spotlight Container */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 mb-10">
          {/* Left Large Product Showcase */}
          <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-1/1 lg:aspect-auto bg-[#EFE8DD] overflow-hidden">
            <img
              src={activeProduct.images[0]}
              alt={activeProduct.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#2E241F] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm">
              Spotlight Pick
            </div>
            <button
              onClick={() => toggleWishlist(activeProduct)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#4A3B32] hover:text-[#C05A3E] flex items-center justify-center shadow-xs cursor-pointer"
              aria-label="Save pick"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C05A3E] text-[#C05A3E]' : ''}`} />
            </button>
          </div>

          {/* Right Why We Picked It Editorial Breakdown */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8C7A6B] uppercase tracking-wider font-semibold mb-2">
                <span>{activeProduct.brand} • {activeProduct.category}</span>
                <span className="text-[#C05A3E] font-bold">★ {activeProduct.rating} ({activeProduct.reviewsCount} reviews)</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242120] mb-3">
                {activeProduct.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-[#242120]">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.originalPrice > activeProduct.price && (
                  <span className="text-sm text-[#8C7A6B] line-through">
                    ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {activeProduct.discount > 0 && (
                  <span className="text-xs font-bold text-[#C05A3E] bg-[#FAF0EC] px-2 py-0.5 rounded-sm">
                    {activeProduct.discount}% OFF
                  </span>
                )}
              </div>

              {/* The "WHY WE PICKED IT" Feature Box */}
              <div className="bg-[#F6F1E7] border border-[#E4D9C8] rounded-xl p-5 sm:p-6 mb-8">
                <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C05A3E]"></span>
                  <span>Why We Picked It</span>
                </div>
                <ul className="space-y-2.5">
                  {activeProduct.whyWePickedIt.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3B32]">
                      <div className="w-4 h-4 rounded-full bg-[#627A67] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-medium leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#EADFD0]">
              <button
                onClick={() => addToCart(activeProduct.id, 1, activeProduct.colors?.[0]?.name, activeProduct.sizes?.[0])}
                className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-6 py-3.5 rounded-md text-xs font-bold tracking-widest uppercase transition-colors text-center cursor-pointer"
              >
                Add to Bag • ₹{activeProduct.price.toLocaleString('en-IN')}
              </button>
              <button
                onClick={() => onOpenDetails(activeProduct)}
                className="border border-[#4A3B32] hover:bg-[#EFE8DD] text-[#242120] px-5 py-3.5 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Full Details & Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector of other picks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {vyraPicksList.slice(0, 6).map((pick, index) => {
            const isSelected = index === activePickIndex;
            return (
              <div
                key={pick.id}
                onClick={() => setActivePickIndex(index)}
                className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#FAF7F2] border-[#2E241F] shadow-xs'
                    : 'bg-[#FDFBF7]/80 border-[#E2D8C9] hover:bg-[#FAF7F2]'
                }`}
              >
                <img
                  src={pick.images[0]}
                  alt={pick.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] text-[#8C7A6B] uppercase font-semibold line-clamp-1">
                    {pick.brand}
                  </div>
                  <div className="text-xs font-bold text-[#242120] line-clamp-1 group-hover:text-[#C05A3E]">
                    {pick.name}
                  </div>
                  <div className="text-xs text-[#5A4B43] font-medium">
                    ₹{pick.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

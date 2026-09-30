import React, { useState } from 'react';
import { Product } from '../types';
import { lookBundles } from '../data/seedData';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Check, ShoppingBag } from 'lucide-react';

interface CompleteTheLookProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const CompleteTheLook: React.FC<CompleteTheLookProps> = ({ products, onOpenDetails }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeBundle = lookBundles[activeLookIndex] || lookBundles[0];
  const { addToCart, setIsCartOpen } = useCart();
  const [isAddingAll, setIsAddingAll] = useState(false);

  const bundleProducts = products.filter(p => activeBundle.productIds.includes(p.id));

  const individualTotal = bundleProducts.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscount = Math.round((individualTotal * activeBundle.bundleDiscountPercent) / 100);
  const bundlePrice = individualTotal - bundleDiscount;

  const handleShopTheLook = async () => {
    setIsAddingAll(true);
    for (const p of bundleProducts) {
      await addToCart(p.id, 1, p.colors?.[0]?.name, p.sizes?.[0]);
    }
    setIsAddingAll(false);
    setIsCartOpen(true);
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#EADFD0] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cohesive Styling</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Complete the Look
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            Thoughtfully matched everyday garments and accessories that naturally belong together.
          </p>
        </div>

        {/* Look Switcher */}
        <div className="flex gap-3 mb-8">
          {lookBundles.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setActiveLookIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                idx === activeLookIndex
                  ? 'bg-[#2E241F] text-white border-[#2E241F]'
                  : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
              }`}
            >
              {b.title}
            </button>
          ))}
        </div>

        {/* The Look Container */}
        <div className="bg-[#FAF3EE] rounded-2xl border border-[#E8DDD4] p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            {/* Look Header & Editorial Imagery */}
            <div className="lg:col-span-4">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-md bg-[#EFE8DD] mb-4">
                <img
                  src={activeBundle.image}
                  alt={activeBundle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#2E241F] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm">
                  {activeBundle.tag}
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242120] mb-2">
                {activeBundle.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#7D6B5D] leading-relaxed">
                {activeBundle.description}
              </p>
            </div>

            {/* Individual Items Grid */}
            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A6B] mb-3">
                Items in this outfit ({bundleProducts.length} pieces)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {bundleProducts.map(item => (
                  <div
                    key={item.id}
                    onClick={() => onOpenDetails(item)}
                    className="group bg-[#FDFBF7] rounded-xl p-3 border border-[#E2D8C9] hover:border-[#8C7A6B] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-[#F3ECE2] mb-2.5">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C7A6B] uppercase font-semibold">
                        {item.brand}
                      </div>
                      <div className="text-xs font-semibold text-[#242120] line-clamp-1 group-hover:text-[#C05A3E]">
                        {item.name}
                      </div>
                      <div className="text-xs font-bold text-[#4A3B32] mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Calculator & CTA */}
              <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-xl border border-[#E2D8C9] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs text-[#8C7A6B] mb-1">
                    Individual Total: <span className="line-through font-medium">₹{individualTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-3xl font-bold text-[#242120]">
                      ₹{bundlePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-[#627A67] bg-[#EFF4F0] px-2 py-0.5 rounded-sm">
                      Save ₹{bundleDiscount.toLocaleString('en-IN')} ({activeBundle.bundleDiscountPercent}% Bundle Off)
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8C7A6B] mt-1">
                    Includes all 5 styling items with single-order free delivery
                  </div>
                </div>

                <button
                  onClick={handleShopTheLook}
                  disabled={isAddingAll}
                  className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-8 py-4 rounded-md text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isAddingAll ? (
                    <span>Adding Bundle...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop the Look</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

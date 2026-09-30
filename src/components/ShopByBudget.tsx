import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { IndianRupee, ArrowRight } from 'lucide-react';

interface ShopByBudgetProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onExploreCatalog: (filter: { maxPrice: number }) => void;
}

const budgetTiers = [
  { label: 'UNDER ₹499', max: 499, desc: 'Everyday pocket delights & daily essentials' },
  { label: 'UNDER ₹999', max: 999, desc: 'Canvas totes, ceramic mugs & dot journals' },
  { label: 'UNDER ₹1,999', max: 1999, desc: 'Linen shirts, perfumes & desk lamps' },
  { label: 'UNDER ₹4,999', max: 4999, desc: 'Leather court sneakers & minimalist watches' },
  { label: 'UNDER ₹9,999', max: 9999, desc: 'Full capsule wardrobes & premium bundles' }
];

export const ShopByBudget: React.FC<ShopByBudgetProps> = ({ products, onOpenDetails, onExploreCatalog }) => {
  const [selectedMax, setSelectedMax] = useState<number>(999);

  const activeTier = budgetTiers.find(b => b.max === selectedMax) || budgetTiers[1];
  const matchingProducts = products.filter(p => p.price <= selectedMax).slice(0, 4);

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Smart Everyday Value</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Shop by Budget
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            Real prices for normal, high-utility items. Filter directly by what feels comfortable today.
          </p>
        </div>

        {/* Budget Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {budgetTiers.map(tier => {
            const isSelected = tier.max === selectedMax;
            return (
              <button
                key={tier.label}
                onClick={() => setSelectedMax(tier.max)}
                className={`px-5 py-3 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-all border cursor-pointer text-left flex flex-col gap-0.5 ${
                  isSelected
                    ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-sm'
                    : 'bg-[#FDFBF7] text-[#4A3B32] border-[#E2D8C9] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
                }`}
              >
                <span>{tier.label}</span>
                <span className={`text-[10px] font-normal ${isSelected ? 'text-[#DED3C4]' : 'text-[#8C7A6B]'}`}>
                  {tier.max <= 999 ? 'Quick joy' : 'Long-term investment'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Budget View */}
        <div className="bg-[#F8F4EC] rounded-2xl p-6 sm:p-8 border border-[#E2D8C9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E2D8C9] gap-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#242120]">
                {activeTier.label} Selection
              </h3>
              <p className="text-xs text-[#7D6B5D] mt-0.5">
                {activeTier.desc}
              </p>
            </div>
            <button
              onClick={() => onExploreCatalog({ maxPrice: selectedMax })}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C05A3E] hover:text-[#B24C30] cursor-pointer"
            >
              <span>Explore all under ₹{selectedMax.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {matchingProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

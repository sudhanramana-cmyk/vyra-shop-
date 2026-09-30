import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Gift, RotateCcw, Sparkles } from 'lucide-react';

interface GiftFinderProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

const recipients = ['Friend', 'Partner', 'Sibling', 'Parent', 'Teacher', 'Colleague'];
const budgets = [
  { label: '₹500', max: 500 },
  { label: '₹1,000', max: 1000 },
  { label: '₹2,000', max: 2000 },
  { label: '₹5,000', max: 5000 },
  { label: '₹10,000+', max: 20000 }
];
const occasions = ['Birthday', 'Anniversary', 'Festival', 'Thank You', 'Just Because'];

export const GiftFinder: React.FC<GiftFinderProps> = ({ products, onOpenDetails }) => {
  const [recipient, setRecipient] = useState<string>('Friend');
  const [budgetMax, setBudgetMax] = useState<number>(1000);
  const [occasion, setOccasion] = useState<string>('Birthday');

  const filteredGifts = products.filter(p => {
    const withinBudget = p.price <= budgetMax;
    // Relate categories to gift intent
    return withinBudget;
  }).slice(0, 4);

  const handleReset = () => {
    setRecipient('Friend');
    setBudgetMax(1000);
    setOccasion('Birthday');
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#EADFD0] bg-[#F7F2E9]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120] mb-3">
            The VYRA Gift Finder
          </h2>
          <p className="text-sm text-[#7D6B5D]">
            Answer three quick questions. We’ll filter down to everyday items people genuinely love keeping.
          </p>
        </div>

        {/* Wizard Controls */}
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E2D8C9] mb-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-[#EADFD0]">
            {/* Step 1: Who */}
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A6B] mb-2">
                1. Who are you buying for?
              </div>
              <div className="flex flex-wrap gap-2">
                {recipients.map(r => (
                  <button
                    key={r}
                    onClick={() => setRecipient(r)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                      recipient === r
                        ? 'bg-[#2E241F] text-white border-[#2E241F]'
                        : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A6B] mb-2">
                2. Target Budget
              </div>
              <div className="flex flex-wrap gap-2">
                {budgets.map(b => (
                  <button
                    key={b.label}
                    onClick={() => setBudgetMax(b.max)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                      budgetMax === b.max
                        ? 'bg-[#2E241F] text-white border-[#2E241F]'
                        : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Occasion */}
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#8C7A6B] mb-2">
                3. Occasion
              </div>
              <div className="flex flex-wrap gap-2">
                {occasions.map(o => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                      occasion === o
                        ? 'bg-[#2E241F] text-white border-[#2E241F]'
                        : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active selection summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 text-xs text-[#5A4B43] gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C05A3E]" />
              <span>
                Recommending thoughtful picks for your <span className="font-bold text-[#242120]">{recipient}</span> on their <span className="font-bold text-[#242120]">{occasion}</span> (under ₹{budgetMax.toLocaleString('en-IN')})
              </span>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#8C7A6B] hover:text-[#242120] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Gift Results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredGifts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

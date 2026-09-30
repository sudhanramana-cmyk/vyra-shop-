import React, { useState } from 'react';
import { Occasion, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Calendar, ArrowRight } from 'lucide-react';

interface ShopByOccasionProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onExploreCatalog: (filter: { occasion: Occasion }) => void;
}

const occasionsList: { occasion: Occasion; title: string; subtitle: string; icon: string }[] = [
  { occasion: 'BACK TO COLLEGE', title: 'Back to College', subtitle: 'Sturdy bags, leak-proof bottles, and journals that survive finals', icon: '🎒' },
  { occasion: 'BIRTHDAY', title: 'Birthday Gifting', subtitle: 'Delightful heirloom gifts that avoid the landfill of novelty junk', icon: '🎁' },
  { occasion: 'HOUSEWARMING', title: 'Housewarming', subtitle: 'Sculptural vases, soy candles, and hand-thrown ceramic mugs', icon: '🏡' },
  { occasion: 'WORK', title: 'Work & Office', subtitle: 'Desk trays, brass drafting tools, and tailored fluid trousers', icon: '💼' },
  { occasion: 'TRAVEL', title: 'Travel & Journeys', subtitle: 'Lightweight tech pouches, sunglasses, and linen carry pouches', icon: '✈️' },
  { occasion: 'WEDDING GUEST', title: 'Wedding Guest', subtitle: '18K gold vermeil chains, silver dome rings, and pure linen shirts', icon: '✨' },
  { occasion: 'FESTIVE', title: 'Festive Gatherings', subtitle: 'Warm ambient lanterns, charcuterie paddles, and fig perfumes', icon: '🪔' },
  { occasion: 'SELF-CARE', title: 'Self-Care Sunday', subtitle: 'Barrier dew cleansers, natural cork mats, and mulberry sleep masks', icon: '🌿' }
];

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ products, onOpenDetails, onExploreCatalog }) => {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('BACK TO COLLEGE');

  const matchingProducts = products.filter(p => p.occasions.includes(selectedOccasion)).slice(0, 4);
  const activeOccasion = occasionsList.find(o => o.occasion === selectedOccasion) || occasionsList[0];

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#627A67] mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Moments & Milestones</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Shop by Occasion
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            Targeted curations for college dorms, thoughtful gift birthdays, or setting up a tranquil home office.
          </p>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {occasionsList.map(item => {
            const isSelected = item.occasion === selectedOccasion;
            return (
              <button
                key={item.occasion}
                onClick={() => setSelectedOccasion(item.occasion)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#242120] border-[#E2D8C9] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
                }`}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className={`text-xs uppercase tracking-wider font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#242120]'}`}>
                  {item.title}
                </div>
                <div className={`text-[11px] line-clamp-1 ${isSelected ? 'text-[#DED3C4]' : 'text-[#8C7A6B]'}`}>
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Occasion Capsule Container */}
        <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E2D8C9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#EADFD0] gap-4">
            <div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-[#C05A3E]">
                Active Curation
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#242120]">
                {activeOccasion.title} Collection
              </h3>
              <p className="text-xs text-[#7D6B5D] mt-0.5">
                {activeOccasion.subtitle}
              </p>
            </div>
            <button
              onClick={() => onExploreCatalog({ occasion: selectedOccasion })}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C05A3E] hover:text-[#B24C30] cursor-pointer"
            >
              <span>Explore all {matchingProducts.length}+ items</span>
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

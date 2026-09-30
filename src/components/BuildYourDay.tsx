import React, { useState } from 'react';
import { Product } from '../types';
import { daySegments } from '../data/seedData';
import { useCart } from '../context/CartContext';
import { Sun, GraduationCap, Briefcase, Sunset, Moon, ShoppingBag, ArrowRight } from 'lucide-react';

interface BuildYourDayProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

const iconsMap: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Sunset: <Sunset className="w-4 h-4" />,
  Moon: <Moon className="w-4 h-4" />
};

export const BuildYourDay: React.FC<BuildYourDayProps> = ({ products, onOpenDetails }) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState<'MORNING' | 'COLLEGE' | 'WORK' | 'EVENING' | 'NIGHT'>('COLLEGE');
  const { addToCart, setIsCartOpen } = useCart();
  const [isAddingAll, setIsAddingAll] = useState(false);

  const activeSegment = daySegments.find(s => s.id === selectedSegmentId) || daySegments[1];
  const segmentProducts = products.filter(p => activeSegment.productIds.includes(p.id));

  const segmentTotal = segmentProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddAllToBag = async () => {
    setIsAddingAll(true);
    for (const p of segmentProducts) {
      await addToCart(p.id, 1, p.colors?.[0]?.name, p.sizes?.[0]);
    }
    setIsAddingAll(false);
    setIsCartOpen(true);
  };

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#627A67] mb-2">
              <Sun className="w-3.5 h-3.5" />
              <span>Routine Architecture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Build Your Day
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            A continuous thread of companion objects that support your waking hours from dawn to nightfall.
          </p>
        </div>

        {/* Day Segment Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {daySegments.map(segment => {
            const isSelected = segment.id === selectedSegmentId;
            return (
              <button
                key={segment.id}
                onClick={() => setSelectedSegmentId(segment.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-sm'
                    : 'bg-[#FDFBF7] text-[#4A3B32] border-[#E2D8C9] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
                }`}
              >
                {iconsMap[segment.icon]}
                <span>{segment.title}</span>
              </button>
            );
          })}
        </div>

        {/* Capsule Container */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E2D8C9] gap-4">
            <div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-[#C05A3E]">
                {activeSegment.subtitle}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242120]">
                {activeSegment.title} Capsule
              </h3>
              <p className="text-xs text-[#7D6B5D] mt-0.5 max-w-lg">
                {activeSegment.tagline}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-[#8C7A6B] uppercase font-bold">Bundle Total</div>
                <div className="font-serif text-xl font-bold text-[#242120]">
                  ₹{segmentTotal.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={handleAddAllToBag}
                disabled={isAddingAll}
                className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-6 py-3.5 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Collection to Bag</span>
              </button>
            </div>
          </div>

          {/* Items In Day */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {segmentProducts.map(item => (
              <div
                key={item.id}
                onClick={() => onOpenDetails(item)}
                className="group bg-[#FDFBF7] p-3 rounded-xl border border-[#E2D8C9] hover:border-[#8C7A6B] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-[#F3ECE2] mb-2">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-[#8C7A6B] uppercase font-semibold line-clamp-1">
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
        </div>
      </div>
    </section>
  );
};

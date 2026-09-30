import React, { useState } from 'react';
import { Mood, Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ShopByMoodProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onExploreCatalog: (filter: { mood: Mood }) => void;
}

interface MoodConfig {
  mood: Mood;
  label: string;
  subtitle: string;
  exampleItems: string;
  image: string;
  accent: string;
}

const moodsList: MoodConfig[] = [
  {
    mood: 'COZY NIGHT',
    label: 'Cozy Night',
    subtitle: 'Warm lamplight, heavy fleece & crackling wood wick',
    exampleItems: 'Hoodie • Candle • Stoneware Mug • Linen Throw • Percale Sheets',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    accent: '#B24C30'
  },
  {
    mood: 'SLOW MORNING',
    label: 'Slow Morning',
    subtitle: 'Golden hour pour-over & mindful journaling',
    exampleItems: 'Fluted Mug • Bamboo Journal • Gentle Dew Cleanser • Brass Bookmark',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    accent: '#DE7E6A'
  },
  {
    mood: 'CAMPUS DAY',
    label: 'Campus Day',
    subtitle: 'Heavyweight canvas, leak-proof hydration & ANC audio',
    exampleItems: 'Day Tote • 750ml Flask • Wireless Earbuds • Heavy Cotton Tee',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    accent: '#627A67'
  },
  {
    mood: 'WORK MODE',
    label: 'Work Mode',
    subtitle: 'Clutter-free desk architecture & fluid pleats',
    exampleItems: 'Birch Organizer • Brass Mechanical Pencil • Desk Lamp • Pleated Trousers',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
    accent: '#4A3B32'
  },
  {
    mood: 'WEEKEND OUT',
    label: 'Weekend Out',
    subtitle: 'Vintage Japanese denim & relaxed French linen',
    exampleItems: 'Straight Jeans • Linen Shirt • Court Sneakers • Crossbody Bag',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
    accent: '#C05A3E'
  },
  {
    mood: 'SELF-CARE DAY',
    label: 'Self-Care Day',
    subtitle: 'Barrier repair, silk eye pillows & cork grounding',
    exampleItems: 'Rice Barrier Cream • Mulberry Silk Mask • Cork Yoga Mat • Jojoba Oil',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    accent: '#D49B8E'
  },
  {
    mood: 'TRAVEL MODE',
    label: 'Travel Mode',
    subtitle: 'Durable nylon pouches & UV400 acetate frames',
    exampleItems: 'Weatherproof Tech Pouch • Acetate Sunglasses • Daypack • Cotton Sacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    accent: '#7D9381'
  },
  {
    mood: 'DATE NIGHT',
    label: 'Date Night',
    subtitle: 'Intimate fig sandalwood extrait & vermeil chains',
    exampleItems: 'Eau De Parfum • 18K Snake Chain • Silver Dome Ring • Leather Loafers',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80',
    accent: '#8C5242'
  }
];

export const ShopByMood: React.FC<ShopByMoodProps> = ({ products, onOpenDetails, onExploreCatalog }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>('COZY NIGHT');

  const currentConfig = moodsList.find(m => m.mood === selectedMood) || moodsList[0];
  const matchingProducts = products.filter(p => p.moods.includes(selectedMood)).slice(0, 4);

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0] bg-[#F7F2E9]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atmospheres & Feelings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120] mb-3">
            Shop by Mood
          </h2>
          <p className="text-sm text-[#7D6B5D]">
            Because we don’t shop by SKU codes — we shop for how we want our day or evening to feel.
          </p>
        </div>

        {/* Mood Selector Buttons / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 mb-8 no-scrollbar scroll-smooth">
          {moodsList.map(item => {
            const isSelected = item.mood === selectedMood;
            return (
              <button
                key={item.mood}
                onClick={() => setSelectedMood(item.mood)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#5A4B43] border-[#DDD2C3] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Selected Mood Hero Banner & Curated Showcase */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-6 sm:p-8 mb-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 pb-8 border-b border-[#EADFD0]">
            <div className="lg:col-span-8">
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-1">
                Curated Mood Capsule
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242120] mb-2">
                {currentConfig.label}
              </h3>
              <p className="text-sm sm:text-base font-serif italic text-[#5A4B43] mb-3">
                "{currentConfig.subtitle}"
              </p>
              <p className="text-xs text-[#8C7A6B] font-medium">
                <span className="text-[#4A3B32] font-semibold">Typical bundle:</span> {currentConfig.exampleItems}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onExploreCatalog({ mood: selectedMood })}
                className="bg-[#FAF7F2] hover:bg-[#2E241F] text-[#2E241F] hover:text-white border border-[#2E241F] px-5 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View All {selectedMood}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Curated Products for this Mood */}
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

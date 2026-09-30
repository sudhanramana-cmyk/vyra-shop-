import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (cat: Category) => void;
}

interface CategoryInfo {
  name: Category;
  tagline: string;
  image: string;
  itemCount: string;
}

const categoriesData: CategoryInfo[] = [
  {
    name: 'Fashion',
    tagline: 'Combed cotton, Japanese denim & pure linen',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
    itemCount: '12 items'
  },
  {
    name: 'Beauty',
    tagline: 'Dew essences, peptide balms & Mysore sandalwood',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    itemCount: '8 items'
  },
  {
    name: 'Footwear',
    tagline: 'Full-grain court sneakers & suede clogs',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
    itemCount: '6 items'
  },
  {
    name: 'Home & Living',
    tagline: 'Hand-thrown ceramics, soy candles & linen throws',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80',
    itemCount: '10 items'
  },
  {
    name: 'Accessories',
    tagline: 'Canvas totes, 38mm watches & snake chains',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    itemCount: '9 items'
  },
  {
    name: 'Electronics',
    tagline: 'Walnut speakers, pebble ANC earbuds & braided cables',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=700&q=80',
    itemCount: '5 items'
  },
  {
    name: 'Fitness',
    tagline: 'Organic cork mats & insulated stainless flasks',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=700&q=80',
    itemCount: '4 items'
  },
  {
    name: 'Travel',
    tagline: 'Weatherproof pouches & cotton laundry sacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    itemCount: '5 items'
  },
  {
    name: 'Stationery',
    tagline: '160gsm bamboo journals & solid brass pencils',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    itemCount: '7 items'
  },
  {
    name: 'Gifts',
    tagline: 'Curated ritual boxes & desk setup sets',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    itemCount: '6 items'
  }
];

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
              Browse by Space
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            From your bedside nightstand to your campus backpack, every essential item thoughtfully sorted.
          </p>
        </div>

        {/* Editorial Grid of Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categoriesData.map(cat => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
              />

              {/* Editorial Gradient Veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90"></div>

              {/* Top Item Count */}
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold text-white/80 bg-black/30 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                {cat.itemCount}
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold tracking-wide group-hover:text-[#F3ECE2] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#2E241F] flex items-center justify-center transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-[11px] text-white/70 line-clamp-1 mt-1 font-normal">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

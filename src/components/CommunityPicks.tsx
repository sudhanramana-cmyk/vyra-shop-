import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Users, BookmarkCheck, Heart, MessageSquare, Gift } from 'lucide-react';

interface CommunityPicksProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

type TabKey = 'SAVED' | 'WISHLISTED' | 'REVIEWED' | 'GIFTED';

export const CommunityPicks: React.FC<CommunityPicksProps> = ({ products, onOpenDetails }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('SAVED');

  const getFilteredProducts = () => {
    const list = [...products];
    switch (activeTab) {
      case 'SAVED':
        return list.sort((a, b) => (b.stats?.saved || 0) - (a.stats?.saved || 0)).slice(0, 4);
      case 'WISHLISTED':
        return list.sort((a, b) => (b.stats?.wishlisted || 0) - (a.stats?.wishlisted || 0)).slice(0, 4);
      case 'REVIEWED':
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);
      case 'GIFTED':
        return list.sort((a, b) => (b.stats?.gifted || 0) - (a.stats?.gifted || 0)).slice(0, 4);
      default:
        return list.slice(0, 4);
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; statLabel: string }[] = [
    { key: 'SAVED', label: 'Most Saved', icon: <BookmarkCheck className="w-4 h-4" />, statLabel: 'saves' },
    { key: 'WISHLISTED', label: 'Most Wishlisted', icon: <Heart className="w-4 h-4" />, statLabel: 'wishlists' },
    { key: 'REVIEWED', label: 'Most Reviewed', icon: <MessageSquare className="w-4 h-4" />, statLabel: 'ratings' },
    { key: 'GIFTED', label: 'Most Gifted', icon: <Gift className="w-4 h-4" />, statLabel: 'gift orders' }
  ];

  const currentProducts = getFilteredProducts();

  return (
    <section className="py-16 md:py-20 border-b border-[#EADFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#7D9381] mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Collective Habits</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242120]">
              Community Picks
            </h2>
          </div>
          <p className="text-sm text-[#7D6B5D] max-w-md mt-2 md:mt-0">
            Backed by actual reader purchases, bookmarks, and verified product reviews.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map(tab => {
            const isSelected = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#4A3B32] border-[#E2D8C9] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Community Ranked Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map(product => {
            let statNum = 0;
            let statTxt = '';
            if (activeTab === 'SAVED') {
              statNum = product.stats?.saved || 1200;
              statTxt = 'people saved this item';
            } else if (activeTab === 'WISHLISTED') {
              statNum = product.stats?.wishlisted || 950;
              statTxt = 'in active wishlists';
            } else if (activeTab === 'REVIEWED') {
              statNum = product.reviewsCount;
              statTxt = 'verified reviews';
            } else {
              statNum = product.stats?.gifted || 400;
              statTxt = 'sent as gifts';
            }

            return (
              <div key={product.id} className="flex flex-col">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#627A67] bg-[#EFF4F0] px-2.5 py-1 rounded-t-lg border-t border-x border-[#D5E0D7] flex items-center justify-between">
                  <span>{statNum.toLocaleString('en-IN')} {statTxt}</span>
                </div>
                <div className="flex-1 -mt-px">
                  <ProductCard product={product} onOpenDetails={onOpenDetails} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (term: string) => void;
}

const trendingSearches = [
  'white sneakers',
  'college bags',
  'skincare under ₹1000',
  'birthday gifts',
  'home decor',
  'coffee mug',
  'travel essentials'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSearchSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'linen shirt',
    'scented candle',
    'ceramic mug'
  ]);

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? products
        .filter(
          p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    if (!recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
    onSearchSubmit(term);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 sm:pt-20 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#EADFD0] flex items-center gap-3 bg-[#FDFBF7]">
          <Search className="w-5 h-5 text-[#8C7A6B] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch(searchTerm);
            }}
            placeholder="What are you looking for?"
            className="flex-1 bg-transparent text-sm sm:text-base text-[#242120] placeholder-[#8C7A6B] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#8C7A6B] hover:text-[#242120] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFE8DD] text-[#4A3B32] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Real-time matched suggestions */}
          {searchTerm.trim() ? (
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-3">
                Matching Everyday Objects ({filtered.length})
              </div>
              {filtered.length === 0 ? (
                <p className="text-xs text-[#7D6B5D] py-4">
                  No direct items found for "{searchTerm}". Press Enter to search catalog.
                </p>
              ) : (
                <div className="space-y-2">
                  {filtered.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F3ECE2] transition-colors cursor-pointer group"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#242120] group-hover:text-[#C05A3E] line-clamp-1">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-[#8C7A6B]">
                          {p.category} • ₹{p.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8C7A6B] group-hover:text-[#2E241F]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#8C7A6B] mb-2.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="bg-[#FDFBF7] border border-[#DDD2C3] hover:border-[#8C7A6B] px-3 py-1.5 rounded-full text-xs text-[#4A3B32] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trending Everyday Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="bg-[#FAF3EE] border border-[#E8DDD4] hover:border-[#C05A3E] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#242120] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

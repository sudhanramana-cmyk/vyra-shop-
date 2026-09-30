import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { api } from '../services/api';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List as ListIcon,
  RotateCcw,
  AlertTriangle,
  Star,
  Check,
  X
} from 'lucide-react';

interface ProductCatalogProps {
  initialCategory?: Category | 'All';
  initialSearch?: string;
  initialMood?: string;
  initialOccasion?: string;
  initialMaxPrice?: number;
  initialIsPriceDrop?: boolean;
  onOpenDetails: (product: Product) => void;
}

type CatalogStatus = 'LOADING' | 'SUCCESS' | 'NO_PRODUCTS' | 'NO_SEARCH_RESULTS' | 'API_ERROR';

const categories: (Category | 'All')[] = [
  'All',
  'Fashion',
  'Beauty',
  'Footwear',
  'Home & Living',
  'Accessories',
  'Electronics',
  'Fitness',
  'Travel',
  'Stationery',
  'Gifts'
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialCategory = 'All',
  initialSearch = '',
  initialMood,
  initialOccasion,
  initialMaxPrice,
  initialIsPriceDrop,
  onOpenDetails
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<CatalogStatus>('LOADING');
  const [errorMessage, setErrorMessage] = useState('');

  // Filters state
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<Category | 'All'>(initialCategory);
  const [selectedSort, setSelectedSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice || 10000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Synchronize when external props change (e.g. from Hero or Header clicks)
  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) setSearch(initialSearch);
  }, [initialSearch]);

  const loadProducts = async () => {
    setStatus('LOADING');
    setErrorMessage('');
    try {
      const res = await api.getProducts({
        search: search.trim() || undefined,
        category: category !== 'All' ? category : undefined,
        maxPrice: maxPrice < 10000 ? maxPrice : undefined,
        rating: minRating > 0 ? minRating : undefined,
        brand: brandFilter !== 'All' ? brandFilter : undefined,
        sort: selectedSort,
        mood: initialMood,
        occasion: initialOccasion,
        isPriceDrop: initialIsPriceDrop
      });

      let items = res.products || [];

      if (inStockOnly) {
        items = items.filter(p => p.inStock);
      }

      setProducts(items);

      if (items.length === 0) {
        if (search.trim()) {
          setStatus('NO_SEARCH_RESULTS');
        } else {
          setStatus('NO_PRODUCTS');
        }
      } else {
        setStatus('SUCCESS');
      }
    } catch (err: any) {
      console.error('Catalog load failure:', err);
      setStatus('API_ERROR');
      setErrorMessage(err.message || 'Unable to load products from database.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category, search, selectedSort, maxPrice, minRating, inStockOnly, brandFilter, initialMood, initialOccasion]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setSelectedSort('popular');
    setMaxPrice(10000);
    setMinRating(0);
    setInStockOnly(false);
    setBrandFilter('All');
  };

  // Distinct brand list
  const availableBrands = ['All', 'VYRA Basics', 'AURA BOTANICS', 'Earthen Objects', 'Common Steps', 'Nomad Gear', 'Paper & Thought', 'Maison Sol', 'Krona Horology'];

  return (
    <section id="catalog-section" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Catalog Title & View Options */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#EADFD0] gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-1">
            Complete Everyday Selection
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#242120]">
            The Product Catalog
          </h2>
          <p className="text-xs text-[#7D6B5D] mt-1">
            {status === 'SUCCESS' && `Showing ${products.length} curated everyday objects`}
          </p>
        </div>

        {/* Search & Layout Toggles */}
        <div className="flex items-center gap-3">
          {/* Quick inline search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#FAF7F2] border border-[#DDD2C3] text-xs text-[#242120] placeholder-[#8C7A6B] focus:outline-none focus:border-[#C05A3E]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A6B] hover:text-[#242120]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={selectedSort}
            onChange={e => setSelectedSort(e.target.value)}
            className="bg-[#FAF7F2] border border-[#DDD2C3] text-xs text-[#4A3B32] font-semibold py-2 px-3 rounded-lg focus:outline-none focus:border-[#C05A3E] cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Grid / List View Toggles */}
          <div className="hidden sm:flex items-center rounded-lg border border-[#DDD2C3] bg-[#FAF7F2] p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#2E241F] text-white' : 'text-[#5A4B43] hover:text-[#242120]'}`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#2E241F] text-white' : 'text-[#5A4B43] hover:text-[#242120]'}`}
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 bg-[#FAF7F2] border border-[#DDD2C3] px-3 py-2 rounded-lg text-xs font-bold text-[#242120]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map(cat => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#2E241F] text-white border-[#2E241F] shadow-xs'
                  : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B] hover:bg-[#F3ECE2]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Catalog Body: Left Filter Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside
          className={`md:col-span-3 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E2D8C9] space-y-6 ${
            isMobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EADFD0]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#242120]">
              <SlidersHorizontal className="w-4 h-4 text-[#C05A3E]" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-[#8C7A6B] hover:text-[#C05A3E] cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#242120] mb-2">
              <span>Max Price</span>
              <span className="font-bold text-[#C05A3E]">
                {maxPrice >= 10000 ? 'Any Price' : `Up to ₹${maxPrice.toLocaleString('en-IN')}`}
              </span>
            </div>
            <input
              type="range"
              min={499}
              max={10000}
              step={250}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C05A3E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C7A6B] mt-1">
              <span>₹499</span>
              <span>₹5,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#242120] mb-2">
              Curator Brand
            </label>
            <select
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-lg text-xs py-2 px-3 text-[#4A3B32] focus:outline-none focus:border-[#C05A3E]"
            >
              {availableBrands.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-semibold text-[#242120] mb-2">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.5, 4.8].map(r => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    minRating === r
                      ? 'bg-[#2E241F] text-white border-[#2E241F]'
                      : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                  }`}
                >
                  {r === 0 ? 'All' : `★ ${r}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter Checkbox */}
          <div className="pt-2 border-t border-[#EADFD0]">
            <label className="flex items-center gap-2.5 text-xs text-[#242120] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#C05A3E] accent-[#C05A3E] cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Right Products Container with 5 Distinct States */}
        <div className="md:col-span-9">
          {/* STATE 1: LOADING */}
          {status === 'LOADING' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E2D8C9] p-4 animate-pulse"
                >
                  <div className="aspect-4/5 bg-[#EAE2D5] rounded-lg mb-3"></div>
                  <div className="h-3 bg-[#EAE2D5] rounded-sm w-1/3 mb-2"></div>
                  <div className="h-4 bg-[#EAE2D5] rounded-sm w-3/4 mb-3"></div>
                  <div className="h-4 bg-[#EAE2D5] rounded-sm w-1/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* STATE 2: API ERROR WITH RETRY (Never show "0 items" on failure) */}
          {status === 'API_ERROR' && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-10 text-center max-w-lg mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[#FAF0EC] text-[#BA5943] flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242120] mb-2">
                Unable to load products.
              </h3>
              <p className="text-xs text-[#7D6B5D] leading-relaxed mb-6">
                {errorMessage || 'There was a temporary disruption communicating with the database.'}
              </p>
              <button
                onClick={loadProducts}
                className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-7 py-3 rounded-md text-xs font-bold tracking-widest uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* STATE 3: NO SEARCH RESULTS */}
          {status === 'NO_SEARCH_RESULTS' && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-10 text-center max-w-lg mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[#EFE8DD] text-[#8C7A6B] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242120] mb-2">
                No products found
              </h3>
              <p className="text-xs text-[#7D6B5D] mb-6">
                No everyday items matched "{search}". Try searching for sneakers, mugs, candles, or journals.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-6 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

          {/* STATE 4: NO PRODUCTS MATCHING FILTERS */}
          {status === 'NO_PRODUCTS' && (
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-10 text-center max-w-lg mx-auto my-8">
              <h3 className="font-serif text-2xl font-bold text-[#242120] mb-2">
                No items in this filter combination
              </h3>
              <p className="text-xs text-[#7D6B5D] mb-6">
                Adjust your price or category filters to discover more items.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#2E241F] text-white px-6 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* STATE 5: SUCCESS DISPLAY */}
          {status === 'SUCCESS' && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={onOpenDetails}
                    />
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {products.map(product => (
                    <div
                      key={product.id}
                      onClick={() => onOpenDetails(product)}
                      className="group bg-[#FDFBF7] p-4 rounded-xl border border-[#E2D8C9] hover:border-[#8C7A6B] transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-center"
                    >
                      <div className="w-full sm:w-36 h-36 rounded-lg overflow-hidden shrink-0 bg-[#EFE8DD]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-[#8C7A6B] uppercase font-semibold mb-1">
                          <span>{product.brand}</span>
                          <span>•</span>
                          <span>{product.category}</span>
                          <span className="ml-auto text-[#4A3B32] font-bold">★ {product.rating}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#242120] group-hover:text-[#C05A3E] transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#7D6B5D] line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-lg font-bold text-[#242120]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-[#8C7A6B] line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          {product.discount > 0 && (
                            <span className="text-xs font-semibold text-[#C05A3E]">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ShopByMood } from './components/ShopByMood';
import { ShopByOccasion } from './components/ShopByOccasion';
import { ShopByBudget } from './components/ShopByBudget';
import { VyraEdit } from './components/VyraEdit';
import { VyraPicks } from './components/VyraPicks';
import { CommunityPicks } from './components/CommunityPicks';
import { CompleteTheLook } from './components/CompleteTheLook';
import { BuildYourDay } from './components/BuildYourDay';
import { GiftFinder } from './components/GiftFinder';
import { PriceDrops } from './components/PriceDrops';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SavedItemsView } from './components/SavedItemsView';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { MobileNav } from './components/MobileNav';
import { api } from './services/api';
import { Product, Order, Category, Mood, Occasion } from './types';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dynamic filter state passed into Catalog view
  const [catalogFilters, setCatalogFilters] = useState<{
    category?: Category | 'All';
    search?: string;
    mood?: Mood;
    occasion?: Occasion;
    maxPrice?: number;
    isPriceDrop?: boolean;
  }>({});

  useEffect(() => {
    // Seed and load initial products
    api.getProducts().then(res => {
      setProducts(res.products);
    });
  }, []);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleExploreCategory = (cat: Category) => {
    setCatalogFilters({ category: cat });
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreWithFilter = (filter: any) => {
    setCatalogFilters(filter);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (term: string) => {
    setCatalogFilters({ search: term });
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#242120] selection:bg-[#E8DDD4] selection:text-[#3D2C29]">
      {/* Editorial Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1">
        {/* VIEW 1: HOME (Editorial Lifestyle Magazine Layout) */}
        {activeTab === 'home' && (
          <>
            {/* Editorial Hero */}
            <Hero
              onExplore={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSeeWhatsNew={() => {
                setActiveTab('trending');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Shop by Category */}
            <CategorySection onSelectCategory={handleExploreCategory} />

            {/* Shop by Mood */}
            <ShopByMood
              products={products}
              onOpenDetails={handleOpenProduct}
              onExploreCatalog={handleExploreWithFilter}
            />

            {/* Shop by Occasion */}
            <ShopByOccasion
              products={products}
              onOpenDetails={handleOpenProduct}
              onExploreCatalog={handleExploreWithFilter}
            />

            {/* Shop by Budget */}
            <ShopByBudget
              products={products}
              onOpenDetails={handleOpenProduct}
              onExploreCatalog={handleExploreWithFilter}
            />

            {/* The VYRA Edit (Magazine-style articles linked to products) */}
            <VyraEdit
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* VYRA Picks (Spotlight with Why We Picked It) */}
            <VyraPicks
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* Community Picks */}
            <CommunityPicks
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* Complete the Look (Outfit bundle discount) */}
            <CompleteTheLook
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* Build Your Day (Routines from Morning to Night) */}
            <BuildYourDay
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* Gift Finder */}
            <GiftFinder
              products={products}
              onOpenDetails={handleOpenProduct}
            />

            {/* Price Drops */}
            <PriceDrops
              products={products}
              onOpenDetails={handleOpenProduct}
              onExploreCatalog={handleExploreWithFilter}
            />
          </>
        )}

        {/* VIEW 2: SHOP / FULL CATALOG */}
        {activeTab === 'shop' && (
          <ProductCatalog
            initialCategory={catalogFilters.category || 'All'}
            initialSearch={catalogFilters.search || ''}
            initialMood={catalogFilters.mood}
            initialOccasion={catalogFilters.occasion}
            initialMaxPrice={catalogFilters.maxPrice}
            initialIsPriceDrop={catalogFilters.isPriceDrop}
            onOpenDetails={handleOpenProduct}
          />
        )}

        {/* VIEW 3: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="space-y-4">
            <GiftFinder products={products} onOpenDetails={handleOpenProduct} />
            <ShopByMood products={products} onOpenDetails={handleOpenProduct} onExploreCatalog={handleExploreWithFilter} />
            <ShopByOccasion products={products} onOpenDetails={handleOpenProduct} onExploreCatalog={handleExploreWithFilter} />
            <BuildYourDay products={products} onOpenDetails={handleOpenProduct} />
          </div>
        )}

        {/* VIEW 4: COLLECTIONS */}
        {activeTab === 'collections' && (
          <div className="space-y-4">
            <CompleteTheLook products={products} onOpenDetails={handleOpenProduct} />
            <BuildYourDay products={products} onOpenDetails={handleOpenProduct} />
            <VyraEdit products={products} onOpenDetails={handleOpenProduct} />
          </div>
        )}

        {/* VIEW 5: TRENDING */}
        {activeTab === 'trending' && (
          <div className="space-y-4">
            <CommunityPicks products={products} onOpenDetails={handleOpenProduct} />
            <VyraPicks products={products} onOpenDetails={handleOpenProduct} />
            <PriceDrops products={products} onOpenDetails={handleOpenProduct} onExploreCatalog={handleExploreWithFilter} />
          </div>
        )}

        {/* VIEW 6: THE EDIT */}
        {activeTab === 'edit' && (
          <VyraEdit products={products} onOpenDetails={handleOpenProduct} />
        )}

        {/* VIEW 7: SAVED ITEMS / WISHLIST */}
        {activeTab === 'saved' && (
          <SavedItemsView
            onOpenDetails={handleOpenProduct}
            onExplore={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 8: USER ACCOUNT DASHBOARD */}
        {activeTab === 'account' && (
          <UserDashboard
            onTrackOrder={(order) => setTrackedOrder(order)}
            onOpenProduct={handleOpenProduct}
          />
        )}

        {/* VIEW 9: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            onBackToStore={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => handleExploreCategory(cat as Category)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onOpenProduct={handleOpenProduct}
        />
      )}

      <CartDrawer />

      <CheckoutModal
        onOrderCompleted={(order) => {
          setTrackedOrder(order);
        }}
      />

      {trackedOrder && (
        <OrderTrackingModal
          order={trackedOrder}
          onClose={() => setTrackedOrder(null)}
        />
      )}

      <AuthModal />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleOpenProduct}
        onSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainApp />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

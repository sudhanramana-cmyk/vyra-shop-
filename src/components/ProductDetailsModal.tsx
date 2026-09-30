import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import {
  X,
  Heart,
  Star,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductDetailsModalProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onOpenProduct: (p: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  allProducts,
  onClose,
  onOpenProduct
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'why' | 'reviews' | 'shipping'>('details');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { addToCart, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);

  useEffect(() => {
    api.getReviews(product.id).then(r => setReviews(r));
    setSelectedImage(0);
    setSelectedColor(product.colors?.[0]?.name);
    setSelectedSize(product.sizes?.[0]);
    setQuantity(1);
  }, [product]);

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity, selectedColor, selectedSize);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    onClose();
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmittingReview(true);
    try {
      const added = await api.addReview(product.id, {
        rating: newRating,
        title: newTitle || 'Great purchase',
        comment: newComment
      });
      setReviews(prev => [added, ...prev]);
      setNewComment('');
      setNewTitle('');
      showToast('Thank you! Your verified review has been posted.', 'success');
    } catch {
      showToast('Could not submit review', 'error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] my-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-[#242120] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#F3ECE2] border border-[#E2D8C9]">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isVyraPick && (
                  <div className="absolute top-3 left-3 bg-[#2E241F] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm">
                    VYRA Pick
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-[#C05A3E]' : 'border-[#E2D8C9] opacity-70'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Purchase Column */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C7A6B] uppercase tracking-wider font-semibold mb-2">
                  <span>{product.brand} • {product.category}</span>
                  <div className="flex items-center gap-1 text-[#242120]">
                    <Star className="w-4 h-4 fill-[#D49B8E] text-[#D49B8E]" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#8C7A6B]">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242120] mb-3">
                  {product.name}
                </h1>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#EADFD0]">
                  <span className="font-serif text-3xl font-bold text-[#242120]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-[#8C7A6B] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-xs font-bold text-[#C05A3E] bg-[#FAF0EC] px-2 py-0.5 rounded-sm">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5A4B43] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-[#242120] uppercase tracking-wider mb-2">
                      Color: <span className="font-normal normal-case text-[#5A4B43]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map(col => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                            selectedColor === col.name ? 'border-[#242120] scale-110' : 'border-transparent'
                          }`}
                          title={col.name}
                        >
                          <span
                            className="w-full h-full rounded-full block border border-black/10"
                            style={{ backgroundColor: col.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#242120] uppercase tracking-wider">
                        Select Size
                      </label>
                      <span className="text-[11px] text-[#8C7A6B] underline cursor-pointer">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(sz => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#2E241F] text-white border-[#2E241F]'
                              : 'bg-[#FAF7F2] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-[#EADFD0]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#DDD2C3] rounded-md bg-[#FDFBF7]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-[#4A3B32] hover:text-[#242120] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#242120]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-[#4A3B32] hover:text-[#242120] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#2E241F] hover:bg-[#C05A3E] text-white py-3.5 px-4 rounded-md text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer text-center"
                    >
                      Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-md border transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-[#C05A3E] text-white border-[#C05A3E]'
                          : 'bg-[#FDFBF7] text-[#4A3B32] border-[#DDD2C3] hover:border-[#8C7A6B]'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-[#C05A3E] hover:bg-[#B24C30] text-white py-3 px-4 rounded-md text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer text-center"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details / Why We Picked It / Reviews Tabs */}
          <div className="border-t border-[#EADFD0] pt-6 mb-8">
            <div className="flex gap-6 border-b border-[#EADFD0] pb-2 text-xs uppercase font-bold tracking-wider text-[#8C7A6B] overflow-x-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'text-[#2E241F] border-b-2 border-[#2E241F]' : 'hover:text-[#242120]'
                }`}
              >
                About & Details
              </button>
              <button
                onClick={() => setActiveTab('why')}
                className={`pb-2 transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'why' ? 'text-[#C05A3E] border-b-2 border-[#C05A3E]' : 'hover:text-[#242120]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why We Picked It</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'text-[#2E241F] border-b-2 border-[#2E241F]' : 'hover:text-[#242120]'
                }`}
              >
                Reviews ({reviews.length})
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'shipping' ? 'text-[#2E241F] border-b-2 border-[#2E241F]' : 'hover:text-[#242120]'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            {/* Tab 1: Details */}
            {activeTab === 'details' && (
              <div className="py-5 space-y-4 text-xs text-[#4A3B32]">
                <ul className="space-y-2 list-disc pl-5">
                  {product.details.map((d, i) => (
                    <li key={i} className="leading-relaxed">{d}</li>
                  ))}
                </ul>
                {product.materials && (
                  <div className="pt-2">
                    <span className="font-bold text-[#242120]">Materials:</span> {product.materials}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Why We Picked It */}
            {activeTab === 'why' && (
              <div className="py-5 bg-[#F6F1E7] p-5 rounded-xl border border-[#E2D8C9] my-2">
                <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-3">
                  The Editorial Verdict
                </div>
                <ul className="space-y-2.5">
                  {product.whyWePickedIt.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A3B32]">
                      <div className="w-4 h-4 rounded-full bg-[#627A67] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-medium">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="py-5 space-y-6">
                {/* Submit New Review Form */}
                <form onSubmit={handleAddReview} className="bg-[#F8F4EC] p-4 sm:p-5 rounded-xl border border-[#E2D8C9]">
                  <h4 className="font-serif text-sm font-bold text-[#242120] mb-2">
                    Write a Verified Review
                  </h4>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-[#C05A3E] text-[#C05A3E]' : 'text-[#DDD2C3]'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#242120] ml-2">{newRating} Stars</span>
                  </div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Review headline (e.g. Incredibly soft, great everyday mug)"
                    className="w-full bg-[#FAF7F2] border border-[#DDD2C3] rounded-md p-2 text-xs text-[#242120] mb-2 focus:outline-none focus:border-[#C05A3E]"
                  />
                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Tell us about the texture, fit, or daily utility..."
                    required
                    className="w-full bg-[#FAF7F2] border border-[#DDD2C3] rounded-md p-2 text-xs text-[#242120] mb-3 focus:outline-none focus:border-[#C05A3E]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-5 py-2 rounded-md text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>

                {/* Review list */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-[#8C7A6B]">No reviews yet. Be the first to share your thoughts!</p>
                  ) : (
                    reviews.map(rev => (
                      <div key={rev.id} className="border-b border-[#EADFD0] pb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#242120]">{rev.userName}</span>
                            {rev.isVerified && (
                              <span className="flex items-center gap-1 text-[10px] text-[#627A67] font-semibold bg-[#EFF4F0] px-1.5 py-0.5 rounded-sm">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified Purchase</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#8C7A6B]">{rev.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#C05A3E] text-[#C05A3E]' : 'text-[#DDD2C3]'}`}
                            />
                          ))}
                        </div>
                        <h5 className="font-serif text-xs font-bold text-[#242120] mb-1">
                          {rev.title}
                        </h5>
                        <p className="text-xs text-[#5A4B43] leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Shipping & Returns */}
            {activeTab === 'shipping' && (
              <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#4A3B32]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE8DD] flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#2E241F]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#242120] mb-1">Pan-India Express Dispatch</h5>
                    <p className="text-[#7D6B5D] leading-relaxed">
                      Orders ship within 24 hours from our climate-controlled fulfillment hub in Bengaluru. Free standard shipping applies automatically on all orders above ₹999.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE8DD] flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4 text-[#2E241F]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#242120] mb-1">15-Day Easy Doorstep Returns</h5>
                    <p className="text-[#7D6B5D] leading-relaxed">
                      If the texture, size, or fit isn't right, schedule an effortless courier pickup straight from your doorstep. Zero questioning, immediate refunds.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* You May Also Like */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-[#EADFD0] pt-6">
              <h4 className="font-serif text-lg font-bold text-[#242120] mb-4">
                You May Also Like
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rp => (
                  <ProductCard
                    key={rp.id}
                    product={rp}
                    onOpenDetails={(item) => onOpenProduct(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

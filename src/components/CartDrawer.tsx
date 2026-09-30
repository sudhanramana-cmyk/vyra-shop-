import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { X, Trash2, Heart, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    amountAwayFromFreeShipping,
    freeShippingProgress,
    shippingFee,
    total,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponInput);
    setIsApplyingCoupon(false);
    setCouponInput('');
  };

  const handleSaveForLater = (item: any) => {
    toggleWishlist(item.product);
    removeFromCart(item.id);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E2D8C9] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#EADFD0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2E241F]" />
              <h2 className="font-serif text-xl font-bold text-[#242120]">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#EFE8DD] text-[#4A3B32] cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (Mandatory Feature) */}
          <div className="bg-[#FAF3EE] px-5 py-3 border-b border-[#EADFD0]">
            {amountAwayFromFreeShipping > 0 ? (
              <div>
                <p className="text-xs font-semibold text-[#4A3B32] mb-1.5">
                  You are <span className="font-bold text-[#C05A3E]">₹{amountAwayFromFreeShipping} away</span> from <span className="uppercase tracking-wider font-bold">Free Delivery</span>.
                </p>
                <div className="w-full bg-[#EADFD0] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#C05A3E] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-[#3E5242]">
                <span className="w-2 h-2 rounded-full bg-[#627A67]"></span>
                <span>You’ve unlocked FREE Pan-India Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full bg-[#EFE8DD] text-[#8C7A6B] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242120] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#7D6B5D] max-w-xs mx-auto mb-6">
                  Explore our curated everyday essentials and add objects that bring daily joy.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#2E241F] text-white px-6 py-2.5 rounded-md text-xs font-bold tracking-wider uppercase"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E8DDD4] flex gap-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F3ECE2] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-xs font-bold text-[#242120] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8C7A6B] hover:text-[#BA5943] p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#8C7A6B] mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#DDD2C3] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#4A3B32] hover:text-[#242120]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#242120]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#4A3B32] hover:text-[#242120]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#242120]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Save for Later Action */}
                    <div className="pt-2 border-t border-[#F0E8DC] mt-2 flex justify-end">
                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="text-[10px] text-[#8C7A6B] hover:text-[#C05A3E] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Save for Later</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EADFD0] bg-[#FAF7F2] space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#EFF4F0] px-3 py-2 rounded-md border border-[#7D9381] text-xs">
                  <div className="flex items-center gap-1.5 text-[#3E5242] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon {appliedCoupon.code} applied (-₹{couponDiscount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#BA5943] font-bold text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. VYRAFIRST)"
                    className="flex-1 bg-[#FDFBF7] border border-[#DDD2C3] rounded-md px-3 py-2 text-xs uppercase text-[#242120] placeholder-[#8C7A6B] focus:outline-none focus:border-[#C05A3E]"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCoupon}
                    className="bg-[#2E241F] text-white px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5A4B43] pt-2 border-t border-[#EADFD0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#242120]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#242120]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#627A67]">
                    <span>Coupon Savings</span>
                    <span className="font-semibold">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#242120] pt-2 border-t border-[#EADFD0]">
                  <span>Total</span>
                  <span className="font-serif text-lg">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#C05A3E] hover:bg-[#B24C30] text-white py-3.5 rounded-md text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Banknote,
  Wallet
} from 'lucide-react';
import { Order } from '../types';

interface CheckoutModalProps {
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderCompleted }) => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, shippingFee, couponDiscount, total, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Step 1: Address
  const [name, setName] = useState(user?.name || 'Tanya Roy');
  const [phone, setPhone] = useState(user?.phone || '+91 98123 45678');
  const [street, setStreet] = useState('Flat 402, Green Glen Layout, Bellandur');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560103');

  // Step 2: Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');

  // Step 3: Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState('tanya@okhdfcbank');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const orderItems = cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      }));

      const shippingAddress = {
        id: `addr-${Date.now()}`,
        name,
        phone,
        street,
        city,
        state,
        pincode
      };

      const order = await api.createOrder({
        items: orderItems,
        shippingAddress,
        paymentMethod,
        couponCode: appliedCoupon?.code
      });

      setCreatedOrder(order);
      clearCart();
      setStep(4);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast('Order successfully confirmed!', 'success');
      onOrderCompleted(order);
    } catch (err: any) {
      showToast(err.message || 'Payment simulation failed', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCreatedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#EADFD0] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C05A3E]">
              {step === 4 ? 'Order Complete' : `Step ${step} of 3`}
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#242120]">
              {step === 1 && 'Delivery Address'}
              {step === 2 && 'Delivery Speed'}
              {step === 3 && 'Payment Method'}
              {step === 4 && 'Thank You For Your Order'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-[#EFE8DD] text-[#4A3B32] cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="flex border-b border-[#EADFD0] text-xs font-semibold text-[#8C7A6B]">
            <div className={`flex-1 py-2 text-center border-b-2 ${step >= 1 ? 'border-[#C05A3E] text-[#242120]' : 'border-transparent'}`}>
              1. Address
            </div>
            <div className={`flex-1 py-2 text-center border-b-2 ${step >= 2 ? 'border-[#C05A3E] text-[#242120]' : 'border-transparent'}`}>
              2. Delivery
            </div>
            <div className={`flex-1 py-2 text-center border-b-2 ${step >= 3 ? 'border-[#C05A3E] text-[#242120]' : 'border-transparent'}`}>
              3. Payment
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120] focus:outline-none focus:border-[#C05A3E]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-6 py-3 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY SPEED */}
          {step === 2 && (
            <div className="space-y-4">
              <div
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  deliveryMethod === 'standard' ? 'border-[#C05A3E] bg-[#FAF3EE]' : 'border-[#E2D8C9] bg-[#FDFBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#2E241F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#242120]">Standard Eco Delivery (3-4 Days)</h4>
                    <p className="text-[11px] text-[#7D6B5D]">Plastic-free kraft packaging directly to your doorstep</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#627A67]">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>

              <div
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  deliveryMethod === 'express' ? 'border-[#C05A3E] bg-[#FAF3EE]' : 'border-[#E2D8C9] bg-[#FDFBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#C05A3E]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#242120]">Priority Express Dispatch (1-2 Days)</h4>
                    <p className="text-[11px] text-[#7D6B5D]">Next morning carrier priority booking</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#242120]">₹99</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="border border-[#DDD2C3] text-[#4A3B32] px-4 py-2.5 rounded-md text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-6 py-3 rounded-md text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: <Smartphone className="w-4 h-4" /> },
                  { id: 'Credit/Debit Card', label: 'Cards', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'Wallet', label: 'Wallets', icon: <Wallet className="w-4 h-4" /> },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: <Banknote className="w-4 h-4" /> }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === m.id
                        ? 'bg-[#2E241F] text-white border-[#2E241F]'
                        : 'bg-[#FDFBF7] text-[#4A3B32] border-[#E2D8C9]'
                    }`}
                  >
                    {m.icon}
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'UPI' && (
                <div className="bg-[#FAF3EE] p-4 rounded-xl border border-[#E8DDD4]">
                  <label className="block text-xs font-bold text-[#242120] uppercase mb-1">Enter UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2.5 text-xs text-[#242120]"
                  />
                  <p className="text-[11px] text-[#7D6B5D] mt-2">
                    Instant demo authorization: GPay, PhonePe, Paytm supported.
                  </p>
                </div>
              )}

              {/* Final Amount Review */}
              <div className="bg-[#F8F4EC] p-4 rounded-xl border border-[#E2D8C9] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5A4B43]">
                  <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#5A4B43]">
                  <span>Shipping</span>
                  <span>{deliveryMethod === 'express' ? '₹99' : (shippingFee === 0 ? 'FREE' : `₹${shippingFee}`)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#627A67]">
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#242120] pt-2 border-t border-[#E2D8C9]">
                  <span>Total Amount Payable</span>
                  <span className="font-serif text-lg">
                    ₹{(total + (deliveryMethod === 'express' && shippingFee === 0 ? 99 : 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="border border-[#DDD2C3] text-[#4A3B32] px-4 py-2.5 rounded-md text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-[#C05A3E] hover:bg-[#B24C30] text-white px-8 py-3.5 rounded-md text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? 'Authorizing Payment...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION */}
          {step === 4 && createdOrder && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#EFF4F0] text-[#627A67] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242120] mb-1">
                Order Confirmed!
              </h3>
              <p className="text-xs text-[#7D6B5D] max-w-sm mx-auto mb-6">
                Your everyday essentials are being carefully hand-wrapped in recycled kraft boxes.
              </p>

              <div className="bg-[#FAF3EE] p-5 rounded-xl border border-[#E8DDD4] text-left max-w-md mx-auto mb-6 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8C7A6B]">Order ID:</span>
                  <span className="font-bold text-[#242120]">{createdOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6B]">Tracking ID:</span>
                  <span className="font-mono font-bold text-[#C05A3E]">{createdOrder.trackingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6B]">Expected Delivery:</span>
                  <span className="font-medium text-[#242120]">{createdOrder.expectedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A6B]">Delivery Address:</span>
                  <span className="font-medium text-[#242120] truncate max-w-[200px]">
                    {createdOrder.shippingAddress.street}, {createdOrder.shippingAddress.city}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleClose}
                  className="bg-[#2E241F] text-white px-6 py-3 rounded-md text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

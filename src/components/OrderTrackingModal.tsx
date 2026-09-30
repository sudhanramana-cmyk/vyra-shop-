import React from 'react';
import { Order } from '../types';
import { X, CheckCircle2, Clock, Truck, Package, Home, MapPin } from 'lucide-react';

interface OrderTrackingModalProps {
  order: Order;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#EADFD0] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C05A3E]">
              Live Order Status
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#242120]">
              {order.id}
            </h2>
            <div className="text-xs text-[#8C7A6B] font-mono mt-0.5">
              Tracking: <span className="text-[#4A3B32] font-bold">{order.trackingId}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFE8DD] text-[#4A3B32] cursor-pointer"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Estimated Arrival Banner */}
          <div className="bg-[#FAF3EE] p-4 rounded-xl border border-[#E8DDD4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#C05A3E]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-[#8C7A6B] uppercase font-bold">Estimated Delivery</div>
                <div className="font-serif text-base font-bold text-[#242120]">{order.expectedDelivery}</div>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#2E241F] text-white">
              {order.status}
            </span>
          </div>

          {/* Timeline Visual Progress */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#8C7A6B] mb-4">
              Shipment Timeline
            </h4>
            <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2D8C9]">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start justify-between">
                  <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-[#627A67] text-white' : 'bg-[#E2D8C9] text-transparent'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${step.completed ? 'text-[#242120]' : 'text-[#8C7A6B]'}`}>
                      {step.status}
                    </h5>
                    <p className="text-[11px] text-[#7D6B5D]">{step.description}</p>
                  </div>
                  <span className="text-[10px] text-[#8C7A6B] font-mono shrink-0 ml-4">
                    {step.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="pt-4 border-t border-[#EADFD0]">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#8C7A6B] mb-3">
              Items in this shipment ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#FDFBF7] p-2.5 rounded-lg border border-[#E8DDD4]">
                  <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs font-bold text-[#242120] line-clamp-1">{item.productName}</h6>
                    <div className="text-[11px] text-[#8C7A6B]">
                      Qty: {item.quantity} {item.selectedColor && `• Color: ${item.selectedColor}`}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#242120]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-4 border-t border-[#EADFD0] flex items-start gap-2.5 text-xs text-[#5A4B43]">
            <MapPin className="w-4 h-4 text-[#C05A3E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#242120]">{order.shippingAddress.name} ({order.shippingAddress.phone})</span>
              <p className="text-[#7D6B5D] mt-0.5">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

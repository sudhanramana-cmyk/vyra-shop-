import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Order, Product } from '../types';
import {
  Package,
  Heart,
  Clock,
  MapPin,
  Tag,
  Star,
  Bell,
  Settings,
  LogOut,
  Truck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface UserDashboardProps {
  onTrackOrder: (order: Order) => void;
  onOpenProduct: (product: Product) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onTrackOrder, onOpenProduct }) => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'orders' | 'addresses' | 'coupons' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    api.getOrders().then(o => setOrders(o));
    api.validateCoupon('VYRAFIRST', 1000).then(() => {
      // Get all coupons from seed
      fetch('/api/coupons')
        .then(r => r.json())
        .then(d => setCoupons(d.coupons || []))
        .catch(() => {});
    });
  }, []);

  if (!user) return null;

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Account Header */}
      <div className="bg-[#FAF3EE] rounded-2xl border border-[#E8DDD4] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#D49B8E] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#C05A3E]">
              My Account • Member Since 2026
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242120]">
              {user.name}
            </h1>
            <p className="text-xs text-[#7D6B5D] mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BA5943] hover:text-[#943F2D] border border-[#DDD2C3] px-4 py-2.5 rounded-lg bg-[#FAF7F2] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Grid: Left Tabs + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2D8C9] space-y-1">
          {[
            { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" /> },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
            { id: 'coupons', label: 'Exclusive Coupons', icon: <Tag className="w-4 h-4" /> },
            { id: 'settings', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-[#2E241F] text-white shadow-xs'
                  : 'text-[#5A4B43] hover:bg-[#F3ECE2] hover:text-[#242120]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Right Section Content */}
        <div className="lg:col-span-9 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E2D8C9]">
          {/* SECTION: ORDERS */}
          {activeSection === 'orders' && (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EADFD0]">
                <h3 className="font-serif text-xl font-bold text-[#242120]">
                  Order History ({orders.length})
                </h3>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#8C7A6B]">
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="bg-[#FDFBF7] rounded-xl border border-[#E8DDD4] p-5 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#EADFD0] gap-2">
                        <div>
                          <span className="text-[10px] text-[#8C7A6B] uppercase font-bold tracking-wider">
                            Order {order.id} • {order.createdAt?.split('T')[0] || 'Recent'}
                          </span>
                          <div className="text-xs font-bold text-[#242120]">
                            Tracking ID: <span className="font-mono text-[#C05A3E]">{order.trackingId}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-[#EFF4F0] text-[#3E5242]">
                            {order.status}
                          </span>
                          <button
                            onClick={() => onTrackOrder(order)}
                            className="bg-[#2E241F] hover:bg-[#C05A3E] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Order</span>
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-[#242120] line-clamp-1">{item.productName}</h5>
                              <p className="text-[11px] text-[#8C7A6B]">
                                Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-[#242120]">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#EADFD0] flex justify-between items-center text-xs text-[#5A4B43]">
                        <span>Payment: {order.paymentMethod}</span>
                        <span className="font-bold text-sm text-[#242120]">
                          Total: ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: ADDRESSES */}
          {activeSection === 'addresses' && (
            <div>
              <h3 className="font-serif text-xl font-bold text-[#242120] pb-4 mb-6 border-b border-[#EADFD0]">
                Saved Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E8DDD4] relative">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[#EFF4F0] text-[#3E5242] px-2 py-0.5 rounded-sm">
                    Default Address
                  </span>
                  <h4 className="font-bold text-xs text-[#242120] mt-3">{user.name}</h4>
                  <p className="text-xs text-[#7D6B5D] mt-1 leading-relaxed">
                    Flat 402, Green Glen Layout, Bellandur<br />
                    Bengaluru, Karnataka - 560103<br />
                    Phone: {user.phone || '+91 98123 45678'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: COUPONS */}
          {activeSection === 'coupons' && (
            <div>
              <h3 className="font-serif text-xl font-bold text-[#242120] pb-4 mb-6 border-b border-[#EADFD0]">
                Active Coupons & Discounts
              </h3>
              <div className="space-y-4">
                {[
                  { code: 'VYRAFIRST', disc: '15% OFF', desc: 'Valid on first order above ₹999' },
                  { code: 'FREESHIP', disc: 'FREE SHIPPING', desc: 'Free express shipping above ₹500' },
                  { code: 'FESTIVE500', disc: 'FLAT ₹500 OFF', desc: 'Festive savings on orders above ₹2,499' }
                ].map(c => (
                  <div key={c.code} className="bg-[#FAF3EE] p-4 rounded-xl border border-[#E8DDD4] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-base font-bold text-[#C05A3E]">{c.code}</div>
                      <p className="text-xs text-[#7D6B5D]">{c.desc}</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#2E241F] text-white px-3 py-1 rounded-md">
                      {c.disc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SETTINGS */}
          {activeSection === 'settings' && (
            <div>
              <h3 className="font-serif text-xl font-bold text-[#242120] pb-4 mb-6 border-b border-[#EADFD0]">
                Profile Preferences
              </h3>
              <div className="space-y-4 max-w-md text-xs text-[#242120]">
                <div>
                  <label className="block font-bold uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full bg-[#FDFBF7] border border-[#DDD2C3] rounded-md p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Email</label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user.email}
                    className="w-full bg-[#EFE8DD] border border-[#DDD2C3] rounded-md p-2.5 text-[#8C7A6B]"
                  />
                </div>
                <div className="pt-2">
                  <button className="bg-[#2E241F] text-white px-6 py-2.5 rounded-md font-bold uppercase tracking-wider">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

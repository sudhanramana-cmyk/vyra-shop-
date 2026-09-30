import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product, Order, Category } from '../types';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Users,
  IndianRupee,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory'>('analytics');
  const [analytics, setAnalytics] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const { showToast } = useToast();

  // New product form state
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Category>('Fashion');
  const [newProductPrice, setNewProductPrice] = useState(1299);
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState(1699);
  const [newProductStock, setNewProductStock] = useState(40);
  const [newProductDescription, setNewProductDescription] = useState('');

  const loadData = async () => {
    try {
      const a = await api.getAdminAnalytics();
      setAnalytics(a);
      const p = await api.getProducts();
      setProducts(p.products);
      const o = await api.getOrders();
      setOrders(o);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProduct({
        name: newProductName,
        category: newProductCategory,
        price: Number(newProductPrice),
        originalPrice: Number(newProductOriginalPrice),
        stockCount: Number(newProductStock),
        description: newProductDescription,
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
        whyWePickedIt: ['High tactile utility', 'Honest everyday value', 'Durable natural material']
      });
      showToast('Product added to live store catalogue!', 'success');
      setIsAddingProduct(false);
      setNewProductName('');
      setNewProductDescription('');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to create product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      showToast('Product removed', 'info');
      loadData();
    } catch {
      showToast('Could not delete product', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      showToast(`Order ${orderId} marked as ${status}`, 'success');
      loadData();
    } catch {
      showToast('Failed to update order status', 'error');
    }
  };

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="bg-[#2E241F] text-white rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#DE7E6A] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Curator Control Room</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            VYRA Admin Dashboard
          </h1>
          <p className="text-xs text-[#B8A99A] mt-0.5">
            Real-time analytics, inventory management, and fulfillment status.
          </p>
        </div>

        <button
          onClick={onBackToStore}
          className="bg-[#FAF7F2] hover:bg-white text-[#2E241F] px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors self-start sm:self-auto cursor-pointer"
        >
          Back to Store
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 border-b border-[#EADFD0]">
        {[
          { id: 'analytics', label: 'Analytics & KPIs', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'products', label: `Products (${products.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'orders', label: `Orders (${orders.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'inventory', label: 'Inventory Health', icon: <AlertCircle className="w-4 h-4" /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#2E241F] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4A3B32] border border-[#DDD2C3] hover:border-[#8C7A6B]'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2D8C9]">
              <div className="flex items-center justify-between text-[#8C7A6B] mb-2">
                <span className="text-xs uppercase font-bold tracking-wider">Gross Revenue</span>
                <IndianRupee className="w-5 h-5 text-[#C05A3E]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#242120]">
                ₹{(analytics?.revenue || 48920).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-[#627A67] font-semibold mt-1">
                +18.4% vs last week
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2D8C9]">
              <div className="flex items-center justify-between text-[#8C7A6B] mb-2">
                <span className="text-xs uppercase font-bold tracking-wider">Total Orders</span>
                <Package className="w-5 h-5 text-[#7D9381]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#242120]">
                {(analytics?.orders || 38).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-[#627A67] font-semibold mt-1">
                98.2% on-time fulfillment
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2D8C9]">
              <div className="flex items-center justify-between text-[#8C7A6B] mb-2">
                <span className="text-xs uppercase font-bold tracking-wider">Average Order</span>
                <TrendingUp className="w-5 h-5 text-[#DE7E6A]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#242120]">
                ₹{(analytics?.averageOrderValue || 1287).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-[#8C7A6B] mt-1">
                Across {products.length} catalog items
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2D8C9]">
              <div className="flex items-center justify-between text-[#8C7A6B] mb-2">
                <span className="text-xs uppercase font-bold tracking-wider">Active Customers</span>
                <Users className="w-5 h-5 text-[#4A3B32]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#242120]">
                {(analytics?.customers || 14).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-[#627A67] font-semibold mt-1">
                42% repeat shoppers
              </p>
            </div>
          </div>

          {/* Category Sales Chart Simulation */}
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E2D8C9]">
            <h3 className="font-serif text-xl font-bold text-[#242120] mb-6">
              Sales by Lifestyle Category
            </h3>
            <div className="space-y-4">
              {[
                { cat: 'Fashion & Apparel', percent: 34, val: '₹16,632' },
                { cat: 'Home & Living', percent: 28, val: '₹13,697' },
                { cat: 'Stationery & Books', percent: 18, val: '₹8,805' },
                { cat: 'Accessories & Bags', percent: 12, val: '₹5,870' },
                { cat: 'Beauty & Wellness', percent: 8, val: '₹3,913' }
              ].map(item => (
                <div key={item.cat}>
                  <div className="flex justify-between text-xs font-bold text-[#242120] mb-1">
                    <span>{item.cat}</span>
                    <span>{item.val} ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-[#EFE8DD] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#C05A3E] h-2 rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-[#242120]">
              Product Inventory ({products.length} Live Items)
            </h3>
            <button
              onClick={() => setIsAddingProduct(!isAddingProduct)}
              className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingProduct ? 'Close Form' : 'Add New Product'}</span>
            </button>
          </div>

          {/* Add Product Form */}
          {isAddingProduct && (
            <form onSubmit={handleCreateProduct} className="bg-[#FAF3EE] p-6 rounded-2xl border border-[#E8DDD4] space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#242120]">Add New Curated Item</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={e => setNewProductName(e.target.value)}
                    placeholder="e.g. Stoneware Serving Bowl"
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={e => setNewProductCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                  >
                    {['Fashion', 'Beauty', 'Footwear', 'Home & Living', 'Accessories', 'Electronics', 'Fitness', 'Travel', 'Stationery', 'Gifts'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={e => setNewProductPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductOriginalPrice}
                    onChange={e => setNewProductOriginalPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={newProductStock}
                    onChange={e => setNewProductStock(Number(e.target.value))}
                    className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newProductDescription}
                  onChange={e => setNewProductDescription(e.target.value)}
                  placeholder="Relatable craftsmanship and everyday utility notes..."
                  className="w-full bg-white border border-[#DDD2C3] rounded-md p-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="bg-[#C05A3E] text-white px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Publish to Catalog
              </button>
            </form>
          )}

          {/* Table */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFE8DD] text-[#4A3B32] uppercase font-bold">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EADFD0]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#FDFBF7]">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                        <div>
                          <div className="font-bold text-[#242120]">{p.name}</div>
                          <div className="text-[10px] text-[#8C7A6B]">{p.brand}</div>
                        </div>
                      </td>
                      <td className="p-3.5 text-[#5A4B43]">{p.category}</td>
                      <td className="p-3.5 font-bold text-[#242120]">₹{p.price}</td>
                      <td className="p-3.5">{p.stockCount} units</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${
                          p.inStock ? 'bg-[#EFF4F0] text-[#3E5242]' : 'bg-[#FAF0EC] text-[#BA5943]'
                        }`}>
                          {p.inStock ? 'In Stock' : 'Sold Out'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-[#BA5943] hover:text-red-700 p-1 cursor-pointer"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-6">
          <h3 className="font-serif text-xl font-bold text-[#242120] mb-6">
            Customer Orders Pipeline
          </h3>
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E8DDD4] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#242120]">{o.id}</span>
                    <span className="text-xs text-[#8C7A6B]">({o.customerName})</span>
                    <span className="px-2 py-0.5 rounded-sm bg-[#FAF0EC] text-[#C05A3E] text-[10px] font-bold uppercase">
                      {o.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7D6B5D] mt-1">
                    {o.items.length} items • ₹{o.total.toLocaleString('en-IN')} via {o.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8C7A6B]">Update status:</span>
                  {['PACKED', 'SHIPPED', 'DELIVERED'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateOrderStatus(o.id, st)}
                      className="border border-[#DDD2C3] hover:border-[#2E241F] px-2.5 py-1 rounded text-[11px] font-semibold text-[#242120] cursor-pointer"
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY HEALTH */}
      {activeTab === 'inventory' && (
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2D8C9] p-6">
          <h3 className="font-serif text-xl font-bold text-[#242120] mb-4">
            Low Stock Alerts (Under 25 Units)
          </h3>
          <div className="space-y-3">
            {products.filter(p => p.stockCount <= 25).map(p => (
              <div key={p.id} className="flex items-center justify-between bg-[#FAF0EC] p-3.5 rounded-xl border border-[#E8DDD4]">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-[#242120]">{p.name}</h5>
                    <p className="text-[10px] text-[#8C7A6B]">{p.category} • SKU: {p.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#BA5943] bg-white px-2 py-0.5 rounded-sm">
                    Only {p.stockCount} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

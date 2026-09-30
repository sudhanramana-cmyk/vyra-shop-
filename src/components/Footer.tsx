import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#2E241F] text-[#FAF7F2] pt-16 pb-24 md:pb-16 mt-20 border-t border-[#4A3B32]">
      {/* Brand Values Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#4A3B32]/70">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-serif text-lg font-medium text-[#F5EFE6] mb-1">Normal Products</h4>
            <p className="text-xs text-[#B8A99A] leading-relaxed">
              Everyday items like linen shirts, ceramic mugs, and dot journals you’ll genuinely use.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-[#F5EFE6] mb-1">Thoughtful Utility</h4>
            <p className="text-xs text-[#B8A99A] leading-relaxed">
              Every piece is tested for daily durability, balanced ergonomics, and tactile joy.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-[#F5EFE6] mb-1">Plastic-Free Transit</h4>
            <p className="text-xs text-[#B8A99A] leading-relaxed">
              Wrapped in recycled corrugated board and natural unbleached kraft papers.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium text-[#F5EFE6] mb-1">Fair & Direct</h4>
            <p className="text-xs text-[#B8A99A] leading-relaxed">
              Transparent pricing with free shipping above ₹999 across all pincodes in India.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#FAF7F2]">
              VYRA
            </span>
            <span className="w-2 h-2 rounded-full bg-[#DE7E6A]"></span>
          </div>
          <p className="text-sm font-serif italic text-[#DECBB7] mb-4">
            "Find things you'll love."
          </p>
          <p className="text-xs text-[#B8A99A] leading-relaxed max-w-sm mb-6">
            VYRA is an independent lifestyle catalog curated for mindful everyday living. We bring together relatable, beautifully made essentials across fashion, beauty, living, and stationery.
          </p>
          <div className="text-[11px] text-[#8C7A6B] uppercase tracking-widest font-semibold">
            EST. 2026 • DESIGNED FOR EVERYDAY LIFE
          </div>
        </div>

        {/* Shop Links */}
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#EADFD0] mb-4">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs text-[#B8A99A]">
            {['Fashion', 'Beauty', 'Footwear', 'Home & Living', 'Accessories', 'Stationery'].map(cat => (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className="hover:text-white transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Curated Discoveries */}
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#EADFD0] mb-4">
            Curations
          </h4>
          <ul className="space-y-2.5 text-xs text-[#B8A99A]">
            <li>
              <button onClick={() => onNavigate && onNavigate('edit')} className="hover:text-white transition-colors">
                The VYRA Edit
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('trending')} className="hover:text-white transition-colors">
                Community Picks
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('collections')} className="hover:text-white transition-colors">
                Complete the Look
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('collections')} className="hover:text-white transition-colors">
                Build Your Day
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('discover')} className="hover:text-white transition-colors">
                Gift Finder
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Editorial */}
        <div className="md:col-span-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#EADFD0] mb-2">
            The Slow Dispatch
          </h4>
          <p className="text-xs text-[#B8A99A] mb-4 leading-relaxed">
            One Sunday email. No spam, no artificial urgency. Just new arrivals, room styling notes, and quiet design stories.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 text-[#7D9381] text-xs py-2 bg-[#241C18] px-3 rounded-md border border-[#3E5242]">
              <Check className="w-4 h-4" />
              <span>You are on the list. Look out for Sunday's dispatch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-[#241C18] border border-[#4A3B32] text-xs px-3.5 py-2.5 rounded-md flex-1 text-white placeholder-[#8C7A6B] focus:outline-none focus:border-[#DE7E6A]"
              />
              <button
                type="submit"
                className="bg-[#C05A3E] hover:bg-[#DE7E6A] text-white px-4 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#8C7A6B] mt-3">
            By joining, you agree to our privacy policy. Unsubscribe anytime in 1-click.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#4A3B32]/70 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A6B] gap-4">
        <div>
          © 2026 VYRA Retail Private Limited. All rights reserved.
        </div>
        <div className="flex gap-6">
          <span className="hover:text-[#B8A99A] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#B8A99A] cursor-pointer">Terms of Service</span>
          <span className="hover:text-[#B8A99A] cursor-pointer">Shipping & Returns</span>
          <span className="hover:text-[#B8A99A] cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
};

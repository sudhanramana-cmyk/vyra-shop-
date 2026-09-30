import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExplore: () => void;
  onSeeWhatsNew: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSeeWhatsNew }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EADFD0]">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-[#EADFD0]/40 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-5 left-10 w-80 h-80 rounded-full bg-[#F3ECE0]/70 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE8DD] border border-[#DDD2C3] text-[11px] font-semibold tracking-widest uppercase text-[#5A4B43] mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#C05A3E]" />
                <span>Curation No. 14 • Everyday Living</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#242120] leading-[1.05] mb-6">
                FIND THINGS
                <span className="block text-[#C05A3E] italic font-normal">YOU'LL LOVE.</span>
              </h1>

              <p className="text-lg sm:text-xl font-serif text-[#5A4B43] leading-relaxed mb-8 max-w-lg">
                "Everyday products, thoughtfully curated for everyday life."
              </p>

              <p className="text-sm text-[#7D6B5D] leading-relaxed mb-10 max-w-md">
                We believe the objects you touch each morning — your coffee mug, your notebook, your sneakers, your bag — shape how your day unfolds. Normal essentials, refined with extraordinary care.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onExplore}
                  className="bg-[#2E241F] hover:bg-[#C05A3E] text-white px-8 py-4 rounded-md text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onSeeWhatsNew}
                  className="border border-[#4A3B32] hover:bg-[#EFE8DD] text-[#242120] px-7 py-4 rounded-md text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center cursor-pointer"
                >
                  See What's New
                </button>
              </div>

              {/* Editorial Notes */}
              <div className="mt-12 pt-8 border-t border-[#E8DDD4] grid grid-cols-3 gap-6">
                <div>
                  <div className="font-serif text-2xl font-bold text-[#242120]">52+</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-medium mt-0.5">Relatable Items</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#242120]">100%</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-medium mt-0.5">Everyday Utility</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#242120]">₹499</div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-medium mt-0.5">Starting At</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Editorial Lifestyle Composition */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              {/* Main Lifestyle Collage Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] bg-[#EFE8DD]">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                  alt="Everyday Relatable Lifestyle Objects: Bag, Skincare, Mug, Notebook"
                  className="w-full h-[460px] sm:h-[540px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />

                {/* Subtle image caption overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-6 text-white">
                  <div className="text-[10px] tracking-widest uppercase font-bold text-[#DE7E6A] mb-1">
                    Morning Routine Still Life
                  </div>
                  <div className="font-serif text-lg sm:text-xl font-medium">
                    Canvas tote, ceramic mug, botanical essence & dot-grid journal
                  </div>
                </div>
              </div>

              {/* Floating Lifestyle Card 1 - Mug */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#FAF7F2] p-3 sm:p-4 rounded-xl shadow-xl border border-[#E2D8C9] max-w-[210px] hidden sm:flex items-center gap-3"
              >
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80"
                  alt="Fluted Mug"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#C05A3E]">
                    VYRA Pick
                  </div>
                  <div className="text-xs font-semibold text-[#242120] line-clamp-1">
                    Fluted Mug
                  </div>
                  <div className="text-xs text-[#5A4B43] font-medium">₹499</div>
                </div>
              </motion.div>

              {/* Floating Lifestyle Card 2 - Sneaker */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-[#FAF7F2] p-3 sm:p-4 rounded-xl shadow-xl border border-[#E2D8C9] max-w-[220px] hidden sm:flex items-center gap-3"
              >
                <img
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80"
                  alt="Minimalist Court Sneaker"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#7D9381]">
                    High Rotation
                  </div>
                  <div className="text-xs font-semibold text-[#242120] line-clamp-1">
                    Court Sneakers
                  </div>
                  <div className="text-xs text-[#5A4B43] font-medium">₹3,499</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

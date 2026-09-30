import React, { useState } from 'react';
import { Article, Product } from '../types';
import { vyraArticles } from '../data/seedData';
import { ArrowRight, BookOpen, Clock, X } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface VyraEditProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const VyraEdit: React.FC<VyraEditProps> = ({ products, onOpenDetails }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const getArticleProducts = (article: Article) => {
    return products.filter(p => article.productIds.includes(p.id));
  };

  return (
    <section className="py-16 md:py-24 border-b border-[#EADFD0] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Magazine Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Volume 03 • The Journal</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#242120] mb-4">
            The VYRA Edit
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#5A4B43]">
            "Stories, design perspectives, and real-world curations for the intentional everyday."
          </p>
        </div>

        {/* Editorial Story Layout: 1 Lead Cover Story + 5 Secondary Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Feature Article */}
          {vyraArticles[0] && (
            <div
              onClick={() => setSelectedArticle(vyraArticles[0])}
              className="lg:col-span-7 group cursor-pointer bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#E2D8C9] hover:border-[#C4B6A2] transition-all shadow-xs hover:shadow-md flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#EFE8DD]">
                <img
                  src={vyraArticles[0].coverImage}
                  alt={vyraArticles[0].title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#2E241F] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm">
                  {vyraArticles[0].category}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8C7A6B] font-semibold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{vyraArticles[0].readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242120] mb-3 group-hover:text-[#C05A3E] transition-colors leading-tight">
                    {vyraArticles[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6B5D] leading-relaxed mb-6">
                    {vyraArticles[0].excerpt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2E241F] group-hover:text-[#C05A3E] transition-colors">
                  <span>Read Article & Shop the Edit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* Secondary Editorial Stories List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {vyraArticles.slice(1, 4).map(article => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-[#FDFBF7] p-4 sm:p-5 rounded-xl border border-[#E2D8C9] hover:border-[#C4B6A2] transition-all flex gap-4 items-center shadow-xs"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#EFE8DD]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-[#C05A3E] uppercase font-bold tracking-wider mb-1">
                    <span>{article.category}</span>
                    <span className="text-[#8C7A6B] font-normal">• {article.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#242120] line-clamp-2 group-hover:text-[#C05A3E] transition-colors mb-1">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-[#7D6B5D] line-clamp-1">
                    {article.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional 2 Articles Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vyraArticles.slice(4, 6).map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-[#FAF3EE] p-6 rounded-xl border border-[#E8DDD4] hover:border-[#D49B8E] transition-all flex justify-between items-center"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C05A3E] tracking-wider">
                  {article.category} • {article.readTime}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#242120] mt-1 group-hover:text-[#C05A3E] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-[#7D6B5D] mt-0.5 line-clamp-1">
                  {article.subtitle}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2E241F] group-hover:bg-[#C05A3E] group-hover:text-white transition-colors shrink-0 ml-4">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail & Linked Products Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FAF7F2] max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E2D8C9] my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header Image */}
            <div className="relative aspect-21/9 overflow-hidden bg-[#2E241F]">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Article Body */}
            <div className="p-6 sm:p-10">
              <div className="text-xs font-bold uppercase tracking-widest text-[#C05A3E] mb-2">
                {selectedArticle.category} • {selectedArticle.readTime}
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#242120] mb-4">
                {selectedArticle.title}
              </h2>
              <p className="font-serif italic text-base text-[#5A4B43] mb-6 border-l-2 border-[#C05A3E] pl-4">
                {selectedArticle.subtitle}
              </p>
              <div className="prose text-sm text-[#4A3B32] leading-relaxed space-y-4 mb-10">
                <p>{selectedArticle.excerpt}</p>
                <p>
                  At VYRA, we curate things that don't demand fuss or complicated manuals. Real objects crafted in solid materials — natural stoneware, thick woven canvas, full-grain leather, and unbleached paper — designed to sit comfortably inside the rhythm of your week.
                </p>
              </div>

              {/* Connected Products Section */}
              <div className="border-t border-[#EADFD0] pt-8">
                <div className="text-[11px] uppercase tracking-widest font-bold text-[#C05A3E] mb-1">
                  From the Story
                </div>
                <h3 className="font-serif text-xl font-bold text-[#242120] mb-6">
                  Featured Everyday Essentials
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {getArticleProducts(selectedArticle).map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={(item) => {
                        setSelectedArticle(null);
                        onOpenDetails(item);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

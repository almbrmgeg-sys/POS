import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Search, Filter, ShoppingBag, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Products() {
  const { language, products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = (language === 'ar' ? product.nameAr : product.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 dark:text-white"
          >
            {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
          </motion.h1>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8" />
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10'
                  }`}
                >
                  {cat === 'All' ? (language === 'ar' ? 'الكل' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-2000">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ rotateY: 10, rotateX: 5, y: -10, translateZ: 50 }}
              className="backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl group preserve-3d"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.category}
                  </div>
                  {product.downloadLinks && product.downloadLinks.length > 0 && (
                    <div className="bg-green-500 text-white p-2 rounded-full shadow-lg" title={language === 'ar' ? 'متاح للتحميل' : 'Download available'}>
                      <Download className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 dark:text-white truncate">
                  {language === 'ar' ? product.nameAr : product.name}
                </h3>
                <div className="relative mb-4">
                  <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed ${expandedId === product.id ? '' : 'line-clamp-2'}`}>
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>
                  {(language === 'ar' ? product.descriptionAr : product.description).length > 60 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedId(expandedId === product.id ? null : product.id);
                      }}
                      className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-1 hover:underline"
                    >
                      {expandedId === product.id 
                        ? (language === 'ar' ? 'عرض أقل' : 'Show Less') 
                        : (language === 'ar' ? 'اقرأ المزيد' : 'Read More')}
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    {product.price} {language === 'ar' ? 'ج.م' : 'EGP'}
                  </span>
                  <Link 
                    to={`/product/${product.id}`}
                    className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-bold text-sm flex items-center gap-2 shadow-md"
                  >
                    {language === 'ar' ? 'التفاصيل' : 'Details'}
                    <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              {language === 'ar' ? 'لم يتم العثور على منتجات تطابق بحثك.' : 'No products found matching your search.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

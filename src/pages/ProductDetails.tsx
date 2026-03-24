import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingCart, Share2, Star, Download, ExternalLink, X, ZoomIn } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, products } = useAppContext();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-2xl font-bold dark:text-white">Product not found</h1>
        <Link to="/products" className="text-blue-600 mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])];
  const currentImage = activeImage || product.image;

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8 font-bold"
        >
          {language === 'ar' ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          {language === 'ar' ? 'العودة' : 'Back'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 perspective-2000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: language === 'ar' ? 15 : -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            className="space-y-6 preserve-3d"
          >
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, translateZ: 50 }}
              onClick={() => setIsZoomed(true)}
              className="aspect-square rounded-[3rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl relative preserve-3d cursor-zoom-in group"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  src={currentImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Share logic
                  }}
                  className="p-3 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 hover:scale-110 transition-transform"
                >
                  <Share2 className="w-5 h-5 dark:text-white" />
                </button>
              </div>
            </motion.div>

            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar perspective-1000">
                {allImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -5, rotateX: 10, translateZ: 20 }}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all preserve-3d ${
                      currentImage === img ? 'border-blue-600 scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? -50 : 50, rotateY: language === 'ar' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            className="flex flex-col justify-center preserve-3d"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">4.9 (120+)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 dark:text-white">
              {language === 'ar' ? product.nameAr : product.name}
            </h1>

            <p className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-8">
              {product.price} {language === 'ar' ? 'ج.م' : 'EGP'}
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {language === 'ar' ? product.descriptionAr : product.description}
            </p>

            <div className="space-y-4 mb-10">
              <h3 className="font-bold dark:text-white text-xl">
                {language === 'ar' ? 'المميزات الرئيسية:' : 'Key Features:'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(language === 'ar' ? product.featuresAr : product.features).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Links Section */}
            {product.downloadLinks && product.downloadLinks.length > 0 && (
              <div className="mb-10 p-6 rounded-3xl bg-blue-600/5 border border-blue-600/10">
                <h3 className="font-bold dark:text-white text-xl mb-4 flex items-center gap-2">
                  <Download className="w-6 h-6 text-blue-600" />
                  {language === 'ar' ? 'روابط التحميل:' : 'Download Links:'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.downloadLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white dark:bg-white/10 border border-blue-200 dark:border-blue-500/20 rounded-xl font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
                    >
                      {language === 'ar' ? link.labelAr : link.label}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button className="flex-1 min-w-[200px] px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                {language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
              </button>
              <button className="px-8 py-5 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl font-bold dark:text-white hover:bg-white/20 transition-all">
                {language === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

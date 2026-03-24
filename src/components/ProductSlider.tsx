import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductSlider() {
  const { language, products } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = products.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/20 perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: language === 'ar' ? -10 : 10, scale: 0.95 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: language === 'ar' ? 10 : -10, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 preserve-3d"
        >
          <img 
            src={slides[currentIndex]?.image} 
            alt={slides[currentIndex]?.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold mb-4 inline-block">
                {slides[currentIndex]?.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                {language === 'ar' ? slides[currentIndex]?.nameAr : slides[currentIndex]?.name}
              </h2>
              <p className="text-gray-300 max-w-xl mb-6 line-clamp-2">
                {language === 'ar' ? slides[currentIndex]?.descriptionAr : slides[currentIndex]?.description}
              </p>
              <div className="text-3xl font-black text-blue-400">
                {slides[currentIndex]?.price} {language === 'ar' ? 'ج.م' : 'EGP'}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === idx ? 'w-8 bg-blue-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sun, Moon, Languages, ShoppingBag, LayoutDashboard, Phone, Home, Download } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const { language, setLanguage, theme, toggleTheme, settings } = useAppContext();
  const location = useLocation();

  const navItems = [
    { name: language === 'ar' ? 'الرئيسية' : 'Home', path: '/', icon: Home },
    { name: language === 'ar' ? 'المنتجات' : 'Products', path: '/products', icon: ShoppingBag },
    { name: language === 'ar' ? 'اتصل بنا' : 'Contact', path: '/contact', icon: Phone },
    { name: language === 'ar' ? 'لوحة التحكم' : 'Admin', path: '/admin', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
          <Link to="/" className="flex items-center gap-2 group perspective-1000">
            <motion.div 
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg preserve-3d"
            >
              <ShoppingBag className="text-white w-6 h-6 backface-hidden" />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 rounded-xl [transform:rotateY(180deg)] backface-hidden">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {language === 'ar' ? settings.siteNameAr : settings.siteName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 perspective-1000">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ rotateX: 15, y: -2 }}
                className="preserve-3d"
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 flex items-center gap-2 ${
                    location.pathname === item.path 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
              title={language === 'ar' ? 'English' : 'العربية'}
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, ArrowRight, ShoppingBag, CheckCircle, Zap, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductSlider from '../components/ProductSlider';

export default function Home() {
  const { language, products, hero, testimonials } = useAppContext();

  const featuredProducts = products.slice(0, 3);

  const stats = [
    { label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients', value: '5000+' },
    { label: language === 'ar' ? 'منتج مباع' : 'Products Sold', value: '15000+' },
    { label: language === 'ar' ? 'سنة خبرة' : 'Years Experience', value: '10+' },
  ];

  const features = [
    {
      title: language === 'ar' ? 'سرعة فائقة' : 'Lightning Fast',
      desc: language === 'ar' ? 'معالجة سريعة لجميع معاملاتك.' : 'Quick processing for all your transactions.',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      title: language === 'ar' ? 'أمان تام' : 'Secure & Reliable',
      desc: language === 'ar' ? 'حماية بياناتك هي أولويتنا القصوى.' : 'Your data security is our top priority.',
      icon: Shield,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: language === 'ar' ? 'سهولة الاستخدام' : 'Easy to Use',
      desc: language === 'ar' ? 'واجهة بسيطة وسهلة لجميع الموظفين.' : 'Simple and intuitive interface for all staff.',
      icon: CheckCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight dark:text-white">
              {language === 'ar' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">المبرمج</span> لبرامج الكاشير
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ALMBRMG</span> POS Solutions
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              {language === 'ar' 
                ? 'نحن نقدم أفضل حلول برامج الكاشير ونقاط البيع المتكاملة لجميع أنواع الأنشطة التجارية.'
                : 'We provide the best integrated cashier and POS software solutions for all types of business activities.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/40 transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
              >
                {language === 'ar' ? 'استكشف برامجنا' : 'Explore Software'}
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: language === 'ar' ? -15 : 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotateZ: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-[3rem] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.2)] dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200" 
                alt="POS System"
                className="rounded-[2.5rem] w-full h-auto object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating 3D Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center border border-white/20"
              >
                <Zap className="text-white w-10 h-10" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-[2rem] shadow-2xl flex items-center justify-center border border-white/20"
              >
                <Shield className="text-white w-12 h-12" />
              </motion.div>

              <div className="absolute top-12 right-12 backdrop-blur-xl bg-white/80 dark:bg-black/80 p-6 rounded-3xl shadow-2xl border border-white/20 transform rotate-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{language === 'ar' ? 'نظام معتمد' : 'Certified System'}</p>
                    <p className="text-lg font-black dark:text-white">100% {language === 'ar' ? 'آمن' : 'Secure'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 perspective-2000">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <ProductSlider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ rotateY: 10, translateZ: 20, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                className="backdrop-blur-md bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center shadow-lg preserve-3d"
              >
                <h3 className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 drop-shadow-md">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-black/20 perspective-2000">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">
              {language === 'ar' ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotateX: 10, rotateY: -5, translateZ: 30 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all preserve-3d"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 perspective-2000">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2 dark:text-white">
                {language === 'ar' ? 'منتجاتنا المميزة' : 'Featured Products'}
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </div>
            <Link to="/products" className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ rotateY: 10, rotateX: 5, y: -10, translateZ: 50 }}
                className="backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl group preserve-3d"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold dark:text-white shadow-lg">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {product.price} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                    <Link 
                      to={`/product/${product.id}`}
                      className="p-3 bg-gray-100 dark:bg-white/10 rounded-xl hover:bg-blue-600 hover:text-white transition-colors shadow-md"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

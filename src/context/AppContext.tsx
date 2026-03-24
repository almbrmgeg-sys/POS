import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Product, SiteSettings, Testimonial, HeroContent } from '../types';
import initialProducts from '../data/initialProducts.json';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  settings: SiteSettings;
  updateSettings: (settings: SiteSettings) => void;
  testimonials: Testimonial[];
  updateTestimonials: (testimonials: Testimonial[]) => void;
  hero: HeroContent;
  updateHero: (hero: HeroContent) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'ALMBRMG',
  siteNameAr: 'المبرمج',
  email: 'almbrmg.eg@gmail.com',
  phone: '+201515049844',
  address: 'Alexandria, Egypt',
  addressAr: 'الاسكندرية، مصر',
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com', show: true },
    { platform: 'Twitter', url: 'https://twitter.com', show: true },
    { platform: 'LinkedIn', url: 'https://linkedin.com', show: true },
    { platform: 'Instagram', url: 'https://instagram.com', show: true },
    { platform: 'YouTube', url: 'https://youtube.com', show: true },
  ]
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Happy Client 1',
    nameAr: 'العميل المميز 1',
    text: 'A great experience with ALMBRMG software. The system helped us organize our operations and significantly increase sales.',
    textAr: 'تجربة رائعة مع برامج المبرمج. لقد ساعدنا النظام في تنظيم عملياتنا وزيادة المبيعات بشكل ملحوظ.'
  },
  {
    id: '2',
    name: 'Happy Client 2',
    nameAr: 'العميل المميز 2',
    text: 'A great experience with ALMBRMG software. The system helped us organize our operations and significantly increase sales.',
    textAr: 'تجربة رائعة مع برامج المبرمج. لقد ساعدنا النظام في تنظيم عملياتنا وزيادة المبيعات بشكل ملحوظ.'
  },
  {
    id: '3',
    name: 'Happy Client 3',
    nameAr: 'العميل المميز 3',
    text: 'A great experience with ALMBRMG software. The system helped us organize our operations and significantly increase sales.',
    textAr: 'تجربة رائعة مع برامج المبرمج. لقد ساعدنا النظام في تنظيم عملياتنا وزيادة المبيعات بشكل ملحوظ.'
  }
];

const DEFAULT_HERO: HeroContent = {
  title: 'ALMBRMG POS Solutions',
  titleAr: 'المبرمج لبرامج الكاشير',
  subtitle: 'We provide the best integrated cashier and POS software solutions for all types of business activities.',
  subtitleAr: 'نحن نقدم أفضل حلول برامج الكاشير ونقاط البيع المتكاملة لجميع أنواع الأنشطة التجارية.',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200'
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('pos_lang');
    return (saved as Language) || 'ar';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pos_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pos_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('pos_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('pos_testimonials');
    return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
  });

  const [hero, setHero] = useState<HeroContent>(() => {
    const saved = localStorage.getItem('pos_hero');
    return saved ? JSON.parse(saved) : DEFAULT_HERO;
  });

  useEffect(() => {
    localStorage.setItem('pos_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pos_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pos_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pos_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pos_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('pos_hero', JSON.stringify(hero));
  }, [hero]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  
  const updateProduct = (product: Product) => 
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));

  const deleteProduct = (id: string) => 
    setProducts(prev => prev.filter(p => p.id !== id));

  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);
  const updateTestimonials = (newTestimonials: Testimonial[]) => setTestimonials(newTestimonials);
  const updateHero = (newHero: HeroContent) => setHero(newHero);

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      theme, toggleTheme, 
      products, addProduct, updateProduct, deleteProduct,
      settings, updateSettings,
      testimonials, updateTestimonials,
      hero, updateHero
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { language, settings } = useAppContext();

  const socialIcons: Record<string, any> = {
    Facebook, Twitter, LinkedIn: Linkedin, Instagram, YouTube: Youtube
  };

  return (
    <footer className="py-12 px-4 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold dark:text-white">{language === 'ar' ? settings.siteNameAr : settings.siteName}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
            {language === 'ar' 
              ? 'نحن نقدم أفضل حلول نقاط البيع لعملك. تقنيتنا مصممة لمساعدتك على النمو والنجاح.'
              : 'Providing the best POS solutions for your business. Our technology is built to help you grow and succeed.'}
          </p>
          <div className="flex gap-4">
            {settings.socialLinks.filter(s => s.show).map((social, idx) => {
              const Icon = socialIcons[social.platform] || Facebook;
              return (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title={social.platform}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 dark:text-white">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>{language === 'ar' ? 'الرئيسية' : 'Home'}</li>
            <li>{language === 'ar' ? 'المنتجات' : 'Products'}</li>
            <li>{language === 'ar' ? 'اتصل بنا' : 'Contact'}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 dark:text-white">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>{settings.email}</li>
            <li>{settings.phone}</li>
            <li>{language === 'ar' ? settings.addressAr : settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-500 dark:text-gray-500 text-sm">
        © {new Date().getFullYear()} {language === 'ar' ? settings.siteNameAr : settings.siteName}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
      </div>
    </footer>
  );
}

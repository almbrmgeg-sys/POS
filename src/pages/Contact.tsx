import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { language, settings } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: Phone, label: language === 'ar' ? 'الهاتف' : 'Phone', value: settings.phone },
    { icon: Mail, label: language === 'ar' ? 'البريد الإلكتروني' : 'Email', value: settings.email },
    { icon: MapPin, label: language === 'ar' ? 'الموقع' : 'Location', value: language === 'ar' ? settings.addressAr : settings.address },
  ];

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 dark:text-white">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl"
              >
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="text-lg font-bold dark:text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 dark:text-white">
                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent Successfully!'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.' : 'Thank you for reaching out. We will get back to you as soon as possible.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white ml-2">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white ml-2">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-2">{language === 'ar' ? 'الموضوع' : 'Subject'}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                      placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white ml-2">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                    <textarea 
                      required
                      rows={6}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none"
                      placeholder={language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-3"
                  >
                    <Send className="w-6 h-6" />
                    {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

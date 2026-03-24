import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { 
  Plus, Edit2, Trash2, X, Save, Image as ImageIcon, 
  Package, DollarSign, List, Upload, Link as LinkIcon, 
  Download, Settings, UserCheck, Layout, Globe, Phone, Mail, MapPin, Share2
} from 'lucide-react';
import { Product, DownloadLink, SiteSettings, Testimonial, HeroContent, SocialLink } from '../types';

type AdminTab = 'products' | 'settings' | 'testimonials' | 'hero';

export default function Admin() {
  const { 
    language, products, addProduct, updateProduct, deleteProduct,
    settings, updateSettings,
    testimonials, updateTestimonials,
    hero, updateHero
  } = useAppContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', nameAr: '',
    price: 0,
    description: '', descriptionAr: '',
    image: '',
    images: [],
    downloadLinks: [],
    category: '',
    features: [], featuresAr: []
  });

  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [testimonialsForm, setTestimonialsForm] = useState<Testimonial[]>(testimonials);
  const [heroForm, setHeroForm] = useState<HeroContent>(hero);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'additional' | 'hero' = 'primary') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'additional') {
          setFormData(prev => ({ ...prev, images: [...(prev.images || []), result] }));
        } else if (type === 'hero') {
          setHeroForm(prev => ({ ...prev, image: result }));
        } else {
          setFormData(prev => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index)
    }));
  };

  const addDownloadLink = () => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: [...(prev.downloadLinks || []), { label: '', labelAr: '', url: '' }]
    }));
  };

  const updateDownloadLink = (index: number, field: keyof DownloadLink, value: string) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks?.map((link, i) => i === index ? { ...link, [field]: value } : link)
    }));
  };

  const removeDownloadLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: prev.downloadLinks?.filter((_, i) => i !== index)
    }));
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        images: product.images || [],
        downloadLinks: product.downloadLinks || []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', nameAr: '',
        price: 0,
        description: '', descriptionAr: '',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
        images: [],
        downloadLinks: [],
        category: 'Terminals',
        features: ['Feature 1', 'Feature 2'],
        featuresAr: ['ميزة 1', 'ميزة 2']
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
    } as Product;

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    alert(language === 'ar' ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!');
  };

  const handleSaveHero = () => {
    updateHero(heroForm);
    alert(language === 'ar' ? 'تم حفظ محتوى الواجهة بنجاح!' : 'Hero content saved successfully!');
  };

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      name: '', nameAr: '',
      text: '', textAr: ''
    };
    setTestimonialsForm([...testimonialsForm, newTestimonial]);
  };

  const handleUpdateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    setTestimonialsForm(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonialsForm(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveTestimonials = () => {
    updateTestimonials(testimonialsForm);
    alert(language === 'ar' ? 'تم حفظ التقييمات بنجاح!' : 'Testimonials saved successfully!');
  };

  const handleUpdateSocial = (index: number, field: keyof SocialLink, value: string | boolean) => {
    const newSocialLinks = [...settingsForm.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setSettingsForm({ ...settingsForm, socialLinks: newSocialLinks });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'basel@010') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-black dark:text-white mb-2">
              {language === 'ar' ? 'تسجيل الدخول للمشرف' : 'Admin Login'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'يرجى إدخال كلمة المرور للمتابعة' : 'Please enter password to continue'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input 
                type="password"
                placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              {language === 'ar' ? 'دخول' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', label: language === 'ar' ? 'المنتجات' : 'Products', icon: Package },
    { id: 'settings', label: language === 'ar' ? 'الإعدادات' : 'Settings', icon: Settings },
    { id: 'hero', label: language === 'ar' ? 'الواجهة' : 'Hero', icon: Layout },
    { id: 'testimonials', label: language === 'ar' ? 'التقييمات' : 'Testimonials', icon: UserCheck },
  ];

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black dark:text-white mb-2">
              {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'إدارة كل محتوى موقعك من مكان واحد' : 'Manage all your site content from one place'}
            </p>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={() => handleOpenModal()}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Plus className="w-6 h-6" />
              {language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-100 dark:bg-white/5 rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md' 
                  : 'text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="backdrop-blur-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-8">
          {activeTab === 'products' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right">
                <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold dark:text-white">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                    <th className="px-6 py-4 text-sm font-bold dark:text-white">{language === 'ar' ? 'الفئة' : 'Category'}</th>
                    <th className="px-6 py-4 text-sm font-bold dark:text-white">{language === 'ar' ? 'السعر' : 'Price'}</th>
                    <th className="px-6 py-4 text-sm font-bold dark:text-white text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold dark:text-white">{language === 'ar' ? product.nameAr : product.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-xs font-bold dark:text-white">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                        {product.price} {language === 'ar' ? 'ج.م' : 'EGP'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Site Name (EN)
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({...settingsForm, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4" /> اسم الموقع (AR)
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.siteNameAr}
                    onChange={(e) => setSettingsForm({...settingsForm, siteNameAr: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <input 
                    type="email"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Address (EN)
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({...settingsForm, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> العنوان (AR)
                  </label>
                  <input 
                    type="text"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    value={settingsForm.addressAr}
                    onChange={(e) => setSettingsForm({...settingsForm, addressAr: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold dark:text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5" /> Social Links
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {settingsForm.socialLinks.map((social, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <input 
                          type="checkbox"
                          id={`show-${social.platform}`}
                          checked={social.show}
                          onChange={(e) => handleUpdateSocial(idx, 'show', e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`show-${social.platform}`} className="font-bold text-sm dark:text-white cursor-pointer">
                          {social.platform}
                        </label>
                      </div>
                      <input 
                        type="text"
                        className="flex-1 w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white text-sm"
                        value={social.url}
                        onChange={(e) => handleUpdateSocial(idx, 'url', e.target.value)}
                        placeholder={`${social.platform} URL`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
              </button>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-bold text-blue-600 uppercase tracking-widest text-xs">English Hero</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white">Hero Title</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-purple-600 uppercase tracking-widest text-xs">محتوى الواجهة بالعربي</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white">عنوان الواجهة</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      value={heroForm.titleAr}
                      onChange={(e) => setHeroForm({...heroForm, titleAr: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold dark:text-white">وصف الواجهة</label>
                    <textarea 
                      rows={3}
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                      value={heroForm.subtitleAr}
                      onChange={(e) => setHeroForm({...heroForm, subtitleAr: e.target.value})}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm font-bold dark:text-white">Hero Image</label>
                  <div className="flex gap-4 items-start">
                    <div className="w-48 aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                      <img src={heroForm.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <input 
                        type="text"
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        placeholder="Image URL"
                        value={heroForm.image}
                        onChange={(e) => setHeroForm({...heroForm, image: e.target.value})}
                      />
                      <button 
                        onClick={() => heroImageInputRef.current?.click()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        {language === 'ar' ? 'رفع صورة' : 'Upload Image'}
                      </button>
                      <input 
                        type="file"
                        ref={heroImageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'hero')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSaveHero}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {language === 'ar' ? 'حفظ محتوى الواجهة' : 'Save Hero Content'}
              </button>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold dark:text-white">{language === 'ar' ? 'إدارة التقييمات' : 'Manage Testimonials'}</h3>
                <button 
                  onClick={handleAddTestimonial}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {language === 'ar' ? 'إضافة تقييم' : 'Add Testimonial'}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {testimonialsForm.map((item) => (
                  <div key={item.id} className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-4 relative group">
                    <button 
                      onClick={() => handleDeleteTestimonial(item.id)}
                      className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">Name (EN)</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white"
                          value={item.name}
                          onChange={(e) => handleUpdateTestimonial(item.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">الاسم (AR)</label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white"
                          value={item.nameAr}
                          onChange={(e) => handleUpdateTestimonial(item.id, 'nameAr', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">Testimonial (EN)</label>
                      <textarea 
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white resize-none"
                        value={item.text}
                        onChange={(e) => handleUpdateTestimonial(item.id, 'text', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500">التقييم (AR)</label>
                      <textarea 
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white resize-none"
                        value={item.textAr}
                        onChange={(e) => handleUpdateTestimonial(item.id, 'textAr', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleSaveTestimonials}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {language === 'ar' ? 'حفظ التقييمات' : 'Save Testimonials'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white dark:bg-[#111] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-white/10">
                <h2 className="text-2xl font-black dark:text-white">
                  {editingProduct 
                    ? (language === 'ar' ? 'تعديل المنتج' : 'Edit Product') 
                    : (language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 dark:text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmitProduct} className="p-8 overflow-y-auto max-h-[80vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* English Info */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-blue-600 uppercase tracking-widest text-xs">English Details</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">Product Name</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Arabic Info */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-purple-600 uppercase tracking-widest text-xs">التفاصيل العربية</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">اسم المنتج</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        value={formData.nameAr}
                        onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">الوصف</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                        value={formData.descriptionAr}
                        onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Shared Info */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">{language === 'ar' ? 'السعر (ج.م)' : 'Price (EGP)'}</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                          required
                          type="number"
                          className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">Category</label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select 
                          className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                          <option value="Terminals">Terminals</option>
                          <option value="Printers">Printers</option>
                          <option value="Scanners">Scanners</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold dark:text-white">{language === 'ar' ? 'الصورة الأساسية' : 'Primary Image'}</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input 
                            required
                            type="text"
                            className="w-full pl-10 pr-5 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                        <input 
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Images */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold dark:text-white">{language === 'ar' ? 'صور إضافية' : 'Additional Images'}</h3>
                      <button 
                        type="button"
                        onClick={() => additionalImagesInputRef.current?.click()}
                        className="text-sm font-bold text-blue-600 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {language === 'ar' ? 'إضافة صورة' : 'Add Image'}
                      </button>
                      <input 
                        type="file"
                        ref={additionalImagesInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'additional')}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {formData.images?.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 dark:border-white/10">
                          <img src={img} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Links */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold dark:text-white">{language === 'ar' ? 'روابط التحميل' : 'Download Links'}</h3>
                      <button 
                        type="button"
                        onClick={addDownloadLink}
                        className="text-sm font-bold text-blue-600 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        {language === 'ar' ? 'إضافة رابط' : 'Add Link'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.downloadLinks?.map((link, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                          <input 
                            placeholder="Label (EN)"
                            className="px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white"
                            value={link.label}
                            onChange={(e) => updateDownloadLink(idx, 'label', e.target.value)}
                          />
                          <input 
                            placeholder="العنوان (AR)"
                            className="px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white"
                            value={link.labelAr}
                            onChange={(e) => updateDownloadLink(idx, 'labelAr', e.target.value)}
                          />
                          <input 
                            placeholder="URL"
                            className="px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white md:col-span-1"
                            value={link.url}
                            onChange={(e) => updateDownloadLink(idx, 'url', e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={() => removeDownloadLink(idx)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border border-gray-200 dark:border-white/10 rounded-2xl font-bold dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {language === 'ar' ? 'حفظ المنتج' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

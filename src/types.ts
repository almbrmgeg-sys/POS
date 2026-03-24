export interface DownloadLink {
  label: string;
  labelAr: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  description: string;
  descriptionAr: string;
  image: string; // Primary image
  images?: string[]; // Additional images
  downloadLinks?: DownloadLink[];
  category: string;
  features: string[];
  featuresAr: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  text: string;
  textAr: string;
  videoUrl?: string; // Placeholder for now
}

export interface SocialLink {
  platform: string;
  url: string;
  show: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteNameAr: string;
  email: string;
  phone: string;
  address: string;
  addressAr: string;
  socialLinks: SocialLink[];
}

export interface HeroContent {
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  image: string;
}

export type Language = 'en' | 'ar';

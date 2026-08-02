export type Page = 'home' | 'login' | 'planner' | 'explore' | 'interactive' | 'weather' | 'packing' | 'postcards' | 'map';
export type Language = 'en' | 'hi' | 'ra';

export interface Postcard {
  id: string;
  authorName: string;
  authorLocation: string;
  destination: string; // e.g. Jaipur, Udaipur
  category: 'experience' | 'suggestion' | 'food_tip' | 'heritage_tip' | 'general';
  headline: string;
  message: string;
  rating: number; // 1 to 5
  themeImage: string;
  stampType: 'elephant' | 'sun' | 'camel' | 'peacock';
  date: string;
  likes: number;
  userLiked?: boolean;
}

export interface ToastMessage {
  id: number;
  msg: string;
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export interface ModalData {
  name: string;
  category: string;
  description: string;
  timings: string;
  fee: string;
  tip: string;
  image: string;
}

export interface PlannerForm {
  destinations: string[];
  days: string;
  people: string;
  categories: string[];
  accommodation: string;
  transport: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  type: 'attraction' | 'hotel' | 'culture' | 'food';
  city: string;
  image: string;
  category: string;
  rating?: number;
  priceOrFee?: string;
  description: string;
  addedAt?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity?: string;
  packed: boolean;
  essential?: boolean;
  notes?: string;
  addedByUser?: boolean;
}

export interface RajasthanHotel {
  id: string;
  name: string;
  city: string;
  category: 'Heritage Palace' | 'Luxury Resort' | 'Boutique Haveli' | 'Desert Glamping' | 'Budget Stay';
  pricePerNight: string;
  priceNumeric: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  amenities: string[];
  address: string;
}



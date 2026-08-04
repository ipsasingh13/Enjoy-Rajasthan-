import {
  Briefcase,
  CloudSun,
  Compass,
  Crown,
  Heart,
  Languages,
  Mail,
  MapPin,
  Megaphone,
  Moon,
  Sun
} from 'lucide-react';

import React, { useEffect, useState } from 'react';
import logoUrl from '../assets/images/rajasthan_tourism_logo_1784183668634.jpg';
import { translations } from '../data';
import { Language, Page } from '../types';
import { getWishlist } from '../utils/wishlist';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({ currentPage, setCurrentPage, currentLang, setCurrentLang, isLoggedIn, theme, toggleTheme }: HeaderProps) {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setWishlistCount(getWishlist().length);
    };
    updateCount();
    window.addEventListener('wishlist-updated', updateCount);
    return () => window.removeEventListener('wishlist-updated', updateCount);
  }, []);

  const t = (key: string) => translations[currentLang][key] || translations['en'][key];

  return (
    <header className="flex flex-col w-full bg-white border-b border-slate-200 sticky top-0 z-50 transition-colors duration-200">
      <div className="bg-indigo-600 text-indigo-50 text-[11px] py-2 px-4 text-center font-medium flex justify-between items-center w-full">
        <span className="hidden sm:flex items-center gap-1.5"><Crown className="w-3.5 h-3.5" /> {t('welcomeBar')}</span>
        <span className="mx-auto sm:mx-0 flex items-center gap-1.5"><Megaphone className="w-3.5 h-3.5" /> Special Autumn Offer: Get Free Camel Safari vouchers on smart planner booking!</span>
        <span className="hidden md:flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Rajasthan, India</span>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <img src={logoUrl} alt="Rajasthan Royal Explorer Logo" className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
          <span className="text-xl font-extrabold tracking-tight text-black">ROYAL RAJASTHAN</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition`}>{t('navHome')}</button>
          <button onClick={() => setCurrentPage('planner')} className={`${currentPage === 'planner' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition`}>{t('navPlanner')}</button>
          <button onClick={() => setCurrentPage('map')} className={`${currentPage === 'map' ? 'text-amber-600 font-bold' : 'hover:text-slate-900'} transition flex items-center gap-1`}>
            <Compass className="w-4 h-4 text-amber-500" /> {t('navMap')}
          </button>
          <button onClick={() => setCurrentPage('explore')} className={`${currentPage === 'explore' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition`}>{t('navCulture')}</button>
          <button onClick={() => setCurrentPage('postcards')} className={`${currentPage === 'postcards' ? 'text-amber-600 font-bold' : 'hover:text-slate-900'} transition flex items-center gap-1`}>
            <Mail className="w-4 h-4 text-amber-500" /> {t('navPostcards')}
          </button>
          <button onClick={() => setCurrentPage('packing')} className={`${currentPage === 'packing' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition flex items-center gap-1`}>
            <Briefcase className="w-4 h-4 text-indigo-500" /> {t('navPacking')}
          </button>
          <button onClick={() => setCurrentPage('weather')} className={`${currentPage === 'weather' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition flex items-center gap-1`}>
            <CloudSun className="w-4 h-4 text-amber-500" /> {t('navWeather')}
          </button>

          <button onClick={() => setCurrentPage('interactive')} className={`${currentPage === 'interactive' ? 'text-indigo-600 font-bold' : 'hover:text-slate-900'} transition flex items-center gap-1.5`}>
            {t('navInteractive')}
          </button>
        </nav>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center cursor-pointer shadow-2xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button 
            onClick={() => setCurrentPage('planner')} 
            className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition flex items-center justify-center cursor-pointer"
            title="View Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-current' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Hindi & English Language Switcher Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-xs gap-0.5">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5 hidden sm:inline-block" />
            <button
              type="button"
              onClick={() => setCurrentLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currentLang === 'hi'
                  ? 'bg-amber-600 text-white shadow-xs scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang(currentLang === 'ra' ? 'en' : 'ra')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                currentLang === 'ra'
                  ? 'bg-rose-600 text-white shadow-xs scale-105'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Marwari Dialect"
            >
              राज
            </button>
          </div>

          {!isLoggedIn ? (
            <button onClick={() => setCurrentPage('login')} className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition cursor-pointer">{t('navLogin')}</button>
          ) : (
            <span className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full flex items-center gap-1.5 shadow-sm">
              <Crown className="w-3.5 h-3.5" /> Maharaja Guest
            </span>
          )}
        </div>
      </div>
    </header>
  );
}


import React, { useState, useEffect } from 'react';
import Explore from './components/Explore';
import FloatingChat from './components/FloatingChat';
import Header from './components/Header';
import Hero from './components/Hero';
import Interactive from './components/Interactive';
import Login from './components/Login';
import Modal from './components/Modal';
import Planner from './components/Planner';
import PackingChecklist from './components/PackingChecklist';
import PlacesMap from './components/PlacesMap';
import PostcardComponent from './components/PostcardComponent';
import Toast from './components/Toast';

import WeatherComponent from './components/WeatherComponent';
import { attractionDetailsInfo } from './data';
import { Language, ModalData, Page, ToastMessage } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('rajasthan_lang');
    return (saved as Language) || 'en';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // Global Destinations for Explore Planner Link
  const [destinations, setDestinations] = useState<string[]>(['Jaipur', 'Jodhpur']);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedRoute = params.get('route') || params.get('cities') || params.get('itinerary');
      if (sharedRoute) {
        const decodedCities = decodeURIComponent(sharedRoute)
          .split(',')
          .map(c => c.trim())
          .filter(Boolean);

        if (decodedCities.length > 0) {
          setDestinations(decodedCities);
          addToast(`🗺️ Loaded shared itinerary (${decodedCities.length} stops): ${decodedCities.join(' ➔ ')}!`);
          
          const targetPage = params.get('page') as Page;
          if (targetPage && ['planner', 'explore', 'map'].includes(targetPage)) {
            setCurrentPage(targetPage);
          } else {
            setCurrentPage('planner');
          }
        }
      }
    } catch (err) {
      console.error('Error parsing shared itinerary URL', err);
    }
  }, []);

  const addToast = (msg: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('rajasthan_lang', lang);
    const langNames: Record<Language, string> = {
      en: 'English (अंग्रेजी)',
      hi: 'हिंदी (Hindi)',
      ra: 'राजस्थानी (Marwari)'
    };
    addToast(`Language updated to ${langNames[lang]}`);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('planner');
    addToast("Successfully authenticated Maharaja Guest Profile!");
  };

  const openAttractionDetail = (name: string, categoryName: string) => {
    const searchKey = name.trim();
    const defaultDetails = {
      description: `A marvelous monument of heritage. Ideal for family explorers and photography tours.`,
      timings: '09:00 AM - 05:30 PM',
      fee: '₹100 standard access',
      tip: 'Capture standard panoramic frames during late afternoon hours.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80'
    };

    const matchedDetails = attractionDetailsInfo[searchKey] || defaultDetails;

    setModalData({
      name,
      category: categoryName,
      description: matchedDetails.description,
      timings: matchedDetails.timings,
      fee: matchedDetails.fee,
      tip: matchedDetails.tip,
      image: matchedDetails.image
    });

    setShowModal(true);
  };

  const toggleMapCity = (cityName: string) => {
    setDestinations(prev => {
      if (prev.includes(cityName)) {
        addToast(`Removed ${cityName} from route itinerary.`);
        return prev.filter(c => c !== cityName);
      } else {
        addToast(`Added ${cityName} to route itinerary!`);
        return [...prev, cityName];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative z-10">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentLang={currentLang} 
        setCurrentLang={handleLanguageChange} 
        isLoggedIn={isLoggedIn} 
      />

      <Toast toasts={toasts} removeToast={removeToast} />

      <main className="flex-1 w-full relative z-10">
        {currentPage === 'home' && <Hero setCurrentPage={setCurrentPage} currentLang={currentLang} />}
        {currentPage === 'login' && <Login handleLogin={handleLogin} currentLang={currentLang} />}
        {currentPage === 'planner' && <Planner currentLang={currentLang} addToast={addToast} openAttractionDetail={openAttractionDetail} />}
        {currentPage === 'explore' && <Explore destinations={destinations} toggleMapCity={toggleMapCity} setDestinations={setDestinations} />}
        {currentPage === 'weather' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <WeatherComponent initialCity={destinations[0] || 'Jaipur'} />
          </div>
        )}
        {currentPage === 'packing' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <PackingChecklist initialCities={destinations} addToast={addToast} />
          </div>
        )}
        {currentPage === 'postcards' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <PostcardComponent addToast={addToast} />
          </div>
        )}
        {currentPage === 'map' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <PlacesMap addToast={addToast} onOpenAttractionDetail={openAttractionDetail} />
          </div>
        )}
        {currentPage === 'interactive' && <Interactive addToast={addToast} />}

      </main>

      <Modal modalData={modalData} showModal={showModal} setShowModal={setShowModal} />
      <FloatingChat />

      <footer className="bg-white border-t border-slate-200 mt-auto relative z-10">
        <div className="px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform</span>
            <span className="text-sm font-semibold text-slate-700">Rajasthan Royal Explorer</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Technology</span>
            <span className="text-sm font-semibold text-slate-700">NextGen Render Core</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ecosystem</span>
            <span className="text-sm font-semibold text-slate-700">Smart Tourism Tools</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal</span>
            <span className="text-sm font-semibold text-slate-700">&copy; 2026 Explorer Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

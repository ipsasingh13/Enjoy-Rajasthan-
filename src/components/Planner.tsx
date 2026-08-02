import {
  ArrowRight, Calculator,
  CalendarDays,
  ChartPie, ChevronRight,
  Clock,
  CloudRain,
  Coins,
  Copy, Database, Hotel,
  Info, Leaf,
  MapPin,
  PlaneTakeoff,
  Printer,
  Route,
  Settings,
  Sparkles,
  Briefcase,
  Users,
  Heart,
  Trash2,
  Plus,
  Star,
  WifiOff,
  HardDriveDownload,
  CheckCircle
} from 'lucide-react';
import React, { useMemo, useState, useEffect } from 'react';
import { 
  attractionDetailsInfo, 
  attractionsData, 
  budgetRows, 
  cityDaysDatabase, 
  destinationsList, 
  rajasthanHotelsData, 
  translations, 
  weatherDatabase 
} from '../data';
import { backendApi } from '../supabase';
import { Language, PlannerForm, RajasthanHotel, WishlistItem } from '../types';
import { 
  clearWishlist, 
  getWishlist, 
  isWishlisted, 
  removeFromWishlist, 
  toggleWishlistItem 
} from '../utils/wishlist';
import WeatherComponent from './WeatherComponent';
import PackingChecklist from './PackingChecklist';
import BudgetAnalytics from './BudgetAnalytics';
import TripSummary from './TripSummary';
import SuggestedStays, { RAJASTHAN_STAYS } from './SuggestedStays';

export default function Planner({ currentLang, addToast, openAttractionDetail }: { currentLang: Language, addToast: (msg: string) => void, openAttractionDetail: (name: string, cat: string) => void }) {
  const t = (key: string) => translations[currentLang][key] || translations['en'][key];
  
  const [plannerStep, setPlannerStep] = useState(1);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistFilter, setWishlistFilter] = useState<'all' | 'attraction' | 'hotel' | 'culture'>('all');
  const [hotelCityFilter, setHotelCityFilter] = useState<string>('all');

  const [form, setForm] = useState<PlannerForm>({
    destinations: ['Jaipur', 'Jodhpur'],
    days: '5 Days',
    people: 'Family',
    categories: ['Historical Tourism', 'Cultural Tourism'],
    accommodation: 'Heritage Palace',
    transport: 'Car Rental'
  });

  const [selectedStays, setSelectedStays] = useState<Record<string, string>>({
    Jaipur: 'rambagh-palace-jaipur',
    Jodhpur: 'umaid-bhawan-jodhpur',
    Udaipur: 'taj-lake-palace-udaipur'
  });

  const handleSelectStay = (city: string, stayId: string) => {
    setSelectedStays(prev => ({ ...prev, [city]: stayId }));
    const found = RAJASTHAN_STAYS.find(s => s.id === stayId);
    if (found) {
      addToast(`🏨 Locked "${found.name}" for ${city}!`);
    } else {
      addToast(`🏨 Updated stay preference for ${city}`);
    }
  };

  useEffect(() => {
    const syncWishlist = () => {
      setWishlistItems(getWishlist());
    };
    syncWishlist();
    window.addEventListener('wishlist-updated', syncWishlist);
    return () => window.removeEventListener('wishlist-updated', syncWishlist);
  }, []);

  const changePlannerStep = (step: number) => {
    setPlannerStep(step);
    if (step === 6) {
      addToast("Viewing Saved Wishlist & Hotels");
    } else {
      addToast(`Navigating to Step: ${step}`);
    }
  };

  const toggleAttractionWishlist = (attractionName: string, categoryName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const slug = attractionName.toLowerCase().replace(/\s+/g, '-');
    const details = attractionDetailsInfo[attractionName];
    
    const item: WishlistItem = {
      id: slug,
      title: attractionName,
      type: 'attraction',
      city: form.destinations[0] || 'Jaipur',
      image: details?.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      category: categoryName,
      priceOrFee: details?.fee || 'Free Entrance',
      description: details?.description || `Iconic sightseeing destination in Rajasthan.`
    };

    const res = toggleWishlistItem(item);
    addToast(res.added ? `❤️ Saved "${attractionName}" to Wishlist` : `Removed "${attractionName}" from Wishlist`);
  };

  const handleToggleHotelWishlist = (hotel: RajasthanHotel) => {
    const item: WishlistItem = {
      id: hotel.id,
      title: hotel.name,
      type: 'hotel',
      city: hotel.city,
      image: hotel.image,
      category: hotel.category,
      rating: hotel.rating,
      priceOrFee: hotel.pricePerNight,
      description: hotel.description
    };
    const res = toggleWishlistItem(item);
    addToast(res.added ? `❤️ Saved "${hotel.name}" to Wishlist` : `Removed "${hotel.name}" from Wishlist`);
  };

  const handleRemoveWishlist = (id: string, title: string) => {
    const updated = removeFromWishlist(id);
    setWishlistItems(updated);
    addToast(`Removed "${title}" from Wishlist`);
  };

  const handleAddToItinerary = (city: string, title: string) => {
    if (city && city !== 'Rajasthan' && !form.destinations.includes(city)) {
      setForm(prev => ({ ...prev, destinations: [...prev.destinations, city] }));
      addToast(`Added ${city} & "${title}" to your active trip!`);
    } else {
      addToast(`"${title}" is included in your trip!`);
    }
  };

  const copyWishlistSummary = () => {
    if (wishlistItems.length === 0) return;
    const text = wishlistItems.map(i => `• ${i.title} (${i.city}) - ${i.category}`).join('\n');
    navigator.clipboard.writeText(`👑 My Rajasthan Tourism Wishlist:\n\n${text}`);
    addToast("Copied Wishlist summary to clipboard!");
  };

  const filteredWishlistItems = useMemo(() => {
    if (wishlistFilter === 'all') return wishlistItems;
    if (wishlistFilter === 'culture') return wishlistItems.filter(i => i.type === 'culture' || i.type === 'food');
    return wishlistItems.filter(i => i.type === wishlistFilter);
  }, [wishlistItems, wishlistFilter]);

  const filteredHotels = useMemo(() => {
    if (hotelCityFilter === 'all') return rajasthanHotelsData;
    return rajasthanHotelsData.filter(h => h.city.toLowerCase() === hotelCityFilter.toLowerCase());
  }, [hotelCityFilter]);

  const handleDestChange = (dest: string) => {
    setForm(prev => {
      if (prev.destinations.includes(dest)) {
        return { ...prev, destinations: prev.destinations.filter(d => d !== dest) };
      } else {
        return { ...prev, destinations: [...prev.destinations, dest] };
      }
    });
  };

  const handleCatChange = (cat: string) => {
    setForm(prev => {
      if (prev.categories.includes(cat)) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  // Step 3 Itinerary computation
  const computedItinerary = useMemo(() => {
    const selectedCities = form.destinations;
    const activeCities = selectedCities.length > 0 ? selectedCities : ['Jaipur'];
    const totalDaysNum = parseInt(form.days) || 3;
    
    const daysPerCity = Math.floor(totalDaysNum / activeCities.length);
    let remainderDays = totalDaysNum % activeCities.length;
    
    const cityAllocations: Record<string, number> = {};
    activeCities.forEach((city) => {
      cityAllocations[city] = daysPerCity + (remainderDays > 0 ? 1 : 0);
      remainderDays--;
    });

    const finalItinerary = [];
    let currentDayCounter = 1;

    activeCities.forEach((city) => {
      const daysToGenerate = cityAllocations[city] || 1;
      const dbTemplates = cityDaysDatabase[city] || [
        { title: `${city} Heritage Explorer`, spots: [`${city} Royal Fort`, `${city} Traditional Bazaar`], time: "09:00 AM - 06:00 PM" }
      ];

      for (let d = 0; d < daysToGenerate; d++) {
        if (d < dbTemplates.length) {
          const dayBlueprint = dbTemplates[d];
          finalItinerary.push({
            dayNum: currentDayCounter,
            city: city,
            title: dayBlueprint.title,
            spots: dayBlueprint.spots,
            time: dayBlueprint.time
          });
        } else {
          finalItinerary.push({
            dayNum: currentDayCounter,
            city: city,
            title: `${city} Leisure & Cultural Bazaar Immersion`,
            spots: [`${city} Traditional Crafts Block`, `${city} Food Gastronomy Stalls`],
            time: "10:00 AM - 08:30 PM"
          });
        }
        currentDayCounter++;
      }
    });

    return finalItinerary;
  }, [form.destinations, form.days]);

  const saveItineraryToBackend = async () => {
    addToast("Saving itinerary to Supabase backend...");
    const res = await backendApi.saveItinerary({
      destinations: form.destinations,
      days: form.days,
      people: form.people,
      accommodation: form.accommodation,
      transport: form.transport,
      itinerary: computedItinerary,
      created_at: new Date().toISOString()
    });
    if (res.success) {
      addToast("Itinerary synced with Supabase backend successfully!");
    } else {
      addToast("Itinerary saved locally.");
    }
  };

  const copyItineraryToClipboard = () => {
    let formatted = "👑 RAJASTHAN ROYAL EXPLORER PLAN 👑\n\n";
    computedItinerary.forEach(day => {
      formatted += `Day ${day.dayNum} - ${day.city}: ${day.title}\nSpots: ${day.spots.join(', ')}\n\n`;
    });
    
    navigator.clipboard.writeText(formatted).then(() => {
      addToast("Itinerary copied to clipboard successfully!");
    });
  };

  const printItinerary = () => {
    window.print();
  };

  const filteredAttractionsData = useMemo(() => {
    const currentDestinations = form.destinations.length > 0 ? form.destinations : ['Jaipur'];
    const validSpots = new Set<string>();
    currentDestinations.forEach(city => {
      const days = cityDaysDatabase[city] || [];
      days.forEach(day => {
        day.spots.forEach((spot: string) => validSpots.add(spot));
      });
    });

    const result: Record<string, string[]> = {};
    Object.entries(attractionsData).forEach(([category, items]) => {
      const filteredItems = items.filter(item => validSpots.has(item) || category === 'Famous Food');
      if (filteredItems.length > 0) {
        result[category] = filteredItems;
      }
    });
    return result;
  }, [form.destinations]);

  // Budget
  const [budgetInput, setBudgetInput] = useState(45000);
  const [budgetPeople, setBudgetPeople] = useState(3);
  const [budgetDays, setBudgetDays] = useState(5);
  const [budgetSortAscending, setBudgetSortAscending] = useState(true);

  const sortedBudgetRows = useMemo(() => {
    return [...budgetRows].sort((a, b) => {
      const valA = budgetInput * a.multiplier;
      const valB = budgetInput * b.multiplier;
      return budgetSortAscending ? valA - valB : valB - valA;
    });
  }, [budgetInput, budgetSortAscending]);

  const calculatedTotal = budgetPeople * budgetDays * 2200;
  const budgetMeterPercent = Math.min(Math.max((calculatedTotal / budgetInput) * 100, 15), 100);
  const budgetMeterStatus = budgetMeterPercent < 55 ? "Under Budget Target" : budgetMeterPercent < 85 ? "Approaching Limit" : "Target Exceeded!";
  const budgetMeterClass = budgetMeterPercent < 55 ? "bg-emerald-500" : budgetMeterPercent < 85 ? "bg-amber-500" : "bg-rose-600";
  const budgetMeterTextClass = budgetMeterPercent < 55 ? "text-emerald-400" : budgetMeterPercent < 85 ? "text-amber-400" : "text-rose-400";

  // Weather
  const [selectedWeatherCity, setSelectedWeatherCity] = useState('Jaipur');
  const [liveWeather, setLiveWeather] = useState({ temp: '32', rain: '10', wind: '12' });

  // Offline Storage State
  const [isOfflineSaved, setIsOfflineSaved] = useState<boolean>(() => {
    return localStorage.getItem('rajasthan_offline_saved_active') === 'true';
  });
  const [lastOfflineSavedAt, setLastOfflineSavedAt] = useState<string | null>(() => {
    return localStorage.getItem('rajasthan_offline_saved_timestamp');
  });

  // Restore saved offline plan on initial mount if saved
  useEffect(() => {
    if (isOfflineSaved) {
      try {
        const storedData = localStorage.getItem('rajasthan_offline_trip_plan');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.form) setForm(parsed.form);
          if (parsed.budgetInput) setBudgetInput(parsed.budgetInput);
          if (parsed.budgetPeople) setBudgetPeople(parsed.budgetPeople);
          if (parsed.budgetDays) setBudgetDays(parsed.budgetDays);
        }
      } catch (e) {
        console.error('Failed to restore offline trip plan:', e);
      }
    }
  }, []);

  const handleToggleOfflineSave = () => {
    if (isOfflineSaved) {
      setIsOfflineSaved(false);
      localStorage.removeItem('rajasthan_offline_saved_active');
      localStorage.removeItem('rajasthan_offline_trip_plan');
      localStorage.removeItem('rajasthan_offline_saved_timestamp');
      setLastOfflineSavedAt(null);
      addToast("Offline mode disabled. Local storage trip plan removed.");
    } else {
      const now = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
      const dataToSave = {
        form,
        computedItinerary,
        budgetInput,
        budgetPeople,
        budgetDays,
        savedAt: now
      };
      try {
        localStorage.setItem('rajasthan_offline_saved_active', 'true');
        localStorage.setItem('rajasthan_offline_trip_plan', JSON.stringify(dataToSave));
        localStorage.setItem('rajasthan_offline_saved_timestamp', now);
        setIsOfflineSaved(true);
        setLastOfflineSavedAt(now);
        addToast("⚡ Trip Plan Saved for Offline Access! Access your plan anytime without internet.");
      } catch (e) {
        addToast("Failed to save for offline access.");
      }
    }
  };

  // Auto-sync offline plan when trip preferences or budget change
  useEffect(() => {
    if (isOfflineSaved) {
      const now = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
      const dataToSave = {
        form,
        computedItinerary,
        budgetInput,
        budgetPeople,
        budgetDays,
        savedAt: now
      };
      try {
        localStorage.setItem('rajasthan_offline_trip_plan', JSON.stringify(dataToSave));
        localStorage.setItem('rajasthan_offline_saved_timestamp', now);
        setLastOfflineSavedAt(now);
      } catch (e) {
        console.error('Auto sync offline plan failed:', e);
      }
    }
  }, [form, computedItinerary, budgetInput, budgetPeople, budgetDays, isOfflineSaved]);

  useEffect(() => {
    const databaseMetrics = weatherDatabase[selectedWeatherCity];
    if (databaseMetrics) {
      setLiveWeather({
        temp: databaseMetrics.temp,
        rain: databaseMetrics.rain,
        wind: databaseMetrics.wind
      });
    }
  }, [selectedWeatherCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      
      {/* Offline Storage Sync Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 mb-6 shadow-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl transition-colors ${isOfflineSaved ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-400' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
            {isOfflineSaved ? <WifiOff className="w-5 h-5 animate-pulse" /> : <HardDriveDownload className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold tracking-tight">Save for Offline Access</h4>
              {isOfflineSaved ? (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" /> Active & Saved
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                  Online Only
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {isOfflineSaved 
                ? `Itinerary, checklist & budget saved locally. Last synced: ${lastOfflineSavedAt || 'Just now'}`
                : 'Toggle to store your trip plan & packing checklist in local browser storage for offline access without internet.'
              }
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleOfflineSave}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer shadow-sm ${
            isOfflineSaved
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-900/50'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50'
          }`}
        >
          {isOfflineSaved ? (
            <>
              <CheckCircle className="w-4 h-4" /> Offline Saved (Click to Remove)
            </>
          ) : (
            <>
              <HardDriveDownload className="w-4 h-4" /> Save for Offline
            </>
          )}
        </button>
      </div>
      
      {/* Wizard Step Navigation */}
      <div className="flex justify-center mb-8 border-b border-slate-200 pb-4 overflow-x-auto space-x-2 sm:space-x-8">
        {[1,2,3,4,5,6].map(step => (
          <button 
            key={step} 
            onClick={() => changePlannerStep(step)} 
            className={`pb-2 text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap transition-colors flex items-center gap-1.5 ${plannerStep === step ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {step === 1 ? t('step1') : step === 2 ? t('step2') : step === 3 ? t('step3') : step === 4 ? t('step4') : step === 5 ? 'Smart Checklist' : (
              <span className="flex items-center gap-1">
                <Heart className={`w-3.5 h-3.5 ${wishlistItems.length > 0 ? 'text-rose-500 fill-current' : ''}`} /> 
                Wishlist ({wishlistItems.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* STEP 1: TRAVEL PREFERENCES */}
      {plannerStep === 1 && (
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl space-y-8 animate-in slide-in-from-right-8 duration-500">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" /> {t('prefWhere')}
            </h3>
            <p className="text-slate-500 text-xs mb-3">Choose any combinations of destinations. Proximity paths will build themselves!</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {destinationsList.map(dest => (
                <label key={dest} className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 hover:bg-slate-100 transition duration-200">
                  <input type="checkbox" checked={form.destinations.includes(dest)} onChange={() => handleDestChange(dest)} className="accent-indigo-600 w-4 h-4" />
                  <span className="text-xs text-slate-700 font-medium">{dest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Live Trip Summary & Distance Logistics Panel */}
          <TripSummary 
            destinations={form.destinations}
            onDestinationsChange={(newDests) => setForm(prev => ({ ...prev, destinations: newDests }))}
            title="Selected Trip Summary & Route Logistics"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center"><CalendarDays className="mr-2 w-5 h-5 text-indigo-600" /> {t('prefDays')}</h3>
              <select value={form.days} onChange={e => setForm({...form, days: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-700 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                {['1 Day','3 Days','5 Days','7 Days','10 Days','15 Days'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center"><Users className="mr-2 w-5 h-5 text-indigo-600" /> {t('prefPeople')}</h3>
              <select value={form.people} onChange={e => setForm({...form, people: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-700 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                {['Solo','Couple','Family','Friends Group','Corporate Group'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center justify-between">
                <span className="flex items-center"><Hotel className="mr-2 w-5 h-5 text-indigo-600" /> {t('prefHotel')}</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">Sorted Low to High</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Budget', badge: '₹ (Low)' },
                  { name: 'Standard', badge: '₹₹ (Mid)' },
                  { name: 'Luxury', badge: '₹₹₹ (High)' },
                  { name: 'Heritage Palace', badge: '₹₹₹₹ (Ultra)' }
                ].map(acc => (
                  <label key={acc.name} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs cursor-pointer hover:border-indigo-300 transition">
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="accommodation" value={acc.name} checked={form.accommodation === acc.name} onChange={() => setForm({...form, accommodation: acc.name})} className="accent-indigo-600 w-4 h-4" />
                      <span className="text-slate-700 font-medium">{acc.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{acc.badge}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center"><Sparkles className="mr-2 w-5 h-5 text-indigo-600" /> {t('prefCategories')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {['Historical Tourism','Religious Tourism','Wildlife Tourism','Luxury Tourism','Adventure Tourism','Village Tourism','Cultural Tourism','Photography Tourism','Honeymoon Tourism','Food Tourism'].map(cat => (
                <label key={cat} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs cursor-pointer hover:border-indigo-300 transition">
                  <input type="checkbox" checked={form.categories.includes(cat)} onChange={() => handleCatChange(cat)} className="accent-indigo-600 w-4 h-4" />
                  <span className="text-slate-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center"><PlaneTakeoff className="mr-2 w-5 h-5 text-indigo-600" /> {t('prefTransport')}</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">Sorted Low to High</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'Bus', badge: '₹ Low' },
                { name: 'Train', badge: '₹₹ Low-Mid' },
                { name: 'Self Drive', badge: '₹₹ Mid' },
                { name: 'Car Rental', badge: '₹₹₹ High' },
                { name: 'Flight', badge: '₹₹₹₹ Max' }
              ].map(trans => (
                <label key={trans.name} className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs cursor-pointer hover:border-indigo-300 transition">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="transport" value={trans.name} checked={form.transport === trans.name} onChange={() => setForm({...form, transport: trans.name})} className="accent-indigo-600 w-4 h-4" />
                    <span className="text-slate-700 font-medium">{trans.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono pl-6">{trans.badge}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Suggested Heritage Stays & Haveli Properties */}
          <SuggestedStays
            destinations={form.destinations}
            selectedStays={selectedStays}
            onSelectStay={handleSelectStay}
          />

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button onClick={() => changePlannerStep(2)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center">
              {t('btnNextPlaces')} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SIGHTSEEING SELECTION */}
      {plannerStep === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">{t('currentPrefFilter')}</p>
              <p className="text-sm text-slate-700">
                Destinations Chosen: <span className="font-semibold text-indigo-600">{form.destinations.join(', ') || 'Jaipur'}</span>
              </p>
            </div>
            <button onClick={() => changePlannerStep(3)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-md hover:-translate-y-0.5 transition-all">
              {t('btnGenItinerary')} <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-xs text-indigo-800 flex items-start gap-3 shadow-sm">
            <Info className="text-indigo-600 w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <strong>💡 Secret Guides:</strong> Click on any attraction listed below to read an immersive synopsis, exact timing directories, and localized recommendations.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(filteredAttractionsData).length > 0 ? (
              Object.entries(filteredAttractionsData).map(([category, items]) => (
                <div key={category} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-md text-slate-900 border-b border-slate-100 pb-2 mb-3 flex justify-between items-center">
                    <span>{category}</span>
                    <span className="text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold tracking-wider uppercase">Info Included</span>
                  </h4>
                  <ul className="space-y-2">
                    {(items as string[]).map((item: string) => {
                      const slug = item.toLowerCase().replace(/\s+/g, '-');
                      const isFav = isWishlisted(slug);
                      return (
                        <li key={item} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-xs flex items-center justify-between transition-all duration-200 group">
                          <span onClick={() => openAttractionDetail(item, category)} className="text-slate-700 group-hover:text-indigo-600 flex items-center cursor-pointer font-medium truncate pr-1">
                            <MapPin className="text-indigo-500 mr-1.5 w-3.5 h-3.5 shrink-0" />
                            {item}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={(e) => toggleAttractionWishlist(item, category, e)}
                              className={`p-1 rounded-md transition ${
                                isFav 
                                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                                  : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                              }`}
                              title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
                            </button>

                            <button onClick={() => openAttractionDetail(item, category)} className="text-[9px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300 font-medium flex items-center group-hover:bg-indigo-100 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors">
                              <Info className="mr-1 w-3 h-3" />Explore
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                No major tracked sightseeing spots in the current selected route.
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: CUSTOMIZABLE SMART ITINERARY */}
      {plannerStep === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1 flex items-center"><Sparkles className="mr-2 w-5 h-5 text-indigo-600" /> {t('itineraryTitle')}</h3>
              <p className="text-xs text-slate-500">
                Customized multi-destination itinerary created for <span className="text-indigo-600 font-bold">{form.destinations.join(' ➔ ') || 'Jaipur'}</span> spanning <span className="text-slate-900 underline font-semibold">{form.days}</span>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={handleToggleOfflineSave} 
                className={`${isOfflineSaved ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-800 hover:bg-slate-900 text-slate-100'} font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer`}
              >
                <WifiOff className="w-4 h-4 text-emerald-400" /> {isOfflineSaved ? 'Saved Offline ⚡' : 'Save for Offline'}
              </button>
              <button onClick={saveItineraryToBackend} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer">
                <Database className="w-4 h-4" /> Save to Backend
              </button>
              <button onClick={printItinerary} className="bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors shadow-sm cursor-pointer">
                <Printer className="text-slate-500 w-4 h-4" /> Print
              </button>
              <button onClick={copyItineraryToClipboard} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors shadow-sm cursor-pointer">
                <Copy className="w-4 h-4" /> Copy Plan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {computedItinerary.map((day) => (
                <div key={day.dayNum} className="bg-white p-5 rounded-xl border border-slate-200 relative shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-xl"></div>
                  <div className="flex flex-wrap justify-between items-start mb-3 pl-2">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">Day {day.dayNum}</span>
                      <h4 className="text-lg font-semibold text-slate-900">{day.city} — {day.title}</h4>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200 mt-1 sm:mt-0 flex items-center"><Clock className="mr-1 w-3 h-3 text-indigo-600" /> {day.time}</span>
                  </div>
                  
                  <p className="text-xs text-slate-500 mb-3 font-medium pl-2">Recommended activities based on travel categories and seasons:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {day.spots.map((spot) => (
                      <div key={spot} onClick={() => openAttractionDetail(spot, day.city + ' Sightseeing')} className="bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-100 cursor-pointer text-xs text-slate-700 flex items-center justify-between group transition">
                        <span className="flex items-center gap-2">
                          <MapPin className="text-indigo-400 group-hover:text-indigo-600 transition w-4 h-4" /> 
                          {spot}
                        </span>
                        <ChevronRight className="text-slate-400 group-hover:text-indigo-600 w-4 h-4 transform group-hover:translate-x-1 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <TripSummary 
                destinations={form.destinations}
                onDestinationsChange={(newDests) => setForm(prev => ({ ...prev, destinations: newDests }))}
                title="Route Summary & Time Estimates"
                showQuickAdd={false}
              />

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-semibold text-slate-900 flex items-center">
                    <Hotel className="mr-2 w-4 h-4 text-indigo-600" /> Selected Heritage Stays
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                    Curated Palaces
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {(form.destinations.length > 0 ? form.destinations : ['Jaipur']).map((city) => {
                    const lockedId = selectedStays[city];
                    const property = RAJASTHAN_STAYS.find(s => s.id === lockedId) || RAJASTHAN_STAYS.find(s => s.city.toLowerCase() === city.toLowerCase());
                    
                    return (
                      <div key={city} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
                        <img 
                          src={property?.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200'} 
                          alt={city}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="font-extrabold text-slate-900 text-xs truncate">
                              {property?.name || `${city} Heritage Stay`}
                            </p>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                              ₹{(property?.pricePerNightINR || 8500).toLocaleString()}/night
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                            📍 {city} • {property?.type || form.accommodation} ⭐ {property?.rating || 4.8}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button onClick={() => changePlannerStep(4)} className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                Proceed to Budgets & Weather <Calculator className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: BUDGETS & WEATHER METRICS */}
      {plannerStep === 4 && (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
          <BudgetAnalytics
            totalBudget={budgetInput}
            daysCount={budgetDays}
            peopleCount={budgetPeople}
            destinations={form.destinations.length > 0 ? form.destinations : ['Jaipur', 'Jodhpur']}
            accommodationType={form.accommodation}
            transportType={form.transport}
            onBudgetChange={(newBudget) => setBudgetInput(newBudget)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 flex items-center"><Coins className="mr-2 w-5 h-5 text-indigo-600" /> Smart Budget Calculator</h4>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Target Budget Limit (₹)</label>
                <input type="number" value={budgetInput} onChange={e => setBudgetInput(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Total Travelers</label>
                  <input type="number" value={budgetPeople} onChange={e => setBudgetPeople(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Travel Days</label>
                  <input type="number" value={budgetDays} onChange={e => setBudgetDays(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase tracking-wider">Budget Status Meter</span>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className={`${budgetMeterClass === 'bg-emerald-500' ? 'bg-emerald-500' : budgetMeterClass === 'bg-amber-500' ? 'bg-amber-500' : 'bg-rose-500'} h-full transition-all duration-500`} style={{ width: `${budgetMeterPercent}%` }}></div>
                </div>
                <div className="flex justify-between text-[11px] mt-1.5">
                  <span className={`font-bold uppercase tracking-wider ${budgetMeterTextClass === 'text-emerald-400' ? 'text-emerald-600' : budgetMeterTextClass === 'text-amber-400' ? 'text-amber-600' : 'text-rose-600'}`}>{budgetMeterStatus}</span>
                  <span className="text-slate-500 font-mono font-medium">Est: ₹{calculatedTotal}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h4 className="text-lg font-semibold text-slate-900 flex items-center">
                  <ChartPie className="mr-2 w-5 h-5 text-indigo-600" /> Dynamic Expense Breakdown
                </h4>
                <button 
                  onClick={() => setBudgetSortAscending(!budgetSortAscending)}
                  className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <Coins className="w-3.5 h-3.5" />
                  Sorted: {budgetSortAscending ? 'Low to High ↑' : 'High to Low ↓'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-widest text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">Expense Category</th>
                      <th className="p-3 font-semibold">Projected Ratio</th>
                      <th className="p-3 text-right font-semibold">Projected Value (Low → High)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedBudgetRows.map((row) => (
                      <tr key={row.cat} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-slate-700 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                          {row.cat}
                        </td>
                        <td className="p-3 text-slate-500 font-mono">{row.ratio}</td>
                        <td className="p-3 text-right font-mono text-indigo-700 font-bold">₹{Math.round(budgetInput * row.multiplier)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t border-slate-200">
                      <td className="p-3 text-slate-900 text-sm" colSpan={2}>TOTAL TARGET SPECIFIED</td>
                      <td className="p-3 text-right font-mono text-indigo-700 text-sm">₹{budgetInput}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Pre-set Packages (Sorted Low to High) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-md font-bold text-slate-900 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" /> Recommended Tour Packages (Arranged Low to High)
                </h4>
                <p className="text-xs text-slate-500">Select any pre-calculated budget package sorted directly from low to high price.</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                Low → High Pricing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  tier: '1. Backpacker / Pocket Friendly',
                  pricePerDay: 1500,
                  totalPrice: 15000,
                  badge: 'Lowest Cost',
                  badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  desc: 'Hostels & Budget Stays, Express Busses, Local Dhaba Dining & Historic Fort Walkthroughs.'
                },
                {
                  tier: '2. Standard Explorer Caravan',
                  pricePerDay: 3500,
                  totalPrice: 35000,
                  badge: 'Mid Value',
                  badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                  desc: '3-Star Heritage Hotels, AC Train/Cab, Traditional Thali Dining & Guided Monument Safaris.'
                },
                {
                  tier: '3. Ultra Royal Maharaja Heritage',
                  pricePerDay: 8500,
                  totalPrice: 85000,
                  badge: 'Premium Luxury',
                  badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
                  desc: '5-Star Fort Palaces, Chauffeur Car, Royal Courtyard Banquets & Desert Glamping Safaris.'
                }
              ].map((pkg) => (
                <div 
                  key={pkg.tier}
                  onClick={() => setBudgetInput(pkg.totalPrice)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md space-y-3 ${
                    budgetInput === pkg.totalPrice 
                      ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">₹{pkg.pricePerDay}/day</span>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{pkg.tier}</h5>
                    <p className="text-xl font-extrabold text-indigo-600 font-mono mt-1">₹{pkg.totalPrice.toLocaleString()}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <WeatherComponent initialCity={form.destinations[0] || 'Jaipur'} />
        </div>
      )}

      {/* STEP 5: INTELLIGENT PACKING CHECKLIST */}
      {plannerStep === 5 && (
        <div className="animate-in slide-in-from-right-8 duration-500">
          <PackingChecklist 
            initialDuration={form.days} 
            initialCities={form.destinations} 
            addToast={addToast} 
          />
        </div>
      )}

      {/* STEP 6: SAVED WISHLIST & PALACE HOTELS */}
      {plannerStep === 6 && (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
          
          {/* Wishlist Header Banner */}
          <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Saved Travel Wishlist
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Your Saved Heritage Attractions & Stays</h3>
              <p className="text-xs text-slate-500 mt-1">
                Review, manage, and add your favorite Rajasthan destinations and palace hotels directly into your active itinerary.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {wishlistItems.length > 0 && (
                <>
                  <button
                    onClick={copyWishlistSummary}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" /> Share Wishlist
                  </button>
                  <button
                    onClick={() => {
                      clearWishlist();
                      setWishlistItems([]);
                      addToast("Cleared all saved wishlist items");
                    }}
                    className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" /> Clear All
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Wishlist Items List OR Empty State */}
          {wishlistItems.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500 shadow-xs">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">Your Wishlist is Currently Empty</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Explore Rajasthan's iconic forts, lakes, temples, and luxury heritage hotels. Click the heart icon on any item to save it for your trip!
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => changePlannerStep(2)}
                  className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-xs hover:bg-indigo-700 transition cursor-pointer"
                >
                  Browse Attractions (Step 2)
                </button>
                <button
                  onClick={() => setHotelCityFilter('all')}
                  className="bg-slate-100 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-xs hover:bg-slate-200 transition cursor-pointer"
                >
                  Explore Palace Hotels Below
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {[
                  { id: 'all', label: `All Saved (${wishlistItems.length})` },
                  { id: 'attraction', label: `Attractions (${wishlistItems.filter(i => i.type === 'attraction').length})` },
                  { id: 'hotel', label: `Palace & Hotel Stays (${wishlistItems.filter(i => i.type === 'hotel').length})` },
                  { id: 'culture', label: `Culture & Food (${wishlistItems.filter(i => i.type === 'culture' || i.type === 'food').length})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setWishlistFilter(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      wishlistFilter === tab.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Wishlist Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWishlistItems.map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                        
                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                          {item.category}
                        </span>

                        <button
                          onClick={() => handleRemoveWishlist(item.id, item.title)}
                          className="absolute top-3 right-3 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition shadow-xs cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] font-medium text-slate-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-300" /> {item.city}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        {item.priceOrFee && (
                          <div className="pt-2 text-xs font-semibold text-indigo-600">
                            Fee/Price: {item.priceOrFee}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openAttractionDetail(item.title, item.category)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5" /> View Details
                      </button>

                      <button
                        onClick={() => handleAddToItinerary(item.city, item.title)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to Trip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curated Palace & Boutique Hotels Explorer Section */}
          <div className="pt-8 space-y-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                  <Hotel className="w-3.5 h-3.5" /> Recommended Palace & Boutique Stays
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Top Hotels & Heritage Stays in Rajasthan</h3>
                <p className="text-xs text-slate-500">Save luxury heritage stays, boutique havelis, and desert glamping tents directly to your wishlist.</p>
              </div>

              {/* Hotel City Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['all', 'Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Ranthambore'].map(city => (
                  <button
                    key={city}
                    onClick={() => setHotelCityFilter(city)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      hotelCityFilter === city
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {city === 'all' ? 'All Cities' : city}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => {
                const isFav = isWishlisted(hotel.id);
                return (
                  <div key={hotel.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                        
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
                          {hotel.category}
                        </span>

                        <button
                          onClick={() => handleToggleHotelWishlist(hotel)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition cursor-pointer ${
                            isFav 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-white/30 text-white hover:bg-white hover:text-rose-500'
                          }`}
                          title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-[11px] font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-300" /> {hotel.city}
                          </span>
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {hotel.rating} ({hotel.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-slate-900 text-base">{hotel.name}</h4>
                          <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg shrink-0">
                            {hotel.pricePerNight}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {hotel.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {hotel.amenities.slice(0, 3).map(am => (
                            <span key={am} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                              ✓ {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 truncate max-w-[170px]">
                        📍 {hotel.address}
                      </span>

                      <button
                        onClick={() => handleToggleHotelWishlist(hotel)}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
                          isFav
                            ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
                        {isFav ? 'Saved' : 'Save Hotel'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

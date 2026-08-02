import React, { useState, useEffect, useMemo } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Circle,
  Sun,
  Snowflake,
  CloudRain,
  Compass,
  MapPin,
  Plus,
  Trash2,
  Copy,
  Printer,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Shirt,
  Smartphone,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { PackingItem } from '../types';

interface PackingChecklistProps {
  initialDuration?: string;
  initialCities?: string[];
  initialSeason?: 'summer' | 'winter' | 'monsoon';
  addToast?: (msg: string) => void;
  compact?: boolean;
}

const ALL_CITIES = ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Ranthambore', 'Pushkar', 'Bikaner', 'Mount Abu'];

export default function PackingChecklist({
  initialDuration = '5 Days',
  initialCities = ['Jaipur', 'Jaisalmer'],
  initialSeason = 'winter',
  addToast,
  compact = false
}: PackingChecklistProps) {
  // Parse initial duration number
  const parsedDays = parseInt(initialDuration) || 5;

  const [days, setDays] = useState<number>(parsedDays);
  const [season, setSeason] = useState<'summer' | 'winter' | 'monsoon'>(initialSeason);
  const [selectedCities, setSelectedCities] = useState<string[]>(initialCities);
  const [filterMode, setFilterMode] = useState<'all' | 'unpacked' | 'packed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Clothing & Wearables');
  const [newItemQty, setNewItemQty] = useState('1');

  // Load items from localStorage or generate defaults
  const [items, setItems] = useState<PackingItem[]>([]);

  // Generate dynamic base items based on days, season, and cities
  const generateSuggestedItems = (numDays: number, weather: string, cities: string[]): PackingItem[] => {
    const list: PackingItem[] = [];

    const isDesert = cities.some(c => ['Jaisalmer', 'Jodhpur', 'Bikaner'].includes(c));
    const isWildlife = cities.includes('Ranthambore');
    const isHillStation = cities.includes('Mount Abu');
    const isLakes = cities.includes('Udaipur') || cities.includes('Pushkar');

    // 1. CLOTHING & WEARABLES
    list.push(
      { id: 'c1', name: 'Light Breathable Cotton Tops / T-Shirts', category: 'Clothing & Wearables', quantity: `${Math.min(numDays + 1, 9)} tops`, packed: false, essential: true },
      { id: 'c2', name: 'Comfortable Trousers / Linen Pants', category: 'Clothing & Wearables', quantity: `${Math.max(2, Math.ceil(numDays / 2))} pairs`, packed: false, essential: true },
      { id: 'c3', name: 'Underwear & Moisture-Wicking Socks', category: 'Clothing & Wearables', quantity: `${numDays + 2} pairs`, packed: false, essential: true },
      { id: 'c4', name: 'Cushioned Walking Shoes / Slip-ons', category: 'Clothing & Wearables', quantity: '1 pair', packed: false, essential: true },
      { id: 'c5', name: 'Traditional Ethnic Wear (Kurta/Saree for Palaces)', category: 'Clothing & Wearables', quantity: '1-2 sets', packed: false, essential: false }
    );

    if (weather === 'winter') {
      list.push(
        { id: 'cw1', name: 'Heavy Warm Jacket / Down Coat for Desert Night', category: 'Clothing & Wearables', quantity: '1 jacket', packed: false, essential: true, notes: 'Desert temperatures drop below 7°C at night' },
        { id: 'cw2', name: 'Thermal Inners & Woolen Socks', category: 'Clothing & Wearables', quantity: '2 sets', packed: false, essential: true },
        { id: 'cw3', name: 'Woolen Shawl / Muffler & Beanie', category: 'Clothing & Wearables', quantity: '1 set', packed: false, essential: false }
      );
    } else if (weather === 'summer') {
      list.push(
        { id: 'cs1', name: 'Extra Loose Linen/Cotton Shirts', category: 'Clothing & Wearables', quantity: '2 shirts', packed: false, essential: true },
        { id: 'cs2', name: 'Open Sandal / Breathable Footwear', category: 'Clothing & Wearables', quantity: '1 pair', packed: false, essential: false }
      );
    } else if (weather === 'monsoon') {
      list.push(
        { id: 'cm1', name: 'Quick-Dry Nylon Pants & Shorts', category: 'Clothing & Wearables', quantity: '3 pairs', packed: false, essential: true },
        { id: 'cm2', name: 'Rain Jacket / Compact Waterproof Poncho', category: 'Clothing & Wearables', quantity: '1 piece', packed: false, essential: true },
        { id: 'cm3', name: 'Anti-Slip Waterproof Footwear', category: 'Clothing & Wearables', quantity: '1 pair', packed: false, essential: true, notes: 'Ideal for slippery fort marble and lake ghats' }
      );
    }

    // 2. SUN & HYDRATION PROTECTION
    list.push(
      { id: 's1', name: 'UV 400 Polarized Sunglasses', category: 'Sun & Hydration', quantity: '1 pair', packed: false, essential: true },
      { id: 's2', name: 'Broad Spectrum SPF 50+ Sunscreen', category: 'Sun & Hydration', quantity: '1 tube', packed: false, essential: true },
      { id: 's3', name: 'Wide-Brim Hat / Cotton Turban Scarf', category: 'Sun & Hydration', quantity: '1-2 scarves', packed: false, essential: true, notes: 'Essential for protecting head during open fort walks' },
      { id: 's4', name: 'Electrolyte ORSL Hydration Powder', category: 'Sun & Hydration', quantity: `${numDays * 2} sachets`, packed: false, essential: true },
      { id: 's5', name: 'Insulated Stainless Water Flask (1L)', category: 'Sun & Hydration', quantity: '1 bottle', packed: false, essential: true }
    );

    // 3. DESERT & SAFARI ESSENTIALS
    if (isDesert) {
      list.push(
        { id: 'd1', name: 'Dust Protection Bandana / Desert Scarf', category: 'Desert & Safari', quantity: '2 scarves', packed: false, essential: true, notes: 'Protects face from sand during camel safaris' },
        { id: 'd2', name: 'High-Ankle Desert Boots / Sturdy Shoes', category: 'Desert & Safari', quantity: '1 pair', packed: false, essential: true },
        { id: 'd3', name: 'Lip Balm with SPF & Heavy Moisturizer', category: 'Desert & Safari', quantity: '1 tube each', packed: false, essential: true },
        { id: 'd4', name: 'LED Headlamp / Flashlight for Sand Dunes', category: 'Desert & Safari', quantity: '1 torch', packed: false, essential: false, notes: 'Useful for night camping in Sam Sand Dunes' }
      );
    }

    if (isWildlife) {
      list.push(
        { id: 'w1', name: 'Neutral Earth-Tone Clothing (Khaki/Green)', category: 'Desert & Safari', quantity: '2 outfits', packed: false, essential: true, notes: 'Required for Tiger Safari in Ranthambore Park' },
        { id: 'w2', name: 'Compact Binoculars (8x42 or 10x42)', category: 'Desert & Safari', quantity: '1 pair', packed: false, essential: false },
        { id: 'w3', name: 'DEET Mosquito & Insect Repellent Spray', category: 'Desert & Safari', quantity: '1 bottle', packed: false, essential: true }
      );
    }

    if (isHillStation) {
      list.push(
        { id: 'h1', name: 'Light Windbreaker / Sweater for Mount Abu', category: 'Clothing & Wearables', quantity: '1 piece', packed: false, essential: true }
      );
    }

    if (isLakes) {
      list.push(
        { id: 'l1', name: 'Modest Cover-up for Lake Ghats & Temples', category: 'Clothing & Wearables', quantity: '1 scarf/shawl', packed: false, essential: true }
      );
    }

    // 4. HEALTH, PHARMACY & HYGIENE
    list.push(
      { id: 'ph1', name: 'Digestive Enzymes & Antacid (for Thali food)', category: 'Health & Hygiene', quantity: '1 strip', packed: false, essential: true },
      { id: 'ph2', name: 'Motion Sickness Tablets (for winding hill roads)', category: 'Health & Hygiene', quantity: '1 strip', packed: false, essential: false },
      { id: 'ph3', name: 'Antibacterial Wet Wipes & Hand Sanitizer', category: 'Health & Hygiene', quantity: '2 packs', packed: false, essential: true },
      { id: 'ph4', name: 'Blister Relief Cushions & Band-Aids', category: 'Health & Hygiene', quantity: '1 pack', packed: false, essential: true },
      { id: 'ph5', name: 'Personal Daily Medications & First Aid', category: 'Health & Hygiene', quantity: 'As required', packed: false, essential: true }
    );

    // 5. DOCUMENTS & ELECTRONICS
    list.push(
      { id: 'de1', name: 'Original Govt Photo ID (Aadhaar/Passport)', category: 'Documents & Tech', quantity: 'Original + 2 copies', packed: false, essential: true },
      { id: 'de2', name: 'Printed Fort Booking Passes & Hotel Vouchers', category: 'Documents & Tech', quantity: 'Digital & Physical', packed: false, essential: true },
      { id: 'de3', name: 'Heavy-Duty Power Bank (20,000 mAh)', category: 'Documents & Tech', quantity: '1 unit', packed: false, essential: true, notes: 'Long sightseeing days require phone recharges' },
      { id: 'de4', name: 'Camera, Extra Batteries & Memory Cards', category: 'Documents & Tech', quantity: '1 set', packed: false, essential: false },
      { id: 'de5', name: 'Universal Travel Adapter / Multi-plug', category: 'Documents & Tech', quantity: '1 plug', packed: false, essential: true }
    );

    return list;
  };

  // Synchronize generated list on configuration changes unless localStorage overrides
  useEffect(() => {
    const saved = localStorage.getItem('rajasthan_packing_checklist_state_v1');
    if (saved) {
      try {
        const parsed: PackingItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved checklist:", e);
      }
    }
    // Default initial generation
    const generated = generateSuggestedItems(days, season, selectedCities);
    setItems(generated);
  }, []);

  // Save to localStorage whenever items change
  const saveItemsState = (updatedItems: PackingItem[]) => {
    setItems(updatedItems);
    try {
      localStorage.setItem('rajasthan_packing_checklist_state_v1', JSON.stringify(updatedItems));
    } catch (e) {
      console.error("Error saving packing checklist state:", e);
    }
  };

  const handleRegenerate = () => {
    const generated = generateSuggestedItems(days, season, selectedCities);
    saveItemsState(generated);
    if (addToast) addToast(`Regenerated packing checklist for ${days} days in ${season.toUpperCase()} season!`);
  };

  const handleTogglePacked = (id: string) => {
    const updated = items.map(item => item.id === id ? { ...item, packed: !item.packed } : item);
    saveItemsState(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: `custom_${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQty.trim() || '1 unit',
      packed: false,
      addedByUser: true
    };

    saveItemsState([...items, newItem]);
    setNewItemName('');
    if (addToast) addToast(`Added "${newItem.name}" to packing list!`);
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find(i => i.id === id);
    const updated = items.filter(item => item.id !== id);
    saveItemsState(updated);
    if (addToast && itemToDelete) addToast(`Removed "${itemToDelete.name}"`);
  };

  const handleCityToggle = (city: string) => {
    setSelectedCities(prev => {
      if (prev.includes(city)) {
        if (prev.length === 1) return prev; // Keep at least 1
        return prev.filter(c => c !== city);
      } else {
        return [...prev, city];
      }
    });
  };

  // Calculations
  const packedCount = useMemo(() => items.filter(i => i.packed).length, [items]);
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filterMode === 'packed' && !item.packed) return false;
      if (filterMode === 'unpacked' && item.packed) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [items, filterMode, selectedCategory]);

  const categoriesList = useMemo(() => {
    const set = new Set(items.map(i => i.category));
    return Array.from(set);
  }, [items]);

  const copyToClipboard = () => {
    const text = items.map(i => `[${i.packed ? 'X' : ' '}] ${i.name} (${i.quantity || '1'}) - ${i.category}`).join('\n');
    navigator.clipboard.writeText(`👑 Rajasthan Trip Packing Checklist (${days} Days - ${season.toUpperCase()}):\n\n${text}`);
    if (addToast) addToast("Copied packing checklist to clipboard!");
  };

  const printList = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Smart Travel Assistant
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rajasthan Smart Packing Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automatically tailored packing recommendations based on your itinerary length, desert climate, and specific city activities.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={copyToClipboard}
            className="flex-1 lg:flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Copy list to clipboard"
          >
            <Copy className="w-3.5 h-3.5 text-slate-600" /> Copy List
          </button>
          
          <button
            onClick={printList}
            className="flex-1 lg:flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Print checklist"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" /> Print
          </button>

          <button
            onClick={handleRegenerate}
            className="flex-1 lg:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
            title="Recalculate list based on selected duration and weather"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Re-generate
          </button>
        </div>
      </div>

      {/* Configuration Control Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Configure Trip Parameters for Auto-Suggestions
          </h4>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Modifying parameters adjusts clothing counts and weather gear</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Trip Duration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Trip Duration</span>
              <span className="text-indigo-600 font-extrabold">{days} Days</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[3, 5, 7, 10, 14].map(d => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    days === d 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {d}D
                </button>
              ))}
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-white border border-slate-200 text-xs text-center font-bold px-1 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 2. Season / Weather */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">Season / Expected Weather</label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setSeason('winter')}
                className={`p-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  season === 'winter'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                }`}
              >
                <Snowflake className="w-4 h-4" />
                <span className="text-[10px]">Winter / Cold</span>
              </button>

              <button
                onClick={() => setSeason('summer')}
                className={`p-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  season === 'summer'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-[10px]">Summer / Hot</span>
              </button>

              <button
                onClick={() => setSeason('monsoon')}
                className={`p-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                  season === 'monsoon'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                }`}
              >
                <CloudRain className="w-4 h-4" />
                <span className="text-[10px]">Monsoon</span>
              </button>
            </div>
          </div>

          {/* 3. Cities Multi-Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">Target Cities (Toggles Special Gear)</label>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
              {ALL_CITIES.map(city => {
                const isSelected = selectedCities.includes(city);
                return (
                  <button
                    key={city}
                    onClick={() => handleCityToggle(city)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    {city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Packing Progress Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">Packing Completion Status</span>
          </div>
          <div className="font-mono text-emerald-300 font-bold">
            {packedCount} of {items.length} Packed ({progressPercent}%)
          </div>
        </div>

        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
          <span>{items.length - packedCount} items remaining unpacked</span>
          {progressPercent === 100 ? (
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              🎉 Ready to depart! All items packed.
            </span>
          ) : (
            <span>Tip: Click any item card to check off as packed</span>
          )}
        </div>
      </div>

      {/* Filters & Category Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          
          {/* Status Filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: `All (${items.length})` },
              { id: 'unpacked', label: `Unpacked (${items.length - packedCount})` },
              { id: 'packed', label: `Packed (${packedCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterMode === tab.id
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown/Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packing Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            No items matching your current status or category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleTogglePacked(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 group ${
                  item.packed
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 opacity-80'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePacked(item.id);
                    }}
                    className="mt-0.5 text-slate-400 group-hover:text-indigo-600 transition shrink-0"
                  >
                    {item.packed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-bold truncate ${item.packed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.name}
                      </span>
                      {item.essential && !item.packed && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded shrink-0 uppercase tracking-tighter">
                          Must Pack
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 flex-wrap">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">
                        {item.category}
                      </span>
                      {item.quantity && (
                        <span className="font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          Qty: {item.quantity}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-[10px] text-slate-500 italic flex items-center gap-1 pt-0.5">
                        <Info className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
                        <span>{item.notes}</span>
                      </p>
                    )}
                  </div>
                </div>

                {item.addedByUser && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                    className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition shrink-0"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Custom Item Form */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-indigo-600" /> Add Custom Packing Item
        </h4>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="text"
            placeholder="Item name (e.g. Polaroid Camera, Special Herbal Tea)..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="sm:col-span-5 bg-white border border-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="sm:col-span-4 bg-white border border-slate-300 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="Clothing & Wearables">Clothing & Wearables</option>
            <option value="Sun & Hydration">Sun & Hydration</option>
            <option value="Desert & Safari">Desert & Safari</option>
            <option value="Health & Hygiene">Health & Hygiene</option>
            <option value="Documents & Tech">Documents & Tech</option>
            <option value="Custom Gear">Custom Gear</option>
          </select>

          <input
            type="text"
            placeholder="Qty (e.g. 2 pcs)"
            value={newItemQty}
            onChange={(e) => setNewItemQty(e.target.value)}
            className="sm:col-span-1 bg-white border border-slate-300 text-xs rounded-xl px-2 py-2.5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl px-4 py-2.5 shadow-xs transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </form>
      </div>

    </div>
  );
}

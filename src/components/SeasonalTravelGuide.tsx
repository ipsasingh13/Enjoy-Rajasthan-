import React, { useState } from 'react';
import {
  Sun,
  CloudSnow,
  CloudRain,
  Shirt,
  Compass,
  Calendar,
  Sparkles,
  Thermometer,
  Eye,
  ShieldAlert,
  Utensils,
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';

export interface SeasonalInfo {
  month: string;
  seasonName: string;
  seasonType: 'winter' | 'summer' | 'monsoon';
  tempRange: string;
  weatherSummary: string;
  crowdLevel: string;
  clothingAdvice: string[];
  activityAdjustments: string[];
  seasonalFoods: string[];
  proTravelTip: string;
}

export const MONTHLY_GUIDE_DATA: Record<number, SeasonalInfo> = {
  1: {
    month: 'January',
    seasonName: 'Peak Royal Winter ❄️',
    seasonType: 'winter',
    tempRange: '8°C - 22°C (Chilly Mornings & Nights)',
    weatherSummary: 'Crisp, sunny days with cold desert evenings. Perfect weather for all-day sightseeing.',
    crowdLevel: 'High (Peak Season)',
    clothingAdvice: [
      'Warm woolens, fleece jackets & thermals for night/early morning',
      'Light cotton shirts & sunglasses for sunny afternoons',
      'Comfortable leather walking boots or sneakers for fort walking',
      'Pashmina shawls or stoles for desert safari camp fires'
    ],
    activityAdjustments: [
      'Enjoy full-day heritage fort tours without heat fatigue',
      'Overnight desert camel camping in Jaisalmer with bonfires',
      'Morning tiger safaris at Ranthambore (dress in heavy layers)'
    ],
    seasonalFoods: ['Hot Bajra Khichdi with Ghee', 'Gond & Til Laddoo', 'Gajar ka Halwa', 'Kulhad Masala Chai'],
    proTravelTip: 'January is peak tourist season—book Amber Fort elephant rides and lake boat cruises in advance!'
  },
  2: {
    month: 'February',
    seasonName: 'Late Winter & Cultural Fairs 🌸',
    seasonType: 'winter',
    tempRange: '12°C - 26°C (Pleasant & Mild)',
    weatherSummary: 'Ideal golden climate. Cool breezes, vibrant sunshine, and major cultural festivals across cities.',
    crowdLevel: 'High (Peak Season)',
    clothingAdvice: [
      'Light jackets or cardigans for morning and dusk',
      'Breathable linen or cotton outfits for midday',
      'Sun hat and UV protection sunglasses',
      'Ethnic colorful attire for photo sessions at palaces'
    ],
    activityAdjustments: [
      'Attend the Jaisalmer Desert Festival & Udaipur World Music Fest',
      'Explore outdoor bazaars like Bapu Bazaar & Johari Bazaar comfortably',
      'Sunset boating on Lake Pichola with crystal clear sky views'
    ],
    seasonalFoods: ['Ker Sangri', 'Moong Dal Halwa', 'Mirchi Bada', 'Fresh Cane Juice'],
    proTravelTip: 'February offers the best climate for street food tours and photography tours across the Blue and Pink cities.'
  },
  3: {
    month: 'March',
    seasonName: 'Spring & Festive Holi 🎨',
    seasonType: 'winter',
    tempRange: '18°C - 33°C (Warming Up)',
    weatherSummary: 'Spring weather transitioning into warm days. Festive atmosphere with Elephant Festival & Holi.',
    crowdLevel: 'Moderate',
    clothingAdvice: [
      'Light airy cotton clothes for daywear',
      'Old clothes you don’t mind staining for Holi celebrations',
      'High-SPF sunscreen (SPF 50+) and lip balm',
      'Light scarf or bandana for dust on open jeep rides'
    ],
    activityAdjustments: [
      'Schedule fort visits between 8:00 AM - 11:30 AM before midday warmth',
      'Join royal Jaipur Elephant & Holi festivities',
      'Plan evening rooftop dinners looking over illuminated palaces'
    ],
    seasonalFoods: ['Thandai with dry fruits', 'Gujiya sweets', 'Kachori', 'Cool Lassi'],
    proTravelTip: 'Stay hydrated with fresh coconut water or Nimbu Pani as midday temperatures begin climbing.'
  },
  4: {
    month: 'April',
    seasonName: 'Early Summer ☀️',
    seasonType: 'summer',
    tempRange: '24°C - 39°C (Hot Afternoons)',
    weatherSummary: 'Bright sun and rising temperatures. Great budget deals on heritage luxury hotels.',
    crowdLevel: 'Low (Budget Season)',
    clothingAdvice: [
      'Loose-fitting UV-protective white/light cotton or linen apparel',
      'Wide-brimmed sun hat, sunglasses & UV umbrella',
      'Open breathable sandals or light mesh slip-ons',
      'Cotton dupatta/scarf to protect face and neck from dry heat'
    ],
    activityAdjustments: [
      'Do early morning fort tours (08:00 AM - 11:00 AM)',
      'Relax in air-conditioned palace museums or pool resorts from 12 PM - 4 PM',
      'Plan night tours (e.g. Amber Fort Night View or Hawa Mahal illumination)'
    ],
    seasonalFoods: ['Aam Panna (Raw Mango Drink)', 'Kair Sangri', 'Chaas (Buttermilk)', 'Gulab Jamun'],
    proTravelTip: 'Heritage hotels offer 40-50% summer discount rates—perfect for luxury stays on a budget!'
  },
  5: {
    month: 'May',
    seasonName: 'Peak Summer Heat 🏜️',
    seasonType: 'summer',
    tempRange: '28°C - 44°C (Very Hot & Dry)',
    weatherSummary: 'Peak desert heat with dry Loo winds. Best enjoyed at Mount Abu hill station or indoor palace retreats.',
    crowdLevel: 'Low (Budget Season)',
    clothingAdvice: [
      'Ultra-breathable linen, loose khadi, and pale cotton garments',
      'Full-sleeve light shirts to prevent sun burns on arms',
      'Rehydrating thermal water spray, SPF 50+ sunscreen',
      'Polarized UV sunglasses and cooling towel'
    ],
    activityAdjustments: [
      'Escape to Mount Abu (Rajasthan’s cooler hill station at 1,200m elevation)',
      'Limit outdoor trekking between 11 AM and 4 PM',
      'Visit air-conditioned indoor exhibits like City Palace museums'
    ],
    seasonalFoods: ['Matka Kulfi', 'Jaljeera with Mint', 'Watermelon & Muskmelon', 'Rabri'],
    proTravelTip: 'Carry rehydration salts (ORS/Electral) and avoid open desert camel rides during afternoon hours.'
  },
  6: {
    month: 'June',
    seasonName: 'Late Summer & Pre-Monsoon 🌤️',
    seasonType: 'summer',
    tempRange: '29°C - 41°C (Hot & Humid)',
    weatherSummary: 'Pre-monsoon clouds begin gathering toward late June, bringing occasional relief showers.',
    crowdLevel: 'Low (Budget Season)',
    clothingAdvice: [
      'Quick-dry cotton blends and breathable casual clothing',
      'Sun hat and light compact umbrella (protects against both sun & surprise rain)',
      'Comfortable anti-slip footwear',
      'Insect repellent for evening gardens'
    ],
    activityAdjustments: [
      'Early morning sightseeing & photo walks',
      'Spa sessions and cooking classes in royal havelis during peak sun',
      'Sunset boating on Fateh Sagar Lake in Udaipur'
    ],
    seasonalFoods: ['Mango Rabri', 'Bael Sharbat', 'Daal Baati Churma', 'Chaas'],
    proTravelTip: 'Pre-monsoon sunsets in June create stunning dramatic purple and golden skies over desert fort ramparts.'
  },
  7: {
    month: 'July',
    seasonName: 'Monsoon Awakening 🌧️',
    seasonType: 'monsoon',
    tempRange: '26°C - 35°C (Warm & Refreshing Rain)',
    weatherSummary: 'Monsoon arrives! Lakes fill up, countryside turns lush green, and temperatures drop comfortably.',
    crowdLevel: 'Moderate',
    clothingAdvice: [
      'Quick-dry synthetic or light cotton apparel',
      'Waterproof jacket, raincoat, or compact umbrella',
      'Water-resistant footwear or rubber sandals with good grip on wet stone stairs',
      'Waterproof pouch for smartphones and cameras'
    ],
    activityAdjustments: [
      'Photograph green Aravalli hills surrounding Udaipur & Kumbhalgarh',
      'Visit monsoon palaces like Sajjangarh (Monsoon Palace) above clouds',
      'Trek to hilltop forts when dust settles and air is fresh'
    ],
    seasonalFoods: ['Ghevar (Teej Special Sweet)', 'Hot Onion Pyaaz Kachori', 'Pakoras with Mint Chutney', 'Adrak Masala Chai'],
    proTravelTip: 'July brings the Teej Festival in Jaipur—processions with royal elephants, dancers, and festive swings!'
  },
  8: {
    month: 'August',
    seasonName: 'Lush Monsoon Bliss 🌿',
    seasonType: 'monsoon',
    tempRange: '24°C - 33°C (Pleasant & Green)',
    weatherSummary: 'Peak green landscape. Lakes in Udaipur and Ajmer overflow, creating romantic scenic vistas.',
    crowdLevel: 'Moderate',
    clothingAdvice: [
      'Light breathable layers with rain cover jackets',
      'Comfortable non-slip footwear for wet marble steps',
      'Colorful scarves for monsoon photo backdrops',
      'Mosquito repellent cream for evening garden walks'
    ],
    activityAdjustments: [
      'Boating across full Udaipur lakes (Lake Pichola & Fateh Sagar)',
      'Scenic drives through Aravalli mountain passes and Ranakpur valleys',
      'Explore Chittorgarh Fort surrounded by waterfalls'
    ],
    seasonalFoods: ['Malpua', 'Mirchi Vada', 'Moong Dal Bhajiya', 'Saffron Tea'],
    proTravelTip: 'Monsoon is the most romantic time to visit Udaipur—waterfalls like Menal & Tadas gear up in full force.'
  },
  9: {
    month: 'September',
    seasonName: 'Late Monsoon Clearing 🌤️',
    seasonType: 'monsoon',
    tempRange: '24°C - 34°C (Mild & Clear Skies)',
    weatherSummary: 'Rain showers taper off leaving crystal blue skies, green landscapes, and pleasant breeze.',
    crowdLevel: 'Moderate (Pre-Peak)',
    clothingAdvice: [
      'Casual light cottons and breathable resort wear',
      'Light cardigan for late evenings',
      'Sun hat and comfortable walking shoes',
      'Sunglasses for clear sunny afternoons'
    ],
    activityAdjustments: [
      'Explore open-air stepwells (Chand Baori Abhaneri & Toorji ka Jhalra)',
      'Start full outdoor fort photography tours',
      'Enjoy outdoor courtyard dining at heritage havelis'
    ],
    seasonalFoods: ['Mawa Kachori', 'Rajasthani Thali', 'Ker Sangri', 'Rabri Ghevar'],
    proTravelTip: 'September offers peak green scenery with zero monsoon travel delays and lower hotel rates before October surge.'
  },
  10: {
    month: 'October',
    seasonName: 'Welcome Royal Autumn 🍂',
    seasonType: 'winter',
    tempRange: '20°C - 33°C (Pleasant Autumn)',
    weatherSummary: 'Tourist season officially kicks off! Sunny pleasant days, cool starry nights, and Marwar festival vibes.',
    crowdLevel: 'High (Peak Season)',
    clothingAdvice: [
      'Comfortable daywear cottons and chic travel outfits',
      'Light jacket or pashmina shawl for cool night breezes',
      'Good walking shoes for fort ramparts',
      'Sunglasses and camera strap'
    ],
    activityAdjustments: [
      'Attend the Marwar Festival in Jodhpur',
      'Full desert camp safari bookings in Jaisalmer',
      'All-day palace and bazaar explorations'
    ],
    seasonalFoods: ['Laal Maas', 'Gatte Ki Sabzi', 'Gond Laddoo', 'Bikaneri Bhujia'],
    proTravelTip: 'Ranthambore National Park reopens on October 1st after monsoon closure—book tiger safaris early!'
  },
  11: {
    month: 'November',
    seasonName: 'Festive Pushkar & Winter Glow ✨',
    seasonType: 'winter',
    tempRange: '13°C - 28°C (Cool & Crisp)',
    weatherSummary: 'Clear sunny days and chilly nights. Highlighted by the iconic Pushkar Camel Fair and Diwali lightings.',
    crowdLevel: 'High (Peak Season)',
    clothingAdvice: [
      'Medium woolens or jackets for early morning and evenings',
      'Light comfortable cottons for daytime walks',
      'Stoles, beanies, or scarves for desert night safari',
      'Moisturizer & lip balm for crisp air'
    ],
    activityAdjustments: [
      'Experience the world-famous Pushkar Camel & Cultural Fair',
      'Witness Jaipur & Udaipur illuminated during Diwali festivities',
      'Early morning hot air balloon ride over Amber Fort'
    ],
    seasonalFoods: ['Bajra Roti with Jaggery & White Butter', 'Gajak', 'Moong Dal Halwa', 'Chai'],
    proTravelTip: 'Pushkar Fair draws global travelers—ensure camel safari and tent stay bookings are confirmed weeks ahead.'
  },
  12: {
    month: 'December',
    seasonName: 'Peak Royal Winter & New Year 🎉',
    seasonType: 'winter',
    tempRange: '7°C - 22°C (Cold Nights & Sunny Days)',
    weatherSummary: 'Magical winter chill. Sunny blue skies during daytime, bonfires and stargazing in desert camps at night.',
    crowdLevel: 'High (Peak Season)',
    clothingAdvice: [
      'Heavy woolens, thermals, padded jackets & gloves for night',
      'Layered clothing to peel off as midday sun warms up',
      'Warm socks and sturdy closed walking boots',
      'Moisturizing skin cream & sun lotion'
    ],
    activityAdjustments: [
      'Night camping in Sam Dunes Jaisalmer with folk dance bonfires',
      'Full-day fort trails across Mehrangarh, Amber & Chittorgarh',
      'Year-end gala dinners at royal palace heritage hotels'
    ],
    seasonalFoods: ['Gajar Halwa', 'Gond Ke Laddoo', 'Hot Rabri Jalebi', 'Kulhad Masala Milk'],
    proTravelTip: 'Desert nights in Jaisalmer can drop down to 5°C—pack proper thermal layers for camping!'
  }
};

export default function SeasonalTravelGuide({
  addToast
}: {
  addToast?: (msg: string) => void;
}) {
  const currentMonthNum = new Date().getMonth() + 1; // 1-12
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNum);

  const guide = MONTHLY_GUIDE_DATA[selectedMonth] || MONTHLY_GUIDE_DATA[1];

  const seasonBadges = {
    winter: { label: 'Peak Winter (Best Season)', bg: 'bg-sky-500/10 text-sky-700 border-sky-300' },
    summer: { label: 'Budget Summer (Value Deals)', bg: 'bg-amber-500/10 text-amber-800 border-amber-300' },
    monsoon: { label: 'Lush Monsoon (Romantic Green)', bg: 'bg-emerald-500/10 text-emerald-800 border-emerald-300' }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Rajasthan Climate Smart Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
            Seasonal Travel & Outfit Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Adjust your packing list, fort excursion schedules, and local dining choices based on Rajasthan’s distinct seasonal weather.
          </p>
        </div>

        {/* Current Month Auto-Detect Badge */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-md border border-slate-800 flex items-center gap-3 shrink-0">
          <Calendar className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Month</span>
            <span className="text-xs font-extrabold text-amber-300">
              {MONTHLY_GUIDE_DATA[currentMonthNum].month} (Auto-Detected)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Month Picker Ribbon */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-600" /> Select Travel Month:
        </label>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.entries(MONTHLY_GUIDE_DATA).map(([mNumStr, data]) => {
            const mNum = parseInt(mNumStr, 10);
            const isSelected = selectedMonth === mNum;
            const isCurrent = mNum === currentMonthNum;

            return (
              <button
                key={mNum}
                onClick={() => setSelectedMonth(mNum)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105 ring-2 ring-amber-400/40'
                    : isCurrent
                    ? 'bg-slate-900 text-amber-300 border-slate-700 hover:bg-slate-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{data.month.slice(0, 3)}</span>
                {isCurrent && <span className="ml-1 text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">NOW</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN SEASONAL CONTENT DISPLAY */}
      <div className="bg-gradient-to-br from-amber-50/50 via-slate-50 to-indigo-50/30 border border-amber-200/60 rounded-2xl p-6 space-y-6">
        
        {/* Top Summary Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold font-serif text-slate-900">
                {guide.month} — {guide.seasonName}
              </h3>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${seasonBadges[guide.seasonType].bg}`}>
                {seasonBadges[guide.seasonType].label}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{guide.weatherSummary}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <span>{guide.tempRange}</span>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Crowd: {guide.crowdLevel}</span>
            </div>
          </div>
        </div>

        {/* 3-COLUMN ADVICE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Clothing & Outfit Recommendations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                <Shirt className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 font-serif">
                Recommended Clothing & Outfits
              </h4>
            </div>

            <ul className="space-y-2">
              {guide.clothingAdvice.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Activity Adjustments */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-800">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 font-serif">
                Activity & Timing Adjustments
              </h4>
            </div>

            <ul className="space-y-2">
              {guide.activityAdjustments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Seasonal Foods & Hydration */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-800">
                <Utensils className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 font-serif">
                Seasonal Foods & Drinks
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {guide.seasonalFoods.map((food, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                  🍽️ {food}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Pro Travel Tip Banner */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-start gap-3 shadow-md">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <span className="font-extrabold text-amber-300 uppercase tracking-wider block">
              Pro Rajasthan Traveler Insight for {guide.month}:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {guide.proTravelTip}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Car,
  Train,
  Bus,
  Plane,
  Clock,
  Navigation,
  Route,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
  Users,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  Compass,
  Zap,
  Star
} from 'lucide-react';

export interface TransportOption {
  mode: 'train' | 'car' | 'bus' | 'flight';
  modeName: string;
  duration: string;
  durationHours: number;
  costEstimatePerPerson: number;
  costEstimateTotalCar?: number;
  comfortRating: number; // 1-5
  frequency: string;
  pros: string[];
  cons?: string[];
  bestFor: string;
  bookingTip: string;
}

export interface RouteData {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  popularName: string;
  highwayInfo: string;
  recommendedMode: 'train' | 'car' | 'bus' | 'flight';
  scenicStops: string[];
  proTip: string;
  options: TransportOption[];
}

export const RAJASTHAN_ROUTES: RouteData[] = [
  {
    id: 'jaipur-udaipur',
    from: 'Jaipur',
    to: 'Udaipur',
    distanceKm: 395,
    popularName: 'Pink City to City of Lakes',
    highwayInfo: 'NH48 (6-Lane National Highway) & Vande Bharat Rail Line',
    recommendedMode: 'train',
    scenicStops: ['Kishangarh Marble Slag Dump', 'Ajmer Sharif Dargah', 'Chittorgarh Fort Detour'],
    proTip: 'The Vande Bharat Express (#20979) takes only 4.5 hours with breakfast served on board. If taking a private car, detour through Chittorgarh Fort!',
    options: [
      {
        mode: 'train',
        modeName: 'Vande Bharat Express (#20979)',
        duration: '4h 30m',
        durationHours: 4.5,
        costEstimatePerPerson: 880,
        comfortRating: 5,
        frequency: 'Daily except Wednesdays (Departs 15:45)',
        pros: ['Fastest land option', 'On-board catering included', 'Panoramic windows & executive reclining seats'],
        cons: ['Must book 20-30 days in advance during peak season'],
        bestFor: 'Speed, Luxury & Punctuality',
        bookingTip: 'Book CC or EC class on IRCTC website 30 days ahead.'
      },
      {
        mode: 'car',
        modeName: 'Private AC Taxi (Sedan / SUV)',
        duration: '6h 30m',
        durationHours: 6.5,
        costEstimatePerPerson: 1250, // based on 4 pax sharing 5000
        costEstimateTotalCar: 5000,
        comfortRating: 4.5,
        frequency: 'On Demand (24/7 Pick & Drop)',
        pros: ['Door-to-door convenience', 'Stop at Chittorgarh Fort & dhabas anytime', 'Luggage friendly'],
        cons: ['Takes 2 hours longer than Vande Bharat'],
        bestFor: 'Families, Groups & Sightseeing Flexibility',
        bookingTip: 'Request a car with toll tag (FASTag) included in quote.'
      },
      {
        mode: 'bus',
        modeName: 'AC Sleeper Volvo (RSRTC / Private)',
        duration: '7h 15m',
        durationHours: 7.25,
        costEstimatePerPerson: 550,
        comfortRating: 3.5,
        frequency: 'Hourly departures (Day & Night)',
        pros: ['Budget friendly', 'Overnight sleeper option saves hotel cost'],
        cons: ['Slower traffic on highway near Ajmer'],
        bestFor: 'Budget Travelers & Overnight Trips',
        bookingTip: 'Book top deck single sleeper berths for maximum privacy.'
      },
      {
        mode: 'flight',
        modeName: 'Direct Flight (IndiGo / Alliance)',
        duration: '1h 05m',
        durationHours: 1.1,
        costEstimatePerPerson: 3200,
        comfortRating: 4.5,
        frequency: 'Daily direct flight',
        pros: ['Ultra fast flight time'],
        cons: ['Airport check-in adds 2 hours', 'Higher cost'],
        bestFor: 'Time-sensitive Travelers',
        bookingTip: 'Book at least 3 weeks early to secure < ₹3,500 fares.'
      }
    ]
  },
  {
    id: 'jaipur-jodhpur',
    from: 'Jaipur',
    to: 'Jodhpur',
    distanceKm: 335,
    popularName: 'Pink City to Blue City',
    highwayInfo: 'NH48 & NH25 via Ajmer bypass',
    recommendedMode: 'train',
    scenicStops: ['Sambhar Salt Lake View', 'Pushkar Holy Lake Detour', 'Merta City Temple'],
    proTip: 'Ju JP Vande Bharat / Superfast trains run smoothly. If driving, take a 45-min detour to Pushkar for lunch overlooking the holy ghats.',
    options: [
      {
        mode: 'train',
        modeName: 'Vande Bharat / Superfast Intercity',
        duration: '4h 15m',
        durationHours: 4.25,
        costEstimatePerPerson: 620,
        comfortRating: 4.5,
        frequency: '4 Daily Direct Trains',
        pros: ['Smooth ride', 'Center-to-center city access', 'Zero highway traffic stress'],
        cons: ['Tickets sell out fast on weekends'],
        bestFor: 'Solo & Business Travelers',
        bookingTip: 'Intercity Express Chair Car (CC) is clean & economical.'
      },
      {
        mode: 'car',
        modeName: 'Private AC Taxi (Dzire / Innova)',
        duration: '5h 30m',
        durationHours: 5.5,
        costEstimatePerPerson: 1050,
        costEstimateTotalCar: 4200,
        comfortRating: 4.5,
        frequency: 'Available 24/7',
        pros: ['Option to visit Pushkar Brahma Temple enroute', 'Direct hotel drop'],
        cons: ['Highway toll gates'],
        bestFor: 'Couples & Small Groups wanting Pushkar detour',
        bookingTip: 'Ask driver to take Jaipur-Ajmer Expressway route.'
      },
      {
        mode: 'bus',
        modeName: 'RSRTC Goldline / AC Seater',
        duration: '6h 00m',
        durationHours: 6.0,
        costEstimatePerPerson: 420,
        comfortRating: 3.5,
        frequency: 'Every 30 minutes from Sindhi Camp',
        pros: ['Very cheap', 'High frequency'],
        cons: ['Frequent stops at smaller towns'],
        bestFor: 'Backpackers & Last-minute plans',
        bookingTip: 'Board RSRTC Express from Sindhi Camp Bus Station.'
      }
    ]
  },
  {
    id: 'jodhpur-jaisalmer',
    from: 'Jodhpur',
    to: 'Jaisalmer',
    distanceKm: 285,
    popularName: 'Blue City to Golden Desert Fortress',
    highwayInfo: 'NH11 Desert Corridor (Smooth 2/4 lane road)',
    recommendedMode: 'car',
    scenicStops: ['Pokhran Fort & War Museum', 'Osian Sun Temple & Sand Dunes', 'Dechu Oasis Dhaba'],
    proTip: 'Driving through the Thar Desert Highway is an unforgettable road trip experience. Stop at Pokhran Fort for lunch and Osian for a camel ride!',
    options: [
      {
        mode: 'car',
        modeName: 'Private Desert Roadtrip Car',
        duration: '4h 30m',
        durationHours: 4.5,
        costEstimatePerPerson: 1100,
        costEstimateTotalCar: 4400,
        comfortRating: 5,
        frequency: 'On Demand',
        pros: ['Stunning Thar Desert road scenery', 'Flexible stop at Pokhran Fort & Osian', 'Direct drop at desert camp'],
        cons: ['Higher cost for single traveler'],
        bestFor: 'Ultimate Thar Desert Scenic Experience',
        bookingTip: 'Start early morning (7 AM) to reach Jaisalmer for sunset at Fort.'
      },
      {
        mode: 'train',
        modeName: 'Ranikhet Express / Ju Jsm Express',
        duration: '5h 15m',
        durationHours: 5.25,
        costEstimatePerPerson: 350,
        comfortRating: 4,
        frequency: '2 Daily Trains (Morning & Night)',
        pros: ['Scenic desert rail views', 'Very economical'],
        cons: ['Limited daily departures'],
        bestFor: 'Budget travelers & Rail enthusiasts',
        bookingTip: 'Book 2A or 3A berth on 14659 Ranikhet Express.'
      },
      {
        mode: 'bus',
        modeName: 'AC Sleeper Desert Express',
        duration: '5h 45m',
        durationHours: 5.75,
        costEstimatePerPerson: 380,
        comfortRating: 3.5,
        frequency: '5 Departures daily',
        pros: ['Inexpensive', 'Direct drop at Jaisalmer Bus Stand'],
        cons: ['Bumpy on certain desert road patches'],
        bestFor: 'Budget Backpacker Transport',
        bookingTip: 'Choose AC Volvo sleeper over non-AC buses.'
      }
    ]
  },
  {
    id: 'udaipur-jodhpur',
    from: 'Udaipur',
    to: 'Jodhpur',
    distanceKm: 260,
    popularName: 'City of Lakes to Blue City via Aravalli Hills',
    highwayInfo: 'NH162 & Scenic Aravalli Mountain Passes',
    recommendedMode: 'car',
    scenicStops: ['Ranakpur 1444-Pillar Jain Temple (Must Visit!)', 'Kumbhalgarh Fort Great Wall', 'Bullet Baba Temple'],
    proTip: 'MUST HIRING A CAR FOR THIS ROUTE! No fast trains exist, and a private car allows you to visit the world-famous Ranakpur Jain Temple (1,444 uniquely carved marble pillars).',
    options: [
      {
        mode: 'car',
        modeName: 'Private Heritage Car (via Ranakpur & Kumbhalgarh)',
        duration: '5h 30m',
        durationHours: 5.5,
        costEstimatePerPerson: 1050,
        costEstimateTotalCar: 4200,
        comfortRating: 5,
        frequency: 'On Demand',
        pros: ['Allows 2-hour stop at Ranakpur Jain Temple', 'Breathtaking Aravalli mountain views', 'Visit Kumbhalgarh Fort Great Wall'],
        cons: ['Winding mountain roads (take motion sickness meds if prone)'],
        bestFor: 'MUST-DO Cultural & Heritage Sightseeing',
        bookingTip: 'Book driver explicitly with "Ranakpur & Kumbhalgarh detour" included.'
      },
      {
        mode: 'bus',
        modeName: 'State Transport & Local AC Bus',
        duration: '6h 30m',
        durationHours: 6.5,
        costEstimatePerPerson: 320,
        comfortRating: 3,
        frequency: 'Hourly',
        pros: ['Cheapest option'],
        cons: ['Does NOT stop at Ranakpur Temple', 'Basic seats'],
        bestFor: 'Direct point-to-point budget travel',
        bookingTip: 'Buses take the direct road bypassing temple stopovers.'
      }
    ]
  },
  {
    id: 'jaipur-ranthambore',
    from: 'Jaipur',
    to: 'Ranthambore',
    distanceKm: 160,
    popularName: 'Pink City to Royal Tiger Reserve',
    highwayInfo: 'Jaipur-Kota Highway & Sawai Madhopur Rail Line',
    recommendedMode: 'train',
    scenicStops: ['Tonk Nawabi Heritage Architecture', 'Ranthambore Fort Entry Gate'],
    proTip: 'Jan Shatabdi Express takes under 2.5 hours right to Sawai Madhopur station (10 mins from Tiger Safari gates)!',
    options: [
      {
        mode: 'train',
        modeName: 'Jan Shatabdi / Kota Superfast Express',
        duration: '2h 15m',
        durationHours: 2.25,
        costEstimatePerPerson: 320,
        comfortRating: 4.5,
        frequency: '6 Daily Express Trains',
        pros: ['Fastest method', 'Drops at Sawai Madhopur station', 'Air conditioned chair car'],
        cons: ['Safari time alignment required'],
        bestFor: 'Wildlife Enthusiasts & Fast Commute',
        bookingTip: 'Book 12060 Jan Shatabdi departing Jaipur at 07:00 AM.'
      },
      {
        mode: 'car',
        modeName: 'Private AC Car / Taxi',
        duration: '3h 30m',
        durationHours: 3.5,
        costEstimatePerPerson: 850,
        costEstimateTotalCar: 3400,
        comfortRating: 4.5,
        frequency: 'Available 24/7',
        pros: ['Direct hotel/resort drop in Ranthambore zone', 'No luggage hassle'],
        cons: ['Slightly slower than train due to city exits'],
        bestFor: 'Resort Guests with heavy luggage',
        bookingTip: 'Combine with return trip for discounted round-trip rates.'
      }
    ]
  },
  {
    id: 'delhi-jaipur',
    from: 'Delhi',
    to: 'Jaipur',
    distanceKm: 280,
    popularName: 'Capital Gateway to Rajasthan',
    highwayInfo: 'NE4 Delhi-Mumbai Expressway & Vande Bharat Rail Line',
    recommendedMode: 'train',
    scenicStops: ['Neemrana Fort Palace', 'Sariska Tiger Reserve Detour', 'Cyber Hub Gurgaon'],
    proTip: 'The new Delhi-Jaipur NE4 Super Expressway has cut driving time to ~3.5 hours! Vande Bharat Express from New Delhi (NDLS) takes 3h 45m.',
    options: [
      {
        mode: 'train',
        modeName: 'Vande Bharat Express (#20902)',
        duration: '3h 45m',
        durationHours: 3.75,
        costEstimatePerPerson: 890,
        comfortRating: 5,
        frequency: 'Daily except Wednesdays (Departs NDLS 06:10 AM)',
        pros: ['Ultra comfortable', 'Served breakfast', 'Arrives in Jaipur by 10 AM'],
        cons: ['Requires early morning wake up in Delhi'],
        bestFor: 'First Class Railway Experience',
        bookingTip: 'Book Executive Chair Car (EC) for extra legroom.'
      },
      {
        mode: 'car',
        modeName: 'Private Taxi via NE4 Expressway',
        duration: '3h 50m',
        durationHours: 3.85,
        costEstimatePerPerson: 1000,
        costEstimateTotalCar: 4000,
        comfortRating: 4.5,
        frequency: 'On Demand',
        pros: ['Smooth 8-lane NE4 Expressway', 'Stop at Neemrana Fort Palace for High Tea'],
        cons: ['Highway toll charges (~₹600)'],
        bestFor: 'Door-to-door convenience from Delhi Airport / Hotel',
        bookingTip: 'Ensure driver takes NE4 Expressway via Sohna.'
      },
      {
        mode: 'bus',
        modeName: 'Scania / Volvo AC Sleeper (RSRTC)',
        duration: '5h 00m',
        durationHours: 5.0,
        costEstimatePerPerson: 450,
        comfortRating: 4,
        frequency: 'Every 20 minutes from Bikaner House Delhi',
        pros: ['High frequency', 'Clean luxury coaches departing central Delhi'],
        cons: ['Traffic near Gurgaon border during rush hours'],
        bestFor: 'Flexible departure times',
        bookingTip: 'Board at Bikaner House near India Gate Delhi.'
      }
    ]
  }
];

export default function TransportationSection({ onSelectRoute }: { onSelectRoute?: (routeId: string) => void }) {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('jaipur-udaipur');
  const [filterMode, setFilterMode] = useState<'all' | 'train' | 'car' | 'bus' | 'flight'>('all');
  const [passengerCount, setPassengerCount] = useState<number>(2);

  const currentRoute = useMemo(() => {
    return RAJASTHAN_ROUTES.find(r => r.id === selectedRouteId) || RAJASTHAN_ROUTES[0];
  }, [selectedRouteId]);

  const filteredOptions = useMemo(() => {
    if (filterMode === 'all') return currentRoute.options;
    return currentRoute.options.filter(opt => opt.mode === filterMode);
  }, [currentRoute, filterMode]);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'train': return <Train className="w-5 h-5 text-indigo-600" />;
      case 'car': return <Car className="w-5 h-5 text-emerald-600" />;
      case 'bus': return <Bus className="w-5 h-5 text-amber-600" />;
      case 'flight': return <Plane className="w-5 h-5 text-sky-600" />;
      default: return <Navigation className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'train': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'car': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'bus': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'flight': return 'bg-sky-100 text-sky-800 border-sky-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Route className="w-3.5 h-3.5 text-indigo-600" /> Inter-City Travel & Transit Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rajasthan Transportation Routes & Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Compare travel times, ticket costs, highway conditions, and scenic stopovers across Vande Bharat trains, private cars, Volvo buses, and regional flights.
          </p>
        </div>

        {/* Passenger Counter for Real-time Cost Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 w-full lg:w-auto shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Travelers:</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
            {[1, 2, 4, 6].map(num => (
              <button
                key={num}
                onClick={() => setPassengerCount(num)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  passengerCount === num
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num} {num === 1 ? 'Pax' : 'Pax'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Select Inter-City Route */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-indigo-600" /> Select Inter-City Route to Compare
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {RAJASTHAN_ROUTES.map(route => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                onClick={() => {
                  setSelectedRouteId(route.id);
                  if (onSelectRoute) onSelectRoute(route.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {route.distanceKm} km
                  </div>
                  <div className="text-xs font-extrabold flex items-center gap-1">
                    <span>{route.from}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span>{route.to}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-indigo-500/20">
                  <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded uppercase ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Rec: {route.recommendedMode}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Route Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Route Overview
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              <span>{currentRoute.from}</span>
              <span className="text-indigo-400">⟶</span>
              <span>{currentRoute.to}</span>
              <span className="text-xs font-semibold text-slate-300 font-mono bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 ml-2">
                {currentRoute.distanceKm} km
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">{currentRoute.popularName} • {currentRoute.highwayInfo}</p>
          </div>

          <div className="bg-indigo-900/60 border border-indigo-500/30 rounded-xl p-3 text-right">
            <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider block">Recommended Choice</span>
            <span className="text-sm font-extrabold text-emerald-400 capitalize flex items-center justify-end gap-1 mt-0.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> {currentRoute.recommendedMode.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Pro Tip & Scenic Stops */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Route Pro Tip:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">{currentRoute.proTip}</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl space-y-1">
            <span className="font-bold text-indigo-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Top Scenic Stops Enroute:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentRoute.scenicStops.map(stop => (
                <span key={stop} className="bg-indigo-950 text-indigo-200 border border-indigo-800 px-2 py-0.5 rounded text-[10px] font-medium">
                  📍 {stop}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Mode Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Route className="w-4 h-4 text-indigo-600" /> Travel Options Breakdown ({filteredOptions.length})
        </h4>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Modes' },
            { id: 'train', label: 'Train 🚆' },
            { id: 'car', label: 'Taxi/Car 🚗' },
            { id: 'bus', label: 'Bus 🚌' },
            { id: 'flight', label: 'Flight ✈️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterMode === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Travel Options Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOptions.map((opt, idx) => {
          // Calculate cost based on passenger count
          let totalCost = opt.costEstimatePerPerson * passengerCount;
          if (opt.mode === 'car' && opt.costEstimateTotalCar) {
            // Car cost is fixed per vehicle up to 4 pax
            totalCost = opt.costEstimateTotalCar * Math.ceil(passengerCount / 4);
          }
          const costPerPersonCalculated = Math.round(totalCost / passengerCount);

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 relative overflow-hidden group"
            >
              {opt.mode === currentRoute.recommendedMode && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Top Pick
                </div>
              )}

              <div className="space-y-4">
                {/* Option Header */}
                <div className="flex items-start justify-between gap-3 pr-16">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${getModeBadge(opt.mode)}`}>
                      {getModeIcon(opt.mode)}
                    </div>
                    <div>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase border ${getModeBadge(opt.mode)}`}>
                        {opt.mode}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">{opt.modeName}</h4>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Duration</span>
                    <span className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" /> {opt.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Cost ({passengerCount} Pax)</span>
                    <span className="text-xs font-extrabold text-indigo-700 block mt-0.5">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      (~₹{costPerPersonCalculated}/pax)
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-medium block">Comfort</span>
                    <div className="flex justify-center items-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= opt.comfortRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pros & Best For */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Best For: <span className="text-slate-800 font-medium">{opt.bestFor}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Key Advantages:</span>
                    <ul className="space-y-1 text-slate-600">
                      {opt.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {opt.cons && opt.cons.length > 0 && (
                    <div className="text-[10px] text-rose-600 bg-rose-50 border border-rose-100 p-2 rounded-lg">
                      ⚠️ <strong className="font-bold">Note:</strong> {opt.cons.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Tip Footer */}
              <div className="bg-slate-50 border-t border-slate-100 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
                  <Info className="w-3 h-3 text-indigo-500" /> Booking Advice:
                </span>
                <p className="text-[11px] text-slate-600">{opt.bookingTip}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Calculator Summary Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-600" /> Smart Travel Tip for {passengerCount} Passenger{passengerCount > 1 ? 's' : ''} on {currentRoute.from} ⟶ {currentRoute.to}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          {passengerCount >= 3 ? (
            <>
              Hiring a <strong className="text-slate-900">Private AC Car/Taxi (~₹{currentRoute.options.find(o => o.mode === 'car')?.costEstimateTotalCar || 4200})</strong> costs roughly <strong className="text-indigo-600">₹{Math.round((currentRoute.options.find(o => o.mode === 'car')?.costEstimateTotalCar || 4200) / passengerCount)} per person</strong> for your group of {passengerCount}. This is comparable to train fares while offering door-to-door hotel transfers and scenic stopovers!
            </>
          ) : (
            <>
              For {passengerCount} traveler{passengerCount > 1 ? 's' : ''}, taking the <strong className="text-slate-900">{currentRoute.options.find(o => o.mode === 'train')?.modeName || 'Express Train'}</strong> provides maximum speed, comfort, and zero traffic stress at <strong className="text-indigo-600">₹{currentRoute.options.find(o => o.mode === 'train')?.costEstimatePerPerson || 600}/person</strong>.
            </>
          )}
        </p>
      </div>

    </div>
  );
}

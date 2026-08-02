import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Clock, 
  MapPin, 
  Navigation, 
  Route, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Copy, 
  Check, 
  Fuel, 
  Compass, 
  Bus, 
  Train, 
  Sparkles,
  Info,
  RefreshCw,
  Share2,
  Link as LinkIcon,
  MessageCircle,
  Send,
  QrCode,
  ExternalLink,
  X,
  Globe,
  Mail
} from 'lucide-react';
import { vectorMapNodes, destinationsList } from '../data';

interface TripSummaryProps {
  destinations: string[];
  onDestinationsChange?: (newDestinations: string[]) => void;
  title?: string;
  className?: string;
  showQuickAdd?: boolean;
}

// Known driving distances in KM between Rajasthan cities
const KNOWN_DISTANCES: Record<string, number> = {
  'Jaipur-Jodhpur': 330,
  'Jaipur-Udaipur': 390,
  'Jaipur-Jaisalmer': 560,
  'Jaipur-Pushkar': 140,
  'Jaipur-Ajmer': 135,
  'Jaipur-Bikaner': 335,
  'Jaipur-Ranthambore': 160,
  'Jaipur-Alwar': 150,
  'Jaipur-Mandawa': 170,
  'Jaipur-Kota': 250,
  'Jaipur-Bundi': 215,
  'Jaipur-Bharatpur': 185,
  'Jaipur-Chittorgarh': 310,
  'Jaipur-Mount Abu': 495,
  'Jaipur-Jhalawar': 330,

  'Jodhpur-Jaisalmer': 280,
  'Jodhpur-Udaipur': 250,
  'Jodhpur-Bikaner': 245,
  'Jodhpur-Mount Abu': 260,
  'Jodhpur-Pushkar': 185,
  'Jodhpur-Ajmer': 205,

  'Udaipur-Mount Abu': 165,
  'Udaipur-Chittorgarh': 115,
  'Udaipur-Jaisalmer': 490,
  'Udaipur-Bikaner': 480,
  'Udaipur-Pushkar': 280,
  'Udaipur-Ajmer': 265,
  'Udaipur-Kota': 285,

  'Bikaner-Jaisalmer': 330,
  'Bikaner-Pushkar': 250,
  'Bikaner-Mandawa': 190,

  'Ajmer-Pushkar': 15,
  'Kota-Bundi': 35,
  'Kota-Jhalawar': 85,
  'Alwar-Bharatpur': 110,
  'Chittorgarh-Kota': 170,
  'Chittorgarh-Bundi': 155
};

// Helper function to calculate distance between any two cities
export function getCityDistanceKm(cityA: string, cityB: string): number {
  if (cityA.toLowerCase() === cityB.toLowerCase()) return 0;
  
  const key1 = `${cityA}-${cityB}`;
  const key2 = `${cityB}-${cityA}`;
  if (KNOWN_DISTANCES[key1]) return KNOWN_DISTANCES[key1];
  if (KNOWN_DISTANCES[key2]) return KNOWN_DISTANCES[key2];

  // Fallback: Calculate approximate Euclidean distance from vectorMapNodes
  const nodeA = vectorMapNodes.find(n => n.name.toLowerCase() === cityA.toLowerCase());
  const nodeB = vectorMapNodes.find(n => n.name.toLowerCase() === cityB.toLowerCase());

  if (nodeA && nodeB) {
    const dx = nodeA.x - nodeB.x;
    const dy = nodeA.y - nodeB.y;
    const rawDist = Math.sqrt(dx * dx + dy * dy);
    return Math.max(25, Math.round(rawDist * 2.2));
  }

  return 120; // Default reasonable distance
}

export default function TripSummary({
  destinations,
  onDestinationsChange,
  title = "Trip Distance & Travel Summary",
  className = "",
  showQuickAdd = true
}: TripSummaryProps) {
  const [unit, setUnit] = useState<'km' | 'miles'>('km');
  const [transportMode, setTransportMode] = useState<'car' | 'bus' | 'train' | 'express'>('car');
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareNote, setShareNote] = useState('Check out our Royal Rajasthan caravan itinerary!');

  // Unique Share URL generation
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const params = new URLSearchParams();
    params.set('route', destinations.join(','));
    params.set('mode', transportMode);
    params.set('page', 'planner');
    return `${origin}${pathname}?${params.toString()}`;
  }, [destinations, transportMode]);

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const triggerNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Royal Rajasthan Caravan Itinerary',
          text: `${shareNote}\n\nRoute: ${destinations.join(' ➔ ')}\nTotal Distance: ${totalKm} km (~${totalHours}h ${remainingMins}m)`,
          url: shareUrl
        });
      } catch (e) {
        // ignore cancellation
      }
    } else {
      copyShareUrl();
    }
  };

  // Speeds in KM/H
  const speedMap = {
    car: 60,
    bus: 50,
    train: 65,
    express: 75
  };

  const transportLabels = {
    car: { name: 'Private Car / Cab', speed: '60 km/h', icon: Car },
    bus: { name: 'Tourist Volvo Bus', speed: '50 km/h', icon: Bus },
    train: { name: 'Express Train', speed: '65 km/h', icon: Train },
    express: { name: 'Self Drive Express', speed: '75 km/h', icon: Compass }
  };

  // Leg calculations
  const routeLegs = useMemo(() => {
    if (destinations.length <= 1) return [];
    
    const legs = [];
    const speed = speedMap[transportMode];

    for (let i = 0; i < destinations.length - 1; i++) {
      const from = destinations[i];
      const to = destinations[i + 1];
      const distKm = getCityDistanceKm(from, to);
      const totalMinutes = Math.round((distKm / speed) * 60);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;

      legs.push({
        id: `leg-${from}-${to}-${i}`,
        from,
        to,
        fromIndex: i + 1,
        toIndex: i + 2,
        distKm,
        distMiles: Math.round(distKm * 0.621371),
        totalMinutes,
        hours,
        mins,
        formattedTime: hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
      });
    }
    return legs;
  }, [destinations, transportMode]);

  // Total Distance & Travel Time
  const totalKm = useMemo(() => routeLegs.reduce((sum, leg) => sum + leg.distKm, 0), [routeLegs]);
  const totalMiles = useMemo(() => Math.round(totalKm * 0.621371), [totalKm]);

  const totalMinutes = useMemo(() => routeLegs.reduce((sum, leg) => sum + leg.totalMinutes, 0), [routeLegs]);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  // Estimated fuel cost calculation (average 12 km/L, Petrol ~₹100/L)
  const estimatedFuelLiters = Math.round(totalKm / 12);
  const estimatedFuelCostINR = Math.round(estimatedFuelLiters * 102);

  // Reordering handlers
  const moveUp = (index: number) => {
    if (index <= 0 || !onDestinationsChange) return;
    const next = [...destinations];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    onDestinationsChange(next);
  };

  const moveDown = (index: number) => {
    if (index >= destinations.length - 1 || !onDestinationsChange) return;
    const next = [...destinations];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    onDestinationsChange(next);
  };

  const removeCity = (city: string) => {
    if (!onDestinationsChange) return;
    if (destinations.length <= 1) return;
    onDestinationsChange(destinations.filter(c => c !== city));
  };

  const addCity = (city: string) => {
    if (!onDestinationsChange) return;
    if (!destinations.includes(city)) {
      onDestinationsChange([...destinations, city]);
    }
  };

  const copySummary = () => {
    const text = `👑 RAJASTHAN TRIP SUMMARY 👑\n\nDestinations (${destinations.length}): ${destinations.join(' ➔ ')}\nTotal Distance: ${unit === 'km' ? `${totalKm} km` : `${totalMiles} mi`}\nEstimated Travel Time: ${totalHours}h ${remainingMins}m (${transportLabels[transportMode].name})\n\nLeg Breakdown:\n` +
      routeLegs.map(l => `• Leg ${l.fromIndex} to ${l.toIndex}: ${l.from} ➔ ${l.to} (${unit === 'km' ? `${l.distKm} km` : `${l.distMiles} mi`}, ~${l.formattedTime})`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const availableCitiesToAdd = destinationsList.filter(c => !destinations.includes(c));

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6 ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Route className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{title}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time intercity driving distance & travel time estimation between selected destinations.
          </p>
        </div>

        {/* Unit & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setUnit('km')}
              className={`px-3 py-1 rounded-lg transition-all ${unit === 'km' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              KM
            </button>
            <button
              onClick={() => setUnit('miles')}
              className={`px-3 py-1 rounded-lg transition-all ${unit === 'miles' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Miles
            </button>
          </div>

          <button
            onClick={copySummary}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Copy Trip Summary to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm hover:shadow-indigo-200 cursor-pointer border border-indigo-500"
            title="Generate unique URL and share itinerary with friends"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Itinerary</span>
          </button>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Distance Card */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-4 rounded-xl shadow-md border border-indigo-800/50 space-y-1">
          <div className="flex items-center justify-between text-indigo-300 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-amber-400" /> Total Distance
            </span>
            <span className="bg-indigo-800/60 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono">
              {destinations.length} Cities
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight">
            {unit === 'km' ? `${totalKm} km` : `${totalMiles} mi`}
          </div>
          <p className="text-[11px] text-indigo-200/80">
            {routeLegs.length > 0 ? `${routeLegs.length} interconnecting route legs` : 'Select 2+ cities to calculate'}
          </p>
        </div>

        {/* Estimated Travel Time Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-4 rounded-xl shadow-md border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-300 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" /> Total Travel Time
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30">
              ~{transportLabels[transportMode].speed}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {totalHours > 0 ? `${totalHours}h ${remainingMins}m` : `${remainingMins}m`}
          </div>
          <p className="text-[11px] text-slate-300/80">
            Calculated for {transportLabels[transportMode].name}
          </p>
        </div>

        {/* Fuel & Transit Logistics */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-emerald-600" /> Est. Fuel / Transit
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-mono">
              ~12 km/L
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-900 tracking-tight">
            ~₹{estimatedFuelCostINR.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700">
            ~{estimatedFuelLiters} Liters fuel required for private vehicle
          </p>
        </div>

        {/* Route Density & Comfort */}
        <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-amber-900 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Pace Rating
            </span>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
              {totalKm < 400 ? 'Relaxed ☕' : totalKm < 800 ? 'Moderate 🚗' : 'Expedition 🐪'}
            </span>
          </div>
          <div className="text-lg font-extrabold text-amber-950 truncate">
            {destinations.length <= 1 ? 'Add Cities' : totalKm < 400 ? 'Leisurely Circuit' : totalKm < 800 ? 'Balanced Royal Tour' : 'Grand Rajasthan Caravan'}
          </div>
          <p className="text-[11px] text-amber-800">
            {destinations.length <= 1 ? 'Select destinations to see pace' : `Avg ${(totalKm / Math.max(1, destinations.length)).toFixed(0)} km per stop`}
          </p>
        </div>
      </div>

      {/* Transport Mode Switcher Bar */}
      <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Car className="w-4 h-4 text-indigo-600" /> Mode of Travel:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
          {(Object.keys(transportLabels) as Array<keyof typeof transportLabels>).map((mode) => {
            const config = transportLabels[mode];
            const ModeIcon = config.icon;
            const active = transportMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setTransportMode(mode)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-100'
                }`}
              >
                <ModeIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Legs Breakdown */}
      {destinations.length > 1 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" /> Selected Route Sequence & Segment Breakdown:
            </span>
            <span className="text-slate-500 font-normal text-[11px]">
              Use arrows to reorder stops
            </span>
          </div>

          <div className="space-y-2">
            {destinations.map((city, idx) => {
              const legFromThis = routeLegs[idx]; // Leg from this city to next city
              return (
                <React.Fragment key={`${city}-${idx}`}>
                  {/* City Node Card */}
                  <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">{city}</h4>
                          {idx === 0 && (
                            <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                              Starting Hub
                            </span>
                          )}
                          {idx === destinations.length - 1 && idx > 0 && (
                            <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                              Final Destination
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    {onDestinationsChange && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                          title="Move Stop Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveDown(idx)}
                          disabled={idx === destinations.length - 1}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                          title="Move Stop Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        {destinations.length > 1 && (
                          <button
                            onClick={() => removeCity(city)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                            title="Remove Stop"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Inter-city Leg Connector Bar */}
                  {legFromThis && (
                    <div className="ml-5 my-1 pl-6 border-l-2 border-dashed border-indigo-400/60 py-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 font-medium text-slate-700">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>Drive from <strong>{legFromThis.from}</strong> to <strong>{legFromThis.to}</strong></span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 font-mono">
                        <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-indigo-700 font-bold shadow-2xs flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-indigo-600" />
                          {unit === 'km' ? `${legFromThis.distKm} km` : `${legFromThis.distMiles} mi`}
                        </span>

                        <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 font-bold shadow-2xs flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          ~{legFromThis.formattedTime}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 text-center text-slate-500 space-y-2">
          <Compass className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs font-semibold text-slate-700">Select 2 or more destinations to generate travel route logistics.</p>
        </div>
      )}

      {/* Quick Add Extra Cities Bar */}
      {showQuickAdd && onDestinationsChange && availableCitiesToAdd.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            + Add Nearby Destinations to Caravan Route:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableCitiesToAdd.slice(0, 10).map((city) => (
              <button
                key={city}
                onClick={() => addCity(city)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-slate-700 text-xs font-medium border border-slate-200 transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-slate-400" /> {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Share Itinerary Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Share2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-white tracking-tight">Share Royal Itinerary</h3>
                  <p className="text-xs text-slate-300">Share unique route & distance logistics link with friends</p>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
              
              {/* Route Summary Badge */}
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-4 rounded-xl shadow-xs border border-indigo-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Route className="w-4 h-4 text-amber-400" /> {destinations.length} Destinations Route
                  </span>
                  <span className="bg-indigo-800/80 px-2 py-0.5 rounded text-[10px] font-mono">
                    ~{totalKm} km ({totalHours}h {remainingMins}m)
                  </span>
                </div>
                <div className="text-sm font-extrabold text-white tracking-tight">
                  {destinations.join(' ➔ ')}
                </div>
              </div>

              {/* Unique URL Link Input Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Unique Shareable Itinerary Link:
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>

                  <button
                    onClick={copyShareUrl}
                    className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      linkCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Optional Custom Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Add Personal Note for Friends:
                </label>
                <input
                  type="text"
                  value={shareNote}
                  onChange={(e) => setShareNote(e.target.value)}
                  placeholder="e.g. Check out our upcoming Rajasthan road trip!"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Direct Messaging & Social Share Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1-Click Direct Share:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🏰 *Royal Rajasthan Itinerary*\n"${shareNote}"\n\n📍 *Route:* ${destinations.join(' ➔ ')}\n🚗 *Total Distance:* ${totalKm} km (~${totalHours}h ${remainingMins}m)\n\n👉 *View Interactive Route:* ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`🏰 Royal Rajasthan Trip: ${destinations.join(' ➔ ')} (${totalKm} km)\n"${shareNote}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <Send className="w-4 h-4" /> Telegram
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Exploring Royal Rajasthan! 🏰 Route: ${destinations.join(' ➔ ')} (${totalKm} km)\n`)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <Globe className="w-4 h-4" /> X / Twitter
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent('Royal Rajasthan Trip Itinerary')}&body=${encodeURIComponent(`${shareNote}\n\nRoute: ${destinations.join(' ➔ ')}\nTotal Distance: ${totalKm} km\nEstimated Duration: ${totalHours}h ${remainingMins}m\n\nLink: ${shareUrl}`)}`}
                    className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-indigo-200"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>

              {/* Mobile Native Share Button */}
              {typeof navigator !== 'undefined' && (navigator as any).share && (
                <button
                  onClick={triggerNativeShare}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Open Phone System Share Menu</span>
                </button>
              )}

              {/* QR Code Quick Scan Box */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-white border border-slate-300 rounded-xl shadow-xs shrink-0 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900 flex items-center gap-1">
                    QR Code Instant Camera Scan
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Scan with any mobile camera to instantly open and view this exact route and trip summary on mobile!
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end shrink-0">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

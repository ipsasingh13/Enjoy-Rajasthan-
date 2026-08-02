import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Compass,
  Navigation,
  Info,
  Heart,
  Calendar,
  Clock,
  Coins,
  Sparkles,
  Route,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Plus,
  Trash2,
  Car,
  Camera,
  Landmark,
  TreePalm,
  Waves,
  Sun,
  X,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sliders,
  Download,
  Share2
} from 'lucide-react';
import { WishlistItem } from '../types';
import { toggleWishlistItem, isWishlisted } from '../utils/wishlist';

export interface PlaceLocation {
  id: string;
  name: string;
  city: string;
  region: string;
  category: 'fort' | 'palace' | 'lake' | 'safari' | 'temple' | 'market';
  categoryLabel: string;
  x: number; // SVG X % relative
  y: number; // SVG Y % relative
  image: string;
  rating: number;
  reviewsCount: number;
  timings: string;
  fee: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  recommendedStayHours: string;
  proTip: string;
}

export const RAJASTHAN_PLACES: PlaceLocation[] = [
  {
    id: 'amber-fort',
    name: 'Amber Fort & Palace',
    city: 'Jaipur',
    region: 'Pink City',
    category: 'fort',
    categoryLabel: 'Royal Fort & Palace',
    x: 70,
    y: 35,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1420,
    timings: '08:00 AM - 05:30 PM & 06:30 PM - 09:15 PM (Night Tour)',
    fee: '₹100 (Indians), ₹500 (Foreigners)',
    description: 'A magnificent hilltop fortress built from yellow and pink sandstone, overlooking Maota Lake. Renowned for its mirror palace (Sheesh Mahal) and cobbled ramparts.',
    highlights: ['Sheesh Mahal (Hall of Mirrors)', 'Maota Lake reflection view', 'Elephant/Golf cart entrance ramp', 'Sound & Light evening show'],
    bestTimeToVisit: 'Early morning at 8 AM or Sunset for Golden Hour photography.',
    recommendedStayHours: '2.5 - 3 Hours',
    proTip: 'Book tickets online to skip the main gate queue and visit the upper Diwan-e-Khas first.'
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    city: 'Jaipur',
    region: 'Pink City',
    category: 'palace',
    categoryLabel: 'Iconic Heritage Landmark',
    x: 72,
    y: 39,
    image: 'https://images.unsplash.com/photo-1603258591321-df626c11d2bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 1890,
    timings: '09:00 AM - 05:00 PM',
    fee: '₹50 (Indians), ₹200 (Foreigners)',
    description: 'A five-story honeycomb structure featuring 953 intricate small windows (Jharokhas) designed for royal ladies to observe street festivals unseen.',
    highlights: ['953 Jharokha windows', 'Rooftop city view of Badi Chaupar', 'Stained glass window glows at sunrise'],
    bestTimeToVisit: 'Morning around 8:30 AM when sunlight hits the pink front facade.',
    recommendedStayHours: '1 Hour',
    proTip: 'Head to the rooftop cafes across the street (Tattoo Cafe or Wind View Cafe) for the famous front view photo!'
  },
  {
    id: 'lake-pichola',
    name: 'Lake Pichola & Jag Mandir',
    city: 'Udaipur',
    region: 'City of Lakes',
    category: 'lake',
    categoryLabel: 'Serene Royal Lake',
    x: 38,
    y: 74,
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1650,
    timings: '09:00 AM - 06:00 PM (Boating till sunset)',
    fee: '₹400 (Day Boat), ₹800 (Sunset Boat)',
    description: 'An iconic freshwater lake surrounded by marble palaces, bathing ghats, and hills. Features the floating Taj Lake Palace and Jag Mandir island sanctuary.',
    highlights: ['Sunset boat cruise', 'Jag Mandir Island palace', 'City Palace water facade', 'Gangaur Ghat views'],
    bestTimeToVisit: '5:00 PM for the sunset boat cruise.',
    recommendedStayHours: '2 Hours',
    proTip: 'The sunset boat ride includes a 20-minute stopover on Jag Mandir Island for refreshments.'
  },
  {
    id: 'city-palace-udaipur',
    name: 'City Palace Udaipur',
    city: 'Udaipur',
    region: 'City of Lakes',
    category: 'palace',
    categoryLabel: 'Royal Residence',
    x: 40,
    y: 72,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 1310,
    timings: '09:30 AM - 05:30 PM',
    fee: '₹300 (Adults), ₹100 (Children)',
    description: 'Rajasthan’s largest palace complex constructed over 400 years by Mewar rulers, featuring peacock mosaic courtyards, mirror halls, and panoramic lake views.',
    highlights: ['Mor Chowk peacock mosaics', 'Crystal Gallery', 'Zenana Mahal courtyard', 'Lake view balconies'],
    bestTimeToVisit: '10 AM before midday tour groups arrive.',
    recommendedStayHours: '3 Hours',
    proTip: 'Hire an official government-licensed guide at the entrance to hear fascinating stories of Mewar kings.'
  },
  {
    id: 'jaisalmer-fort',
    name: 'Jaisalmer Fort (Sonar Qila)',
    city: 'Jaisalmer',
    region: 'Thar Desert',
    category: 'fort',
    categoryLabel: 'Living Golden Fort',
    x: 18,
    y: 38,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1540,
    timings: 'Open 24 Hours (Fort Palace Museum: 09:00 AM - 06:00 PM)',
    fee: 'Free Fort Entry (Museum: ₹100)',
    description: 'One of the world’s few "living forts", where nearly one-fourth of the old city population resides inside golden yellow sandstone walls.',
    highlights: ['Living fort alleyways', 'Intricate Jain Temples inside', 'Rooftop view of Golden City', 'Raj Mahal Palace'],
    bestTimeToVisit: 'Late afternoon around 4 PM when fort walls glow deep gold.',
    recommendedStayHours: '3 - 4 Hours',
    proTip: 'Explore the narrow cobblestone lanes inside the fort on foot to discover hidden handicraft shops and tea stalls.'
  },
  {
    id: 'sam-sand-dunes',
    name: 'Sam Sand Dunes & Desert Camp',
    city: 'Jaisalmer',
    region: 'Thar Desert',
    category: 'safari',
    categoryLabel: 'Desert Adventure',
    x: 12,
    y: 42,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 1120,
    timings: '04:00 PM - 10:00 PM (Overnight Camping Available)',
    fee: '₹500 - ₹2,500 (Camel/Jeep Safari + Cultural Show)',
    description: 'Massive wind-sculpted sand dunes in the Thar Desert. Offers thrilling 4x4 dune bashing, sunset camel rides, and night campfire folk dances.',
    highlights: ['4x4 Dune bashing', 'Sunset camel safari', 'Kalbelia folk music & bonfire night', 'Milky Way stargazing'],
    bestTimeToVisit: '4:30 PM to catch sunset followed by dinner cultural performance.',
    recommendedStayHours: 'Half-day to Overnight',
    proTip: 'Carry a light windbreaker jacket for desert night chill.'
  },
  {
    id: 'mehrangarh-fort',
    name: 'Mehrangarh Fort',
    city: 'Jodhpur',
    region: 'Blue City',
    category: 'fort',
    categoryLabel: 'Imposing Citadel',
    x: 43,
    y: 49,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1980,
    timings: '09:00 AM - 05:00 PM',
    fee: '₹100 (Indians), ₹600 (Foreigners)',
    description: 'Perched 400 feet above the Blue City skyline on a vertical cliff. One of India’s best-preserved forts with palatial galleries, palanquins, and cannons.',
    highlights: ['Phool Mahal (Flower Palace)', 'Panoramic view of Blue Houses', 'Zip-lining (Flying Fox) across fort moats', 'Royal Armory Museum'],
    bestTimeToVisit: '9 AM for clear blue sky photography or 3:30 PM for softer light.',
    recommendedStayHours: '3 Hours',
    proTip: 'Rent the audio guide—it is narrated by the Maharaja of Jodhpur and is world-class!'
  },
  {
    id: 'pushkar-lake',
    name: 'Pushkar Holy Lake & Brahma Temple',
    city: 'Pushkar',
    region: 'Central Sacred Oasis',
    category: 'temple',
    categoryLabel: 'Sacred Pilgrimage Site',
    x: 57,
    y: 45,
    image: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 940,
    timings: 'Open 24 Hours (Temple: 06:00 AM - 08:30 PM)',
    fee: 'Free Entry',
    description: 'A serene holy lake surrounded by 52 bathing ghats and the rare 14th-century Lord Brahma Temple. Famous for the annual colorful Pushkar Camel Fair.',
    highlights: ['Evening Maha Aarti at Varaha Ghat', 'Lord Brahma Temple', 'Rose garden market streets', 'Savitri Temple ropeway'],
    bestTimeToVisit: 'Sunset at Varaha Ghat during evening prayer bells.',
    recommendedStayHours: '2 Hours',
    proTip: 'Remove footwear before stepping onto the sacred lake ghat steps.'
  },
  {
    id: 'ranthambore-park',
    name: 'Ranthambore National Park',
    city: 'Ranthambore',
    region: 'Tiger Reserve',
    category: 'safari',
    categoryLabel: 'Wild Tiger Safari',
    x: 77,
    y: 50,
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 1180,
    timings: '06:30 AM - 10:00 AM (Morning Safari) & 02:30 PM - 06:00 PM (Afternoon Safari)',
    fee: '₹1,000 - ₹2,500 per person (Canter / Gypsy)',
    description: 'A world-famous tiger sanctuary featuring wild Bengal tigers, leopards, and crocodiles roaming historic 10th-century jungle fort ruins.',
    highlights: ['Bengal Tiger sightings', '10th-century Ranthambore Fort ruins', 'Padam Talao lake safari', 'Canter & Gypsy jungle rides'],
    bestTimeToVisit: 'October to April (Zone 1 to 5 offer prime sightings).',
    recommendedStayHours: '3.5 Hours per safari',
    proTip: 'Book your safari 60 days in advance on the Rajasthan Forest Dept portal.'
  },
  {
    id: 'junagarh-bikaner',
    name: 'Junagarh Fort Bikaner',
    city: 'Bikaner',
    region: 'Desert Citadel',
    category: 'fort',
    categoryLabel: 'Unconquered Fortress',
    x: 41,
    y: 26,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 860,
    timings: '10:00 AM - 04:30 PM',
    fee: '₹50 (Indians), ₹300 (Foreigners)',
    description: 'An rare unconquered plains fort built in 1589, featuring lavishly painted gold leaf ceilings, Anup Mahal mirrorwork, and WWII biplane exhibits.',
    highlights: ['Anup Mahal gold leaf room', 'Badal Mahal cloud room', 'Armory & vintage weapons', 'Karni Mata temple excursion'],
    bestTimeToVisit: 'Morning at 10 AM.',
    recommendedStayHours: '2 Hours',
    proTip: 'Pair your visit with a trip to the nearby Karni Mata Deshnoke Rat Temple (30 km away).'
  },
  {
    id: 'mount-abu-dilwara',
    name: 'Dilwara Marble Jain Temples',
    city: 'Mount Abu',
    region: 'Aravalli Hill Station',
    category: 'temple',
    categoryLabel: 'Architectural Marble Wonder',
    x: 30,
    y: 84,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 920,
    timings: '12:00 PM - 06:00 PM (Non-Jains entry starts 12 PM)',
    fee: 'Free Entry',
    description: 'Built between the 11th and 13th centuries, these five white marble Jain shrines feature delicate lace-like ceiling stone carvings considered unparalleled in Asian art.',
    highlights: ['Vimal Vasahi lotus dome ceiling', 'Luna Vasahi marble carvings', 'Cool mountain pine breeze', 'Nakki Lake nearby'],
    bestTimeToVisit: '12 PM sharp when doors open for tourists.',
    recommendedStayHours: '1.5 Hours',
    proTip: 'Leather belts, wallets, and cameras are strictly prohibited inside the sacred marble halls.'
  },
  {
    id: 'chittorgarh-fort',
    name: 'Chittorgarh Fort & Vijay Stambha',
    city: 'Chittorgarh',
    region: 'Mewar Heroic Citadel',
    category: 'fort',
    categoryLabel: 'UNESCO World Heritage Fort',
    x: 54,
    y: 71,
    image: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1250,
    timings: '09:00 AM - 05:00 PM',
    fee: '₹40 (Indians), ₹200 (Foreigners)',
    description: 'Asia’s largest fort complex stretching over 700 acres. Symbol of Rajput valor, featuring the 9-story Vijay Stambha (Tower of Victory) and Rani Padmini Palace.',
    highlights: ['Vijay Stambha (Victory Tower)', 'Rani Padmini Water Palace', 'Gaumukh Reservoir', 'Kirti Stambha'],
    bestTimeToVisit: 'Early morning to explore the vast 700-acre complex comfortably by car.',
    recommendedStayHours: '3.5 - 4 Hours',
    proTip: 'Drive your own car or hire an auto inside the fort premises as distances between structures are large.'
  }
];

export default function PlacesMap({
  addToast,
  onOpenAttractionDetail
}: {
  addToast: (msg: string) => void;
  onOpenAttractionDetail?: (name: string, cat: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlace, setActivePlace] = useState<PlaceLocation | null>(RAJASTHAN_PLACES[0]);
  const [mapStyle, setMapStyle] = useState<'vintage' | 'dark' | 'blueprint'>('vintage');
  
  // Caravan Route Builder State
  const [routePlaces, setRoutePlaces] = useState<string[]>(['amber-fort', 'mehrangarh-fort', 'jaisalmer-fort']);
  const [showRouteDrawer, setShowRouteDrawer] = useState<boolean>(false);

  // Filtered Places
  const filteredPlaces = useMemo(() => {
    return RAJASTHAN_PLACES.filter(place => {
      if (selectedCategory !== 'all' && place.category !== selectedCategory) return false;
      if (selectedCity !== 'all' && place.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          place.name.toLowerCase().includes(q) ||
          place.city.toLowerCase().includes(q) ||
          place.description.toLowerCase().includes(q) ||
          place.categoryLabel.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedCity, searchQuery]);

  // Handle Route Add / Remove
  const toggleRoutePlace = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (routePlaces.includes(id)) {
      if (routePlaces.length <= 1) {
        addToast('⚠️ Keep at least 1 place in your caravan route!');
        return;
      }
      setRoutePlaces(prev => prev.filter(item => item !== id));
      addToast('Removed from caravan route.');
    } else {
      setRoutePlaces(prev => [...prev, id]);
      addToast('🚗 Added to your custom caravan route!');
    }
  };

  // Reorder Route Stops
  const moveRoutePlaceUp = (index: number) => {
    if (index <= 0) return;
    setRoutePlaces(prev => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveRoutePlaceDown = (index: number) => {
    if (index >= routePlaces.length - 1) return;
    setRoutePlaces(prev => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Sync route destinations from user's saved trip plan or wishlist
  const syncFromSavedItinerary = () => {
    try {
      const savedPlanRaw = localStorage.getItem('rajasthan_offline_trip_plan');
      let foundIds: string[] = [];

      if (savedPlanRaw) {
        const parsed = JSON.parse(savedPlanRaw);
        const selectedCities: string[] = parsed?.form?.cities || [];
        if (selectedCities.length > 0) {
          selectedCities.forEach(cityName => {
            const placesInCity = RAJASTHAN_PLACES.filter(p => p.city.toLowerCase() === cityName.toLowerCase());
            placesInCity.forEach(p => {
              if (!foundIds.includes(p.id)) foundIds.push(p.id);
            });
          });
        }
      }

      if (foundIds.length === 0) {
        const wishlistRaw = localStorage.getItem('rajasthan_wishlist');
        if (wishlistRaw) {
          const items = JSON.parse(wishlistRaw);
          items.forEach((item: any) => {
            const place = RAJASTHAN_PLACES.find(p => p.id === item.id || p.name.toLowerCase().includes(item.title.toLowerCase()));
            if (place && !foundIds.includes(place.id)) {
              foundIds.push(place.id);
            }
          });
        }
      }

      if (foundIds.length > 0) {
        setRoutePlaces(foundIds);
        addToast(`🗺️ Loaded ${foundIds.length} destinations from your saved itinerary into your route!`);
        setShowRouteDrawer(true);
      } else {
        addToast('ℹ️ No saved trip plan found yet. Create an itinerary in Smart Planner!');
      }
    } catch (err) {
      addToast('⚠️ Unable to sync saved itinerary.');
    }
  };

  // Apply Preset Routes
  const applyPresetCircuit = (presetKey: string) => {
    if (presetKey === 'golden-triangle') {
      setRoutePlaces(['amber-fort', 'hawa-mahal', 'mehrangarh-fort', 'jaisalmer-fort']);
      addToast('📍 Loaded "Golden Triangle & Desert" preset route!');
    } else if (presetKey === 'lakes-forts') {
      setRoutePlaces(['amber-fort', 'lake-pichola', 'city-palace-udaipur', 'chittorgarh-fort', 'kumbhalgarh-fort']);
      addToast('🌊 Loaded "Royal Lakes & Hill Forts" preset route!');
    } else if (presetKey === 'full-desert') {
      setRoutePlaces(['junagarh-fort', 'jaisalmer-fort', 'sam-sand-dunes', 'mehrangarh-fort', 'ranthambore-national-park']);
      addToast('🐪 Loaded "Grand Thar Desert & Safari" preset route!');
    }
    setShowRouteDrawer(true);
  };

  // Distance & Leg estimation calculation
  const routePlacesData = useMemo(() => {
    return routePlaces.map(id => RAJASTHAN_PLACES.find(p => p.id === id)).filter(Boolean) as PlaceLocation[];
  }, [routePlaces]);

  // Leg Segment Details (From -> To, Distance, Time, Midpoint Coordinates on 800x600 viewBox)
  const routeLegs = useMemo(() => {
    if (routePlacesData.length <= 1) return [];
    const legs = [];
    for (let i = 0; i < routePlacesData.length - 1; i++) {
      const p1 = routePlacesData[i];
      const p2 = routePlacesData[i + 1];
      const dx = (p1.x - p2.x) * 6.5;
      const dy = (p1.y - p2.y) * 6.5;
      const distKm = Math.max(80, Math.round(Math.sqrt(dx * dx + dy * dy)));
      const driveHours = (distKm / 60).toFixed(1);

      // SVG Canvas Midpoint (viewBox 0-800 x 0-600)
      const midX = ((p1.x + p2.x) / 2) * 8;
      const midY = ((p1.y + p2.y) / 2) * 6;

      legs.push({
        id: `leg-${p1.id}-${p2.id}`,
        from: p1,
        to: p2,
        distKm,
        driveHours,
        midX,
        midY,
        fromIndex: i + 1,
        toIndex: i + 2
      });
    }
    return legs;
  }, [routePlacesData]);

  const estimatedTotalKm = useMemo(() => {
    return routeLegs.reduce((sum, leg) => sum + leg.distKm, 0);
  }, [routeLegs]);

  const categoryBadges = {
    fort: { label: 'Forts & Palaces 🏰', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
    palace: { label: 'Royal Haveli 👑', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    lake: { label: 'Lakes & Ghats 🌊', bg: 'bg-sky-100 text-sky-800 border-sky-300' },
    safari: { label: 'Tiger & Dunes 🐅', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    temple: { label: 'Sacred Shrines 🕉️', bg: 'bg-rose-100 text-rose-800 border-rose-300' },
    market: { label: 'Heritage Bazaars 🛍️', bg: 'bg-purple-100 text-purple-800 border-purple-300' }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
          <Compass className="w-96 h-96 text-amber-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5" /> Interactive Royal Places Explorer
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-amber-100 leading-tight">
            Geographic Map of Rajasthan Places
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Click any pin on the interactive map to explore Rajasthan’s premier hill forts, floating palaces, sacred lakes, and desert dune safaris. Build custom caravan route connections and estimate driving distances.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowRouteDrawer(!showRouteDrawer)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 text-xs"
            >
              <Route className="w-4 h-4" /> Caravan Route Planner ({routePlaces.length} Destinations)
            </button>

            <button
              onClick={syncFromSavedItinerary}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 text-xs border border-indigo-400/30"
              title="Load destinations from your saved trip plan"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Saved Itinerary
            </button>

            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 px-3.5 py-2 rounded-xl text-xs text-amber-300 font-mono flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Est. Route: ~{estimatedTotalKm} km (~{(estimatedTotalKm / 60).toFixed(1)} hrs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places (e.g. Amber Fort, Lake Pichola, Jaisalmer)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Place Categories</option>
              <option value="fort">Hill Forts 🏰</option>
              <option value="palace">Royal Palaces 👑</option>
              <option value="lake">Lakes & Ghats 🌊</option>
              <option value="safari">Tiger & Dunes 🐅</option>
              <option value="temple">Sacred Shrines 🕉️</option>
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Cities</option>
              <option value="jaipur">Jaipur (Pink City)</option>
              <option value="udaipur">Udaipur (Lake City)</option>
              <option value="jaisalmer">Jaisalmer (Golden City)</option>
              <option value="jodhpur">Jodhpur (Blue City)</option>
              <option value="pushkar">Pushkar</option>
              <option value="ranthambore">Ranthambore</option>
              <option value="bikaner">Bikaner</option>
              <option value="mount abu">Mount Abu</option>
              <option value="chittorgarh">Chittorgarh</option>
            </select>

            {/* Map Theme Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setMapStyle('vintage')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  mapStyle === 'vintage' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                📜 Royal Vintage
              </button>
              <button
                onClick={() => setMapStyle('dark')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  mapStyle === 'dark' ? 'bg-slate-900 text-amber-300 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                🌙 Imperial Dark
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MAIN SPLIT VIEW: MAP CANVAS (LEFT/TOP) & PLACES DETAILS (RIGHT/BOTTOM) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MAP CANVAS (8 COLS) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-4 shadow-md space-y-3 relative overflow-hidden">
          
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" /> Interactive Canvas Map ({filteredPlaces.length} Pins)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Click pin to inspect place</span>
          </div>

          {/* SVG MAP GRAPHIC WRAPPER */}
          <div
            className={`w-full aspect-[4/3] rounded-2xl relative overflow-hidden transition-all duration-500 border border-slate-300/60 shadow-inner ${
              mapStyle === 'vintage'
                ? 'bg-[#f4ebe1] text-amber-950'
                : 'bg-slate-950 text-slate-100'
            }`}
          >
            
            {/* Background Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Illustrated Rajasthan Boundary & Connected Itinerary SVG Route */}
            <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              <path
                d="M 120 180 Q 250 100 450 120 Q 650 140 720 220 Q 750 380 620 480 Q 420 560 250 540 Q 150 480 90 340 Z"
                fill={mapStyle === 'vintage' ? 'rgba(217, 119, 6, 0.08)' : 'rgba(99, 102, 241, 0.1)'}
                stroke={mapStyle === 'vintage' ? '#b45309' : '#818cf8'}
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* CONNECTED VISUAL ROUTE LINES & LEG DISTANCE CALLOUTS */}
              {routePlacesData.length > 1 && (
                <g>
                  {/* 1. Outer Soft Glowing Trail */}
                  <polyline
                    points={routePlacesData.map(p => `${p.x * 8},${p.y * 6}`).join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeOpacity="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 2. Primary Vibrant Gradient Polyline */}
                  <polyline
                    points={routePlacesData.map(p => `${p.x * 8},${p.y * 6}`).join(' ')}
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 3. Animated White Directional Dash Overlay */}
                  <polyline
                    points={routePlacesData.map(p => `${p.x * 8},${p.y * 6}`).join(' ')}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6 10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse"
                  />

                  {/* 4. Distance Badges at Midpoints of Each Route Segment Leg */}
                  {routeLegs.map((leg) => (
                    <g key={leg.id} className="pointer-events-none">
                      <rect
                        x={leg.midX - 42}
                        y={leg.midY - 12}
                        width="84"
                        height="22"
                        rx="11"
                        fill="#0f172a"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      />
                      <text
                        x={leg.midX}
                        y={leg.midY + 3}
                        fill="#fef3c7"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        🚗 {leg.distKm} km
                      </text>
                    </g>
                  ))}
                </g>
              )}
            </svg>

            {/* Desert Dunes Decorative Label */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 font-serif text-3xl font-extrabold uppercase tracking-widest pointer-events-none rotate-[-45deg]">
              THAR DESERT
            </div>

            {/* Aravalli Range Decorative Line */}
            <div className="absolute right-12 bottom-12 opacity-20 font-serif text-xl font-bold uppercase tracking-widest pointer-events-none rotate-[-30deg]">
              ARAVALLI HILLS
            </div>

            {/* INTERACTIVE PLACE PINS */}
            {filteredPlaces.map((place) => {
              const isActive = activePlace?.id === place.id;
              const inRoute = routePlaces.includes(place.id);
              const routeStopIndex = routePlaces.indexOf(place.id);

              return (
                <div
                  key={place.id}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  onClick={() => setActivePlace(place)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Pin Circle Marker */}
                  <div className="relative flex items-center justify-center">
                    
                    {/* Pulsing ring for active */}
                    {isActive && (
                      <span className="absolute w-8 h-8 rounded-full bg-amber-500/40 animate-ping pointer-events-none" />
                    )}

                    {/* Stop Number Badge on Pin if in Route */}
                    {inRoute && routeStopIndex !== -1 && (
                      <span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center shadow-md border-2 border-white z-30">
                        {routeStopIndex + 1}
                      </span>
                    )}

                    {/* Main Pin Shield */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-125 ${
                        isActive
                          ? 'bg-amber-500 border-white text-slate-950 scale-125 ring-4 ring-amber-500/30'
                          : inRoute
                          ? 'bg-indigo-600 border-amber-400 text-white'
                          : mapStyle === 'vintage'
                          ? 'bg-amber-900 border-amber-200 text-amber-100'
                          : 'bg-slate-800 border-indigo-400 text-white'
                      }`}
                    >
                      <MapPin className="w-4 h-4 fill-current" />
                    </div>

                    {/* Place Name Tooltip Badge */}
                    <div
                      className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-tight shadow-md transition-all duration-300 pointer-events-none ${
                        isActive
                          ? 'bg-slate-900 text-amber-300 scale-100 opacity-100 z-30'
                          : 'bg-white/90 text-slate-800 backdrop-blur-md opacity-80 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                    >
                      {place.name}
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 px-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Selected Place</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> In Caravan Route</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-900 inline-block" /> Rajasthan Place Pin</span>
            </div>
            <span className="font-mono text-[10px]">Coordinates: 26.9124° N, 75.7873° E</span>
          </div>

        </div>

        {/* ACTIVE PLACE DETAIL PANEL (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {activePlace ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5 animate-in fade-in">
              
              {/* Place Cover Photo */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={activePlace.image}
                  alt={activePlace.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {activePlace.categoryLabel}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  ★ {activePlace.rating} ({activePlace.reviewsCount})
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    {activePlace.city} • {activePlace.region}
                  </span>
                  <h3 className="text-xl font-extrabold font-serif leading-tight">
                    {activePlace.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {activePlace.description}
              </p>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" /> Opening Hours
                  </span>
                  <span className="font-bold text-slate-800 text-[11px]">{activePlace.timings}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1">
                    <Coins className="w-3 h-3 text-indigo-600" /> Entrance Ticket
                  </span>
                  <span className="font-bold text-slate-800 text-[11px]">{activePlace.fee}</span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Must-See Highlights:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activePlace.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-amber-50/60 border border-amber-200/60 p-2 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Insider Traveler Tip:
                </span>
                <p className="text-[11px] text-indigo-900 leading-snug">
                  {activePlace.proTip}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => toggleRoutePlace(activePlace.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    routePlaces.includes(activePlace.id)
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  <Route className="w-4 h-4" />
                  <span>{routePlaces.includes(activePlace.id) ? 'Remove from Route' : 'Add to Caravan Route'}</span>
                </button>

                <button
                  onClick={() => {
                    toggleWishlistItem({
                      id: activePlace.id,
                      title: activePlace.name,
                      type: 'attraction',
                      city: activePlace.city,
                      image: activePlace.image,
                      category: activePlace.categoryLabel,
                      description: activePlace.description
                    });
                    addToast(`❤️ Added ${activePlace.name} to Wishlist!`);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-8 text-center space-y-3">
              <MapPin className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Click any pin on the map to view place highlights and details.</p>
            </div>
          )}

          {/* CARAVAN ROUTE DRAWER / ITINERARY PATH PANEL */}
          {showRouteDrawer && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-5 shadow-2xl animate-in fade-in border border-amber-500/30">
              {/* Header & Close */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Route className="w-4 h-4 text-amber-400" /> Connected Itinerary Route
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Reorder stops, calculate drive times, or sync from your saved plan.
                  </p>
                </div>

                <button
                  onClick={() => setShowRouteDrawer(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                  title="Close Route Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Toolbar & Preset Circuit Loader */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Route Presets & Sync:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={syncFromSavedItinerary}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Sync Trip Plan
                  </button>
                  <button
                    onClick={() => applyPresetCircuit('golden-triangle')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-[11px] transition border border-slate-700 cursor-pointer"
                  >
                    🏛️ Golden Triangle
                  </button>
                  <button
                    onClick={() => applyPresetCircuit('lakes-forts')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-[11px] transition border border-slate-700 cursor-pointer"
                  >
                    🌊 Lakes & Forts
                  </button>
                  <button
                    onClick={() => applyPresetCircuit('full-desert')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-[11px] transition border border-slate-700 cursor-pointer"
                  >
                    🐪 Desert Safari
                  </button>
                </div>
              </div>

              {/* Orderable Stops List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Itinerary Stop Sequence ({routePlacesData.length}):</span>
                  <button
                    onClick={() => setRoutePlaces(['amber-fort'])}
                    className="text-rose-400 hover:underline text-[10px]"
                  >
                    Reset Stops
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {routePlacesData.map((place, idx) => (
                    <div
                      key={place.id}
                      className="flex items-center justify-between bg-slate-800/90 p-3 rounded-xl border border-slate-700 text-xs shadow-sm hover:border-amber-500/50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-white block leading-tight">{place.name}</span>
                          <span className="text-[10px] text-amber-300 font-mono">{place.city}</span>
                        </div>
                      </div>

                      {/* Control Buttons: Move Up, Move Down, Remove */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveRoutePlaceUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 text-slate-200 transition"
                          title="Move Stop Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => moveRoutePlaceDown(idx)}
                          disabled={idx === routePlacesData.length - 1}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-slate-700 text-slate-200 transition"
                          title="Move Stop Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleRoutePlace(place.id)}
                          className="p-1 rounded bg-slate-700 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400 transition"
                          title="Remove Stop"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment Leg Distance Breakdown */}
              {routeLegs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Leg-by-Leg Drive Estimate:
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto text-[11px] pr-1">
                    {routeLegs.map((leg) => (
                      <div key={leg.id} className="flex items-center justify-between bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
                        <span className="text-slate-300 font-medium truncate max-w-[170px]">
                          {leg.fromIndex}. {leg.from.city} ➔ {leg.toIndex}. {leg.to.city}
                        </span>
                        <span className="font-mono text-amber-300 font-bold shrink-0">
                          {leg.distKm} km (~{leg.driveHours} hrs)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary Footer */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Route Driving:</span>
                  <span className="font-extrabold font-mono text-amber-400 text-sm">
                    ~{estimatedTotalKm} km ({ (estimatedTotalKm / 60).toFixed(1) } Hours)
                  </span>
                </div>

                <button
                  onClick={() => {
                    const textSummary = `CARAVAN ITINERARY ROUTE:\n${routePlacesData.map((p, i) => `${i + 1}. ${p.name} (${p.city})`).join('\n')}\nTotal Distance: ~${estimatedTotalKm} km`;
                    navigator.clipboard.writeText(textSummary);
                    addToast('📋 Copied Caravan Route summary to clipboard!');
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" /> Copy Summary
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

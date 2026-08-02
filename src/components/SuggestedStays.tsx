import React, { useState, useMemo } from 'react';
import { 
  Hotel, 
  Star, 
  MapPin, 
  Wifi, 
  Coffee, 
  Sparkles, 
  Check, 
  ExternalLink, 
  SlidersHorizontal, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Moon, 
  Utensils, 
  Building2, 
  Tent, 
  Plus, 
  X,
  Heart,
  PhoneCall,
  Info
} from 'lucide-react';

export interface StayProperty {
  id: string;
  name: string;
  city: string;
  type: 'Heritage Palace' | 'Boutique Haveli' | 'Luxury Resort' | 'Desert Camp' | 'Royal Homestay';
  rating: number;
  reviewsCount: number;
  pricePerNightINR: number;
  image: string;
  tagline: string;
  highlights: string[];
  location: string;
  description: string;
  contactNumber?: string;
}

export const RAJASTHAN_STAYS: StayProperty[] = [
  // JAIPUR
  {
    id: 'rambagh-palace-jaipur',
    name: 'Rambagh Palace (Taj)',
    city: 'Jaipur',
    type: 'Heritage Palace',
    rating: 4.9,
    reviewsCount: 2450,
    pricePerNightINR: 32000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    tagline: 'The Jewel of Jaipur — Former residence of the Maharaja of Jaipur',
    highlights: ['Peacock Courtyard', 'Butler Service', 'Royal Vintage Car Escort', 'Jharokha Dining'],
    location: 'Bhawani Singh Road, Jaipur',
    description: 'Walk in the footsteps of kings at this sprawling 47-acre grand palace featuring manicured gardens, indoor marble pool, and opulent Rajasthani architecture.'
  },
  {
    id: 'samode-haveli-jaipur',
    name: 'Samode Haveli',
    city: 'Jaipur',
    type: 'Boutique Haveli',
    rating: 4.8,
    reviewsCount: 1120,
    pricePerNightINR: 14500,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    tagline: 'A 175-year-old urban oasis with hand-painted frescoed suites',
    highlights: ['Frescoed Sheesh Mahal', 'Moorish Pool', 'Puppet Shows', 'Rooftop Fort Views'],
    location: 'Gangapole, Old City Jaipur',
    description: 'An intimate heritage mansion tucked within the historic walled city, famous for its hand-carved balconies, mosaic courtyards, and tranquil swimming pool.'
  },
  {
    id: 'shahpura-house-jaipur',
    name: 'Shahpura House',
    city: 'Jaipur',
    type: 'Royal Homestay',
    rating: 4.7,
    reviewsCount: 980,
    pricePerNightINR: 7800,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    tagline: 'Traditional Rajput hospitality with authentic home-cooked royal cuisine',
    highlights: ['Traditional Thali', 'Rooftop Folk Dance', 'Marble Jharokhas', 'Heritage Walk'],
    location: 'D-257 Devi Marg, Bani Park, Jaipur',
    description: 'An elegant family-run royal residence offering authentic Shekhawati frescoes, regal hospitality, and rooftop dining overlooking Amber Fort hills.'
  },

  // JODHPUR
  {
    id: 'umaid-bhawan-jodhpur',
    name: 'Umaid Bhawan Palace (Taj)',
    city: 'Jodhpur',
    type: 'Heritage Palace',
    rating: 4.9,
    reviewsCount: 3100,
    pricePerNightINR: 42000,
    image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&q=80&w=800',
    tagline: 'One of the world’s largest private royal residences, set high above the Blue City',
    highlights: ['Art Deco Museum', 'Zentai Spa', 'Private Royal Family Wing', 'Champagne Bar'],
    location: 'Circuit House Rd, Jodhpur',
    description: 'Perched on Chittar Hill, this golden sandstone masterpiece blends Beaux-Arts, Art Deco, and classical Indian architecture.'
  },
  {
    id: 'raas-jodhpur',
    name: 'RAAS Jodhpur',
    city: 'Jodhpur',
    type: 'Boutique Haveli',
    rating: 4.8,
    reviewsCount: 1430,
    pricePerNightINR: 18500,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    tagline: 'Jodhpur’s first boutique hotel situated directly beneath Mehrangarh Fort',
    highlights: ['Direct Mehrangarh Fort Views', 'Stepwell Courtyard', 'Red Sandstone Lattice', 'Organic Dining'],
    location: 'Tunwarji ka Jhalra, Makrana Mohalla, Jodhpur',
    description: 'A striking fusion of 18th-century haveli architecture and contemporary luxury, sitting right at the foot of the monumental Mehrangarh Fort.'
  },
  {
    id: 'pal-haveli-jodhpur',
    name: 'Pal Haveli',
    city: 'Jodhpur',
    type: 'Royal Homestay',
    rating: 4.6,
    reviewsCount: 870,
    pricePerNightINR: 6200,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    tagline: 'Living heritage mansion right opposite Clock Tower market',
    highlights: ['Clock Tower Views', 'Indique Rooftop Dining', 'Antiques Collection', 'Central Bazaar Access'],
    location: 'Near Clock Tower, Jodhpur',
    description: 'Maintained by the descendants of the Nobles of Pal, this heritage property offers front-row seats to Jodhpur’s vibrant bazaars and fort views.'
  },

  // UDAIPUR
  {
    id: 'taj-lake-palace-udaipur',
    name: 'Taj Lake Palace',
    city: 'Udaipur',
    type: 'Heritage Palace',
    rating: 4.9,
    reviewsCount: 3800,
    pricePerNightINR: 48000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    tagline: 'Floating white-marble wonderland in the middle of Lake Pichola',
    highlights: ['Boat Transfer Arrival', 'Lily Pond Courtyard', 'Octopussy Movie Location', 'Jharokha Lake Suites'],
    location: 'Lake Pichola, Udaipur',
    description: 'Built in 1746 as a royal summer palace, this legendary island hotel floats magically on Lake Pichola with panoramic views of the City Palace.'
  },
  {
    id: 'jagat-niwas-udaipur',
    name: 'Jagat Niwas Palace',
    city: 'Udaipur',
    type: 'Boutique Haveli',
    rating: 4.7,
    reviewsCount: 1650,
    pricePerNightINR: 9200,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    tagline: 'Early 17th-century haveli on the eastern banks of Lake Pichola',
    highlights: ['Lakeside Jharokha Seating', 'Rooftop Sunset Restaurant', 'Traditional Mewari Decor', 'Lakeside Walk'],
    location: 'Lal Ghat, Udaipur',
    description: 'An exquisitely restored lakeside haveli featuring whitewashed walls, intricate archways, and window seats overhanging the sparkling lake.'
  },

  // JAISALMER
  {
    id: 'suryagarh-jaisalmer',
    name: 'Suryagarh Jaisalmer',
    city: 'Jaisalmer',
    type: 'Luxury Resort',
    rating: 4.9,
    reviewsCount: 2100,
    pricePerNightINR: 26000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    tagline: 'The Gateway to the Thar — A fortress resort surrounded by golden desert sands',
    highlights: ['Desert Sundowners', 'Chinkara Gazelle Spotting', 'Organic Farm Dining', 'Dune Dinners'],
    location: 'Kahala Phata, Sam Road, Jaisalmer',
    description: 'A majestic fort palace constructed from yellow sandstone, offering luxury spa treatments, desert safaris, and starlit Thar banquets.'
  },
  {
    id: 'serai-jaisalmer',
    name: 'The Serai Camp (Suán)',
    city: 'Jaisalmer',
    type: 'Desert Camp',
    rating: 4.9,
    reviewsCount: 740,
    pricePerNightINR: 35000,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
    tagline: 'Ultra-luxurious tented desert camp under the clear Thar desert skies',
    highlights: ['Private Plunge Pool Tents', 'Star Gazing Deck', 'Manganiyar Folk Music', 'Camel Caravans'],
    location: 'Bherwa, Jaisalmer',
    description: 'Set on a 100-acre private estate of desert scrub, The Serai draws inspiration from the royal caravan sites of Rajputana.'
  },
  {
    id: 'hotel-narayan-niwas-jaisalmer',
    name: 'Narayan Niwas Palace',
    city: 'Jaisalmer',
    type: 'Boutique Haveli',
    rating: 4.6,
    reviewsCount: 890,
    pricePerNightINR: 5800,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    tagline: 'Authentic yellow golden sandstone palace near Golden Fort',
    highlights: ['Golden Sandstone Jali Work', 'Pool Side Courtyard', 'Fort View Terrace', 'Camel Safari Desk'],
    location: 'Malka Prol, Jaisalmer',
    description: 'A 19th-century golden structure built with traditional latticework, located minutes away from Jaisalmer Fort gates.'
  },

  // PUSHKAR
  {
    id: 'pushkar-palace-pushkar',
    name: 'Hotel Pushkar Palace',
    city: 'Pushkar',
    type: 'Heritage Palace',
    rating: 4.7,
    reviewsCount: 1100,
    pricePerNightINR: 8500,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    tagline: 'Prime lakeside palace overlooking holy Pushkar Lake and Ghats',
    highlights: ['Direct Lake Ghat Access', 'Maha Aarti Views', 'German Bakery Proximity', 'Royal Family Suites'],
    location: 'Lake Ghat, Pushkar',
    description: 'Formerly the residence of the Maharaja of Kishangarh, offering uninterrupted views of Pushkar Lake and sacred evening chants.'
  },

  // BIKANER
  {
    id: 'bhanwar-niwas-bikaner',
    name: 'Bhanwar Niwas (Rampuruiya Haveli)',
    city: 'Bikaner',
    type: 'Boutique Haveli',
    rating: 4.8,
    reviewsCount: 650,
    pricePerNightINR: 7500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    tagline: 'The grandest of Bikaner’s famous red sandstone Rampuria Havelis',
    highlights: ['Art Deco & Indo-European Fusion', 'Courtyard Tea', 'Red Sandstone Carvings', 'Old City Walk'],
    location: 'Rampuria Street, Bikaner',
    description: 'Built in 1927 by the merchant prince Seth Bhanwarlalji Rampuria, showcasing extraordinary red stone carving and opulent decor.'
  },

  // RANTHAMBORE
  {
    id: 'oberoi-vanyavilas-ranthambore',
    name: 'The Oberoi Vanyavilas Wildlife Resort',
    city: 'Ranthambore',
    type: 'Luxury Resort',
    rating: 4.9,
    reviewsCount: 1540,
    pricePerNightINR: 45000,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
    tagline: 'India’s premier luxury jungle camp adjacent to Ranthambore Tiger Reserve',
    highlights: ['Luxury Canopied Tents', 'Tiger Safari Escorts', 'Observation Tower', 'Private Garden Deck'],
    location: 'Ranthambore Road, Sawai Madhopur',
    description: 'Nestled in 20 acres of lush gardens and lotus ponds, offering royal safari tent accommodation with private walled gardens.'
  },

  // MOUNT ABU
  {
    id: 'cama-rajputana-mount-abu',
    name: 'Cama Rajputana Club Resort',
    city: 'Mount Abu',
    type: 'Heritage Palace',
    rating: 4.6,
    reviewsCount: 780,
    pricePerNightINR: 6800,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    tagline: '135-year-old British Raj club resort set in lush hill country gardens',
    highlights: ['British Raj Billiards Room', 'Squash Courts', 'Pine Tree Lawns', 'Dilwara Temple Escort'],
    location: 'Adhar Devi Road, Mount Abu',
    description: 'A Victorian-era heritage club frequented by British officers and Maharajas, restored into a peaceful hill station retreat.'
  }
];

interface SuggestedStaysProps {
  destinations: string[];
  selectedStays?: Record<string, string>; // city -> stayId mapping
  onSelectStay?: (city: string, stayId: string) => void;
  className?: string;
  nightsPerCity?: number;
}

export default function SuggestedStays({
  destinations,
  selectedStays = {},
  onSelectStay,
  className = '',
  nightsPerCity = 2
}: SuggestedStaysProps) {
  const activeCities = useMemo(() => {
    if (!destinations || destinations.length === 0) return ['Jaipur', 'Jodhpur', 'Udaipur'];
    return Array.from(new Set(destinations));
  }, [destinations]);

  const [selectedCityTab, setSelectedCityTab] = useState<string>(activeCities[0] || 'Jaipur');
  const [filterType, setFilterType] = useState<string>('All');
  const [detailModalStay, setDetailModalStay] = useState<StayProperty | null>(null);

  // Sync tab if destinations change
  React.useEffect(() => {
    if (!activeCities.includes(selectedCityTab)) {
      setSelectedCityTab(activeCities[0] || 'Jaipur');
    }
  }, [activeCities]);

  // Available stays for current city
  const cityStays = useMemo(() => {
    let filtered = RAJASTHAN_STAYS.filter(
      s => s.city.toLowerCase() === selectedCityTab.toLowerCase()
    );

    // Fallback: if no specific stay for a minor city, show top Jaipur/Udaipur stays with city note
    if (filtered.length === 0) {
      filtered = [
        {
          id: `heritage-stay-${selectedCityTab}`,
          name: `Royal Heritage Mansion ${selectedCityTab}`,
          city: selectedCityTab,
          type: 'Boutique Haveli',
          rating: 4.7,
          reviewsCount: 420,
          pricePerNightINR: 6500,
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
          tagline: `Top-rated boutique royal sanctuary in central ${selectedCityTab}`,
          highlights: ['Central Fort Proximity', 'Royal Courtyard Breakfast', 'Rooftop Lounge', 'Local Heritage Escort'],
          location: `Old Town Historic Quarter, ${selectedCityTab}`,
          description: `Handpicked boutique heritage property offering traditional architecture, plush bedding, and curated regional dining in the heart of ${selectedCityTab}.`
        },
        {
          id: `palace-resort-${selectedCityTab}`,
          name: `${selectedCityTab} Fort View Palace`,
          city: selectedCityTab,
          type: 'Heritage Palace',
          rating: 4.8,
          reviewsCount: 310,
          pricePerNightINR: 11000,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
          tagline: `Palatial resort with panoramic views of ${selectedCityTab} landmarks`,
          highlights: ['Swimming Pool', 'Folk Dance Nights', 'Spa & Wellness', 'Butler Assistance'],
          location: `Palace Road, ${selectedCityTab}`,
          description: `A regal estate designed in authentic Rajput architecture with extensive gardens, fine dining, and cultural performances.`
        }
      ];
    }

    if (filterType !== 'All') {
      filtered = filtered.filter(s => s.type === filterType);
    }

    return filtered;
  }, [selectedCityTab, filterType]);

  // Compute total accommodation cost for current trip selections
  const totalTripStayCost = useMemo(() => {
    let sum = 0;
    activeCities.forEach(city => {
      const selectedId = selectedStays[city];
      const found = RAJASTHAN_STAYS.find(s => s.id === selectedId);
      if (found) {
        sum += found.pricePerNightINR * nightsPerCity;
      } else {
        // Average estimate if not explicitly chosen
        sum += 8500 * nightsPerCity;
      }
    });
    return sum;
  }, [activeCities, selectedStays, nightsPerCity]);

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6 ${className}`}>
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <Hotel className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Suggested Heritage Stays & Haveli Properties
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curated palatial stays, boutique havelis, and desert camps tailored to your trip destinations.
          </p>
        </div>

        {/* Total Accommodation Cost Badge */}
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 shrink-0 text-right space-y-0.5">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-end gap-1">
            <Sparkles className="w-3 h-3" /> Est. Total Accommodation:
          </div>
          <div className="text-base font-black font-mono text-white">
            ₹{totalTripStayCost.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Based on {activeCities.length} cities × ~{nightsPerCity} nights/city
          </div>
        </div>
      </div>

      {/* City Navigation Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
          Select Destination to View Stays:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {activeCities.map((cityName) => {
            const isSelected = selectedCityTab.toLowerCase() === cityName.toLowerCase();
            const lockedStayId = selectedStays[cityName];
            const lockedStay = RAJASTHAN_STAYS.find(s => s.id === lockedStayId);

            return (
              <button
                key={cityName}
                onClick={() => setSelectedCityTab(cityName)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{cityName}</span>
                {lockedStay && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs" title={`Locked in: ${lockedStay.name}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Category Filter */}
      <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
        <span className="font-bold text-slate-600 flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" /> Style:
        </span>

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {['All', 'Heritage Palace', 'Boutique Haveli', 'Luxury Resort', 'Desert Camp', 'Royal Homestay'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition shrink-0 cursor-pointer ${
                filterType === type
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Stays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cityStays.map((stay) => {
          const isSelectedForCity = selectedStays[stay.city] === stay.id;

          return (
            <div
              key={stay.id}
              className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md ${
                isSelectedForCity
                  ? 'border-2 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-amber-400'
              }`}
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 font-extrabold text-[11px] px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{stay.rating}</span>
                  <span className="text-slate-400 font-normal">({stay.reviewsCount})</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
                  {stay.type}
                </div>

                {/* City & Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block font-mono">
                    📍 {stay.city}
                  </span>
                  <h4 className="font-extrabold text-base text-white truncate leading-tight">
                    {stay.name}
                  </h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 line-clamp-2 italic font-medium">
                    "{stay.tagline}"
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {stay.highlights.slice(0, 3).map((hl, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting Tariff:</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      ₹{stay.pricePerNightINR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal"> / night</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setDetailModalStay(stay)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    {onSelectStay && (
                      <button
                        onClick={() => onSelectStay(stay.city, stay.id)}
                        className={`px-3.5 py-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer ${
                          isSelectedForCity
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isSelectedForCity ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-amber-400" />
                            <span>Lock Stay</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Property Detail Modal */}
      {detailModalStay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header Image */}
            <div className="relative h-56 bg-slate-900 shrink-0">
              <img
                src={detailModalStay.image}
                alt={detailModalStay.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setDetailModalStay(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded font-mono">
                  {detailModalStay.type}
                </span>
                <h3 className="font-extrabold text-xl text-white tracking-tight mt-1">
                  {detailModalStay.name}
                </h3>
                <p className="text-xs text-amber-300 font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {detailModalStay.location}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Guest Rating:</span>
                  <div className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{detailModalStay.rating} / 5</span>
                    <span className="text-xs text-slate-500 font-normal">({detailModalStay.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Tariff / Night:</span>
                  <span className="text-lg font-black font-mono text-slate-900">
                    ₹{detailModalStay.pricePerNightINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Property Overview:</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {detailModalStay.description}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Royal Amenities & Experiences:</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {detailModalStay.highlights.map((hl, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200/70 p-2 rounded-lg text-amber-900 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between shrink-0">
              <button
                onClick={() => setDetailModalStay(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Back to Stays
              </button>

              {onSelectStay && (
                <button
                  onClick={() => {
                    onSelectStay(detailModalStay.city, detailModalStay.id);
                    setDetailModalStay(null);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Lock as {detailModalStay.city} Stay
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

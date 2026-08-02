import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  Sparkles,
  PartyPopper,
  Music,
  Heart,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Star,
  Info
} from 'lucide-react';
import { toggleWishlistItem } from '../utils/wishlist';

export interface FestivalEvent {
  id: string;
  name: string;
  hindiName?: string;
  month: number; // 1 - 12
  monthName: string;
  dates: string;
  city: string;
  category: 'music' | 'fair' | 'cultural' | 'religious' | 'royal';
  categoryLabel: string;
  image: string;
  description: string;
  highlights: string[];
  crowdExpectation: 'High' | 'Very High' | 'Moderate';
  entryType: 'Free Entry' | 'Ticketed' | 'Pass Required';
}

export const RAJASTHAN_FESTIVALS: FestivalEvent[] = [
  {
    id: 'jaipur-lit-fest',
    name: 'Jaipur Literature Festival (JLF)',
    hindiName: 'जयपुर साहित्य उत्सव',
    month: 1,
    monthName: 'January',
    dates: 'Jan 28 - Feb 01',
    city: 'Jaipur',
    category: 'cultural',
    categoryLabel: 'Global Literature & Arts',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'The world’s largest free literary festival bringing together Nobel laureates, poets, thinkers, and artists in the magnificent Diggi Palace.',
    highlights: ['Author keynotes & book signings', 'Evening heritage music concerts', 'Art installation lawn lounges'],
    crowdExpectation: 'Very High',
    entryType: 'Free Entry'
  },
  {
    id: 'bikaner-camel-fest',
    name: 'Bikaner Camel Festival',
    hindiName: 'बीकानेर ऊँट उत्सव',
    month: 1,
    monthName: 'January',
    dates: 'Jan 13 - Jan 15',
    city: 'Bikaner',
    category: 'fair',
    categoryLabel: 'Royal Desert Fair',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'An exuberantly colorful spectacle celebrating the ship of the desert with decorated camels, fur cutting competitions, and Rajasthani folk dances.',
    highlights: ['Camel fur haircut artwork', 'Fur dance & camel races', 'Fire dancers from Thar Desert'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  },
  {
    id: 'jaisalmer-desert-fest',
    name: 'Jaisalmer Desert Festival (Maru Mahotsav)',
    hindiName: 'जैसलमेर मरु महोत्सव',
    month: 2,
    monthName: 'February',
    dates: 'Feb 12 - Feb 15',
    city: 'Jaisalmer',
    category: 'fair',
    categoryLabel: 'Desert Folk Heritage',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    description: 'Held amidst the golden Sam Sand Dunes with traditional turban tying contests, longest mustache pageants, and Kalbelia dance under moonlit dunes.',
    highlights: ['Mr. Desert & Mustache Pageant', 'Sam Dunes bonfire night concerts', 'Turban tying competition'],
    crowdExpectation: 'Very High',
    entryType: 'Free Entry'
  },
  {
    id: 'nagaur-fair',
    name: 'Nagaur Cattle & Folk Fair',
    hindiName: 'नागौर पशु मेला',
    month: 2,
    monthName: 'February',
    dates: 'Feb 05 - Feb 08',
    city: 'Nagaur',
    category: 'fair',
    categoryLabel: 'Rural Heritage Fair',
    image: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?auto=format&fit=crop&w=800&q=80',
    description: 'India’s second largest cattle fair where thousands of traders gather in traditional attire alongside camel races, tug-of-war, and puppet shows.',
    highlights: ['Bullock & camel trading', 'Traditional puppet theater', 'Cockfighting & folk sports'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  },
  {
    id: 'elephant-fest-jaipur',
    name: 'Jaipur Elephant Festival',
    hindiName: 'जयपुर हाथी उत्सव',
    month: 3,
    monthName: 'March',
    dates: 'Mar 14 (Holi Eve)',
    city: 'Jaipur',
    category: 'royal',
    categoryLabel: 'Royal Pageantry',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    description: 'Elephants painted with traditional organic pigments, draped in velvet rugs and gold jewelry, parade down Jaipur streets with royal fanfare.',
    highlights: ['Best decorated elephant contest', 'Elephant polo matches', 'Holi color play & Chang music'],
    crowdExpectation: 'Very High',
    entryType: 'Free Entry'
  },
  {
    id: 'gangaur-festival',
    name: 'Royal Gangaur Festival',
    hindiName: 'गणगौर उत्सव',
    month: 3,
    monthName: 'March',
    dates: 'Mar 28 - Mar 29',
    city: 'Jaipur & Udaipur',
    category: 'religious',
    categoryLabel: 'Sacred Royal Tradition',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Women worship Goddess Gauri for marital bliss, carrying idol processions accompanied by royal brass bands, caparisoned horses, and palanquins.',
    highlights: ['Grand City Palace procession', 'Floating brass idols on Lake Pichola', 'Traditional Ghoomar dance'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  },
  {
    id: 'mewar-festival',
    name: 'Mewar Spring Festival',
    hindiName: 'मेवाड़ महोत्सव',
    month: 4,
    monthName: 'April',
    dates: 'Apr 02 - Apr 04',
    city: 'Udaipur',
    category: 'cultural',
    categoryLabel: 'Spring Heritage Fest',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    description: 'Welcomes the arrival of spring in the City of Lakes with decorated boat processions ending in magnificent fireworks over Lake Pichola.',
    highlights: ['Lake Pichola boat procession', 'Heritage fireworks display', 'Gangaur Ghat folk stage'],
    crowdExpectation: 'Moderate',
    entryType: 'Free Entry'
  },
  {
    id: 'mount-abu-summer',
    name: 'Mount Abu Summer Festival',
    hindiName: 'माउंट आबू ग्रीष्मकालीन उत्सव',
    month: 5,
    monthName: 'May',
    dates: 'May 22 - May 24',
    city: 'Mount Abu',
    category: 'cultural',
    categoryLabel: 'Hill Station Carnival',
    image: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&w=800&q=80',
    description: 'Held in Rajasthan’s only hill station against the backdrop of Nakki Lake, featuring classical ballad singing, boat races, and CRPF band performance.',
    highlights: ['Nakki Lake boat races', 'Dhamal folk dance', 'Deepdan (floating lamps) ceremony'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  },
  {
    id: 'teej-festival',
    name: 'Teej Monsoon Festival',
    hindiName: 'तीज महोत्सव',
    month: 7,
    monthName: 'July',
    dates: 'Jul 26 - Jul 27',
    city: 'Jaipur',
    category: 'religious',
    categoryLabel: 'Monsoon Celebration',
    image: 'https://images.unsplash.com/photo-1603258591321-df626c11d2bc?auto=format&fit=crop&w=800&q=80',
    description: 'Marks the arrival of monsoon rains. Goddess Parvati palanquin moves through Walled City Jaipur with folk dancers, swings decorated with flowers, and Ghevar sweets.',
    highlights: ['Royal Teej Mata palanquin', 'Jaipur bazaars decorated in green', 'Ghevar sweet tasting'],
    crowdExpectation: 'Very High',
    entryType: 'Free Entry'
  },
  {
    id: 'kajli-teej-bundi',
    name: 'Kajli Teej Fair',
    hindiName: 'कजली तीज बूँदी',
    month: 8,
    monthName: 'August',
    dates: 'Aug 18 - Aug 19',
    city: 'Bundi',
    category: 'fair',
    categoryLabel: 'Heritage Town Fair',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Bundi’s unique variation of Teej featuring a month-long handicraft bazaar, traditional wrestler bouts, and nighttime cultural shows at Garh Palace.',
    highlights: ['Garh Palace illuminated parade', 'Local wrestling competitions', 'Hadoti handicraft market'],
    crowdExpectation: 'Moderate',
    entryType: 'Free Entry'
  },
  {
    id: 'marwar-festival',
    name: 'Jodhpur Marwar Festival',
    hindiName: 'मारवाड़ उत्सव',
    month: 10,
    monthName: 'October',
    dates: 'Oct 16 - Oct 17',
    city: 'Jodhpur',
    category: 'music',
    categoryLabel: 'Folk Music & Valor',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Devoted to the folk music and romantic folklore of Marwar heroes, held at Mehrangarh Fort and Umaid Bhawan Palace courtyards under full moon skies.',
    highlights: ['Mehrangarh Fort night concerts', 'Turban tying show', 'Camel tattoo show by BSF'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  },
  {
    id: 'pushkar-fair',
    name: 'Pushkar Camel & Cultural Fair',
    hindiName: 'पुष्कर ऊँट एवं सांस्कृतिक मेला',
    month: 11,
    monthName: 'November',
    dates: 'Nov 11 - Nov 19',
    city: 'Pushkar',
    category: 'fair',
    categoryLabel: 'World Famous Heritage Fair',
    image: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?auto=format&fit=crop&w=800&q=80',
    description: 'Over 50,000 camels and livestock gather at the edge of Thar desert alongside hot air balloon flights, sacred lake baths, and fusion folk music stages.',
    highlights: ['Hot air balloon rides', 'Maha Aarti at Varaha Ghat', 'Matka race & mustache contest'],
    crowdExpectation: 'Very High',
    entryType: 'Free Entry'
  },
  {
    id: 'ranakpur-fest',
    name: 'Ranakpur Music & Culture Festival',
    hindiName: 'राणाकपुर संगीत उत्सव',
    month: 12,
    monthName: 'December',
    dates: 'Dec 21 - Dec 22',
    city: 'Ranakpur (Pali)',
    category: 'music',
    categoryLabel: 'Sufi & Folk Music',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    description: 'Organized by Rajasthan Tourism against the carved marble pillars of Ranakpur Temple, featuring classical Indian music maestros and open-air hot air ballooning.',
    highlights: ['Illuminated Ranakpur Jain Temple', 'Classical Kathak & Sufi music', 'Nature walks in Aravalli hills'],
    crowdExpectation: 'Moderate',
    entryType: 'Free Entry'
  },
  {
    id: 'winter-festival-abu',
    name: 'Mount Abu Winter Festival',
    hindiName: 'माउंट आबू शीतकालीन उत्सव',
    month: 12,
    monthName: 'December',
    dates: 'Dec 29 - Dec 31',
    city: 'Mount Abu',
    category: 'cultural',
    categoryLabel: 'Year-End Carnival',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrates the cultural rich vibrancy of Rajasthan with Sufi singers, floating diyas on Nakki Lake, and New Year fireworks over mountain peaks.',
    highlights: ['New Year midnight fireworks', 'Floating oil lamp procession', 'CRPF brass band concert'],
    crowdExpectation: 'High',
    entryType: 'Free Entry'
  }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function FestivalCalendarWidget({
  addToast
}: {
  addToast?: (msg: string) => void;
}) {
  const currentMonthNum = new Date().getMonth() + 1; // 1-12
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthNum);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFestivals = RAJASTHAN_FESTIVALS.filter(f => {
    if (selectedMonth !== 0 && f.month !== selectedMonth) return false;
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    return true;
  });

  const nextMonth = () => {
    setSelectedMonth(prev => (prev === 12 ? 1 : prev + 1));
  };

  const prevMonth = () => {
    setSelectedMonth(prev => (prev === 1 ? 12 : prev - 1));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
      
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" /> Rajasthan Cultural Calendar
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
            Upcoming Royal Festivals & Fairs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Plan your travel itinerary around Rajasthan’s magnificent camel fairs, folk music galas, and sacred heritage celebrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Event Types</option>
            <option value="fair">Desert & Camel Fairs 🐪</option>
            <option value="cultural">Literature & Heritage 🎭</option>
            <option value="music">Folk & Sufi Music 🎵</option>
            <option value="religious">Religious Traditions 🕉️</option>
            <option value="royal">Royal Pageantry 👑</option>
          </select>

          <button
            onClick={() => setSelectedMonth(0)}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
              selectedMonth === 0
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            View All Months
          </button>
        </div>
      </div>

      {/* Month Navigation Control Ribbon */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl shadow-md border border-slate-800">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
            {selectedMonth === 0 ? 'All 12 Months' : 'Selected Month'}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold font-serif text-amber-300">
            {selectedMonth === 0 ? 'Full Calendar Year' : `${MONTH_NAMES[selectedMonth - 1]} Events`}
            {selectedMonth === currentMonthNum && (
              <span className="ml-2 text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full uppercase font-mono">
                Current Month
              </span>
            )}
          </h3>
        </div>

        <button
          onClick={nextMonth}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Month Chips Quick Picker */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {MONTH_NAMES.map((mName, idx) => {
          const mNum = idx + 1;
          const isSelected = selectedMonth === mNum;
          const isCurrent = mNum === currentMonthNum;

          return (
            <button
              key={mNum}
              onClick={() => setSelectedMonth(mNum)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                  : isCurrent
                  ? 'bg-slate-800 text-amber-300 border-slate-700'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mName.slice(0, 3)}
              {isCurrent && <span className="ml-1 text-[8px] bg-amber-400/30 text-amber-950 px-1 rounded">NOW</span>}
            </button>
          );
        })}
      </div>

      {/* FESTIVALS DISPLAY GRID */}
      {filteredFestivals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFestivals.map((fest) => (
            <div
              key={fest.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Header Overlay */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Date Badge */}
                <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 border border-slate-700 font-extrabold text-[11px] px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CalendarIcon className="w-3 h-3 text-amber-400" /> {fest.dates}
                </span>

                {/* Category Badge */}
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {fest.categoryLabel}
                </span>

                {/* Location & Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> {fest.city}, Rajasthan
                  </span>
                  <h3 className="text-base font-extrabold font-serif leading-snug line-clamp-1">
                    {fest.name}
                  </h3>
                  {fest.hindiName && (
                    <span className="text-[11px] text-slate-300 font-serif block">
                      {fest.hindiName}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {fest.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Festival Highlights:
                  </span>
                  <div className="space-y-1">
                    {fest.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Meta & Save Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 space-x-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">
                      Crowd: {fest.crowdExpectation}
                    </span>
                    <span className="text-emerald-700 font-bold">{fest.entryType}</span>
                  </div>

                  <button
                    onClick={() => {
                      toggleWishlistItem({
                        id: fest.id,
                        title: fest.name,
                        type: 'culture',
                        city: fest.city,
                        image: fest.image,
                        category: fest.categoryLabel,
                        description: fest.description
                      });
                      if (addToast) addToast(`🎉 Added ${fest.name} to your Wishlist!`);
                    }}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition cursor-pointer"
                    title="Save Festival to Wishlist"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
          <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-500 font-medium">No festival events match the selected category for this month.</p>
          <button
            onClick={() => { setSelectedMonth(0); setSelectedCategory('all'); }}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

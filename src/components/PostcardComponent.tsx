import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  Heart,
  Star,
  MapPin,
  PenTool,
  Search,
  Filter,
  Share2,
  ThumbsUp,
  RotateCw,
  Plus,
  CheckCircle2,
  MessageSquare,
  Compass,
  Download,
  Award,
  BookOpen,
  Coffee,
  Lightbulb,
  X
} from 'lucide-react';
import { Postcard } from '../types';

export const POSTCARD_THEMES = [
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal Pink Palace',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-700 to-rose-900'
  },
  {
    id: 'lake-pichola',
    name: 'Lake Pichola Twilight',
    city: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-800 to-indigo-950'
  },
  {
    id: 'jaisalmer-fort',
    name: 'Golden Thar Dunes',
    city: 'Jaisalmer',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-600 to-yellow-800'
  },
  {
    id: 'blue-city',
    name: 'Mehrangarh & Blue Streets',
    city: 'Jodhpur',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    color: 'from-sky-700 to-blue-900'
  },
  {
    id: 'ranthambore-tiger',
    name: 'Royal Tiger Jungle',
    city: 'Ranthambore',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-800 to-teal-950'
  }
];

export const POSTCARD_STAMPS = [
  { id: 'sun', label: 'Jaipur Sun Seal ₹5', symbol: '☀️', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'elephant', label: 'Royal Elephant ₹10', symbol: '🐘', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'camel', label: 'Desert Camel ₹15', symbol: '🐫', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'peacock', label: 'Majestic Peacock ₹20', symbol: '🦚', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
];

export const INITIAL_POSTCARDS: Postcard[] = [
  {
    id: 'pc-1',
    authorName: 'Aarav Sharma',
    authorLocation: 'Mumbai, India',
    destination: 'Jaipur',
    category: 'food_tip',
    headline: 'Must-Try: Rawat Pyaaz Kachori in Jaipur!',
    message: 'If you visit Jaipur, do not miss the piping hot Pyaaz Kachori at Rawat Mishthan Bhandar near Station Road. Pair it with sweet Lassi for the ultimate royal breakfast. Arrive before 9 AM to avoid long queues!',
    rating: 5,
    themeImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    stampType: 'sun',
    date: '2026-07-15',
    likes: 42,
    userLiked: false
  },
  {
    id: 'pc-2',
    authorName: 'Elena Rostova',
    authorLocation: 'Prague, Czechia',
    destination: 'Udaipur',
    category: 'experience',
    headline: 'Magical Sunset Boat Ride on Lake Pichola',
    message: 'Taking the 5:30 PM sunset boat trip from Rameshwar Ghat was the highlight of our 2-week India journey. Seeing the Lake Palace light up as twilight falls is pure magic. Bring a light jacket as breeze cools down.',
    rating: 5,
    themeImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    stampType: 'peacock',
    date: '2026-07-20',
    likes: 68,
    userLiked: false
  },
  {
    id: 'pc-3',
    authorName: 'Vikram & Meera',
    authorLocation: 'Bengaluru, India',
    destination: 'Jaisalmer',
    category: 'suggestion',
    headline: 'Stargazing at Sam Sand Dunes Night Camp',
    message: 'Suggestion for fellow travelers: Book a luxury tented camp away from main Sam road to avoid loud music speaker noise. The night sky over Sam Sand Dunes offers breathtaking views of the Milky Way!',
    rating: 5,
    themeImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    stampType: 'camel',
    date: '2026-07-22',
    likes: 35,
    userLiked: false
  },
  {
    id: 'pc-4',
    authorName: 'David Miller',
    authorLocation: 'London, UK',
    destination: 'Jodhpur',
    category: 'heritage_tip',
    headline: 'Best Viewpoint of Mehrangarh Fort',
    message: 'Skip the crowd at the main gate for photos! Walk up to Pachetia Hill viewpoint in the old Blue City around sunrise. You get an unhindered panoramic view of the fortress towering over blue rooftops.',
    rating: 5,
    themeImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    stampType: 'elephant',
    date: '2026-07-25',
    likes: 51,
    userLiked: false
  }
];

export default function PostcardComponent({ addToast }: { addToast: (msg: string) => void }) {
  const [postcards, setPostcards] = useState<Postcard[]>(() => {
    const saved = localStorage.getItem('rajasthan_postcards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_POSTCARDS; }
    }
    return INITIAL_POSTCARDS;
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New Postcard Form State
  const [form, setForm] = useState({
    authorName: '',
    authorLocation: '',
    destination: 'Jaipur',
    category: 'experience' as Postcard['category'],
    headline: '',
    message: '',
    rating: 5,
    themeImage: POSTCARD_THEMES[0].image,
    stampType: 'sun' as Postcard['stampType']
  });

  const [previewFlipped, setPreviewFlipped] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('rajasthan_postcards', JSON.stringify(postcards));
  }, [postcards]);

  const toggleCardFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostcards(prev => prev.map(card => {
      if (card.id === id) {
        const isLiked = card.userLiked;
        if (!isLiked) addToast('❤️ Added to liked postcards!');
        return {
          ...card,
          likes: isLiked ? card.likes - 1 : card.likes + 1,
          userLiked: !isLiked
        };
      }
      return card;
    }));
  };

  const handleSubmitPostcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName.trim() || !form.headline.trim() || !form.message.trim()) {
      addToast('⚠️ Please fill in all required fields on your postcard!');
      return;
    }

    const newPostcard: Postcard = {
      id: 'pc-' + Date.now(),
      authorName: form.authorName.trim(),
      authorLocation: form.authorLocation.trim() || 'Traveler',
      destination: form.destination,
      category: form.category,
      headline: form.headline.trim(),
      message: form.message.trim(),
      rating: form.rating,
      themeImage: form.themeImage,
      stampType: form.stampType,
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      userLiked: true
    };

    setPostcards(prev => [newPostcard, ...prev]);
    setShowCreateModal(false);
    setForm({
      authorName: '',
      authorLocation: '',
      destination: 'Jaipur',
      category: 'experience',
      headline: '',
      message: '',
      rating: 5,
      themeImage: POSTCARD_THEMES[0].image,
      stampType: 'sun'
    });
    addToast('📬 Postcard published successfully to the Royal Gallery!');
  };

  // Filtered Postcards
  const filteredPostcards = postcards.filter(card => {
    if (filterCategory !== 'all' && card.category !== filterCategory) return false;
    if (filterCity !== 'all' && card.destination.toLowerCase() !== filterCity.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        card.headline.toLowerCase().includes(q) ||
        card.message.toLowerCase().includes(q) ||
        card.authorName.toLowerCase().includes(q) ||
        card.destination.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'suggestion': return { label: 'Suggestion 💡', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'food_tip': return { label: 'Food & Cuisine 🍛', bg: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'heritage_tip': return { label: 'Heritage Tip 🏰', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'experience': return { label: 'Travel Story 📖', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default: return { label: 'Review ⭐', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const getStampSymbol = (st: string) => {
    const found = POSTCARD_STAMPS.find(s => s.id === st);
    return found ? found.symbol : '☀️';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 opacity-10 pointer-events-none">
          <Mail className="w-96 h-96 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" /> Royal Traveler Postcard Wall
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-amber-100 leading-tight">
            Greetings & Memories from Rajasthan
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Write and collect vintage travel postcards! Share your personal suggestions, secret food spots, unforgettable experiences, and cultural advice with travelers around the world.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg hover:shadow-amber-500/20 transition cursor-pointer flex items-center gap-2 text-sm"
            >
              <PenTool className="w-4 h-4" /> Write & Mail a Postcard
            </button>

            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{postcards.length} Postcards in Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search postcards by keyword, author, or city..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
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
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-amber-600" /> Filter:
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="suggestion">Suggestions 💡</option>
              <option value="experience">Travel Stories 📖</option>
              <option value="food_tip">Food & Local Tips 🍛</option>
              <option value="heritage_tip">Heritage Advice 🏰</option>
              <option value="general">Reviews ⭐</option>
            </select>

            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Cities</option>
              <option value="jaipur">Jaipur</option>
              <option value="udaipur">Udaipur</option>
              <option value="jaisalmer">Jaisalmer</option>
              <option value="jodhpur">Jodhpur</option>
              <option value="ranthambore">Ranthambore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Postcards Grid Display */}
      {filteredPostcards.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl space-y-3">
          <Mail className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Postcards Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No traveler postcards match your current filters. Be the first to write one for this category!
          </p>
          <button
            onClick={() => { setFilterCategory('all'); setFilterCity('all'); setSearchQuery(''); }}
            className="mt-2 text-xs font-semibold text-amber-600 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPostcards.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            const badge = getCategoryBadge(card.category);
            const stampSymbol = getStampSymbol(card.stampType);

            return (
              <div
                key={card.id}
                className="group relative perspective-1000 min-h-[380px] cursor-pointer"
                onClick={() => toggleCardFlip(card.id)}
              >
                {/* Vintage Card Container */}
                <div
                  className={`w-full h-full duration-700 transition-all transform-style-3d shadow-md hover:shadow-2xl rounded-2xl border-2 border-amber-900/20 bg-amber-50/40 relative overflow-hidden ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  
                  {/* FRONT SIDE (Visual Vintage Image Card) */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 rounded-2xl overflow-hidden bg-cover bg-center text-white ${
                      isFlipped ? 'hidden' : 'flex'
                    }`}
                    style={{ backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.2)), url(${card.themeImage})` }}
                  >
                    {/* Top Row: Vintage Stamp & Category */}
                    <div className="flex items-start justify-between z-10">
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider backdrop-blur-md shadow-sm ${badge.bg}`}>
                        {badge.label}
                      </span>

                      {/* Flip Prompt Badge */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCardFlip(card.id); }}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition shadow-xs"
                      >
                        <RotateCw className="w-3 h-3" /> Flip to Read
                      </button>
                    </div>

                    {/* Bottom Row: Title, Destination & Author */}
                    <div className="space-y-3 z-10">
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" /> {card.destination}, Rajasthan
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold font-serif text-amber-100 leading-snug drop-shadow-md">
                        "{card.headline}"
                      </h3>

                      <div className="flex items-center justify-between border-t border-white/20 pt-3 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                            {card.authorName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-white block text-xs">{card.authorName}</span>
                            <span className="text-[10px] text-slate-300">{card.authorLocation}</span>
                          </div>
                        </div>

                        {/* Like Button */}
                        <button
                          onClick={(e) => handleLike(card.id, e)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold transition ${
                            card.userLiked
                              ? 'bg-rose-600 text-white border border-rose-400'
                              : 'bg-white/20 text-white hover:bg-white/40 border border-white/30'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${card.userLiked ? 'fill-current' : ''}`} />
                          <span>{card.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Classic Handwritten Postcard Layout) */}
                  <div
                    className={`w-full h-full min-h-[380px] p-6 rounded-2xl bg-amber-50/90 border-2 border-amber-950/20 text-slate-800 flex flex-col justify-between relative font-serif ${
                      !isFlipped ? 'hidden' : 'flex'
                    }`}
                  >
                    {/* Postcard Background Lines & Stamp Mark */}
                    <div className="flex items-start justify-between border-b-2 border-amber-900/20 pb-4">
                      {/* Left Header */}
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-900 font-sans font-bold block">
                          ROYAL POSTCARD SERVICE • RAJASTHAN
                        </span>
                        <span className="text-xs font-bold text-slate-600 font-sans flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-rose-600" /> {card.destination} • {card.date}
                        </span>
                      </div>

                      {/* Right Stamp & Postmark Seal */}
                      <div className="flex items-center gap-3">
                        {/* Circular Postmark Cancellation Seal */}
                        <div className="w-12 h-12 rounded-full border-2 border-amber-900/40 border-dashed flex items-center justify-center rotate-[-12deg] p-1 text-center text-[8px] font-sans font-extrabold uppercase text-amber-900/60 leading-none">
                          ROYAL POST<br />OFFICE<br />JAIPUR
                        </div>

                        {/* Postage Stamp Box */}
                        <div className="w-12 h-14 border-2 border-amber-800 border-dashed rounded bg-amber-100 flex flex-col items-center justify-center shadow-xs text-amber-900 p-1">
                          <span className="text-lg">{stampSymbol}</span>
                          <span className="text-[8px] font-bold uppercase font-sans">INDIA</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section: Written Message & Address Column */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4 flex-1">
                      {/* Written Message Side */}
                      <div className="space-y-3 border-r-0 sm:border-r border-amber-900/20 pr-0 sm:pr-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm italic font-serif border-b border-amber-900/10 pb-1 mb-2">
                            "{card.headline}"
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed italic font-serif">
                            {card.message}
                          </p>
                        </div>

                        {/* Rating & Category */}
                        <div className="pt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < card.rating ? 'text-amber-500 fill-amber-500' : 'text-amber-200'
                                }`}
                              />
                            ))}
                            <span className="text-[10px] text-amber-900 font-sans font-bold ml-1">
                              ({card.rating}/5 Rating)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recipient / Author Address Side */}
                      <div className="flex flex-col justify-between pl-0 sm:pl-2 space-y-4 font-sans text-xs">
                        <div className="space-y-2 text-slate-600">
                          <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider border-b border-amber-900/20 pb-1">
                            MAILED BY:
                          </div>
                          <div className="font-extrabold text-slate-900 text-sm font-serif italic">
                            {card.authorName}
                          </div>
                          <div className="text-[11px] text-slate-600 border-b border-amber-900/20 pb-1">
                            From: {card.authorLocation}
                          </div>
                          <div className="text-[11px] text-slate-600 border-b border-amber-900/20 pb-1">
                            To: Fellow Travelers of Rajasthan
                          </div>
                          <div className="text-[11px] text-slate-600 border-b border-amber-900/20 pb-1">
                            World Heritage Explorer Club
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToast('🔗 Postcard link copied to clipboard!');
                            }}
                            className="text-[10px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200"
                          >
                            <Share2 className="w-3 h-3" /> Share
                          </button>

                          <button
                            onClick={(e) => { e.stopPropagation(); toggleCardFlip(card.id); }}
                            className="text-[10px] font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1"
                          >
                            <RotateCw className="w-3 h-3" /> Flip Back
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer barcode line */}
                    <div className="border-t border-amber-900/20 pt-2 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase">
                      <span>PC-ID: #{card.id.toUpperCase()}</span>
                      <span>||| |||| || | ||||| ||||</span>
                      <span>DEST: {card.destination.toUpperCase()}</span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE POSTCARD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-serif">
                    Compose a Rajasthan Postcard
                  </h3>
                  <p className="text-xs text-slate-500">Share suggestions, tips, or travel stories on the wall.</p>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Postcard Form */}
            <form onSubmit={handleSubmitPostcard} className="space-y-5 text-xs">
              
              {/* Theme & Stamp Selection */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 uppercase tracking-wider block">
                  1. Choose Postcard Card Photo Theme:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {POSTCARD_THEMES.map(theme => (
                    <button
                      type="button"
                      key={theme.id}
                      onClick={() => setForm(f => ({ ...f, themeImage: theme.image, destination: theme.city }))}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition text-left p-2 flex flex-col justify-end cursor-pointer ${
                        form.themeImage === theme.image
                          ? 'border-amber-500 ring-2 ring-amber-500/50 shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(${theme.image})`, backgroundSize: 'cover' }}
                    >
                      <span className="text-[10px] font-bold text-white leading-tight">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.authorName}
                    onChange={(e) => setForm(f => ({ ...f, authorName: e.target.value }))}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your City / Country</label>
                  <input
                    type="text"
                    value={form.authorLocation}
                    onChange={(e) => setForm(f => ({ ...f, authorLocation: e.target.value }))}
                    placeholder="e.g. New Delhi / London"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Destination & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rajasthan City</label>
                  <select
                    value={form.destination}
                    onChange={(e) => setForm(f => ({ ...f, destination: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="Jaipur">Jaipur</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Jaisalmer">Jaisalmer</option>
                    <option value="Jodhpur">Jodhpur</option>
                    <option value="Pushkar">Pushkar</option>
                    <option value="Ranthambore">Ranthambore</option>
                    <option value="Bikaner">Bikaner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Postcard Type / Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(f => ({ ...f, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="suggestion">Suggestion / Secret Tip 💡</option>
                    <option value="experience">Travel Story / Experience 📖</option>
                    <option value="food_tip">Food & Restaurant Tip 🍛</option>
                    <option value="heritage_tip">Heritage & Temple Tip 🏰</option>
                    <option value="general">General Review ⭐</option>
                  </select>
                </div>
              </div>

              {/* Title & Message */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Postcard Title / Headline *</label>
                <input
                  type="text"
                  required
                  value={form.headline}
                  onChange={(e) => setForm(f => ({ ...f, headline: e.target.value }))}
                  placeholder="e.g. Best Sunset spot overlooking Jal Mahal or Secret Dhaba!"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Written Message & Experience *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Share your personal suggestions, memorable moment, prices, timing advice, or warnings..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Stamp Choice & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Postage Stamp Seal:</label>
                  <div className="flex gap-2">
                    {POSTCARD_STAMPS.map(stamp => (
                      <button
                        type="button"
                        key={stamp.id}
                        onClick={() => setForm(f => ({ ...f, stampType: stamp.id as any }))}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer flex-1 ${
                          form.stampType === stamp.id
                            ? 'bg-amber-100 border-amber-500 text-amber-900 ring-2 ring-amber-500/30'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xl block">{stamp.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rating for Rajasthan Experience:</label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setForm(f => ({ ...f, rating: star }))}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition ${
                            star <= form.rating
                              ? 'text-amber-400 fill-amber-400 scale-110'
                              : 'text-slate-200 hover:text-amber-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Mail Postcard to Wall
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

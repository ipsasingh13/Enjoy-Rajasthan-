import {
  BookOpen,
  ChefHat,
  Compass,
  Crown,
  Eye,
  Flame,
  Heart,
  Info,
  Map,
  MapPin,
  Music,
  Palette,
  Route,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { vectorMapNodes } from '../data';
import { WishlistItem } from '../types';
import { clearWishlist, getWishlist, isWishlisted, toggleWishlistItem } from '../utils/wishlist';
import TransportationSection from './TransportationSection';
import SeasonalTravelGuide from './SeasonalTravelGuide';
import FestivalCalendarWidget from './FestivalCalendarWidget';
import TripSummary from './TripSummary';

interface HeritageItem {
  id: string;
  category: 'arts' | 'crafts' | 'cuisine';
  categoryName: string;
  title: string;
  region: string;
  image: string;
  shortDesc: string;
  history: string;
  highlights: string[];
  materialsOrIngredients: string[];
  bestPlacesToBuyOrExperience: string;
  proTip: string;
}

export default function Explore({ 
  destinations, 
  toggleMapCity,
  setDestinations
}: { 
  destinations: string[]; 
  toggleMapCity: (c: string) => void;
  setDestinations?: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'arts' | 'crafts' | 'cuisine' | 'transport'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);

  useEffect(() => {
    const syncWishlist = () => {
      setSavedFavorites(getWishlist().map(w => w.id));
    };
    syncWishlist();
    window.addEventListener('wishlist-updated', syncWishlist);
    return () => window.removeEventListener('wishlist-updated', syncWishlist);
  }, []);

  const toggleFavorite = (item: HeritageItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const wishItem: WishlistItem = {
      id: item.id,
      title: item.title,
      type: item.category === 'cuisine' ? 'food' : 'culture',
      city: item.region.split(',')[0],
      image: item.image,
      category: item.categoryName,
      description: item.shortDesc
    };
    toggleWishlistItem(wishItem);
  };


  const heritageItems: HeritageItem[] = [
    // PERFORMING ARTS & HERITAGE
    {
      id: 'ghoomar-dance',
      category: 'arts',
      categoryName: 'Performing Arts',
      title: 'Ghoomar Royal Dance',
      region: 'Udaipur, Jaipur & Marwar',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'A mesmerizing traditional folk dance performed by royal women in swirling Ghagras.',
      history: 'Originally developed by the Bhil tribe to worship Goddess Saraswati and later embraced by Rajput royalty for victory celebrations.',
      highlights: ['Swirling twirls (Ghoom)', 'Traditional Dhol & Nagada beats', 'Veiled dancer elegance (Ghoonghat)'],
      materialsOrIngredients: ['Zari Ghagra-Choli', 'Royal Rajasthani Ornaments', 'Traditional Percussion'],
      bestPlacesToBuyOrExperience: 'City Palace Udaipur during Gangaur, Bagore Ki Haveli Dharohar show.',
      proTip: 'Catch the sunset Dharohar Folk Dance performance at Bagore Ki Haveli in Udaipur for authentic live Ghoomar.'
    },
    {
      id: 'kalbelia-dance',
      category: 'arts',
      categoryName: 'Performing Arts',
      title: 'Kalbelia Snake Charmer Dance',
      region: 'Jaisalmer, Jodhpur & Pali',
      image: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Inscribed on UNESCO Intangible Cultural Heritage list, known for serpentine fluid movements.',
      history: 'Performed by the nomadic Kalbelia tribe whose ancestral occupation was catching venomous snakes and trading cobra venom.',
      highlights: ['Been (Pungi) music rhythms', 'Black embroidered flowing costumes', 'Acrobatic backbends & flexibility'],
      materialsOrIngredients: ['Black silk costume with silver thread', 'Been acoustic pipe', 'Khartal wooden clappers'],
      bestPlacesToBuyOrExperience: 'Desert camps in Sam Sand Dunes Jaisalmer, Pushkar Fair grounds.',
      proTip: 'Experience this performance around a bonfire under desert stars in Jaisalmer.'
    },
    {
      id: 'kathputli-puppetry',
      category: 'arts',
      categoryName: 'Performing Arts',
      title: 'Kathputli String Puppetry',
      region: 'Nagaur, Jaipur & Jodhpur',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Ancient puppet storytelling bringing legends of Amar Singh Rathore and folklore to life.',
      history: 'Crafted by the Bhat community for over 1,000 years, Kathputli combines "Kath" (wood) and "Putli" (doll).',
      highlights: ['Whistle narration (Boli)', 'Handcrafted wooden puppets', 'Live Dholak background score'],
      materialsOrIngredients: ['Mango wood', 'Rajasthani cloth scraps', 'Cotton strings & whistles'],
      bestPlacesToBuyOrExperience: 'Chokhi Dhani Jaipur, Bharatiya Lok Kala Mandal Udaipur.',
      proTip: 'You can buy authentic handmade puppets directly from artisan families in Jaipur craft bazaars.'
    },
    {
      id: 'maand-langa-music',
      category: 'arts',
      categoryName: 'Performing Arts',
      title: 'Maand & Langa-Manganiyar Folk Music',
      region: 'Barmer, Jaisalmer & Bikaner',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Haunting desert melodies played on rare bowed Sarangi and Kamaicha string instruments.',
      history: 'Hereditary Muslim musician communities (Manganiyars and Langas) who sang in royal courts for generations.',
      highlights: ['Acoustic Sarangi & Kamaicha', 'Khartal wooden rhythm castanets', 'Poetic desert ballads'],
      materialsOrIngredients: ['Goat-hide bowed Kamaicha', 'Sheesham wood Sarangi', 'Teakwood Khartal'],
      bestPlacesToBuyOrExperience: 'Jaisalmer Fort courtyard music sessions, RIFF Festival Jodhpur.',
      proTip: 'Listen for the world-famous song "Kesariya Balam" welcoming travelers to Rajasthan.'
    },

    // IMPERIAL CRAFTSMANSHIP
    {
      id: 'blue-pottery-jaipur',
      category: 'crafts',
      categoryName: 'Master Crafts',
      title: 'Jaipur Blue Pottery',
      region: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Turquoise-glazed decorative pottery crafted without clay using quartz stone powder.',
      history: 'Introduced by Maharaja Sawai Ram Singh II in 19th century who sent court painters to Delhi to learn Turko-Persian glazing techniques.',
      highlights: ['Clay-free formula (Quartz & glass)', 'Cobalt oxide blue & copper green motifs', 'Hand-painted floral patterns'],
      materialsOrIngredients: ['Quartz stone powder', 'Glass', 'Multani Mitti', 'Gum & Cobalt oxide'],
      bestPlacesToBuyOrExperience: 'Kripal Kumbh Jaipur, Kot Jewar village workshops, Sanganer Craft Hub.',
      proTip: 'Authentic blue pottery is impervious to water and does not develop cracks like traditional earthenware.'
    },
    {
      id: 'sanganeri-block-print',
      category: 'crafts',
      categoryName: 'Master Crafts',
      title: 'Sanganeri & Bagru Block Printing',
      region: 'Sanganer & Bagru (Jaipur)',
      image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Hand-stamped cotton fabrics using hand-carved teakwood blocks and organic vegetable dyes.',
      history: 'A 500-year-old textile art practiced by Chhipa community artisans along the riverbanks of Bagru.',
      highlights: ['Hand-carved teak wooden blocks', 'Natural dyes (Indigo, Harda, Pomegranate)', 'Distinctive floral & geometric motifs'],
      materialsOrIngredients: ['Teakwood printing blocks', 'Natural Indigo dye', 'Organic Cotton & Silk'],
      bestPlacesToBuyOrExperience: 'Bagru Textiles Village, Anokhi Museum of Hand Printing Amber Jaipur.',
      proTip: 'Visit the Anokhi Museum near Amber Fort to witness live block-carving and printing workshops.'
    },
    {
      id: 'meenakari-kundan',
      category: 'crafts',
      categoryName: 'Master Crafts',
      title: 'Meenakari & Kundan Jewelry',
      region: 'Jaipur & Nathdwara',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Exquisite gold enameling technique embedded with uncut diamonds and precious gemstones.',
      history: 'Brought to Jaipur court by Raja Man Singh I from Lahore in the 16th century, fusing Mughal & Rajput metalwork.',
      highlights: ['Enameled reverse side artwork', 'Refined foil setting (Kundan)', 'Rubies, Emeralds & Uncut Polki Diamonds'],
      materialsOrIngredients: ['24k/22k Pure Gold', 'Mineral enamel colors', 'Uncut Polki diamonds'],
      bestPlacesToBuyOrExperience: 'Johari Bazaar Jaipur, Bada Bazaar Udaipur, Nathdwara Temple street.',
      proTip: 'Flip over authentic Kundan jewelry: the back side features intricate hand-enameled Meenakari artwork.'
    },
    {
      id: 'thewa-art',
      category: 'crafts',
      categoryName: 'Master Crafts',
      title: 'Thewa Gold-on-Glass Art',
      region: 'Pratapgarh',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Intricate 23-karat pure gold filigree sheet work fused onto colorful Belgian glass.',
      history: 'Invented in the 1700s by Nathu Ji Soni; awarded royal patronage by Maharawat Sumant Singh.',
      highlights: ['23k Gold sheet micro-carving', 'Vibrant red, green & blue glass base', 'GI Tag protected craft'],
      materialsOrIngredients: ['23k Gold foil', 'Treated Belgian glass', 'Secret herbal binder'],
      bestPlacesToBuyOrExperience: 'Pratapgarh Soni Artisan Haveli studios, Royal emporiums in Jaipur.',
      proTip: 'The master technique remains a closely guarded secret passed down within the Rajsoni family.'
    },
    {
      id: 'leather-mojri',
      category: 'crafts',
      categoryName: 'Master Crafts',
      title: 'Jodhperi Leather Mojris & Jutis',
      region: 'Jodhpur & Jaipur',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Hand-stitched leather footwear embellished with silk thread, mirrors, and brass zardosi.',
      history: 'Crafted for Rajput rulers for comfortable walking across desert sand and court ceremonies.',
      highlights: ['Curved pointed toe design', 'No left or right shoe distinction initially', 'Brass thread Zardosi stitching'],
      materialsOrIngredients: ['Tanned leather', 'Silk embroidery thread', 'Brass sequins & mirrors'],
      bestPlacesToBuyOrExperience: 'Moti Bazaar Jodhpur, Bapu Bazaar Jaipur, Clock Tower Jodhpur.',
      proTip: 'Apply a little coconut oil to new mojris for a soft, custom fit that moulds to your feet.'
    },

    // ROYAL CUISINE
    {
      id: 'dal-baati-churma',
      category: 'cuisine',
      categoryName: 'Royal Cuisine',
      title: 'Dal Baati Churma',
      region: 'Pan-Rajasthan (Jaipur & Jodhpur)',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'The iconic 3-in-1 meal featuring hard baked wheat balls, spiced lentil curry, and ghee churma.',
      history: 'Created during wartime in Mewar where baked baatis could stay fresh in desert heat for days.',
      highlights: ['Cow ghee drenched Baati', 'Five-lentil Panchmel Dal', 'Sweet cardamon-infused Churma'],
      materialsOrIngredients: ['Coarse wheat flour', 'Desi Ghee', 'Yellow Moong & Chana dal', 'Jaggery/Sugar'],
      bestPlacesToBuyOrExperience: 'Chokhi Dhani Jaipur, Laxmi Mishthan Bhandar (LMB), Natraj Dining Udaipur.',
      proTip: 'Crush the Baati into your bowl, pour generous hot ghee and spiced Dal over it for authentic taste.'
    },
    {
      id: 'laal-maas',
      category: 'cuisine',
      categoryName: 'Royal Cuisine',
      title: 'Royal Laal Maas',
      region: 'Jodhpur, Mewar & Shekhawati',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Fiery red mutton curry slow-cooked with Mathania red chillies, mustard oil, and garlic.',
      history: 'A royal hunting dish created in palace kitchens to mask the gaminess of wild game meat.',
      highlights: ['Mathania red chilli paste', 'Kachri desert wild cucumber tenderizer', 'Smoky charcoal dum infusion'],
      materialsOrIngredients: ['Tender Mutton', 'Mathania Red Chillies', 'Mustard Oil', 'Garlic & Curd'],
      bestPlacesToBuyOrExperience: '15 AD Jodhpur, Handi Restaurant Jaipur, Spice Court Jaipur.',
      proTip: 'Mathania chillies provide deep crimson color and rich flavor rather than raw burning heat.'
    },
    {
      id: 'ghevar-sweet',
      category: 'cuisine',
      categoryName: 'Royal Cuisine',
      title: 'Royal Malai Rabri Ghevar',
      region: 'Jaipur & Shekhawati',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Honeycomb-textured disc sweet soaked in saffron syrup, topped with thick Rabri and pistachio.',
      history: 'A sacred sweet specially associated with Teej, Gangaur, and monsoon royal festivities.',
      highlights: ['Crispy honeycomb web texture', 'Saffron sugar syrup dip', 'Thick Rabri cream & Silver leaf (Vark)'],
      materialsOrIngredients: ['Flour (Maida)', 'Desi Ghee', 'Saffron', 'Thickened milk (Rabri)', 'Pistachios'],
      bestPlacesToBuyOrExperience: 'LMB Johari Bazaar Jaipur, Sodhani Sweets Jaipur, Rawat Mishthan Bhandar.',
      proTip: 'Enjoy fresh Malai Ghevar during monsoon months for peak crispness and richness.'
    },
    {
      id: 'ker-sangri',
      category: 'cuisine',
      categoryName: 'Royal Cuisine',
      title: 'Ker Sangri Desert Beans',
      region: 'Jaisalmer, Bikaner & Marwar',
      image: 'https://images.unsplash.com/photo-1603258591321-df626c11d2bc?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'A dry delicacy made from wild desert berries (Ker) and dried bean pods (Sangri).',
      history: 'Born out of desert necessity when green vegetables were scarce during severe droughts.',
      highlights: ['Tangy dried Ker berries', 'Nutritious Khejri tree Sangri pods', 'Cooked in mustard oil & spices'],
      materialsOrIngredients: ['Ker wild berries', 'Sangri pods', 'Dry mango powder (Amchur)', 'Mustard oil'],
      bestPlacesToBuyOrExperience: 'Trio Restaurant Jaisalmer, Chokhi Dhani, Traditional Marwari homes.',
      proTip: 'Pairs fantastically with hot Bajra (pearl millet) Roti topped with white homemade butter.'
    },
    {
      id: 'pyaaz-kachori-bikaneri-bhujia',
      category: 'cuisine',
      categoryName: 'Royal Cuisine',
      title: 'Pyaaz Kachori & Bikaneri Bhujia',
      region: 'Jaipur, Jodhpur & Bikaner',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      shortDesc: 'Flaky fried pastry stuffed with spiced onion and crispy moth-bean crispy Bhujia.',
      history: 'Bikaneri Bhujia was first crafted in 1898 during the reign of Maharaja Shri Dungar Singh.',
      highlights: ['GI Tagged Bikaneri Bhujia', 'Steaming hot crisp Pyaaz Kachori', 'Served with sweet tamarind chutney'],
      materialsOrIngredients: ['Moth bean flour', 'Nigella seeds', 'Spiced onion filling', 'Ground asafoetida'],
      bestPlacesToBuyOrExperience: 'Rawat Mishthan Bhandar Jaipur, Jodhpur Sweet Home, Bikaji Bikaner.',
      proTip: 'Rawat in Jaipur serves over 10,000 fresh Pyaaz Kachoris daily; best eaten piping hot at breakfast.'
    }
  ];

  const filteredItems = heritageItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const hasCity = (cityName: string) => destinations.includes(cityName);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-500">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5" /> Royal Cultural Treasures
        </div>
        <h2 className="text-4xl text-slate-900 font-extrabold tracking-tight">Heritage, Craftsmanship & Cuisine</h2>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          Immerse your senses in centuries of imperial dance, UNESCO master crafts, and palace feast traditions across Rajasthan.
        </p>
        <div className="h-[2px] w-24 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Seasonal Travel Guide Section */}
      <SeasonalTravelGuide />

      {/* Cultural Festival Calendar Widget */}
      <FestivalCalendarWidget />

      {/* Search & Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Collections', icon: Compass, count: heritageItems.length },
              { id: 'arts', label: 'Performing Arts', icon: Music, count: heritageItems.filter(i => i.category === 'arts').length },
              { id: 'crafts', label: 'Master Crafts', icon: Palette, count: heritageItems.filter(i => i.category === 'crafts').length },
              { id: 'cuisine', label: 'Royal Cuisine', icon: Utensils, count: heritageItems.filter(i => i.category === 'cuisine').length },
              { id: 'transport', label: 'Inter-City Transit', icon: Route, count: 6 },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search crafts, dishes, dances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {savedFavorites.length > 0 && (
          <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 rounded-xl px-4 py-2 text-xs text-amber-900">
            <span className="font-semibold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              You have {savedFavorites.length} saved cultural experiences in your wishlist!
            </span>
            <button 
              onClick={() => clearWishlist()}
              className="text-[10px] underline font-medium text-amber-800 hover:text-amber-950 cursor-pointer"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>

      {/* Grid Display or Transportation Section depending on tab */}
      {activeTab === 'transport' ? (
        <TransportationSection />
      ) : (
        <>
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-3">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-md font-bold text-slate-700">No cultural items match your search</h3>
              <p className="text-xs text-slate-500">Try searching for "Jaipur", "Dance", "Ghevar", or clear your filter.</p>
              <button 
                onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => {
                const isFav = savedFavorites.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 group hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img 
                          src={item.image} 
                          loading="lazy" 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                          alt={item.title} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        
                        {/* Badge & Favorite Button */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-xs border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-400" /> {item.categoryName}
                          </span>
                          <button
                            onClick={(e) => toggleFavorite(item, e)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                              isFav ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-900/50 text-white hover:bg-slate-900/80'
                            }`}
                            title="Save to Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] font-medium text-indigo-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {item.region}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                          {item.shortDesc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {item.highlights.slice(0, 2).map((hl, idx) => (
                            <span key={idx} className="bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium px-2 py-0.5 rounded-md">
                              ✓ {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Explore Story & Details
                      </span>
                      <span>➔</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Transportation Section displayed in 'All Collections' view */}
          {activeTab === 'all' && (
            <div className="pt-4">
              <TransportationSection />
            </div>
          )}
        </>
      )}

      {/* Interactive Map Grid Explorer */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-2xl text-slate-900 font-bold tracking-tight">
              Interactive Caravan Route & Heritage Map
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click on any city on the map coordinate grid to toggle it in your custom Rajasthan itinerary. The route connects your destinations live!
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">Active Caravan Route String:</p>
              <p className="text-slate-800 text-xs font-semibold">
                {destinations.join(' ➔ ') || 'No cities selected. Click a city node on map grid.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 relative bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden h-[420px]">
            <svg className="w-full h-full" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <pattern id="geoGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e2e8f0" strokeOpacity="1" strokeWidth="1"/>
              </pattern>
              <rect width="500" height="400" fill="url(#geoGrid)" />

              <polygon points="120,80 180,60 260,70 320,50 380,80 420,130 450,210 400,280 340,320 280,350 200,340 130,290 80,240 60,160" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />

              {destinations.length > 1 && (
                <g stroke="#6366f1" strokeWidth="3" strokeDasharray="6 6">
                  {hasCity('Jaipur') && hasCity('Jodhpur') && <line x1="320" y1="160" x2="230" y2="180" className="animate-pulse" />}
                  {hasCity('Jodhpur') && hasCity('Jaisalmer') && <line x1="230" y1="180" x2="110" y2="190" className="animate-pulse" />}
                  {hasCity('Jodhpur') && hasCity('Udaipur') && <line x1="230" y1="180" x2="210" y2="290" className="animate-pulse" />}
                  {hasCity('Jaipur') && hasCity('Udaipur') && <line x1="320" y1="160" x2="210" y2="290" className="animate-pulse" />}
                  {hasCity('Jaipur') && hasCity('Pushkar') && <line x1="320" y1="160" x2="280" y2="175" className="animate-pulse" />}
                  {hasCity('Pushkar') && hasCity('Jodhpur') && <line x1="280" y1="175" x2="230" y2="180" className="animate-pulse" />}
                </g>
              )}

              {vectorMapNodes.map(node => (
                <g key={node.name} className="cursor-pointer group" onClick={() => toggleMapCity(node.name)}>
                  {hasCity(node.name) && (
                    <circle cx={node.x} cy={node.y} r="16" fill="none" stroke="#6366f1" strokeWidth="2" className="animate-ping" opacity="0.4" />
                  )}
                  <circle cx={node.x} cy={node.y} r={hasCity(node.name) ? "8" : "6"} fill={hasCity(node.name) ? '#4f46e5' : '#cbd5e1'} stroke="#ffffff" strokeWidth="2" className="shadow-sm" />
                  <text x={node.x} y={node.y - 14} textAnchor="middle" className="text-[11px] fill-slate-700 font-bold select-none group-hover:fill-indigo-600 transition duration-200 drop-shadow-sm">
                    {node.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Live Trip Summary & Distance Logistics Panel */}
        <TripSummary 
          destinations={destinations}
          onDestinationsChange={(newDests) => {
            if (setDestinations) {
              setDestinations(newDests);
            }
          }}
          title="Active Route Summary & Travel Logistics"
        />
      </div>

      {/* Detail Modal for Selected Heritage Item */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 relative">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 rounded-xl overflow-hidden bg-slate-100">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-md border border-indigo-500/30">
                  {selectedItem.categoryName}
                </span>
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {selectedItem.region}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Royal History & Heritage
                </h4>
                <p className="leading-relaxed text-slate-600">{selectedItem.history}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Key Features & Highlights
                  </h5>
                  <ul className="space-y-1 text-slate-600">
                    {selectedItem.highlights.map((hl, i) => (
                      <li key={i}>• {hl}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-indigo-600" /> Materials / Ingredients Used
                  </h5>
                  <ul className="space-y-1 text-slate-600">
                    {selectedItem.materialsOrIngredients.map((mat, i) => (
                      <li key={i}>• {mat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50/80 border border-indigo-100 p-4 rounded-xl space-y-2">
                <h5 className="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-indigo-600" /> Best Places to Buy & Experience
                </h5>
                <p className="text-slate-700">{selectedItem.bestPlacesToBuyOrExperience}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Traveler's Pro Tip: </strong>
                  {selectedItem.proTip}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => toggleFavorite(selectedItem.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  savedFavorites.includes(selectedItem.id)
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${savedFavorites.includes(selectedItem.id) ? 'fill-white' : ''}`} />
                {savedFavorites.includes(selectedItem.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl text-xs transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

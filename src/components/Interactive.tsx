import { BookOpen, Camera, Compass, Copy, Crown, Footprints, HeartHandshake, MailOpen, Shirt, Sparkles, Utensils } from 'lucide-react';
import React, { useState } from 'react';

export default function Interactive({ addToast }: { addToast: (msg: string) => void }) {
  const [cardMessage, setCardMessage] = useState('');
  const [cardSignature, setCardSignature] = useState('');

  const copyPostcardText = () => {
    const textToCopy = `Postcard Greeting from Rajasthan!\n\nMessage: ${cardMessage || 'Hello from the sand dunes!'}\nSignature: ${cardSignature || 'Your Maharaja Friend'}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      addToast("Postcard copied to your clipboard!");
    });
  };

  const [activeCultureCategory, setActiveCultureCategory] = useState<'all' | 'greetings' | 'clothing' | 'dining' | 'temples'>('all');

  const culturalTips = [
    {
      id: 'greetings-1',
      category: 'greetings',
      categoryName: 'Etiquette & Greetings',
      icon: HeartHandshake,
      title: 'Royal Greetings ("Khamma Ghani")',
      description: 'Greet locals with "Khamma Ghani" (traditional Rajasthani greeting) or "Namaste" with folded hands. It shows warm respect for local heritage.',
      doText: 'Fold hands at chest level and smile warmly.',
      dontText: 'Avoid overly aggressive handshakes with rural elders or women unless offered first.'
    },
    {
      id: 'greetings-2',
      category: 'greetings',
      categoryName: 'Etiquette & Greetings',
      icon: Camera,
      title: 'Photography Permission',
      description: 'Rajasthan is incredibly colorful, but always ask politely ("Photo le sakte hain?") before taking close-up portraits of villagers or artists.',
      doText: 'Seek permission first, especially in rural villages.',
      dontText: 'Do not photograph worshippers during intimate temple rituals or bathing at ghats.'
    },
    {
      id: 'clothing-1',
      category: 'clothing',
      categoryName: 'Clothing & Attire',
      icon: Shirt,
      title: 'Modest & Breathable Dress Code',
      description: 'Opt for lightweight cotton fabrics that cover shoulders and knees. This provides sun protection and respects conservative temple norms.',
      doText: 'Wear breathable linens, wide hats, and UV sunglasses.',
      dontText: 'Avoid tight or overly revealing attire when visiting sacred shrines or rural heritage forts.'
    },
    {
      id: 'clothing-2',
      category: 'clothing',
      categoryName: 'Clothing & Attire',
      icon: Crown,
      title: 'Head Coverings & Scarves',
      description: 'Carry a cotton scarf or stole. Covering your head is required at shrines like Ajmer Sharif Dargah, Khatu Shyam Ji, and Gurudwaras.',
      doText: 'Keep a lightweight scarf handy in your daypack.',
      dontText: 'Never enter a sacred inner sanctum bare-headed where head covering rules apply.'
    },
    {
      id: 'dining-1',
      category: 'dining',
      categoryName: 'Dining & Hospitality',
      icon: Utensils,
      title: 'Warm Hospitality ("Atithi Devo Bhava")',
      description: '"The Guest is God" is the cornerstone of Rajasthani culture. Accept offered masala chai or water graciously when visiting royal havelis or shops.',
      doText: 'Use your right hand for eating, passing dishes, or giving money.',
      dontText: 'Avoid using your left hand for passing food or sacred items.'
    },
    {
      id: 'dining-2',
      category: 'dining',
      categoryName: 'Dining & Hospitality',
      icon: Sparkles,
      title: 'Authentic Thali Etiquette',
      description: 'Rajasthani Thalis (Dal Bati Churma, Ker Sangri) are traditionally eaten with hands. Clean handwashing stations are provided at all restaurants.',
      doText: 'Taste local specialties like Ghevar, Pyaaz Kachori, and Laal Maas.',
      dontText: 'Avoid wasting food on your thali; take smaller portions first.'
    },
    {
      id: 'temples-1',
      category: 'temples',
      categoryName: 'Sacred Temples & Shrines',
      icon: Footprints,
      title: 'Shoe & Leather Removal',
      description: 'Remove shoes before entering all temples, mosques, and homes. Certain Jain shrines (e.g. Dilwara) also restrict leather belts and bags.',
      doText: 'Wear easy slip-on sandals or carry a cloth shoe-bag.',
      dontText: 'Do not carry leather accessories into Jain or specific orthodox Hindu sanctums.'
    },
    {
      id: 'temples-2',
      category: 'temples',
      categoryName: 'Sacred Temples & Shrines',
      icon: BookOpen,
      title: 'Clockwise Walk (Parikrama)',
      description: 'When walking around temple altars or sacred Pushkar Lake ghats, always walk in a clockwise direction (Parikrama) as a mark of devotion.',
      doText: 'Walk clockwise and maintain a calm, quiet demeanor.',
      dontText: 'Do not step onto the sacred bathing steps (ghats) with shoes on.'
    }
  ];

  const filteredTips = activeCultureCategory === 'all' 
    ? culturalTips 
    : culturalTips.filter(tip => tip.category === activeCultureCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-500">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="font-bold text-3xl text-slate-900">Cultural & Interactive Hub</h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Craft customized digital postcards, etiquette guides, and local customs</p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        {/* Postcard */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-slate-900 flex items-center"><MailOpen className="mr-2 w-5 h-5 text-indigo-600" /> Design Your Royal Postcard</h3>
            <p className="text-xs text-slate-500">Compose customized messages inside a digital postcard to share with family & friends.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 my-6 rounded-xl relative overflow-hidden shadow-inner">
            <div className="absolute inset-2 border border-slate-200 bg-white shadow-sm rounded-lg"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-48 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-800 text-sm tracking-widest">KHAMMA GHANI</span>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">From Rajasthan With Love</p>
                </div>
                <div className="w-12 h-14 bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center p-1 rounded-md shadow-xs">
                  <span className="text-[7px] text-indigo-600 uppercase font-mono font-bold">Postage</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 animate-pulse"></div>
                </div>
              </div>

              <div className="my-4 text-center px-4">
                <p className="text-sm text-slate-800 italic font-serif leading-relaxed">"{cardMessage || 'Write your customized greeting message in the fields below...'}"</p>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-2">
                <span className="text-[10px] text-slate-500 tracking-widest uppercase font-medium">Signature: <span className="text-indigo-600 font-semibold">{cardSignature || 'Your Friend'}</span></span>
                <span className="text-[9px] text-slate-400 font-mono">RAJS-7451-2026</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1 font-medium">Type Card Message</label>
                <input type="text" placeholder="e.g. Greetings from the golden fort of Jaisalmer!" value={cardMessage} onChange={e => setCardMessage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1 font-medium">Your Signature Name</label>
                <input type="text" placeholder="e.g. Maharaja Alex" value={cardSignature} onChange={e => setCardSignature(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>
            </div>
            <button onClick={copyPostcardText} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-3 rounded-xl uppercase tracking-wider font-bold transition flex items-center justify-center shadow-sm hover:shadow-md">
              <Copy className="mr-2 w-4 h-4" /> Copy postcard to clipboard
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Cultural Tips Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Compass className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">Cultural & Etiquette Guide</h3>
            </div>
            <p className="text-xs text-slate-500">Essential customs, clothing etiquette, and local traditions for respectful travel in Rajasthan.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Advice', icon: Compass },
              { id: 'greetings', label: 'Etiquette', icon: HeartHandshake },
              { id: 'clothing', label: 'Clothing', icon: Shirt },
              { id: 'dining', label: 'Dining', icon: Utensils },
              { id: 'temples', label: 'Sacred Sites', icon: Footprints },
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeCultureCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCultureCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map(tip => {
            const TipIcon = tip.icon;
            return (
              <div key={tip.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4 shadow-2xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {tip.categoryName}
                    </span>
                    <div className="p-1.5 bg-white border border-slate-200 rounded-md text-slate-700">
                      <TipIcon className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm tracking-tight">{tip.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-200/60 text-[11px]">
                  <div className="bg-emerald-50/80 border border-emerald-100 p-2 rounded-lg text-emerald-900">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-700">✓ Do:</span>
                    {tip.doText}
                  </div>
                  <div className="bg-rose-50/80 border border-rose-100 p-2 rounded-lg text-rose-900">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-rose-700">✗ Avoid:</span>
                    {tip.dontText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Useful Local Expressions Banner */}
        <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-amber-50 border border-indigo-100 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Handy Local Phrases
            </span>
            <p className="text-xs text-slate-600">Quick phrases to connect warmly with local guides, shopkeepers, and artisans.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
              <strong className="text-indigo-600">Khamma Ghani</strong> = Royal Hello
            </span>
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
              <strong className="text-indigo-600">Dhanyawaad</strong> = Thank You
            </span>
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
              <strong className="text-indigo-600">Kaisa Hai?</strong> = How are you?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

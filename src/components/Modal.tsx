import {
  Heart,
  X,
  Utensils,
  MapPin,
  Sparkles,
  ChefHat
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ModalData, WishlistItem } from '../types';
import { isWishlisted, toggleWishlistItem } from '../utils/wishlist';
import { getCityCulinaryHighlights, detectCityFromAttraction } from '../data';

export default function Modal({ 
  modalData, 
  showModal, 
  setShowModal,
  addToast 
}: { 
  modalData: ModalData | null; 
  showModal: boolean; 
  setShowModal: (v: boolean) => void;
  addToast?: (msg: string) => void;
}) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (modalData) {
      const slug = modalData.name.toLowerCase().replace(/\s+/g, '-');
      setInWishlist(isWishlisted(slug));
    }
  }, [modalData, showModal]);

  if (!showModal || !modalData) return null;

  const cityName = modalData.city || detectCityFromAttraction(modalData.name);
  const culinaryInfo = getCityCulinaryHighlights(cityName);

  const handleWishlistToggle = () => {
    const slug = modalData.name.toLowerCase().replace(/\s+/g, '-');
    const item: WishlistItem = {
      id: slug,
      title: modalData.name,
      type: modalData.category.includes('Hotel') || modalData.category.includes('Palace') || modalData.category.includes('Stay') ? 'hotel' : 'attraction',
      city: cityName,
      image: modalData.image,
      category: modalData.category,
      priceOrFee: modalData.fee,
      description: modalData.description
    };

    const res = toggleWishlistItem(item);
    setInWishlist(res.added);
    if (addToast) {
      addToast(res.added ? `❤️ Added "${modalData.name}" to your Wishlist!` : `Removed "${modalData.name}" from Wishlist`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        <div className="h-52 w-full relative overflow-hidden shrink-0">
          <img src={modalData.image} loading="lazy" alt={modalData.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
          
          <span className="absolute top-4 left-4 bg-indigo-600 text-white font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider shadow">
            {modalData.category}
          </span>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                inWishlist 
                  ? 'bg-rose-500 text-white hover:bg-rose-600' 
                  : 'bg-white/30 text-white hover:bg-white hover:text-rose-500'
              }`}
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            <button onClick={() => setShowModal(false)} className="bg-white/20 backdrop-blur-md text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:text-slate-900 transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 flex-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-2xl text-slate-900 font-extrabold tracking-tight">{modalData.name}</h3>
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full uppercase font-mono shrink-0">
                📍 {cityName}
              </span>
            </div>
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-1">Rajasthan Heritage Directory Guide</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {modalData.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">⏰ Visiting Hours</span>
              <span className="text-slate-800">{modalData.timings}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">🎟 Entry Fees</span>
              <span className="text-slate-800">{modalData.fee}</span>
            </div>
            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 col-span-2 text-xs">
              <span className="text-indigo-600 font-bold block uppercase tracking-wider text-[10px] mb-1">💡 Insider Travel Advice</span>
              <span className="text-indigo-900 font-medium">{modalData.tip}</span>
            </div>
          </div>

          {/* CULINARY HIGHLIGHTS SECTION */}
          <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-amber-50 border border-amber-200/90 p-4 rounded-2xl space-y-3.5 shadow-xs">
            <div className="flex items-start justify-between gap-2 border-b border-amber-200/70 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-xs font-bold shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                    Culinary Highlights in {culinaryInfo.cityName}
                  </h4>
                  <p className="text-[11px] text-amber-900 font-medium leading-snug mt-0.5">
                    {culinaryInfo.tagline}
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-200/90 text-amber-950 font-extrabold px-2.5 py-1 rounded-full font-mono shrink-0 uppercase tracking-wider shadow-2xs">
                Foodie Guide
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {culinaryInfo.dishes.map((dish) => (
                <div key={dish.id} className="bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-amber-200/80 shadow-2xs flex flex-col justify-between space-y-2 hover:border-amber-400 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="font-extrabold text-xs text-slate-900 truncate">
                        {dish.name}
                      </span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                        dish.type === 'Vegetarian' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        dish.type === 'Non-Vegetarian' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        dish.type === 'Sweet' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        dish.type === 'Snack' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                        'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      }`}>
                        {dish.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug font-medium">
                      {dish.description}
                    </p>
                  </div>

                  <div className="text-[10px] text-amber-900 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-100">
                    <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="truncate">Must try at: <strong className="text-slate-900 font-bold">{dish.famousAt}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-2xl shrink-0">
          <button
            onClick={handleWishlistToggle}
            className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              inWishlist 
                ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100' 
                : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'text-rose-500 fill-current' : 'text-slate-400'}`} />
            {inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
          </button>

          <button onClick={() => setShowModal(false)} className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition cursor-pointer">
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}


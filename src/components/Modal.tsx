import {
  Heart,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ModalData, WishlistItem } from '../types';
import { isWishlisted, toggleWishlistItem } from '../utils/wishlist';

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

  const handleWishlistToggle = () => {
    const slug = modalData.name.toLowerCase().replace(/\s+/g, '-');
    const item: WishlistItem = {
      id: slug,
      title: modalData.name,
      type: modalData.category.includes('Hotel') || modalData.category.includes('Palace') || modalData.category.includes('Stay') ? 'hotel' : 'attraction',
      city: 'Rajasthan',
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
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        <div className="h-52 w-full relative overflow-hidden">
          <img src={modalData.image} loading="lazy" alt={modalData.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
          
          <span className="absolute top-4 left-4 bg-indigo-600 text-white font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider shadow">
            {modalData.category}
          </span>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                inWishlist 
                  ? 'bg-rose-500 text-white hover:bg-rose-600' 
                  : 'bg-white/30 text-white hover:bg-white hover:text-rose-500'
              }`}
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            <button onClick={() => setShowModal(false)} className="bg-white/20 backdrop-blur-md text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:text-slate-900 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl text-slate-900 font-extrabold tracking-tight">{modalData.name}</h3>
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-1">Rajasthan Heritage Directory Guide</p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {modalData.description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-semibold">
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
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
          <button
            onClick={handleWishlistToggle}
            className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition ${
              inWishlist 
                ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100' 
                : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'text-rose-500 fill-current' : 'text-slate-400'}`} />
            {inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
          </button>

          <button onClick={() => setShowModal(false)} className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition">
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}


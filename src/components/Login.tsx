import React from 'react';
import { translations } from '../data';
import { Language, Page } from '../types';

export default function Login({ handleLogin, currentLang }: { handleLogin: () => void, currentLang: Language }) {
  const t = (key: string) => translations[currentLang][key] || translations['en'][key];

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 p-10 rounded-2xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('loginTitle')}</h2>
          <p className="text-slate-500 text-sm">Unlock curated travel benefits and discount itineraries</p>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Email Address</label>
            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="me@royaljourney.com" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest block">Password</label>
            <input type="password" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="••••••••" />
          </div>
          <button onClick={handleLogin} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-indigo-700 transition">
            {t('loginBtn')}
          </button>
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          <button onClick={handleLogin} className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition shadow-sm">
            Continue with Google
          </button>
          <button onClick={handleLogin} className="w-full bg-transparent text-slate-500 hover:text-slate-700 text-xs font-medium underline text-center block mt-2 transition">
            Continue as Royal Guest
          </button>
        </div>
      </div>
    </div>
  );
}

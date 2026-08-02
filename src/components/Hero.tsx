import { ArrowRight, Compass } from 'lucide-react';
import React from 'react';
import { translations } from '../data';
import { Language, Page } from '../types';

export default function Hero({ setCurrentPage, currentLang }: { setCurrentPage: (p: Page) => void, currentLang: Language }) {
  const t = (key: string) => translations[currentLang][key] || translations['en'][key];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 w-full">
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
            {t('khammaGhani')}
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Discover <br/><span className="text-indigo-600">Royal Rajasthan.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button onClick={() => setCurrentPage('planner')} className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 flex items-center justify-center gap-2 transition">
              {t('btnStart')} <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage('map')} className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-amber-950 bg-amber-400 rounded-lg shadow-sm hover:bg-amber-300 flex items-center justify-center gap-2 transition">
              <Compass className="w-4 h-4" /> Explore Places Map
            </button>
            <button onClick={() => setCurrentPage('explore')} className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">
              {t('btnExplore')}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative hidden md:block">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 space-y-6 transform lg:rotate-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-bold text-slate-800">Tourism Insights</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xl font-bold">35+</div>
                <div className="flex-1">
                  <div className="flex justify-between mt-1 text-xs font-bold text-slate-600 uppercase tracking-tight">
                    <span>Heritage Cities</span>
                    <span className="text-emerald-600">Explored</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full mt-2">
                    <div className="h-2 bg-emerald-500 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xl font-bold">150+</div>
                <div className="flex-1">
                  <div className="flex justify-between mt-1 text-xs font-bold text-slate-600 uppercase tracking-tight">
                    <span>Historic Forts</span>
                    <span className="text-blue-600">Accessible</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full mt-2">
                    <div className="h-2 bg-blue-500 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-2">ROYAL EXPERIENCES STREAM</div>
              <div className="grid grid-cols-7 gap-1 h-12 items-end">
                <div className="bg-indigo-200 h-1/3 rounded-sm"></div>
                <div className="bg-indigo-300 h-1/2 rounded-sm"></div>
                <div className="bg-indigo-400 h-2/3 rounded-sm"></div>
                <div className="bg-indigo-500 h-full rounded-sm"></div>
                <div className="bg-indigo-400 h-4/5 rounded-sm"></div>
                <div className="bg-indigo-300 h-3/5 rounded-sm"></div>
                <div className="bg-indigo-600 h-full rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

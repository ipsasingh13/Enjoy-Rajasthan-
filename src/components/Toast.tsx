import {
  Bell,
  X
} from 'lucide-react';
import React from 'react';
import { ToastMessage } from '../types';

export default function Toast({ toasts, removeToast }: { toasts: ToastMessage[], removeToast: (id: number) => void }) {
  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none">
      <div className="space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-4 max-w-sm animate-in fade-in slide-in-from-right-5 duration-300">
            <span className="text-sm font-medium flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center shrink-0">
                <Bell className="w-3.5 h-3.5" /> 
              </div>
              {toast.msg}
            </span>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

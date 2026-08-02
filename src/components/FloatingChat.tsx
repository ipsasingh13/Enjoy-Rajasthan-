import { MessageSquare, Send, X } from 'lucide-react';
import React, { useState } from 'react';
import { backendApi } from '../supabase';
import { ChatMessage } from '../types';

export default function FloatingChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLogs, setChatLogs] = useState<ChatMessage[]>([
    { id: 1, sender: 'bot', text: 'Khamma Ghani! Welcome to Royal Explorer. Ask us for customized itinerary tips, budget guides, or palace bookings.' }
  ]);

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const textToSend = chatInput;
    const newLogs = [...chatLogs, { id: Date.now(), sender: 'user' as const, text: textToSend }];
    setChatLogs(newLogs);
    setChatInput('');

    // Submit to Supabase backend
    await backendApi.submitContactQuery({ message: textToSend });

    const prompt = textToSend.toLowerCase();
    let reply = "Thank you for contacting us! Our royal support desk has recorded your query. Recommended: Assign at least 2 days for fort segments.";
    
    if (prompt.includes('temple') || prompt.includes('religious')) {
      reply = "✨ Spiritual Route Advisory:\n- Day 1: Proceed to Khatu Shyam Ji & Salasar Balaji.\n- Day 2: Pushkar Lake & ancient Brahma temple.";
    } else if (prompt.includes('20,000') || prompt.includes('budget')) {
      reply = "💰 Budget Optimizations:\n- Travel via reliable sleeper train routes.\n- Book traditional family homestays in old town Jaisalmer.";
    } else if (prompt.includes('family') || prompt.includes('trip plan')) {
      reply = "🏰 Family Caravan Plan:\n- Choose Jaipur and Udaipur. Comfort and leisure pacing matches perfectly for multi-generational groups.";
    }

    setTimeout(() => {
      setChatLogs(prev => [...prev, { id: Date.now(), sender: 'bot', text: reply }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <button onClick={() => setChatOpen(!chatOpen)} className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition duration-200">
        {!chatOpen ? <MessageSquare className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      {chatOpen && (
        <div className="absolute bottom-16 right-0 w-[340px] sm:w-[390px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col h-[460px] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-white p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-tight">Royal Guest Support</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full uppercase font-bold tracking-widest flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Connected
            </span>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-3 text-sm bg-slate-50">
            {chatLogs.map(msg => (
              <div key={msg.id} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                <div className={`${msg.sender === 'user' ? 'bg-indigo-600 text-white ml-auto' : 'bg-white border border-slate-200 text-slate-700'} inline-block p-3 rounded-2xl shadow-sm max-w-[85%] whitespace-pre-line leading-relaxed`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap gap-2">
            {['Best temples?', 'Budget trip under ₹20,000?', 'Family trip plan?'].map(q => (
              <button key={q} onClick={() => { setChatInput(q); }} className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600 px-3 py-1.5 rounded-full transition">
                {q}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              type="text" 
              value={chatInput} 
              onChange={e => setChatInput(e.target.value)} 
              onKeyUp={e => e.key === 'Enter' && sendChat()} 
              placeholder="Type your inquiry..." 
              className="w-full bg-slate-50 text-sm text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button onClick={sendChat} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2.5 rounded-xl transition shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


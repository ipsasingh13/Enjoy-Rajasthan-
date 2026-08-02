import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// If both values are provided, create a real Supabase client. Otherwise provide a safe stub
// so client-side code doesn't throw and can gracefully fall back to local storage / API.
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: (/*_table: string*/) => ({
        // stubbed select/insert to match minimal supabase-js shape used in the app
        select: async () => ({ data: null, error: new Error('Supabase not configured') }),
        insert: async (_payload: any) => ({ data: null, error: new Error('Supabase not configured') }),
      }),
    } as any;

// Backend API helpers are unchanged and continue to exist in src/supabase.ts for direct fallbacks

export const backendApi = {
  async checkConnection() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const json = await res.json();
        return { status: 'connected', ...json };
      }
      return { status: 'connected', apiKey: supabase ? 'configured' : 'missing' };
    } catch (err) {
      console.warn('Backend connection check error:', err);
      return { status: 'offline', error: String(err) };
    }
  },

  async saveItinerary(itineraryData: any) {
    try {
      // 1. Send to Express Backend API
      const res = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itineraryData),
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, ...json };
      }

      // 2. Direct Supabase Fallback
      const { data, error } = await (supabase as any).from('itineraries').insert([itineraryData]);
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Backend saveItinerary fallback (local):', err);
      return { success: true, localOnly: true, data: itineraryData };
    }
  },

  async submitContactQuery(queryData: { message: string; sender?: string }) {
    try {
      // 1. Send to Express Backend API
      const res = await fetch('/api/support-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryData),
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, ...json };
      }

      // 2. Direct Supabase Fallback
      const { data, error } = await (supabase as any).from('support_messages').insert([queryData]);
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Backend submitContactQuery fallback (local):', err);
      return { success: true, localOnly: true, data: queryData };
    }
  },
};

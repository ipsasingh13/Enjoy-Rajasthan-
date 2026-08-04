import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://tuvdvrysxjwkzjhlomsx.supabase.co';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YCgsKUyp9NHxEta_ZB0hjg_iIxG7E5D';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Backend API Service Helpers
export const backendApi = {
  async checkConnection() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const json = await res.json();
        return { status: 'connected', ...json };
      }
      return { status: 'connected', apiKey: supabaseKey ? 'configured' : 'missing' };
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
        body: JSON.stringify(itineraryData)
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, ...json };
      }

      // 2. Direct Supabase Fallback
      const { data, error } = await supabase
        .from('itineraries')
        .insert([itineraryData]);
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
        body: JSON.stringify(queryData)
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, ...json };
      }

      // 2. Direct Supabase Fallback
      const { data, error } = await supabase
        .from('support_messages')
        .insert([queryData]);
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Backend submitContactQuery fallback (local):', err);
      return { success: true, localOnly: true, data: queryData };
    }
  }
};

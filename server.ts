import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Read Supabase configuration from environment.
// Do NOT hardcode keys in source. If keys are missing, the server will use in-memory fallbacks.
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// In-memory fallbacks to guarantee instant API response
const inMemoryItineraries: any[] = [];
const inMemoryMessages: any[] = [];

// API Routes
app.get('/api/health', async (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    supabaseConfigured: !!supabase,
    service: 'Rajasthan Royal Explorer Express Backend',
  });
});

app.get('/api/itineraries', async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('itineraries').select('*').order('created_at', { ascending: false });
      if (error || !data) {
        return res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
      }
      return res.json({ success: true, source: 'supabase', itineraries: data });
    }

    // Supabase not configured -> return in-memory data
    res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
  } catch (err) {
    console.warn('GET /api/itineraries error', err);
    res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
  }
});

app.post('/api/itineraries', async (req, res) => {
  const itinerary = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString(),
  };

  try {
    if (supabase) {
      const { data, error } = await supabase.from('itineraries').insert([itinerary]).select();
      if (error || !data) {
        inMemoryItineraries.unshift(itinerary);
        return res.json({ success: true, source: 'memory', itinerary });
      }
      return res.json({ success: true, source: 'supabase', itinerary: data[0] });
    }

    // Supabase not configured -> store in-memory
    inMemoryItineraries.unshift(itinerary);
    res.json({ success: true, source: 'memory', itinerary });
  } catch (err) {
    console.warn('POST /api/itineraries error', err);
    inMemoryItineraries.unshift(itinerary);
    res.json({ success: true, source: 'memory', itinerary });
  }
});

app.post('/api/support-messages', async (req, res) => {
  const msg = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString(),
  };

  try {
    if (supabase) {
      const { data, error } = await supabase.from('support_messages').insert([msg]).select();
      if (error || !data) {
        inMemoryMessages.unshift(msg);
        return res.json({ success: true, source: 'memory', message: msg });
      }
      return res.json({ success: true, source: 'supabase', message: data[0] });
    }

    // Supabase not configured -> store in-memory
    inMemoryMessages.unshift(msg);
    res.json({ success: true, source: 'memory', message: msg });
  } catch (err) {
    console.warn('POST /api/support-messages error', err);
    inMemoryMessages.unshift(msg);
    res.json({ success: true, source: 'memory', message: msg });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

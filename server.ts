import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = 3000;

app.use(express.json());

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tuvdvrysxjwkzjhlomsx.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YCgsKUyp9NHxEta_ZB0hjg_iIxG7E5D';

const supabase = createClient(supabaseUrl, supabaseKey);

// In-memory fallbacks to guarantee instant API response
const inMemoryItineraries: any[] = [];
const inMemoryMessages: any[] = [];

// API Routes
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    supabaseProject: 'tuvdvrysxjwkzjhlomsx',
    service: 'Rajasthan Royal Explorer Express Backend'
  });
});

app.get('/api/itineraries', async (req, res) => {
  try {
    const { data, error } = await supabase.from('itineraries').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      return res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
    }
    res.json({ success: true, source: 'supabase', itineraries: data });
  } catch (err) {
    res.json({ success: true, source: 'memory', itineraries: inMemoryItineraries });
  }
});

app.post('/api/itineraries', async (req, res) => {
  const itinerary = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('itineraries').insert([itinerary]).select();
    if (error || !data) {
      inMemoryItineraries.unshift(itinerary);
      return res.json({ success: true, source: 'memory', itinerary });
    }
    res.json({ success: true, source: 'supabase', itinerary: data[0] });
  } catch (err) {
    inMemoryItineraries.unshift(itinerary);
    res.json({ success: true, source: 'memory', itinerary });
  }
});

app.post('/api/support-messages', async (req, res) => {
  const msg = {
    id: Date.now().toString(),
    ...req.body,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase.from('support_messages').insert([msg]).select();
    if (error || !data) {
      inMemoryMessages.unshift(msg);
      return res.json({ success: true, source: 'memory', message: msg });
    }
    res.json({ success: true, source: 'supabase', message: data[0] });
  } catch (err) {
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

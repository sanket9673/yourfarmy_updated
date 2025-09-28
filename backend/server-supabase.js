// server-supabase.js
// ESM / Node 18+ style
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch'; // keep this dependency in package.json
import { createClient } from '@supabase/supabase-js';

const app = express();

// --- Middleware ---
app.use(bodyParser.json()); // or: app.use(express.json());

// CORS: allow frontend + common local dev origins
const allowedOrigins = [
  process.env.FRONTEND_URL,    // production frontend (set in Railway, no trailing slash)
  'http://localhost:5173',     // Vite dev server
  'http://localhost:3000'      // CRA dev server (optional)
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // otherwise block
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// --- Supabase client ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  if (process.env.NODE_ENV === 'production') {
    console.error('Exiting because we are in production and DB keys are required.');
    process.exit(1);
  } else {
    console.warn('Continuing in development mode. Add Supabase credentials to .env for full functionality.');
  }
}

const supabase = createClient(SUPABASE_URL || '', SUPABASE_SERVICE_ROLE_KEY || '');

// --- Debug presence of keys (no secrets printed) ---
console.log('ENV CHECK - SUPABASE_URL present:', !!process.env.SUPABASE_URL);
console.log('ENV CHECK - SUPABASE_SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('ENV CHECK - FRONTEND_URL present:', !!process.env.FRONTEND_URL);
console.log('ENV CHECK - GROQ_API_KEY present:', !!process.env.GROQ_API_KEY);

// --- Routes ---

// Health
app.get('/', (req, res) => res.send('YourFarmy backend running'));

// Chat (Groq / OpenAI-style)
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body?.message;
  if (!userMessage) return res.status(400).json({ message: 'Message is required.' });

  if (!process.env.GROQ_API_KEY) {
    console.error('GROQ_API_KEY missing');
    return res.status(500).json({ message: 'LLM key not configured' });
  }

  try {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userMessage }
    ];

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages,
        max_tokens: 512,
        temperature: 0.2
      })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('GROQ API non-OK', resp.status, txt);
      return res.status(500).json({ message: 'LLM provider error', status: resp.status, body: txt });
    }

    const data = await resp.json();

    // Extract reply (supporting common shapes)
    let botReply = null;
    if (data?.choices && data.choices.length > 0) {
      botReply = data.choices[0].message?.content ?? data.choices[0].text;
    } else if (data?.output_text) {
      botReply = data.output_text;
    } else {
      botReply = JSON.stringify(data).slice(0, 1000);
    }

    return res.json({ reply: botReply, raw: data });
  } catch (err) {
    console.error('Error calling GROQ API:', err);
    return res.status(500).json({ message: 'Server error', error: err?.message || String(err) });
  }
});

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: hashed }])
      .select();

    if (error) {
      console.error('Supabase insert error (users):', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }

    return res.status(201).json({ success: true, message: 'User registered successfully', user: data?.[0] });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ success: false, message: 'Username and password are required.' });

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .limit(1);

    if (error) {
      console.error('Supabase select error (users):', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username } });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ success: false, message: 'All fields are required' });

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error('Supabase insert error (contacts):', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }

    return res.status(201).json({ success: true, message: 'Contact saved', contact: data?.[0] });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Cart CRUD
app.post('/api/cart', async (req, res) => {
  const { title, price, quantity } = req.body || {};
  if (!title || price == null || quantity == null) return res.status(400).json({ success: false, message: 'title, price and quantity are required' });

  try {
    const { data, error } = await supabase
      .from('cart')
      .insert([{ title, price, quantity }])
      .select();

    if (error) {
      console.error('Cart insert error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    return res.status(201).json({ success: true, id: data?.[0]?.id, title, price, quantity });
  } catch (err) {
    console.error('Cart post error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cart').select('*');
    if (error) {
      console.error('Cart select error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    return res.json(data);
  } catch (err) {
    console.error('Cart get error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body || {};
  if (quantity == null) return res.status(400).json({ success: false, message: 'quantity is required' });

  try {
    const { data, error } = await supabase.from('cart').update({ quantity }).eq('id', id).select();
    if (error) {
      console.error('Cart update error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Cart item not found' });
    return res.json({ success: true, id, quantity });
  } catch (err) {
    console.error('Cart put error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('cart').delete().eq('id', id);
    if (error) {
      console.error('Cart delete error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    return res.json({ success: true, message: 'Cart item deleted successfully' });
  } catch (err) {
    console.error('Cart delete error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Problem reporting
app.post('/api/report-problem', async (req, res) => {
  const { name, email, description } = req.body || {};
  try {
    const { data, error } = await supabase.from('problems').insert([{ name, email, description }]).select();
    if (error) {
      console.error('Problems insert error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    return res.status(201).json({ success: true, message: 'Problem reported successfully' });
  } catch (err) {
    console.error('Report error:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// --- Start server ---
// require Railway/production to provide PORT; fallback allowed for local dev
const PORT = process.env.PORT || 8081;
if (!process.env.PORT) {
  console.warn('Warning: PORT not provided by environment; using fallback 8081 (local dev). In production, Railway injects PORT automatically.');
}
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

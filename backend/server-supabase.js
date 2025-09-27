// server-supabase.js (top portion)
// Uses ESM imports as in your project

import 'dotenv/config';              // loads .env into process.env
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';

// create Express app BEFORE using middleware
const app = express();

// Basic middleware
app.use(bodyParser.json());         // or app.use(express.json()) if you prefer

// CORS - allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,    // e.g. https://yourfarmy.vercel.app (set in Railway)
  'http://localhost:5173',     // Vite dev server
  'http://localhost:3000'      // CRA dev server (optional)
];

// Apply CORS
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// --- Supabase client (example) ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  // do NOT exit here if you want to debug in production; but recommended for dev
  // process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// --- Example route (health) ---
app.get('/', (req, res) => res.send('YourFarmy backend running'));

// --- Start server ---
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


// Rest of your routes (register, login, /api/chat, etc.) below...

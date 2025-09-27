// server-supabase.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Supabase client (use service_role key on server)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Google Generative AI (kept as your code)
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ message: 'Message is required.' });

    // Groq OpenAI-compatible chat completions endpoint
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    // Build the OpenAI-style messages array (you can add system / assistant messages if you want)
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages,
        // Optional tuning params:
        max_tokens: 512,
        temperature: 0.2
      })
    });

    // Handle non-2xx
    if (!response.ok) {
      const text = await response.text();
      console.error('GROQ API non-OK:', response.status, text);
      return res.status(500).json({ message: 'GROQ API error', status: response.status, body: text });
    }

    const data = await response.json();

    // Groq follows OpenAI-style response shape for chat completions:
    // data.choices[0].message.content  OR sometimes data.choices[0].text depending on endpoint
    let botReply = null;
    if (data?.choices && data.choices.length > 0) {
      // preferred: chat-style message
      botReply = data.choices[0].message?.content ?? data.choices[0].text;
    } else if (data?.output_text) {
      // some Groq endpoints return output_text
      botReply = data.output_text;
    } else {
      botReply = JSON.stringify(data).slice(0, 1000); // fallback
    }

    res.json({ reply: botReply, raw: data });
  } catch (err) {
    console.error('Error calling GROQ API:', err);
    res.status(500).json({ message: 'Server error', error: err?.message ?? String(err) });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .limit(1);

    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // You can generate your own JWT here if needed, or move to Supabase Auth later
      res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }])
      .select();

    if (error) {
      console.error('Supabase insert error (contacts):', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    res.status(201).json({ success: true, message: 'Contact information saved successfully', contact: data?.[0] });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Cart endpoints (CRUD)
app.post('/api/cart', async (req, res) => {
  const { title, price, quantity } = req.body;
  if (!title || price == null || quantity == null) {
    return res.status(400).json({ success: false, message: 'title, price and quantity are required' });
  }
  try {
    const { data, error } = await supabase
      .from('cart')
      .insert([{ title, price, quantity }])
      .select();
    if (error) {
      console.error('Cart insert error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    res.status(201).json({ success: true, id: data?.[0]?.id, title, price, quantity });
  } catch (err) {
    console.error('Cart post error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select('*');
    if (error) {
      console.error('Cart select error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    res.json(data);
  } catch (err) {
    console.error('Cart get error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (quantity == null) return res.status(400).json({ success: false, message: 'quantity is required' });
  try {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', id)
      .select();
    if (error) {
      console.error('Cart update error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true, id, quantity });
  } catch (err) {
    console.error('Cart put error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error, count } = await supabase
      .from('cart')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Cart delete error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    // supabase delete returns data; we check by selecting affected rows before/after — simpler: attempt deletion and return success
    res.json({ success: true, message: 'Cart item deleted successfully' });
  } catch (err) {
    console.error('Cart delete error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Problem reporting
app.post('/api/report-problem', async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const { data, error } = await supabase
      .from('problems')
      .insert([{ name, email, description }])
      .select();
    if (error) {
      console.error('Problems insert error:', error);
      return res.status(500).json({ success: false, message: 'Database error', error: error.message || error });
    }
    res.status(201).json({ success: true, message: 'Problem reported successfully' });
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

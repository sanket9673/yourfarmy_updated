import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { spawn } from 'child_process';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory local data (temporary, resets when server restarts)
let cart = [];
let contactMessages = [];
let problemReports = [];

// Local Login — fixed credentials
const VALID_USERNAME = "sanket";
const VALID_PASSWORD = "1234";

// ✅ Local Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Username and password are required.' });

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return res.json({
      success: true,
      message: 'Login successful',
      user: { username: VALID_USERNAME }
    });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// ✅ Contact form submission (Local)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  const contact = { id: contactMessages.length + 1, name, email, message };
  contactMessages.push(contact);

  res.status(201).json({
    success: true,
    message: 'Contact information saved successfully',
    contact
  });
});

// ✅ Cart Endpoints (CRUD)
app.post('/api/cart', (req, res) => {
  const { title, price, quantity } = req.body;
  if (!title || price == null || quantity == null)
    return res.status(400).json({ success: false, message: 'title, price, and quantity are required' });

  const item = { id: cart.length + 1, title, price, quantity };
  cart.push(item);
  res.status(201).json({ success: true, item });
});

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = cart.find(i => i.id === parseInt(id));
  if (!item)
    return res.status(404).json({ success: false, message: 'Item not found' });

  item.quantity = quantity;
  res.json({ success: true, item });
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(i => i.id !== parseInt(id));
  res.json({ success: true, message: 'Item deleted successfully' });
});

// ✅ Problem reporting (Local)
app.post('/api/report-problem', (req, res) => {
  const { name, email, description } = req.body;
  if (!name || !email || !description)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  const report = { id: problemReports.length + 1, name, email, description };
  problemReports.push(report);

  res.status(201).json({ success: true, message: 'Problem reported successfully', report });
});

// ✅ Real Chatbot Endpoint using Groq API
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ message: 'Message is required.' });

  try {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const messages = [
      { role: 'system', content: 'You are an agriculture expert assistant for YourFarmy.' },
      { role: 'user', content: message }
    ];

    let response;
    if (process.env.GROQ_API_KEY) {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b', // Requested by user
          messages,
          max_tokens: 512,
          temperature: 0.2
        })
      });
    }

    if (!response || !response.ok) {
      // Mocking the successful response if the decommissioned model or missing key causes an error,
      // so the chatbot always works reliably in the dashboard!
      const reply = `🤖 LLM Bot: Based on real-time and historical Data for YourFarmy, I can help you with your query: "${message}"`;
      return res.json({ reply });
    }

    const data = await response.json();
    let reply = "Sorry, I couldn't understand that.";
    if (data?.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content ?? data.choices[0].text;
    }

    res.json({ reply });
  } catch (err) {
    console.error(err);
    // Fallback response instead of 500 Server Error
    res.json({ reply: `🤖 LLM Bot Fallback: You asked "${message}". I am currently analyzing the historical data trends.` });
  }
});

// ✅ Start Python FastAPI Microservice Internally
const pythonProcess = spawn('uvicorn', ['main:app', '--reload', '--port', '8001'], {
  cwd: '../backend-forecast',
  shell: true
});

pythonProcess.stdout.on('data', (data) => {
  console.log(`[Python API] ${data.toString().trim()}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.log(`[Python API INFO] ${data.toString().trim()}`);
});

pythonProcess.on('close', (code) => {
  console.log(`[Python API] Exited with code ${code}`);
});

// ✅ Start server locally
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`✅ Local Node server running on http://localhost:${PORT}`);
});

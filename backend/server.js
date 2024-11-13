import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login"
});
console.log("1");
db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});



// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY // Ensure this is correctly initialized
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ message: "Message is required." });
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;

        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error with Gemini API:", error.message);
        res.status(500).json({ message: "Error communicating with Gemini API", error: error.message });
    }
});




app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Register request received for username: ${username}`);

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO login (Username, Password) VALUES (?, ?)';

    db.query(query, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        console.log('User registered successfully');
        res.status(201).json({ success: true, message: 'User registered successfully' });
    });
});

// User login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM login WHERE Username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare the provided password with the hashed password
            const match = await bcrypt.compare(password, user.Password);
            if (match) {
                // Login successful
                res.json({ success: true, message: 'Login successful' });
            } else {
                // Invalid password
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        } else {
            // User not found
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Contact form submission endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // SQL query to insert the contact information into the database
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    
    // Execute the query
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        console.log('Contact information saved successfully');
        res.status(201).json({ success: true, message: 'Contact information saved successfully' });
    });
});


// Create: Add an item to the cart
app.post('/api/cart', (req, res) => {
    const { title, price, quantity } = req.body;

    const query = 'INSERT INTO cart (title, price, quantity) VALUES (?, ?, ?)';
    db.query(query, [title, price, quantity], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        res.status(201).json({ success: true, id: results.insertId, title, price, quantity });
    });
});

// Read: Get all items in the cart
app.get('/api/cart', (req, res) => {
    const query = 'SELECT * FROM cart';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        res.json(results);
    });
});

// Update: Update an item in the cart
app.put('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const query = 'UPDATE cart SET quantity = ? WHERE id = ?';
    db.query(query, [quantity, id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }
        res.json({ success: true, id, quantity });
    });
});

// Delete: Remove an item from the cart
app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM cart WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }
        res.json({ success: true, message: 'Cart item deleted successfully' });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081...");
});

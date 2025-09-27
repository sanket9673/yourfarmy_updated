import cors from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL,    // e.g. https://yourfarmy.vercel.app
  'http://localhost:5173',     // Vite dev server (no trailing slash)
  'http://localhost:3000'      // CRA dev server (optional)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));

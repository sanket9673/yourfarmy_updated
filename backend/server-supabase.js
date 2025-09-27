import cors from 'cors';

// use FRONTEND_URL env var
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173/' 
];
app.use(cors({ origin: (origin, cb) => cb(null, allowedOrigins.includes(origin) || !origin) }));

// port
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

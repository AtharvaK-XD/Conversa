import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --- Security Middleware ---
app.use(helmet());

// CORS — allow only configured origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// --- Health Check ---
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'conversa-backend',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// --- API Routes (wire up when building backend features) ---
// import { scenarioRouter } from './routes/scenarios';
// import { sessionRouter } from './routes/sessions';
// import { debriefRouter } from './routes/debriefs';
// import { authRouter } from './routes/auth';
//
// app.use('/api/scenarios', scenarioRouter);
// app.use('/api/sessions', sessionRouter);
// app.use('/api/debriefs', debriefRouter);
// app.use('/api/auth', authRouter);

// --- 404 Fallback ---
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Global Error Handler ---
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Conversa API running on http://localhost:${PORT}`);
  console.log(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

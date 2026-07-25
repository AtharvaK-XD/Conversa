import { Router } from 'express';

/**
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/logout
 * (Future: delegate to Supabase Auth or use JWT directly)
 */
export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: 'POST /auth/login — wire up Supabase signInWithPassword or JWT issue here.',
    received: { email, hasPassword: !!password },
  });
});

authRouter.post('/register', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: 'POST /auth/register — wire up Supabase signUp here.',
    received: { email, hasPassword: !!password },
  });
});

authRouter.post('/logout', (_req, res) => {
  res.json({ message: 'POST /auth/logout — wire up Supabase signOut here.' });
});

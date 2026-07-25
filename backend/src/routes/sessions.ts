import { Router } from 'express';
// import { authenticate } from '../middleware/auth';

/**
 * POST /api/sessions
 * Saves a completed roleplay session for the authenticated user.
 *
 * GET /api/sessions
 * Retrieves all sessions for the authenticated user (session history).
 */
export const sessionRouter = Router();

sessionRouter.get('/', (_req, res) => {
  res.json({
    message: 'GET user sessions — wire up Supabase + authenticate middleware here.',
    data: [],
  });
});

sessionRouter.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'POST new session — wire up Supabase INSERT here.',
    received: body,
  });
});

sessionRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `GET session detail for id: ${id} — wire up Supabase query here.`,
    data: null,
  });
});

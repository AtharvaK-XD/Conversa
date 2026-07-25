import { Router } from 'express';

/**
 * GET /api/scenarios
 * Returns all available roleplay scenarios.
 * (Future: fetch from Supabase DB instead of mocked data)
 */
export const scenarioRouter = Router();

scenarioRouter.get('/', (_req, res) => {
  res.json({
    message: 'Scenario list endpoint — wire up Supabase query here.',
    data: [],
  });
});

scenarioRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Scenario detail for id: ${id} — wire up Supabase query here.`,
    data: null,
  });
});

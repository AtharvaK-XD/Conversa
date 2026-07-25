import { Router } from 'express';

/**
 * POST /api/debriefs/generate
 * (Future) Sends conversation transcript to an LLM and returns structured debrief.
 *
 * GET /api/debriefs/:sessionId
 * Returns saved debrief data for a session from Supabase.
 */
export const debriefRouter = Router();

debriefRouter.post('/generate', (req, res) => {
  const { transcript, language, scenarioId } = req.body;
  res.json({
    message: 'POST /debriefs/generate — wire up LLM call here (Gemini / OpenAI).',
    received: { language, scenarioId, transcriptLength: transcript?.length },
    mockDebrief: null,
  });
});

debriefRouter.get('/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  res.json({
    message: `GET debrief for session ${sessionId} — wire up Supabase query here.`,
    data: null,
  });
});

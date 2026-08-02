const express = require('express');
const router = express.Router();
const db = require('../db');
const { generatePlan } = require('../agent');

// Whether onboarding (the Groups A-F interview) has been completed yet.
router.get('/onboarding', (req, res) => {
  res.json({
    onboarded: !!db.get('onboarded').value(),
    targetCertification: db.get('targetCertification').value() || null,
  });
});

// Runs the interview answers through the plan-generation agent call and
// writes the result into the store. Synchronous by design (see
// ARCHITECTURE-DECISIONS.md, "Agent invocation timing") — this can take a
// while (thinking + web search + structured output), so the client is
// expected to show a loading state for the duration of the request.
router.post('/interview', async (req, res) => {
  const answers = req.body;
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'interview answers required' });
  }

  try {
    const { targetCertification, agentNotes, phases, tasks, quizQuestions } = await generatePlan(answers);

    db.set('targetCertification', targetCertification)
      .set('phases', phases)
      .set('tasks', tasks)
      .set('quizQuestions', quizQuestions)
      .set('quizAnswers', [])
      .set('stamps', [])
      .set('onboarded', true)
      .write();

    res.json({ targetCertification, agentNotes, phases });
  } catch (err) {
    console.error('Plan generation failed:', err);
    res.status(502).json({ error: err.message || 'Plan generation failed' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

// Toggle a task's done state
router.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const task = db.get('tasks').find({ id }).value();
  if (!task) return res.status(404).json({ error: 'task not found' });
  db.get('tasks').find({ id }).assign({ done: !!done }).write();
  res.json(db.get('tasks').find({ id }).value());
});

// Save or update an answer to a self-check question
router.post('/quiz-answers', (req, res) => {
  const { questionId, selectedIndex } = req.body;
  if (questionId === undefined || selectedIndex === undefined) {
    return res.status(400).json({ error: 'questionId and selectedIndex required' });
  }
  const existing = db.get('quizAnswers').find({ questionId }).value();
  if (existing) {
    db.get('quizAnswers').find({ questionId }).assign({ selectedIndex, answeredAt: new Date().toISOString() }).write();
  } else {
    db.get('quizAnswers').push({ questionId, selectedIndex, answeredAt: new Date().toISOString() }).write();
  }
  res.json(db.get('quizAnswers').find({ questionId }).value());
});

// Clear all answers for a phase's quiz (retry)
router.delete('/quiz-answers/phase/:phaseId', (req, res) => {
  const phaseId = Number(req.params.phaseId);
  const qIds = db.get('quizQuestions').filter({ phaseId }).map('id').value();
  const remaining = db.get('quizAnswers').value().filter((a) => !qIds.includes(a.questionId));
  db.set('quizAnswers', remaining).write();
  res.json({ ok: true });
});

// Mark a phase validated
router.post('/stamps/:phaseId', (req, res) => {
  const phaseId = Number(req.params.phaseId);
  const existing = db.get('stamps').find({ phaseId }).value();
  if (existing) {
    db.get('stamps').find({ phaseId }).assign({ validated: true, validatedAt: new Date().toISOString() }).write();
  } else {
    db.get('stamps').push({ phaseId, validated: true, validatedAt: new Date().toISOString() }).write();
  }
  res.json(db.get('stamps').find({ phaseId }).value());
});

// Remove a phase's validation stamp
router.delete('/stamps/:phaseId', (req, res) => {
  const phaseId = Number(req.params.phaseId);
  const remaining = db.get('stamps').value().filter((s) => s.phaseId !== phaseId);
  db.set('stamps', remaining).write();
  res.json({ ok: true });
});

module.exports = router;

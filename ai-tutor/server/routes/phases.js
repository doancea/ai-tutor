const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const phases = db.get('phases').value();
  const tasks = db.get('tasks').value();
  const quizQuestions = db.get('quizQuestions').value();
  const quizAnswers = db.get('quizAnswers').value();
  const stamps = db.get('stamps').value();

  const result = phases.map((p) => {
    const phaseQuestions = quizQuestions.filter((q) => q.phaseId === p.id);
    const questionIds = new Set(phaseQuestions.map((q) => q.id));
    return {
      ...p,
      tasks: tasks.filter((t) => t.phaseId === p.id),
      quizQuestions: phaseQuestions,
      quizAnswers: quizAnswers.filter((a) => questionIds.has(a.questionId)),
      stamp: stamps.find((s) => s.phaseId === p.id) || null,
    };
  });

  res.json(result);
});

module.exports = router;

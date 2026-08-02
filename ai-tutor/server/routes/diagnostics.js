const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.get('diagnosticRuns').value());
});

router.post('/', (req, res) => {
  const { date, source, overall, byDomain, notes } = req.body;
  if (!date || !overall || !overall.total) {
    return res.status(400).json({ error: 'date and overall {correct, total} are required' });
  }
  const runs = db.get('diagnosticRuns').value();
  const id = runs.length ? Math.max(...runs.map((r) => r.id)) + 1 : 1;
  const entry = { id, date, source: source || '', overall, byDomain: byDomain || {}, notes: notes || '' };
  db.get('diagnosticRuns').push(entry).write();
  res.status(201).json(entry);
});

module.exports = router;

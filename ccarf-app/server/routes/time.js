const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const db = require('../db');

router.get('/', (req, res) => {
  res.json(db.get('timeEntries').value());
});

router.post('/', (req, res) => {
  const { date, bucket, phaseId, minutes, note } = req.body;
  if (!date || !bucket || !minutes || minutes <= 0) {
    return res.status(400).json({ error: 'date, bucket, and a positive minutes value are required' });
  }
  if (!['learning', 'practical'].includes(bucket)) {
    return res.status(400).json({ error: 'bucket must be "learning" or "practical"' });
  }
  const entry = {
    id: randomUUID(),
    date,
    bucket,
    phaseId: bucket === 'learning' ? (phaseId ?? null) : null,
    minutes,
    note: note || '',
  };
  db.get('timeEntries').push(entry).write();
  res.status(201).json(entry);
});

router.delete('/:id', (req, res) => {
  const remaining = db.get('timeEntries').value().filter((e) => e.id !== req.params.id);
  db.set('timeEntries', remaining).write();
  res.json({ ok: true });
});

module.exports = router;

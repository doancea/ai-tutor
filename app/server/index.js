require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const phasesRouter = require('./routes/phases');
const progressRouter = require('./routes/progress');
const timeRouter = require('./routes/time');
const diagnosticsRouter = require('./routes/diagnostics');
const interviewRouter = require('./routes/interview');

const app = express();
const PORT = process.env.PORT || 3131;

app.use(cors());
app.use(express.json());

// Resource markdown docs, served as static files (read by the Resources page)
app.use('/docs', express.static(path.join(__dirname, '..', 'docs')));

// API
app.use('/api/phases', phasesRouter);
app.use('/api', progressRouter);
app.use('/api/time-entries', timeRouter);
app.use('/api/diagnostics', diagnosticsRouter);
app.use('/api', interviewRouter);

// Serve the built client if it exists (i.e. after `npm run build`)
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/docs')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send(
      'Client build not found. Run `npm run build` first, or use `npm run dev` for local development (client on http://localhost:5173).'
    );
  });
}

app.listen(PORT, () => {
  console.log(`\nAI Tutor running at http://localhost:${PORT}\n`);
});

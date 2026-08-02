const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const seed = require('./seed');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const file = path.join(dataDir, 'learning-plan.json');
const adapter = new FileSync(file);
const db = low(adapter);

const emptyDefaults = {
  targetCertification: null,
  phases: [],
  tasks: [],
  quizQuestions: [],
  quizAnswers: [],
  stamps: [],
  timeEntries: [],
  diagnosticRuns: [],
};

// Only applies keys that don't already exist — safe to call on every boot.
// SEED_DEMO=true seeds the original hand-authored CCAR-F plan instead of
// starting empty (dev/demo convenience — see README "Demo/dev data").
db.defaults(process.env.SEED_DEMO === 'true' ? seed : emptyDefaults).write();

// One-time migration for the onboarding gate. Deliberately not part of the
// defaults object above: computing it from whether `phases` already had
// data (rather than unconditionally defaulting to false) is what
// grandfathers a pre-existing installation — populated before this flag
// existed — straight into "already onboarded" instead of re-gating it
// behind the interview.
if (!db.has('onboarded').value()) {
  db.set('onboarded', db.get('phases').value().length > 0).write();
}

module.exports = db;

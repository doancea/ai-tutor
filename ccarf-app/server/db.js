const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const seed = require('./seed');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const file = path.join(dataDir, 'ccarf.json');
const adapter = new FileSync(file);
const db = low(adapter);

// Only applies keys that don't already exist — safe to call on every boot.
db.defaults(seed).write();

module.exports = db;

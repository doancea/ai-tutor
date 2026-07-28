# CCAR-F Study App

Local, single-user tracker for your Claude Certified Architect — Foundations study plan.
Combines what used to be four separate Claude artifacts (resource docs, task/quiz tracker,
diagnostic results, time log) into one app with one data file.

Runs entirely on `localhost`. No auth, no network exposure, no external services required
beyond the doc/CDN font pulled by the browser.

## Setup (one-time)

```bash
npm install
```

This installs the server dependencies and, via `postinstall`, also runs `npm install`
inside `client/` for the frontend dependencies.

## Running it

**Normal day-to-day use** — build once, then just start it:

```bash
npm run build
npm start
```

Open **http://localhost:3131**. This is the mode you'll use most of the time — one process,
one port, and it's what stays running (or gets restarted) as you study.

**If you want to change the app itself** (edit React components, etc.) — use dev mode instead,
which hot-reloads the frontend:

```bash
npm run dev
```

This runs the API on port 3131 and the Vite dev server on port 5173 (proxying `/api` and `/docs`
to the API). Open **http://localhost:5173** while developing. Switch back to `npm run build && npm start`
for normal use once you're done making changes.

## Data

Everything you enter — task checkboxes, quiz answers, phase stamps, time log entries, diagnostic
results — lives in a single plain-JSON file: `data/ccarf.json`. It's created automatically on first
run, seeded with the current plan (phases, tasks, quiz questions) plus the two time-log entries and
the first diagnostic result you already had.

**Backup:** just copy `data/ccarf.json` somewhere safe. It's human-readable — you can open and edit
it directly if you ever need to fix something by hand.

**Reset:** delete `data/ccarf.json` and restart the server; it'll reseed from scratch (you'll lose
all logged progress, so back it up first if in doubt).

## Updating resource content

The Resources page reads markdown files directly from `docs/` and `docs/units/` — editing a resource
is just editing the relevant `.md` file and refreshing the page. No database changes needed for that.

## Project layout

```
ccarf-app/
├── server/          Express API + lowdb data layer
├── client/           React + Vite frontend
├── docs/              Resource markdown (read-only reference content)
├── data/              ccarf.json — all your logged state (created on first run)
└── package.json       Root scripts: dev, build, start
```

# AI Tutor

Local, single-user study plan generator and tracker for any Claude certification track.
An onboarding interview (Groups A–F) feeds a Claude agent call that generates your plan —
phases, tasks, and self-check quizzes — which then lives in the same tracker UI this app
started as (originally built for one person's Claude Certified Architect — Foundations plan).

Runs entirely on `localhost`. No auth, no network exposure, no external services required
beyond the Anthropic API call the interview triggers and the doc/CDN font pulled by the browser.

## Setup (one-time)

```bash
npm install
cp .env.example .env   # then fill in ANTHROPIC_API_KEY
```

`npm install` installs the server dependencies and, via `postinstall`, also runs `npm install`
inside `client/` for the frontend dependencies. The plan-generation call needs
`ANTHROPIC_API_KEY` set — get one from the [Anthropic Console](https://console.anthropic.com).

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
results, and the generated plan itself — lives in a single plain-JSON file: `data/ccarf.json`.
Your raw interview answers are never written there or anywhere else; only the plan the agent
generates from them is persisted.

**First run:** with no existing `data/ccarf.json`, the app opens straight into the onboarding
interview instead of the tracker. Completing it triggers the one-time plan-generation call and
switches the app into normal tracker mode from then on.

**Backup:** just copy `data/ccarf.json` somewhere safe. It's human-readable — you can open and edit
it directly if you ever need to fix something by hand.

**Reset:** delete `data/ccarf.json` and restart the server; you'll go through the interview again
from scratch (you'll lose all logged progress, so back it up first if in doubt).

**Demo/dev data:** set `SEED_DEMO=true` before first run to seed the original hand-authored
CCAR-F plan instead of starting with the interview — useful for developing on the tracker UI
without an API key or a live generation call.

## Updating resource content

The Resources page reads markdown files directly from `docs/` and `docs/units/` — editing a resource
is just editing the relevant `.md` file and refreshing the page. No database changes needed for that.

## Project layout

```
ai-tutor/
├── server/          Express API + lowdb data layer + plan-generation agent call
├── client/           React + Vite frontend, including the onboarding interview
├── docs/              Resource markdown (read-only reference content)
├── data/              ccarf.json — all your logged state (created on first run)
└── package.json       Root scripts: dev, build, start
```

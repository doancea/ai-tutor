# AI Tutor

A study plan generator and progress tracker for Claude certification tracks.

You answer a short onboarding interview — your role, experience, goals, how much time you have,
whether you've taken a practice test. Claude then researches the certification you're targeting and
writes you a personalised study plan: phases, tasks, and self-check quizzes. From then on the app is
a tracker, where you tick off tasks, take the quizzes, and log study time.

It runs entirely on your own machine. Nothing is hosted, there are no accounts, and nothing is sent
anywhere except the single call to Anthropic that generates your plan.

---

## Before you start

You'll need three things.

**1. A terminal.** On macOS that's the Terminal app; on Windows, PowerShell or Windows Terminal; on
Linux, whatever you already use. Every command in this README gets typed there.

**2. Node.js, version 18 or newer.** Node is the JavaScript runtime this app runs on. Check whether
you already have it:

```bash
node --version
```

If that prints something like `v20.11.0` or higher, you're set. If it errors or prints a version
below 18, install the current LTS release from [nodejs.org](https://nodejs.org). Installing Node
also installs `npm`, which the setup steps below use.

**3. An Anthropic API key.** This one has a catch worth understanding before you go looking for it —
see the next section.

---

## The API key, and why your Claude subscription isn't one

This is the step people get stuck on, so it's worth being explicit.

Anthropic sells two different things, and they don't share billing:

| | What it is | Works for this app? |
|---|---|---|
| **Claude.ai** — Free, Pro, Max | The chat product at [claude.ai](https://claude.ai), and the Claude Code subscription that rides on it | **No** |
| **Claude Developer Platform** (the API) | Programmatic access, billed per use, managed at [console.anthropic.com](https://console.anthropic.com) | **Yes** |

If you pay for Claude Pro or Max, that covers *you* talking to Claude through the chat app. It does
not give software you run a way to talk to Claude on your behalf. This app is software talking to
Claude on your behalf, so it needs the second thing: an API key, from the Console.

Confusingly, **Claude Code can use either** — it accepts a subscription *or* an API key. So it's easy
to have Claude Code working happily on your machine and reasonably assume you're all set here. You're
not; that's a subscription, and this app can't use it.

### Getting a key

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign in. You can use the same
   login as claude.ai — it's the same account, just a different product surface.
2. **Add credits.** Under [Billing](https://console.anthropic.com/settings/billing), add a payment
   method and buy some credit. A new API account has a zero balance, and a key with no credit behind
   it fails at the moment you submit the interview. $5 is plenty to start.
3. Go to [API keys](https://console.anthropic.com/settings/keys), create a key, and copy it. It
   starts with `sk-ant-`. **Copy it now** — the Console won't show it to you again, though you can
   always delete it and make a new one.

Treat the key like a password. Anyone who has it can spend your credit. The setup below puts it in a
`.env` file, which is already listed in `.gitignore` so it won't be committed by accident.

### What it costs

You are charged per use, not per month, and only for the plan generation. One measured run cost
about **$0.80** — call it a dollar. That's a one-time cost for a one-time call: generating your plan
is the only thing that talks to Anthropic. Ticking off tasks, taking quizzes, logging time, and
re-opening the app are all local and cost nothing, forever.

(If you're curious why a single call costs that much: it uses Claude's most capable model with
extended thinking and live web search, and re-reads its own search results on every internal step.
Current rates are on the [pricing page](https://platform.claude.com/docs/en/pricing). The model is
set at the top of `server/agent.js` if you ever want to change it.)

---

## Setup

Run these once, from inside the `app/` directory:

```bash
cd app
npm install
cp .env.example .env
```

- `npm install` downloads the app's dependencies. It also runs automatically inside `client/` for the
  frontend's dependencies, so one command covers both. Expect it to take a minute and print a lot.
- `cp .env.example .env` creates your local settings file. (On Windows PowerShell, use
  `copy .env.example .env`.)

Now open `.env` in any text editor and paste your key after the `=`, with no quotes and no spaces:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

Save it. That file stays on your machine and is never committed.

---

## Running it

**Normal use** — build the frontend once, then start the app:

```bash
npm run build
npm start
```

Open **http://localhost:3131** in your browser.

You only need `npm run build` after you change the app's code — day to day, `npm start` alone is
enough. This is the mode you'll use while actually studying.

To stop it, press **Ctrl+C** in the terminal where it's running. If you closed that terminal and the
app is somehow still up, `npm stop` will clear it — though that one relies on `lsof`, so it's
macOS and Linux only. On Windows, close the terminal window, or use Task Manager to end the Node
process.

**Development mode** — only if you want to edit the app's React components and see changes instantly:

```bash
npm run dev
```

This starts the API on port 3131 and a separate frontend dev server on port 5173. Open
**http://localhost:5173** while working this way. Switch back to `npm run build && npm start` when
you're done.

---

## Your first run

With no saved plan yet, the app opens straight into the onboarding interview instead of the tracker.
Work through the questions and submit.

**Generation takes several minutes.** Claude is thinking and searching the web for the real exam
structure while you wait, and the app shows a loading state for the whole time. This is normal — don't
close the tab or restart the server. When it finishes, your plan appears and the app switches into
tracker mode permanently.

If generation fails, your answers are kept on screen so you can fix whatever went wrong and resubmit
without retyping everything. See [Troubleshooting](#troubleshooting) below.

---

## Your data

Everything you enter — ticked tasks, quiz answers, phase completion stamps, time log entries,
diagnostic results, and the generated plan itself — lives in one plain-text file:
`data/learning-plan.json`.

Your raw interview answers are **not** saved, there or anywhere else. Only the plan Claude generates
from them is kept.

**To back up:** copy `data/learning-plan.json` somewhere safe. It's human-readable JSON — you can open
it in a text editor and fix something by hand if you ever need to.

**To start over:** delete `data/learning-plan.json` and restart the app. You'll go through the
interview again, which means another plan-generation call (and another ~$1). This erases all your
logged progress, so back it up first if there's any doubt.

**To explore without an API key:** set `SEED_DEMO=true` in your `.env` *before the first run*. The
app loads a pre-written sample plan instead of running the interview, which lets you click around
the tracker without spending anything — useful for deciding whether you want the app at all. This
only takes effect when there's no `data/learning-plan.json` yet; once you have a plan, the setting
is ignored rather than overwriting it.

---

## Troubleshooting

**`command not found: npm`** — Node isn't installed, or isn't on your PATH. Revisit
[Before you start](#before-you-start).

**`Error: Cannot find module ...`** — dependencies aren't installed. Run `npm install` from the `app/`
directory.

**The page at localhost:3131 is blank or 404s** — the frontend hasn't been built yet. Run
`npm run build`, then `npm start` again.

**`EADDRINUSE` / "port already in use"** — something is already on port 3131, most likely an older
copy of this app. Run `npm stop`, then start again. To use a different port instead:
`PORT=4000 npm start`.

**Plan generation fails with an authentication error** — the key is missing, malformed, or not being
read. Check that `.env` exists in the `app/` directory (not the repo root), that the line reads
`ANTHROPIC_API_KEY=sk-ant-...` with no quotes, and restart the server — `.env` is only read at
startup.

**"Your credit balance is too low"** — the key works, but the API account has no credit. Add some
under [Billing](https://console.anthropic.com/settings/billing). A claude.ai Pro or Max subscription
does not count here; see [the API key section](#the-api-key-and-why-your-claude-subscription-isnt-one)
above.

**Generation is taking minutes** — that's expected, not a hang. Extended thinking plus web search is
slow. Give it up to about five minutes before assuming something's wrong.

---

## Editing the resource pages

The Resources section reads Markdown files straight from `docs/` and `docs/units/`. To change what a
resource page says, edit the relevant `.md` file and refresh the browser. There's no build step or
database update for content.

---

## Project layout

```
app/
├── server/      Express API, the JSON data layer, and the plan-generation call to Claude
├── client/      React + Vite frontend, including the onboarding interview
├── docs/        Resource content as Markdown (read-only reference material)
├── data/        learning-plan.json — your plan and all logged progress (created on first run)
├── .env         Your API key (created by you during setup; never committed)
└── package.json The npm scripts: dev, build, start, stop
```

The repository root, one level up, holds the design documents — the reasoning behind how the
interview, the agent call, and the tracker fit together. `ARCHITECTURE-DECISIONS.md` is the useful
starting point if you want to understand how the pieces connect, and `BACKLOG.md` tracks known
issues and planned work.

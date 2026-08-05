# AI Tutor

**Two things live in this repository:** a working application, and the complete design record of
how it was built in collaboration with an AI agent.

The app is a study plan generator and progress tracker for Claude certification tracks. You answer a
short onboarding interview; Claude researches the certification you're targeting and writes you a
personalised study plan — phases, tasks, and self-check quizzes — which then becomes a tracker you
work through. It runs entirely on your own machine.

The design record is the larger half. Nearly every decision behind the app was written down as it
was made, along with the reasoning that produced it and, where relevant, the reasoning that was
rejected. That material is here deliberately, not as leftover scaffolding.

---

## Pick your path

**I want to run the app** → **[`app/README.md`](app/README.md)** has setup, prerequisites, and
troubleshooting written for someone who hasn't done this before.

Two things worth knowing before you start:

- It needs an **Anthropic API key** from [console.anthropic.com](https://console.anthropic.com). A
  Claude.ai Pro or Max subscription is *not* an API key and won't work here — the app README explains
  why, and why having Claude Code working already doesn't mean you're set up.
- Generating a plan costs roughly **$0.80** as a one-time charge. Using the tracker afterwards is
  free and entirely local.

**I want to see how it was designed** → start with
[`ARCHITECTURE-DECISIONS.md`](ARCHITECTURE-DECISIONS.md) for how the pieces connect, then
[`CASE-STUDY-NOTES.md`](CASE-STUDY-NOTES.md) for what actually happened while building it.

---

## The design record

Every document below states a decision *and* the reasoning behind it, so that a later reader — human
or agent — can tell a deliberate choice from an accident.

### How the system works

| Document | What's in it |
|---|---|
| [`ARCHITECTURE-DECISIONS.md`](ARCHITECTURE-DECISIONS.md) | How the interview, the agent call, and the tracker connect. Also where the v1 scope is locked: single-user, self-hosted, bring-your-own-key. **Start here.** |
| [`DECISIONS.md`](DECISIONS.md) | Why the original single-user app — before any generalization — was built the way it was. |
| [`INTERVIEW-DECISIONS.md`](INTERVIEW-DECISIONS.md) | The onboarding interview's design: what each question group asks, and why it earns its place. |
| [`INTERVIEW-SCRIPT.md`](INTERVIEW-SCRIPT.md) | The literal question copy implied by those decisions. |
| [`BACKLOG.md`](BACKLOG.md) | Known defects, deferred work, and future scope, grouped into release tiers (v1 → v1.5 → v2 → v3) with the line between them stated explicitly. |

### How the design was validated

Rather than ship the interview and find out, it was tested against synthetic users first.

| Document | What's in it |
|---|---|
| [`TEST-PERSONAS.md`](TEST-PERSONAS.md) | 23 synthetic personas — cert-anchored, cross-cutting, margin, and coverage-gap cases — built to stress specific parts of the interview. |
| [`PERSONA-DECISIONS.md`](PERSONA-DECISIONS.md) | Why those 23 and not others. |
| [`GROUNDING-DECISIONS.md`](GROUNDING-DECISIONS.md) | The mechanics of running the exercise: the persona/interviewer subagent split, the adaptive repeat-testing loop, and what counts as a finding. |
| [`groundings/`](groundings/) | The 29 raw grounding records produced by running it. More records than personas because several were re-run after the interview changed — the superseded runs are kept rather than overwritten. |
| [`GROUNDING-FINDINGS.md`](GROUNDING-FINDINGS.md) | The cross-persona synthesis, and what changed in the interview as a result. |

### How the work was done

| Document | What's in it |
|---|---|
| [`CASE-STUDY-NOTES.md`](CASE-STUDY-NOTES.md) | A running, evidence-first log of the collaboration itself — wrong assumptions caught in production, fixes reached empirically rather than by guessing, tooling limits that turned out not to work as assumed, and claims that had to be retracted. Raw material, captured as it happened rather than reconstructed afterwards. |
| [`PROCESS-DECISIONS.md`](PROCESS-DECISIONS.md) | Meta-analysis of *how* the interview decisions were reached, as distinct from what they were. |
| [`CLAUDE.md`](CLAUDE.md) | The standing instructions any AI agent session in this repo operates under. Included because it's part of the method, not configuration to be skipped past. |

---

## Status

Tagged **v1.0.0**. The app works end to end: interview, generation, tracking.

Scope is deliberately narrow and locked — single-user, self-hosted, bring-your-own-key, nothing
deployed. The v1 release tier was defined as *make what already exists correct* rather than add
features, and it's closed.

Known limitations are tracked openly in [`BACKLOG.md`](BACKLOG.md) rather than left to be
discovered:

- **One credential per plan.** A staged path (foundations → professional) gets compressed into a
  milestone phase. The app now says so in its notes instead of staying quiet about it; the
  structural fix needs a data-model change and is scheduled for v2.
- **No grounding-file export yet** — planned for v1.5.
- **Generation is synchronous** and blocks for minutes. Acceptable for one local user, not for
  anything shared.

---

## Layout

```
ai-tutor/
├── app/                     The application — see app/README.md to run it
│   ├── server/              Express API, JSON data layer, plan-generation call
│   ├── client/              React + Vite frontend, including the interview
│   ├── docs/                Study resource content (Markdown)
│   └── data/                Your plan and progress (created on first run, never committed)
├── groundings/              29 raw persona grounding records
├── *-DECISIONS.md           Design rationale (see the tables above)
├── CASE-STUDY-NOTES.md      Running log of the collaboration itself
├── BACKLOG.md               Defects and future scope, in release tiers
└── CLAUDE.md                Standing instructions for AI agent sessions here
```

---

## License

[MIT](LICENSE). Use it, fork it, build on it.

Note that the design record — the decision documents, grounding records, and case-study notes — is
covered by the same license as the code. It's meant to be read, quoted, and argued with.

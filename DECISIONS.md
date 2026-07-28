# DECISIONS.md

A log of the choices made building this project and why — for when a future session (or
future you) wonders "why is it built this way?" instead of just "what does it do?". Newest
context at the bottom, roughly chronological.

## Certification target: Developer → Architect

Started with a plan targeting the **Claude Certified Developer (CCDV-F)** credential, based on
general interest in learning Claude/Claude Code. Pivoted to **Claude Certified Architect
(CCAR-F)** once the consulting-role context came up — Architect fits a "design the solution,
not just build it" role better, which matches actual day-to-day work more than the
hands-on-API-mechanics focus of the Developer track. Developer-track content wasn't discarded —
it's folded in as supporting knowledge under the Architect plan (API mechanics, token economics,
etc. underpin good architecture judgment even if not separately tested).

## Where domain weights and hour estimates came from

CCAR-F domain weights are **not published in one single canonical Anthropic source** in an
easily citable way — they were triangulated across multiple independent prep sites, which
converge on: Agentic Architecture 27%, Claude Code Config & Workflows 20%, Prompt Engineering
20%, Tool Design & MCP 18%, Context Mgmt & Reliability 15%. Treat these as "consistent across
sources, not officially confirmed" — worth checking against Anthropic's actual exam guide
before making high-stakes decisions (like scheduling the real exam) off them.

Initial hour estimates (65–90h total) came from reasoning about domain weight, complexity, and
how much would be "free" via daily Claude Code use vs. needing deliberate practice — not from
any external benchmark.

## Diagnostic #1 and the resulting reallocation

A real diagnostic (28-question mock exam, external site) returned 737/1000 (pass), with a
domain breakdown showing a perfect score in Agentic Architecture (6/6) and weaker scores in
Prompt Engineering (3/6) and Context Mgmt & Reliability (3/5).

**Explicit instruction from the person:** treat a good multiple-choice score with skepticism
(recognition ≠ recall/application), weight misses more than hits, and err toward keeping
content in the plan rather than cutting it. This is why:
- Agentic Architecture's hours were **not reduced** despite the perfect score — the domain
  rewards pattern-matching against a small known taxonomy, which multiple-choice format makes
  easier than it would be in application.
- Prompt Engineering, Claude Code Config & Workflows, and Context Mgmt & Reliability all got
  **more** hours and more specific tasks, targeting the exact sub-skills the wrong answers
  revealed (retry-vs-escalate judgment, few-shot example design, calibration anchors,
  mode-selection judgment, progressive-summarization pitfalls, risk-calibrated review design).
- Two domains got **retitled** (Claude Code Configuration → "...& Workflows", Context
  Management → "...& Reliability") because the diagnostic revealed the real exam's scope for
  those domains is broader than the original naming implied.

If another diagnostic is taken, apply the same logic: don't reward a good score by cutting
time, do respond to a bad score by adding specific, targeted tasks (not just "study more").

## Why combine the tracker and time log

Originally two separate artifacts with two different progress signals (checked tasks vs.
logged hours), which would drift out of sync. Decision: **logged time is the source of truth
for hour-based progress**; **task completion is a separate, parallel signal**, not merged into
one number. Both are shown, neither overrides the other. The "validated" stamp per phase still
requires task completion + quiz score, independent of hours logged — hours logged is about
pace/time-budget, not proof of understanding.

## Stack choices for the local app

- **lowdb (JSON file) over SQLite**: explicitly requested "lighter weight than SQL," and
  human-readable/hand-editable data was called out as a nice property. If this ever needs to
  scale past one person's study log, swapping the data layer is a contained change — the
  route/API layer doesn't need to know how `db.js` persists data.
- **Express over Fastify/plain http**: chosen for ecosystem familiarity/extensibility, not
  performance — this app's load is trivially small (one user, occasional requests).
- **React + Vite over server-rendered HTML**: the visual design system (blueprint theme) was
  already built as React components in earlier Claude artifacts (the tracker, the diagnostic,
  the time log) — reusing them was cheaper and more consistent than rebuilding in a different
  paradigm.
- **CommonJS on the server, ESM on the client**: not a strong opinion, just what fell out of
  Express/lowdb v1's conventions vs. Vite's ESM-native tooling. Fine to leave as-is.

## Visual design: the "blueprint" theme

Chose a technical/architectural-drawing aesthetic (deep navy background, faint grid overlay,
amber accents, monospace data labels, a literal rotated "VALIDATED" rubber-stamp mark) rather
than a generic dashboard look. Reasoning: thematically ties to the "Architect" certification
itself, and avoids common AI-generated-UI clichés (terracotta/cream palettes, generic
dark-mode-plus-neon). Consistency here matters more than any individual color choice — new UI
should extend this system rather than introduce a new one.

## Handoff to Claude Code

The app was built, dependency-installed, built (`vite build`), and smoke-tested (server boot +
live API calls against seeded data) before being handed off as a zip — not just scaffolded and
assumed to work. Continue that standard: when adding features, actually run them before calling
them done, not just write code that looks plausible.

# ARCHITECTURE-DECISIONS.md

A log of the choices made on how the generalized (multi-user, multi-certification) learning
plan generator is actually built — separate from `INTERVIEW-DECISIONS.md` (what the onboarding
interview asks and why) and `DECISIONS.md` (why the original single-user CCAR-F app was built
the way it was). This file is about the system around the interview: how answers get from the
interviewee to a generated plan to the tracker UI. Newest context at the bottom, roughly
chronological.

## Parking lot — open topics not yet discussed

- **TypeScript framework choice(s)** for the generalized app — not yet discussed, come back to
  this before implementation starts.

## Interview → agent → tracker integration, high level

**Decision:** The onboarding interview and the existing tracker are two flows in the same app,
connected by a server-side plan-generation step. The agent is a new capability the app doesn't
currently have at all — `seed.js`'s static phases/tasks were hand-authored once, in a separate
Claude conversation, and pasted in; there is no existing code path that calls an LLM to produce
a plan. Building the generalized version means adding one.

Shape of the flow:
- Interview answers are collected and sent to a new server-side route/service — never called
  client-side, since a hosted multi-user app can't put an API key in client code.
- That service calls the agent, which returns plan-shaped data (phases/tasks/quizzes/etc., in
  the same shape the tracker UI already knows how to render — just agent-generated per person
  instead of hand-seeded once).
- The raw interview transcript is **not** persisted into the live per-user working store once
  it's been passed to the agent — the person has no further in-app use for their own answers
  after the plan exists. It may optionally be appended to a separate, offline log for future
  datamining, decoupled from what the app reads at runtime. The per-user working store holds
  plan data only, same as today.
- Generation is **not** a one-shot event run once at onboarding. Two already-locked interview
  behaviors require the agent to be invoked again later: Group D's "provisional plan pending an
  external diagnostic recommendation," and Group E's skepticism policy, which explicitly applies
  "to any assessment result the agent encounters over the life of the plan," not just the intake
  diagnostic. So the agent needs to exist as a reusable generate/revise service callable at
  multiple trigger points (initial generation, diagnostic-result-driven revision, later
  reassessment) — not a setup script that runs once and is done.
- Multi-user data isolation falls out of this: today `db.js` is one lowdb file for exactly one
  person. Supporting other people needs either per-user files (`data/<userId>.json`) or a
  `users`-keyed structure within one file. Per-user files likely preserve the
  human-readable/hand-editable property `DECISIONS.md` valued for the original app, just at
  per-user granularity — but this requires some identity concept, even a minimal one, since the
  app currently has no notion of "who is this" at all.

**Why:** Follows directly from tracing what currently exists vs. what "generate a plan from an
interview" actually requires. The server-side-only constraint is a hard requirement of hosting
this for multiple people, not a preference. The "not one-shot" requirement isn't a new
architectural preference either — it's a direct consequence of interview decisions already
locked in (Group D, Group E). Dropping the raw transcript from the live store follows directly
from the person's own statement that their answers have no further use to them once the agent
has consumed them.

**How to apply:** Schema work (profile collections, certifications config, domain IDs,
template/instance separation) should proceed from this shape — specifically, there is no
`profile` collection in the live per-user store, since raw answers don't live there. Any
schema/data-model decisions from here should assume: (1) a callable agent service, not a script,
(2) plan data as the only thing persisted per user in the working store, (3) per-user isolation
resolved before further schema decisions are finalized.

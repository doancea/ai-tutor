# ARCHITECTURE-DECISIONS.md

A log of the choices made on how the generalized (multi-user, multi-certification) learning
plan generator is actually built — separate from `INTERVIEW-DECISIONS.md` (what the onboarding
interview asks and why) and `DECISIONS.md` (why the original single-user CCAR-F app was built
the way it was). This file is about the system around the interview: how answers get from the
interviewee to a generated plan to the tracker UI. Newest context at the bottom, roughly
chronological.

## Parking lot — open topics not yet discussed

- **Certification scope for v1** — which tracks are actually in scope now vs. later.
- **Agent invocation timing** — synchronous (interview submit blocks until a plan is ready) vs.
  async (kick off generation, notify when done).

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
  after the plan exists. (Superseded below: this is now ephemeral-only, not even logged offline.)
  The per-user working store holds plan data only, same as today.
- Generation is **not** a one-shot event run once at onboarding. Two already-locked interview
  behaviors require the agent to be invoked again later: Group D's "provisional plan pending an
  external diagnostic recommendation," and Group E's skepticism policy, which explicitly applies
  "to any assessment result the agent encounters over the life of the plan," not just the intake
  diagnostic. So the agent needs to exist as a reusable generate/revise service callable at
  multiple trigger points (initial generation, diagnostic-result-driven revision, later
  reassessment) — not a setup script that runs once and is done.
- ~~Multi-user data isolation falls out of this...~~ **Superseded — see "Single-user,
  self-hosted scope decision" below.** This paragraph assumed one shared deployment serving many
  people; v1 scope is single-user/self-hosted instead, which removes the isolation problem
  entirely (the instance itself is the identity boundary). Left here, struck through rather than
  deleted, in case scope ever expands to hosted/multi-tenant later.

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

## Single-user, self-hosted scope decision

**Decision:** For v1, the generalized app is **single-user, self-hosted** — each person runs
their own instance (their own copy/deployment), the same fundamental model as the original app,
rather than one shared deployment serving many people. This resolves the identity/auth question
raised above: there is no user table, no per-user keying, no login system, because the running
instance itself is the identity boundary. Three things that follow from "self-hosted" were
checked explicitly rather than assumed:

- **API key**: provided by the host — i.e. whoever deploys/runs their own instance supplies their
  own Anthropic API key, configured once as a server-side environment variable. It is never asked
  as an interview question, never stored in the data store, and never exposed to client code.
- **Stack/framework**: no change from the existing Express + React/Vite split. A Next.js move was
  considered (motivated by wanting a unified client/server framework to run the agent call
  server-side) but rejected on reflection — that reasoning was based on a mistaken premise that
  the current app was an in-browser monolith. It already has a server/client split; Express
  already gives the agent call a server-side home. No reason to change the architecture here.
  Because the stack is unchanged, the lowdb file-based persistence question (raised when Next.js
  /serverless hosting was on the table) is also moot — self-hosting still means a persistent
  process the person runs themselves, same as the original app, not a serverless deployment where
  a file-based store wouldn't reliably persist.
- **Transcript handling**: tightened past "drop from the live store" (stated above) to "never
  persisted at all" — interview answers are held only in memory for the duration of the
  questionnaire → generation round-trip, then dropped. No offline log, no local retention, no
  datamining use — that idea is fully retired, not just softened, since self-hosted removes any
  channel back to a central collector and deliberately adding one would be its own consent/privacy
  decision, not a byproduct of this one.

**Why:** Single-user/self-hosted was an explicit, direct choice for v1 scope (not derived from
anything else) — but each of the three sub-questions it raises needed checking rather than
assuming, since "self-hosted" is a spectrum (bring-your-own-key vs. shared key; unified framework
vs. keep the existing split; local retention vs. none) and the wrong assumption on any of them
would have cascaded into schema and privacy decisions made by default rather than on purpose.

**How to apply:** Multi-user isolation, auth, and hosted-deployment concerns are out of scope for
v1 and shouldn't shape schema decisions going forward — schema work should assume exactly one
user's data per running instance. Revisit the struck-through multi-user paragraph above only if
scope explicitly expands beyond single-user/self-hosted later.

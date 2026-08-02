# ARCHITECTURE-DECISIONS.md

A log of the choices made on how the generalized (multi-user, multi-certification) learning
plan generator is actually built — separate from `INTERVIEW-DECISIONS.md` (what the onboarding
interview asks and why) and `DECISIONS.md` (why the original single-user CCAR-F app was built
the way it was). This file is about the system around the interview: how answers get from the
interviewee to a generated plan to the tracker UI. Newest context at the bottom, roughly
chronological.

## Parking lot — open topics not yet discussed

- **Supplemental-material persistence and flow** — the new post-interview freeform step (see
  `INTERVIEW-DECISIONS.md`, "Post-interview supplemental step") needs the same kind of flow
  decision this doc already made for structured interview answers: does it follow the "never
  persisted, in-memory for the round-trip only" rule above, or does it need different handling
  since it's less structured and potentially reused across later agent invocations (diagnostic
  revision, reassessment)? Not yet decided.

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

## Certification scope for v1 — open-ended, not a fixed track list

**Decision:** The agent is not restricted to a hand-encoded list of supported certification
tracks. Group A Q3 already takes a free-text target certification with no fixed enum
(`INTERVIEW-DECISIONS.md`); the agent-side behavior generalizes that openness rather than
constraining it — for whatever track is named (or recommended from Q1+Q2 when none is), the
agent uses the Claude API's server-side web search tool at generation time to find the track's
domain weights, exam structure, and any credible third-party diagnostics, the same way
`DECISIONS.md`'s "Where domain weights and hour estimates came from" describes doing by hand for
the one original case (CCAR-F/Architect-Foundations).

**Why:** A fixed short list (encode Architect-Foundations, Developer-Foundations,
Associate-Foundations by hand, like `seed.js` does today for one track) would cap the generalized
app at the same single-cert scope the original app had, just renamed — directly contradicting the
point of generalizing it. The interview was already designed around an agent that reasons over
prose rather than a rules engine matched against a fixed taxonomy (`INTERVIEW-DECISIONS.md`,
"Consumer of these answers is an AI agent, not a rules engine"); hand-coding a cert allowlist
would reintroduce exactly that kind of rigid taxonomy at the generation layer, one level down from
where the interview design already rejected it. Research quality is unverified by a human up
front for any track beyond the original CCAR-F case — accepted as the tradeoff for not artificially
limiting scope, and consistent with Group E's whole premise that the agent, not a human, is
responsible for vetting the reliability of anything it finds.

**How to apply:** The plan-generation agent call includes the `web_search_20260209` server-side
tool (Claude Opus 5, per the `claude-api` skill's current defaults) so it can research an
unfamiliar track's domain weights and exam structure rather than inventing them. This is a
capability requirement on the agent call itself, not a new interview question or a new persisted
config list — no `certifications` collection needs to exist in the data model for this. Group D's
existing skepticism-calibration policy (`INTERVIEW-DECISIONS.md`, "Group E — folded into Group D")
already gives the agent a framework for treating a newly-discovered diagnostic source with
appropriate caution, and generalizes cleanly to newly-discovered domain-weight sources too.

## Agent invocation timing — synchronous

**Decision:** The interview-submit request blocks on the server until the generated plan is
ready; there is no job queue, polling endpoint, or "generation in progress" persisted state for
v1.

**Why:** Simplicity, weighed against the single-user/self-hosted scope already locked above: one
generation call competes with no other traffic on a self-hosted instance, so the async
alternative's main benefit (not blocking other users' requests) doesn't apply here. A synchronous
call also avoids inventing a persisted "pending generation" concept that would need its own
data-model and recovery-on-crash handling for a feature (multi-tenant throughput) v1 doesn't have.
Async generation can be revisited if generation latency in practice makes a blocking request a
bad interactive experience, or if scope ever expands past single-user.

**How to apply:** The server-side plan-generation route makes one Claude API call (with `web_search`
per the certification-scope decision above) and returns the resulting plan data in the same HTTP
response the interview submission triggered. The client shows a loading state for the duration of
that request; no separate status-check endpoint is needed. Streaming the response is an
implementation detail for managing that wait, not a change to this decision — the request is still
one round trip from the client's perspective.

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

> **Update (2026-08-03) — that expansion has now been named, for v2.** A closed beta — hosted,
> gated by one-time-use codes, run among professional colleagues rather than opened to public
> signup — is captured in `BACKLOG.md` as v2, and it deliberately reverses the
> transcript-handling rule above: interview answers *and* generated plans are to be collected, for
> refinement of the grounding work. That is precisely the "datamining use" retired here, so it is
> recorded as an explicit supersession rather than allowed to drift — which is what the paragraph
> above asks for ("deliberately adding one would be its own consent/privacy decision, not a
> byproduct of this one"). **The reversal is scoped to hosted deployments only**: self-hosted v1
> keeps never-persisted unchanged. The consent, retention, identifiability, and deletion questions
> the reversal opens are listed in `BACKLOG.md` under v2 and are part of that tier's definition of
> done, not launch-time cleanup. Scoped to v2 specifically — `BACKLOG.md`'s v3 records why that
> posture cannot carry into a paid, openly-reachable version.
>
> A smaller, earlier question sits at `BACKLOG.md` v1.5: a user-initiated download of their own
> grounding file, still self-hosted, with opt-in sharing. That is arguably not "retention" in the
> sense retired here — no operator, no central collector, the person exporting is the person who
> entered the answers — but the wording above is broad enough that it needs an explicit, scoped
> clarification rather than being absorbed silently. Flagged there as a pre-build check.

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

## Claude API access — official SDK, server-side only, non-beta surface, hand-rolled resume loop

**Decision:** All Claude API access goes through the official `@anthropic-ai/sdk` Node package,
called only from the server, only on the non-beta `client.messages.create` surface, from a single
call site (`app/server/agent.js`). The `pause_turn` resume loop in that file is hand-written rather
than delegated to the SDK's tool runner.

**Why:** Four separate choices, worth recording individually because three of them look like
defaults and the fourth looks like a mistake:

- **SDK over raw HTTP.** No hand-built requests against `api.anthropic.com` anywhere — the SDK
  handles auth resolution, retries on 429/5xx, and typed errors we'd otherwise reimplement. The
  zero-arg `new Anthropic()` constructor also resolves credentials from the environment, which is
  what made entry 37's key-setup back-and-forth end in a zero-code-change outcome.
- **Server-side only.** The key is loaded via `dotenv` in `server/index.js` and never reaches the
  browser; the React client talks only to our own Express routes. Correct regardless of the
  single-user/self-hosted scope locked above, and not something to relax if that scope changes.
- **Non-beta surface.** Everything currently used — `web_search_20260209`, `output_config.format`,
  adaptive thinking — is GA, so there's no reason to take a beta dependency. This is a live
  constraint, not a preference: adding the server-side `fallbacks` parameter to improve the
  `refusal` path would require moving to `client.beta.messages` plus a beta flag.
- **Hand-rolled `pause_turn` loop, deliberately.** The obvious objection is "why not use the SDK's
  tool runner?" — and the answer is that it would not help. The tool runner exists to execute
  *your* client-side tool functions in a loop; our only tool is the server-side `web_search`, which
  Anthropic executes, so there is nothing for the runner to run. It also does not auto-resume
  `pause_turn`: a paused turn ends the runner and is returned as the final message with no error,
  so we would still be writing our own pause handling, just with a beta dependency added on top.

**How to apply:** Keep `agent.js` as the single Claude call site — new agent capabilities belong
there rather than in a second client elsewhere in the server. Do not "modernize" the resume loop
into the tool runner; the loop's known defects (see `BACKLOG.md` — dropped history and no iteration
cap) are ours to fix in place, and an SDK upgrade will not resolve them. Revisiting
the non-beta choice is triggered by needing a specific beta feature, `fallbacks` being the likely
first one — not by the tool runner.

## Multi-credential / staged certification paths — the plan needs a credential concept

**Decision:** The plan data model gains an explicit credential grouping. Today there is a single
`targetCertification` string and a flat `phases[]` array, which can represent exactly one
credential; a plan spanning a staged path (foundations → professional) has nowhere structural to
express the staging. The direction is additive: a `credentials[]` array (`{id, name, status}`,
ordered) plus a `credentialId` on each phase, leaving the flat `phases[]` in place so existing
consumers keep working and progress can roll up per credential rather than across the whole plan.

The exact field set is **not** locked — `status`, how exam weights attach per credential, and
whether the tracker UI shows a milestone moment between credentials are open. What is settled is
the shape of the problem: one credential per plan is a real constraint, and it should be relaxed
in the data model rather than worked around in the prompt.

**Why:** This surfaced empirically on the first real generation run (2026-08-03), not from design
review. The user's interview named both Architect certifications — Foundations and Professional.
The generated plan did account for both, but compressed all of Foundations into a single 7-10 hour
phase while giving Professional six proportionally-weighted phases.

The tell was not the compressed phase, it was this, returned in `targetCertification`:

> `"Claude Certified Architect – Professional (CCAR-P), reached via Architect Foundations (CCAR-F)
> as a staged milestone"`

That is a free-text field carrying structure. Given one string and one flat phase list, the model
had two options: emit both full plans concatenated (doubling length and making tracker progress
meaningless — "60% complete" across two credentials with separate exams says nothing), or compress
the earlier credential into a milestone phase. It chose the latter, which is arguably the *correct*
call under the constraint rather than a failure. When a model encodes a relationship into a string
field the schema can't hold, that is a reliable signal the schema is missing a concept — a cleaner
diagnostic than the output symptom itself.

Prompt-tuning ("give foundations proportional treatment") was considered and rejected: it fights
the data model rather than fixing it, and would make progress semantics worse, not better, by
producing a longer flat list with no credential boundary.

**Caveat, recorded because it is not resolvable after the fact:** it is not actually known whether
the compression was wrong. If the interview answers indicated the foundations material was already
largely covered, 7-10 hours is the right answer and there is no defect here at all. The answers are
not persisted (by explicit decision — see "Single-user, self-hosted scope decision" above), so there
is no record to check the judgment against. The design gap stands on the `targetCertification`
evidence regardless, but the severity is unmeasured. This is the strongest argument on the record
for revisiting the never-persisted decision, and notably it is an *evaluation* argument, not a UX
one — the UX case that was initially assumed alongside it turned out not to exist, since
`client/src/pages/Interview.jsx` retains answers across a failed generation. See `BACKLOG.md` v1.5
and v2 for where retention is actually taken up.

**How to apply:** Treat single-credential as a current limitation, not an invariant, when doing
schema work. Anything that assumes one `targetCertification` per store — progress rollups, the
cert label in the UI, completion criteria — is a site that will need revisiting. Do not address
staged paths by adding instructions to `buildSystemPrompt`.

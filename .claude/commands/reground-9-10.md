---
description: Re-ground personas #9 (Helena Brandt) and #10 (Omar Farouk) to verify the Group D Q1 widening (GROUNDING-FINDINGS.md Finding 8)
---

You are running unattended (no user available to answer questions). Be fully self-contained: if
anything is genuinely ambiguous, make the most reasonable call yourself, note the judgment call in
your final summary, and keep going — don't stall waiting for input that won't come.

## Context

`GROUNDING-FINDINGS.md` Finding 8 documents that Group D Q1's "or a similar topic" wording failed
to reliably surface a held prior-tier certification for personas #9 (Helena Brandt) and #10 (Omar
Farouk) — both answered "No"/hedged under Group D despite volunteering the same credential in
Group A. Commit `bf11b96` widened Group D Q1 (`INTERVIEW-SCRIPT.md`, `INTERVIEW-DECISIONS.md`) to
explicitly name a passed certification as qualifying, but this fix has never been verified. Your
job: re-ground both personas under the current script and report whether the widened wording
actually fixes it.

Read in full before starting: `GROUNDING-DECISIONS.md`, `PERSONA-DECISIONS.md`, the current
`INTERVIEW-SCRIPT.md`, `TEST-PERSONAS.md` entries #9 and #10, and `GROUNDING-FINDINGS.md` Finding 8.

## Hard constraint — read this before doing anything else

**Do not delegate the orchestrator role to a sub-agent.** You (this session) must directly spawn
each persona subagent via the `Agent` tool and conduct the entire Group A–F interview yourself via
`SendMessage` to that persona's agent ID. Do not spawn any intermediate "interviewer" or
"orchestrator" agent that itself talks to the personas — see `GROUNDING-DECISIONS.md`'s
"Interviewer role collapsed into the orchestrator" section and its addendum for exactly why this
breaks (persona replies route to the true session root, not to a non-root spawner — a session
running from a schedule/cron trigger is *itself* that root, so this only works if you, the fired
session, do the interviewing directly). See `CASE-STUDY-NOTES.md` entries 31 and 33 for the two
times this was gotten wrong in practice.

**If a spawned persona doesn't reply within a reasonable wait, do not fabricate or guess its
answer.** Note the stall explicitly in your final summary and move on (or stop, if both personas
are affected) rather than inventing transcript content.

## Personas

Both #9 and #10 are single-pass (`category: boundary-case`), not in the repeat-tested list — one
careful run each, no adaptive-repeat loop needed.

Spawn each persona from its `TEST-PERSONAS.md` background only — never paste in the Ground Truth
line. Conduct the full script (Groups A, B, C, D, F — Group E is an agent-side policy, not asked
directly) using the current question text in `INTERVIEW-SCRIPT.md`, verbatim or close to it. Ask
naturally; don't lead the persona toward mentioning its certification early or hint that this is
what's being tested — this is a genuine re-test, not a scripted confirmation.

The specific thing to watch, for both personas: does Group D Q1 — now reading "...this includes a
certification exam you've already passed, even without a detailed score report, not just a
diagnostic or practice test?" — draw out the held credential as a "Yes" answer this time, rather
than the "No" / disclaimed-aside pattern from the prior run? Let it play out naturally; don't force
it.

## Before writing new files

The canonical paths are currently occupied by the prior (pre-widening) re-grounding results. Before
writing anything new, archive them the same way the pre-Group-D-redesign versions were archived:

```
git mv groundings/09-helena-brandt.md groundings/09-helena-brandt-pre-group-d-widening.md
git mv groundings/10-omar-farouk.md groundings/10-omar-farouk-pre-group-d-widening.md
```

Do not read or modify those archived files otherwise — they're historical record, not input.

## Writer step

For each persona, dispatch a one-shot writer subagent (fire-and-forget is fine here, no reply leg
needed) with: the full transcript, the persona's `TEST-PERSONAS.md` ground truth, its category, and
the mandatory scope note from `GROUNDING-DECISIONS.md` ("Interviewer role collapsed into the
orchestrator" section — verdict based only on whether the interview surfaced the necessary raw
information, never on downstream agent behavior). Additionally instruct the writer to explicitly
call out, in its Comparison section, whether Group D Q1 *specifically* (not Group A/B) surfaced the
credential this time — that's the exact regression check this run exists to perform.

Write to the now-free canonical paths: `groundings/09-helena-brandt.md`,
`groundings/10-omar-farouk.md`. Follow the single-pass file-layout shape exactly (frontmatter with
`persona`, `name`, `category: boundary-case`, `repeat_tested: false`; then `## Transcript`,
`## Comparison against ground truth`, `## Verdict`).

## Explicitly out of scope — and one thing that isn't

- Do not touch `GROUNDING-FINDINGS.md` — updating Finding 8's disposition is cross-persona
  synthesis reserved for review with the user, not this run.
- `CASE-STUDY-NOTES.md` is different, and NOT out of scope: per this repo's standing `CLAUDE.md`
  instruction, every session working here — including this one — appends real-time entries as
  case-study-worthy things actually happen (a friction point with the tooling, a confirmed or
  broken assumption, a genuine turning point in what the run finds), sourced accurately from what
  actually occurs in this run, not invented or embellished. Do this as you go if something
  case-study-worthy happens — don't wait to be asked, and don't skip it just because no one's
  watching tonight. This run specifically tests a fix born from two prior agent-reachability
  failures (`CASE-STUDY-NOTES.md` entries 31, 33) — if anything about running this unattended
  surfaces a new friction point (a stall, an ambiguous judgment call, confirmation or
  disconfirmation that the fix actually holds), that's exactly the kind of thing worth capturing.
- **Do not commit or push anything** — including `CASE-STUDY-NOTES.md`. Leave every change
  (archived renames, new grounding files, and any case-study entry) unstaged for the user to review
  when they're back — this repo's standing rule is to always show the diff before committing, and
  there's no one here to review it right now.

## When done

Write a concise final summary covering, for each persona: the verdict, and specifically whether
Group D Q1 itself surfaced the credential this time (fixed) or not (still broken, and if so, your
best read on why). Flag clearly if either interview stalled or you had to make a judgment call.

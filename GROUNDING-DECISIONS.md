# GROUNDING-DECISIONS.md

How the grounding exercise itself is executed — not why the personas exist or how they're shaped
(`PERSONA-DECISIONS.md`), not what the real interview asks (`INTERVIEW-DECISIONS.md` /
`INTERVIEW-SCRIPT.md`), and not the generalized app's own architecture
(`ARCHITECTURE-DECISIONS.md`). This file is scoped to the test harness: the mechanics of running
the 22 personas through the interview script to produce groundings. Newest context at the bottom,
roughly chronological.

## Persona/interviewer split and agent-handle mechanics

**Decision:** Step 1 of the grounding plan splits the exercise into two distinct subagent roles
rather than one — a **persona** subagent that persists for the duration of its own interview, and
a separate **interviewer** subagent that runs the entire script (Groups A–F) for that persona in
one continuous spawn, rather than being respawned per question group.

**Why:** The original plan (recorded in `PERSONA-DECISIONS.md`'s "live subagents" section) assumed
Step 1 would resume the 19 already-spawned persona subagents via `SendMessage`. That failed
outright — sending to a persona by its own name came back "no agent... reachable." A throwaway
test spawn confirmed why: the subagent tool has no human-readable name registry for ad-hoc spawns,
only a raw, unpredictable `agentId` returned at spawn time, and that's the only durable handle. The
original 19 personas' IDs weren't retained across an intervening context compaction, so those
personas are gone as *reachable* processes, regardless of which role you'd want to persist. That
reframes the real requirement: persistence is only possible for whichever party's ID gets captured
and held for as long as it's needed — and only the persona actually needs that, since it's the one
party whose character has to stay consistent across the whole interview.

A first pass at this had the interviewer respawned fresh per question group, fed the
transcript-so-far as input each time, on the reasoning that the interviewer "doesn't need memory
of its own." True, but that doesn't require a fresh spawn per group — a single interviewer
subagent can make multiple sequential `SendMessage` calls to the same persona `agentId` within one
continuous invocation (Group A, then B, then C with its conditional follow-up, and so on),
deciding each next question and branch live using its own accumulating context instead of an
externally-handed transcript. This gets the identical genuine multi-turn interview and correct
branch-handling (Group C's deadline follow-up, Group D's diagnostic follow-up) with far less
orchestration overhead — one interviewer spawn per persona instead of one per question group. This
also still upgrades the exercise from one consolidated single-message reply per persona (the
original Step 1 shape) to a genuine multi-turn interview — arguably a more faithful analog of a
real one.

**How to apply:** For each persona: spawn it fresh from its `TEST-PERSONAS.md` background only
(never the Ground Truth line), capture its `agentId`, and hold that ID only as long as that
persona's interview is in progress — safe to discard once its transcript is complete. Then spawn
one interviewer subagent, hand it the full `INTERVIEW-SCRIPT.md` and the persona's `agentId`, and
let it conduct the whole interview in that single invocation — asking each group's question(s) via
sequential `SendMessage` calls to the persona, handling conditional branches as they come up, and
returning the complete transcript at the end. No `agentId` needs to persist past its own persona's
interview, and the interviewer never needs one at all.

## Repeat-interviewing: which personas, how many times, how aggregated

**Decision:** Most personas get a single interview pass (Step 1 as described above, one grounding
record each). Ten get run through an adaptive repeat loop instead of a flat number of times: a
**floor of 2** independent runs, stopping early on agreement, extending one run at a time on
disagreement up to a **hard cap of 7**, with the resulting verdicts aggregated into one record
rather than kept as separate grounding files per run.

**Why:** A single transcript can't distinguish two different failure modes: "the interview doesn't
invite this signal" (a real interview-design flaw) from "this one generation happened not to
mention it" (noise from the persona subagent's own phrasing variance). Repeating the *same*
persona several times, in fully independent runs, separates them — if the signal surfaces
consistently it's robust; if it surfaces inconsistently, that inconsistency is itself the finding.
This only pays for itself where a ground truth genuinely depends on a detail that's plausibly told
with variable prominence across tellings — bucketed-choice answers (hours/week, deadline yes/no)
and clean solid-fit cases don't have that risk, so they stay single-pass.

A flat repeat count was considered and rejected: it spends the same budget on every persona
regardless of what the data actually shows, rather than spending more only where the evidence
warrants it. The adaptive rule instead: run 2, stop if they agree (cheap resolution for a
persona whose signal turns out to be reliable); if they disagree, that disagreement is the
interesting case, so keep going one run at a time until either a 2-vote-lead majority emerges or
the cap is hit. The cap must land on an **odd** total — at an even total an exact tie is
numerically possible (2-2, 3-3), which would force the loop to stop at a dead, uninformative
result; an odd total always has at least a 1-vote lean, so a forced stop is never fully
ambiguous. Parity alone only says "must be odd," though — it doesn't pick a specific number, since
5, 7, 9... all avoid the exact-tie problem equally. The actual choice between them is about
resolving power: a low cap (5) risks getting stuck reporting a bare 3-2 lean when a slightly more
asymmetric true signal (say 65/35) just needed one or two more rounds to resolve into a confirmed
majority. 7 buys that extra room cheaply, because the added cost mostly lands exactly where it's
wanted: the 7 edge/cross-cutting personas should mostly resolve at the 2-run floor if the
interview design is doing its job, so the higher cap is mainly exercised by the 3 margin
personas — which are built to be unresolvable, so reliably walking out to the cap without a
majority is itself the expected, correct outcome for them, not a wasted run.

Selected for repeat-testing (7 edge/cross-cutting personas whose signal is extraction-dependent,
plus all 3 margin personas by construction — see `PERSONA-DECISIONS.md`):
- **#2 Devon Ruiz** — buried automation detail
- **#4 Ilana Voss** — goal-language redirect signal
- **#6 Grace Liu** — architecture judgment vs. thin recent hands-on
- **#8 Tobias Kruger** — mismatch only caught if background gaps come through as clearly as ambition
- **#16 Whitney Cole** — role-scope mismatch vs. a named (wrong) target
- **#17 Anjali Mehta** — risk of "zero Claude experience" getting buried under AWS/ML narrative
- **#19 Farid Haidari** — same shape, competing-tool narrative vs. the Claude-specific gap
- **#20 Marisol Tan, #21 Jonas Eriksen, #22 Camille Duarte** — margin personas, ambiguous by
  construction, not extraction-dependent, but the same repeat-and-aggregate mechanism applies

**Exception:** **#5 Sam Okafor** stays single-pass but gets one especially careful, deliberate run
rather than being lumped in with the low-stakes single-pass group — it's the primary regression
anchor (a restatement of the one real precedent case), not ambiguous, but too important to treat
casually.

**How to apply:** For each of the 10 selected personas, run the full persona+interviewer spawn (per
the section above) independently, with no persona or interviewer agent reused across repeats:
1. Run 2. If both agree on the signal in question, stop — report `2/2 consistent`.
2. If they disagree, run one more at a time. Stop as soon as one side reaches a 2-vote lead over
   the other (e.g. 3-1, 4-2) — report the majority plus the dissent, e.g. `3/4 surfaced, 1 missed`.
3. If the cap of 7 total runs is reached without a 2-vote-lead margin, stop and report the tally
   as-is (e.g. `4/7 surfaced, 3 missed`) rather than forcing a verdict — for margin personas this
   is the expected outcome, not a failure to resolve.

Record one grounding file per persona containing every transcript run plus the final aggregated
verdict, not a separate file per run.

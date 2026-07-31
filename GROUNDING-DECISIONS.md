# GROUNDING-DECISIONS.md

How the grounding exercise itself is executed — not why the personas exist or how they're shaped
(`PERSONA-DECISIONS.md`), not what the real interview asks (`INTERVIEW-DECISIONS.md` /
`INTERVIEW-SCRIPT.md`), and not the generalized app's own architecture
(`ARCHITECTURE-DECISIONS.md`). This file is scoped to the test harness: the mechanics of running
the 19 personas through the interview script to produce groundings. Newest context at the bottom,
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

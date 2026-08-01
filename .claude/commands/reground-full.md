---
description: Re-run the full standard grounding exercise (all 22 personas, adaptive 2-7 run loop where applicable) under the current interview script
---

You are running unattended (no user available to answer questions). Be fully self-contained: if
anything is genuinely ambiguous, make the most reasonable call yourself, note the judgment call in
your final summary, and keep going — don't stall waiting for input that won't come.

## Context

This is a full re-verification of the grounding exercise — all 22 personas, run fresh against
whatever `INTERVIEW-SCRIPT.md` currently says — not a first-time execution. Existing groundings for
all 22 personas already exist from prior runs at various points in the script's history; this
command supersedes all of them under the current script state.

Read in full before starting: `GROUNDING-DECISIONS.md` (especially "Repeat-interviewing: which
personas, how many times, how aggregated" and "Grounding file layout"), `PERSONA-DECISIONS.md`, the
current `INTERVIEW-SCRIPT.md`, and all 22 entries in `TEST-PERSONAS.md`. Skim `GROUNDING-FINDINGS.md`
for prior findings that might inform what to watch for, but don't treat it as a checklist to satisfy
— run each interview fresh and honestly.

## Hard constraint — read this before doing anything else

**Do not delegate the orchestrator role to a sub-agent.** You (this session) must directly spawn
each persona subagent via the `Agent` tool and conduct the entire Group A–F interview yourself via
`SendMessage` to that persona's agent ID, for every persona and every run. Do not spawn any
intermediate "interviewer" or "orchestrator" agent that itself talks to the personas — see
`GROUNDING-DECISIONS.md`'s "Interviewer role collapsed into the orchestrator" section and its
addendum for exactly why this breaks (persona replies route to the true session root, not to a
non-root spawner — a session running from a schedule/cron trigger is *itself* that root, so this
only works if you, the fired session, do the interviewing directly, for all 22 personas, not by
handing any subset of them off). See `CASE-STUDY-NOTES.md` entries 31 and 33 for the two times this
was gotten wrong in practice.

**If a spawned persona doesn't reply within a reasonable wait, do not fabricate or guess its
answer.** Note the stall explicitly in your final summary — for that persona and any not yet
started — rather than inventing transcript content. Continue with the remaining personas rather
than aborting the whole run over one stall.

You may interleave multiple personas' interviews concurrently (tracking each one's live agent ID
and current script position) rather than running all 22 strictly one at a time, if that's more
efficient — `GROUNDING-DECISIONS.md`'s "How to apply" for this section explicitly allows it.

## Persona categories (verify against `GROUNDING-DECISIONS.md` and `TEST-PERSONAS.md` as source of
truth — this list is a convenience cross-check, not the authority, in case either doc has changed)

**Single-pass, one run each (11):** #1 Priya Nandakumar, #3 Marcus Webb, #7 Renata Alves,
#9 Helena Brandt, #10 Omar Farouk, #11 Naomi Ferreira, #12 Ravi Chandrasekaran, #13 Elena Petrova,
#14 Yuki Tanaka, #15 Casey Whitfield, #18 Diego Fuentes.

**Single-pass exception, one especially careful run (1):** #5 Sam Okafor — the primary regression
anchor; still uses the single-pass file shape (`category: regression-anchor`), just conducted with
extra care rather than casually.

**Repeat-tested, adaptive floor-2/cap-7 loop (10):** #2 Devon Ruiz, #4 Ilana Voss, #6 Grace Liu,
#8 Tobias Kruger, #16 Whitney Cole, #17 Anjali Mehta, #19 Farid Haidari (edge/cross-cutting, 7
total), plus #20 Marisol Tan, #21 Jonas Eriksen, #22 Camille Duarte (margin personas, 3 total).

For the repeat-tested set, apply the adaptive rule exactly as `GROUNDING-DECISIONS.md` specifies:
run 2 independent interviews; if they agree on the signal in question, stop and report
`2/2 consistent`; if they disagree, run one more at a time until one side reaches a 2-vote lead
(e.g. `3/4 surfaced, 1 missed`), or until 7 total runs are reached, in which case report the tally
as-is without forcing a verdict. No persona or interviewer agent is reused across repeats — spawn
each run fresh from the `TEST-PERSONAS.md` background only, never the Ground Truth line.

## Before writing new files

For each of the 22 personas, before writing its new grounding file, archive whatever currently sits
at its canonical path (all 22 currently have one, from prior runs):

```
git mv groundings/NN-persona-name.md groundings/NN-persona-name-archived-<today's date, YYYY-MM-DD>.md
```

Do this per-persona right before writing that persona's new file (not all 22 up front), so a stall
partway through doesn't leave canonical paths missing for personas you haven't gotten to yet. Do
not read or modify the archived files otherwise — they're historical record, not input.

## Writer step

For each persona, once its interview(s) are complete, dispatch a one-shot writer subagent
(fire-and-forget, no reply leg needed) with: the full transcript (all runs, uncondensed, for
repeat-tested personas), the persona's `TEST-PERSONAS.md` ground truth, its category, and the
mandatory scope note from `GROUNDING-DECISIONS.md` ("Interviewer role collapsed into the
orchestrator" section — verdict based only on whether the interview surfaced the necessary raw
information, never on downstream agent behavior). Writers can run in parallel across personas.

Write to the now-free canonical path `groundings/NN-persona-name.md`. Follow the file-layout shape
exactly per `GROUNDING-DECISIONS.md`: single-pass shape (frontmatter with `persona`, `name`,
`category`, `repeat_tested: false`; `## Transcript`, `## Comparison against ground truth`,
`## Verdict`) for the 12 single-pass personas, repeat-tested shape (adds `runs`, `cap_hit`,
`verdict`; `## Transcript` with `### Run N` subsections; per-run comparison then aggregated
verdict) for the 10 repeat-tested ones.

## Explicitly out of scope — and one thing that isn't

- Do not touch `GROUNDING-FINDINGS.md` — cross-persona synthesis across the 22 groundings is
  reserved for review with the user, not this run.
- `CASE-STUDY-NOTES.md` is different, and NOT out of scope: per this repo's standing `CLAUDE.md`
  instruction, every session working here — including this one — appends real-time entries as
  case-study-worthy things actually happen (a friction point with the tooling, a confirmed or
  broken assumption, a genuine turning point in what the run finds), sourced accurately from what
  actually occurs in this run, not invented or embellished. Do this as you go if something
  case-study-worthy happens — don't wait to be asked, and don't skip it just because no one's
  watching. A full 22-persona run is a large, unattended, multi-hour undertaking — if anything
  about it surfaces a genuine friction point or lesson (a stall, a persona category that behaved
  unexpectedly, an interesting agreement/disagreement pattern in the repeat-tested set), that's
  worth capturing, not just the grounding files themselves.
- **Do not commit or push anything** — including `CASE-STUDY-NOTES.md`. Leave every change
  (archived renames, new grounding files, and any case-study entry) unstaged for the user to review
  when they're back — this repo's standing rule is to always show the diff before committing, and
  there's no one here to review it right now.

## When done

Write a concise final summary: a scoreboard (how many Surfaced / Partial / Missed / stalled, and
how many repeat-tested personas needed more than the 2-run floor), plus a short note on any persona
whose verdict changed from what its archived prior grounding said, or whose interview stalled and
was skipped. This is the thing a future session will read first — make it possible to tell at a
glance whether anything regressed.

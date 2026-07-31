# PERSONA-DECISIONS.md

The rationale behind the 19 synthetic personas in `TEST-PERSONAS.md` — why they exist and why
they're shaped the way they are, distinct from that file itself (the roster) the same way
`INTERVIEW-DECISIONS.md` is distinct from `INTERVIEW-SCRIPT.md`. Newest context at the bottom,
roughly chronological.

## Why synthetic personas at all

**Decision:** Build 19 synthetic test personas as grounding cases for the interview design,
rather than waiting for real interviewees.

**Why:** `PROCESS-DECISIONS.md`'s grounding test says every interview design choice should trace
to a concrete case, not an abstract guess — that's exactly what the one real diagnostic in
`DECISIONS.md` provided for the original single-user build. The generalized interview has no
equivalent: it's designed for people who don't exist yet in any recorded form. Once cert scope
expanded to all four current tracks at both levels, there was no real case covering most of that
matrix at all. Synthetic personas are a deliberate, clearly-labeled stand-in for that missing
real-world grounding — not a replacement for it, and not presented as real data anywhere in these
docs.

**How to apply:** Persona-driven findings carry real weight for interview design (same as the
real diagnostic did), but should never be quietly treated as equivalent to actual user data once
real interviewees exist. If real transcripts become available later, they supersede synthetic
ones as grounding evidence for any given case they overlap with.

## Matrix structure: solid-fit + edge case per cert cell, boundary-stress for non-existent tiers

**Decision:** Ten personas anchor the cert × level matrix — one solid-fit and one edge-case
persona for each of the four real cells (Associate-F, Developer-F, Architect-F, Architect-P),
plus two boundary-stress personas for the tiers that don't exist yet (Associate-Professional,
Developer-Professional).

**Why:** A solid-fit persona alone only proves the interview works when nothing is wrong — it
can't catch the failure modes that actually matter, which live in the edge cases (buried signals,
role mismatches, skill-level mismatches). Pairing every cell with both types tests that clean
cases don't regress *and* that hard cases actually get caught, rather than only one or the other.
The two boundary personas exist because "cover all intersections of the matrix" is ambiguous at
cells that don't correspond to a real product yet — rather than skip them, they're framed as a
test of whether the agent recognizes the gap (no such cert exists) instead of inventing one.

**How to apply:** Any future cert or tier added to scope should get the same treatment — a
solid-fit and an edge-case persona at minimum, not just one representative case.

## Cross-cutting dimensions layered on top, not fully crossed against the matrix

**Decision:** Nine additional personas each isolate one other locked-in interview dimension
(deadline extremes, budget extremes, diagnostic outcome, diagnostic sourcing, cert-agnostic path,
named-target mismatch, cross-vendor credential, non-tracker format preference, competing-tool
experience) as a single stress point, reusing cert placements already covered rather than
crossing every dimension against every cert cell.

**Why:** A literal full cross-product across cert × level × deadline × budget × diagnostic ×
format × modality would run into the hundreds of personas and mostly test the same underlying
mechanism repeatedly rather than surfacing new failure modes. This is the same reasoning
`PROCESS-DECISIONS.md` applies to bucketed-choice design (test #6) and to rejecting
combinatorial precision that doesn't add real signal — exhaustiveness for its own sake isn't the
goal, coverage of genuinely distinct failure modes is.

**How to apply:** If a new interview dimension gets added later, it should get its own isolated
persona (or a small number of them) rather than triggering a re-cross of the entire existing
matrix.

## Personas as live subagents, not static written profiles

**Decision:** Each persona is instantiated as an actual subagent (via the Agent tool), holding
its character across turns, rather than existing only as a written description I answer
questions on behalf of.

**Why:** If I write both the interview questions and the "persona's" answers myself, the exercise
mostly tests my own internal consistency, not whether the interview actually elicits the needed
signal from an independent process. A subagent that reasons about its own persona and responds in
character introduces the same kind of realistic variance, omission, and phrasing a real
interviewee would — which is the entire point of a grounding exercise.

**How to apply:** Step 1 of the grounding plan resumes these existing subagents (via
`SendMessage`) rather than spinning up fresh one-off completions per question — continuity of
character across the whole interview matters more than efficiency here.

## Ground-truth notes withheld from the persona subagents

**Decision:** Each persona's "correct" interview outcome (documented in `TEST-PERSONAS.md`) was
never given to that persona's subagent — only its own background facts were.

**Why:** Directly mirrors the reasoning that killed the self-sentiment question in Group D and
the calibration question in Group E — a real interviewee doesn't know the "right answer" about
their own cert fit, that's precisely what the interview and agent are supposed to figure out.
Giving a persona subagent its own answer key would let it perform toward the expected outcome
instead of answering as itself, invalidating the test before it starts.

**How to apply:** Ground-truth notes are for comparison after the fact (Step 2 of the grounding
plan) — they should never be pasted into a persona subagent's context, including during any later
re-runs or follow-up questioning of these same personas.

## Scope boundary: grounding the interview's content, not the agent's plan-generation

**Decision:** This entire persona exercise validates whether the interview *collects the right
information* — it does not test whether a correct plan gets generated from that information,
since the plan-generation agent itself doesn't exist yet.

**Why:** Consistent with the standing "design only, no code changes yet" constraint that's held
for this whole generalization effort. It would be easy to let "does Tobias Kruger's mismatch get
caught" quietly become "does the agent correctly recommend Foundations first" — but the second
question requires generation logic nobody has designed yet. Keeping the boundary explicit avoids
scope creep from an interview-grounding exercise into building the thing it's meant to inform.

**How to apply:** Grounding findings should be phrased as "the interview did/didn't surface X,"
never as "the agent did/didn't recommend Y" — the latter isn't yet a real capability to evaluate.

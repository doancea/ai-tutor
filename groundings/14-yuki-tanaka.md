---
persona: 14
name: Yuki Tanaka
category: edge-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Solutions Architect at a mid-size enterprise software company
  (fintech-adjacent, builds internal tooling/integrations for banking clients). ~9 years
  professional experience overall, 6 in architecture-type roles. AI tool experience more modest —
  ~8 months regular use, mostly Claude via chat and some API work for prototyping internal
  assistants. Claude fits in mostly for design doc drafting, reviewing architecture proposals,
  some scripting help.
- Q2 (goals): Wants to walk into the Architect-Professional exam and pass it — wants to know
  she's covered the actual exam blueprint rather than just "getting better at Claude" vaguely.
  Certification is the deliverable her manager wants to see.
- Q3 (target cert): Yes — Claude Architect-Professional. Knows it just launched recently.

**Group B**
- Q1 (tool experience): Chat for drafting/reasoning through design tradeoffs, some direct
  API/SDK usage in Python for internal prototypes (tool use, basic RAG setup), a little Claude
  Code CLI (a handful of times for a side project), no real MCP experience yet, prompt
  engineering mostly informal/on-the-job.
- Q2 (prior structured learning): No formal courses yet. Skimmed a couple Anthropic docs pages
  and one blog post on agent architectures, nothing structured. No other vendor AI certs — does
  have an old AWS Solutions Architect Associate cert from a few years back, offered as
  possibly-relevant context on the "architect" framing.

**Group C**
- Q1 (framing) + follow-up: Semi-hard deadline — manager wants her certified within the quarter,
  ~10-12 weeks out. Not contractual/legal, more performance-goal-driven.
- Q2 (budget) + Q2b (distribution): 5-6 hours/week realistically, irregular — some weeks a
  couple hours on a weeknight, other weeks more concentrated on a weekend if work is slow.

**Group D**
- Q1: No — hasn't taken a diagnostic or mock exam for this. Honestly hasn't found one to take;
  since the track just launched wasn't sure what's out there, and hasn't looked very hard
  either. (No further follow-up per script, since answer was "No.")

**Group F**
- Q1 (format): Structured tracker/checklist, ideally with clear milestones to show progress
  against — will also help report status to her manager.
- Q2 (modality) + Q2a + Q2b (all answered together): Mix, leaning hands-on — learns better
  building than reading in the abstract. Wants hands-on tasks sized around what she can finish in
  one sitting (an hour or two) rather than sprawling multi-week projects, given fragmented time.

## Comparison against ground truth

Ground truth: direct test of Group D's third fallback path — agent should search, find nothing
viable (Architect-Professional is freshly launched with thin external prep-site coverage), and
only then construct its own lightweight check, rather than skipping straight to that step or
omitting a diagnostic step entirely.

As written, that ground truth describes downstream agent behavior (searching, then constructing a
lightweight check) — explicitly out of scope for this exercise per `PERSONA-DECISIONS.md`'s
standing scope boundary: grounding validates whether the interview *collects* the right
information, not whether a correct plan gets generated from it, since that agent doesn't exist
yet. The interview-scoped question is narrower: did the script surface, clearly and without
prompting toward the "right" answer, the two facts this case depends on — (a) that Yuki hasn't
taken or looked for a diagnostic, and (b) enough about *why* (target is freshly-launched, she
wasn't sure what's out there, didn't look very hard) that a downstream agent would have what it
needs to recognize this isn't a simple "no diagnostic, plenty of options" case?

Both facts surface cleanly in Group D Q1, in a single unprompted answer. She states the "no"
plainly, and volunteers — without being asked a follow-up, since the script has none for a "no"
answer — the two-part reasoning the ground truth needs downstream: the track "just launched" (the
freshness signal that explains why external prep material is thin) and she "wasn't sure what's out
there" and "hasn't looked very hard" (distinguishing a genuine no-viable-option case from a case
where she simply skipped an available diagnostic). Group A Q3 corroborates the freshness detail
independently ("knows it just launched recently"), so the signal isn't resting on a single
sentence. Nothing in the transcript required the interviewer to lead her toward this framing —
it's fully volunteered.

The downstream fallback-path behavior the ground truth actually names (search, find nothing
viable, then construct a lightweight check rather than skipping to it or omitting a diagnostic
step) is a plan-generation question this transcript can't and shouldn't try to answer — noted here
as an aside only, per scope, not as a modifier on the verdict below.

## Verdict

**Surfaced.** Group D Q1 elicits both load-bearing facts unprompted and in one answer: no
diagnostic taken or sought, and the specific reasoning (freshly-launched target, uncertainty about
what exists, limited search effort) a downstream agent would need to tell this case apart from an
ordinary "no diagnostic, plenty of options" one. The ground truth's downstream fallback-path
behavior is out of scope per the standing scope boundary and doesn't affect this verdict.

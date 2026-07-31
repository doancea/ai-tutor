# PROCESS-DECISIONS.md

A meta-analysis of the interview design work recorded in `INTERVIEW-DECISIONS.md` — pulled out
on request before further architecture/scope decisions were made, so the *reasoning pattern*
behind the interview isn't lost or reinvented as the generalized app grows past it. Two layers:
the **why** (content-level reasons behind specific decisions) and the **how** (the recurring
process/tests applied regardless of topic). Where `INTERVIEW-DECISIONS.md` is the record of
*what was decided*, this is the record of *the method that produced those decisions* — useful
for evaluating any future interview question against the same standard, not just the six groups
already locked in.

## The why — content-level reasoning behind specific decisions

Every question in the interview traces back to a concrete fact from `DECISIONS.md`, not an
abstract "this seems like useful info to have":

| Decision | Reference-case fact it's grounded in |
|---|---|
| Split role/experience into labeled fields (Group A) | The real pivot (Developer→Architect) hinged on "consulting role, design-not-build" — a detail a vague "software engineer" answer would likely have omitted |
| Goals before target-cert, cert optional (Group A) | The person started with "general interest," not "I need Architect" — self-selection started fuzzy/wrong; forcing an early cert pick would have suppressed the exact ambiguity that mattered |
| Open-ended tool experience, no course checklist (Group B) | Real profile was lopsided (heavy Claude Code use, ~zero API) — a uniform-shape question would have flattened that |
| Certs aren't the organizing frame (Group B) | Plan is tailored to the person's goals; a Claude-cert-specific checklist would reinforce exactly the vendor-funnel framing the process is trying to avoid |
| Deadline framing required, before budget (Group C) | Real hour estimates explicitly factored "how much is free via daily Claude Code use" — distribution/deadline context changes what the budget number even means |
| Bucketed hour ranges, low-end anchored (Group C) | Direct restatement of the explicit instruction: don't reward optimistic assumptions with a tighter plan |
| Diagnostic sourcing pushed to the agent (Group D) | The real diagnostic was itself an external third-party product, not self-generated — "agent builds its own" is the least-precedented fallback, not the default |
| Skepticism policy, not a self-sentiment question (Group D/E) | Direct restatement of the explicit instruction: treat a good MCQ score with skepticism, weight misses over hits, err toward keeping content |
| Plan format required (Group F) | `seed.js` has one hardcoded shape (phases→tasks→quizzes→time log) — no safe universal default exists |

The common thread: nothing was designed by imagining what *might* be useful to know about a
hypothetical user. Each field exists because something like it demonstrably changed the shape
of the one real plan on record.

## The how — process patterns used across every group

These are the recurring tests applied regardless of topic, worth naming because they're what
would let this process extend cleanly to new questions later, without re-deriving the method
from scratch:

1. **Grounding test.** Before any question was accepted, it had to point to a specific line in
   `DECISIONS.md` that it would have changed or explained. No precedent, no question — this is
   what killed several ideas before they got far.

2. **Open-by-default; structure only for two named reasons.** Free text is the default because
   the consumer is an agent, not a rules engine. Structure gets added only to (a) guard against
   incomplete/vague answers, or (b) bound answers to what the current software can actually act
   on — never to make something machine-parseable for its own sake.

3. **Self-report rejection test.** Three separate ideas (Likert self-rating grid, self-sentiment
   on diagnostic accuracy, MCQ-calibration self-awareness) were all rejected by the same
   question: *does the person's own belief about X change what the agent should do?* If the
   answer's the same regardless of what they report, it's not interview content — it's either
   dropped or converted into a fixed agent policy.

4. **Interview-question vs. agent-behavior test.** Some things feel natural to ask but actually
   offload research burden the person isn't positioned to carry (finding a viable external mock
   exam) or ask them to specify something structurally true independent of opinion (task
   granularity within a format). The test: would asking get *better* information than the agent
   deriving or researching it — or does it just misplace the work?

5. **Required-vs-optional test.** Not a stylistic choice — a field is required exactly when
   skipping it leaves the agent with no non-arbitrary default (plan format, deadline framing),
   and optional when a safe fallback exists (learning modality defaults to "mixed").

6. **Bucketed-choice as a distinct third pattern.** Neither fully open nor a self-rating grid —
   used specifically when an answer is objective-but-coarse (hours/week) or otherwise risks
   vagueness at full openness (plan format, hands-on type). Distinguished from the rejected
   Likert grid by one test: is this coarsening an objective quantity, or dressing up subjective
   self-perception as data?

7. **Iterative, sign-off-gated logging.** Nothing entered `INTERVIEW-DECISIONS.md` without
   discussion and explicit confirmation first — and several decisions only reached their final
   shape *because* of a correction mid-discussion (Group C's required/optional flip, Group D's
   missed "hasn't-taken-one-but-could" middle branch, Group F's rejected granularity question
   redirected back to format). The corrections weren't noise around the process — they're
   evidence the grounding test in #1 was actually being applied rather than rubber-stamped.

**How to apply:** any new interview question proposed later (for architecture/scope reasons or
otherwise) should be run through tests 1–6 before being drafted, and logged only after the same
discuss-then-sign-off step in #7 — not fast-tracked because the topic feels obviously necessary.

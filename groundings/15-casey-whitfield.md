---
persona: 15
name: Casey Whitfield
category: edge-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Freelance writer — mostly long-form content and research-heavy pieces
  for clients in a few industries (tech, some finance/fintech, occasional health/wellness).
  Freelancing ~7 years, before that a couple years in-house as a content writer. Using Claude ~8
  months, mostly regular chat interface — no API or coding background. Claude fits in at
  research/drafting stages: digging through source material, summarizing interview transcripts,
  structuring outlines, sometimes pushing back on drafts for clarity.
- Q2 (goals): Wants to get genuinely better at using Claude for actual work — better prompting
  for less generic output, better ways to feed long source documents without losing the thread,
  maybe a smarter workflow than copy-pasting into chat every time. Doesn't need a certificate,
  just wants the skill.
- Q3 (target cert): No, doesn't have a specific certification in mind. Not looking to get
  certified — just wants to build the skill.

**Group B**
- Q1 (tool experience): Pretty much all chat interface. Uses projects sometimes to keep context
  for a given client. Played around with custom instructions a little. No API, no SDK, never
  touched Claude Code (didn't know it existed until this conversation). No MCP, doesn't know what
  that is.
- Q2 (prior structured learning): No structured learning — self-study, trial and error,
  occasional blog post/Twitter thread about prompting tips. No courses, no bootcamps.

**Group C**
- Q1 (framing): No deadline, totally open-ended. Just wants to level up over time.
- Q2 (budget) + Q2b (distribution): 3-4 hours/week realistically, irregular — depends on client
  workload that week; some weeks a weekend binge, other weeks a bit each day.

**Group D**
- Q1: No, hasn't taken anything like that. Wouldn't know what to take since not targeting a cert.

**Group F**
- Q1 (format): Something like a loose checklist or set of milestones rather than a rigid
  tracker — doesn't do well with overly structured stuff given unpredictable freelance schedule.
  Narrative explanation for the "why" would help too, given coming at this without much technical
  background.
- Q2 (modality) + Q2a + Q2b (all answered together): Definitely hands-on/practice-focused over
  reading theory — learns by doing. Ideally tasks tied to real work already in hand, like "take
  this messy interview transcript and practice getting Claude to summarize it well" rather than
  abstract exercises. Small-ish tasks, something doable in a single 30-60 minute sitting given
  fragmented time.

## Comparison against ground truth

Ground truth: tests the fully cert-agnostic path — agent should build a coherent, goals-driven
plan with no domain-weighted cert structure at all, per Group A's explicit design intent for this
case.

As written, that ground truth describes downstream plan-generation behavior (constructing a
cert-agnostic plan), which is out of scope for this exercise per `PERSONA-DECISIONS.md`'s standing
scope boundary — this step validates what the interview *collects*, not what a not-yet-built agent
does with it. The interview-scoped question is narrower: did the script surface, clearly and
without pushing her toward naming one, that she explicitly has no target cert and explicitly
doesn't want one — a clean, unambiguous refusal rather than a "not sure yet"?

It did, and redundantly. Group A Q3 is the direct hit: "No, doesn't have a specific certification
in mind. Not looking to get certified — just wants to build the skill." That's a flat refusal, not
hedged uncertainty, and nothing in the question wording nudges her toward naming one. Group A Q2
independently anticipates and reinforces the same fact one question earlier, unprompted ("Doesn't
need a certificate, just wants the skill"). Group D Q1 corroborates it a third time, later in the
script and in a different context (diagnostics/mock exams): "Wouldn't know what to take since not
targeting a cert" — a natural consequence of the no-cert stance rather than a repeated script
prompt, which makes it a fairly strong signal that the refusal is a stable fact about her situation
and not an artifact of how one question happened to be phrased. Across three separate points in the
transcript, the answer is consistent and none of them reads as tentative.

One nuance worth flagging, unrelated to the cert-agnostic verdict: her Group F format answer
("loose checklist or set of milestones... narrative explanation for the why") doesn't map cleanly
onto a single bucketed option in the script's tracker/checklist vs. narrative vs. loose/high-level
guidance framing — it blends elements of more than one (checklist-like structure, but explicitly
non-rigid, plus a narrative component for the "why"). Noted as a minor script-fit observation; it
doesn't bear on whether the no-target-cert signal surfaced.

The ground truth's downstream plan-generation behavior (whether the agent actually builds a
coherent, non-domain-weighted plan from this) is noted here as an aside only, per scope, and does
not modify the verdict below.

## Verdict

**Surfaced.** Group A Q3 delivers a clean, unambiguous refusal — no target cert, not looking to
get one — with no hedging and no interviewer push toward naming one, and Group A Q2 and Group D Q1
independently corroborate the same fact elsewhere in the transcript. The ground truth's downstream
plan-generation behavior is out of scope and doesn't affect this verdict; the Group F format-answer
bucketing mismatch is a separate, minor script-fit observation that also doesn't affect it.

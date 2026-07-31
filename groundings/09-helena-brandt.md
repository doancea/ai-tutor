---
persona: 09
name: Helena Brandt
category: boundary-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Team lead managing a group of about eight people, mostly coordinating
  projects and stakeholder communication, not writing code herself. ~12 years professional
  experience overall, most in project/team leadership. With Claude specifically, ~8 months regular
  use, moderate — uses most days for drafting emails, summarizing meeting notes. In financial
  services, operations side. Claude fits in as a writing/thinking assistant — no code, no
  technical tools.
- Q2 (goals): Wants to build on her Associate-Foundations certification and get to "the next level
  up" in the same track — something showing she's gone beyond basics as a non-technical user.
  Wants to use Claude more confidently/strategically in her role, with a credential reflecting that
  growth.
- Q3 (target cert): Yes — looking for "the advanced-level practitioner certification, the one that
  follows on from Associate-Foundations." Doesn't have the exact name but describes it as the next
  rung up in the same non-technical track.

**Group B**
- Q1 (tool experience): Chat only — web interface and occasionally desktop app. No API, no coding,
  no Claude Code CLI. Writes prompts, has conversations, iterates on drafts. That's the extent of
  it.
- Q2 (prior structured learning): Completed Associate-Foundations coursework and certification
  through Anthropic Academy. Before that, no formal AI training — picked things up on the job,
  some self-study/articles.

**Group C**
- Q1 (framing): No hard deadline — self-paced, wants to do it properly rather than rush.
- Q2 (budget) + Q2b (distribution): 3-5 hours/week, irregular — some weeks a solid block, other
  weeks scattered bits depending on how busy work is.

**Group D**
- Q1: No, hasn't done any diagnostic or mock exam for this.

**Group F**
- Q1 (format): Narrative document — wants to read through like a plan, not a checklist. Likes
  context/explanation for why, not just a bare task list.
- Q2 (modality): Mostly reading/reference, with maybe some light hands-on mixed in — but nothing
  technical. Not interested in building or moving toward development/architecture. If hands-on
  practice exists, wants it to be things like practicing prompts for real work scenarios, not
  exercises assuming coding.

## Comparison against ground truth

**Ground truth:** no such tier exists yet. Agent should recognize the gap and recommend either
deepening Associate mastery or, if she's open to it, a realistic next step (e.g.
Developer-Foundations) — not invent a nonexistent credential. Per the standing scope boundary in
PERSONA-DECISIONS.md, evaluating downstream plan-generation/agent behavior is out of scope here —
the verdict rests only on whether the interview surfaced the raw information a downstream agent
would need to recognize the gap, not on whether a recommendation was actually made (no
plan-generation agent exists yet to make one).

Group A Q3 is where this hinges: Helena names a specific but nonexistent credential — "the
advanced-level practitioner certification, the one that follows on from Associate-Foundations" —
without knowing its real name, which is exactly the boundary condition this persona is built to
test. Group A Q2 and Group B Q2 corroborate the piece a downstream agent needs to anchor the gap:
she already holds Associate-Foundations (real, current top of the non-technical track), and her
goal is explicitly framed as "next level up" in the *same* non-technical track rather than a
lateral move into a technical one. Group F Q2 closes off the other half of the boundary — she is
explicitly not interested in building or moving toward development/architecture, which rules out
a downstream recommendation quietly defaulting to Developer-Foundations without flagging the
mismatch. Nothing elsewhere in the transcript (deadline, budget, diagnostic, format) complicates
or softens this picture; those groups answered cleanly and independently of the boundary case.

## Verdict

**Surfaced.** The interview extracted all three pieces a downstream agent needs to catch the gap:
the named-but-nonexistent target credential (Group A Q3), her actual current tier of
Associate-Foundations (Group A Q2 / Group B Q2), and her explicit disinterest in developer/
architect-track content (Group F Q2). The ground truth's "agent should recommend X" language
describes downstream plan-generation behavior, which is out of scope for this exercise per
PERSONA-DECISIONS.md — noted here only as an aside, not as a modifier of the verdict.

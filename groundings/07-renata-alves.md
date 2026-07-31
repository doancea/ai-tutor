---
persona: 07
name: Renata Alves
category: solid-fit
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Staff Architect. About 14 years overall in software/systems engineering,
  last 5 focused on architecture. AI-specific — probably 2.5 years hands-on, heavy the last year
  since multi-agent design became most of the day job. Domain is enterprise — client-facing,
  mostly financial services and healthcare-adjacent clients, designing systems that have to
  survive procurement and compliance review. Claude is load-bearing day-to-day — architecting
  multi-agent systems for clients, not just using it as a coding assistant.
- Q2 (goals): Wants the professional-level credential to formally match the scope already operated
  at. Wants it to hold up when in a room with a client's security/architecture review board —
  evidence, not decoration. Secondary outcome: wants the study process itself to close whatever
  gaps the mock exam exposed, not just get a passing score.
- Q3 (target cert): Professional-level Claude certification — doesn't have the exact product name
  memorized, whatever Anthropic calls the professional tier above Architect-Foundations.

**Group B**
- Q1 (tool experience): Deep across the board. Daily API/SDK work designing agent architectures.
  Claude Code CLI daily. MCP — both consumed and designed MCP servers for client integrations.
  Prompt engineering just part of the job. Subagents and hooks used in production-ish contexts,
  not just tutorials. Weakest spot is probably whatever the mock exam showed, since scored
  unevenly and hasn't dug into which domains.
- Q2 (prior structured learning): Passed Architect-Foundations about a year ago. Since then mostly
  on-the-job learning — no formal Anthropic Academy courses beyond whatever was done for
  Foundations. No other vendor certs relevant here.

**Group C**
- Q1 (framing): Framing it as a hard deadline — a conference in about 4 months where she wants to
  already hold the credential. Soft truth is nothing breaks if missed by a few weeks, but
  explicitly asked to be held to the hard date rather than planned around slack that might not
  matter.
- Q2 (budget) + Q2b (distribution): 10-15 hours/week realistically, irregular — some weeks
  evenings scattered across the week, other weeks batched on a weekend when client work ate the
  weekdays. Not a steady daily cadence.

**Group D**
- Q1: Yes — took a professional-level mock exam already. Scored well overall but unevenly across
  domains. Doesn't have a clean breakdown in front of her right now, just a gut sense some areas
  were solid and at least one or two weaker. Said she'd need to go pull the actual results if
  precision matters. (No further follow-up captured beyond this.)

**Group F**
- Q1 (format): Narrative document over a checklist/tracker — doesn't want to feel like filling in
  boxes, wants something that reads like a plan she could hand to someone and have them understand
  the reasoning, not just the to-do list.
- Q2 (modality) + Q2a + Q2b (answered together): Mix, weighted hands-on. What appeals most is
  applying it to real work — already building multi-agent systems for clients daily, wants the
  study plan to hook into that rather than invent parallel toy exercises. Open-ended tinkering
  fine as supplement. On size: medium to large — 1-2hr chunks minimum, project-scale when it can
  piggyback on something already being built. Quick 15-30min drills feel like a waste of the
  limited hours available.

## Comparison against ground truth

Ground truth: clean, deep Professional-tier fit. Tests whether the agent recognizes "already holds
Foundations + senior real-world scope" as sufficient to route straight into Professional-level
content rather than defaulting to Foundations review.

Every group converges on the same signal without contradiction. Group A establishes a Staff
Architect with 14 years overall experience, 2.5 years AI-specific and heavy recent multi-agent
design work, in an enterprise client-facing domain where Claude is load-bearing day-to-day — this
is exactly the "senior real-world scope" half of the ground truth's test, stated plainly rather
than requiring extraction. Group B supplies the other half explicitly and unambiguously: Q2 states
she already holds Architect-Foundations (passed a year ago), which is the specific fact the ground
truth flags as the one an agent could fail to weight correctly. Group B Q1 also corroborates
depth across every listed surface (API/SDK, Code CLI, MCP both consumed and produced, prompt
engineering, subagents, hooks in production-ish contexts) — nothing here looks like a Foundations-
level profile that merely aspires to Professional; it reads as someone already operating at
Professional scope who needs the credential to catch up to the work. Group C and D add
scheduling/diagnostic texture (hard-framed 4-month deadline, 10-15 irregular hrs/wk, an already-
taken professional-level mock exam scored unevenly) that doesn't complicate the tier placement —
if anything, the mock exam being pitched at the professional level and already producing a
passing-but-uneven score reinforces that Professional-tier content, not Foundations review, is the
correct starting altitude. Group F's narrative-format request plus hands-on/real-work-weighted
modality (explicitly wanting the plan to hook into existing client work rather than invent
parallel toy exercises) is consistent with a practitioner who wants confirmation and gap-closing at
her actual working level, not remedial basics.

No group produced a competing or ambiguous signal, and no answer implied any residual gap back
toward Foundations-level material. The two load-bearing facts the ground truth calls out —
already-held Foundations credential (Group B Q2) and senior real-world scope (Group A Q1, echoed
in B Q1) — are both stated directly rather than buried, so this is a case where the interview
script doesn't need to do extraction work; the risk being tested is purely whether the *agent*
downstream correctly weights those facts toward Professional routing rather than defaulting to a
generic Foundations-first review.

## Verdict

**Surfaced.** Groups A, B, C, D, and F all independently and consistently point to a deep,
already-operating-at-scope Professional-tier fit, with the two ground-truth-critical facts (prior
Foundations credential, senior real-world multi-agent architecture work) both stated explicitly
and without contradiction — the clean-fit case resolves exactly as expected on a single pass, with
no indication a repeat run would be needed.

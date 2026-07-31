# TEST-PERSONAS.md

22 synthetic test personas used to stress-test the onboarding interview design
(`INTERVIEW-DECISIONS.md`) and, later, the agent's plan-generation behavior — the same role
`DECISIONS.md`'s one real diagnostic result played for the original single-user build, just
scaled to cover intersections we don't have a real person for. Each persona is instantiated as
an actual subagent that will answer the Group A–F interview questions in character in a later
session. This doc is the roster and the answer key; the **Ground truth** line under each persona
is for our own evaluation only — it is never given to the persona subagent itself, since a real
interviewee wouldn't know the "correct" cert-fit judgment about themselves.

19 of the 22 are edge/boundary cases: hard to catch (a signal may be buried or easy to
under/over-state) but with a discoverable correct answer once the right detail is caught. The
last 3 are **margin personas** — a distinct category, deliberately built with no dominant signal
either way, testing whether the interview/policy reaches a stable, reasoned call in a genuine
50/50 rather than an arbitrary tie-break. See `PERSONA-DECISIONS.md` for the rationale behind
that distinction.

Matrix: of the four current Anthropic certs, only Architect has both Foundations and Professional
tiers today; Associate and Developer are Foundations-only. Personas #9–10 deliberately target the
two tiers that don't exist yet (Associate-Professional, Developer-Professional), to test whether
the agent recognizes the gap rather than inventing a credential.

## Cert-anchored personas (10)

### 1. Priya Nandakumar — Associate-Foundations, solid fit
Marketing operations manager, non-technical, uses Claude chat daily for drafting/summarizing.
Goal: a recognized credential proving baseline productive use at work, no interest in building.
Tool experience: chat UI only. Deadline: self-paced. Budget: 3–5 hrs/wk. No prior diagnostic.
Format: narrative document, reading-heavy modality.
**Ground truth:** clean, obvious fit — no flags needed.

### 2. Devon Ruiz — Associate-Foundations, edge case
Customer support lead, casual chat user, but has quietly built small internal Zapier+Claude API
automations for their team — mentions this almost as an aside, buried in mostly chat-focused
description. Goal: "some structured credential," unsure which. Deadline: self-paced. Budget:
2–3 hrs/wk ("whenever I have downtime between tickets"). No diagnostic. Format: tracker/checklist.
**Ground truth:** named goal points to Associate, but the buried automation detail is a real
signal — Developer-Foundations may actually fit better. Tests whether free-text extraction in
Group B Q1 actually catches a lopsided/buried detail rather than the surface-level framing.

### 3. Marcus Webb — Developer-Foundations, solid fit
Backend engineer, 5 years experience, ships production API integrations. Goal: formalize Claude
API/agent-building skills professionally. Tool experience: heavy API/SDK, some Claude Code, no
MCP yet. Deadline: soft team expectation "sometime this quarter" — frames as self-paced since no
hard date. Budget: 8–12 hrs/wk. No diagnostic. Format: tracker/checklist, hands-on modality
(standalone practice + real-work application).
**Ground truth:** clean Developer-Foundations fit.

### 4. Ilana Voss — Developer-Foundations, edge case
Solo indie developer, technically deep (10+ years general SW), but goals lean toward designing
agent architecture for clients rather than implementation — "I want to design agent systems for
other people to build," echoing the original reference case's own Developer→Architect pivot
signal almost verbatim. Tool experience: broad but shallow on Claude specifically (some API, no
Code CLI). Deadline: self-paced. Budget: 5–8 hrs/wk. No diagnostic. Format: narrative document.
**Ground truth:** assumed/named target might default to Developer, but goals language should
trigger the same redirection logic that produced the real Architect pivot. Direct stress test of
Group A Q2/Q3.

### 5. Sam Okafor — Architect-Foundations (CCAR-F), solid fit
Consulting engineer, ~8 years experience, design-not-build role, moderate daily Claude Code use.
Goal: design production agent systems for clients. Tool experience: heavy Claude Code, prompt
engineering, some MCP, light API. Deadline: self-paced. Budget: 8–12 hrs/wk, mostly daily. Prior
diagnostic: took an external mock exam, passed with an uneven domain breakdown (mirrors the real
reference case closely). Format: tracker/checklist, mixed modality.
**Ground truth:** this is essentially the real reference case restated as a fresh persona — the
primary regression check. Should produce a plan structurally similar to the original, and should
exercise the "good score treated with skepticism" policy the same way the real diagnostic did.

### 6. Grace Liu — Architect-Foundations, edge case
Engineering manager overseeing an agent-product team; strong architecture-level judgment from
reviewing others' designs, but very little personal hands-on Claude Code time anymore. Goal:
Architect cert for a promotion case — "I don't really build anymore." Tool experience: light,
mostly review + occasional chat use. Deadline: hard, promotion review in 10 weeks. Budget:
4–7 hrs/wk. No diagnostic; a plausible external mock exam exists for this track. Format:
loose/high-level guidance (wants pointers, not hand-holding).
**Ground truth:** legitimate architecture-level judgment despite thin hands-on time. Tests whether
the agent can serve deadline-driven exam-passing over deep hands-on rebuilding, and whether the
required hard-deadline flagging (Group C) correctly reads this budget as tight.

### 7. Renata Alves — Architect-Professional, solid fit
Staff-level architect, already holds Architect-Foundations (passed a year ago), currently designs
multi-agent systems across several enterprise clients daily. Goal: formalize professional-level
mastery to match existing senior scope. Tool experience: deep across the board — API, Code CLI,
MCP, prompt engineering, subagents, hooks. Deadline: soft target tied to a conference in ~4
months, frames as hard deadline. Budget: 10–15 hrs/wk. Prior diagnostic: took a professional-level
mock exam, scored well but unevenly. Format: narrative, hands-on/real-work modality.
**Ground truth:** clean, deep Professional-tier fit. Tests whether the agent recognizes "already
holds Foundations + senior real-world scope" as sufficient to route straight into
Professional-level content rather than defaulting to Foundations review.

### 8. Tobias Kruger — Architect-Professional, edge case
Strong generalist engineer, self-taught, never touched Architect-Foundations — wants "the highest
architect cert" because a job posting listed it. Tool experience: moderate, all API, no Claude
Code. Deadline: hard, job-application deadline in 6 weeks. Budget: 15–20 hrs/wk (cramming). No
diagnostic, no real prep yet. Format: tracker/checklist.
**Ground truth:** real mismatch — named target (Professional) doesn't fit the demonstrated
background. Agent should flag this and likely recommend Foundations first or an honest,
compressed combined path, while noting 6 weeks may be very tight regardless. Stress test of
Group A Q3's mismatch-flagging plus Group C's tight-deadline flagging.

### 9. Helena Brandt — boundary case, "Associate-Professional" (doesn't exist)
Non-technical team lead, already holds Associate-Foundations, wants "the next level up" in the
same non-technical practitioner track — imagines an advanced-practitioner credential that isn't
real. Explicitly not interested in becoming a developer/architect. Tool experience: chat-only,
moderate. Deadline: self-paced. Budget: 3–5 hrs/wk. No diagnostic. Format: narrative.
**Ground truth:** no such tier exists yet. Agent should recognize the gap and recommend either
deepening Associate mastery or, if she's open to it, a realistic next step (e.g.
Developer-Foundations) — not invent a nonexistent credential.

### 10. Omar Farouk — boundary case, "Developer-Professional" (doesn't exist)
Senior backend engineer, already holds Developer-Foundations, builds complex production agent
tooling daily. Explicitly does not want "Architect" framing — wants deeper *implementation*
credentialing, not design/advisory. Tool experience: very deep, hands-on across the board.
Deadline: self-paced. Budget: 10–15 hrs/wk. No formal diagnostic, but strong informal signal
(ships production systems). Format: tracker, heavy hands-on/real-work modality.
**Ground truth:** no advanced Developer-tier cert exists yet (per current-landscape research, a
deeper Developer track is only "planned for later in 2026"). Architect-Professional is the only
currently-available advanced tier — agent should be honest that it's design-oriented and not a
like-for-like match to his stated implementation-focused goal, rather than mis-routing him into it
as if it satisfies his preference.

## Cross-cutting dimension personas (9)

### 11. Naomi Ferreira — hard deadline + very low weekly hours
Product manager, moderate Claude familiarity. Goal: Developer-Foundations for a new role
requirement. Deadline: hard, employer-set exam date in 3 weeks. Budget: 1–3 hrs/wk (heavily
booked). No diagnostic.
**Ground truth:** should be explicitly flagged as tight/likely-infeasible at the stated pace —
agent should recommend extending the timeline or heavily triaging scope. Stress test of Group C's
tight-vs-slack flagging at a real extreme.

### 12. Ravi Chandrasekaran — fully self-paced + very high weekly hours
Between jobs, learning full-time. Goal: Architect-Foundations, no rush. Deadline: self-paced.
Budget: "Other" — 30+ hrs/wk. No diagnostic.
**Ground truth:** tests that low-end-anchoring logic still behaves sanely at the opposite
extreme — no deadline pressure, so the check is that the agent doesn't over-pack a plan just
because hours are abundant.

### 13. Elena Petrova — existing diagnostic, bad score
Junior consultant. Goal: Architect-Foundations. Prior diagnostic: took an external mock exam,
scored poorly (~420/1000) with weak results across most domains and one accidentally-strong
domain.
**Ground truth:** direct test of the Group D/E skepticism policy in the opposite direction from
the real reference case — a weak score should trigger broad, heavier task allocation, and the one
accidentally-strong domain should still be treated cautiously (misses over hits, keep content even
on strength) rather than skipped.

### 14. Yuki Tanaka — no diagnostic, no viable external option
Targets a very newly-launched track (Architect-Professional, freshly launched with thin external
prep-site coverage). Hasn't taken or looked for a diagnostic.
**Ground truth:** direct test of Group D's third fallback path — agent should search, find nothing
viable, and only then construct its own lightweight check, rather than skipping straight to that
step or omitting a diagnostic step entirely.

### 15. Casey Whitfield — goals-only, no target cert
Freelance writer using Claude for research workflows. Goal: "I just want to get genuinely better
at using Claude for my work, I don't need a certificate." Declines to name a target cert even
when prompted.
**Ground truth:** tests the fully cert-agnostic path — agent should build a coherent,
goals-driven plan with no domain-weighted cert structure at all, per Group A's explicit design
intent for this case.

### 16. Whitney Cole — named cert, role-type mismatch
Enterprise sales engineer doing live product demos. Names "Developer-Foundations" as her target
because her manager suggested it, but her actual goal is speaking credibly about capabilities to
prospects, not building production systems.
**Ground truth:** distinct mismatch type from #8 (role-scope mismatch, not skill-level gap) —
agent should flag that Developer-Foundations is heavier/more implementation-focused than her
actual goal needs, and likely suggest Associate-Foundations instead.

### 17. Anjali Mehta — deep prior credential, different vendor
ML engineer holding an AWS Certified Machine Learning – Specialty credential, years of hands-on
ML experience, brand new to Claude specifically. Goal: Architect-Foundations.
**Ground truth:** tests Group B's vendor-agnostic prior-learning principle — the AWS credential
should reduce time spent on general AI/ML concepts, but the agent shouldn't assume it transfers to
Claude-specific mechanics, which still need full ramp-up.

### 18. Diego Fuentes — loose/high-level guidance format
Senior, experienced engineer who explicitly doesn't want a checklist — wants pointers and
direction, prefers self-directed exploration. Goal: Developer-Foundations. Format: explicitly
picks loose/high-level guidance.
**Ground truth:** direct test of the gap Group F called out — the current software's data model
is checklist/tracker-shaped, so this format choice has no natural home in it. Tests whether the
agent-generation layer can actually honor a non-tracker format or whether this exposes a real
product gap worth flagging back to us.

### 19. Farid Haidari — deep competing-LLM-tool experience, zero Claude
Power user of ChatGPT (custom GPTs, Code Interpreter) and GitHub Copilot for years; has never used
Claude in any form. Goal: Developer-Foundations, switching primary tooling to Claude for a new
job. Tool-experience answer is heavy on ChatGPT/Copilot workflow detail, explicit "no Claude
experience at all."
**Ground truth:** tests whether the agent reads this as strong general agentic/LLM conceptual
fluency needing only Claude-specific mechanics — not a total beginner, but also not given false
credit for Claude-specific specifics (CLAUDE.md, hooks, subagents) they genuinely haven't
encountered.

## Margin personas (3)

Unlike the 19 above, these three are constructed with **no dominant signal either way** — the
ambiguity isn't something a clearer telling would resolve, it's genuinely there even with full
information. The test isn't "does the interview catch the detail," it's "does the interview/policy
land on a stable, reasoned call anyway."

### 20. Marisol Tan — Developer-Foundations / Architect-Foundations margin
Senior engineer, ~7 years experience, splits time roughly evenly between building agent
integrations herself and reviewing/designing architecture for a small team — genuinely mixed, no
tilt either way. Goal: "I want to get better at both building and designing agent systems — I
don't think I lean one way more than the other." Tool experience: solid API/SDK use, some Claude
Code, light MCP. Deadline: self-paced. Budget: 6–8 hrs/wk. No diagnostic. Format: tracker/
checklist, mixed modality.
**Ground truth:** genuinely 50/50 between Developer-Foundations and Architect-Foundations — unlike
Ilana Voss (#4), there's no clear tell once caught, because there isn't one to catch. Tests whether
the interview/agent reaches a stable, well-reasoned call (or honestly presents both with
tradeoffs) rather than an arbitrary tie-break.

### 21. Jonas Eriksen — deadline/budget margin
Targets Architect-Foundations. Deadline: hard, 8 weeks out — not extreme like Naomi Ferreira's
3-week crunch (#11), not slack like Ravi Chandrasekaran's fully open pace (#12). Budget: 6–8
hrs/wk. No diagnostic. Format: narrative, mixed modality.
**Ground truth:** whether 8 weeks × 6–8 hrs/wk is workable or should be flagged tight for
Architect-Foundations-level content is a genuine judgment call sitting right at the boundary, not
an unambiguous extreme. Tests whether Group C's flagging logic produces a stable, reasoned read at
the actual margin rather than an arbitrary cutoff.

### 22. Camille Duarte — diagnostic-score margin
Targets Architect-Foundations. Prior diagnostic: took an external mock exam, scored right at a
borderline-pass threshold (~620/1000), roughly flat across domains — no clearly strong or weak
spot.
**Ground truth:** a borderline-pass, flat-profile score is a genuine margin case for the
skepticism policy — not clearly "good, treat with skepticism" (Sam Okafor, #5) nor clearly "bad,
broad heavy allocation" (Elena Petrova, #13). Tests whether the policy produces a stable,
reasoned task allocation at the actual threshold rather than leaning arbitrarily toward one
extreme.

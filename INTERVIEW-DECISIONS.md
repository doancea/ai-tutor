# INTERVIEW-DECISIONS.md

A log of the choices made designing the onboarding interview for the generalized (multi-user,
multi-certification) learning plan generator — reverse-engineered from DECISIONS.md, which
recorded the reasoning behind one specific person's CCAR-F plan. That reasoning is the spec:
each interview question exists because some piece of context like it changed the shape of the
original plan. Newest context at the bottom, roughly chronological.

## Consumer of these answers is an AI agent, not a rules engine

Interview answers are passed to an AI agent that generates the plan directly, rather than
being matched against a fixed taxonomy by deterministic code. This matters for every question
design choice below: free-text/open entry is not a liability to be engineered around, it's the
right format, since an agent can extract nuance (e.g. "consulting role" reshaping a
Developer-track plan into an Architect-track one) that a rigid category set would flatten or
miss entirely. Prefer open entry by default; only add structure (tags, enums, required
sub-fields) where it guards against incomplete answers, not to make answers machine-parseable.

## Group A, Q1 — role, experience, and professional background

**Decision:** split into labeled prompts rather than one open text box:
- Current role / title — **required**
- Years of professional experience (overall, and separately, time spent using Claude/AI tools
  if applicable) — **required**
- Industry / domain (e.g. consulting, in-house eng, agency, academia) — **required**
- Free-text: anything about how Claude fits into your work today not covered above —
  **optional**

**Why:** A single blank "tell us about yourself" box tends to produce short, incomplete
answers — people write "software engineer" and stop, omitting exactly the details that mattered
in the reference case (years of experience, domain, whether the role is hands-on-build vs.
design/advisory, which is what actually drove the Developer → Architect pivot). Splitting into
labeled prompts guards against that omission without sacrificing openness — every field still
accepts free text, feeding the agent prose it can reason over rather than categories it must
conform to. The final catch-all stays optional since it's supplementary color, not
load-bearing fact.

**How to apply:** Required fields should block plan generation if empty (the agent needs at
least role, experience, and domain to reason about cert fit and pacing); the free-text field
should never block anything.

## Group A, Q2 & Q3 — goals, and target certification as a recommendation, not a forced pick

**Decision:** replace the standalone "why this cert" motivation-category question with a goals
question, and pair it with target-certification as an optional field the agent can confirm,
override, or fill in — not a required forced choice from the four tracks.

- Q2 — Goals (**required**, open-ended): what do you want to be able to *do* as a result of
  this — the actual outcome, not a motivation label (e.g. "design production agent systems for
  clients," "just want a structured learning path regardless of the credential," "need this for
  a role change by a specific date").
- Q3 — Target certification (**optional**): name one if already known; otherwise leave blank
  and the agent recommends one (or a combination) from Q1 + Q2. Even when a target *is* named,
  the agent checks it against role/experience/goals and may flag a mismatch or suggest
  supplementary/adjacent tracks rather than accepting the pick at face value.

**Why:** A "why" question (interest/employer requirement/project/career move) only explains
motivation behind a cert someone already picked — it doesn't let the agent reason about whether
that pick actually fits. The reference case shows self-selection often starts wrong or fuzzy:
the person began with "general interest in learning Claude/Claude Code," not "I need Architect"
— the Architect fit only became visible once role context (consulting, design-not-build)
surfaced. A goals question is what would let an agent make that connection proactively instead
of waiting for it to come up mid-conversation. It also covers the case where the real goal
isn't a credential at all but structured learning toward a skill, with the certification track
serving as a vehicle rather than the end goal — which is closer to what actually happened here
than a clean "picked Architect for its own sake" story.

**How to apply:** Goals feeds three downstream behaviors: (1) recommending a target cert when
none is named, (2) flagging a mismatch when a named target doesn't fit stated goals/background,
(3) surfacing adjacent-track or non-certification supplementary learning even when a single
primary cert is confirmed (mirroring "Developer content folded in as supporting knowledge under
the Architect plan"). Target certification should never block plan generation — the plan can
start from a recommendation and be corrected once the person confirms or redirects it.

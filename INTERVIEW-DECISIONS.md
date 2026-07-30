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

## Group B, Q1 & Q2 — tool experience and prior learning, open-ended

**Decision:** two open-ended free-text questions, no Likert grid, no course checklist.

- Q1 — Tool experience (**required**): free text covering hands-on experience with Claude
  chat, API/SDK, Claude Code CLI, MCP, and prompt engineering. Tool names are given as examples
  inside the prompt, not as separate parallel fields, so a lopsided experience profile (heavy on
  one tool, none on others) isn't forced into a uniform shape.
- Q2 — Prior structured learning (**optional**): free text, not limited to Anthropic Academy or
  any specific course list. Accepts anything relevant — Academy courses, another vendor's
  certification (AWS, Gemini, etc.), a bootcamp, self-study — since prior learning is useful
  context even when it isn't Claude-specific.

**Why:** A Likert self-rating grid ("none/a little/regular/deep" per tool) looked like
structured data but was actually subjective self-perception wearing a numeric mask — it would
flatten lopsided experience profiles into a false average and lose exactly the nuance (e.g.
heavy daily Claude Code use, zero API experience) that mattered in the reference case. A fixed
checklist of Academy courses for Q2 would similarly have anchored the interview to "Claude
certification path" as the only valid frame, reinforcing the exact scope creep the group is
meant to avoid — this plan is tailored to the person's goals, not to a certification funnel.
Broadening Q2 to accept any vendor's certification or structured learning keeps that principle
intact: relevant prior learning is useful context regardless of which company issued it.

**How to apply:** Q1 blocks plan generation if empty (same reasoning as Group A's required
fields — the agent needs a starting point to gauge pace and depth). Q2 never blocks; it's
supplementary context that may inform pacing (e.g. someone with an AWS ML cert may need less
time on general AI/agent concepts) without assuming any prior credential predicts fit for a
specific Claude cert.

## Parking lot — self-assessed test-validity question, for Group D

Not a locked decision — flagged here during the Group C discussion so the idea isn't lost
before Group D (prior diagnostic / pre-test) is actually opened up.

**Idea raised:** alongside a pre-test/diagnostic, consider also asking something like "how
accurately do you feel this reflects where you actually are?" — a self-sentiment check
alongside the objective score.

**Caveat raised in the same breath:** self-assessment carries human bias and blind spots, so
the answer to that question may not itself be a trustworthy signal — worth weighing, not
assuming, when Group D is designed. This echoes DECISIONS.md's own instruction to treat a good
diagnostic score with skepticism rather than at face value, so a self-rated "I trust this score"
answer probably deserves the same skepticism, not automatic weight.

## Group C, Q1 & Q2 — deadline framing before time budget

**Decision:** ask whether a hard deadline/mandate exists before asking about weekly time
budget, since the answer changes what the budget question is even measuring.

- Q1 — Framing (**required**): is there a hard deadline or mandate driving this (a scheduled
  exam date, an employer requirement, a role-change effective date), or is this
  open-ended/self-paced?
  - If **hard deadline/mandate** → required follow-up: target date, plus free text on what's
    driving it.
  - If **self-paced** → no follow-up; skip to Q2.
- Q2 — Weekly time budget (**required**): bucketed multiple choice — `1–3 hrs/wk`,
  `4–7 hrs/wk`, `8–12 hrs/wk`, `13–20 hrs/wk`, `20+ hrs/wk` — plus **Other** (free-form), for
  answers that don't fit a fixed weekly cadence at all. Paired with an optional second bucketed
  field for **distribution**: `mostly daily`, `mostly weekend/batched`, `irregular`.

**Why:** Unlike Group A's target-certification question, "does a hard deadline exist" is a
genuine either/or the agent needs to route on, not a nuance that a forced choice would flatten —
so a required categorical Q1 is appropriate here. Its answer changes what Q2 even means: with a
hard deadline, the stated budget is something to check against what the date actually requires
(the agent can flag "that's tight" or "you have slack"); self-paced, the budget is simply the
primary pacing input with nothing external to measure it against. Bucketed ranges for Q2 (rather
than a single number) are more honest than false precision — most people don't have one fixed
weekly number anyway — and the ranges are objective quantities expressed coarsely, unlike Group
B's Likert grid, which was subjective self-perception wearing a numeric mask. Distribution
(daily drips vs. weekend blocks) matters on top of raw hours because DECISIONS.md's own
reasoning leaned on "how much is free via daily Claude Code use" when estimating original hours
— the same total hours arriving as daily practice vs. batched sessions calls for different task
shapes.

**How to apply:** Both Q1 and Q2 block plan generation if empty — pacing can't be built without
at least a rough budget, and the deadline framing determines how that budget gets interpreted.
For scheduling math, anchor to the **low end** of the chosen Q2 range (or the stated value if
"Other"), consistent with the reference case's bias toward not rewarding optimistic assumptions
with a tighter plan. Distribution, if given, informs task shape (bite-sized daily prompts vs.
longer deep-work blocks) but never blocks generation.

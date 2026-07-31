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

## Resolved — self-assessed test-validity question, dropped from Group D

**Decision:** do not ask a self-sentiment question ("how accurately do you feel this reflects
where you actually are?") alongside the Group D diagnostic score. Raised as an idea during the
Group C discussion, parked pending Group D, and dropped once Group D was actually designed.

**Why:** The idea's own caveat, raised in the same breath it was proposed, turned out to be
disqualifying: self-assessed confidence in a test result carries the same bias/blind-spot
problem as the raw score, DECISIONS.md already warns against trusting ("recognition ≠
recall/application," treat a good score with skepticism) — so a self-rated "I trust this score"
answer is a second layer of the same blind spot, not an independent check on it. It doesn't give
the agent a signal it should act on any differently than it already does (weight misses over
hits regardless of stated confidence), and risks the agent anchoring on stated confidence in
exactly the way DECISIONS.md warns against.

**How to apply:** Group D's diagnostic question (Q1) stands alone — score and domain breakdown
only, no accompanying confidence/sentiment field.

## Group E — folded into Group D as a standing agent policy, not an interview question

**Decision:** there is no Group E interview question. The originally sketched Group E
("calibration policy" — MCQ-vs-applied self-awareness) isn't information to gather from the
interviewee at all; it's a fixed interpretive rule the agent applies to any assessment data it
sees, regardless of what the person reports. It's now stated as a general policy rather than
scoped only to the Group D pre-test.

**Policy (generalized from DECISIONS.md's diagnostic-handling instruction):** treat
multiple-choice/recognition-style success with skepticism (recognition ≠ recall/application);
weight misses more heavily than hits; err toward keeping content in the plan rather than cutting
it on a good score. This applies to **any** assessment result the agent encounters over the life
of the plan — not just the initial Group D diagnostic, but later re-checks, practice quizzes, or
a second mock exam taken mid-plan.

The degree of skepticism is calibrated by source reliability, not applied as a flat blanket. A
reported result's *source* (captured alongside the result itself, per Group D Q1 below) is an
agent-side vetting target: a known, independently-recognized source with documented properties
(e.g. `claudecertificationguide.com`'s short 28-question / long 60-question tiers — more items,
lower variance, so the long tier warrants comparatively less downweighting) gets calibrated
treatment; an unrecognized or unverifiable source falls back to the full conservative default.
This is separate from, and doesn't relax, trust in the *person* — a reported score is taken as an
honest, accurate account of what they got. What's being vetted is the instrument, not the person:
good intent doesn't make an unvalidated instrument a reliable signal on its own.

**Why:** The original Group E concept and the self-sentiment question dropped from Group D are
the same mistake in two forms — both ask the *person* to self-report on how much their own
assessment result should be trusted. But "recognition ≠ recall" is a property of multiple-choice
testing itself, true independent of what anyone believes about their own calibration — asking
the interviewee about it doesn't change the answer, it just adds a self-report that carries the
same bias problem the policy exists to guard against. There's no question whose answer would
change agent behavior, so it isn't interview content — it belongs in the agent's standing rules,
not the questionnaire, and shouldn't be scoped narrowly to one moment (the intake diagnostic)
when the same skepticism applies every time new assessment data shows up.

The original single-source case (`DECISIONS.md`) applied this skepticism as a flat, unconditional
rule — reasonable there, since it was calibrated to one person's specific risk preference (not
wanting a good score to cause the plan to skip material they genuinely needed) against one known
diagnostic. Generalized across users and sources, a flat rule either overtreats a well-documented,
high-item instrument with the same suspicion as an unverifiable one, or undertreats an
unverifiable source just because a confident number was reported. Calibrating by source keeps the
original intent (don't let an MCQ pass silently cut needed material) without punishing a
verifiably reliable result the same as an unverifiable one.

**How to apply:** No new interview field beyond what Group D Q1 already captures (result and
source, both open text). This policy governs how the agent interprets *any* score-bearing input
across the plan's lifetime: check the reported source against a small known-source list
(currently just `claudecertificationguide.com`) before deciding how much the skepticism policy
should downweight a given result; unrecognized sources get the full original flat-skepticism
treatment by default, generalizing what Group D's "How to apply" already stated for the intake
diagnostic specifically.

## Group F, Q1 & Q2 — plan format and learning modality

**Decision:** two bucketed-choice questions covering the shape of the deliverable and the
balance of hands-on vs. reference-style learning, deliberately scoped to leave task-level
organization to the agent rather than asking the person to specify it.

- Q1 — Plan format (**required**, bucketed + Other): structured tracker/checklist (phase-by-
  phase tasks to check off), narrative document (a written guide to read through), or loose/
  high-level guidance (pointers and direction, self-directed on specifics).
- Q2 — Learning modality (**optional**, bucketed + Other): hands-on practice/building, reading/
  reference material, or mixed. Triggers two follow-ups only when a hands-on-leaning answer
  (hands-on or mixed) is given:
  - Q2a — Type of hands-on (bucketed + Other): standalone practice projects/exercises, applying
    directly to real current work, structured guided labs/tutorials, or open-ended
    tinkering/exploration.
  - Q2b — Size of hands-on tasks (bucketed + Other): quick (15–30 min), medium (1–2 hrs), or
    large/project-scale (multi-session).

**Why:** Task granularity (how many tasks, how they're grouped) was deliberately dropped as its
own question — it's an implementation detail the agent's organizing logic should just handle,
not a dial worth asking the person to turn directly. Plan format is a different kind of
question: it determines the actual shape of the deliverable, and the current software has a
specific bias built in (phases → tasks → quizzes → time log, per `seed.js`) that only matches
one of the three options. Because there's no safe universal default here — unlike Q2, where
"mixed" is a reasonable fallback if skipped — Q1 has to be required so the agent doesn't
silently assume the tracker format fits everyone. Q2's hands-on follow-ups exist because "hands-
on" alone is as vague as "regular" was in Group B's rejected Likert grid — someone picturing
quick guided exercises and someone picturing multi-day build projects would both answer
"hands-on" identically without them, so this is a case where added structure prevents an
incomplete signal rather than manufacturing false precision.

**How to apply:** Q1 blocks plan generation if empty — the agent needs to know which deliverable
shape to target before anything else about structure makes sense. Q2 and its follow-ups never
block; skipping Q2 defaults to a mixed-modality assumption, and Q2a/Q2b only apply when Q2
itself leans hands-on.

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

## Group D, Q1 — prior diagnostic, with sourcing and source-vetting pushed to the agent, not the interview

**Decision:** the interview asks only whether the person has results from an assessment related
to their goal or a similar topic that they're willing to share — it does not ask them to
determine whether a viable diagnostic exists if they haven't, and it does not ask them to judge
how reliable an assessment they did take is. Both of those are agent-side behavior: sourcing
triggered by a "no"-family answer, vetting triggered by a "yes" answer.

- Q1 (**required**): Do you have results from an assessment related to this goal (or a similar
  topic) that you're willing to share?
  - **Yes — I have results to share** → one combined free-text follow-up capturing both the
    results (paste the raw output if still available, otherwise describe from memory) and the
    source (what the assessment was, where it came from) — open text, since sources don't share a
    common domain taxonomy or output format, consistent with the open-entry default. The reported
    source feeds the agent-side skepticism-calibration policy (see "Group E — folded into Group
    D," above).
  - **No** → no further interview question; the agent takes over from here.
  - **No, but I'd be willing to take one** → no further interview question; captured as a
    willingness signal alongside the diagnostic-sourcing recommendation below. Whether (or how)
    that signal changes the recommendation is agent-side judgment, not specified further here.
- Agent-side behavior off a "No" or "No, but willing" answer (not posed to the person as a
  question):
  1. Check whether a viable existing mock exam/diagnostic exists for their target track.
  2. If one exists → recommend it as a first step, and treat the generated plan as
     provisional/pending that result rather than finalized without it.
     `claudecertificationguide.com` is a known, pre-vetted option wherever it covers the relevant
     track — recommend it directly rather than re-searching from scratch.
  3. If no viable external option exists (track too new, nothing credible found) → only then
     does the agent construct its own lightweight check.
- Agent-side behavior off a "Yes" answer: vet the reported source per the Group E policy above,
  and judge the relevance of a similar-but-not-identical-topic assessment to the current goal
  (e.g. an adjacent Claude certification has more overlap than an unrelated vendor's certification)
  — both are agent judgment calls, not further interview questions.

**Why:** The reference case's real diagnostic was itself "a 28-question mock exam, external
site" — an existing third-party resource, not something generated in-house. So "the agent builds
its own pre-test" is the least-precedented fallback, not the default, and the interview
shouldn't assume otherwise. Asking the interviewee to judge "is there a viable mock exam out
there," or how reliable a source they used is, also misplaces the research burden — they're no
better positioned to know what credible external diagnostics exist for their track, or how a
given third-party site's methodology holds up, than they were to know domain weights are
triangulated, not officially published (see "Where domain weights and hour estimates came
from" in DECISIONS.md). Both searches are squarely the agent's job. The question broadened from
"a diagnostic or mock exam relevant to this goal" to "any assessment related to this goal or a
similar topic" because a related-but-not-identical assessment (e.g. a different Claude
certification's diagnostic) still carries some signal — how much is, again, an agent-side
relevance judgment, not something to ask the person to pre-filter.

Q1 is phrased around *having results to share*, not around *having taken* an assessment, and
gained the third "no, but willing" option, for a specific reason: those are different facts, and
treating them as one question is what forced Sam Okafor's persona into an awkward middle case
(technically "yes, taken one" but without reliable numbers in hand) in the grounding exercise.
Stating the sharing intent up front means a "Yes" answer is self-selected to mean "I have
something concrete to share," which makes the required follow-up on "Yes" a well-telegraphed ask
rather than a forced one. The third option separates "not interested/not applicable" from "haven't
taken one but would" — a distinction worth capturing even without a specified behavioral effect
yet, consistent with everything else in this section being agent-side judgment rather than
interview-specified logic.

**How to apply:** Q1 blocks nothing by itself, but its answer determines whether the generated
plan is treated as final or provisional. A "No"-family answer with a viable external option found
should produce a plan explicitly marked pending that result, not a plan that quietly proceeds as
if no diagnostic data will ever exist. A "Yes" answer's combined result+source text feeds two
separate agent-side steps: the Group E skepticism-calibration policy (how much to trust the
number) and relevance judgment (how much the assessed topic overlaps the current goal).

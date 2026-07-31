---
persona: 06
name: Grace Liu
category: edge-case
repeat_tested: true
runs: 2
cap_hit: false
verdict: "2/2 consistent"
---

## Transcript

### Run 1

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: EM over an agent-product team — ~16 years in engineering, management for the last ~6. Industry
is B2B SaaS, building agent-based products for customers. Claude-specific experience thin — maybe a
year of exposure, almost all reviewing designs engineers bring, sitting in on architecture
discussions, occasional ad-hoc chat use for own writing/thinking. Doesn't write code day-to-day
anymore.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants the Architect cert as a credential for a promotion case. Real outcome: walking into that
review with something that validates the architecture judgment already exercised informally —
"right now I 'know it when I see it' from reviewing other people's Claude Code/agent designs, but I
don't have anything that certifies it."

**Q3 (target cert):** Specific Claude cert in mind?

A: Yes — the Architect track specifically (not sure of exact full name, but the architecture-focused
cert).

#### Group B

**Q1 (tool experience):** A: Honestly limited. Chat, regularly, for own use. Reviewed a lot of
Claude Code output and MCP server designs the team builds, sat in design reviews, asked hard
questions about tool architecture — but hasn't personally built with Claude Code CLI or wired up
MCP in any real capacity. "If you put me in front of the CLI today I'd be rusty at best."

**Q2 (prior structured learning):** A: No formal coursework, no Anthropic Academy, no bootcamp.
"Training" has been years of reviewing other engineers' architecture decisions — real judgment, no
structured curriculum ever attached to it.

#### Group C

**Q1 (framing) + follow-up:** A: Hard deadline — promotion review in 10 weeks. Non-optional.

**Q2 (weekly budget) + Q2b (distribution):** A: 4-7 hrs/week, irregular — no clean daily blocks,
whatever can be grabbed between meetings, lumpy week to week.

#### Group D

**Q1:** A: No diagnostic taken yet. Knows there's an external mock exam floating around for this
track that people reference — hasn't sat it yet.

#### Group F

**Q1 (format):** A: Loose, high-level guidance. "Give me pointers and structure, not a rigid
hand-holding checklist — I'm senior enough to fill in gaps myself, I just need to know what to
focus on and in what order."

**Q2 (modality) + Q2a + Q2b:** A: Mix, skewed toward reading/reference and closing conceptual gaps
rather than hands-on grinding — "my weak spot isn't judgment, it's currency on the actual tool
mechanics (CLI specifics, MCP wiring, current API surface)." If hands-on, wants it scoped small —
targeted exercises exposing rusty mechanics, not big build projects, since bandwidth is limited and
building isn't really the gap.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Engineering Manager running an agent-product team. ~15 years in industry overall. With Claude
specifically, not much hands-on — under 50 hours total, mostly chat interface and reviewing
PRs/designs the team produces with Claude Code. B2B SaaS, agent-based products. Claude today is
mostly something the team uses; interacts with it more as a reviewer of architecture and outputs
than as a builder.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to speak credibly to Claude architecture decisions in a promotion review — trade-offs
between approaches, when to use what (MCP vs. custom tool orchestration, when subagents make sense,
context management strategy), and have a credential backing up "I understand this at a design
level" even though not the one typing code day to day anymore.

**Q3 (target cert):** Specific Claude cert in mind?

A: Yes — the Architect certification track.

#### Group B

**Q1 (tool experience):** A: Pretty thin. Used the chat product for ad hoc questions. Reviewed a
lot of Claude Code output and PRs — seen prompts, tool configs, MCP server setups secondhand, but
hasn't written them personally in months. Hasn't built anything with the SDK or API personally.
Hands-on time is mostly "occasional chat use" plus whatever's absorbed from code review.

**Q2 (prior structured learning):** A: No formal courses yet. No other vendor certs in this
specific area. Learning has been informal — reading design docs, sitting in on architecture
reviews.

#### Group C

**Q1 (framing) + follow-up:** A: Hard deadline — promotion review in 10 weeks. Non-negotiable
driver.

**Q2 (weekly budget) + Q2b (distribution):** A: 4-7 hrs/week, irregular — no consistent blocks,
whatever can be grabbed between meetings, sometimes weekends if things get tight closer to the
deadline.

#### Group D

**Q1:** A: No, hasn't taken a diagnostic. Knows there's an external mock exam floating around for
this track people reference — hasn't sat it yet.

#### Group F

**Q1 (format):** A: Loose, high-level guidance. Doesn't need a rigid tracker or hand-holding —
"give me pointers on what to focus on and I'll self-direct. I'm used to synthesizing from less
structure."

**Q2 (modality) + Q2a + Q2b:** A: Mix, weighted toward reading/reference and architecture-level
material over heavy hands-on building — given time and starting point, doesn't think can
realistically become a strong hands-on builder in 10 weeks, and that's not really the point for
this cert anyway. If hands-on, wants small targeted exercises illustrating a concept (like "build a
minimal MCP server" or "compare two orchestration patterns"), not open-ended build projects — no
runway for big builds.

## Comparison against ground truth

**Ground truth:** Legitimate architecture-level judgment despite thin hands-on time. Tests whether
the agent can serve deadline-driven exam-passing over deep hands-on rebuilding, and whether the
required hard-deadline flagging (Group C) correctly reads this budget as tight. (Whether a
downstream agent actually serves deadline-driven exam-passing correctly, versus defaulting to deep
hands-on rebuilding, is out-of-scope plan-generation behavior per `PERSONA-DECISIONS.md`; this
comparison only assesses whether the transcript itself surfaces (a) the legitimate architecture
judgment despite thin recent hands-on time, and (b) the hard-deadline-plus-moderate-budget
combination, clearly enough for a downstream agent to act on.)

**Run 1:** Signal (a) — architecture judgment despite thin hands-on — surfaces across three
independent spots, not one: Group A Q1 ("almost all reviewing designs engineers bring, sitting in
on architecture discussions"), Group A Q2 ("I 'know it when I see it' from reviewing other people's
Claude Code/agent designs, but I don't have anything that certifies it"), and Group F Q2 ("my weak
spot isn't judgment, it's currency on the actual tool mechanics"). That last line is a direct,
unprompted self-assessment separating judgment (strong) from hands-on mechanics (rusty) — about as
explicit as this signal could get. Signal (b) — hard deadline + moderate/tight budget — is equally
clean: Group C Q1 gives a non-optional 10-week deadline, and Q2 gives 4-7 hrs/week irregular,
lumpy, no clean blocks. Both numbers land squarely in "tight but not impossible" territory rather
than generous slack, and the irregularity compounds the tightness.

**Run 2:** Same shape, different wording, same two slots. Signal (a): Group A Q1 ("interacts with
it more as a reviewer of architecture and outputs than as a builder"), Group A Q2 (wants to speak
credibly to trade-offs like MCP vs. custom orchestration, subagents, context management — a design
vocabulary, not an implementation one), and Group F Q2 makes it most explicit — doesn't think she
can "realistically become a strong hands-on builder in 10 weeks, and that's not really the point
for this cert anyway." That's a slightly stronger, more self-aware version of run 1's "weak spot
isn't judgment" line — same conclusion, arrived at more explicitly. Signal (b): Group C again gives
a non-negotiable 10-week deadline and 4-7 hrs/week irregular budget, with the added detail that
weekends only get pulled in "if things get tight closer to the deadline" — reinforcing rather than
softening the tightness read.

Both runs place signal (a) in the same three slots (Group A Q1, Group A Q2, Group F Q2) and signal
(b) in the same slot (Group C Q1+Q2), with matching numbers (10 weeks, 4-7 hrs/week irregular) and
comparable explicitness both times. Run 2's Group F answer is marginally more direct about the
judgment/hands-on split, but this is phrasing variance, not a divergence in what surfaces or where.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs reliably surface both halves of this
persona's construction: the legitimate architecture-level judgment despite thin recent hands-on
time (stated explicitly and unprompted in Group A and Group F both times) and the
hard-deadline-plus-moderate-budget combination that Group C is required to flag as tight (10 weeks,
non-negotiable, 4-7 irregular hrs/week, in both runs). Neither signal depends on inference — both
land as direct statements in Grace's own words at the same questions across both tellings, so the
interview design is not the source of any fragility here. This assessment is limited to whether the
transcript surfaces both signals clearly enough to act on; whether a downstream agent actually
serves deadline-driven exam-passing over deep hands-on rebuilding is separate, out-of-scope
plan-generation behavior.

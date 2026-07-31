---
persona: 20
name: Marisol Tan
category: margin
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

A: Senior software engineer, ~7 years overall. Mid-size fintech (payments/lending platform),
backend and platform engineering. Day to day roughly split between building agent integrations
herself (automated support triage, internal document-processing pipelines using Claude) and
reviewing/designing architecture for other engineers on her team building similar things. "I
wouldn't say I lean more one way than the other — some weeks I'm heads-down coding, some weeks
I'm mostly in design docs and PR review." Claude-specific experience ~1.5 years, ramping up over
the last ~6 months from "chatbot wrapper" to actual agentic workflows.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to come out able to both build agent systems competently AND be a better reviewer/
architect for her team's designs. Already good enough at API mechanics to ship things, but
second-guesses architecture calls (MCP vs. custom tools, multi-agent vs. single-agent structure,
context management patterns) and lacks a strong mental model for evaluating whether someone
else's design is sound. Wants both the "can build it" and "can judge/design it" muscle solid, not
just one.

**Q3 (target cert):** Specific Claude cert in mind?

A: Not sure — knows Anthropic has some certification track but hasn't looked closely enough to
name it. Open to being pointed at the right one.

#### Group B

**Q1 (tool experience):** A: Chat, baseline/constant use. API/SDK is where most hands-on time
is — a couple of production-ish services using the Messages API, tool use/function calling, some
streaming, basic prompt caching for cost. Claude Code used for own dev work a few times a week,
mostly straightforward (not doing anything with hooks or subagents). MCP: light — stood up one
basic MCP server as an experiment and connected a client, hasn't gone deep, doesn't fully
understand the tradeoffs vs. writing custom tool calls. Prompt engineering: comfortable, iterates
on system prompts, more trial-and-error than principled.

**Q2 (prior structured learning):** A: No formal coursework. Self-study — docs, blog posts, a lot
of Anthropic's own engineering blog posts on agent design, learning by doing at work. No
Anthropic Academy or other vendor cert before.

#### Group C

**Q1 (framing):** A: Fully self-paced, no deadline or mandate — investing in herself, not
job-required.

**Q2 (weekly budget) + Q2b (distribution):** A: 6-8 hrs/week, irregular — a couple weeknight
evenings when there's energy, plus sometimes a weekend chunk if the work week was too packed.
Not a reliable daily habit, more "whenever I can carve it out" within that weekly budget.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Tracker/checklist — likes seeing progress and checking things off, keeps her
honest given the irregular schedule.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning practical. Prefers applying to something close to
real work when possible (even a side/practice version of a real problem), but fine with
standalone practice exercises when the concept doesn't map cleanly to her job. Less interested in
fully open-ended tinkering — wants a defined task with a clear "done" state. Task size: medium
(1-2 hrs) is the sweet spot given irregular time — quick 15-30 min feels too shallow for
architecture-type topics, large project-scale is hard to guarantee finishing in one sitting or
even one week.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Senior engineer, ~7 years overall. Logistics/supply-chain software — B2B platform, warehouse
and fulfillment tooling. Day to day roughly split down the middle — about half building agent
integrations herself (orchestration/tool-calling code), half reviewing and designing architecture
for a small team (4-5 engineers) building agent features on the product. Claude experience ~1.5
years — started with chat for one-off tasks, moved into API/SDK for actual product features over
the last ~9 months. "It's become a pretty normal part of my work now, not a side experiment."

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to build agent systems hands-on — solid tool-calling code, handling messy parts like
error recovery and context management — and also design/review architecture for other engineers
with actual confidence, not just gut feel. Can do both reasonably now but second-guesses herself
more on the design side, and hands-on skills have gaps too (hasn't touched MCP much). Doesn't
want to end up leaning into one and neglecting the other.

**Q3 (target cert):** Specific Claude cert in mind?

A: Not sure of the exact name — has seen there's something like an agent-focused certification
but hasn't looked closely enough to know the exact title or level. Assumes whatever's standard
for agent-building/architecture.

#### Group B

**Q1 (tool experience):** A: Chat used a lot early on for drafting, debugging help, thinking
through problems, still does. API/SDK is where most real hands-on time is — a couple of internal
tools using Claude for document extraction and one agent-ish workflow chaining a few tool calls
together for order-status lookups. Claude Code used for a few months, mostly code-review-type
tasks and some scaffolding, not deeply integrated into daily workflow yet. MCP: light, set up one
MCP server connection following a tutorial, hasn't built one from scratch or used it in anything
real. Prompt engineering: comfortable, iterates on prompts regularly for the extraction tool,
understands system prompts, few-shot examples, structured output.

**Q2 (prior structured learning):** A: Not really structured — no Anthropic Academy, no
bootcamp, no other vendor cert. On-the-job learning, reading docs, some blog posts and the
occasional conference talk. This would be her first actual structured pass at it.

#### Group C

**Q1 (framing):** A: Open-ended/self-paced. No mandate from work — something she wants for
herself, partly to shore up confidence on the design side, partly because she thinks it'll help
the team.

**Q2 (weekly budget) + Q2b (distribution):** A: 6-8 hrs/week, uneven — small chunks on weekday
evenings if there's energy, but a lot of it ends up batched on a weekend day with a real stretch
of focus time. More irregular than a clean daily habit.

#### Group D

**Q1:** A: No diagnostic or mock exam taken yet.

#### Group F

**Q1 (format):** A: Tracker or checklist — likes seeing progress and checking things off. "A wall
of narrative text would probably not get finished."

**Q2 (modality) + Q2a + Q2b:** A: Definitely a mix, not leaning toward one — "that's kind of the
whole point for me." Prefers applying to real work when possible (would rather build something
that touches her actual job than a throwaway exercise), but fine with standalone practice when the
real-work angle isn't available. Doesn't want fully open-ended tinkering as the main mode — likes
a defined task even if small. Task size: medium (1-2 hrs) feels right to make real progress
without eating a whole evening; quick 15-30 min feels too shallow for actual building, wary of
large project-scale tasks eating multiple weekends given how irregular her time already is.

## Comparison against ground truth

**Ground truth:** Genuinely 50/50 between Developer-Foundations and Architect-Foundations —
unlike Ilana Voss (#4), there's no clear tell once caught, because there isn't one to catch.
Tests whether the interview/agent reaches a stable, well-reasoned call (or honestly presents both
with tradeoffs) rather than an arbitrary tie-break. Per `PERSONA-DECISIONS.md`'s scope boundary,
whether a downstream agent actually reaches a stable, reasoned call (or presents both tracks with
tradeoffs) is out-of-scope plan-generation behavior — that agent doesn't exist yet. The
interview-scoped question here is different in kind from the other 19 personas: instead of asking
whether a buried or extreme signal gets surfaced, it asks whether the interview captures the
genuine balance faithfully, without an artifact of the script (e.g., Group A Q3 forcing an early
single-cert commitment, or one question's phrasing implicitly favoring "build" framing over
"design" framing) manufacturing a false tilt in either direction.

**Run 1:** The balance is stated directly and repeatedly, not just implied. Group A Q1 gives the
explicit disclaimer ("I wouldn't say I lean more one way than the other — some weeks I'm
heads-down coding, some weeks I'm mostly in design docs and PR review"), and Group A Q2 restates
the same balance as a goal ("I want both the 'can build it' and 'can judge/design it' muscle to be
solid, not just one"). Critically, Group A Q3 — the question most likely to force a premature
tilt — does not: the persona declines to name a cert rather than guessing toward either
Developer- or Architect-Foundations, leaving the ambiguity genuinely open rather than resolved by
a forced-choice artifact. Group B's tool-experience answer reinforces the balance from a different
angle: solid production API/SDK usage (the "build" half) paired with self-assessed uncertainty
about MCP tradeoffs and only "trial-and-error" (not "principled") prompt engineering — real
depth, but not so deep on either axis that it would tip the scale. Group F's format/modality
answers (tracker, medium tasks, applying-to-real-work-when-possible) are cert-agnostic and don't
carry directional signal either way.

**Run 2:** Same balance, independently, with an even more explicit statement of the construction's
intent. Group A Q1 uses near-identical framing ("roughly split down the middle... about half...
half") to Run 1's disclaimer despite different surface details (different industry, different
specific projects), and Group F Q2 states the point almost as a meta-comment: "Definitely a mix,
not leaning toward one — that's kind of the whole point for me." As in Run 1, Group A Q3 declines
to force a premature single-cert answer, again leaving the ambiguity open rather than resolving it
via question-order artifact. Group B again shows matched, moderate depth on both axes (solid API/
SDK build experience, comfortable prompt engineering, but only light/tutorial-level MCP exposure
and admitted gaps on the design-confidence side from Group A Q2) — deep enough to be a real
practitioner, not so lopsided that a downstream agent reading the transcript would have grounds to
call it a hidden tilt.

Both runs are consistent: neither produced an accidental tilt toward Developer- or
Architect-Foundations, neither run's Group A Q3 got forced into a premature single-cert
commitment, and both runs independently used near-identical "genuinely balanced / that's the
point" framing despite having freedom to vary phrasing, industry, and specific project details.
That the underlying ~7-years-experience, ~1.5-years-Claude, 6-8-hrs/wk, self-paced, tracker/mixed-
modality profile also replicated closely across runs is expected (per the construction, those
details aren't what's being tested) and doesn't affect the verdict either way.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs faithfully captured the persona's intended
genuine 50/50 balance between building and designing/architecting agent systems, with no artifact
of the script (particularly Group A Q3, which could have forced a premature single-cert
commitment) manufacturing a false tilt toward either Developer-Foundations or
Architect-Foundations. Both runs independently produced explicit, near-identical "genuinely
balanced" framing in the persona's own words, which is strong evidence the interview doesn't
inadvertently resolve this margin case for the persona — the ambiguity that reaches the downstream
agent is the real, intended ambiguity, not an accident of extraction. Whether that downstream
agent then reaches a stable, well-reasoned call on a case with no clear tell is out of scope for
this interview-fidelity check.

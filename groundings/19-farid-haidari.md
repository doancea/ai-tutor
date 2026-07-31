---
persona: 19
name: Farid Haidari
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

A: Full-stack developer, ~7 years professional experience overall. AI tooling specifically deep
for ~3 years — ChatGPT (building custom GPTs, using Code Interpreter constantly) and GitHub
Copilot in the IDE daily. Claude/Anthropic tools: zero, literally never touched before this.
Industry mostly fintech/SaaS product work. Claude isn't part of workflow at all right now —
starting a new job soon where the team standardizes on Claude, needs to get up to speed.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to work productively in Claude from day one at the new job — not just "know about" it
but fluent enough to use it the way the team does (chat, Code Interpreter equivalent, agentic
stuff). Bonus if coming in with a credential signaling not starting from zero.

**Q3 (target cert):** Specific Claude cert in mind?

A: Thinking Claude Developer-Foundations certification — something at the foundations/associate
level for developers, not the deep specialist track.

#### Group B

**Q1 (tool experience):** A: Honestly none. Read a bit about Claude's chat interface but hasn't
logged in or used it. No API/SDK calls, never touched Claude Code CLI, doesn't know what MCP
actually is beyond the acronym, no hands-on prompt engineering specific to Claude's quirks (knows
Claude has different prompting conventions than GPT but hasn't practiced them).

**Q2 (prior structured learning):** A: No formal courses yet — no Anthropic Academy, no other
vendor cert relevant to this. "Structured learning" has been years of building with ChatGPT/
Copilot day to day, plus docs/blog posts picked up organically. Nothing Claude-specific.

#### Group C

**Q1 (framing):** A: Yes, hard deadline — new job start date is ~6 weeks out, wants this done or
close to done before starting so not learning on the clock in front of a new team.

**Q2 (weekly budget) + Q2b (distribution):** A: 8-10 hrs/week, irregular-leaning-toward-weekend —
has a day job currently so weeknights inconsistent, but can usually block a solid chunk on
Saturday/Sunday plus an hour or two on 2-3 weeknights.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Structured tracker/checklist — likes seeing progress and checking boxes,
that's how other certs/courses were paced.

**Q2 (modality) + Q2a + Q2b:** A: Heavy on hands-on/building — how things are actually retained,
how ChatGPT/Copilot workflows were learned too. Still wants some reference material for
Claude-specific concepts without intuition yet (MCP, Claude Code CLI basics, prompting
differences from GPT), but doesn't want to just read docs for weeks. Task size: small-to-medium
chunks, finishable in a single sitting (an hour or two), not open-ended multi-day projects, at
least early on while building basic fluency.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Senior Software Engineer, ~8 years professionally — mostly backend/full-stack, Python and
TypeScript, last 4 years in fintech (payments infra at a mid-size company). Heavy ChatGPT user
since GPT-4 launched — builds custom GPTs for internal workflows (API contract docs, support
ticket triage), uses Code Interpreter constantly for data wrangling/scripts/prototyping. On
GitHub Copilot in VS Code 3+ years, part of daily coding (autocomplete, Copilot Chat for inline
explanations). Claude specifically: zero — never opened claude.ai or used the API, not from lack
of interest, just never had a reason to switch.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Starting a new job in ~2 months where the team has standardized on Claude (Claude Code
specifically, plus API usage in internal tooling). Wants to walk in already fluent, not learning
on the job in front of new coworkers. Concretely: comfortable in Claude Code CLI for real dev
work, knows how the API/SDK differs from OpenAI's (auth, message format, tool use, streaming),
enough conceptual grounding to pass whatever cert maps to "I know what I'm doing with Claude" —
hence Developer Foundations.

**Q3 (target cert):** Specific Claude cert in mind?

A: Yes — Claude Developer Foundations (understood this is the target, someone on the new team
mentioned it).

#### Group B

**Q1 (tool experience):** A: Genuinely none yet. No chat usage, no API calls, no Claude Code, no
MCP, nothing. Knows prompt engineering as a discipline well from ChatGPT/Copilot but hasn't
tested any of it against Claude's models.

**Q2 (prior structured learning):** A: Nothing Claude-specific yet — this is the start of that.
Has done AI-adjacent stuff before: OpenAI's own prompt engineering guide/docs deep dive when
building custom GPTs, went through a chunk of a LangChain course last year for a side project. No
formal certifications in this space yet, this would be first.

#### Group C

**Q1 (framing):** A: Yes, hard-ish deadline — new job start date roughly 8 weeks out, wants this
done or very close to done before day one. Self-imposed but firm since doesn't want to be behind
on day one.

**Q2 (weekly budget) + Q2b (distribution):** A: 8-10 hrs/week, irregular rather than clean daily
cadence — has a current job to finish out, so a couple weeknights plus a bigger chunk on Saturday
or Sunday most weeks.

#### Group D

**Q1:** A: No, hasn't taken anything yet.

#### Group F

**Q1 (format):** A: Structured tracker/checklist, ideally something to check off as going. Likes
seeing progress concretely — narrative docs tend to get skimmed once and forgotten.

**Q2 (modality) + Q2a + Q2b:** A: Mix, weighted hands-on — probably 70/30. Since already knows
general LLM/agentic concepts cold from the ChatGPT/Copilot side, what's actually needed is reps
on Claude's specific interfaces and quirks, not re-learning what an LLM is. Task size: roughly
45-90 minutes each, finishable in a single sitting — small enough to fit around a work night,
substantial enough to actually build something (a script against the API, a small Claude Code
workflow) rather than toy one-liners.

## Comparison against ground truth

**Ground truth:** Tests whether the agent reads this as strong general agentic/LLM conceptual
fluency needing only Claude-specific mechanics — not a total beginner, but also not given false
credit for Claude-specific specifics (CLAUDE.md, hooks, subagents) they genuinely haven't
encountered. Structurally parallel to persona #17 Anjali Mehta's vendor-agnostic test, but for
general-LLM/agentic fluency (years of ChatGPT custom-GPT-building, Code Interpreter, daily
Copilot use) rather than a formal ML credential. Per `PERSONA-DECISIONS.md`'s scope boundary,
whether a downstream agent actually applies that calibration correctly is out-of-scope
plan-generation behavior — this comparison is scoped only to whether the *interview transcript
itself* surfaced both halves clearly enough for a downstream agent to apply the principle in
either direction: (a) genuine deep general agentic/LLM fluency, and (b) genuinely zero
Claude-specific experience, stated plainly rather than hedged or inflated.

**Run 1:** Both halves surfaced clearly and independently. Signal (a) is concrete and specific in
Group A Q1 — "~3 years" deep, "building custom GPTs," "using Code Interpreter constantly," daily
GitHub Copilot in the IDE — and Group F Q2 corroborates it from a learning-design angle ("that's
how ChatGPT/Copilot workflows were learned too"). Signal (b) is equally explicit and not hedged:
Group A Q1 states "zero, literally never touched before this," and Group B Q1 itemizes the gap
point by point — no chat login, no API/SDK, never touched Claude Code CLI, MCP unknown beyond the
acronym, no Claude-specific prompt-engineering reps despite knowing Claude's conventions differ
from GPT's "in the abstract." Group F Q2 draws the line between the two explicitly: hands-on
building is how retention happens (leaning on the general fluency), but reference material is
still wanted specifically for "Claude-specific concepts without intuition yet (MCP, Claude Code
CLI basics, prompting differences from GPT)" — the persona itself names the exact carve-out the
ground truth is testing for.

**Run 2:** Same result, independently, with the contrast delivered even more directly. Signal (a)
gets more texture in this run — GPT-4-era heavy use, custom GPTs for named internal workflows
(API contract docs, support ticket triage), Code Interpreter for "data wrangling/scripts/
prototyping," 3+ years of daily Copilot with both autocomplete and Copilot Chat — plus a second
data point in Group B Q2 (OpenAI's own prompt engineering guide, a LangChain course) that Run 1
didn't include, reinforcing a genuinely deep general-agentic background rather than shallow tool
dabbling. Signal (b) is, if anything, sharper here: Group B Q1's "No chat usage, no API calls, no
Claude Code, no MCP, nothing" is a blunter enumeration than Run 1's, and it's immediately paired
with the same self-aware framing seen in Anjali's Run 2 — "Knows prompt engineering as a
discipline well from ChatGPT/Copilot but hasn't tested any of it against Claude's models." Group F
Q2 states the calibration outright in the persona's own words: "already knows general LLM/agentic
concepts cold from the ChatGPT/Copilot side, what's actually needed is reps on Claude's specific
interfaces and quirks, not re-learning what an LLM is" — nearly a direct restatement of the ground
truth itself.

Both runs are consistent on every material point: neither half is buried under the other in
either run, both halves are stated in specific, concrete, non-inflated terms (named tools, named
gaps, explicit self-framing), and Run 2's Group F Q2 answer is close to a direct paraphrase of the
ground truth, which is strong evidence the interview invites this exact signal rather than it
being an artifact of one run's phrasing. No divergence between runs on whether both halves
surfaced.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs cleanly and consistently surfaced both halves
of the ground truth: genuine, specific general agentic/LLM depth (named tools and workflows —
custom GPTs, Code Interpreter, daily Copilot use — detailed similarly in both runs via Group A Q1)
and genuinely zero, concretely-itemized Claude-specific experience (Group A Q1 and Group B Q1 in
both runs, with Run 2 producing an especially direct statement of the exact contrast in Group F
Q2). Neither half was buried under the other in either run, and both runs independently produced
persona-authored language that closely mirrors the ground truth's own framing. No disagreement
between runs, so per the adaptive stopping rule the 2-run floor is sufficient and no further runs
are needed.

---
persona: 04
name: Ilana Voss
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

A: Solo indie developer/consultant, ~11 years professional software (mostly full-stack/backend
before going independent). AI-tool-specific experience thinner — ~1.5 years casual use across
GPT-4, Claude, some Gemini. No fixed industry — works across whatever clients bring, lately
trending toward smaller companies wanting to bolt AI assistants onto existing products. Claude
today is mostly a smarter search engine/rubber duck — chat interface to think through architecture
problems, sometimes pastes code for review. Hasn't built anything real with it yet.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: "Honestly the outcome I want isn't 'I can build a Claude app really well' — it's 'clients trust
me to architect their agent systems and I can speak credibly about what Claude can and can't do,
where MCP fits, when to use the API vs Code CLI, tradeoffs on tool-calling patterns.' I want to be
the person in the room who designs the thing, hands off a solid spec, and can review someone else's
implementation and catch the wrong calls. Less interested in being the one grinding out the
implementation myself long-term."

**Q3 (target cert):** Specific Claude cert in mind?

A: Not really — saw there's an Anthropic certification track but hasn't looked closely enough to
name a specific one. "Whatever's the standard one, I guess."

#### Group B

**Q1 (tool experience):** A: Pretty shallow. Claude.ai chat regularly. Poked at the API
directly — basic calls, messed with system prompts. Never touched Claude Code CLI. Heard of MCP,
doesn't really understand it beyond "it's like a plugin protocol." Prompt engineering informal,
trial and error.

**Q2 (prior structured learning):** A: No, nothing structured. Everything from using it and
reading blog posts/Twitter. Depth is in general software engineering, not formal AI/LLM
curriculum.

#### Group C

**Q1 (framing):** A: Fully self-paced, nobody making her do this — "I see where the market's
going and want to get ahead of it."

**Q2 (weekly budget) + Q2b (distribution):** A: 5-8 hrs/week, irregular — couple longer sessions
on days a client project isn't eating time, sometimes a weekend.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Narrative document — doesn't want a checkbox tracker, wants something that
reads like a coherent explanation with reasoning, referenceable and adaptable.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning toward reading/reference/conceptual since actual
goal is architectural fluency, not shipping code — but knows can't fake the hands-on side either,
needs enough building experience for credibility/intuition, not to become an implementation
expert. Hands-on tasks like "build a small thing that exercises a concept end-to-end,"
bite-sized/illustrative, then back to synthesis/reading — not big multi-week builds.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Runs own shop — independent consultant/developer, ~10-12 years software. AI-tools side ~1.5
years poking around — Claude chat a lot, some API work building small things for clients, dabbled
with other model providers. No fixed industry — some fintech, some internal tooling for mid-size
companies, whatever comes in. Claude fits in today mostly as a coding assistant and occasionally
to prototype what an agent-based feature could look like before pitching it.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: "What I actually want out of this is to be able to walk into a client engagement and design an
agent architecture — figure out what tools it needs, how the pieces should talk to each other,
where the guardrails go, what the failure modes are — and hand that off with credibility. I don't
need to be the one wiring up every API call. I want the systems-design layer down cold, enough
that I can spec something and trust an implementation team (or a less senior version of myself)
to build it correctly."

**Q3 (target cert):** Specific Claude cert in mind?

A: Not really pinned to one yet — seen there's some kind of Claude/Anthropic developer
certification but hasn't looked closely enough to name it.

#### Group B

**Q1 (tool experience):** A: Mostly chat interface for day-to-day thinking-through-problems. Some
direct API/SDK usage — basic completions, a bit of tool use/function calling in a side project.
Never touched Claude Code CLI. Read about MCP but hasn't built anything with it. Prompt
engineering informal, nothing systematic.

**Q2 (prior structured learning):** A: No formal courses on this specifically. Has done "read the
docs cover to cover" for a couple API platforms over the years — that's just how she learns. No
Anthropic Academy, no other vendor cert, no bootcamp.

#### Group C

**Q1 (framing):** A: Self-paced, no deadline — "me getting ahead of where I think client demand
is going."

**Q2 (weekly budget) + Q2b (distribution):** A: 5-8 hrs/week, irregular — some weeks a couple
hours squeezed between client work, other weeks more in one sitting during a slow stretch. No
steady daily rhythm.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Narrative document — wants to actually read through and follow the reasoning,
not a checklist.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning toward reading/reference and
conceptual/architecture-level material over heads-down building. When wanting hands-on, prefers a
small representative build — sketch an agent architecture for a realistic scenario, maybe wire up
a minimal version — rather than long tutorial-style coding exercises. Learns implementation
details fine on the fly when a project calls for them; what she actually wants practice on is the
design decisions themselves.

## Comparison against ground truth

**Ground truth:** The assumed/named target might default to Developer, but goals language should
trigger the same redirection logic that produced the real Architect pivot (see `DECISIONS.md` —
the original real diagnostic case pivoted from Developer to Architect once the "design the
solution, not just build it" framing came up). This is a direct stress test of Group A Q2/Q3.
(Whether a downstream agent actually reroutes Ilana toward Architect-Foundations based on this
signal is out-of-scope plan-generation behavior per `PERSONA-DECISIONS.md`; this comparison only
assesses whether the transcript itself surfaces the design-vs-build preference clearly enough, in
Ilana's own words, for a downstream agent to act on.)

**Run 1:** Group A Q3 gives no named cert to anchor on ("whatever's the standard one, I guess"),
so the whole signal has to come from Q2. It does, explicitly: Ilana names the outcome she does
*not* want ("isn't 'I can build a Claude app really well'") and contrasts it directly with what
she does want ("the person in the room who designs the thing, hands off a solid spec, and can
review someone else's implementation"), closing with an explicit disclaimer of interest in
long-term implementation work. This is close to a direct paraphrase of the "design the solution,
not just build it" framing named in the ground truth — not a buried or inferential detail, but the
headline of her answer. Group F reinforces it independently (architectural fluency over shipping
code, hands-on kept minimal/illustrative), but the core redirection signal is fully contained in
Group A Q2 alone.

**Run 2:** Same shape, different wording. Q3 is again unnamed/uncertain. Q2 again leads with the
design/build contrast: "figure out what tools it needs, how the pieces should talk to each
other... and hand that off with credibility. I don't need to be the one wiring up every API call. I
want the systems-design layer down cold." The "trust an implementation team... to build it
correctly" close mirrors run 1's "review someone else's implementation" almost exactly in
substance. Group F again corroborates independently (reading/architecture-level material
preferred, hands-on limited to representative sketches, explicit "what she actually wants practice
on is the design decisions themselves"). No divergence from run 1 — the redirection signal lands
in the same question, with comparable explicitness, both times.

Both runs place the signal in the same slot (Group A Q2), phrase it as an explicit
design-vs-build contrast rather than an implicit one, and get independent reinforcement from Group
F. Neither run requires inference or reading between the lines — in both, Ilana states the
preference in her own words, unprompted by any leading question.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs have Ilana state the design-not-build
preference explicitly and prominently in Group A Q2, closely mirroring the real "design the
solution, not just build it" framing that drove the original Developer-to-Architect pivot, with no
named cert in Q3 to dilute or override it. The interview reliably invites this signal at the exact
question it's meant to stress-test — the extraction is robust, not a one-off artifact of persona
phrasing. This assessment is limited to whether the transcript surfaces the preference clearly
enough to act on; whether a downstream agent actually reroutes Ilana toward Architect-Foundations
is separate, out-of-scope plan-generation behavior.

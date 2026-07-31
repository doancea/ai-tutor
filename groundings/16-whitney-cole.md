---
persona: 16
name: Whitney Cole
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

A: Sales Engineer on the enterprise team — SE work ~8 years, mostly dev-tools/API platform space
before this. Claude specifically ~5-6 months, since positioning it more heavily in demos. Domain is
enterprise SaaS sales, technical pre-sales — sits between the AE and customer's engineering team,
shows the product working live and answers "can it also do X" on the spot. Claude fits in two ways:
preps demo scripts and answers prospect questions herself, and is expected to speak knowledgeably
about what Claude can do when a prospect's technical evaluators probe.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to hold her own in a room of skeptical engineers asking pointed questions ("does it
support MCP," "how does prompt caching work," "API vs Claude Code," agentic workflow capabilities)
and answer credibly with specifics, not hand-wave. "I'm not trying to become someone who builds
production agent systems day to day." Needs depth that reads as real to a technical audience, fast
recall of capabilities/limits/pricing details, enough hands-on familiarity to drive a live demo
confidently and improvise.

**Q3 (target cert):** Specific Claude cert in mind?

A: Manager pointed her at "Developer Foundations" as the cert to go after — that's the one on her
radar. Hasn't dug into exactly what it covers yet, "that came from him rather than me picking it
myself."

#### Group B

**Q1 (tool experience):** A: Uses Claude chat interface constantly. Used the API a bit — enough to
wire up a demo environment with help from SE enablement team, didn't build it from scratch. Poked at
Claude Code CLI, mostly following along in demos rather than driving it herself day to day. Knows
MCP conceptually, can describe it, hasn't set up a server herself. Prompt engineering — actually her
strongest area, since crafting the right prompt for a demo scenario is basically her job.

**Q2 (prior structured learning):** A: Nothing formal yet — watched a couple Anthropic product
webinars, skimmed docs pages when prepping for specific demos. No structured course, no other
vendor cert, no bootcamp. This would be first real structured learning on it.

#### Group C

**Q1 (framing) + follow-up:** A: Soft deadline — manager wants her "conversant" before the next big
QBR push with prospects, roughly 6 weeks out. Not a hard mandate with a certificate-by-X-date
requirement, more an expectation of being noticeably sharper by then.

**Q2 (weekly budget) + Q2b (distribution):** A: 3-4 hrs/week, irregular — travels for onsite demos
periodically, some weeks slammed with back-to-back calls, more likely a couple longer sessions on
lighter weeks than a steady daily habit.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Structured checklist/tracker — juggling against a sales calendar, wants to know
exactly what's next and check off, not a long narrative doc to re-read to find her place.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning toward reading/reference with just enough hands-on to
make concepts stick and demo credibly. Doesn't need big build projects — not shipping code. Smaller
hands-on tasks appeal more — "use the API to do X," "try this in Claude Code and see what it
produces," 20-30 minutes for a concrete talking point, not a multi-day project.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Sales Engineer on the enterprise team — SE roles ~3 years, ~8 years total professional
experience (previously technical account management at a different SaaS company). Industry is
enterprise software, mostly selling into financial services and healthcare accounts. AI tools
experience ~1 year, casual — uses Claude (chat, mostly claude.ai) to prep for demos, draft talking
points, sanity-check answers before technical prospects. Regular part of prep routine but not deep.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to hold her own in a live demo/discovery call when a prospect's engineer asks pointed
technical questions (context windows, what the model can/can't do, tool use, pricing/tiers) without
freezing or a mushy answer. "I'm not trying to build anything myself; I need to sound credible and
accurate on the spot, not fumble a technical objection in front of a VP of Engineering."

**Q3 (target cert):** Specific Claude cert in mind?

A: Manager pointed her at "Developer-Foundations." That's the one she put down, "though honestly I
picked it because it was suggested, not because I researched alternatives."

#### Group B

**Q1 (tool experience):** A: Hands-on pretty thin. Mostly chat interface. Poked around the
Anthropic Console a little for test prompts for demo scenarios, hasn't really used the API/SDK for
anything real. Never touched Claude Code CLI. Heard prospects/engineers mention MCP a few times but
couldn't explain what it does. No real prompt engineering beyond normal chatting.

**Q2 (prior structured learning):** A: Nothing formal — no Academy courses, no other vendor certs,
no bootcamp. Watched a couple partner-team webinars, skimmed Anthropic docs pages when needed a fact
for a specific demo.

#### Group C

**Q1 (framing) + follow-up:** A: Soft-ish deadline — manager's been mentioning it in 1:1s, a team
offsite in ~6 weeks where it'd be good optics to have it done, but no official mandate with a hard
date.

**Q2 (weekly budget) + Q2b (distribution):** A: 3-4 hrs/week, irregular — depends on demo/call
schedule, whatever pockets of time can be grabbed between client work, sometimes a weekend chunk if
the week was slammed.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Structured tracker/checklist — likes seeing progress and checking boxes given
fragmented time.

**Q2 (modality) + Q2a + Q2b:** A: More reading/reference and talking-points material than hands-on
building — needs to understand concepts well enough to explain/defend them, not necessarily produce
working code. If hands-on, wants it short and low-lift — a 15-20 minute exercise, not a multi-hour
build.

## Comparison against ground truth

**Ground truth:** A distinct mismatch type from #8 Tobias Kruger — not a skill-level gap but a
role-scope mismatch. The named target (Developer-Foundations) is heavier/more implementation-focused
than her actual goal needs; an agent should flag this and likely suggest Associate-Foundations
instead. Per `PERSONA-DECISIONS.md`, whether a downstream agent actually acts on the flag (making
the substitution) is out-of-scope plan-generation behavior — this comparison is scoped only to
whether the *interview transcript itself* surfaced the two underlying signals clearly enough for a
downstream agent to catch the mismatch: (a) that the named target came from her manager rather than
her own research, and (b) that her actual goal is credible live-demo/talking-points fluency, not
building production systems.

**Run 1:** Both signals surfaced clearly and independently. Group A Q3 delivers signal (a)
explicitly and in her own words: "Manager pointed her at 'Developer Foundations'... that came from
him rather than me picking it myself." Group A Q2 delivers signal (b) equally explicitly: the
outcome she wants is holding her own answering pointed technical questions in front of skeptical
engineers, with a direct disclaimer of the opposite scope — "I'm not trying to become someone who
builds production agent systems day to day." Group B reinforces (b) from a different angle: her
strongest area is prompt engineering for demo scenarios, while hands-on API use was only "enough to
wire up a demo environment with help from SE enablement," not independent build capability, and
Claude Code CLI use is passive ("following along in demos" rather than driving it herself). Group F
Q2 corroborates again — she explicitly doesn't want build projects ("not shipping code"), just
enough hands-on to make concepts stick for a demo talking point. Every group that touches scope
points the same direction: fluency and credibility, not implementation.

**Run 2:** Same result, independently. Group A Q3 again delivers signal (a) in her own words,
phrased slightly differently but just as explicit: "though honestly I picked it because it was
suggested, not because I researched alternatives." Group A Q2 again delivers signal (b) with an
equally direct disclaimer: "I'm not trying to build anything myself; I need to sound credible and
accurate on the spot, not fumble a technical objection in front of a VP of Engineering." Group B
independently reinforces (b) with an even thinner hands-on profile this run (no real API/SDK use,
never touched Claude Code, can't yet explain MCP) — consistent with someone who needs conceptual
fluency rather than build depth. Group F Q2 again independently converges on the same shape:
reading/reference and talking-points material over hands-on building, short low-lift exercises only.

Both runs are consistent on every material point: the target cert is manager-assigned rather than
self-researched (stated plainly by Whitney herself in Group A Q3 both times), and her actual goal is
demo-floor technical fluency and credible on-the-spot answers, explicitly not production
implementation work (stated plainly in Group A Q2 both times, and corroborated independently by
Group B and Group F Q2 in both runs). No divergence between runs on either signal.

**Aside — how this differs structurally from Tobias's mismatch (#8):** Tobias's ground truth is a
skill-level gap — he lacks the demonstrated background for his named (top-tier Architect) target, and
his interview surfaces that gap via a genuinely thin, narrow toolset relative to the target's
apparent demands. Whitney's mismatch is different in kind, not degree: her demonstrated skill level
is plausible and even reasonably strong for what she actually needs (prompt engineering is her
strongest area; she drives live demos confidently), but the named target itself is the wrong shape
for her goal — Developer-Foundations skews toward implementation/build content while her goal is
fluency and talking-points credibility, which Associate-Foundations is the better fit for. Both
personas name a manager/external party as the source of the target rather than their own research,
but in Tobias's case that detail is incidental to the gap (the gap exists regardless of who chose the
target); in Whitney's case the "manager assigned it" detail is closer to the mechanism of the
mismatch itself — nobody, including her, ever actually vetted whether Developer-Foundations was the
right level of *content*, as opposed to the right level of *difficulty*. Worth keeping as two
separate findings if Step 3 synthesis later compares them, not folding into one "named target didn't
fit" bucket.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs cleanly and consistently surfaced both target
signals: that the named target (Developer-Foundations) came from her manager rather than her own
research (Group A Q3, stated explicitly in her own words both times), and that her actual goal is
live-demo/talking-points fluency rather than production-building competence (Group A Q2, with an
explicit self-disclaimer both times, independently corroborated by Group B's consistently thin
build-oriented tool experience and Group F Q2's consistent preference for reference material over
hands-on build work). No disagreement between runs on either signal, so per the adaptive stopping
rule the 2-run floor is sufficient and no further runs are needed.

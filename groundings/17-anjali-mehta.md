---
persona: 17
name: Anjali Mehta
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

A: ML Engineer — ~7 years professional experience total, mostly building/deploying ML models
(recommendation systems, some NLP/classification work) in fintech. Holds AWS Certified Machine
Learning – Specialty cert. Experience with Claude or any AI tools specifically is "honestly close
to zero" — poked at Claude.ai chat a handful of times, maybe a couple hours total, nothing
systematic. "This would be genuinely new territory for me, not an extension of something I already
do day to day."

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to actually build things with Claude — integrate into internal tooling, use API/SDK
competently, understand how to design prompts and agentic workflows reliable in production, not toy
demos. "Go from 'I've used ChatGPT-like tools casually' to 'I can architect a Claude-based system
for my team and defend the design choices.'"

**Q3 (target cert):** Specific Claude cert in mind?

A: Yes — Architect-Foundations (believes that's the correct name, may be slightly off).

#### Group B

**Q1 (tool experience):** A: Very limited. Just casual use of Claude.ai web chat — asking
questions, maybe some code review type stuff. Hasn't touched the API, hasn't used Claude Code,
doesn't know anything about MCP beyond having seen the term. No real prompt engineering practice
beyond ad hoc typing.

**Q2 (prior structured learning):** A: No Anthropic-specific learning yet — no Academy courses,
nothing like that. Structured learning background is all AWS/ML: AWS ML Specialty cert prep, plus
years of on-the-job ML engineering experience (model training, deployment pipelines, MLOps-ish
work). No vendor-specific LLM/agent certifications before this.

#### Group C

**Q1 (framing):** A: No hard deadline — self-motivated and open-ended. Team has been talking about
adopting Claude for internal automation, some soft organizational interest, but nobody's mandated a
date.

**Q2 (weekly budget) + Q2b (distribution):** A: 5-6 hrs/week, irregular — some weeks a couple solid
weekday evening sessions, other weeks mostly weekend catch-up. Not a reliable daily habit.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Structured tracker/checklist — likes seeing progress and checking things off,
doesn't want a long narrative doc to re-read to figure out what's next.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning hands-on — learns best by building and hitting real
problems. Given ML background, doesn't need much hand-holding on general ML concepts, but needs
actual reps with Claude's specific tools (API, Claude Code, MCP, prompt patterns) rather than just
reading about them. Tasks sized ~1-2 hours each, finishable in one sitting.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: ML Engineer, ~7 years professionally — mostly building/deploying models on AWS (SageMaker
pipelines, MLOps work, feature engineering, model serving infra). Last few years in fintech doing
fraud/risk models. AI tools generally: uses ChatGPT casually for code snippets/rubber-ducking, ~a
year of that. Claude specifically: basically none — poked at claude.ai a handful of times. "Right
now Claude isn't really part of my workflow at all."

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants to actually use Claude well day-to-day — write good prompts, know when/how to use API vs
chat interface, understand context windows and tool use so not just guessing. Certification matters
for a work initiative (leadership wants AWS-certified folks to also get Claude-certified as they
evaluate it for internal tooling), but wants the actual skill, not just the badge.

**Q3 (target cert):** Specific Claude cert in mind?

A: Yeah — Architect-Foundations. "That's the one I was pointed at."

#### Group B

**Q1 (tool experience):** A: Pretty thin. Typed prompts into claude.ai maybe a dozen times total,
nothing structured. Never touched API/SDK, never used Claude Code, doesn't know what MCP is beyond
having seen the acronym. No real prompt engineering practice — knows prompting is a skill but
hasn't deliberately practiced it for Claude. "My AWS ML Specialty background gives me strong
intuition on ML fundamentals, model behavior, evaluation — but zero Claude-specific reps."

**Q2 (prior structured learning):** A: No Anthropic Academy courses or anything like that yet.
Structured learning all AWS-side: holds AWS Certified Machine Learning – Specialty, before that
on-the-job learning plus some Coursera deep learning years ago. Nothing Claude or general-LLM-vendor
specific.

#### Group C

**Q1 (framing):** A: Somewhat soft deadline — manager wants a few of them to have this by end of
Q3, ~8 weeks out. Not a hard external mandate, but real pressure tied to internal tooling
evaluation.

**Q2 (weekly budget) + Q2b (distribution):** A: 4-6 hrs/week, irregular — a free evening or two
during the week, some weeks front-loaded on a weekend if work is slow. Not a clean daily habit.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Structured tracker/checklist — likes checking things off and seeing progress,
especially given irregular time.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning hands-on — learns best by building and hitting the
actual API/tooling rather than just reading docs; reading fine for concepts but wants practice
tasks. Task size: medium chunks, ~30-60 minutes each, finishable in one sitting.

## Comparison against ground truth

**Ground truth:** Tests Group B's vendor-agnostic prior-learning principle — the AWS credential
should reduce time spent on general AI/ML concepts, but the agent shouldn't assume it transfers to
Claude-specific mechanics, which still need full ramp-up. Per `PERSONA-DECISIONS.md`, whether a
downstream agent actually applies that principle correctly (reducing general-AI/ML content while
still fully ramping Claude-specific mechanics) is out-of-scope plan-generation behavior — this
comparison is scoped only to whether the *interview transcript itself* surfaced both halves clearly
enough for a downstream agent to apply the principle in either direction: (a) genuine deep general
ML/AWS credentialing (years of hands-on ML engineering, the AWS ML Specialty cert specifically), and
(b) genuinely minimal/near-zero Claude-specific experience, not inflated and not falsely humble.

**Run 1:** Both halves surfaced clearly and independently, with (a) arguably the more prominent of
the two. Signal (a) comes through repeatedly and specifically: Group A Q1 states "~7 years
professional experience... building/deploying ML models (recommendation systems, some NLP/
classification work) in fintech" plus the AWS ML Specialty cert by name; Group B Q2 restates the
same credential and adds "years of on-the-job ML engineering experience (model training, deployment
pipelines, MLOps-ish work)." Signal (b) is equally explicit and not hedged into false modesty — Group
A Q1 gives a direct, self-assessed quantification ("honestly close to zero... a couple hours total,
nothing systematic") plus an explicit framing statement ("This would be genuinely new territory for
me, not an extension of something I already do day to day"), and Group B Q1 itemizes the specific
gaps concretely: no API, no Claude Code, MCP unknown beyond the term, no deliberate prompt-engineering
practice. Group F Q2 corroborates the split from a learning-design angle, distinguishing "doesn't
need much hand-holding on general ML concepts" from "needs actual reps with Claude's specific tools."
Both halves land clearly; (a) gets slightly more airtime (three separate mentions across A1/B2/F2)
than (b)'s itemized-but-more-concise treatment in A1/B1, though neither is buried.

**Run 2:** Same result, independently, and this run's phrasing skews (b) into the more prominent
half if anything. Signal (a) is delivered with added texture (SageMaker pipelines, feature
engineering, model serving infra, fraud/risk models) across Group A Q1 and restated with the cert
name in Group B Q2 alongside "some Coursera deep learning years ago." Signal (b) is delivered with
an unusually sharp, self-aware contrast statement that names the exact test this persona is built
for: Group B Q1's "My AWS ML Specialty background gives me strong intuition on ML fundamentals,
model behavior, evaluation — but zero Claude-specific reps" states both halves of the ground truth
in a single sentence, in the persona's own words, without ever having seen the ground truth. Group A
Q1 reinforces (b) plainly ("basically none... Right now Claude isn't really part of my workflow at
all"), and Group F Q2 again corroborates via learning design (wants hands-on reps with "the actual
API/tooling," not conceptual review).

Both runs are consistent on every material point: neither half was buried under the other in either
run, both halves are stated in concrete, non-inflated, non-falsely-humble terms (specific credential
names, specific tool gaps, explicit self-framing), and Run 2's Group B Q1 answer is close to a
direct restatement of the ground truth itself, which is the clearest possible evidence the interview
invites this exact signal rather than it being an accident of persona phrasing. No divergence
between runs on whether both halves surfaced.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs cleanly and consistently surfaced both halves
of the ground truth: genuine, specific general ML/AWS depth (AWS ML Specialty cert plus years of
hands-on ML engineering, detailed similarly in both runs via Group A Q1 and Group B Q2) and
genuinely minimal, concretely-itemized Claude-specific experience (Group A Q1 and Group B Q1, with
Run 2 producing an especially direct statement of the exact contrast — "strong intuition on ML
fundamentals... but zero Claude-specific reps"). Neither half was buried under the other in either
run; if anything (a) had marginally more airtime in Run 1 and (b) marginally more in Run 2, netting
out to no consistent bias toward burying either signal. No disagreement between runs, so per the
adaptive stopping rule the 2-run floor is sufficient and no further runs are needed.

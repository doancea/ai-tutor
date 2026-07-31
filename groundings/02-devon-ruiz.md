---
persona: 02
name: Devon Ruiz
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

A: I'm Customer Support Lead at my company — I run a small support team. Been doing support/CS
roles for about 8 years, last 2 as lead. AI tools-wise, I use Claude daily, probably going on a
year and a half now. Mostly just chat though. Industry is B2B SaaS, we do project management
software. Claude's basically part of my daily workflow at this point — drafting tricky customer
replies, summarizing long ticket threads before I hand them to someone.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Honestly I just want something to point to that says "yes, I actually know what I'm doing with
this stuff" — a credential I can put on my resume or LinkedIn. Not chasing a promotion, more just
formalizing what I already kind of do day to day, and maybe picking up stuff I don't know I don't
know.

**Q3 (target cert):** Specific Claude cert in mind?

A: Not really, no. Seen there's a few Anthropic offers but haven't looked closely. Open to
guidance.

#### Group B

**Q1 (tool experience):** A: Mostly chat, that's like 90% of it — writing prompts for customer
responses, drafting macros/canned responses, summarizing threads, brainstorming weird edge-case
tickets. Played with projects/custom instructions some. "Oh — I also set up a couple of small
automations for our team using Zapier that call the Claude API, nothing fancy, just stuff like
'when a ticket gets tagged X, have Claude draft a summary and post it to Slack.' Took some trial
and error to get the API calls working right but it's been running fine for a few months now."
Haven't touched Claude Code or MCP at all.

**Q2 (prior structured learning):** A: No formal training. Self-taught, mostly from using it a ton
and occasionally googling/YouTube when stuck setting up the Zapier thing.

#### Group C

**Q1 (framing):** A: No deadline, fully self-paced.

**Q2 (weekly budget) + Q2b (distribution):** A: 2-3 hrs/week, irregular — depends on ticket
volume, some weeks a chunk on a slow Friday, other weeks 20 min here and there.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Tracker/checklist — check boxes, pick back up easily given unpredictable
schedule.

**Q2 (modality) + Q2a + Q2b:** A: Mix but leaning hands-on if forced to pick, learns by doing.
Smaller tasks better — squeezing in between tickets, not sitting for a big block. ~20-30 min
tasks preferred over 2-hour-sitting tasks.

### Run 2

#### Group A

**Q1 (role & background):** What's your current role/title? Years of experience overall and with
Claude/AI tools? Industry/domain? Anything else about how Claude fits into your work?

A: Customer support lead. ~8 years in support/CS roles, most of it people-management the last 3-4.
No formal "AI tools" experience — uses Claude in the browser daily now for drafting tricky
customer replies, summarizing long ticket threads, helping write internal docs/SOPs. Industry is
B2B SaaS (customer support tooling company, a bit meta). ~a year and a half of regular Claude use.

**Q2 (goals):** What do you want to be able to DO as a result of this?

A: Wants something proving they know what they're doing beyond "I chat with it well." No super
concrete outcome yet — wants to point to something showing understanding beyond casual use, partly
for own confidence, partly to help internally as the go-to "AI person" on the team.

**Q3 (target cert):** Specific Claude cert in mind?

A: Not really, no. Seen a few options but hasn't looked closely. Open to guidance.

#### Group B

**Q1 (tool experience):** A: Mostly chat — daily use, lots of prompt iteration from trial and
error (not formal technique, just "that didn't work, let me rephrase"). Used Projects in chat UI
for recurring tasks. "Oh — and I did put together a couple of small internal automations a while
back, Zapier connected to the Claude API, for auto-triaging some of our support tickets and
drafting first-pass responses. Nothing fancy, just needed to solve a real annoyance we had."
Haven't touched Claude Code or MCP at all.

**Q2 (prior structured learning):** A: No formal courses or certs, no bootcamp. Self-taught
through use, learning by doing.

#### Group C

**Q1 (framing):** A: Totally self-paced, no deadline or mandate — own initiative.

**Q2 (weekly budget) + Q2b (distribution):** A: 2-3 hrs/week, irregular — whenever there's
downtime between tickets, 20 min here, an hour there, not a consistent block.

#### Group D

**Q1:** A: No diagnostic taken.

#### Group F

**Q1 (format):** A: Tracker/checklist — check off in small chunks given fragmented time.

**Q2 (modality) + Q2a + Q2b:** A: Mix, leaning hands-on if forced to pick — that's how everything's
been learned so far. Small tasks — time is chopped into little chunks, anything needing a big
uninterrupted block won't work.

## Comparison against ground truth

**Ground truth:** The named goal points to Associate-Foundations on its surface, but a buried
detail — Devon built working Zapier+Claude API automations for the support team — is a real signal
that Developer-Foundations may actually fit better. This tests whether free-text extraction in
Group B Q1 catches a lopsided/buried detail rather than just the surface-level framing from Group
A. (Whether a downstream agent actually reroutes Devon based on this signal is out of scope here —
per `PERSONA-DECISIONS.md`, that's plan-generation behavior; this comparison only assesses whether
the transcript itself surfaces the detail clearly enough to act on.)

**Run 1:** Group A's goal answer (Q2) is textbook Associate-Foundations framing — "credential to
point to," "formalize what I already do," no mention of building or automating anything. Group B
Q1 is where the buried detail lands: unprompted, Devon volunteers a full aside about standing up
Zapier automations that call the Claude API, including a concrete trigger ("when a ticket gets
tagged X"), the fact it took real trial-and-error to get the API calls working, and that it's been
running in production for months. That's not a passing mention — it's a specific, verifiable,
technical claim with implementation detail (API integration, debugging, sustained uptime), clearly
distinguishable from the chat-only framing everywhere else in the transcript. The extraction is
present and legible.

**Run 2:** Same shape. Group A's goal answer is again surface-level ("prove I know what I'm doing
beyond casual chat use," go-to "AI person" on the team) with no hint of the automation work. Group
B Q1 again surfaces it as an unprompted aside, this time framed around auto-triaging tickets and
drafting first-pass responses, again naming Zapier + the Claude API explicitly and describing it as
solving "a real annoyance." Slightly different narrative gloss (triage/first-pass-response framing
vs. run 1's tag-triggered-summary framing) but the same core signal: a real, working, API-level
automation build, volunteered in the same spot in the interview, with comparable technical
specificity.

Both runs place the buried detail in the same location (Group B Q1, appended as an aside after the
chat-usage description) and give it comparable weight and technical concreteness. Neither run lets
it get diluted or dropped — in both, it reads as a distinctly technical claim standing apart from
the otherwise non-technical, chat-only narrative established in Group A and the rest of Group B.

## Verdict

**2/2 consistent — Surfaced.** Both independent runs volunteer the buried Zapier+Claude-API
automation detail unprompted, in the same slot (Group B Q1), with concrete implementation specifics
(named trigger/use case, API-level integration effort, sustained real-world use) that clearly
separate it from Devon's otherwise chat-only, non-technical self-presentation. The interview design
reliably invites this signal rather than depending on chance phrasing in a single generation — the
extraction is robust, not noise. This assessment is limited to whether the transcript surfaces the
detail; whether a downstream agent weighs it against the named Associate-Foundations goal to reroute
toward Developer-Foundations is separate, out-of-scope plan-generation behavior.

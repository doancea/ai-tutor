---
persona: 11
name: Naomi Ferreira
category: edge-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Product Manager, ~8 years in product roles overall (fintech, mostly
  B2B SaaS the last 4 years). AI tools specifically — ~1.5 years regular use, mostly ChatGPT and
  Claude via chat for writing specs, summarizing research, brainstorming. Moderately familiar
  with Claude as a chat tool but doesn't code day-to-day, so anything API/CLI-side is new.
- Q2 (goals): Immediate driver is passing a certification the company now requires for her role —
  but functionally wants to hold her own in conversations with the eng team about what's feasible
  with Claude (API, tool use, agents) instead of nodding along, and ideally use it for lightweight
  prototyping.
- Q3 (target cert): Yes — Developer-Foundations, the one her employer listed as the requirement.

**Group B**
- Q1 (tool experience): Mostly chat UI — drafting PRDs, summarizing customer calls, rewriting
  copy. Poked at the API maybe twice following a tutorial, never built anything real. Never
  touched Claude Code CLI or MCP before. Prompt engineering basics from trial and error, not
  formal study.
- Q2 (prior structured learning): No formal courses, no other vendor certs — pure self-study/
  on-the-job usage, nothing structured.

**Group C**
- Q1 (framing) + follow-up: Hard deadline — employer set an exam date, 3 weeks from now. Not
  negotiable as far as she knows.
- Q2 (budget) + Q2b (distribution): 1-3 hours/week realistically, calendar is brutal right now.
  Irregular — whatever pockets she can find, not a reliable daily/weekend block. May squeeze more
  in the final few days before the exam if needed.

**Group D**
- Q1: No, hasn't taken any diagnostic or mock exam yet.

**Group F**
- Q1 (format): Structured tracker/checklist — given how little time she has, wants to know
  exactly what's next without re-deriving a plan each week.
- Q2 (modality) + Q2a + Q2b (answered together): Given the time crunch, weighted toward
  reading/reference and targeted practice rather than open-ended building — no room for big
  projects. If hands-on work exists, wants small bounded tasks (30-45 min, clear finish line),
  not anything open-ended.

## Comparison against ground truth

Ground truth: should be explicitly flagged as tight/likely-infeasible at the stated pace — the
agent should recommend extending the timeline or heavily triaging scope. This is a stress test of
Group C's tight-vs-slack flagging logic at a real extreme, and per the persona's construction it's
a cross-cutting case (hard deadline *and* very low weekly hours at once, not either alone).

This hinges on Group C, and the numbers there are about as extreme as the design intends: a hard,
non-negotiable 3-week deadline crossed with a 1-3 hr/week budget works out to roughly 3-9 total
hours available before the exam for a full Developer-Foundations track — an absolute figure, not
just a low weekly rate, and one that's hard to read as anything but infeasible at full scope. The
"brutal calendar" framing and "irregular... whatever pockets she can find" distribution rule out
a hidden reserve of unstated slack; the one softening detail (may squeeze more time in the final
days) is explicitly conditional and doesn't change the picture for most of the window.

Group F independently corroborates the same extreme from a different angle, unprompted: she names
her own time crunch as the *reason* for wanting a tracker/checklist ("given how little time she
has, wants to know exactly what's next") and again as the reason for rejecting open-ended/
project-scale work in favor of small, bounded 30-45 minute tasks. That's a second, self-aware
restatement of the same constraint Group C supplies numerically — the persona isn't just answering
bucketed questions, she's reasoning from the crunch elsewhere in the script, which makes the
signal harder for a downstream agent to miss or discount as a fluke of one question's phrasing.

Group A and B add compounding context beyond what the ground truth line names: her target,
Developer-Foundations, is API/CLI/tool-use-oriented content, and her own tool history is chat-only
with just two tutorial-following API attempts and no Claude Code or MCP exposure at all — so the
3-9 hour budget isn't just tight in the abstract, it has to cover largely unfamiliar technical
ground. Group D adds that no diagnostic has been taken, so there's no established baseline to
narrow scope against either. Neither of these is what the persona was built to test (the
construction is specifically deadline x hours), but both push further in the same direction and
would reinforce, not undercut, a flag.

This transcript is the interview's output, not the agent's downstream response to it. Whether the
*agent* actually flags the pace as infeasible and recommends extending the timeline or triaging
scope — rather than silently complying with the stated 3-week/1-3-hr framing and generating an
over-packed plan anyway — is plan-generation behavior this grounding step cannot observe from the
script/transcript alone; it depends on what the agent does with this input downstream, which is
out of scope for this interview-fidelity check.

## Verdict

**Partial.** The interview script extracts the extreme deadline-and-hours combination cleanly and
redundantly — Group C supplies the raw numbers unambiguously (hard 3-week deadline, 1-3 hrs/week,
no hidden slack), and Group F independently restates the same constraint in the persona's own
reasoning about format and task size, so this is as strong a signal capture as a single pass can
produce. What the transcript can't demonstrate is whether the downstream agent actually honors
that signal by flagging the pace as tight/infeasible and recommending extension or triage, rather
than complying with it silently — that check falls outside what a single interview transcript can
verify.

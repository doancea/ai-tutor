---
persona: 10
name: Omar Farouk
category: boundary-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Senior backend engineer, ~11 years professional experience overall.
  AI-tool-specific — heavily hands-on for ~2 years, using Claude (API, SDK, Claude Code) daily
  building production agent tooling. Domain is fintech-adjacent infra/backend. Claude is embedded
  in workflow: builds/maintains agent tooling running in production, not just prototypes —
  tool-calling pipelines, orchestration.
- Q2 (goals): Wants implementation-level credibility — proof of being able to build and ship
  production-grade agent/tool systems with Claude, not "design" or "advise" on them. Explicitly
  doesn't want anything architect/strategy-flavored. Wants the cert to reflect what he actually
  does: write the code, wire up tools, debug the integration, ship it.
- Q3 (target cert): Not locked into a specific name, but already has Developer-Foundations, so
  wants whatever the next tier up is that's implementation-focused rather than
  architecture-focused — assuming that split exists. Explicitly: if there's an "Architect" track
  and a "Builder/Developer" track, wants the latter.

**Group B**
- Q1 (tool experience): Deep across the board — API/SDK integration (Python and TS), Claude Code
  CLI daily driver, MCP server implementation (built a couple from scratch, not just consumed),
  prompt engineering including structured/tool-use prompting, streaming, caching. Not new to any
  of this.
- Q2 (prior structured learning): Developer-Foundations cert already completed. No formal
  bootcamp beyond that — mostly self-study plus learning by building/shipping production systems.
  No other vendor certs relevant.

**Group C**
- Q1 (framing): No hard deadline, self-paced, open-ended.
- Q2 (budget) + Q2b (distribution): 10-15 hrs/week, irregular — not a clean daily or weekend
  pattern, depends on work.

**Group D**
- Q1: No formal diagnostic or mock exam taken, no score to give. Informal signal is that he ships
  production agent systems regularly, so not starting cold. (No further follow-up per script.)

**Group F**
- Q1 (format): Tracker/checklist — structured, something to check off, not a narrative doc.
- Q2 (modality) + Q2a + Q2b (all answered together): Heavy hands-on/real-work modality — doesn't
  want toy exercises, wants tasks resembling/plugging into actual production-scale problems (real
  tool integrations, real MCP servers, real orchestration logic). Reading/reference minimal and
  targeted, not the main mode. Task size: meaty enough for a real build session, not 15-minute
  snippets — something to sink an hour-plus into.

## Comparison against ground truth

Ground truth: no advanced Developer-tier cert exists yet (per current-landscape research, a
deeper Developer track is only "planned for later in 2026"). Architect-Professional is the only
currently-available advanced tier — the agent should be honest that it's design-oriented and not
a like-for-like match to Omar's stated implementation-focused goal, rather than mis-routing him
into it as if it satisfies his preference.

This hinges on Group A Q3, sharpened by Q2. Omar doesn't name a cert cold — he explicitly
conditions his answer on a Builder/Developer-vs-Architect split existing ("assuming that split
exists"), and Q2 independently establishes the same preference in his own words: he wants
implementation credibility and explicitly rules out anything "design" or "advisory" flavored. That
combination is exactly the setup the ground truth is built to test: the only real next-tier cert
available today is Architect-Professional, which is precisely the flavor he's pre-emptively
rejecting. A correct response has to do two things at once — tell him no
higher-tier-implementation-focused cert currently exists (with the "planned later in 2026" caveat
surfaced, not buried), and *not* quietly substitute Architect-Professional as if it satisfies his
stated preference just because it's the only next-tier option on the books. Silently routing him
into Architect-Professional without naming the mismatch would be the specific failure mode this
persona is constructed to catch.

The rest of the transcript is corroborating, not decisive, context: Group B confirms the deep,
implementation-heavy tool background (MCP servers built from scratch, daily Claude Code use) that
makes an architecture/strategy track a poor fit on substance, not just framing; Group D adds that
he's clearly not starting cold; Group C and F (tracker format, heavy hands-on modality, meaty
task sizes) describe a learner who wants to build, reinforcing that a design-oriented track would
sit awkwardly against his stated learning-style preferences too. None of these groups independently
carry the ground-truth signal — it lives specifically in how Group A Q3 is asked and answered.

The ground truth's own wording ("agent should be honest... rather than mis-routing him") describes
downstream plan-generation behavior, which is explicitly out of scope for this exercise
(`PERSONA-DECISIONS.md`'s scope boundary: grounding validates whether the interview *collects* the
right information, not whether a correct plan gets generated from it — that agent doesn't exist
yet). The interview-scoped question is narrower: did the script surface, unprompted, everything an
agent would need to make that call correctly — that Omar already holds Developer-Foundations, that
he explicitly wants implementation over design/advisory framing, and that he pre-emptively
conditions his target-cert answer on an implementation/architecture split existing at all? It did,
cleanly, in Q2 and Q3 together. Whether a not-yet-built agent then acts on that correctly is a
separate question this transcript was never going to be able to answer, and isn't evidence against
the interview.

## Verdict

**Surfaced.** The interview script successfully elicits the exact signal the ground truth depends
on — Omar states an implementation-vs-architecture preference explicitly and conditions his
target-cert answer on that split, unprompted, which is as clean an extraction as this design can
produce. Whether a downstream agent correctly acts on that signal (disclosing the gap and the 2026
roadmap rather than mis-routing him into Architect-Professional) is plan-generation behavior,
out of scope for this interview-fidelity check per the standing scope boundary — not a basis for
downgrading this verdict.

---
persona: 05
name: Sam Okafor
category: regression-anchor
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Consulting engineer, ~8 years experience overall. AI tool experience
  specifically — using Claude Code daily for maybe a year and a half, moderate-to-heavy use. Domain
  is enterprise consulting, mostly working with clients who want production systems built, not just
  prototypes. Claude fits in as main coding assistant day-to-day, and increasingly the one designing
  agent architectures for client engagements rather than writing every line himself.
- Q2 (goals): Wants to confidently design production agent systems for clients — architecture
  decisions, tool/MCP integration choices, knowing what patterns actually hold up at scale vs. what's
  a demo toy. Less about passing a test, more about having the judgment (and the credential to back
  it) when in front of a client arguing for a particular approach.
- Q3 (target cert): Not locked into a specific name — has seen there's an Anthropic certification
  track but hasn't pinned down the exact title. Open to guidance.

**Group B**
- Q1 (tool experience): Heavy Claude Code CLI use, daily. Solid prompt engineering chops from
  actually iterating on this stuff for clients. Some MCP — wired up a few servers, understands the
  protocol at a working level, wouldn't call himself expert. API/SDK is light — knows it exists, hit
  it directly a handful of times, but most hands-on time is through Claude Code rather than raw API
  calls.
- Q2 (prior structured learning): Took an external mock exam recently as a diagnostic — passed, but
  unevenly across domains (detailed in Group D). No formal Anthropic Academy courses yet, no
  bootcamp. Otherwise self-study and on-the-job learning through actual client work.

**Group C**
- Q1 (framing): No hard deadline. Self-paced, open-ended.
- Q2 (budget) + Q2b (distribution): 8-12 hours/week realistically. Shows up mostly daily rather than
  weekend-batched — chips away most days rather than one big session.

**Group D**
- Q1 + follow-up: Yes — external mock exam, passed overall but uneven. Doesn't have precise
  per-domain numbers in front of him, but sense was: stronger on prompt engineering and general
  Claude Code workflow stuff, weaker on more formal/architectural areas — things like evaluation
  methodology and some safety/deployment governance topics felt shakier. Explicitly said he'd want
  to verify with a real diagnostic rather than rely on his memory of that mock.

**Group F**
- Q1 (format): Tracker/checklist format — likes being able to see progress and check things off.
- Q2 (modality) + Q2a + Q2b (all answered together): Mixed, weighted toward hands-on. Learns best by
  building something and hitting real problems. Task size: medium chunks, not five-minute toy
  exercises but also not multi-week epics — something to pick up in a session or two, ideally tied
  to realistic scenarios close to what he'd actually build for a client (agent design, tool
  integration), rather than abstract quiz-style practice.

## Comparison against ground truth

**Ground truth:** this is essentially the real reference case restated as a fresh persona — the
primary regression check. Should produce a plan structurally similar to the original, and should
exercise the "good score treated with skepticism" policy the same way the real diagnostic did.

**Against the persona's own ground truth line.** Every group converges cleanly on Architect-Foundations
with no contradictory signal. Group A's design-not-build consulting role, client-facing architecture
goal, and explicit "judgment plus credential, not just passing a test" framing is a strong,
unambiguous Architect (not Developer) fit — this is the same "design the solution, not just build
it" framing `DECISIONS.md` uses to describe the real person's own pivot from Developer to Architect.
Group B's tool profile (heavy Claude Code, working MCP, light raw API) matches the "supporting
knowledge, not separately tested" framing `DECISIONS.md` gives for Developer-track content under an
Architect plan. Group C and F add pacing/format facts (self-paced, 8-12 hrs/wk mostly daily,
tracker/checklist, hands-on-weighted medium-chunk tasks tied to realistic client scenarios) that are
plausible and internally consistent, without pulling against the Architect placement. Group D is
where the regression-anchor purpose actually lives, and it delivers: a passed-but-uneven external
mock, described (unprompted, in the follow-up) as stronger in prompt-engineering/workflow areas and
weaker in "more formal/architectural" areas — evaluation methodology, safety/deployment governance.
That is exactly the shape the skepticism policy needs to act on: a passing score that should not be
read as uniformly solid, with specific named weak spots to weight over the pass itself.

**Against the real original case (`DECISIONS.md`, "Diagnostic #1 and the resulting reallocation"),
structurally.** The two cases line up on every structural point that matters for the policy:
- Both are a real/described 28-ish-question-style external mock exam taken *before* the planning
  interview, not a diagnostic invented mid-conversation.
- Both pass overall (real case: 737/1000) while being explicitly uneven across domains rather than
  uniformly strong or uniformly weak — the exact shape the "don't reward a good score by cutting
  time" policy exists for.
- Both name specific weaker areas rather than a vague "did worse in general": the real case names
  Prompt Engineering (3/6) and Context Mgmt & Reliability (3/5) as weak and Agentic Architecture
  (6/6) as strong; Sam names evaluation methodology and safety/deployment governance as weaker and
  prompt engineering/Claude Code workflow as stronger. Notably the *polarity* differs — Sam's
  self-assessed strong area (prompt engineering) is one of the real case's two weak areas — which is
  a fine, expected variation (different people, different domain profiles) rather than a
  contradiction; the point of the anchor is the *shape* of the finding (pass + real unevenness +
  named domains), not that the domains must match one-for-one.
- Both hand the eventual plan-generation step a genuine "good score, treat with skepticism, weight
  the misses" case rather than a case that only *looks* like one on the surface.

One real, worth-flagging structural difference: the real case has a **precise, externally-sourced
per-domain breakdown** (6/6, 3/6, 3/5 — exact numbers off an external site's report). Sam's diagnostic
is **self-reported and explicitly imprecise** — he says outright he doesn't have per-domain numbers in
front of him, gives only a directional/qualitative sense of stronger vs. weaker areas, and then hedges
further: "I'd want to verify with a real diagnostic rather than rely on my memory of that mock." This
is a meaningful variation on the original, not a defect in the interview: it's a good test of whether
Group D's fallback-construction path (per `PERSONA-DECISIONS.md`'s scope boundary, this is
plan-generation behavior and out of scope for this record to adjudicate) would even trigger here.
Sam has *technically* already taken a diagnostic, so a naive Group D branch might treat the "prior
diagnostic exists" box as checked and stop — but the numbers he's handing off are self-reported and
explicitly flagged by Sam himself as unreliable ("verify... rather than rely on my memory"), which is
arguably closer to no-diagnostic-in-hand than to the real case's precise external report. Whether the
downstream logic recognizes that distinction and reconstructs/re-verifies rather than taking Sam's
fuzzy recall at face value is exactly the kind of case this regression anchor should keep testing for
in plan generation, even though it's out of scope to resolve here. What matters for this record is
that the *interview* surfaced the hedge explicitly and did not paper over it — the transcript hands
plan generation both the "good score, uneven, weight the misses" signal and the "the numbers behind
this are soft, self-reported, and the source himself doesn't fully trust them" signal, which is
everything downstream logic would need to do the right thing with either branch.

## Verdict

**Surfaced.** The interview produced everything the skepticism policy needs to act on: a pass, real
(not flat) domain unevenness, specific named weaker areas even without precise numbers, and — as an
explicit, worth-noting variation from the original case rather than a flaw — Sam's own hedge that his
recall of the diagnostic isn't precise and would need re-verification. That hedge is the one place
this restatement diverges structurally from the real case (which had a precise external breakdown),
and it's a good future stress-test of Group D's fallback/verification path, but it does not weaken
what this interview itself surfaced: the core "good score treated with skepticism" case is intact and
unambiguous.

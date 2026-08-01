---
persona: 23
name: Kwame Boateng
category: edge-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Platform engineer, ~6 years professional experience, in-house at a
  mid-size tech company (not consultancy/agency). Uses Claude Code CLI regularly as part of normal
  day-to-day work — comfortable but not a power user of every feature. Has used the API/SDK
  directly a handful of times for small internal scripts, nothing major. Knows MCP conceptually
  from reading but hasn't built anything with it. Prompt engineering skill picked up informally
  from heavy day-to-day use, no formal training.
- Q2 (goals): Not chasing new knowledge so much as formalizing/validating architecture-level
  judgment calls he already makes informally on the job (agent vs. simpler approach, how to
  structure things). Wants the Architect-Foundations certification specifically as something
  credential-backed to point to in career conversations (reviews, internal moves, job hunting) —
  no forcing deadline. Explicitly wants the underlying learning to be solid, not just exam-cram,
  so he comes out more confident at the architecture level, not just able to answer questions.
- Q3 (target cert): Claude Architect-Foundations, named directly and confidently, tied to the
  architecture-level work he already does.

**Group B**
- Q1 (tool experience): Claude Code CLI is his main touchpoint, regular daily use, comfortable but
  not exhaustive. API/SDK used ~5-6 times total for small internal scripts, not production-grade.
  MCP is a stated gap — read about it conceptually, never built or configured a server himself.
  No formal prompt-engineering background, developed a feel for it through trial and error over
  time. Hasn't used the plain chat interface much for work.
- Q2 (prior structured learning): No Anthropic Academy courses, no other vendor AI certifications
  (no AWS ML, no Gemini equivalent), no bootcamp. All self-study in the loose sense — using Claude
  Code for real work plus reading docs/blog posts as needed, nothing with a syllabus. This would be
  his first formal/structured credential effort in this space.

**Group C**
- Q1 (framing): No hard deadline, no employer mandate, no exam date scheduled yet. Fully
  self-driven and self-paced.
- Q2 (budget + distribution): Roughly 4-7 hours/week, inconsistent rather than daily — mostly
  weeknight evenings after work, with occasional bigger weekend catch-up sessions when behind or
  when more time is available.

**Group D**
- Q1 + follow-up: No official certification passed. About a month ago, a former coworker who
  actually took and passed the real Architect-Foundations exam put together an informal set of
  practice questions from memory and shared it as a Google Doc with a few former teammates. Kwame
  is explicit that it is "not an official thing at all, not from Anthropic or any company or
  website" — just the coworker's own recollection, no stated methodology, nothing published about
  its reliability, maybe a few dozen questions, and he isn't even sure whether the question set is
  stable or has been tweaked over time. He reports doing "decently overall, but pretty unevenly"
  across the handful of topic areas it touched — solid on some, shakier on others — with no clean
  score/percentage, just a rough qualitative sense, and volunteers his own caveat that it's "a
  pretty informal, one-off thing, not a real diagnostic in any rigorous sense."

**Group F**
- Q1 (format): Structured tracker/checklist — wants phases broken out with checkboxes so he can
  reorient quickly given his irregular schedule; a prose guide would go unread and loose pointers
  would leave him guessing given his limited structured-learning background.
- Q2 (modality) + Q2a + Q2b: Mix leaning hands-on — doesn't retain well from pure reading, though
  wants some reading/reference material for conceptual "why" grounding on architecture topics.
  Prefers applying concepts directly to real current work when possible, or open-ended
  tinkering/exploration when that's not possible — explicitly not looking for rigid guided labs
  with fixed steps. Medium-sized chunks (1-2 hours) fit his weeknight windows best; short 15-30
  minute bits feel too shallow, multi-session project-scale work is hard to commit to given his
  irregular schedule.

## Comparison against ground truth

Ground truth: Group D Q1's follow-up should elicit a specific, nameable source that's clearly not
`claudecertificationguide.com` (or any other known-vetted instrument) — enough detail for the
agent-side vetting step to recognize it as unrecognized and fall back to the full flat-skepticism
default, rather than either (a) failing to capture source detail at all (as in Elena Petrova's
grounding, #13, which never surfaced source detail at all because it wasn't tested for it), or (b)
surfacing only a thin, credibility-flattering signal ("a coworker who actually passed made it")
without enough disqualifying detail to keep a future agent from being tempted to extend it the
partial calibrated relief the current policy reserves for one specific vetted source only.

Per the standing scope note, this comparison evaluates only whether the interview transcript
itself surfaced the raw information a future agent-side vetting step would need — not whether such
a (currently nonexistent) agent would actually apply its skepticism policy correctly given that
input. Those are separate questions, and only the first is assessed here.

On failure mode (a): Kwame's transcript is the opposite of Elena Petrova's near-miss. Elena's
Group D answer named no source at all beyond "one external mock exam" — no origin, no format, no
detail an agent could use to classify it one way or the other. Kwame's Group D Q1 follow-up, by
contrast, is dense with specific, checkable detail: who made it (a named-in-relation-to-him former
coworker who actually passed the real exam), when (about a month ago), how (from memory, no stated
methodology), what form it took (a shared Google Doc), roughly how large it is (a few dozen
questions), and an acknowledged uncertainty about whether the set is stable over time. This is
unambiguously a specific, nameable source in the sense the ground truth requires — not a vague
gesture at "a practice test somewhere."

On the "clearly not a known-vetted instrument" requirement: the transcript doesn't just fail to
claim official status, it affirmatively and repeatedly disclaims it. Kwame states outright that the
source is "not an official thing at all, not from Anthropic or any company or website," has "no
methodology behind it," and "nothing published about how reliable it is." That is a direct,
unprompted string of disqualifying signals — exactly the raw material an agent-side vetting step
would need to distinguish this from `claudecertificationguide.com` or any comparable vetted
instrument, and to recognize it as unrecognized rather than as a borderline or ambiguous case.

On failure mode (b): the transcript does contain the informal credibility-signaling language the
ground truth flags as a risk — a coworker "who actually took and passed the real
Architect-Foundations exam" made the material. But unlike the thin, bare version of that signal the
ground truth warns about, it arrives here bundled with — and arguably outweighed by — the
disqualifying detail above (no official backing, no methodology, no published reliability, no
score, only a vague qualitative "did decently but unevenly" self-report, and the persona's own
closing hedge that it's "not a real diagnostic in any rigorous sense"). The interview did not
surface the credibility signal in isolation; it surfaced it alongside enough countervailing raw
detail that a future vetting step has clear material to conclude this is not a case for partial
relief. Whether a real vetting agent would in fact weigh that material correctly is exactly the
downstream question the scope note places out of bounds here — but the transcript did not leave it
starved of the facts needed to do so.

## Verdict

**Surfaced.** Group D Q1's follow-up produced a specific, nameable, clearly non-official source (a
former coworker's informally recollected practice-question Google Doc) with rich disqualifying
detail — no Anthropic/vendor backing, no methodology, nothing published on reliability, no clean
score — that would let a future agent-side vetting step recognize it as unrecognized and apply the
full flat-skepticism default. It avoids Elena Petrova's (#13) failure to capture any source detail,
and while it does include the coworker-credibility framing the ground truth flags as a risk, that
framing arrives alongside enough disqualifying raw detail that the interview itself is not the weak
link — whether a downstream vetting agent would correctly weigh that material is out of scope for
this record.

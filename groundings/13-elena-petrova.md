---
persona: 13
name: Elena Petrova
category: edge-case
repeat_tested: false
verdict: "Surfaced"
---

## Transcript

**Group A**
- Q1 (role & background): Junior Consultant at a mid-size advisory firm, ~1.5 years into her
  career (first job out of uni). AI tool experience thin — uses Claude via chat for drafting
  client memos and summarizing docs, ~6 months casual use. Industry is general business/IT
  consulting, not AI-native — Claude isn't core to her role yet, more something leadership wants
  more of them using and eventually certified on.
- Q2 (goals): Wants to pass the exam, but more specifically wants to stop feeling like she's
  guessing on architecture-y questions — model selection tradeoffs, RAG vs fine-tuning vs better
  prompting, context window/cost tradeoffs. Right now couldn't confidently explain that to a
  client.
- Q3 (target cert): Yes — Claude Architect-Foundations.

**Group B**
- Q1 (tool experience): Mostly just chat interface. Poked at the API a little (a couple curl
  calls following a tutorial, nothing built herself). Never touched Claude Code CLI, doesn't know
  what MCP is beyond the acronym. No real prompt engineering discipline — asks things
  conversationally.
- Q2 (prior structured learning): Nothing structured. No Anthropic Academy, no other vendor
  certs. Took one external mock exam a couple weeks ago cold, no prep beforehand.

**Group C**
- Q1 (framing): Soft mandate — manager wants a few of them certified this quarter to help pitch
  AI-related engagements, but no hard exam date booked yet. Semi-open-ended, but would rather not
  let it drag into next quarter.
- Q2 (budget) + Q2b (distribution): 3-4 hours/week realistically, irregular — client work eats
  weekdays unpredictably, usually whatever evenings she can grab plus a chunk on Sunday.

**Group D**
- Q1 + follow-up: Yes — scored 420/1000 on the external mock. Weak pretty much everywhere except
  one domain that came out surprisingly strong ("responsible AI / safety considerations" — she
  thinks that one's more common sense than knowledge, so wouldn't read too much into it).

**Group F**
- Q1 (format): Structured tracker/checklist — given how fragmented her time is, needs to see
  exactly where she left off.
- Q2 (modality) + Q2a + Q2b (all answered together): Mix, but leaning hands-on if anything —
  thinks the reason she scored so low is no real practical grounding, it's all abstract to her.
  Wants small, bite-sized tasks, nothing assuming she can block off a big session in one go.

## Comparison against ground truth

Ground truth: a direct test of the Group D/E skepticism policy in the opposite direction from the
real reference case — a weak score should trigger broad, heavier task allocation, and the one
accidentally-strong domain should still be treated cautiously (misses over hits, keep content even
on strength) rather than skipped.

Per the scope note accompanying this ground truth, and per `PERSONA-DECISIONS.md`'s standing
scope boundary, whether a downstream plan actually applies the skepticism policy correctly
(broad/heavy allocation on a weak score, cautious treatment of the one strong domain) is
plan-generation behavior this grounding step cannot observe — that agent doesn't exist yet. What's
in scope is narrower: whether the interview itself surfaced the raw diagnostic information a
future planning agent would need to apply that policy — the score, the domain breakdown including
the one strong-but-suspect domain, and her own hedge about that strength.

All three pieces come through cleanly in Group D's single Q1+follow-up exchange, with no
ambiguity or omission. The score is stated as a bare, unhedged number — "420/1000" — clearly weak
relative to a 1000-point scale. The domain breakdown is explicit rather than vague: "weak pretty
much everywhere" establishes the broad-weakness half of the picture, and "except one domain that
came out surprisingly strong" names the specific exception rather than leaving it as an
unspecified outlier. The domain itself is identified by name ("responsible AI / safety
considerations"), which is the detail a domain-level task-allocation policy would need to act on
at all — a vague "one area was okay" would have been much weaker signal. Most load-bearing for
this specific ground truth is the persona's own hedge, volunteered rather than prompted for
separately: she "thinks that one's more common sense than knowledge, so wouldn't read too much
into it." That is exactly the self-aware "don't take this hit at face value" framing the ground
truth's misses-over-hits policy is designed to act on — the interview didn't just surface a
strong-looking domain, it surfaced the persona's own reason to distrust that strength, unprompted.

Group F reinforces the broad-weakness framing from a different angle: she independently attributes
her low score to "no real practical grounding, it's all abstract to her," which corroborates
weakness as general and structural rather than confined to a couple of named gaps — consistent
with the broad, heavier allocation half of the ground truth rather than pointing at a narrow fix.
No group contradicts or complicates the Group D signal; Groups A–C and F all fit case as a
plausible surface presentation of a genuinely under-prepared but conscientious junior consultant,
with nothing that would lead a reader to discount the low score or the domain breakdown.

As an aside, per the scope note: whether a plan-generation agent, given this input, would actually
allocate broad/heavy tasks on the weak score and treat the safety domain cautiously (misses over
hits, keeping content rather than skipping it) cannot be demonstrated by this transcript — that
depends on downstream behavior this exercise doesn't test. Only the raw material for that judgment
was assessed here.

## Verdict

**Surfaced.** Group D's single Q1+follow-up exchange delivers all three ground-truth-critical
facts plainly and without contradiction — the weak 420/1000 score, the broad-weak-except-one-domain
breakdown with the strong domain named specifically, and the persona's own volunteered hedge about
not reading too much into that strength. Group F independently corroborates the broad-weakness
framing. The downstream question of whether a plan would actually apply the misses-over-hits
skepticism policy to the strong domain is out of scope for this exercise and not evaluated here.

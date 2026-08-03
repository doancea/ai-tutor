# BACKLOG.md

Known open items — defects, deferred fixes, and future scope, grouped into release tiers.

The line between tiers:

- **v1** — make what already exists correct. Self-hosted, single-user, bring-your-own-key. Nothing
  in v1 introduces a concept the system doesn't have or touches a locked decision.
- **v1.5** — grounding file download and opt-in sharing, still self-hosted. Lets corpus building
  start from organic open-source use, without hosting anything.
- **v2** — closed beta. Hosted and deployed, access gated by one-time-use codes, run among
  professional colleagues rather than opened to public signup. This is where locked v1 scope is
  deliberately expanded.
- **v3** — paid version.
- **Unprioritized** — captured, not tiered.

Items here are *captured*, not scheduled. Rationale for why a thing is built the way it is belongs
in the decision docs (`ARCHITECTURE-DECISIONS.md`, `INTERVIEW-DECISIONS.md`, `DECISIONS.md`); this
file tracks what is outstanding and links out.

---

# v1 — correctness within locked scope

## Open defects — `app/server/agent.js`

Found 2026-08-03 during a review of the Claude API integration and deliberately deferred at the
time. Two of the original four were closed by commit `89d8ea6`; these two remain. Neither has fired
in production yet.

### `pause_turn` resume loop drops history, and is unbounded

`generatePlan`'s `while (response.stop_reason === 'pause_turn')` loop rebuilds `messages` as
`[user, latestAssistant]` instead of appending, so on a second or later pause the earlier round's
`server_tool_use` / search-result blocks are dropped and the model loses its own prior search
results mid-flight. The loop also has no iteration cap.

**Fix:** append to a growing `messages` array; bound the loop with a `max_continuations`.
**Status:** never observed firing — the first successful run did zero `pause_turn` rounds.
**Priority note:** highest of the v1 defects despite never firing. An unbounded resume loop against
a metered API is unbounded spend, and the failure mode is silent.

### First-text-block extraction is fragile

`response.content.find(block => block.type === 'text')` takes the *first* text block. With
`web_search` in the tool set, a turn can contain interleaved commentary text before the final
structured answer, in which case `JSON.parse` runs on prose.

**Fix:** `.findLast()`.
**Status:** latent. The one successful run had exactly one text block, in final position. Slightly
more likely to bite now that `MAX_TOKENS` is 32000, since there is more room for commentary.

### Related, not a defect: undeclared response block types

The successful run returned four `code_execution_tool_result` blocks despite `tools` declaring only
`web_search_20260209` — most likely the `_20260209` variant's dynamic result filtering running
server-side code. Unverified. No action needed: the current code selects by type and ignores the
rest. Recorded so anything future that iterates `response.content` tolerates undeclared types.

## Honest handling of staged certification requests

Cheap mitigation for the multi-credential limitation below, pending the real fix. When the interview
names a staged path (e.g. Foundations *and* Professional), the plan currently compresses the earlier
credential into a single milestone phase without saying so. `buildSystemPrompt` already has a
"note the mismatch in `agentNotes`" pattern for plan-format requests it can't satisfy; apply the
same move here so the user is told rather than left to notice.

---

# v1.5 — grounding file download and opt-in sharing

Still self-hosted, still bring-your-own-key, nothing deployed. Users can generate and download the
grounding file for their own session, and choose to share it if they want. This makes corpus
building possible from any organic use of the open-source project, ahead of and independent of the
closed beta.

**Why it earns its own tier rather than riding along with v2.** The beta's entire consent posture
rests on the grounding file being the artifact that is retained and inspected. Shipping that
mechanism a tier earlier means it gets exercised against real sessions *before* anything depends on
it — the format, the "what you download is what is kept" invariant, and the sharing channel all get
validated while the stakes are still low. Discovering the grounding file is unreadable or
incomplete during the beta would undermine the posture at exactly the wrong moment.

The risk profile here is much lower than v2's: users pay their own API costs, there is no operator
spend, no accounts, no codes, no hosting. The act of sending a file *is* the consent, so no consent
flow is needed on this path.

## Scope

- Generate a grounding file from a completed session.
- Download it. Same hard constraint as v2: what the user downloads is exactly the artifact intended
  for the corpus, not a preview or summary of it.
- A documented way to contribute it, plus enough README material that someone who found the project
  organically knows the option exists and what it is for.

## The sharing channel needs deciding here, and one option is riskier than it looks

Previously listed as open under v2; it lands here instead, since this is the tier that first needs
it.

The cheapest channel for an open-source project is a PR or an issue attachment — no infrastructure
at all. **But that publishes the contributor's data publicly**, which is a categorically larger
disclosure than "shared privately with the maintainer," and a contributor reasoning about sharing a
file will not necessarily register the difference. If a repo-based channel is chosen, that has to
be stated in the copy, not left to be inferred. A private channel (email, an upload endpoint) is a
smaller disclosure but is infrastructure the tier otherwise does not need.

## Ships here, not at v2: the free-text copy nudge

The third-party-confidentiality concern (see v2) applies the moment anyone can share a file, not
only once there is a beta. The one-line nudge on the free-text fields — *"please keep this at a
level you'd be comfortable saying publicly; no employer-confidential detail"* — belongs in this
tier. It matters more here, since a repo-based channel would make "publicly" literal.

## Check against the locked never-persisted decision before building

`ARCHITECTURE-DECISIONS.md` locks transcript handling at "never persisted at all," including "no
offline log, no local retention." Writing a grounding file to disk is close enough to that line
that it should be explicitly reconciled rather than reasoned past.

Read for the reconciliation, offered as a starting point rather than a conclusion: a *user-initiated
export of their own answers*, generated on demand and handed to the person who entered them, is
materially different from an app-maintained log — the retired idea was retention by the operator,
with a channel back to a central collector. This has neither by default. But the decision's wording
is broad, and this tier was defined as "nothing touches a locked decision" one tier below, so it
should be recorded as a deliberate, scoped clarification the same way v2's collection was — not
absorbed silently.

---

# v2 — closed beta

Deployed, hosted instance. Access granted by **one-time-use codes**, run among professional
colleagues rather than opened to public signup. This tier is where `ARCHITECTURE-DECISIONS.md`'s
locked "single-user, self-hosted" scope is deliberately expanded — that doc says to revisit its
struck-through multi-user paragraph "only if scope explicitly expands beyond single-user/self-hosted
later," and this is that expansion.

## Multi-credential / staged certification paths

Data model gains a credential grouping (`credentials[]` + `credentialId` on each phase) so a staged
path can be expressed structurally instead of compressed into one phase. Direction, evidence, and
the rejected prompt-tuning alternative are in `ARCHITECTURE-DECISIONS.md`, "Multi-credential /
staged certification paths". Field set not locked. To be covered during the v2 development phase;
the v1 `agentNotes` honesty patch above is the interim mitigation until then.

## Collection of interview answers and generated plans — **supersedes a locked decision**

Both the interview answers and the generated plans are collected, to be used for further refinement
of the grounding work (`TEST-PERSONAS.md`, `GROUNDING-DECISIONS.md`, `GROUNDING-FINDINGS.md`).

**Scope: v2 only.** Everything in this section — the collection itself, the consent mechanism, the
retention posture — is reasoned from the closed beta's specific shape and is not intended to carry
into v3. See v3 for why it cannot.

**What this reverses.** `ARCHITECTURE-DECISIONS.md`, "Single-user, self-hosted scope decision",
locks transcript handling at **"never persisted at all"**, and states that offline logging, local
retention, and datamining use are "fully retired, not just softened." Collecting answers centrally
for grounding refinement is precisely the retired use. This is a deliberate reversal, not an
oversight, and it is **scoped to hosted deployments only** — self-hosted v1 keeps the original
never-persisted policy unchanged.

**Why this is legitimate rather than drift.** That same decision anticipated it: *"self-hosted
removes any channel back to a central collector and deliberately adding one would be its own
consent/privacy decision, not a byproduct of this one."* Hosting reintroduces the channel, so the
policy has to be re-derived rather than inherited. Treating it as an explicit decision is following
that instruction, not overriding it.

### The beta's actual shape, which sets the privacy posture

Not an open public beta — a **closed beta among professional colleagues**, with two stated purposes:
socializing the topic of AI in a closed professional setting, and increasing the grounding sample
size with real-world data. Participation is genuinely optional because the project stays open
source: anyone who prefers not to contribute data can self-host with their own API key and get the
*full* product, not a degraded tier. The cost motivation (a measured ~$1 per generation, paid by the
operator) is to be stated openly rather than left implicit.

Three concerns raised during the design discussion **dissolve** under that shape, recorded so they
are not re-litigated from scratch:

- **De-identification / re-identification.** Moot. Participants are known colleagues, already
  identified to the operator. Anonymization was never the actual control and pursuing it would be
  theater.
- **The deletion-authentication fork.** Moot. It only existed because one-time codes are an access
  gate rather than an identity, leaving no way to authenticate a removal request. With known
  colleagues, identity exists socially — a participant asks, the operator deletes.
- **Consent quality under a costless-refusal test.** Satisfied. The alternative to participating is
  the complete product, self-hosted.

### The concern that does not dissolve: third-party confidentiality

Two free-text fields invite participants to describe *their employer's* internal AI usage — A1's
"anything else about how Claude fits into your work today" and Group C's "what's driving it." If
colleagues are at other companies, their consent does not extend to their employer's information;
the party consenting is not the party exposed. Transparency, exit options, and closed membership
do not reach a third party.

Framed usefully, this is the operator's problem more than the participants': employer-confidential
material in a grounding corpus is a stored liability, and it is not even usable grounding data,
since it can't be quoted or shared in the intended open-source case study.

**Mitigation, cheap and sufficient:** one line of copy on the free-text fields — *"please keep this
at a level you'd be comfortable saying publicly; no employer-confidential detail."*

### Retention posture — asymmetric, derived from what grounding actually consumes

Assessed against `TEST-PERSONAS.md` rather than in the abstract. Every interview field maps to a
persona dimension, but not with equal weight.

**Retain verbatim — load-bearing, and where unanticipated dimensions arrive:**

- **`goals`.** Casey Whitfield (#15) is "goals-only, no target cert" — an entire persona class
  tests recommending a track *from goals*. Also the leakiest required field (the script's own
  example invites "need this for a role change by a specific date"), but not removable.
- **Diagnostic results + source.** Four personas exist to test source-calibrated skepticism — Sam
  (#5), Elena (#13), Camille (#22), Kwame (#23, explicitly "unrecognized/unvetted source"). Strip
  the source and the Group E policy becomes untestable. The next unrecognized source will arrive
  as prose, which is exactly the point.
- **role / years / domain, `toolExperience`, weekly hours, deadline framing + date, format
  preferences.** All directly encoded in every persona.

**Drop or abstract — weak grounding value relative to risk:**

- **`deadlineDriver`** — see the instrument question below. Nothing consumes it.
- **`claudeContext`** (A1 optional) — substantially redundant with B1 tool experience, which is
  structured and covers the same ground. Already optional, and the field most likely to carry
  employer-confidential detail.

**The structural observation, and the tension in it.** Grounding artifacts are already
abstractions, not transcripts — "consulting engineer, ~8 years, design-not-build role" is a
dimensional profile nobody said aloud. So the corpus could store persona-shaped summaries rather
than verbatim answers, in the format the grounding work already uses natively. **But** a summarizer
mapping answers onto the existing schema can only capture dimensions already thought of, and the
entire reason real data beats 23 synthetic personas is finding axes nobody anticipated. Abstract
everything and the result confirms the current persona space instead of expanding it — the opposite
of the stated purpose. Hence asymmetric rather than uniform treatment.

## Downloadable grounding file — transparency by inspection

Every user can download the exact grounding file produced from their own session. Self-hosted users
get the same file and can choose to share it if they want.

**This is the primary consent mechanism, not a convenience feature.** It replaces
consent-by-disclosure ("here is our policy describing what we keep") with consent-by-inspection
("here is the actual artifact — look at it"). A written policy can drift from what the code does;
a downloadable artifact cannot, provided the constraint below holds.

**Hard constraint that makes the claim true:** what the user downloads must be *exactly* what is
retained — same file, not a summary or a preview of it. If those two ever diverge, the transparency
claim becomes false rather than merely incomplete, and this whole posture collapses back to
policy-based trust. Any future change to the retention format has to change the download in the
same commit.

**Decided — hosted-version sharing is opt-in, after inspection.** Generate the plan, generate the
grounding file, let the user see exactly what they would be sharing, *then* ask. Opt-in, not
opt-out, and the decision comes after the artifact exists rather than before.

Inspect-then-opt-in is materially stronger than consent-then-inspect, and it partially self-polices
the third-party-confidentiality concern above — someone who sees their employer's internal detail
sitting in the file can decline. Partially, not fully: it depends on them noticing and caring, so
the copy nudge on the free-text fields is still worth shipping.

**The cost this accepts, accepted knowingly.** Asking after generation means the operator pays the
full ~$1 per run *regardless of whether the user shares* — including for runs that yield nothing
for the grounding corpus. This was weighed and accepted explicitly: sample size is controlled
directly by the operator, and the cost is worth it for the ethics and privacy position.

**Do not "optimize" this later.** The obvious efficiency move — ask for consent up front, before
spending the money — is precisely what this decision rejects, because consenting before the artifact
exists is consenting to a description rather than to the thing itself, which is the whole point of
the mechanism. If cost pressure makes this tempting at v3 scale, that is a reason to revisit
*pricing or volume*, not to move the consent gate earlier.

**Track the decline rate.** It is useful signal in its own right, and it is also a bias indicator:
if people who share differ systematically from people who don't — less confidential work, more
comfort with disclosure — the grounding corpus inherits that skew. Since the corpus's purpose is
finding dimensions the synthetic personas missed, a systematically filtered sample undercuts it
quietly. A simple count needs nothing sensitive retained.

**Second-order effects, all favorable:**

- **It decouples contribution from hosting.** A self-hoster who never touches the beta can still
  generate a grounding file and send it in. The corpus can grow from people who declined the hosted
  option entirely, which is a strictly better position than "participate or contribute nothing."
- **It forces the grounding format to be legible.** A file a non-expert can meaningfully inspect
  can't be a raw transcript dump. Legibility and privacy pull in the same direction here, and both
  push toward the persona-shaped abstraction the grounding work already uses natively.
- **It makes the asymmetric retention posture visible.** A user can see which of their answers were
  kept verbatim and which were abstracted, and judge for themselves.

**The self-hosted contribution path and the sharing channel move to v1.5**, which ships this
mechanism first. By the time the beta runs, the format and the channel should already be exercised
against real sessions rather than introduced alongside hosting, accounts, and consent flows.

## Plan export as a packaged website

Users can download their plan as a self-contained static site — the shape the original app took
before the generalization effort started (see `DECISIONS.md`, "Handoff to Claude Code": the
original was built, `vite build`-ed, smoke-tested, and handed off as a zip).

**Why this is required rather than nice-to-have:** a hosted beta user's plan lives on someone
else's server. When the beta ends, or they stop participating, the plan evaporates — and a study
plan you can't keep is worth nothing. Without export, the beta asks colleagues to hand over
interview answers in exchange for something temporary.

It also reinforces the consent posture: export makes leaving *costless and reversible*, not just
nominally optional. Someone can take their plan, self-host, and carry on. That is a stronger
version of "participation is voluntary" than an opt-out checkbox.

Likely contents: the built client, the plan JSON, and the per-phase study material under
`app/docs/units/`. Not beta-specific in principle — self-hosted users would benefit too — but the
value is sharply higher for hosted users, who otherwise have no copy at all.

### Still to settle before consent copy can be written

- **Whether retention is time-bounded.**

*What is retained* is no longer an open question in the usual sense — the downloadable grounding
file answers it by construction, and answers it more credibly than prose could. That leaves the
retention window as the one thing prose still has to state. The mechanism for reaching the two
stated purposes remains an implementation detail, deliberately open.

### Revisit note

**When this tier is picked up, re-run the privacy discussion as a gut-check and a second iteration
on the definition above — not a redesign of it.** The reasoning here was worked through carefully
against the beta's actual shape and should be treated as settled unless something has changed. What
warrants a fresh look: whether the beta's shape still matches what's described (closed, colleagues,
open-source alternative genuinely available), whether the retention window got decided, and whether
the free-text copy nudge actually shipped. If the beta has drifted toward open signup or the
self-hosted option has become impractical, the dissolved concerns above come back and the posture
needs re-deriving rather than adjusting.

The two load-bearing mechanisms to verify are the downloadable grounding file and the plan export.
Most of the posture rests on them: the grounding file is what makes "you can see exactly what is
kept" a checkable statement rather than a promise, and the export is what makes declining or
leaving genuinely costless. If either shipped in a weakened form — a preview rather than the actual
retained file, or an export that isn't self-contained — the privacy argument needs revisiting, not
just the feature.

## Infrastructure questions this tier forces

None answered. Listed so they are not rediscovered later.

- **API key ownership.** Self-hosted assumes bring-your-own-key. A hosted instance means the
  operator's key pays for every generation — one measured run cost ~$0.80 (97,533 input + 12,640
  output tokens). One-time codes bound that exposure by construction, which is a real argument for
  the code gate beyond access control.
- **Persistence model.** lowdb `FileSync` at a fixed path is a single-process, single-user store.
  Multi-user hosting needs per-user keying and a real database. Note the "no serverless" reasoning
  in the self-hosted decision was *contingent* on file-based persistence being adequate, so it needs
  rechecking rather than reusing.
- **Identity.** One-time codes are an access gate, not identity. Whether a beta user can return to
  their plan later, and what identifies them if so, is undecided.
- **Synchronous generation.** `routes/interview.js` blocks for the full generation — minutes, with
  thinking and web search. Documented as acceptable for single-user; not obviously acceptable for a
  shared instance under concurrent load.

---

# v3 — paid version

**Everything above about corpus expansion, consent, and retention is scoped to v2 and does not
carry forward by default.** The same approach is *not* anticipated for the paid version. What stays
constant is the weight given to ethics and privacy; what changes is that the v2 solution does not
work at v3's scale and audience. Treat this tier as an open question to be worked when reached, not
as v2 plus billing.

## Why the v2 model does not transfer

The v2 posture rests entirely on properties of a small closed beta, none of which survive:

- **A controlled audience.** The number of one-time codes generated and distributed — likely fewer
  than 50 — *is* the population. Nothing at v3 provides that bound automatically.
- **Known participants.** Colleagues, personally known to the operator, in an existing professional
  relationship.
- **A genuine free alternative.** The open-source self-hosted option delivers the full product, so
  declining costs nothing.

The three concerns recorded as **dissolved** in v2's privacy posture were dissolved by that shape
rather than by any mechanism, so **all three return at v3** and need re-deriving from scratch:

- **Re-identification** returns — paying strangers are not already known to the operator, so
  role + years + domain + target cert becomes identifying again rather than redundant.
- **The deletion-authentication fork** returns — identity is no longer social, so "delete my data"
  needs a real authenticated path, which reopens the tension between supporting deletion and
  minimizing identifiability.
- **Consent quality** needs re-checking — refusal is only costless while the self-hosted
  alternative remains genuinely practical for a non-technical paying user.

Formal terms likely have to replace social trust, and legal obligations may attach that a free beta
among colleagues did not carry.

## Cost abuse is a first-order threat, not an operational detail

At ~$1 per generation with `MAX_TOKENS` at 32000 plus web search, an openly reachable paid app is a
financial denial-of-service target. **A malicious actor could run up unbounded spend on the
operator's API key** — this is explicitly called out as a risk severe enough to be
business-ending, and it is the main reason the v3 model must differ wildly from v2 rather than
extend it.

Note what the code gate was actually doing in v2: access control *and* a hard spend cap, by
arithmetic rather than by policy — 50 codes bounds maximum exposure at ~$50 regardless of intent.
That property is load-bearing and vanishes the moment signup is open. It has to be deliberately
rebuilt, not assumed.

Compounding factors already known: generation is synchronous and takes minutes
(`routes/interview.js`), so abuse is a resource-exhaustion vector as well as a financial one, and
`MAX_TOKENS` was deliberately set generously on the reasoning that unused ceiling is free — true
when the operator controls the caller, not true under hostile use.

The control space, named but not chosen: prepayment before generation; per-account generation
limits; a hard spend ceiling configured on the operator's API key as a backstop regardless of
application logic; rate limiting and signup friction; **bring-your-own-key**, which is worth
singling out because it inverts the problem entirely — the user pays Anthropic directly, cost abuse
becomes structurally impossible, and the paid product becomes hosted convenience rather than
resold inference. That option also reshapes the privacy question rather than just the billing one.

## Also open

- **Account model.** Whatever v2 settles for identity will likely need to become real accounts.
- **Pricing floor.** ~$1 per generation measured, against which any pricing model has to clear
  both inference cost and abuse headroom.

---

# Unprioritized

Captured, not tiered.

## Instrument question — Group C's "what's driving it" is required but unconsumed

A question for `INTERVIEW-DECISIONS.md` regardless of the beta, surfaced while assessing what the
grounding corpus actually needs.

Group C Q1 makes the deadline **framing** a required either/or, and when the answer is "hard
deadline/mandate" it requires both a target date and free text on *what's driving it*. The
rationale at `INTERVIEW-DECISIONS.md:226` is thorough about why the framing is a required
categorical and why the budget is bucketed — but it never separately justifies the driver text.

Meanwhile nothing consumes it. `buildSystemPrompt`'s pacing instruction anchors to "the low end of
their stated weekly time-budget range against any deadline they gave," which uses the *date*.
`formatAnswers` passes the driver through to the model, but no instruction references it.

So it is currently a **required free-text field with no documented rationale of its own and no
agent-side consumer** — and it is simultaneously the field most likely to surface a performance
review, an employer mandate, or a restructuring (see the v2 retention posture).

Three ways it could resolve, none chosen: it has a real use that was never written down and should
be (in which case `buildSystemPrompt` should probably reference it); it should become optional; or
it should be dropped. Worth deciding on instrument grounds first — the privacy angle is a reason to
look, not the reason to change it.

## User-added tracked items

Let users add their own items to the tracker alongside the generated plan — things the agent didn't
produce but the person wants tracked against the same certification.

Open questions, none answered:

- Do user items belong to a phase, or sit outside the phase structure?
- Do they count toward progress and hour totals, or track separately so generated-plan progress
  stays comparable?
- What happens to them if the plan is ever regenerated — orphaned, re-attached, or preserved as a
  separate layer? This is the one that most likely constrains the data model, since it implies user
  items need an identity independent of the generated `id` scheme in `shapeIntoStore`.

# GROUNDING-FINDINGS.md

Step 3 of the grounding plan: cross-persona synthesis across all 22 completed records in
`groundings/`. Criteria for what qualifies as a finding, and the three disposition buckets, are
defined in `GROUNDING-DECISIONS.md`'s "Step 3: cross-persona synthesis criteria and findings
format" section — reproduced here only by reference, not restated.

## Scoreboard

All 22 personas resolved to a final verdict of **Surfaced** (12 single-pass + Sam Okafor's careful
single run) or **2/2 consistent** (10 repeat-tested personas, including all 3 margin personas). No
persona produced a final **Partial** or **Missed** verdict, and no repeat-tested persona needed a
run beyond the 2-run floor — none approached the 7-run cap. Two single-pass groundings (#10, #11)
passed through an intermediate incorrect "Partial" verdict before being corrected; see Finding 3.

This is itself the headline result: across 7 extraction-dependent edge/cross-cutting personas and
3 margin personas specifically selected because their ground truth was expected to be fragile to
persona-generation noise, the interview script's signal extraction held up on every single repeat
test. No interview-design fragility was detected via the repeat-interview mechanism.

## Findings

### 1. Interview design showed no fragility across any repeat-tested persona

**Finding:** All 10 repeat-tested personas — the 7 selected for extraction-dependent signal
(buried details, redirect language, mismatch flags) plus all 3 margin personas — resolved at the
2-run floor with full agreement between runs. None diverged, none required a 3rd run, none came
close to the 7-run cap that margin personas were expected to plausibly exercise.

**Evidence:** `groundings/02-devon-ruiz.md`, `04-ilana-voss.md`, `06-grace-liu.md`,
`08-tobias-kruger.md`, `16-whitney-cole.md`, `17-anjali-mehta.md`, `19-farid-haidari.md`,
`20-marisol-tan.md`, `21-jonas-eriksen.md`, `22-camille-duarte.md` — all frontmatter
`verdict: "2/2 consistent"`.

**Disposition:** No revision needed. This is a positive confirmation of both the interview
script's extraction reliability and the adaptive-repeat mechanism's calibration (`2/2 consistent`
was the modal, not just possible, outcome).

### 2. Margin personas preserved genuine ambiguity rather than collapsing to a clear signal

**Finding:** `GROUNDING-DECISIONS.md`'s own "Why" note for Step 3 warns that "a margin persona
that resolves cleanly and consistently wasn't actually constructed as ambiguously as intended"
would itself be a finding. That risk didn't materialize: all three margin personas reproduced
their intended boundary condition — not a false lean toward one side — independently across both
runs.

**Evidence:** `groundings/20-marisol-tan.md` (both runs independently state a genuinely balanced
build-vs-design split, with Group A Q3 declining to force a premature single-cert commitment in
either run); `21-jonas-eriksen.md` (both runs land the same ~48-64 total hour figure against an
8-week deadline described with matched moderate, non-extreme firmness); `22-camille-duarte.md`
(both runs independently produce a 620/1000 score with a flat domain spread, distinct from both
the Sam Okafor high-uneven and Elena Petrova low-score extremes).

**Disposition:** Persona/methodology artifact bucket, but as confirmation rather than a problem —
`PERSONA-DECISIONS.md`'s margin-persona construction is validated as working; no revision needed.

### 3. Writer-agent scope-boundary errors, caught and corrected mid-run

**Finding:** Two independent single-pass groundings were initially mis-verdicted "Partial" by
their one-shot writer subagents, because the writer evaluated hypothetical downstream
plan-generation behavior (would an agent that doesn't exist yet make the right call) instead of
scoping the verdict to whether the interview transcript itself surfaced the needed signal — a
direct violation of `PERSONA-DECISIONS.md`'s standing scope boundary. Both were manually corrected
after review. An explicit scope-note paragraph was added to every subsequent writer-agent prompt
starting with persona #12, and the error did not recur in any of the 12 groundings written after
the fix (including 6 more repeat-tested personas with more complex verdict logic).

**Evidence:** `groundings/10-omar-farouk.md` and `groundings/11-naomi-ferreira.md` — both now read
`verdict: "Surfaced"` and correctly scope the Verdict section to interview-surfaced signal only,
but both were edited post-hoc from an original "Partial" that conflated interview fidelity with
unverifiable downstream agent behavior.

**Disposition:** Persona/methodology artifact — already actioned within this run (scope-note fix
applied from persona #12 onward). Recommend codifying the fix permanently: append the scope-note
requirement to `GROUNDING-DECISIONS.md`'s "Grounding file layout" section as a mandatory part of
any future writer-agent prompt template, so the fix survives past this specific run's improvised
correction rather than remaining implicit.

### 4. Group D's diagnostic follow-up doesn't distinguish a precise external score from a hedged, self-reported one

**Finding:** `INTERVIEW-SCRIPT.md`'s Group D Q1 follow-up asks only "What was your score, and if
you have a domain/topic breakdown, share that too" — it doesn't ask about the *reliability* or
*source* of the recalled numbers. The real reference case (`DECISIONS.md`) had a precise,
externally-sourced per-domain breakdown; Sam Okafor's restatement of that case surfaced a
genuinely different texture — self-reported, explicitly imprecise, with Sam himself hedging that
he'd "want to verify with a real diagnostic rather than rely on his memory of that mock." The
interview surfaced this faithfully (not a miss), but only because Sam volunteered the hedge
unprompted — the script has no question that would reliably elicit this distinction from a persona
who didn't happen to volunteer it.

**Evidence:** `groundings/05-sam-okafor.md`'s Comparison section, which flags this explicitly as
"a good future stress-test of Group D's fallback/verification path" and notes the real case had no
equivalent ambiguity to test against.

**Disposition:** Interview-design gap — candidate revision to `INTERVIEW-SCRIPT.md` Group D Q1's
follow-up, e.g. an optional sub-question on how confident/precise the recalled score is, so a
downstream agent can distinguish "solid external number, act on it directly" from "soft recall,
verify or reconstruct before relying on it" without depending on the persona volunteering that
distinction unprompted.

### 5. Group F's single-select format options don't accommodate a legitimately blended preference

**Finding:** `INTERVIEW-SCRIPT.md` Group F Q1 offers three mutually exclusive format buckets
(tracker/checklist, narrative document, loose/high-level guidance). One persona's genuine
preference didn't map cleanly onto any single bucket — it blended checklist-like structure with an
explicit non-rigid caveat, plus a narrative component for the "why." This is attributable to the
forced single-select design itself, not to that persona's phrasing — any persona with a similarly
blended real preference would hit the same gap.

**Evidence:** `groundings/15-casey-whitfield.md`'s Comparison section, flagged there as "a minor
script-fit observation" separate from (and not affecting) that persona's main verdict.

**Disposition:** Interview-design gap — candidate revision to `INTERVIEW-SCRIPT.md` Group F Q1,
e.g. allowing a "combination" option or brief free-text elaboration alongside the bucketed choice,
rather than forcing a single exclusive pick.

### 6. Diego Fuentes' loose/high-level guidance preference has no home in the current tracker-shaped plan data model

**Finding:** Diego's Group F Q1 answer is an explicit, unhedged preference for loose/high-level
guidance over tracker/checklist structure — cleanly surfaced by the interview with no ambiguity.
The persona's own ground truth line names the real question this is meant to test: whether the
(not-yet-built) plan-generation layer can actually honor that format given the app's current
tracker/checklist-shaped data model, or whether this exposes a genuine product gap.

**Evidence:** `groundings/18-diego-fuentes.md` — Verdict section explicitly separates the clean
interview-surfaced preference from this downstream, out-of-scope question, and flags it as "a
candidate out-of-scope observation for Step 3."

**Disposition:** Out-of-scope observation — this is about the plan-generation/data-model layer,
which doesn't exist yet. Noted here for whenever that layer is designed, not actioned now. Worth
surfacing early since it's a design constraint (can the data model represent a non-checklist plan
at all) rather than a content question, and may be cheaper to accommodate from the start than to
retrofit.

### 7. Two structurally distinct named-target mismatch types were both caught cleanly and shouldn't be conflated

**Finding:** Two personas were independently constructed to test different mismatch failure
modes — Tobias Kruger (#8): a **skill-level gap**, where the demonstrated background doesn't
support the named top-tier target regardless of who chose it; Whitney Cole (#16): a **role-scope
mismatch**, where the demonstrated skill is adequate but the named target's content-shape (build/
implementation-heavy) doesn't match what the actual goal needs (talking-points fluency). Both
personas name a manager/external party as the source of their target, but in Tobias's case that
detail is incidental to the gap, while in Whitney's case it's closer to the actual mechanism of the
mismatch (nobody, including her, ever vetted content-fit, only difficulty-fit). Both grounding
files independently flag this distinction in their own Comparison sections without cross-reading
each other.

**Evidence:** `groundings/08-tobias-kruger.md` and `groundings/16-whitney-cole.md`, both 2/2
consistent, both explicitly noting the structural difference from the other case.

**Disposition:** Persona/methodology artifact — confirmation, not a revision candidate.
`PERSONA-DECISIONS.md`'s deliberate construction of two distinct mismatch types works as intended;
worth flagging explicitly here so that any future mismatch-flagging logic (or documentation of it)
treats these as two separate code paths rather than one generic "named target didn't fit" bucket.

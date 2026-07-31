# GROUNDING-FINDINGS.md

Step 3 of the grounding plan: cross-persona synthesis across all 22 completed records in
`groundings/`. Criteria for what qualifies as a finding, and the three disposition buckets, are
defined in `GROUNDING-DECISIONS.md`'s "Step 3: cross-persona synthesis criteria and findings
format" section — reproduced here only by reference, not restated.

## Scoreboard

All 22 personas resolved to a final verdict of **Surfaced** (11 single-pass, plus Sam Okafor's
careful single run, for 12 total) or **2/2 consistent** (10 repeat-tested personas, including all 3
margin personas). No
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
starting with persona #12, and the error did not recur across the 11 groundings written from
persona #12 onward (personas #12–22, including 6 more repeat-tested personas with more complex
verdict logic).

**Evidence:** `groundings/10-omar-farouk.md` and `groundings/11-naomi-ferreira.md` — both now read
`verdict: "Surfaced"` and correctly scope the Verdict section to interview-surfaced signal only,
but both were edited post-hoc from an original "Partial" that conflated interview fidelity with
unverifiable downstream agent behavior.

**Disposition:** Persona/methodology artifact — already actioned within this run (scope-note fix
applied from persona #12 onward), and now codified permanently: `GROUNDING-DECISIONS.md`'s
"Interviewer role collapsed into the orchestrator" section — where the writer-subagent handoff
itself is specified — requires the scope note as a mandatory part of any future writer-agent
prompt, so the fix survives past this specific run's improvised correction. See also
`CASE-STUDY-NOTES.md` for the fuller incident account.

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

**Disposition:** Interview-design gap — actioned. Resolved not with a confidence/precision
self-report (which would repeat the reasoning already rejected in `INTERVIEW-DECISIONS.md`'s
"self-assessed test-validity question, dropped from Group D") but by capturing the assessment's
*source* alongside its result, and pushing reliability calibration to an agent-side, source-based
vetting policy instead of a person's self-assessment. Group D Q1 is broadened to "any assessments
related to this goal or a similar topic," its "Yes" follow-up now asks for the source alongside
the result, and the "Group E" skepticism policy is recalibrated from a flat rule to one
conditioned on source reliability (e.g. `claudecertificationguide.com`'s documented short/long
tiers). See `INTERVIEW-SCRIPT.md` (Group D Q1) and `INTERVIEW-DECISIONS.md` (Group D Q1 and Group
E sections) for the resulting design; `DECISIONS.md` is left untouched as the historical record of
the original single-source case this generalizes from.

### 5. Conversational-format grounding can't validate whether real users would actually use a bucketed question's `Other` escape valve

**Finding:** `INTERVIEW-SCRIPT.md` Group F Q1 is documented as "bucketed + Other"
(`INTERVIEW-DECISIONS.md`, Group F Q1 & Q2 section), with a free-text `Other: ______` option
already present specifically to catch answers that don't fit the three named buckets
(tracker/checklist, narrative document, loose/high-level guidance) — the script content is
correctly designed, not missing an escape valve. But this grounding exercise conducts every
interview conversationally (per "Interviewer role collapsed into the orchestrator" in
`GROUNDING-DECISIONS.md`): the orchestrator asks questions via `SendMessage` and personas answer in
free prose, so no persona is ever actually forced through the literal choice a real end-user will
face in the shipped form UI. Casey Whitfield's answer — "loose checklist or set of milestones
rather than a rigid tracker... narrative explanation for the why" — blends checklist structure with
an explicit non-rigid caveat plus a narrative component, genuinely not a clean fit for a single
bucket. The conversational transcript captured all of that nuance faithfully, but that says nothing
about whether a real user with the same underlying preference would click `Other` and write it out,
versus just clicking the closest single bucket ("tracker/checklist") and losing the nuance to
ordinary form satisficing.

**Evidence:** `groundings/15-casey-whitfield.md`'s Comparison section, flagging the bucket-fit
mismatch; `INTERVIEW-DECISIONS.md` (Group F Q1 & Q2 section) confirming Q1 is "bucketed + Other" by
deliberate design.

**Disposition:** Persona/methodology artifact — not a revision candidate for
`INTERVIEW-SCRIPT.md` (the script already has the right shape). Worth noting in
`GROUNDING-DECISIONS.md` as a structural blind spot of conversational-format grounding: it validates
that the interview's *semantic content* can capture a given signal, not that a real user
interacting with the eventual form UI will reach for the right option under normal form friction.
Applies to every bucketed+Other question, not just this one; Casey's transcript is simply the one
concrete illustration on hand. See Finding 6c for the corresponding forward-looking UI-design note.

### 6. Out-of-scope observations for the future plan-generation layer

**6a. Diego Fuentes' loose/high-level guidance preference has no home in the current tracker-shaped plan data model**

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

**6b. Mismatch-flagging logic should treat skill-level gaps and role-scope mismatches as separate code paths**

**Finding:** Tobias Kruger (#8) and Whitney Cole (#16) were independently constructed to test two
structurally distinct named-target mismatch types — a skill-level gap (the demonstrated background
doesn't support the named top-tier target, regardless of who chose it) and a role-scope mismatch
(the demonstrated skill is adequate, but the named target's content-shape doesn't match what the
actual goal needs). Both were caught cleanly by the interview (see Finding 1), so this isn't an
interview-design gap — it's forward guidance for the not-yet-built mismatch-flagging logic itself,
surfaced because both grounding files independently flagged the distinction without cross-reading
each other.

**Evidence:** `groundings/08-tobias-kruger.md` and `groundings/16-whitney-cole.md`, both 2/2
consistent, both explicitly noting the structural difference from the other case.

**Disposition:** Out-of-scope observation — the mismatch-flagging logic doesn't exist yet. Noted
here so that whenever it's designed, it treats these as two separate code paths rather than one
generic "named target didn't fit" bucket, rather than actioned now.

**6c. Bucketed-choice questions risk losing nuance to form satisficing once a real checkbox UI exists**

**Finding:** A real end-user filling out a literal form (checkboxes plus an `Other` free-text
field, per the locked v1 scope) faces a documented UX tendency to pick the closest pre-built option
rather than take the extra step of selecting `Other` and writing a free-text answer — especially
when one bucket is "close enough." For a blended preference like Casey Whitfield's (Group F Q1:
checklist structure, but explicitly non-rigid, plus a narrative "why" component), this creates a
real risk that a user just clicks "tracker/checklist" and the plan-generation layer never sees the
nuance at all. This can't be tested by this exercise's conversational-format grounding (see Finding
5), since no persona is ever actually forced through the literal choice.

**Evidence:** `groundings/15-casey-whitfield.md` (the blended answer); `INTERVIEW-DECISIONS.md`
(Group F Q1 & Q2 section, confirming Q1's "bucketed + Other" design).

**Disposition:** Out-of-scope observation — this is about the not-yet-built form UI (and possibly
the plan-generation layer's handling of `Other` free text), not the interview script's content,
which is already correctly shaped. Noted here for whenever that UI is designed: consider whether
`Other` needs UI treatment that makes it inviting rather than a last resort (e.g., an
always-visible optional free-text elaboration field alongside the bucketed choice, rather than only
appearing as a fallback), so blended answers don't get lost to the path of least resistance.

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
`PERSONA-DECISIONS.md`'s deliberate construction of two distinct mismatch types works as intended.
(The forward-looking implication for future mismatch-flagging logic is split out as Finding 6b,
since that's an out-of-scope observation about a layer that doesn't exist yet, not a
persona/methodology revision.)

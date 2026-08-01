---
persona: 05
name: Sam Okafor
category: regression-anchor
repeat_tested: false
---

## Transcript

### Group A

Q (combined: role/background, years experience overall + with Claude, industry, anything else;
goals; target cert):

"Sure, happy to.

1. I'm a consulting engineer — I work with clients on system design rather than day-to-day
implementation myself.

2. About 8 years of professional experience overall. With Claude specifically, I use Claude Code
pretty much daily at this point, so call it regular, moderate-to-heavy use — I couldn't give you
an exact "months" number, it's just become part of how I work.

3. Consulting — I go into client engagements and help design systems, so the domain shifts
depending on who I'm working with, but the common thread is I'm usually the one setting
architecture and direction rather than writing all the code myself.

4. Beyond daily Claude Code use, I do a fair amount of prompt engineering, I've worked with MCP
some, and I've used the API directly but not heavily — most of my hands-on time is through Claude
Code itself.

On the outcome: what I actually want out of this is to be able to design production-grade agent
systems for clients — that's the real goal, not the cert itself so much as being able to walk
into an engagement and competently architect something that holds up in production.

As for a specific certification — yes, I'm working toward the Claude certification, though if
you're asking about a specific track or level within that, I'd have to say I'm not 100% sure
which one is the right fit yet. I did take the mock exam over at claudecertificationguide.com,
the short 28-question version, and passed, but my results were pretty uneven across domains, so
I'm not sure that tells me much about which specific certification track lines up with where I
actually am."

### Group B + C (combined)

Q (tool experience; prior structured learning; deadline framing; weekly time budget;
distribution):

"On the hands-on side — Claude Code is where I actually live day to day. I'm in it constantly for
client work, so I've got a good feel for the CLI itself, how to structure a session, get it to do
multi-step work, that kind of thing. Prompt engineering is the other place I'd say I'm strong — a
lot of my job is basically getting Claude to behave predictably for whatever the client's use
case is, so I've spent real time on that. MCP I've used, but I'd call it "some" rather than deep —
I've set servers up and worked with them on a couple of engagements, not something I'd say I've
mastered. And the raw API/SDK — I've used it, but lightly. Most of my hands-on time goes through
Claude Code rather than hitting the API directly.

As for other structured learning — nothing formal that I can point to, no. I haven't done an
Anthropic Academy course or another vendor's certification or a bootcamp. Honestly the mock exam
I mentioned is about the closest thing to "structured" I've done for this — everything else has
just been on-the-job, learn-by-doing.

No hard deadline on my end. Nobody's requiring this of me, there's no exam date on the calendar —
it's self-paced, driven by wanting to actually get good at this for client work.

Time-wise, realistically 8 to 12 hours a week. And it's mostly daily — I tend to chip away at it
a bit each day rather than batch it all into a weekend."

### Group D

Q ("Do you have results from an assessment related to this goal (or a similar topic) that you're
willing to share? If yes, share what you remember and where it was from."):

"Yeah, I've got the one — the mock exam from claudecertificationguide.com, the short-form
version, 28 questions. I passed overall, but it wasn't clean across the board. My recollection is
the breakdown by domain was pretty uneven — I did well on some areas and noticeably worse on
others, though I'll be honest, I don't remember the exact per-domain numbers or percentages at
this point, it's been a bit since I looked at it closely. I don't have the raw output in front of
me to paste in, this is just my best recollection of it. If it helps, the general shape was:
solid on some of the more hands-on/practical stuff, weaker on whatever the more conceptual or
theory-heavy domains were — but don't hold me to precise labels on which domains those were."

### Group F

Q (plan format; modality; if hands-on/mixed: type + size):

"I'd want a structured tracker or checklist — something I can actually check off phase by phase.
I don't want a narrative doc I have to read through to figure out where I am, and I definitely
don't want loose high-level guidance where I'm the one inventing the structure — I've got enough
of that in my actual job, for this I want the plan itself to tell me what's next.

On hands-on versus reading — I want a mix, but if I had to lean one way, more hands-on. Given
what I actually want out of this — being able to design production agent systems for clients —
pure reading isn't going to get me there. I do think I need some reference/conceptual material
too, especially since the mock exam showed gaps somewhere, so probably wherever the weaker domain
was needs some real explanation, not just an exercise to fumble through.

For the hands-on piece — honestly what appeals most is applying it directly to real current work
rather than disconnected practice projects. I'm already doing client engagements, so if there's a
way to structure this so the hands-on parts double as things I'd plausibly be doing anyway,
that's ideal. I wouldn't rule out a structured guided lab here or there if a concept really needs
it, but open-ended tinkering isn't really what I'm after — I want direction, not a sandbox.

Task size — medium, 1-2 hours, is probably the sweet spot for me. Quick 15-30 minute tasks feel
too fragmented given I'm chipping away daily anyway, and large project-scale tasks are harder to
fit around actual client work unless they're the "apply to real work" kind, which is a bit
different."

## Comparison against ground truth

**Ground truth:** "this is essentially the real reference case restated as a fresh persona — the
primary regression check. Should produce a plan structurally similar to the original, and should
exercise the 'good score treated with skepticism' policy the same way the real diagnostic did.
The named source and tier should be surfaced by Group D Q1 and recognized by the agent-side
skepticism-calibration policy (INTERVIEW-DECISIONS.md's 'Group E') as the known, short-form tier
— still warranting full skepticism, same as the real case, not a test of reduced downweighting
(that's Camille Duarte, #22)."

The hinge point is Group D Q1. The transcript surfaces, explicitly and twice (once in passing
during Group A, then again as the direct answer to Group D Q1): the source
(`claudecertificationguide.com`) and the exact tier ("the short 28-question version" /
"short-form version, 28 questions"). This is the identical source/tier pair the real reference
case used (`DECISIONS.md`'s "Diagnostic #1" — "a real diagnostic (28-question mock exam, external
site)"), so per INTERVIEW-DECISIONS.md's Group E policy this is a known source at the tier that
gets *no* downweighting relief (that relief is reserved for the long 60-question tier) — full
skepticism applies, matching the real case rather than Camille Duarte's reduced-downweighting
scenario.

The transcript also surfaces the "good score, uneven across domains" shape the skepticism policy
is meant to act on: "I passed overall, but it wasn't clean across the board... I did well on some
areas and noticeably worse on others." Unlike the real reference case, Sam doesn't recall exact
per-domain numbers ("I don't remember the exact per-domain numbers or percentages") — only a
directional shape ("solid on hands-on/practical stuff, weaker on conceptual/theory-heavy
domains," with an explicit caveat not to hold specific domain labels to that description). Ground
truth doesn't require the numeric breakdown to be reproduced exactly — only that the named source
and tier are surfaced clearly enough to trigger the calibration policy, which they are. The
looser domain-level recall is a plausible, distinct feature of this persona's telling but doesn't
undercut the core regression signal: a passing score, from a known-and-tiered source, self-
reported as uneven, is on the record for an agent to apply full skepticism to when it exists.

On the "structurally similar plan" half of the ground truth: the surrounding groups reproduce the
reference case's shape closely enough for a downstream plan to plausibly land the same way —
regular high-frequency engagement (8-12 hrs/week, daily), no external deadline, a
consulting/architecture background with strong Claude Code and prompt-engineering experience but
lighter MCP and API/SDK exposure, a structured-tracker plan-format preference, and a hands-on-
leaning mixed modality with a stated preference for applying practice to real client work at
medium (1-2 hr) task granularity. None of this is a scope question for this writer (downstream
plan-generation behavior isn't observable yet), but the raw material needed to produce a
structurally similar plan is all present and unambiguous in the transcript.

## Verdict

**Surfaced.** Group D Q1 cleanly surfaces both the named source (`claudecertificationguide.com`)
and its exact tier (short, 28-question) — twice, consistently — which is exactly what the Group E
skepticism-calibration policy needs to apply full (not reduced) skepticism to a passing-but-
uneven score, matching how the real reference case was treated. (Aside, not a modifier of this
verdict: whether a downstream plan-generation agent actually applies that policy correctly isn't
something this transcript can demonstrate — only that the raw signal it would need to do so was
surfaced clearly.)

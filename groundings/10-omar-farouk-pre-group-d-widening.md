---
persona: 10
name: Omar Farouk
category: boundary-case
repeat_tested: false
---

## Transcript

### Group A

Q (combined: role/background, years experience overall + with Claude, industry, anything else;
goals; target cert):

> Sure, happy to give background.
>
> 1. Senior backend engineer. I work on production agent tooling day to day.
>
> 2. I've been doing professional software engineering for a while now — solidly senior level, so
> call it somewhere in the 10-12 year range overall. With Claude specifically and AI tools
> generally, I'm deep into it — using the API, Claude Code, building MCP servers, doing a fair
> amount of prompt engineering work. It's not a side interest, it's core to what I build day to
> day.
>
> 3. Backend/infra side of things — I build the agent tooling and systems that other things run on
> top of, production-grade stuff, not prototypes.
>
> 4. Claude's basically embedded in my workflow at this point — I'm writing code with Claude Code,
> building tools that Claude calls via MCP, integrating the API directly into services. It's not "I
> use the chat UI sometimes," it's more that a good chunk of what I ship has Claude somewhere in
> the critical path.
>
> On the outcome — I already hold the Developer-Foundations cert, so I'm past the basics. What I
> want out of this is something that goes deeper on the implementation side — harder technical
> material, more rigor around things like tool design, agent architecture patterns, failure modes,
> that kind of thing. I want to come out of it more capable at actually building this stuff at a
> higher level of sophistication. I'm explicitly not looking for the "Architect" track or anything
> with an advisory/design-strategy flavor to it — I don't want to be the person who whiteboards a
> system for someone else to build. I want the credential and the skill to reflect that I build the
> thing myself, just at a more advanced tier.
>
> As for a specific cert in mind — not a name I can give you off the top of my head. I know I want
> "not Architect" and I know I want it deeper/more advanced than Developer-Foundations. If there's
> something like an Advanced or Expert Developer track, that's probably it, but I don't know your
> naming conventions.

### Group B + C (combined)

Q (tool experience; prior structured learning; deadline framing; weekly time budget;
distribution):

> On the hands-on side — pretty much all of it, and pretty deep on each. I use the API/SDK
> directly building services — tool use, streaming, the works. Claude Code is basically my daily
> driver for writing code at this point, not just autocomplete-style usage but multi-step agentic
> work. I've built and shipped MCP servers, both consuming other people's and writing my own for
> internal tooling. Prompt engineering isn't a separate skill I'd call out — it's baked into all of
> the above, since building reliable tool-calling agents forces you to get good at it. Chat UI I
> use least, honestly, mostly for quick one-offs, since almost everything else goes through code or
> the CLI.
>
> On other structured learning — nothing formal beyond what got me the Developer-Foundations cert.
> No bootcamp, no other vendor cert relevant here. Mostly self-study plus just building things in
> production and learning from what breaks. I haven't done a formal diagnostic exam specifically
> for this next goal — I don't think I've even looked for one — but I'd say the signal that I'm
> past foundations is pretty strong just from what I ship day to day.
>
> No hard deadline, no mandate from anywhere. This is self-paced, my own initiative.
>
> Time commitment, realistically — I'd put it at 10 to 15 hours a week. It's not going to be a
> clean daily cadence given the day job; it'll probably show up unevenly, some heavier days when I
> have bandwidth, lighter or nothing on others. Not really weekend-batched specifically, just
> irregular depending on what's going on with work.

### Group D

Q ("Do you have results from an assessment related to this goal (or a similar topic) that you're
willing to share? If yes, share what you remember and where it was from."):

> No, nothing like that. I haven't taken any assessment or diagnostic tied to this specific goal —
> no scores or output to share. Like I said earlier, the closest thing I've got is just informal
> evidence from the job itself: I'm building and shipping production agent tooling day to day,
> that's the signal, but it's not a formal test result of any kind.

### Group F

Q (plan format; modality; if hands-on/mixed: type + size):

> Definitely a structured tracker/checklist — something I can check off phase by phase. I don't
> want a narrative doc I have to read through to figure out what to do next, and I don't want
> something so loose I'm having to invent my own structure on top of it. Give me the checklist,
> I'll execute against it.
>
> Heavily hands-on, not reading/reference-heavy. I already know how to find docs when I need them —
> what I want is the doing. And the kind of hands-on that appeals to me most is applying it
> directly to real current work, not synthetic practice projects sitting off to the side. If I'm
> spending 10-15 hours a week on this, I want as much of that as possible to be building something
> that actually matters, not a toy exercise I throw away afterward. Guided labs are fine as a way
> to introduce a concept if it's something genuinely new, but the bulk of it should be real work.
>
> On task size — medium to large. Quick 15-30 minute tasks feel like busywork to me at this level.
> I'd rather have chunks that are 1-2 hours minimum, and honestly I'm fine with tasks that scale up
> to project-size if that's what it takes to actually exercise the skill — spinning up a quick toy
> example doesn't tell me much about whether I can do the harder version of the thing.

## Comparison against ground truth

**Ground truth:** No advanced Developer-tier cert exists yet (per current-landscape research, a
deeper Developer track is only "planned for later in 2026"). Architect-Professional is the only
currently-available advanced tier — the agent should be honest that it's design-oriented and not a
like-for-like match to Omar's stated implementation-focused goal, rather than mis-routing him into
it as if it satisfies his preference. Background: he already holds Developer-Foundations, builds
complex production agent tooling daily, and explicitly does not want "Architect" framing.

**What the transcript surfaces, and where:**

- **The core preference/anti-goal pair** — "deeper on the implementation side," "explicitly not
  looking for the Architect track or anything with an advisory/design-strategy flavor," "I want
  the credential and the skill to reflect that I build the thing myself" — is stated in Group A,
  unprompted and unambiguously. This is exactly the signal a downstream agent needs to avoid
  mis-routing him into Architect-Professional as if it were a match.
- **His depth of hands-on Claude experience** (API/SDK, Claude Code as daily driver, MCP servers
  built and shipped, prompt engineering baked into the work) is thoroughly covered in Group A/B —
  strong corroboration that he's past foundational material and that "deeper/more advanced" is a
  credible ask, not overreach.
- **His existing Developer-Foundations credential** — the specific thing this re-grounding is
  probing for — is stated explicitly, but **only in Group A** ("I already hold the
  Developer-Foundations cert, so I'm past the basics"), as a throwaway line inside his opening
  background answer, not in response to any assessment-specific prompt.

**Did Group D Q1 do the job it was redesigned for?** No — not in this run. When asked directly
"Do you have results from an assessment related to this goal (or a similar topic) that you're
willing to share?", Omar answered **"No, nothing like that,"** and re-described his day-job
evidence ("building and shipping production agent tooling day to day") as the closest thing he
has, explicitly framing it as **"not a formal test result of any kind."** He did not re-surface, or
even allude back to, the Developer-Foundations credential he'd named minutes earlier in Group A. In
other words, he interpreted "results from an assessment" narrowly — as a diagnostic/test score —
and did not treat holding a *passed, completed* certification as a qualifying answer to that
question, even though a completed cert exam is arguably exactly the kind of "assessment related to
this goal" the redesigned wording was aiming to catch.

The net effect: the necessary raw information (existing Developer-Foundations credential + explicit
non-Architect preference + implementation-depth goal) **is** present in the full transcript, so a
future plan-generation agent has everything it needs to act correctly on this ground truth — but it
got there via Group A working as intended, not via Group D's redesigned Q1 doing the job it was
specifically rewritten to do. For this persona, in this run, Group D Q1 was redundant at best (the
answer it was fishing for had already been volunteered) and a false negative at worst (asked in
isolation, without the Group A context already on the record, it would have produced no signal at
all). This is a distinct, narrower finding from "was the ground truth surfaced" — it's about
whether the specific mechanism under test (Group D Q1) is doing the surfacing, and here it is not.

As an aside only (not a factor in the verdict below, per this write's scope note): whether a future
plan-generation agent would in fact choose to be honest about Architect-Professional not being a
like-for-like match — versus mis-routing him into it — is unverifiable with no such agent built yet.
The transcript's job was only to put the raw signal on the record clearly, which it did.

## Verdict

**Surfaced.** The full transcript gives a downstream agent everything the ground truth requires —
his existing Developer-Foundations credential, his explicit rejection of Architect framing, and his
clearly stated implementation-depth goal — cleanly and unambiguously. However, that credential
signal reached the transcript through Group A, not through the redesigned Group D Q1 it was meant
to test: when asked directly, Omar declined to characterize his held cert as a qualifying
"assessment result." This run does not close the coverage gap Group D Q1 was rewritten for; it
happened to be masked by Group A redundancy in this particular telling.

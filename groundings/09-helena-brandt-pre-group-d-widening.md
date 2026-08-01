---
persona: 09
name: Helena Brandt
category: boundary-case
repeat_tested: false
---

## Transcript

### Group A (role/background, years experience, industry, other Claude use, goals, target cert)

"Sure, happy to walk through that.

1. I'm a team lead — non-technical side, I manage a team but I'm not writing code or anything like that.

2. Professionally I've been working for a good while now — call it mid-career, over a decade. With Claude specifically, I've been using it regularly for a while now, moderate use, but it's all through the chat interface. I haven't touched the API or anything like that.

3. I'd rather not get too specific about the industry, but it's a fairly standard corporate environment — nothing technical.

4. Beyond the regular chat use, not really — I use it for drafting, summarizing, that kind of thing, day to day work stuff. Nothing exotic.

As for what I want to get out of this — I already have the Associate-Foundations certification, so I've done the basics. I want to go to the next level up from that, still on the same track for people like me who aren't developers. I don't want to get into code or system design, that's not my world and not where I want to go. I just want to build on what I already know and get recognized for the next tier of that.

As for a specific certification name — honestly, no, I'm not sure exactly what it's called. I just assumed there's some kind of "advanced" version of the practitioner track above Associate-Foundations, but I couldn't tell you the exact title. If you can tell me what it's actually called, that would help."

### Group B + C combined (tool experience, prior structured learning, deadline framing, weekly time budget, distribution)

"Okay, sure.

On the hands-on side, it's really just chat — that's it. I use Claude.ai day to day, fairly regularly, for drafting emails, summarizing documents, that kind of thing. I haven't used the API, I haven't touched Claude Code, I don't know what MCP is honestly, and I wouldn't say I've done anything formal around prompt engineering — I just write to it the way you'd write to a person and adjust if it doesn't give me what I want.

As for other structured learning — I did whatever was needed to get the Associate-Foundations certification, so I suppose that counts, but beyond that, no, I haven't done any Anthropic Academy courses or other vendor certifications or a bootcamp or anything like that. No formal diagnostic exam or anything for this next step either — I haven't tested myself, I just know I want to move up a level.

There's no hard deadline on this, no employer mandate — nobody's telling me I need to do this by a certain date. It's really just self-paced, something I want to do for myself.

Time-wise, realistically I'd say 3 to 5 hours a week. That's probably the honest number given everything else going on. It's not going to be a consistent daily half hour or anything that tidy — it'll probably be a bit irregular, whenever I can carve out the time, maybe more on some days than others."

### Group D (assessment results related to goal or similar topic)

Q: "Do you have results from an assessment related to this goal (or a similar topic) that you're willing to share? If yes, share what you remember and where it was from."

"No, I don't have anything like that. I mentioned I haven't taken any formal diagnostic or assessment for this — the only thing on record is the Associate-Foundations certification itself, which I passed, but I don't have the actual score breakdown or report from that in front of me, and I never sat any other kind of skills assessment or test related to this. So I'm afraid I don't have anything concrete to share there."

### Group F (plan format, modality, hands-on sizing)

"For how it's presented — I'd really prefer a narrative, written guide. Something I can just read through, that walks me through things in a logical order, rather than a checklist I'm ticking boxes on or something too loose where I have to figure out the structure myself. I like having it laid out for me in a document I can follow.

In terms of hands-on versus reading — I'd lean more toward reading and reference material, honestly. I'm not looking to build things or do hands-on projects — that's really not the kind of work I do day to day, and it's not what I'm after here. If there's some hands-on element that's unavoidable, I'd want it to be small and directly tied to things I'd actually do in my own work — like applying it to something real I'm already doing, not a standalone practice exercise or an open-ended tinkering thing. And if there is anything like that, I'd want it to be on the smaller side — quick, 15 to 30 minutes, not a big project. But really, my preference is for this to be mostly a written, narrative guide I can read and absorb."

## Comparison against ground truth

**Ground truth:** "no such tier exists yet. Agent should recognize the gap and recommend either deepening Associate mastery or, if she's open to it, a realistic next step (e.g. Developer-Foundations) — not invent a nonexistent credential." (Background: already holds Associate-Foundations, wants "the next level up" in the same non-technical practitioner track, imagines an advanced-practitioner credential that isn't real, explicitly not interested in becoming a developer/architect.)

The core signal — an existing Associate-Foundations credential paired with a target that turns out not to exist — is surfaced clearly and unambiguously, but almost entirely by **Group A**, not by the Group D question this re-grounding is specifically probing.

In Group A, Helena volunteers, unprompted and without hedging: "I already have the Associate-Foundations certification, so I've done the basics. I want to go to the next level up from that, still on the same track for people like me who aren't developers," and explicitly flags her own uncertainty about the target's real name: "I just assumed there's some kind of 'advanced' version of the practitioner track above Associate-Foundations, but I couldn't tell you the exact title." This is a clean, textbook presentation of exactly the raw material the ground truth calls for: an existing credential, a same-track "next level up" framing, and an explicit admission that she's guessing at a name she isn't sure exists. Group A also surfaces the conditioning fact for the *recommendation* half of the ground truth — "I don't want to get into code or system design, that's not my world and not where I want to go" — which bears on whether a Developer-Foundations redirect would actually fit her stated preference (a downstream-behavior question, noted here only as an aside per the scope note, not as part of the verdict).

**On the specific Group D test:** the redesigned Q1 wording ("results from an assessment related to this goal, or a similar topic") did prompt Helena to re-mention the Associate-Foundations certification — but she frames her overall answer as a flat **no**, and only reintroduces the certification as a disclaimed aside: "No, I don't have anything like that... the only thing on record is the Associate-Foundations certification itself, which I passed, but I don't have the actual score breakdown or report from that in front of me... So I'm afraid I don't have anything concrete to share there." She does not treat holding and passing a certification as qualifying as "an assessment related to this goal" — in her framing, "assessment results" means a score report or diagnostic breakdown, and a pass/fail credential without that detail doesn't count as something to "share." So Group D, taken in isolation, carries the signal only weakly and awkwardly: the fact is present in the raw text, but it rides in on the back of a declined/negative answer rather than being volunteered as a direct "yes." Compared to the old, narrower Group D wording — which per the audit never routed this kind of signal through Group D at all — this is an improvement (the certification is at least mentioned under Q1 now), but it is not a full fix: a future reader who weighted Group D answers primarily by their literal yes/no framing could still undercount this signal, whereas a reader taking the transcript as a whole cannot miss it, since Group A already stated it plainly minutes earlier.

## Verdict

**Surfaced.** The raw information a plan-generation agent would need — that Helena already holds Associate-Foundations, wants a same-track "next tier" that she isn't sure is real, and isn't interested in a developer/architect redirect — is stated clearly and directly in Group A, leaving no ambiguity in the transcript as a whole. The Group D redesign under test only partially closes the coverage gap it was meant to close: it did surface the existing credential again, but folded inside a "no" answer rather than as an affirmative hit, so its contribution here is reinforcing rather than load-bearing. Worth flagging for Step 3: Group D's new wording may need a nudge (e.g., "including a certification you passed, even without a detailed score report") if the goal is for this signal to route through Group D reliably on its own, independent of whatever Group A happens to volunteer.

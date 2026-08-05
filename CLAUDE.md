# CLAUDE.md

This repo hosts two parallel bodies of work: the actual ccarf-app generalization effort (design,
and eventually implementation), and a running meta-analysis of the collaboration process itself,
captured for an eventual public case study. Any session working here should be aware of both —
this file is the standing orientation for the second one, since it applies across sessions.

## Decision docs (product/design rationale) — for orientation, not to be duplicated below

- `DECISIONS.md` — why the original single-user app was built the way it was.
- `INTERVIEW-DECISIONS.md` — the onboarding interview design (Groups A–F).
- `INTERVIEW-SCRIPT.md` — literal question copy implied by `INTERVIEW-DECISIONS.md`.
- `ARCHITECTURE-DECISIONS.md` — how interview/agent/tracker connect; locked v1 scope (single-user,
  self-hosted).
- `PROCESS-DECISIONS.md` — meta-analysis of *how* the interview decisions were made (the why/how
  process tests) — about interview-design methodology specifically, not the collaboration itself.
- `TEST-PERSONAS.md` / `PERSONA-DECISIONS.md` — 23 synthetic grounding personas and the rationale
  behind them.
- `GROUNDING-DECISIONS.md` — mechanics of running the persona grounding exercise (persona/
  interviewer subagent split, adaptive repeat-testing loop, grounding file layout, Step 3 synthesis
  criteria).
- `groundings/NN-persona-name.md` — the actual grounding records produced by executing that plan.
- `GROUNDING-FINDINGS.md` (once produced) — Step 3 cross-persona synthesis.

If something you're about to write is really about *why a product/design decision was made*, it
belongs in one of these, not in the case-study file below.

## Case-study capture (`CASE-STUDY-NOTES.md`) — standing instruction for every session

The user intends to eventually open-source this project and use the design process itself as a
public case study on agentic-system design — "how I went about this," to spark discussion.
`CASE-STUDY-NOTES.md` at the repo root is the running, evidence-first capture toward that: raw
material for later synthesis, not a polished writeup yet. Multiple sessions may be working in this
repo concurrently (this has already happened in practice); this file exists so all of them operate
on the same instructions rather than each reinventing or forgetting the practice.

**Every session working in this repo should keep contributing to `CASE-STUDY-NOTES.md`, not just
whichever session created or last touched it:**

1. **Capture in real time.** When something case-study-worthy happens in your own session, append
   an entry yourself, in the flow of work — don't wait to be asked. Note what actually happened
   with enough specificity to re-verify later (roughly what was said/done, and by whom).

2. **What counts as case-study-worthy** (meta-level material about the collaboration and
   methodology — not mechanical product decisions, which belong in the docs above):
   - Concrete turning-point anecdotes with real narrative value — a wrong assumption caught in
     production use, a fix reached empirically rather than by guessing, a design that only made
     sense once a failure revealed the actual constraint.
   - Moments where a proposed approach got refined or simplified through back-and-forth.
   - Moments where a question — from either the user or the assistant — surfaced a genuine blind
     spot in existing work.
   - Collaboration norms stated explicitly, and concrete instances of them actually being
     exercised (not just claimed once and never revisited).
   - Doc-scoping / process discipline moments — e.g. recognizing something belongs in a different
     or new file, or that a mechanism needs correcting once acted on.
   - Friction points or lessons about the agentic tooling itself — tool capabilities that turned
     out not to exist as assumed, subagent-reachability limits, persistent-memory maintenance
     overhead, context-compaction side effects, anything a future reader building similarly would
     want to know about up front.
   - Anything else that would genuinely help someone understand what it's actually like to design
     a system this way in collaboration with an AI agent.

3. **Accuracy over polish.** This is a raw log for later synthesis — organize entries evidence-first
   (what happened, why it's notable, rough source location/timestamp), and don't invent, embellish,
   or editorialize beyond what actually happened. If you're not certain something happened as
   you're about to describe it, verify before writing it down rather than let a plausible-sounding
   but wrong account propagate — see `CASE-STUDY-NOTES.md` entry 4 for a worked example of exactly
   this kind of error, caught and corrected in place rather than left standing.

4. **No persistent capture agent.** Don't spin up or rely on a single long-lived subagent
   "responsible for" this ongoing job. Ad-hoc agent spawns in this environment have no durable
   name registry, and their reachability doesn't survive a context compaction or session boundary
   (see `GROUNDING-DECISIONS.md`'s persona/interviewer split for the concrete discovery behind this
   rule). Instead: append directly yourself as things happen in your own session, and periodically
   point a fresh, disposable agent at your session's own raw transcript file (under
   `~/.claude/projects/<project-slug>/<session-id>.jsonl`) for a deeper retrospective sweep when
   useful — the durable thing is the file, not any particular agent's memory.

5. **Ask before committing**, same as every other doc in this repo — draft or append, let the user
   see it, then commit only once they've confirmed. This repo has a standing preference to push to
   the default upstream immediately after any confirmed commit.

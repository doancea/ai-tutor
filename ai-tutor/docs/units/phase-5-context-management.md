# Phase 5 — Context Management & Reliability

_Part of the [CCAR-F study plan](../claude-learning-resources.md). Exam weight: **15%** — lightest domain, but easy to under-practice. Retitled after diagnostic #1 — the exam's D5 covers reliability/review design, not just token mechanics._

**Estimated hours:** 8–10 (bumped from 6–8 after diagnostic #1)

## Tasks

- [ ] Read "The new rules of context engineering" (Claude blog)
- [ ] Read Platform docs on context windows and prompt caching
- [ ] Practice `/clear` and `/compact` deliberately across a couple of real Claude Code sessions
- [ ] **New:** On a long session that relies on summarization, deliberately test what gets lost — e.g. rename a variable/class partway through a long task, let it get compacted, then check whether later work still uses the old name. Fix by keeping critical facts (renames, decisions) in a persistent scratchpad rather than trusting the summary to retain them
- [ ] **New:** Design a human-review process for a batch of AI-generated output with mixed risk levels (e.g. some high-stakes, some low-stakes) — use stratified sampling weighted by risk rather than flat/random sampling or the model's own self-reported confidence

## Why this is worth deliberate effort now

Diagnostic #1 scored 3/5 (60%) here. Both misses were about **reliability design at scale**, not context-window mechanics per se: losing critical facts (like a rename) when long sessions get summarized/compacted, and calibrating human review effort to risk rather than sampling everything equally or trusting a model's self-reported confidence (which tends to be poorly calibrated). The new tasks above target both directly.

## Resources

| Resource | Why it's here |
|---|---|
| "The new rules of context engineering for Claude 5 generation models" ([Claude blog](https://claude.com/blog)) | Current, official framing of context management for the latest model generation |
| [Claude Platform docs](https://platform.claude.com/docs/en/home) | Reference on context windows, prompt caching mechanics, and token economics |

## Why this is worth deliberate effort

Same reason as Tool Design & MCP: it's the domain most likely to get skipped because it doesn't force itself into your attention day-to-day the way Claude Code config does. It's also conceptually compact — this is a good "last mile" domain to shore up right before mock exams.

## Validate before moving on

Use the **Phase 5 self-check** in the interactive tracker artifact (`ccarf-study-tracker`). Covers: context window definition, prompt caching's purpose, context rot/degradation, and subagent isolation as a context-management tool (not just an architecture one).

---
[← Phase 4 — Tool Design & MCP](./phase-4-tool-design-mcp.md) · [Back to full guide](../claude-learning-resources.md) · [Next: Phase 6 — Integration & Practice →](./phase-6-integration-practice.md)

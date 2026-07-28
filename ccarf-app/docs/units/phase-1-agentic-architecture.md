# Phase 1 — Agentic Architecture

_Part of the [CCAR-F study plan](../claude-learning-resources.md). Exam weight: **27%** — the single heaviest domain._

**Estimated hours:** 15–18 (unchanged after diagnostic #1 — see note below)

**Diagnostic note (mock exam #1, 7/28):** scored 6/6 on this domain. Treat that as a weak signal, not a reason to cut time here — multiple-choice pattern recognition across a small, well-known taxonomy (orchestrator-workers, evaluator-optimizer, hub-and-spoke isolation) is a different skill from applying these patterns in a novel, free-response situation. Full task list stays as planned.

## Tasks

- [ ] Read "Building Effective Agents" (Anthropic Engineering blog) closely
- [ ] Complete Academy's "Claude Code in Action" + "Subagents" courses
- [ ] Read Cookbook notebooks: orchestrator-workers, evaluator-optimizer patterns
- [ ] Build a small multi-step agent project end-to-end

## Resources

| Resource | Why it's here |
|---|---|
| ["Building Effective Agents"](https://www.anthropic.com/engineering/building-effective-agents) (Anthropic Engineering Blog) | The core mental model for workflows vs. agents, and the named patterns (routing, orchestrator-workers, evaluator-optimizer, parallelization) |
| [Anthropic Academy](https://anthropic.skilljar.com/) — Claude Code in Action, Subagents | Guided, official walkthroughs of applying these patterns in Claude Code specifically |
| [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) (GitHub) | Runnable notebooks for agent patterns — read even if you don't execute every cell |
| [Simon Willison — Agentic Engineering Patterns](https://simonw.substack.com/p/agentic-engineering-patterns) | Independent, hype-free take on the same territory; good for pressure-testing what "good" looks like in practice |

## Watch out for (this domain, specifically)

Scenario questions in this domain tend to test judgment about **when not to add complexity** — a simple workflow beating an over-engineered multi-agent system is a recurring "correct" answer pattern.

## Validate before moving on

Use the **Phase 1 self-check** in the interactive tracker artifact (`ccarf-study-tracker`). Covers: workflow vs. agent distinction, orchestrator-workers, evaluator-optimizer, and when simplicity should win.

---
[← Phase 0 — Foundations](./phase-0-foundations.md) · [Back to full guide](../claude-learning-resources.md) · [Next: Phase 2 — Claude Code Configuration →](./phase-2-claude-code-configuration.md)

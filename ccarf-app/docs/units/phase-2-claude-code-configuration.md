# Phase 2 — Claude Code Configuration & Workflows

_Part of the [CCAR-F study plan](../claude-learning-resources.md). Exam weight: **20%**. Retitled after diagnostic #1 — the exam's D3 covers execution-mode judgment, not just config mechanics._

**Estimated hours:** 11–13 (bumped from 10–12 after diagnostic #1)

## Tasks

- [ ] Set up a CLAUDE.md for a real project
- [ ] Configure at least one hook
- [ ] Build and use a subagent on a real task
- [ ] Create a custom skill
- [ ] Read the "Claude Code at scale" series
- [ ] **New:** Practice choosing between plan mode, direct execution, and test-driven iteration across 3–4 varied real tasks (a quick bug fix, a multi-file refactor, an ambiguous architectural change) — the goal is a repeatable decision framework, not memorizing which mode "wins"
- [ ] **New:** On one task with known edge cases, deliberately use test-driven iteration — write the failing tests first, then iterate against them — to feel the difference from ad hoc review-and-fix

## Resources

| Resource | Why it's here |
|---|---|
| [Claude Code docs](https://code.claude.com/docs/en/quickstart) | Canonical reference for CLAUDE.md, hooks, subagents, skills, slash commands |
| ["How Claude Code works in large codebases"](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start) (Claude blog, "at scale" series) | Enterprise-pattern configuration — how CLAUDE.md and skills should be layered across a real codebase |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) (GitHub) | Source of truth on install, plugins, and current CLI behavior |

## Why this is worth deliberate effort now

Diagnostic #1 (7/28) missed 2 of 6 questions in this domain, both on **mode-selection judgment** — matching plan mode / direct execution / test-driven iteration to task shape — rather than on the mechanics of CLAUDE.md, hooks, or subagents themselves. This is the harder-to-fake half of the domain: it's a judgment call, not a feature to memorize.

## This is the one domain that overlaps most with daily use

Unlike the other four domains, this one you'll likely absorb partly "for free" through normal Claude Code use — worth doing the hands-on tasks deliberately rather than passively, though, since the exam tests configuration decisions, not just familiarity.

## Validate before moving on

Use the **Phase 2 self-check** in the interactive tracker artifact (`ccarf-study-tracker`). Covers: CLAUDE.md loading behavior, what hooks are for, subagent context isolation, and what a skill is structurally.

---
[← Phase 1 — Agentic Architecture](./phase-1-agentic-architecture.md) · [Back to full guide](../claude-learning-resources.md) · [Next: Phase 3 — Prompt Engineering →](./phase-3-prompt-engineering.md)

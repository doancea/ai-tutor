# Phase 3 — Prompt Engineering

_Part of the [CCAR-F study plan](../claude-learning-resources.md). Exam weight: **20%**. Weakest domain on diagnostic #1 — see note below._

**Estimated hours:** 10–12 (bumped from 8–10 after diagnostic #1)

## Tasks

- [ ] Work through Anthropic's prompt engineering docs/tutorial
- [ ] Read Simon Willison's posts on prompting and context
- [ ] Rewrite 3–5 of your own prompts using XML tags, few-shot, and CoT — compare outputs
- [ ] **New:** Design a retry/validation loop for a real task and explicitly draw the line between *fixable* failures (retry with error feedback) and *unfixable* capability gaps (route to human review instead of retrying)
- [ ] **New:** Build a few-shot example set (2–4 examples, with reasoning shown) for a nuanced classification task, and compare it against a naive "big list of rules/terms" approach on the same task
- [ ] **New:** Take a prompt with a subjective or graded criterion (e.g. "severity," "quality," "risk") and replace prose-only definitions with a concrete worked example per level — a calibration anchor

## Why this is worth deliberate effort now

Diagnostic #1 scored 3/6 (50%) here — the lowest of any domain. The pattern across the misses wasn't unfamiliarity with prompting techniques in general; it was **judgment about which technique fits which failure mode**: when to retry vs. escalate, when a handful of worked examples beats an exhaustive list, and when abstract instructions need a concrete anchor instead. That's the gap the new tasks above target directly.

## Resources

| Resource | Why it's here |
|---|---|
| [Anthropic's Prompt Engineering docs/tutorial](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) | Structured, example-driven — XML tags, chain-of-thought, few-shot, negative vs. positive constraints |
| [Simon Willison](https://simonwillison.net/) | Independent, applied perspective on what actually moves output quality vs. what's folklore |

## Why this matters more than it might seem

Prompting an agentic tool well is a distinct skill from prompting a chatbot — the stakes of ambiguity are higher when the output triggers tool calls and file edits, not just text. Scenario questions here likely test *diagnosing* a bad prompt (inconsistent formatting, ignored constraints) as much as writing a good one from scratch.

## Validate before moving on

Use the **Phase 3 self-check** in the interactive tracker artifact (`ccarf-study-tracker`). Covers: XML structuring, role prompting, chain-of-thought, few-shot examples, and positive vs. negative instruction framing.

---
[← Phase 2 — Claude Code Configuration](./phase-2-claude-code-configuration.md) · [Back to full guide](../claude-learning-resources.md) · [Next: Phase 4 — Tool Design & MCP →](./phase-4-tool-design-mcp.md)

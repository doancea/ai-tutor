# Phase 4 — Tool Design & MCP

_Part of the [CCAR-F study plan](../claude-learning-resources.md). Exam weight: **18%**._

**Estimated hours:** 10–14

## Tasks

- [ ] Read the MCP docs / spec overview
- [ ] Complete the DeepLearning.AI MCP course
- [ ] Build a small MCP server from scratch
- [ ] Connect it to Claude Code and use it live

## Resources

| Resource | Why it's here |
|---|---|
| MCP docs (linked from [Claude Code docs](https://code.claude.com/docs/en/quickstart)) | Protocol reference — host/client/server architecture, tools/resources/prompts primitives |
| [DeepLearning.AI × Anthropic — "MCP: Build Rich-Context AI Apps"](https://www.deeplearning.ai/) | Short, hands-on course specifically on building MCP servers |
| [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) (GitHub) | Runnable tool-use and MCP examples |

## Diagnostic note (mock exam #1, 7/28)

Scored 4/5 (80%) — one miss, on **tool adoption**: agents defaulting to a general-purpose tool (e.g. Bash) over a well-built MCP tool because the MCP tool's description didn't make its advantages (structured output, pagination, types) obvious. This is a narrow gap and already covered by the schema-design task below — worth keeping in mind specifically as "the description is a selection mechanism, not just documentation" while building your MCP server.

## Why this is worth deliberate effort

This is the domain **least likely to overlap with your daily work incidentally** — unlike Claude Code config or agentic architecture, you won't stumble into MCP server design just by using Claude day-to-day. Budget real hands-on time: actually building a small server (even a toy one) will do more for retention than reading the spec.

## Validate before moving on

Use the **Phase 4 self-check** in the interactive tracker artifact (`ccarf-study-tracker`). Covers: what MCP standardizes, host/client/server relationships, tool schema design, structured error handling, and security considerations for destructive actions.

---
[← Phase 3 — Prompt Engineering](./phase-3-prompt-engineering.md) · [Back to full guide](../claude-learning-resources.md) · [Next: Phase 5 — Context Management →](./phase-5-context-management.md)

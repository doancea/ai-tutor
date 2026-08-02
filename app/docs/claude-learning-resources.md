# Claude & Claude Code Learning Resources

_A living reference, started July 2026. Add to this as you find things worth keeping._

## Current goal: Claude Certified Architect — Foundations (CCAR-F)

Set July 27, 2026 — reprioritized from Developer to Architect, since the consulting work leans toward big-picture solution design over hands-on-keyboard building. Developer-domain material (API mechanics, SDK details) stays in scope as supporting knowledge, not the primary target.

**Trackable plan:** see the companion interactive tracker artifact (`ccarf-study-tracker`) for the phase-by-phase checklist, self-check quizzes, and progress tracking — this doc stays as the reference; the tracker is where progress actually gets logged.

**Estimated timeline:** 65–90 total hours. At 2 sessions/week, 2–3 hrs each, that's roughly **14–18 weeks (~3.5–4.5 months)**.

**Exam facts:** 60 questions, 120 min, Pearson VUE proctored, $125, scored to 1000 with a 720 cut, valid 12 months. Scenario-based rather than recall-based — each question asks you to pick the right tradeoff inside a realistic production scenario, drawn from a pool of ~6 scenario types (customer support agents, multi-agent research pipelines, CI/CD integration, etc.). Target candidate profile per Anthropic: solution architect with 6+ months hands-on across the Claude API, Agent SDK, Claude Code, and MCP. No mandatory prerequisite courses, but this one rewards real building experience more than passive reading — worth budgeting hands-on project time, not just docs time.

**Domain weights and adjusted hour targets** (weights consistent across multiple prep sources, though unofficial; hours below reflect the diagnostic results — see below):

| Domain | Weight | Hours | Unit doc |
|---|---|---|---|
| — | — | 8–10 | [Phase 0 — Foundations](./units/phase-0-foundations.md) |
| Agentic Architecture | 27% | 15–18 | [Phase 1](./units/phase-1-agentic-architecture.md) |
| Claude Code Configuration & Workflows | 20% | 11–13 | [Phase 2](./units/phase-2-claude-code-configuration.md) |
| Prompt Engineering | 20% | 10–12 | [Phase 3](./units/phase-3-prompt-engineering.md) |
| Tool Design & MCP | 18% | 10–14 | [Phase 4](./units/phase-4-tool-design-mcp.md) |
| Context Management & Reliability | 15% | 8–10 | [Phase 5](./units/phase-5-context-management.md) |
| — | — | 6–10 | [Phase 6 — Integration & Practice](./units/phase-6-integration-practice.md) |

Revised total: **~68–87 hours** (was 65–90) — essentially the same envelope, just reallocated toward the domains the diagnostic flagged as weak. Timeline estimate is unchanged at ~14–18 weeks.

**Working a section?** Open its unit doc above — each is self-contained (tasks, only the resources relevant to that domain, and a pointer to its self-check in the tracker) so you're not wading through the other five while focused. This doc stays the full view: domain weights, all resource tiers, and the overall plan in one place.

### Diagnostic results — mock exam #1 (claudecertificationguide.com, 28Q short form)

Taken July 28, 2026. **737/1000, passed** (720 cut), 20/28 correct (71%) overall.

| Domain | Score | Read as |
|---|---|---|
| Agentic Architecture | 6/6 (100%) | Treat with caution, not celebration — see note below |
| Tool Design & MCP | 4/5 (80%) | Solid, one gap on tool *adoption* (agents ignoring a well-built tool with a weak description) |
| Claude Code Config & Workflows | 4/6 (67%) | Gaps in **mode/workflow selection judgment** — when to use plan mode vs. direct execution vs. test-driven iteration |
| Prompt Engineering | 3/6 (50%) | Weakest domain. Gaps in retry/escalation boundaries, few-shot example *design* (not just usage), and calibration via concrete examples |
| Context Management & Reliability | 3/5 (60%) | Gaps in progressive-summarization pitfalls (losing critical facts like renames) and risk-calibrated human review |

**On the perfect Agentic Architecture score:** per your read, and I agree — this domain rewards pattern-recognition across a small, well-known taxonomy (orchestrator-workers, evaluator-optimizer, hub-and-spoke isolation, etc.), and multiple-choice format lets you eliminate distractors even with partial recall. A free-response version of the same questions would likely be harder. Hours for Phase 1 stay as originally planned — nothing removed on the strength of this result, per your instruction to weight what you got wrong more heavily than what you got right.

**What actually changed in the plan**, based on the 8 missed questions:
- **Prompt Engineering (+2h)**: the misses weren't about knowing prompting *exists* — they were about *design judgment*: recognizing when to route a failure to human review vs. retry it, building few-shot sets that teach reasoning (2–4 examples with worked logic) rather than exhaustive term lists, and using concrete calibration examples instead of prose-only severity/quality criteria. Added as explicit tasks in the Phase 3 unit doc.
- **Claude Code Config & Workflows (+1h, retitled to match the exam's actual scope)**: the exam's D3 is broader than raw CLAUDE.md/hooks/subagent mechanics — it includes *choosing* the right execution mode (plan mode vs. direct execution vs. test-driven iteration) per task. That's a judgment skill, not a features list, and needs deliberate practice across varied task types. Added to Phase 2.
- **Context Management & Reliability (+2h, retitled)**: broader than token/caching mechanics — includes progressive-summarization failure modes (losing facts like renames when context gets compacted) and risk-calibrated human review design (stratified sampling, not flat sampling or self-reported confidence). Added to Phase 5.
- **Tool Design & MCP**: no hour change, but added a specific note on *tool description quality as an adoption lever* (agents defaulting to a general-purpose tool like Bash over a well-built but poorly-described MCP tool) — narrow gap, already mostly covered by the existing plan.



**Study priority (updated post-diagnostic):** Prompt Engineering and Context Management & Reliability are now the top focus areas — not because they're the heaviest-weighted domains (they're not), but because the diagnostic showed the clearest judgment gaps there. Agentic Architecture stays fully scheduled despite the perfect diagnostic score, both because it's the heaviest domain (27%) and because a clean multiple-choice run isn't strong evidence of mastery on its own. Claude Code Configuration & Workflows gets a modest bump for the same reason as Prompt Engineering: the gap wasn't factual knowledge, it was applied judgment (which execution mode fits which task).

**Folded-in Developer-track topics** (not separately targeted, but worth covering since they underpin good architecture decisions):

- Messages API mechanics, streaming, error handling — the "how it actually works under the hood" that makes architectural tradeoffs concrete rather than abstract
- Model selection/optimization — token economics, prompt caching, batch API — informs cost/latency tradeoffs an architect needs to reason about
- Eval/testing/debugging patterns — Cookbook eval notebooks — useful even briefly, since "how do you know it's working" is implicit in most Architect scenario questions

**Note on outside learning:** as before, the exam blueprint is a floor. Keep pulling from Simon Willison, the YouTube channels, and community sources below even where they exceed what's tested. Third-party prep courses/practice exams (Tutorials Dojo, claudecertifiedarchitects.com, OpenExamPrep) exist and are useful for self-testing pace and format, but are unofficial and unaffiliated with Anthropic.


## How this is organized

Resources are sorted into tiers by **reliability**, not difficulty — a senior engineer doesn't need "beginner" framing, but does need to know which sources are authoritative vs. content-farm noise (this space has a lot of SEO-driven "Top 10 Claude Code Tools" filler).

- **Tier 1 — Primary/Official**: Ground truth. If anything else contradicts these, these win.
- **Tier 2 — Structured courses**: Sequenced curricula, good for filling systematic gaps fast.
- **Tier 3 — High-signal practitioners**: Individuals/blogs with a track record of accurate, opinionated, non-hype writing.
- **Tier 4 — YouTube**: Best for watching real workflows in motion; treat as supplementary to Tier 1, not a source of truth on features.
- **Tier 5 — Community & live reference**: Good for pattern-spotting and troubleshooting, variable quality — verify against Tier 1.

Each entry: **what it's good for**, so you can route your actual question to the right resource type instead of reading linearly.

---

## Tier 1 — Primary / Official

| Resource | Best for |
|---|---|
| [Claude Code docs](https://code.claude.com/docs/en/quickstart) | Canonical reference — CLI, hooks, subagents, SDK, slash commands, MCP setup |
| [Claude Platform docs](https://platform.claude.com/docs/en/home) | API reference, models, tool use, prompt caching, batch API |
| [Anthropic Engineering Blog](https://www.anthropic.com/engineering) | Deep, non-marketing technical posts — start with ["Claude Code: Best Practices for Agentic Coding"](https://www.anthropic.com/engineering/claude-code-best-practices) and ["Building Effective Agents"](https://www.anthropic.com/engineering/building-effective-agents) |
| [Claude Blog](https://claude.com/blog) | Product-level best-practices series, e.g. "Claude Code at scale" |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) (GitHub) | Source of truth on install, plugins, issue tracking, Discord link |
| [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) (GitHub) | Official runnable recipes: tool use, RAG, Skills, MCP, multimodal, evals |
| [docs.claude.com/llms.txt](https://docs.claude.com/llms.txt) | Machine-readable index of all doc pages — useful for feeding into your own tooling |

## Tier 2 — Structured courses (sequenced learning paths)

| Course | Notes |
|---|---|
| [Anthropic Academy](https://anthropic.skilljar.com/) | Free, official, certificate-bearing. Given your background, prioritize the **developer track**: Claude Code 101 → Claude Code in Action → Subagents → Skills 2.0 → MCP. Skip the general-audience "Claude 101" material. |
| [DeepLearning.AI × Anthropic courses](https://www.deeplearning.ai/) | Short, hands-on, code-sandbox format. Look for "MCP: Build Rich-Context AI Apps" and prompt engineering / tool-use courses — good for a focused afternoon each. |
| [Anthropic's Prompt Engineering docs/tutorial](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) | Not a "course" exactly, but structured and example-driven — XML tags, chain-of-thought, few-shot, negative constraints. Directly useful since prompting an agentic tool well is a distinct skill from prompting a chatbot. |

## Tier 3 — High-signal practitioners & blogs

| Source | Why it's worth following |
|---|---|
| [Simon Willison](https://simonwillison.net/) | Independent researcher, coined "prompt injection," writes frequent, technically rigorous, hype-free posts specifically on agentic coding patterns, model evals, and Claude Code internals. Closest thing to a peer-reviewed voice in this space. See his running project: [Agentic Engineering Patterns](https://simonw.substack.com/p/agentic-engineering-patterns). |
| Anthropic Engineering Blog (again, worth a separate mention) | Posts like "The 'think' tool," "Building effective agents," and the "Claude Code at scale" series read like internal design docs, not marketing. |
| Boris Cherny (Claude Code's lead engineer) — talks/X | Design-philosophy rationale for why Claude Code is deliberately low-level/unopinionated. Useful for understanding *why* the tool behaves the way it does, not just how. |

## Tier 4 — YouTube

Quality here is uneven and skews toward "build an agency, sell a course" content — filter accordingly. Better signals: does the video match the current docs, does the creator show real terminal sessions and mistakes, or just a polished happy path?

- **IndyDevDan** — opinionated, principle-first walkthroughs on agentic engineering patterns (not just feature tours).
- **Nick Saraev** — most technically deep long-form content (4hr Claude Code course covers Git worktrees, multi-agent teams, MCP); leans toward "build to sell" framing, evaluate the technical parts and ignore the business-opportunity framing if that's not your interest.
- Anthropic's own YouTube channel — official demos and conference talks, lower volume but authoritative.

Given your experience level, I'd treat YouTube as a **third-tier resource for this space**: better for watching a real agentic session unfold (context management, when Claude gets confused, how someone recovers) than for learning facts about the tool, which you'll get faster and more reliably from Tier 1.

## Tier 5 — Community & live reference

| Resource | Use case |
|---|---|
| [r/ClaudeAI](https://reddit.com/r/ClaudeAI) / r/ClaudeCode | Real-world field reports, workaround discovery, "is this a known issue" checks |
| [Claude Developers Discord](https://github.com/anthropics/claude-code) (linked from repo) | Direct access to other builders + occasional Anthropic staff |
| [awesome-claude](https://github.com/webfuse-com/awesome-claude) (GitHub, community-curated) | Link-dump of SDKs, quickstarts, deployment platforms — useful as a directory, not a tutorial |
| `shanraisshan/claude-code-best-practice` (GitHub, community-curated) | Aggregates tips from Boris Cherny + community into pattern form — cross-reference against Tier 1 since community docs drift out of date fast |

---

## Suggested next steps given where you are (week 1, working toward CCAR-F)

1. Read the [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) engineering post in full — directly relevant now, since Claude Code Configuration is a real exam domain (20%), not a footnote.
2. Work through **Claude Code 101 → Claude Code in Action → Subagents** on Anthropic Academy — this maps almost directly onto the Claude Code Configuration domain.
3. Read "Building Effective Agents" and the "Claude Code at scale" series for the Agentic Architecture domain — this is the heaviest domain (27%), so it's worth engaging with the reasoning, not just the recipe steps.
4. Add Simon Willison's blog to whatever you use for RSS/reading — useful for both Prompt Engineering and Context Management domains, and everything outside the exam.
5. Once the architecture-level concepts feel solid, spend deliberate time on Tool Design & MCP — build a small MCP server from the docs/Cookbook, since this domain doesn't overlap with anything you're likely to hit incidentally.
6. Fold in Developer-track basics (Messages API, streaming, token/caching economics) as background reading rather than a separate study track — enough to reason about tradeoffs, not to pass a separate exam.

## Open questions / things to evaluate as you go

- Which YouTube creators actually hold up over a few videos (add/remove from Tier 4 as you find out)
- Whether the DeepLearning.AI short courses are worth the time vs. just reading docs + cookbook, given your existing engineering background
- Any internal/company-specific Claude Code setup notes worth keeping separate from this general list
- Target exam date for CCAR-F, once domain comfort has been self-assessed — this exam rewards real building experience, so factor in time for a couple of hands-on projects (e.g., a small MCP server, an agent workflow) rather than just reading time
- Whether CCDV-F is worth adding later as a second, narrower credential once Architect is done — likely lower priority given the consulting focus, but worth revisiting

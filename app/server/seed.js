// Initial seed data for the lowdb store. Only used the first time the app runs
// (when data/learning-plan.json doesn't exist yet) — after that, the file is the source of truth.

const phases = [
  { id: 0, title: 'Foundations', weight: null, hoursTarget: [8, 10] },
  { id: 1, title: 'Agentic Architecture', weight: '27%', hoursTarget: [15, 18] },
  { id: 2, title: 'Claude Code Configuration & Workflows', weight: '20%', hoursTarget: [11, 13] },
  { id: 3, title: 'Prompt Engineering', weight: '20%', hoursTarget: [10, 12] },
  { id: 4, title: 'Tool Design & MCP', weight: '18%', hoursTarget: [10, 14] },
  { id: 5, title: 'Context Management & Reliability', weight: '15%', hoursTarget: [8, 10] },
  { id: 6, title: 'Integration & Practice', weight: null, hoursTarget: [6, 10] },
];

const tasks = [
  // Phase 0 — Foundations
  { id: '0-0', phaseId: 0, label: 'Create Anthropic Console account + install Claude Code CLI', done: false },
  { id: '0-1', phaseId: 0, label: 'Complete "Claude 101" on Anthropic Academy', done: false },
  { id: '0-2', phaseId: 0, label: 'Complete "Claude Code 101" on Anthropic Academy', done: false },
  { id: '0-3', phaseId: 0, label: 'Read the Claude Code quickstart docs end to end', done: false },
  { id: '0-4', phaseId: 0, label: 'Download and skim the official CCAR-F exam guide for scope', done: false },

  // Phase 1 — Agentic Architecture
  { id: '1-0', phaseId: 1, label: 'Read "Building Effective Agents" (Anthropic Engineering blog) closely', done: false },
  { id: '1-1', phaseId: 1, label: 'Complete Academy\'s "Claude Code in Action" + "Subagents" courses', done: false },
  { id: '1-2', phaseId: 1, label: 'Read Cookbook notebooks: orchestrator-workers, evaluator-optimizer patterns', done: false },
  { id: '1-3', phaseId: 1, label: 'Build a small multi-step agent project end-to-end', done: false },

  // Phase 2 — Claude Code Configuration & Workflows
  { id: '2-0', phaseId: 2, label: 'Set up a CLAUDE.md for a real project', done: false },
  { id: '2-1', phaseId: 2, label: 'Configure at least one hook', done: false },
  { id: '2-2', phaseId: 2, label: 'Build and use a subagent on a real task', done: false },
  { id: '2-3', phaseId: 2, label: 'Create a custom skill', done: false },
  { id: '2-4', phaseId: 2, label: 'Read the "Claude Code at scale" series', done: false },
  { id: '2-5', phaseId: 2, label: 'Practice choosing plan mode vs. direct execution vs. test-driven iteration across 3-4 varied real tasks', done: false },
  { id: '2-6', phaseId: 2, label: 'On one task with known edge cases, use test-driven iteration deliberately (write failing tests first)', done: false },

  // Phase 3 — Prompt Engineering
  { id: '3-0', phaseId: 3, label: "Work through Anthropic's prompt engineering docs/tutorial", done: false },
  { id: '3-1', phaseId: 3, label: "Read Simon Willison's posts on prompting and context", done: false },
  { id: '3-2', phaseId: 3, label: 'Rewrite 3-5 of your own prompts using XML tags, few-shot, and CoT — compare outputs', done: false },
  { id: '3-3', phaseId: 3, label: 'Design a retry/validation loop — draw the line between fixable failures (retry) and capability gaps (escalate)', done: false },
  { id: '3-4', phaseId: 3, label: 'Build a 2-4 example few-shot set with reasoning shown, compare against a naive exhaustive-list approach', done: false },
  { id: '3-5', phaseId: 3, label: 'Replace a prose-only grading criterion (severity/quality/risk) with a concrete calibration-anchor example', done: false },

  // Phase 4 — Tool Design & MCP
  { id: '4-0', phaseId: 4, label: 'Read the MCP docs / spec overview', done: false },
  { id: '4-1', phaseId: 4, label: 'Complete the DeepLearning.AI MCP course', done: false },
  { id: '4-2', phaseId: 4, label: 'Build a small MCP server from scratch', done: false },
  { id: '4-3', phaseId: 4, label: 'Connect it to Claude Code and use it live', done: false },

  // Phase 5 — Context Management & Reliability
  { id: '5-0', phaseId: 5, label: 'Read "The new rules of context engineering" (Claude blog)', done: false },
  { id: '5-1', phaseId: 5, label: 'Read Platform docs on context windows and prompt caching', done: false },
  { id: '5-2', phaseId: 5, label: 'Practice /clear and /compact deliberately across a couple of real Claude Code sessions', done: false },
  { id: '5-3', phaseId: 5, label: 'Test what a rename/critical fact loses when compacted mid-session; fix via a persistent scratchpad', done: false },
  { id: '5-4', phaseId: 5, label: 'Design a stratified, risk-weighted human-review process instead of flat sampling or self-reported confidence', done: false },

  // Phase 6 — Integration & Practice
  { id: '6-0', phaseId: 6, label: 'Review whichever domains scored lowest across Phases 1-5 self-checks and the diagnostic', done: false },
  { id: '6-1', phaseId: 6, label: 'Take 2+ full practice exams', done: false },
  { id: '6-2', phaseId: 6, label: 'Re-confirm the official CCAR-F exam guide once more before booking', done: false },
];

function q(id, phaseId, question, options, correct) {
  return { id, phaseId, q: question, options, correct };
}

const quizQuestions = [
  // Phase 0
  q('0-0', 0, 'What is Claude Code, in relation to the Claude API?', ['A separate, unrelated model', 'A CLI / agentic tool built on top of the Claude API', 'A replacement for the Messages API', 'A no-code website builder'], 1),
  q('0-1', 0, 'What is the primary purpose of a CLAUDE.md file?', ['Storing API keys', 'Giving Claude persistent project context, auto-loaded each session', 'Replacing .gitignore', 'Logging conversation history'], 1),
  q('0-2', 0, 'Which best distinguishes "agentic" use from simple prompt-response use?', ['Agentic systems always use a bigger model', 'Agentic systems can plan, use tools, and iterate over multiple steps toward a goal', 'Agentic just means using a chat UI', 'Agentic requires zero human oversight, always'], 1),
  q('0-3', 0, 'Where should you confirm current, authoritative CCAR-F domain weights?', ['Whichever blog ranks highest in search', 'The official Anthropic CCAR-F exam guide', 'Reddit consensus', "Anthropic's marketing homepage"], 1),

  // Phase 1
  q('1-0', 1, "What's the key distinction between a \"workflow\" and an \"autonomous agent\"?", ['Workflows use Opus, agents use Sonnet', 'Workflows follow predefined code paths orchestrating LLM calls; agents dynamically direct their own process and tool use', "There's no meaningful distinction", 'Agents never use tools'], 1),
  q('1-1', 1, 'The orchestrator-workers pattern is best suited for:', ['A single fixed-format task, every time', "Complex tasks where subtasks can't be predicted in advance and are delegated dynamically", 'Purely conversational Q&A', 'Tasks requiring no tool use'], 1),
  q('1-2', 1, 'What does the evaluator-optimizer pattern add to a basic generation loop?', ['A second LLM call that critiques/scores output and feeds it back for refinement', 'Parallel execution for raw speed', 'A caching layer', 'A UI for human review only'], 0),
  q('1-3', 1, 'When is a simple, single-agent loop generally preferable to a complex multi-agent system?', ['Never', 'When the task is simple enough that orchestration overhead outweighs the benefit', 'Only for creative writing', 'Only when cost is unlimited'], 1),
  q('1-4', 1, 'What is a common failure mode the exam is likely to probe for in architecture scenarios?', ['Using too few tokens', 'Adding multi-agent complexity where a simpler workflow would be more reliable and easier to debug', 'Using Claude Code instead of the API', 'Using too few subagents'], 1),

  // Phase 2
  q('2-0', 2, 'What triggers Claude to read a CLAUDE.md file?', ['A manual /read command each time', 'It\'s automatically pulled into context at the start of a session in that directory', 'Only when explicitly attached as a file', "Nothing — it's just documentation for humans"], 1),
  q('2-1', 2, 'What are hooks primarily used for in Claude Code?', ['Styling the terminal UI', "Running custom commands/checks automatically at defined points in Claude's workflow", 'Connecting to MCP servers', 'Storing conversation history'], 1),
  q('2-2', 2, 'What\'s a primary benefit of delegating work to a subagent?', ["It uses a different company's model", "It runs in an isolated context, keeping the main conversation's context window clean", 'It bypasses all permissions', "It's required for every task"], 1),
  q('2-3', 2, 'What is a "skill," structurally?', ['A fine-tuned model checkpoint', 'A folder of instructions (and optionally scripts/resources) Claude loads when relevant', 'A hardcoded plugin written in a specific language', 'A subscription tier'], 1),
  q('2-4', 2, 'In a huge, multi-million-line monorepo, what\'s the recommended way to help Claude Code navigate effectively?', ['Paste the entire repo into one prompt', 'Layer context deliberately via CLAUDE.md files and skills at relevant directory levels', 'Disable all context gathering', 'Only use it on files under 10 lines'], 1),

  // Phase 3
  q('3-0', 3, 'Why does Anthropic recommend XML tags to structure prompts for Claude specifically?', ['It\'s required syntax the API otherwise rejects', 'Claude was trained to pay particular attention to XML-tag-delimited sections', 'XML parses faster', "It's purely cosmetic"], 1),
  q('3-1', 3, 'What is "role prompting"?', ['Assigning Claude a persona/perspective to shape tone and focus', 'Naming your API variables', 'A/B testing prompts', 'Restricting Claude to one specific tool'], 0),
  q('3-2', 3, 'What does chain-of-thought prompting encourage?', ['Shorter answers', 'Reasoning step-by-step before a final answer, generally improving accuracy on complex tasks', 'Single-word answers only', 'Skipping context entirely'], 1),
  q('3-3', 3, "What's the benefit of few-shot examples in a prompt?", ['They shorten the prompt', 'They show the desired input/output pattern directly — often more effective than description alone', "They're required in every prompt", 'They replace the system prompt'], 1),
  q('3-4', 3, 'Why prefer positive instructions ("Write in complete sentences") over negative-only ones ("Don\'t use fragments")?', ['Negative constraints are invalid syntax', 'Telling Claude what TO do is generally clearer and more reliably followed', "There's no real difference", 'Positive instructions always use fewer tokens'], 1),

  // Phase 4
  q('4-0', 4, 'What problem does MCP primarily standardize?', ['Model training procedures', 'A common protocol for connecting AI apps to external tools/data, instead of bespoke integrations', 'GPU scheduling', 'UI theming'], 1),
  q('4-1', 4, "In MCP's architecture, how do host, client, and server relate?", ['They\'re interchangeable names for the same thing', 'The host app runs an MCP client that connects to one or more MCP servers exposing tools/resources/prompts', "Servers run inside Claude's model weights", 'Clients exist only for authentication'], 1),
  q('4-2', 4, 'When designing a tool schema, what matters most for reliability?', ['Making it as short as possible, regardless of clarity', 'Clear naming and precise parameter descriptions so Claude can call it correctly', 'Avoiding all descriptions', 'Using only numeric parameters'], 1),
  q('4-3', 4, 'Why should tool results include structured error info rather than failing silently?', ['It doesn\'t matter — errors should always terminate the session', 'It lets Claude see what went wrong and self-correct, retry, or try an alternative', 'Silent failures are more secure', 'Structured errors slow the model down'], 1),
  q('4-4', 4, "What's a key security consideration when exposing tools to Claude?", ['None — tool use is inherently safe', 'Guarding against prompt injection and unsafe/destructive calls via permissions and confirmation steps', 'Tools should always run with full system permissions', "MCP servers can't meaningfully be secured"], 1),

  // Phase 5
  q('5-0', 5, 'What is the "context window"?', ['The visible chat UI area', 'The fixed-size bundle of tokens (history, files, tool output) sent to the model each turn', 'A setting relevant only to fine-tuning', "The model's permanent memory across sessions"], 1),
  q('5-1', 5, 'What does prompt caching primarily optimize for?', ['Model accuracy', 'Cost and latency, by reusing previously processed portions of a prompt', 'Security', 'Output length'], 1),
  q('5-2', 5, 'What is "context rot" / context degradation?', ['A hardware failure', 'The tendency for model focus/performance to degrade as stale or irrelevant info accumulates', 'A billing error', 'A required feature'], 1),
  q('5-3', 5, 'Which is a practical technique for managing context in a long session?', ['Never using /clear', 'Periodically clearing/compacting, and delegating tangents to isolated subagents', 'Always keeping the full history regardless of relevance', 'Disabling context entirely'], 1),
  q('5-4', 5, "Why give a subagent isolated context for a tangential research task, rather than handling it inline?", ['Subagents are always faster', "It prevents the tangent from bloating and diluting the main task's context window", "Subagents can't access tools", "It's never advisable"], 1),
];

const quizAnswers = [];
const stamps = [];

const timeEntries = [
  { id: 'seed-1', date: '2026-07-26', bucket: 'practical', phaseId: null, minutes: 600, note: '' },
  { id: 'seed-2', date: '2026-07-27', bucket: 'practical', phaseId: null, minutes: 120, note: '' },
];

const diagnosticRuns = [
  {
    id: 1,
    date: '2026-07-28',
    source: 'claudecertificationguide.com — 28Q short mock',
    overall: { correct: 20, total: 28, scaled: 737 },
    byDomain: {
      'Agentic Architecture': { correct: 6, total: 6 },
      'Tool Design & MCP': { correct: 4, total: 5 },
      'Claude Code Configuration & Workflows': { correct: 4, total: 6 },
      'Prompt Engineering': { correct: 3, total: 6 },
      'Context Management & Reliability': { correct: 3, total: 5 },
    },
    notes: 'Passed (737/1000, cut 720). Perfect Agentic Architecture score treated with caution — likely inflated by multiple-choice pattern recognition rather than applied mastery. Weakest domains: Prompt Engineering (50%) and Context Management & Reliability (60%).',
  },
];

module.exports = {
  targetCertification: 'CCAR-F',
  phases,
  tasks,
  quizQuestions,
  quizAnswers,
  stamps,
  timeEntries,
  diagnosticRuns,
};

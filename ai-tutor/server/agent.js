const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

const MODEL = 'claude-opus-5';

// Content-only — no ids. The server assigns those after parsing (see
// shapeIntoStore below), which is more robust than trusting the model for
// uniqueness/format and keeps this schema simple enough for structured
// outputs (no recursive schemas, no length/numeric constraints).
const PLAN_SCHEMA = {
  type: 'object',
  properties: {
    targetCertification: {
      type: 'string',
      description: 'The certification track this plan targets, confirmed or chosen.',
    },
    agentNotes: {
      type: 'string',
      description:
        '2-4 short sentences a person would actually want to read once: confirmation or mismatch flag on the target certification, and anything about a recommended or reported diagnostic. Plain language, no headers.',
    },
    phases: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          weight: {
            type: 'string',
            description:
              "Exam weight as a percent string like '27%', or an empty string if this phase has no separate exam weight (e.g. a foundations or integration phase).",
          },
          hoursMin: { type: 'integer' },
          hoursMax: { type: 'integer' },
          tasks: {
            type: 'array',
            items: {
              type: 'object',
              properties: { label: { type: 'string' } },
              required: ['label'],
              additionalProperties: false,
            },
          },
          quizQuestions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                question: { type: 'string' },
                options: { type: 'array', items: { type: 'string' } },
                correctIndex: { type: 'integer' },
              },
              required: ['question', 'options', 'correctIndex'],
              additionalProperties: false,
            },
          },
        },
        required: ['title', 'weight', 'hoursMin', 'hoursMax', 'tasks', 'quizQuestions'],
        additionalProperties: false,
      },
    },
  },
  required: ['targetCertification', 'agentNotes', 'phases'],
  additionalProperties: false,
};

function buildSystemPrompt() {
  return [
    'You generate a study plan for a Claude certification track from a structured interview.',
    '',
    'Certification research: the person may have named a specific Claude certification track, or ' +
      'may need one recommended from their role, experience, and goals. Either way, use web search ' +
      "to find that track's actual domain weights and exam structure — do not invent them. If a " +
      "target was named, still check it against their stated background and goals; if it doesn't " +
      'fit, say so in agentNotes along with what you\'d suggest instead. If no target was named, ' +
      'recommend one (or a combination) and say so in agentNotes.',
    '',
    'Diagnostic handling: if they reported existing assessment results, treat the result with ' +
      'skepticism calibrated to its source — a well-documented, high-item-count instrument (e.g. ' +
      "claudecertificationguide.com's tiers) warrants less downweighting than an unverifiable one; " +
      'in all cases weight misses more heavily than hits, and prefer keeping material in the plan ' +
      'over cutting it on a good score alone. If they have no results but are willing to take one, ' +
      'use web search to find a credible diagnostic for their track (claudecertificationguide.com is ' +
      'a known, pre-vetted option where it covers the relevant track) and recommend it in agentNotes.',
    '',
    "Pacing: anchor total plan hours to the low end of their stated weekly time-budget range " +
      'against any deadline they gave, rather than an optimistic estimate.',
    '',
    'Output shape: whatever plan format they said they want, your output must still be ' +
      "phase → task → quiz structured data — the app's current data model only supports that " +
      'shape. If they asked for a narrative or loose-guidance format, note that mismatch once in ' +
      'agentNotes rather than trying to force free-form guidance into a field that won\'t render ' +
      'it, and lean the task wording toward direction-and-pointers rather than rigid step-by-step ' +
      'where their answer suggests that fits better.',
    '',
    'Keep phase, task, and quiz content specific to the actual named or inferred certification, ' +
      'not generic Claude platform trivia, unless the track\'s real domain content is genuinely ' +
      'that broad. Quiz questions are self-checks, not the real exam — plausible multiple choice, ' +
      'one clearly correct answer, four options.',
  ].join('\n');
}

function formatAnswers(answers) {
  const a = answers.groupA || {};
  const b = answers.groupB || {};
  const c = answers.groupC || {};
  const d = answers.groupD || {};
  const f = answers.groupF || {};

  const lines = [];

  lines.push('## Role, goals, and target certification');
  lines.push(`Role/title: ${a.role || '(not given)'}`);
  lines.push(`Experience: ${a.yearsExperience || '(not given)'}`);
  lines.push(`Industry/domain: ${a.domain || '(not given)'}`);
  if (a.claudeContext) lines.push(`How Claude fits into their work today: ${a.claudeContext}`);
  lines.push(`Goals (what they want to be able to do): ${a.goals || '(not given)'}`);
  lines.push(`Named target certification: ${a.targetCertification || '(none named — recommend one)'}`);

  lines.push('');
  lines.push('## Tool experience and prior learning');
  lines.push(`Hands-on tool experience: ${b.toolExperience || '(not given)'}`);
  if (b.priorLearning) lines.push(`Prior structured learning: ${b.priorLearning}`);

  lines.push('');
  lines.push('## Deadline framing and time budget');
  if (c.framing === 'deadline') {
    lines.push(`Hard deadline/mandate: ${c.deadlineDate || '(date not given)'}`);
    lines.push(`What's driving it: ${c.deadlineDriver || '(not given)'}`);
  } else {
    lines.push('Self-paced / open-ended, no hard deadline.');
  }
  lines.push(`Weekly time budget: ${c.weeklyHours || '(not given)'}`);
  if (c.distribution) lines.push(`Distribution: ${c.distribution}`);

  lines.push('');
  lines.push('## Prior diagnostic');
  if (d.hasResults === 'yes') {
    lines.push(`Has results to share: ${d.resultsAndSource || '(not given)'}`);
  } else if (d.hasResults === 'willing') {
    lines.push('No results yet, but willing to take a diagnostic — recommend one.');
  } else {
    lines.push('No results, not indicating willingness either way.');
  }

  lines.push('');
  lines.push('## Plan format and learning modality');
  lines.push(`Plan format preference: ${f.planFormat || '(not given)'}`);
  if (f.modality) lines.push(`Learning modality: ${f.modality}`);
  if (f.handsOnType) lines.push(`Hands-on type preference: ${f.handsOnType}`);
  if (f.handsOnSize) lines.push(`Hands-on task size preference: ${f.handsOnSize}`);

  return lines.join('\n');
}

function shapeIntoStore(parsed) {
  const phases = [];
  const tasks = [];
  const quizQuestions = [];

  (parsed.phases || []).forEach((p, phaseId) => {
    phases.push({
      id: phaseId,
      title: p.title,
      weight: p.weight ? p.weight : null,
      hoursTarget: [p.hoursMin, p.hoursMax],
    });
    (p.tasks || []).forEach((t, i) => {
      tasks.push({ id: `${phaseId}-${i}`, phaseId, label: t.label, done: false });
    });
    (p.quizQuestions || []).forEach((q, i) => {
      quizQuestions.push({
        id: `${phaseId}-${i}`,
        phaseId,
        q: q.question,
        options: q.options,
        correct: q.correctIndex,
      });
    });
  });

  return {
    targetCertification: parsed.targetCertification,
    agentNotes: parsed.agentNotes,
    phases,
    tasks,
    quizQuestions,
  };
}

async function generatePlan(answers) {
  const system = buildSystemPrompt();
  const userText = formatAnswers(answers);

  const requestParams = {
    model: MODEL,
    max_tokens: 8000,
    system,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: PLAN_SCHEMA },
    },
    tools: [{ type: 'web_search_20260209', name: 'web_search' }],
  };

  let messages = [{ role: 'user', content: userText }];
  let response = await client.messages.create({ ...requestParams, messages });

  // Server-tool turns can hit the internal iteration cap and pause; resume
  // by resending [user, assistant] with no new user turn, per the documented
  // server-tool resume pattern.
  while (response.stop_reason === 'pause_turn') {
    messages = [
      { role: 'user', content: userText },
      { role: 'assistant', content: response.content },
    ];
    response = await client.messages.create({ ...requestParams, messages });
  }

  if (response.stop_reason === 'refusal') {
    throw new Error('Plan generation was declined by the model. Try adjusting your answers and resubmitting.');
  }

  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock) {
    throw new Error('Plan generation did not return structured output.');
  }

  const parsed = JSON.parse(textBlock.text);
  return shapeIntoStore(parsed);
}

module.exports = { generatePlan };

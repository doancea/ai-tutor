const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

const MODEL = 'claude-opus-5';

// Caps *output* only — adaptive thinking, the model's own tool-use blocks, and
// the final JSON all draw from this one budget, and the model is not told what
// it is. The interview answers are input and don't count against it. 8000 was
// too low: two real runs truncated, once before the JSON started and once 2933
// characters into it.
//
// Measured on the first successful run: output_tokens 12,640 for a 7-phase plan
// (~8-9K thinking + server tool use, ~3-4K of JSON), so 32000 leaves ~2.5x
// headroom. Deliberately generous — billing is on tokens actually generated, so
// an unused ceiling is free, and a *binding* cap is the failure mode here since
// the model can't see it and plans as if unconstrained. Plan length is bounded
// by the size guidance in buildSystemPrompt, not by this number.
const MAX_TOKENS = 32000;

// Cap on `pause_turn` resume rounds. Never observed firing — the first
// successful run did zero pause_turn rounds — but an unbounded resume loop
// against a metered API is unbounded spend, and the failure mode is silent.
// 5 is generous relative to anything seen in practice; a run that needs more
// than that is a bug, not a long search.
const MAX_CONTINUATIONS = 5;

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
    // Disclosure, not a fix. ARCHITECTURE-DECISIONS ("Multi-credential / staged
    // certification paths") rules out solving staged paths by prompt-tuning —
    // the data model needs a credential concept, which is v2 work. This says
    // the same thing the "Output shape" instruction above does: when the app's
    // shape can't hold what was asked for, tell the person rather than let them
    // notice. The compression itself is unchanged.
    'Staged certification paths: if they named more than one credential (e.g. a foundations track ' +
      'and a professional one), the plan can only carry a single target certification and one flat ' +
      'phase list, so an earlier credential has to be compressed into a milestone phase rather than ' +
      'given proportional coverage. Do that, and say so plainly in agentNotes — name which credential ' +
      'was compressed and that its coverage is lighter than a dedicated plan would be. Do not encode ' +
      'the staging into the targetCertification string as a substitute for saying it.',
    '',
    'Keep phase, task, and quiz content specific to the actual named or inferred certification, ' +
      'not generic Claude platform trivia, unless the track\'s real domain content is genuinely ' +
      'that broad. Quiz questions are self-checks, not the real exam — plausible multiple choice, ' +
      'one clearly correct answer, four options.',
    '',
    'Plan size: aim for 4-7 phases, 4-6 tasks per phase, and 3-5 quiz questions per phase. Task ' +
      'labels are one line each, not paragraphs. These are guides, not hard rules — follow the ' +
      "track's real domain structure if it genuinely needs a different shape — but a plan far " +
      'past this range is a sign of padding rather than coverage.',
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

// Logged on every response, success or failure — not just on the error paths.
// Truncation surfaces in more than one place (before any text block, or partway
// through the JSON), so the useful signal is the envelope itself, and
// output_tokens on *successful* runs is what tells us where MAX_TOKENS should
// actually sit.
function logResponseEnvelope(label, response) {
  console.log(
    '[agent] %s stop_reason=%s stop_details=%j blocks=%j usage=%j',
    label,
    response.stop_reason,
    response.stop_details,
    response.content.map((block) => block.type),
    response.usage
  );
}

async function generatePlan(answers) {
  const system = buildSystemPrompt();
  const userText = formatAnswers(answers);

  const requestParams = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: PLAN_SCHEMA },
    },
    tools: [{ type: 'web_search_20260209', name: 'web_search' }],
  };

  // Streamed rather than a plain create() call: at this max_tokens a
  // non-streaming request risks hitting the request timeout well before the
  // model is done thinking and searching. We don't need the individual events,
  // so finalMessage() collapses the stream back into one response object.
  //
  // Retried here rather than left to the SDK: streaming moves this class of
  // failure out of the SDK's automatic retry. An overload that lands after the
  // stream is established arrives as an SSE `error` event and is thrown from
  // inside the stream iterator with status undefined, whereas the SDK's retry
  // keys off the HTTP response status — so it never sees it. Non-streaming,
  // the same overload would come back as a 529 and be retried silently.
  //
  // Only transient server-side classes are retried. A refusal, a max_tokens
  // truncation, or a schema error is not going to be fixed by asking again,
  // and each attempt costs a full thinking-plus-search run.
  const send = async (messages, attempts = 4) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await client.messages.stream({ ...requestParams, messages }).finalMessage();
      } catch (err) {
        const transient = err?.type === 'overloaded_error' || err?.type === 'api_error';
        if (!transient || attempt === attempts) throw err;
        const waitMs = 2000 * 2 ** (attempt - 1);
        console.log(
          '[agent] %s (request_id=%s) — attempt %d/%d failed, retrying in %dms',
          err.type,
          err.requestID || 'unknown',
          attempt,
          attempts,
          waitMs
        );
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  };

  const messages = [{ role: 'user', content: userText }];
  let response = await send(messages);
  logResponseEnvelope('initial', response);

  // Server-tool turns can hit the internal iteration cap and pause; resume by
  // resending the accumulated history with no new user turn, per the documented
  // server-tool resume pattern.
  //
  // Appending rather than rebuilding as [user, latestAssistant] matters from the
  // *second* pause onward: rebuilding drops the earlier round's server_tool_use
  // and search-result blocks, so the model loses its own prior search results
  // mid-flight and re-searches from scratch.
  for (let continuation = 1; response.stop_reason === 'pause_turn'; continuation++) {
    if (continuation > MAX_CONTINUATIONS) {
      throw new Error(
        `Plan generation paused for server tool use more than ${MAX_CONTINUATIONS} times without finishing. ` +
          'Stopped to avoid an unbounded retry loop — try again, or raise MAX_CONTINUATIONS in server/agent.js.'
      );
    }
    messages.push({ role: 'assistant', content: response.content });
    response = await send(messages);
    logResponseEnvelope(`after pause_turn resume ${continuation}`, response);
  }

  if (response.stop_reason === 'refusal') {
    throw new Error('Plan generation was declined by the model. Try adjusting your answers and resubmitting.');
  }

  // Checked before the text-block and JSON.parse steps below, because
  // truncation can land in either of them: cut off during thinking or tool use
  // and there's no text block at all; cut off mid-answer and there's a text
  // block holding partial JSON. Both are this one condition, so it's caught
  // once, here, rather than separately in each downstream failure.
  if (response.stop_reason === 'max_tokens') {
    throw new Error(
      `Plan generation ran past its ${MAX_TOKENS}-token output budget before finishing the plan. ` +
        'The generated plan was too long to complete — try again, or raise MAX_TOKENS in server/agent.js.'
    );
  }

  // findLast, not find: with web_search in the tool set a turn can interleave
  // commentary text before the final structured answer, and the *first* text
  // block would then be prose rather than the JSON. More likely to bite at
  // MAX_TOKENS 32000 than it was at 8000, since there is more room for
  // commentary. The one successful run had exactly one text block, in final
  // position, so both selectors agreed there.
  const textBlock = response.content.findLast((block) => block.type === 'text');
  if (!textBlock) {
    throw new Error('Plan generation did not return structured output.');
  }

  let parsed;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch (err) {
    console.error('[agent] JSON.parse failed on text block of length %d', textBlock.text.length);
    throw new Error(`Plan generation returned output that could not be parsed: ${err.message}`);
  }

  return shapeIntoStore(parsed);
}

module.exports = { generatePlan };

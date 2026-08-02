import React, { useState } from 'react';
import { api } from '../api.js';

const STEPS = ['A', 'B', 'C', 'D', 'F', 'review'];
const STEP_LABELS = {
  A: 'Role & goals',
  B: 'Tool experience',
  C: 'Deadline & time',
  D: 'Prior diagnostic',
  F: 'Plan format',
  review: 'Review',
};

const WEEKLY_HOURS_OPTIONS = ['1–3 hrs/wk', '4–7 hrs/wk', '8–12 hrs/wk', '13–20 hrs/wk', '20+ hrs/wk'];
const DISTRIBUTION_OPTIONS = ['Mostly daily', 'Mostly weekend / batched', 'Irregular'];
const PLAN_FORMAT_OPTIONS = [
  'A structured tracker/checklist — phase-by-phase tasks I check off',
  'A narrative document — a written guide I read through',
  'Loose, high-level guidance — pointers and direction, I\'ll self-direct on specifics',
];
const MODALITY_OPTIONS = ['Hands-on practice / building', 'Reading / reference material', 'Mixed'];
const HANDS_ON_TYPE_OPTIONS = [
  'Standalone practice projects / exercises',
  'Applying directly to real current work',
  'Structured guided labs / tutorials',
  'Open-ended tinkering and exploration',
];
const HANDS_ON_SIZE_OPTIONS = ['Quick (15–30 min)', 'Medium (1–2 hrs)', 'Large / project-scale (multi-session)'];

function ChoiceList({ options, value, onChange, allowOther = true, otherValue, onOtherChange }) {
  const isOther = value !== undefined && value !== null && value !== '' && !options.includes(value);
  return (
    <div className="option-list">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`option-btn${value === opt ? ' selected' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
      {allowOther && (
        <div className="option-other-row">
          <button
            type="button"
            className={`option-btn${isOther ? ' selected' : ''}`}
            onClick={() => onChange(otherValue || '')}
          >
            Other:
          </button>
          <input
            type="text"
            placeholder="describe"
            value={isOther ? value : otherValue || ''}
            onChange={(e) => {
              onOtherChange(e.target.value);
              onChange(e.target.value);
            }}
            className="field-full"
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="interview-field">
      <div className="interview-field-label">
        {label} {required && <span className="required-mark">*</span>}
      </div>
      {children}
    </div>
  );
}

function TextArea(props) {
  return <textarea rows={3} className="interview-textarea" {...props} />;
}

export default function Interview({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    groupA: { role: '', yearsExperience: '', domain: '', claudeContext: '', goals: '', targetCertification: '' },
    groupB: { toolExperience: '', priorLearning: '' },
    groupC: { framing: '', deadlineDate: '', deadlineDriver: '', weeklyHours: '', distribution: '' },
    groupD: { hasResults: '', resultsAndSource: '' },
    groupF: { planFormat: '', modality: '', handsOnType: '', handsOnSize: '' },
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const setGroup = (group, patch) => setAnswers((a) => ({ ...a, [group]: { ...a[group], ...patch } }));

  const stepKey = STEPS[step];

  const canAdvance = () => {
    const { groupA: a, groupB: b, groupC: c, groupD: d, groupF: f } = answers;
    switch (stepKey) {
      case 'A':
        return a.role.trim() && a.yearsExperience.trim() && a.domain.trim() && a.goals.trim();
      case 'B':
        return b.toolExperience.trim();
      case 'C':
        if (!c.framing) return false;
        if (c.framing === 'deadline' && (!c.deadlineDate.trim() || !c.deadlineDriver.trim())) return false;
        return !!c.weeklyHours;
      case 'D':
        if (!d.hasResults) return false;
        if (d.hasResults === 'yes' && !d.resultsAndSource.trim()) return false;
        return true;
      case 'F':
        return !!f.planFormat;
      default:
        return true;
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await api.submitInterview(answers);
      setResult(res);
    } catch (err) {
      setError(err.message || 'Something went wrong generating your plan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="interview-shell">
        <div className="interview-card">
          <div className="eyebrow">PLAN GENERATED</div>
          <h1>You're set up for {result.targetCertification}</h1>
          {result.agentNotes && <p className="agent-notes">{result.agentNotes}</p>}
          <button className="add-btn" onClick={onComplete}>
            Go to my plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-shell">
      <div className="interview-card">
        <div className="interview-progress">
          {STEPS.map((s, i) => (
            <div key={s} className={`interview-progress-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
              {STEP_LABELS[s]}
            </div>
          ))}
        </div>

        {stepKey === 'A' && (
          <div>
            <div className="eyebrow">ROLE, GOALS & TARGET CERTIFICATION</div>
            <Field label="Current role / title" required>
              <input
                className="interview-input"
                value={answers.groupA.role}
                onChange={(e) => setGroup('groupA', { role: e.target.value })}
              />
            </Field>
            <Field label="Years of professional experience overall, and separately, with Claude/AI tools if any" required>
              <input
                className="interview-input"
                value={answers.groupA.yearsExperience}
                onChange={(e) => setGroup('groupA', { yearsExperience: e.target.value })}
              />
            </Field>
            <Field label="Industry or domain (e.g. consulting, in-house engineering, agency, academia)" required>
              <input
                className="interview-input"
                value={answers.groupA.domain}
                onChange={(e) => setGroup('groupA', { domain: e.target.value })}
              />
            </Field>
            <Field label="Anything else about how Claude fits into your work today?">
              <TextArea
                value={answers.groupA.claudeContext}
                onChange={(e) => setGroup('groupA', { claudeContext: e.target.value })}
              />
            </Field>
            <Field label="What do you want to be able to do as a result of this — the actual outcome, not just a motivation" required>
              <TextArea value={answers.groupA.goals} onChange={(e) => setGroup('groupA', { goals: e.target.value })} />
            </Field>
            <Field label="Target certification, if you already have one in mind — otherwise leave blank and we'll recommend one">
              <input
                className="interview-input"
                value={answers.groupA.targetCertification}
                onChange={(e) => setGroup('groupA', { targetCertification: e.target.value })}
              />
            </Field>
          </div>
        )}

        {stepKey === 'B' && (
          <div>
            <div className="eyebrow">TOOL EXPERIENCE & PRIOR LEARNING</div>
            <Field
              label="Your hands-on experience with Claude so far — chat, API/SDK, Claude Code CLI, MCP, prompt engineering"
              required
            >
              <TextArea
                value={answers.groupB.toolExperience}
                onChange={(e) => setGroup('groupB', { toolExperience: e.target.value })}
              />
            </Field>
            <Field label="Any structured learning relevant to this — Academy courses, another vendor's certification, a bootcamp, self-study">
              <TextArea
                value={answers.groupB.priorLearning}
                onChange={(e) => setGroup('groupB', { priorLearning: e.target.value })}
              />
            </Field>
          </div>
        )}

        {stepKey === 'C' && (
          <div>
            <div className="eyebrow">DEADLINE FRAMING & TIME BUDGET</div>
            <Field label="Is there a hard deadline or mandate driving this, or is this open-ended and self-paced?" required>
              <ChoiceList
                options={['Hard deadline / mandate', 'Self-paced / open-ended']}
                allowOther={false}
                value={
                  answers.groupC.framing === 'deadline'
                    ? 'Hard deadline / mandate'
                    : answers.groupC.framing === 'self-paced'
                    ? 'Self-paced / open-ended'
                    : ''
                }
                onChange={(v) => setGroup('groupC', { framing: v === 'Hard deadline / mandate' ? 'deadline' : 'self-paced' })}
              />
            </Field>
            {answers.groupC.framing === 'deadline' && (
              <>
                <Field label="Target date" required>
                  <input
                    type="date"
                    className="interview-input"
                    value={answers.groupC.deadlineDate}
                    onChange={(e) => setGroup('groupC', { deadlineDate: e.target.value })}
                  />
                </Field>
                <Field label="What's driving it?" required>
                  <input
                    className="interview-input"
                    value={answers.groupC.deadlineDriver}
                    onChange={(e) => setGroup('groupC', { deadlineDriver: e.target.value })}
                  />
                </Field>
              </>
            )}
            <Field label="About how many hours per week can you realistically commit to this?" required>
              <ChoiceList
                options={WEEKLY_HOURS_OPTIONS}
                value={answers.groupC.weeklyHours}
                onChange={(v) => setGroup('groupC', { weeklyHours: v })}
              />
            </Field>
            <Field label="How does that time tend to show up?">
              <ChoiceList
                options={DISTRIBUTION_OPTIONS}
                allowOther={false}
                value={answers.groupC.distribution}
                onChange={(v) => setGroup('groupC', { distribution: v })}
              />
            </Field>
          </div>
        )}

        {stepKey === 'D' && (
          <div>
            <div className="eyebrow">PRIOR DIAGNOSTIC</div>
            <Field
              label="Do you have results from any kind of assessment related to this goal (or a similar topic) that you're willing to share — this includes a certification exam you've already passed, even without a detailed score report?"
              required
            >
              <ChoiceList
                options={['Yes — I have results to share', 'No', "No, but I'd be willing to take one"]}
                allowOther={false}
                value={
                  answers.groupD.hasResults === 'yes'
                    ? 'Yes — I have results to share'
                    : answers.groupD.hasResults === 'willing'
                    ? "No, but I'd be willing to take one"
                    : answers.groupD.hasResults === 'no'
                    ? 'No'
                    : ''
                }
                onChange={(v) =>
                  setGroup('groupD', {
                    hasResults: v.startsWith('Yes') ? 'yes' : v.startsWith('No, but') ? 'willing' : 'no',
                  })
                }
              />
            </Field>
            {answers.groupD.hasResults === 'yes' && (
              <Field
                label="Share your results — paste the raw output if you still have it, otherwise describe what you remember — and where the assessment was from"
                required
              >
                <TextArea
                  value={answers.groupD.resultsAndSource}
                  onChange={(e) => setGroup('groupD', { resultsAndSource: e.target.value })}
                />
              </Field>
            )}
          </div>
        )}

        {stepKey === 'F' && (
          <div>
            <div className="eyebrow">PLAN FORMAT & LEARNING MODALITY</div>
            <Field label="How do you want your plan presented?" required>
              <ChoiceList
                options={PLAN_FORMAT_OPTIONS}
                value={answers.groupF.planFormat}
                onChange={(v) => setGroup('groupF', { planFormat: v })}
              />
            </Field>
            <Field label="Do you want to focus more on hands-on practice/building, reading/reference material, or a mix?">
              <ChoiceList
                options={MODALITY_OPTIONS}
                value={answers.groupF.modality}
                onChange={(v) => setGroup('groupF', { modality: v })}
              />
            </Field>
            {(answers.groupF.modality === 'Hands-on practice / building' || answers.groupF.modality === 'Mixed') && (
              <>
                <Field label="What kind of hands-on work appeals to you most?">
                  <ChoiceList
                    options={HANDS_ON_TYPE_OPTIONS}
                    value={answers.groupF.handsOnType}
                    onChange={(v) => setGroup('groupF', { handsOnType: v })}
                  />
                </Field>
                <Field label="How big do you want individual hands-on tasks to be?">
                  <ChoiceList
                    options={HANDS_ON_SIZE_OPTIONS}
                    allowOther={false}
                    value={answers.groupF.handsOnSize}
                    onChange={(v) => setGroup('groupF', { handsOnSize: v })}
                  />
                </Field>
              </>
            )}
          </div>
        )}

        {stepKey === 'review' && (
          <div>
            <div className="eyebrow">REVIEW</div>
            <p className="interview-review-text">
              That's everything — generating your plan makes one call to Claude to research your target
              certification and build a phase-by-phase plan. It can take a little while (research plus
              writing the plan), so don't refresh once you start.
            </p>
            {error && <p className="interview-error">{error}</p>}
            {submitting ? (
              <div className="interview-loading">Generating your plan — this can take a minute or two…</div>
            ) : (
              <button className="add-btn" onClick={submit}>
                Generate my plan
              </button>
            )}
          </div>
        )}

        {stepKey !== 'review' && (
          <div className="interview-nav-row">
            <button className="mini-btn" onClick={back} disabled={step === 0}>
              Back
            </button>
            <button className="add-btn" onClick={next} disabled={!canAdvance()}>
              Next
            </button>
          </div>
        )}
        {stepKey === 'review' && step > 0 && !submitting && (
          <div className="interview-nav-row">
            <button className="mini-btn" onClick={back}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

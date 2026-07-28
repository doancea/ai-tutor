import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { api } from '../api.js';

export default function Phase({ phases, reload }) {
  const { id } = useParams();
  const phaseId = Number(id);
  const phase = phases?.find((p) => p.id === phaseId);
  const [logMinutes, setLogMinutes] = useState(15);
  const [logNote, setLogNote] = useState('');

  if (!phase) return <div className="loading">Loading…</div>;

  const toggleTask = async (taskId, currentlyDone) => {
    await api.toggleTask(taskId, !currentlyDone);
    reload();
  };

  const answer = async (questionId, idx) => {
    await api.answerQuiz(questionId, idx);
    reload();
  };

  const retryQuiz = async () => {
    await api.resetQuiz(phaseId);
    reload();
  };

  const stamp = async () => {
    await api.stampPhase(phaseId);
    reload();
  };

  const logTime = async () => {
    await api.addTimeEntry({
      date: new Date().toISOString().slice(0, 10),
      bucket: 'learning',
      phaseId,
      minutes: logMinutes,
      note: logNote,
    });
    setLogNote('');
    reload();
  };

  const doneCount = phase.tasks.filter((t) => t.done).length;
  const allTasksDone = phase.tasks.length > 0 && doneCount === phase.tasks.length;

  const answeredMap = {};
  phase.quizAnswers.forEach((a) => {
    answeredMap[a.questionId] = a.selectedIndex;
  });
  const quizTotal = phase.quizQuestions.length;
  const quizAnswered = phase.quizQuestions.filter((q) => answeredMap[q.id] !== undefined).length;
  const quizCorrect = phase.quizQuestions.filter((q) => answeredMap[q.id] === q.correct).length;
  const quizPassable = quizTotal === 0 || (quizAnswered === quizTotal && quizCorrect / quizTotal >= 0.8);

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">
          PHASE {phase.id}
          {phase.weight ? ` · ${phase.weight} OF EXAM` : ''}
        </div>
        <h1>{phase.title}</h1>
        <div className="subtitle">
          {phase.hoursTarget[0]}–{phase.hoursTarget[1]} hrs estimated
        </div>
      </header>

      <section className="card">
        <div className="section-label">TASKS</div>
        {phase.tasks.map((t) => (
          <label key={t.id} className="task-row" onClick={() => toggleTask(t.id, t.done)}>
            <input type="checkbox" checked={t.done} readOnly />
            <span className={t.done ? 'task-done' : ''}>{t.label}</span>
          </label>
        ))}
      </section>

      {quizTotal > 0 && (
        <section className="card">
          <div className="section-label">SELF-CHECK</div>
          {phase.quizQuestions.map((q, i) => {
            const selected = answeredMap[q.id];
            return (
              <div key={q.id} className="quiz-q">
                <div className="quiz-q-text">
                  {i + 1}. {q.q}
                </div>
                <div className="quiz-options">
                  {q.options.map((opt, oi) => {
                    let cls = 'quiz-option';
                    if (selected !== undefined) {
                      if (oi === q.correct) cls += ' correct';
                      else if (oi === selected) cls += ' incorrect';
                    }
                    return (
                      <button key={oi} className={cls} disabled={selected !== undefined} onClick={() => answer(q.id, oi)}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {quizAnswered > 0 && (
            <div className="quiz-score-row">
              <span>
                Score: {quizCorrect}/{quizTotal}
                {quizAnswered === quizTotal ? (quizCorrect / quizTotal >= 0.8 ? ' — passing' : ' — below 80%, review and retry') : ''}
              </span>
              <button className="mini-btn" onClick={retryQuiz}>
                <RotateCcw size={13} /> Retry quiz
              </button>
            </div>
          )}
        </section>
      )}

      <section className="card">
        <div className="section-label">LOG TIME FOR THIS PHASE</div>
        <div className="form-row">
          <select value={logMinutes} onChange={(e) => setLogMinutes(Number(e.target.value))}>
            {[15, 30, 45, 60, 90, 120, 180, 240].map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
          <input type="text" placeholder="note (optional)" value={logNote} onChange={(e) => setLogNote(e.target.value)} />
          <button className="add-btn" onClick={logTime}>
            Log
          </button>
        </div>
      </section>

      <div className="stamp-action-row">
        {phase.stamp?.validated ? (
          <span className="stamp-status">Phase validated.</span>
        ) : (
          <button className="stamp-btn" disabled={!allTasksDone || !quizPassable} onClick={stamp}>
            Mark phase validated
          </button>
        )}
        {!allTasksDone && <span className="stamp-hint">Complete all tasks to unlock.</span>}
        {allTasksDone && !quizPassable && <span className="stamp-hint">Score 80%+ on the self-check to unlock.</span>}
      </div>
    </div>
  );
}

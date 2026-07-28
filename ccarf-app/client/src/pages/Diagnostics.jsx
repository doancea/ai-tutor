import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

const DOMAINS = [
  'Agentic Architecture',
  'Claude Code Configuration & Workflows',
  'Prompt Engineering',
  'Tool Design & MCP',
  'Context Management & Reliability',
];

function pct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

export default function Diagnostics() {
  const [runs, setRuns] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    source: '',
    overallCorrect: '',
    overallTotal: '',
    notes: '',
  });
  const [domainForm, setDomainForm] = useState(Object.fromEntries(DOMAINS.map((d) => [d, { correct: '', total: '' }])));

  const reload = () => api.getDiagnostics().then(setRuns).catch(console.error);
  useEffect(() => {
    reload();
  }, []);

  const submit = async () => {
    if (!form.overallCorrect || !form.overallTotal) return;
    const byDomain = {};
    DOMAINS.forEach((d) => {
      const c = Number(domainForm[d].correct);
      const t = Number(domainForm[d].total);
      if (t > 0) byDomain[d] = { correct: c, total: t };
    });
    await api.addDiagnostic({
      date: form.date,
      source: form.source,
      overall: { correct: Number(form.overallCorrect), total: Number(form.overallTotal) },
      byDomain,
      notes: form.notes,
    });
    setForm({ ...form, overallCorrect: '', overallTotal: '', notes: '' });
    setDomainForm(Object.fromEntries(DOMAINS.map((d) => [d, { correct: '', total: '' }])));
    reload();
  };

  const sorted = [...runs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">DIAGNOSTICS</div>
        <h1>Practice Exam History</h1>
      </header>

      {sorted.map((r) => (
        <section key={r.id} className="card">
          <div className="section-label">
            {r.date} {r.source && `— ${r.source}`}
          </div>
          <div className="total-value">
            {r.overall.correct}/{r.overall.total} ({pct(r.overall.correct, r.overall.total)}%)
            {r.overall.scaled ? ` · ${r.overall.scaled}/1000` : ''}
          </div>
          {Object.entries(r.byDomain).map(([d, s]) => (
            <div key={d} className="phase-row" style={{ marginTop: 8 }}>
              <div className="phase-row-label">
                <span>{d}</span>
                <span>
                  {s.correct}/{s.total} ({pct(s.correct, s.total)}%)
                </span>
              </div>
              <div className="phase-row-track">
                <div
                  className={`phase-row-fill ${pct(s.correct, s.total) < 60 ? 'low' : pct(s.correct, s.total) < 80 ? 'mid' : 'high'}`}
                  style={{ width: `${pct(s.correct, s.total)}%` }}
                />
              </div>
            </div>
          ))}
          {r.notes && (
            <div className="log-note" style={{ marginTop: 10, whiteSpace: 'normal' }}>
              {r.notes}
            </div>
          )}
        </section>
      ))}

      <section className="card">
        <div className="section-label">LOG A NEW RESULT</div>
        <div className="form-row">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input
            type="text"
            placeholder="source (e.g. claudecertificationguide.com)"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="field-full"
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            placeholder="overall correct"
            value={form.overallCorrect}
            onChange={(e) => setForm({ ...form, overallCorrect: e.target.value })}
          />
          <input
            type="number"
            placeholder="overall total"
            value={form.overallTotal}
            onChange={(e) => setForm({ ...form, overallTotal: e.target.value })}
          />
        </div>
        {DOMAINS.map((d) => (
          <div key={d} className="form-row">
            <span className="domain-form-label">{d}</span>
            <input
              type="number"
              placeholder="correct"
              value={domainForm[d].correct}
              onChange={(e) => setDomainForm({ ...domainForm, [d]: { ...domainForm[d], correct: e.target.value } })}
            />
            <input
              type="number"
              placeholder="total"
              value={domainForm[d].total}
              onChange={(e) => setDomainForm({ ...domainForm, [d]: { ...domainForm[d], total: e.target.value } })}
            />
          </div>
        ))}
        <div className="form-row">
          <input
            type="text"
            placeholder="notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="field-full"
          />
        </div>
        <button className="add-btn" onClick={submit}>
          Save result
        </button>
      </section>
    </div>
  );
}

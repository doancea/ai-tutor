import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '../api.js';

function fmtHrs(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

const MINUTE_OPTIONS = [15, 30, 45, 60, 90, 120, 180, 240, 300, 360, 420, 480, 600];

export default function TimeLog({ phases }) {
  const [entries, setEntries] = useState([]);
  const [bucket, setBucket] = useState('practical');
  const [phaseId, setPhaseId] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [minutes, setMinutes] = useState(15);
  const [note, setNote] = useState('');

  const reload = () => api.getTimeEntries().then(setEntries).catch(console.error);
  useEffect(() => {
    reload();
  }, []);

  const add = async () => {
    await api.addTimeEntry({ date, bucket, phaseId: bucket === 'learning' ? phaseId : null, minutes, note });
    setNote('');
    reload();
  };

  const remove = async (id) => {
    await api.deleteTimeEntry(id);
    reload();
  };

  const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const learningTotal = entries.filter((e) => e.bucket === 'learning').reduce((s, e) => s + e.minutes, 0);
  const practicalTotal = entries.filter((e) => e.bucket === 'practical').reduce((s, e) => s + e.minutes, 0);

  const phaseName = (id) => phases?.find((p) => p.id === id)?.title || 'Learning';

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">TIME LOG</div>
        <h1>Full Log</h1>
        <div className="subtitle">15-minute increments · logged by day, not clock time</div>
      </header>

      <div className="totals-row">
        <div className="total-card">
          <div className="total-label">Learning</div>
          <div className="total-value">{fmtHrs(learningTotal)}</div>
        </div>
        <div className="total-card">
          <div className="total-label">Practical</div>
          <div className="total-value">{fmtHrs(practicalTotal)}</div>
        </div>
        <div className="total-card">
          <div className="total-label">Grand total</div>
          <div className="total-value">{fmtHrs(learningTotal + practicalTotal)}</div>
        </div>
      </div>

      <section className="card">
        <div className="section-label">ADD ENTRY</div>
        <div className="form-row">
          <input type="date" value={date} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} />
          <select value={bucket} onChange={(e) => setBucket(e.target.value)}>
            <option value="practical">Practical</option>
            <option value="learning">Learning</option>
          </select>
          {bucket === 'learning' && phases && (
            <select value={phaseId} onChange={(e) => setPhaseId(Number(e.target.value))}>
              {phases.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            {MINUTE_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {fmtHrs(m)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <input type="text" placeholder="note (optional)" value={note} onChange={(e) => setNote(e.target.value)} className="field-full" />
          <button className="add-btn" onClick={add}>
            Log time
          </button>
        </div>
      </section>

      <section className="card">
        <div className="section-label">LOG</div>
        {sorted.length === 0 && <div className="empty-log">No entries yet.</div>}
        {sorted.map((e) => (
          <div key={e.id} className="log-row">
            <div className="log-date">{e.date}</div>
            <div className="log-bucket">{e.bucket === 'learning' ? phaseName(e.phaseId) : 'Practical'}</div>
            <div className="log-duration">{fmtHrs(e.minutes)}</div>
            <div className="log-note">{e.note}</div>
            <button className="log-delete" onClick={() => remove(e.id)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

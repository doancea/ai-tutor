import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

function fmtHrs(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function Dashboard({ phases }) {
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    api.getTimeEntries().then(setTimeEntries).catch(console.error);
  }, []);

  if (!phases) return <div className="loading">Loading…</div>;

  const learningMinutesByPhase = {};
  let learningTotal = 0;
  let practicalTotal = 0;
  timeEntries.forEach((e) => {
    if (e.bucket === 'learning') {
      learningTotal += e.minutes;
      learningMinutesByPhase[e.phaseId] = (learningMinutesByPhase[e.phaseId] || 0) + e.minutes;
    } else {
      practicalTotal += e.minutes;
    }
  });

  const planMidHrs = phases.reduce((s, p) => s + (p.hoursTarget[0] + p.hoursTarget[1]) / 2, 0);
  const learningHrs = learningTotal / 60;
  const overallPct = Math.min(100, Math.round((learningHrs / planMidHrs) * 100));

  // Simple pace projection from average hrs/day since the first logged learning entry.
  const learningDates = timeEntries.filter((e) => e.bucket === 'learning').map((e) => e.date).sort();
  let projectionLabel = null;
  if (learningDates.length && learningHrs > 0) {
    const first = new Date(learningDates[0]);
    const today = new Date();
    const daysElapsed = Math.max(1, Math.round((today - first) / 86400000));
    const hrsPerDay = learningHrs / daysElapsed;
    const remainingHrs = Math.max(0, planMidHrs - learningHrs);
    if (hrsPerDay > 0) {
      const daysRemaining = Math.ceil(remainingHrs / hrsPerDay);
      const projDate = new Date(today.getTime() + daysRemaining * 86400000);
      projectionLabel = projDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">CCAR-F STUDY APP</div>
        <h1>Dashboard</h1>
      </header>

      <div className="totals-row">
        <div className="total-card">
          <div className="total-label">Learning hours logged</div>
          <div className="total-value">
            {fmtHrs(learningTotal)} <span className="total-sub-inline">/ ~{Math.round(planMidHrs)}h plan</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
        <div className="total-card">
          <div className="total-label">Hands-on practical (catch-all)</div>
          <div className="total-value">{fmtHrs(practicalTotal)}</div>
          <div className="total-sub">outside-plan AI project work</div>
        </div>
        <div className="total-card">
          <div className="total-label">Projected ready date</div>
          <div className="total-value">{projectionLabel || '—'}</div>
          <div className="total-sub">based on your logged pace so far</div>
        </div>
      </div>

      <section className="phase-list">
        {phases.map((p) => {
          const doneCount = p.tasks.filter((t) => t.done).length;
          const totalCount = p.tasks.length;
          const mins = learningMinutesByPhase[p.id] || 0;
          const midTarget = (p.hoursTarget[0] + p.hoursTarget[1]) / 2;
          const pct = Math.min(100, Math.round((mins / 60 / midTarget) * 100));
          return (
            <Link key={p.id} to={`/phase/${p.id}`} className={`phase-card ${p.stamp?.validated ? 'stamped' : ''}`}>
              <div className="phase-card-top">
                <span className="phase-title">{p.title}</span>
                {p.weight && <span className="phase-weight">{p.weight}</span>}
              </div>
              <div className="phase-card-mid">
                <span>
                  Tasks: {doneCount}/{totalCount}
                </span>
                <span>
                  Logged: {fmtHrs(mins)} / {p.hoursTarget[0]}–{p.hoursTarget[1]}h
                </span>
              </div>
              <div className="progress-track small">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              {p.stamp?.validated && <div className="stamp-mark">VALIDATED</div>}
            </Link>
          );
        })}
      </section>
    </div>
  );
}

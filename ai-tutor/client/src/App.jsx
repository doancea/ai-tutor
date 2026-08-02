import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Clock, Target, BookOpen } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import Phase from './pages/Phase.jsx';
import TimeLog from './pages/TimeLog.jsx';
import Diagnostics from './pages/Diagnostics.jsx';
import Resources from './pages/Resources.jsx';
import { api } from './api.js';

export default function App() {
  const [phases, setPhases] = useState(null);

  const reload = useCallback(() => {
    api.getPhases().then(setPhases).catch(console.error);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <div className="app-shell">
      <div className="grid-bg" />
      <nav className="sidebar">
        <div className="brand">
          <div className="brand-eyebrow">AI TUTOR</div>
          <div className="brand-title">Study Plan</div>
        </div>
        <NavLink to="/" end className="nav-link">
          <LayoutDashboard size={16} /> Dashboard
        </NavLink>
        <div className="nav-section-label">PHASES</div>
        {phases &&
          phases.map((p) => (
            <NavLink key={p.id} to={`/phase/${p.id}`} className="nav-link phase-link">
              <ListChecks size={15} />
              <span>{p.title}</span>
              {p.stamp?.validated && <span className="nav-stamp-dot" />}
            </NavLink>
          ))}
        <div className="nav-section-label">MORE</div>
        <NavLink to="/time" className="nav-link">
          <Clock size={16} /> Time Log
        </NavLink>
        <NavLink to="/diagnostics" className="nav-link">
          <Target size={16} /> Diagnostics
        </NavLink>
        <NavLink to="/resources" className="nav-link">
          <BookOpen size={16} /> Resources
        </NavLink>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard phases={phases} />} />
          <Route path="/phase/:id" element={<Phase phases={phases} reload={reload} />} />
          <Route path="/time" element={<TimeLog phases={phases} />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
    </div>
  );
}

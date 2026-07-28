import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const DOCS = [
  { label: 'Full Resource Guide', path: '/docs/claude-learning-resources.md' },
  { label: 'Phase 0 — Foundations', path: '/docs/units/phase-0-foundations.md' },
  { label: 'Phase 1 — Agentic Architecture', path: '/docs/units/phase-1-agentic-architecture.md' },
  { label: 'Phase 2 — Claude Code Config & Workflows', path: '/docs/units/phase-2-claude-code-configuration.md' },
  { label: 'Phase 3 — Prompt Engineering', path: '/docs/units/phase-3-prompt-engineering.md' },
  { label: 'Phase 4 — Tool Design & MCP', path: '/docs/units/phase-4-tool-design-mcp.md' },
  { label: 'Phase 5 — Context Management & Reliability', path: '/docs/units/phase-5-context-management.md' },
  { label: 'Phase 6 — Integration & Practice', path: '/docs/units/phase-6-integration-practice.md' },
];

export default function Resources() {
  const [active, setActive] = useState(DOCS[0]);
  const [content, setContent] = useState('Loading…');

  useEffect(() => {
    setContent('Loading…');
    fetch(active.path)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent('Could not load this document.'));
  }, [active]);

  return (
    <div className="page resources-page">
      <header className="page-header">
        <div className="eyebrow">RESOURCES</div>
        <h1>Reference Docs</h1>
      </header>
      <div className="resources-layout">
        <nav className="resources-nav">
          {DOCS.map((d) => (
            <button
              key={d.path}
              className={`resources-nav-item ${active.path === d.path ? 'active' : ''}`}
              onClick={() => setActive(d)}
            >
              {d.label}
            </button>
          ))}
        </nav>
        <div className="markdown-body card">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

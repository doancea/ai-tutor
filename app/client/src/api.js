const BASE = '/api';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

const jsonHeaders = { 'Content-Type': 'application/json' };

export const api = {
  getOnboardingStatus: () => fetch(`${BASE}/onboarding`).then(handle),
  submitInterview: (answers) =>
    fetch(`${BASE}/interview`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(answers) }).then(handle),

  getPhases: () => fetch(`${BASE}/phases`).then(handle),

  toggleTask: (id, done) =>
    fetch(`${BASE}/tasks/${id}`, { method: 'PATCH', headers: jsonHeaders, body: JSON.stringify({ done }) }).then(handle),

  answerQuiz: (questionId, selectedIndex) =>
    fetch(`${BASE}/quiz-answers`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify({ questionId, selectedIndex }) }).then(handle),

  resetQuiz: (phaseId) => fetch(`${BASE}/quiz-answers/phase/${phaseId}`, { method: 'DELETE' }).then(handle),

  stampPhase: (phaseId) => fetch(`${BASE}/stamps/${phaseId}`, { method: 'POST' }).then(handle),
  unstampPhase: (phaseId) => fetch(`${BASE}/stamps/${phaseId}`, { method: 'DELETE' }).then(handle),

  getTimeEntries: () => fetch(`${BASE}/time-entries`).then(handle),
  addTimeEntry: (entry) =>
    fetch(`${BASE}/time-entries`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(entry) }).then(handle),
  deleteTimeEntry: (id) => fetch(`${BASE}/time-entries/${id}`, { method: 'DELETE' }).then(handle),

  getDiagnostics: () => fetch(`${BASE}/diagnostics`).then(handle),
  addDiagnostic: (run) =>
    fetch(`${BASE}/diagnostics`, { method: 'POST', headers: jsonHeaders, body: JSON.stringify(run) }).then(handle),
};

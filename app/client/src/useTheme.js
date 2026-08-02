import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-tutor-theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) || getSystemTheme());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
      return;
    }
    // No stored preference — follow the OS setting live via the CSS media query,
    // and keep the toggle icon in sync if it changes.
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(getSystemTheme());
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}

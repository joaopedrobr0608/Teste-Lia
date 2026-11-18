'use client';

import { MoonIcon, SunIcon } from '@/components/ui/Icons';
import { THEME_STORAGE_KEY } from '@/data/site';

import styles from './ThemeToggle.module.css';

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
  };

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Sem acesso ao armazenamento, o tema vale apenas para esta página.
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Transição suave entre os temas, onde o navegador oferece suporte.
  if (document.startViewTransition && !reducedMotion) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

// O ícone é escolhido pelo CSS: o servidor não conhece o tema salvo no navegador,
// e assim o HTML é o mesmo nos dois lados, sem erro de hidratação.
export default function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Alternar entre modo claro e modo escuro"
      title="Alternar tema"
    >
      <MoonIcon className={styles.moon} />
      <SunIcon className={styles.sun} />
    </button>
  );
}

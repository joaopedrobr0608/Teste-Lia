'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ArrowIcon } from '@/components/ui/Icons';
import { projects } from '@/data/projects';

import styles from './QuestionCard.module.css';

// Cartão de vidro que alterna as perguntas dos projetos, continuando a frase do título.
// O avanço acontece quando a animação da barra termina: ela pausa com o cursor ou o foco do
// teclado sobre o cartão, preservando o tempo restante. A duração fica no CSS (.fill).
export default function QuestionCard() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <aside className={styles.card} aria-label="Perguntas que os projetos da liga exploram">
      <p className={styles.label}>Perguntas que exploramos</p>

      <Link key={project.slug} href={`/projetos/${project.slug}`} className={styles.link}>
        <span className={styles.question}>{project.question}</span>
        <span className={styles.project}>
          {project.title}
          <ArrowIcon />
        </span>
      </Link>

      <div className={styles.steps}>
        {projects.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            className={styles.step}
            aria-label={`Mostrar pergunta ${index + 1} de ${projects.length}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
          >
            <span className={styles.track}>
              {index === active && (
                <span
                  className={styles.fill}
                  onAnimationEnd={() => setActive((active + 1) % projects.length)}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

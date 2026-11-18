'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { ArrowIcon } from '@/components/ui/Icons';
import { projects } from '@/data/projects';
import { asset } from '@/lib/asset';

import styles from './ProjectShowcase.module.css';

// Palavra decorativa repetida no fundo do palco.
const BACKGROUND_WORD = 'INTELIGÊNCIA';
const BACKGROUND_LINES = 5;

// Palco que fica preso à tela enquanto a rolagem percorre os projetos, um de cada vez.
// Em telas pequenas ou baixas o CSS desfaz o palco e os projetos aparecem em sequência.
export default function ProjectShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const range = track.offsetHeight - stage.offsetHeight;
      const scrolled = stage.getBoundingClientRect().top - track.getBoundingClientRect().top;
      const progress = range > 0 ? Math.min(Math.max(scrolled / range, 0), 1) : 0;

      stage.style.setProperty('--progress', progress.toFixed(4));
      setActive(Math.min(Math.floor(progress * projects.length), projects.length - 1));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Pelo teclado, o foco pode cair num projeto ainda oculto: a rolagem leva até ele.
  const scrollToProject = (index: number) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || index === active) return;

    const range = track.offsetHeight - stage.offsetHeight;
    if (range <= 0) return;

    const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const offset = ((index + 0.5) / projects.length) * range;

    window.scrollTo({ top: trackTop - stickyTop + offset });
  };

  return (
    <div
      ref={trackRef}
      className={`${styles.track} reveal`}
      style={{ '--count': projects.length } as CSSProperties}
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.word} aria-hidden="true">
          {Array.from({ length: BACKGROUND_LINES }, (_, line) => (
            <span key={line} className={styles.wordLine}>
              {BACKGROUND_WORD}
            </span>
          ))}
        </div>
        <span className={styles.glow} aria-hidden="true" />

        <ol className={styles.slides}>
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={`${styles.slide} ${index === active ? styles.slideActive : ''}`}
            >
              <div className={styles.copy}>
                <span className={styles.kicker}>{project.areas[0]}</span>
                <h3 className={styles.name}>{project.title}</h3>
                <p className={styles.summary}>{project.description[0]}</p>
                <Link
                  href={`/projetos/${project.slug}`}
                  className={`btn btn-panel ${styles.link}`}
                  aria-label={`Ver projeto ${project.title}`}
                  onFocus={() => scrollToProject(index)}
                >
                  Ver projeto
                  <ArrowIcon />
                </Link>
              </div>

              <div className={styles.frame}>
                <Image
                  src={asset(project.image)}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 860px) 90vw, (max-width: 1240px) 60vw, 640px"
                />
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.rail} aria-hidden="true">
          <span className={styles.railTrack}>
            <span className={styles.railFill} />
          </span>
          <span className={styles.railCount}>0{active + 1}</span>
        </div>
      </div>
    </div>
  );
}

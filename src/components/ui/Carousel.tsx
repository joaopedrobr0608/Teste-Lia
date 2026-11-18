'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowIcon, ArrowLeftIcon } from './Icons';
import styles from './Carousel.module.css';

type CarouselProps = {
  label: string;
  children: ReactNode;
};

// Carrossel controlado pela pessoa: setas, arraste ou rolagem, sem movimento automático,
// para que os links dos cards nunca fujam do cursor.
export default function Carousel({ label, children }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      setEdges({
        start: scroller.scrollLeft <= 1,
        end: scroller.scrollLeft >= maxScroll - 1,
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    scroller.addEventListener('scroll', update, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener('scroll', update);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const item = scroller?.firstElementChild;
    if (!scroller || !item) return;

    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    scroller.scrollBy({ left: direction * (item.clientWidth + gap), behavior: 'smooth' });
  };

  return (
    <div role="group" aria-roledescription="carrossel" aria-label={label}>
      <div className={styles.scroller} ref={scrollerRef} tabIndex={0}>
        {children}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => move(-1)}
          disabled={edges.start}
          aria-label="Ver anteriores"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => move(1)}
          disabled={edges.end}
          aria-label="Ver próximos"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

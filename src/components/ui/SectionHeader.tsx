import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowIcon } from './Icons';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  description?: string;
  as?: 'h1' | 'h2';
  action?: { label: string; href: string };
};

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  as: Heading = 'h2',
  action,
}: SectionHeaderProps) {
  return (
    <header className={`${styles.header} reveal`}>
      <div className={styles.text}>
        <span className="eyebrow">{eyebrow}</span>
        <Heading id={titleId} className={Heading === 'h1' ? styles.pageTitle : styles.title}>
          {title}
        </Heading>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {action && (
        <Link href={action.href} className={`btn btn-ghost ${styles.action}`}>
          {action.label}
          <ArrowIcon />
        </Link>
      )}
    </header>
  );
}

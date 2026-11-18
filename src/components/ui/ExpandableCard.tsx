// Base de todos os cards do site. Em repouso é um card comum; ao receber o cursor
// (ou o foco do teclado), a superfície se expande e, se o card tiver `social`, revela os links
// no canto superior direito.

import type { ReactNode } from 'react';

import { InstagramIcon, LinkedinIcon } from './Icons';
import styles from './ExpandableCard.module.css';

type ExpandableCardProps = {
  social?: {
    name: string;
    instagram: string | null;
    linkedin: string | null;
  };
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

type SocialLinkProps = {
  label: string;
  name: string;
  href: string | null;
  children: ReactNode;
};

function SocialLink({ label, name, href, children }: SocialLinkProps) {
  if (!href) {
    return (
      <span
        className={`${styles.link} ${styles.linkDisabled}`}
        role="img"
        aria-label={`${label} de ${name}: link em breve`}
        title="Link em breve"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} de ${name}`}
      title={label}
    >
      {children}
    </a>
  );
}

export default function ExpandableCard({
  social,
  compact = false,
  className = '',
  children,
}: ExpandableCardProps) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''} ${className}`}>
      <span className={styles.surface} aria-hidden="true" />

      {social && (
        <div className={styles.social}>
          <SocialLink label="Instagram" name={social.name} href={social.instagram}>
            <InstagramIcon />
          </SocialLink>
          <SocialLink label="LinkedIn" name={social.name} href={social.linkedin}>
            <LinkedinIcon />
          </SocialLink>
        </div>
      )}

      {children}
    </article>
  );
}

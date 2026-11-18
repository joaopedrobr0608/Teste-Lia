// O arquivo do logo é branco. A máscara permite usá-lo em qualquer cor, inclusive sobre fundo claro.

import type { CSSProperties } from 'react';

import { asset } from '@/lib/asset';

import styles from './LiaLogo.module.css';

export default function LiaLogo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`${styles.logo} ${className}`}
      role="img"
      aria-label="LIA, Liga Acadêmica de Inteligência Artificial"
      style={{ '--lia-logo': `url(${asset('/logos/lia-logo.png')})` } as CSSProperties}
    />
  );
}

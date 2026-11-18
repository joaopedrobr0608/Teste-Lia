import type { CSSProperties } from 'react';

import { asset } from '@/lib/asset';

import styles from './InstitutionLogo.module.css';

type InstitutionLogoProps = {
  logo: { src: string; width: number; height: number };
  // Sem rótulo, o logo é decorativo (o nome já está no link que o envolve).
  label?: string;
  className?: string;
};

// Os arquivos dos logos são brancos: a máscara os pinta com a cor do texto ao redor,
// então o mesmo arquivo funciona no tema claro e no escuro.
export default function InstitutionLogo({ logo, label, className = '' }: InstitutionLogoProps) {
  return (
    <span
      className={`${styles.logo} ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      style={
        {
          '--logo': `url(${asset(logo.src)})`,
          aspectRatio: `${logo.width} / ${logo.height}`,
        } as CSSProperties
      }
    />
  );
}

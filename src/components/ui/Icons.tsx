// Ícones usados no site. São decorativos: o texto acessível fica em quem os utiliza.

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export const InstagramIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
  </svg>
);

export const SunIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...strokeProps} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

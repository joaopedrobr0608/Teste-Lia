/* Estrutura raiz compartilhada por todas as páginas da aplicação. */

import type { Metadata } from 'next';
import { Oxanium, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { THEME_STORAGE_KEY } from '@/data/site';

import './globals.css';

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const displayFont = Oxanium({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: {
    default: 'LIA | Liga Acadêmica de Inteligência Artificial',
    template: '%s | LIA',
  },
  description:
    'Conheça a Liga Acadêmica de Inteligência Artificial da Universidade CEUMA, seus projetos e as pessoas por trás deles.',
};

// Roda antes da primeira pintura: aplica o tema salvo sem piscar o tema claro.
const applySavedTheme = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body>
        <div className="sunlight" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

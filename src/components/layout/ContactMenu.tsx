'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

import { ArrowIcon, InstagramIcon, LinkedinIcon, MailIcon } from '@/components/ui/Icons';
import { site } from '@/data/site';

import styles from './ContactMenu.module.css';

const options = [
  { label: 'E-mail', detail: site.email, href: site.emailHref, Icon: MailIcon },
  { label: 'Instagram', detail: site.instagramHandle, href: site.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', detail: site.linkedinName, href: site.linkedin, Icon: LinkedinIcon },
];

const PANEL_WIDTH = 320;
// Altura aproximada da janela: decide se ela abre abaixo ou acima do botão.
const PANEL_HEIGHT = 290;
const GAP = 10;
const SCREEN_MARGIN = 12;

type ContactMenuProps = {
  className?: string;
  children: ReactNode;
};

// Botão de contato que abre uma janela flutuante com as opções de e-mail, Instagram e LinkedIn.
// O popover nativo fica acima de tudo, inclusive de painéis com overflow oculto, e já fecha
// com um clique fora ou com a tecla Esc.
export default function ContactMenu({ className = '', children }: ContactMenuProps) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const placePanel = () => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const bounds = trigger.getBoundingClientRect();
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = window.innerHeight;
    const width = Math.min(PANEL_WIDTH, screenWidth - SCREEN_MARGIN * 2);
    const left = Math.min(
      Math.max(bounds.right - width, SCREEN_MARGIN),
      screenWidth - width - SCREEN_MARGIN,
    );
    const fitsBelow = bounds.bottom + GAP + PANEL_HEIGHT <= screenHeight;
    const opensUp = !fitsBelow && bounds.top > PANEL_HEIGHT;

    panel.style.width = `${width}px`;
    panel.style.left = `${left}px`;
    panel.style.top = opensUp ? 'auto' : `${bounds.bottom + GAP}px`;
    panel.style.bottom = opensUp ? `${screenHeight - bounds.top + GAP}px` : 'auto';
  };

  // Aberta, a janela acompanha o botão; se ele sair de cena (menu do celular), ela fecha.
  useEffect(() => {
    if (!open) return;

    const onViewportChange = () => {
      if (triggerRef.current?.getClientRects().length) placePanel();
      else panelRef.current?.hidePopover();
    };

    window.addEventListener('scroll', onViewportChange, { passive: true });
    window.addEventListener('resize', onViewportChange);

    return () => {
      window.removeEventListener('scroll', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`btn btn-primary ${className}`}
        popoverTarget={panelId}
      >
        {children}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        role="dialog"
        aria-labelledby={`${panelId}-titulo`}
        className={styles.panel}
        onBeforeToggle={(event) => {
          if (event.newState === 'open') placePanel();
        }}
        onToggle={(event) => setOpen(event.newState === 'open')}
      >
        <p id={`${panelId}-titulo`} className={styles.title}>
          Como prefere falar com a LIA?
        </p>

        {options.map(({ label, detail, href, Icon }) => (
          <a
            key={label}
            href={href}
            className={styles.option}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => panelRef.current?.hidePopover()}
          >
            <span className={styles.icon}>
              <Icon />
            </span>
            <span className={styles.text}>
              <span className={styles.label}>{label}</span>
              <span className={styles.detail}>{detail}</span>
            </span>
            <ArrowIcon className={styles.arrow} />
          </a>
        ))}
      </div>
    </>
  );
}

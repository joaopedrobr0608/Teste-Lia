'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import LiaLogo from '@/components/ui/LiaLogo';

import ContactMenu from './ContactMenu';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Início', href: '/', match: (path: string) => path === '/' },
  { label: 'Sobre', href: '/#sobre', match: () => false },
  { label: 'Projetos', href: '/projetos', match: (path: string) => path.startsWith('/projetos') },
  { label: 'Equipe', href: '/equipe', match: (path: string) => path.startsWith('/equipe') },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // A barra ganha vidro e sombra apenas depois que a página começa a rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.bar} ${scrolled || menuOpen ? styles.barScrolled : ''}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <LiaLogo />
        </Link>

        <nav
          id="menu-principal"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          <ul className={styles.list}>
            {links.map((link) => {
              const active = link.match(pathname);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${active ? styles.linkActive : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ContactMenu className={styles.cta}>Fale conosco</ContactMenu>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

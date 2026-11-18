import Link from 'next/link';

import InstitutionLogo from '@/components/ui/InstitutionLogo';
import { ArrowIcon, InstagramIcon, LinkedinIcon, MailIcon } from '@/components/ui/Icons';
import LiaLogo from '@/components/ui/LiaLogo';
import { site } from '@/data/site';

import ContactMenu from './ContactMenu';
import styles from './Footer.module.css';

const navigation = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Projetos', href: '/projetos' },
  { label: 'Equipe', href: '/equipe' },
];

const contacts = [
  { label: 'E-mail', href: site.emailHref, Icon: MailIcon },
  { label: 'Instagram', href: site.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedinIcon },
];

// Rodapé compacto: chamada de contato numa faixa só, marca + três colunas de links e a base.
export default function Footer() {
  return (
    <footer className={`container ${styles.wrapper}`}>
      <div className={styles.panel}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Tem uma ideia ou quer conhecer a liga?</h2>
          <ContactMenu>
            Falar com a LIA
            <ArrowIcon />
          </ContactMenu>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <LiaLogo className={styles.logo} />
            <p>
              {site.fullName} da {site.university}.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h3 className={styles.heading}>Navegação</h3>
            <ul className={`${styles.list} ${styles.listColumns}`}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={styles.heading}>Contato</h3>
            <ul className={styles.list}>
              {contacts.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                    <Icon /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Instituições</h3>
            <ul className={styles.list}>
              {site.institutions.map((institution) => (
                <li key={institution.href}>
                  <a
                    href={institution.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {institution.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {site.name}. Todos os direitos reservados.</p>
          <div className={styles.logos}>
            {site.institutions.flatMap((institution) =>
              'logo' in institution
                ? [
                    <InstitutionLogo
                      key={institution.href}
                      logo={institution.logo}
                      label={institution.name}
                      className={styles.bottomLogo}
                    />,
                  ]
                : [],
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';

import MemberCard from '@/components/team/MemberCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { projectOnlyMembers, secretariat } from '@/data/members';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Equipe',
  description: 'Conheça a equipe de secretaria da LIA e os integrantes de cada projeto.',
};

export default function TeamPage() {
  return (
    <div className={`container ${styles.page}`}>
      <SectionHeader
        as="h1"
        eyebrow="Equipe"
        titleId="equipe-titulo"
        title={
          <>
            As pessoas por trás da <em>LIA.</em>
          </>
        }
        description="Da organização da liga ao desenvolvimento dos projetos, conheça quem transforma ideias em prática."
      />

      <section aria-labelledby="secretaria-titulo">
        <h2 id="secretaria-titulo" className={`${styles.groupTitle} reveal`}>
          Equipe de secretaria
        </h2>
        <ul className={`${styles.grid} ${styles.gridFeatured} reveal`}>
          {secretariat.map((member) => (
            <li key={member.id}>
              <MemberCard member={member} showProjects />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.group} aria-labelledby="integrantes-titulo">
        <h2 id="integrantes-titulo" className={`${styles.groupTitle} reveal`}>
          Integrantes dos projetos
        </h2>
        <ul className={`${styles.grid} reveal`}>
          {projectOnlyMembers.map((member) => (
            <li key={member.id}>
              <MemberCard member={member} showProjects />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

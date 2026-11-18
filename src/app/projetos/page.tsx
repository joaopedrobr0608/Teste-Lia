import type { Metadata } from 'next';

import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { projects } from '@/data/projects';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Conheça os projetos de Inteligência Artificial desenvolvidos pela LIA.',
};

export default function ProjectsPage() {
  return (
    <div className={`container ${styles.page}`}>
      <SectionHeader
        as="h1"
        eyebrow="Projetos"
        titleId="projetos-titulo"
        title={
          <>
            O que a LIA <em>constrói.</em>
          </>
        }
        description="Cada projeto reúne estudantes da liga em torno de um desafio real. Veja o que cada equipe desenvolve e quem participa."
      />

      <ul className={styles.list}>
        {projects.map((project, index) => (
          <li key={project.slug} className="reveal">
            <ProjectCard project={project} eagerImage={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}

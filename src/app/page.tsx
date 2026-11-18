import AboutSection from '@/components/home/AboutSection';
import Hero from '@/components/home/Hero';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import SectionHeader from '@/components/ui/SectionHeader';

import styles from './page.module.css';

// A equipe tem página própria (/equipe) e não aparece mais aqui.
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />

      <section
        id="projetos"
        className={`section ${styles.projects}`}
        aria-labelledby="projetos-titulo"
      >
        <span className={styles.backdrop} aria-hidden="true">
          <span className={styles.lights} />
        </span>

        <div className="container">
          <SectionHeader
            eyebrow="Projetos"
            titleId="projetos-titulo"
            title={
              <>
                Ideias que saem do <em>papel.</em>
              </>
            }
            description="Conhecimento também se constrói na prática. Estes são os trabalhos desenvolvidos pela liga."
            action={{ label: 'Ver todos os projetos', href: '/projetos' }}
          />

          <ProjectShowcase />
        </div>
      </section>
    </>
  );
}

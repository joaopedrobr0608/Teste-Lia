import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import MemberCard from '@/components/team/MemberCard';
import Carousel from '@/components/ui/Carousel';
import { ArrowIcon, ArrowLeftIcon } from '@/components/ui/Icons';
import { getNextProject, getProject, getProjectMembers, projects } from '@/data/projects';
import { asset } from '@/lib/asset';

import styles from './page.module.css';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/projetos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  return project ? { title: project.title, description: project.description[0] } : {};
}

export default async function ProjectPage({ params }: PageProps<'/projetos/[slug]'>) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article className={`container ${styles.page}`}>
      <Link href="/projetos" className={styles.back}>
        <ArrowLeftIcon />
        Todos os projetos
      </Link>

      <header className={styles.header}>
        <div className={styles.intro}>
          <h1 className={styles.title}>{project.title}</h1>

          {project.description.map((paragraph) => (
            <p key={paragraph} className={styles.description}>
              {paragraph}
            </p>
          ))}

          <ul className={styles.areas} aria-label="Áreas do projeto">
            {project.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
          <Image
            src={asset(project.image)}
            alt={project.imageAlt}
            fill
            preload
            sizes="(max-width: 860px) 90vw, 560px"
          />
        </div>
      </header>

      {project.gallery.length > 0 && (
        <section className={styles.section} aria-labelledby="galeria-titulo">
          <h2 id="galeria-titulo" className={styles.sectionTitle}>
            Fotos
          </h2>
          <Carousel label={`Fotos do projeto ${project.title}`}>
            {project.gallery.map((photo, index) => (
              <div key={photo} className={styles.photo}>
                <Image
                  src={asset(photo)}
                  alt={`Foto ${index + 1} do projeto ${project.title}`}
                  fill
                  sizes="(max-width: 600px) 72vw, 300px"
                />
              </div>
            ))}
          </Carousel>
        </section>
      )}

      <section className={styles.section} aria-labelledby="equipe-titulo">
        <h2 id="equipe-titulo" className={`${styles.sectionTitle} reveal`}>
          Equipe do projeto
        </h2>

        <ul className={`${styles.team} reveal`}>
          {getProjectMembers(project).map((member) => (
            <li key={member.id}>
              <MemberCard member={member} />
            </li>
          ))}
          {!project.teamComplete && <li className={styles.pending}>Mais integrantes em breve</li>}
        </ul>
      </section>

      <Link href={`/projetos/${next.slug}`} className={styles.next}>
        <span className={styles.nextLabel}>Próximo projeto</span>
        <span className={styles.nextTitle}>
          {next.title}
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}

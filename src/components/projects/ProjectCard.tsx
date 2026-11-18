import Image from 'next/image';
import Link from 'next/link';

import MemberCard from '@/components/team/MemberCard';
import ExpandableCard from '@/components/ui/ExpandableCard';
import { ArrowIcon } from '@/components/ui/Icons';
import { getProjectMembers, type Project } from '@/data/projects';
import { asset } from '@/lib/asset';

import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
  // Use no primeiro card da página, cuja imagem já aparece sem rolar.
  eagerImage?: boolean;
};

export default function ProjectCard({ project, eagerImage = false }: ProjectCardProps) {
  const href = `/projetos/${project.slug}`;

  return (
    <ExpandableCard className={styles.card}>
      <div className={styles.layout}>
        <div className={styles.media}>
          <Image
            src={asset(project.image)}
            alt={project.imageAlt}
            fill
            loading={eagerImage ? 'eager' : undefined}
            sizes="(max-width: 860px) 90vw, 480px"
          />
        </div>

        <div className={styles.content}>
          {/* O ::after do link cobre o card inteiro; os cards de membros ficam acima dele. */}
          <h2 className={styles.title}>
            <Link href={href} className={styles.titleLink}>
              {project.title}
            </Link>
          </h2>

          <p className={styles.description}>{project.description[0]}</p>

          <h3 className={styles.teamLabel}>Equipe</h3>
          <ul className={styles.team}>
            {getProjectMembers(project).map((member) => (
              <li key={member.id}>
                <MemberCard member={member} compact />
              </li>
            ))}
            {!project.teamComplete && <li className={styles.pending}>Mais integrantes em breve</li>}
          </ul>

          <span className={styles.more}>
            Ver projeto
            <ArrowIcon />
          </span>
        </div>
      </div>
    </ExpandableCard>
  );
}

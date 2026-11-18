import Image from 'next/image';
import Link from 'next/link';

import ExpandableCard from '@/components/ui/ExpandableCard';
import type { Member } from '@/data/members';
import { getMemberProjects } from '@/data/projects';
import { asset } from '@/lib/asset';

import styles from './MemberCard.module.css';

type MemberCardProps = {
  member: Member;
  compact?: boolean;
  showProjects?: boolean;
};

const fallbackRole = 'Integrante';

function Portrait({ member, sizes }: { member: Member; sizes: string }) {
  if (member.photo) {
    return <Image src={asset(member.photo)} alt={`Foto de ${member.name}`} fill sizes={sizes} />;
  }

  return <span aria-hidden="true">{member.name.charAt(0)}</span>;
}

export default function MemberCard({ member, compact = false, showProjects }: MemberCardProps) {
  const memberProjects = showProjects ? getMemberProjects(member.id) : [];

  if (compact) {
    return (
      <ExpandableCard compact social={member} className={styles.compactCard}>
        <div className={styles.compactBody}>
          <div className={styles.avatar}>
            <Portrait member={member} sizes="44px" />
          </div>
          <div className={styles.compactText}>
            <h4 className={styles.compactName}>{member.name}</h4>
            <p className={styles.role}>{member.role ?? fallbackRole}</p>
          </div>
        </div>
      </ExpandableCard>
    );
  }

  return (
    <ExpandableCard social={member} className={styles.card}>
      <div className={styles.body}>
        <div className={styles.portrait}>
          <Portrait member={member} sizes="(max-width: 600px) 72vw, 300px" />
        </div>

        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.role}>{member.role ?? fallbackRole}</p>

        {memberProjects.length > 0 && (
          <ul className={styles.projects}>
            {memberProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projetos/${project.slug}`} className={styles.projectTag}>
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ExpandableCard>
  );
}

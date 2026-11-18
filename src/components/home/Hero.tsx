import Link from 'next/link';

import { ArrowIcon } from '@/components/ui/Icons';
import { site } from '@/data/site';

import DotField from './DotField';
import styles from './Hero.module.css';
import QuestionCard from './QuestionCard';

export default function Hero() {
  return (
    <section className={`container ${styles.wrapper}`} aria-labelledby="hero-title">
      <div className={styles.panel}>
        <DotField />
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.lineOne}>A IA começa com perguntas.</span>
            <span className={styles.lineTwo}>Nós exploramos possibilidades.</span>
          </h1>

          <p className={styles.description}>
            Somos a {site.fullName}: estudantes que aprendem, experimentam e constroem projetos
            reais com tecnologia.
          </p>

          <div className={styles.actions}>
            <Link href="/projetos" className="btn btn-primary">
              Ver projetos
              <ArrowIcon />
            </Link>
            <Link href="/equipe" className="btn btn-panel">
              Conhecer a equipe
            </Link>
          </div>
        </div>

        {/* Em avaliação: para voltar ao hero sem o cartão, basta remover esta linha. */}
        <QuestionCard />
      </div>
    </section>
  );
}

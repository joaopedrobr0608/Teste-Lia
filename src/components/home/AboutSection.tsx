import { stats } from '@/data/projects';

import styles from './AboutSection.module.css';

const pillars = [
  {
    title: 'Aprender',
    description:
      'Estudamos Inteligência Artificial e compartilhamos conhecimentos que vão além da sala de aula.',
  },
  {
    title: 'Construir',
    description:
      'Colocamos ideias em prática por meio de pesquisas, experimentos e soluções tecnológicas.',
  },
  {
    title: 'Colaborar',
    description:
      'Reunimos pessoas com interesses em comum, incentivando a troca de experiências em equipe.',
  },
];

const numbers = [
  { value: stats.projects, label: 'projetos' },
  { value: stats.people, label: 'integrantes' },
  { value: stats.areas, label: 'áreas de estudo' },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-titulo">
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.intro} reveal`}>
          <span className="eyebrow">Sobre a LIA</span>
          <h2 id="sobre-titulo" className={styles.title}>
            Inteligência que <em>sai da teoria.</em>
          </h2>
          <p className={styles.description}>
            Aqui, a curiosidade se transforma em aprendizado e as ideias ganham espaço para crescer
            dentro da Universidade CEUMA.
          </p>

          <dl className={styles.numbers}>
            {numbers.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className={`${styles.pillars} reveal`}>
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className={styles.pillar}>
              <span className={styles.index}>0{index + 1}</span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

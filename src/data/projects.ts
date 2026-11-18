// Projetos da liga. Cada item gera um card em /projetos e uma página em /projetos/[slug].
//   question:     pergunta exibida no cartão do hero, que leva à página do projeto
//   description:  um item por parágrafo; hoje é um resumo simples, até chegarem os documentos das equipes
//   gallery:      fotos extras do projeto; com 1 ou mais, a página exibe a galeria
//   teamComplete: use false enquanto faltar confirmar integrantes

import { members, type Member } from './members';

export type Project = {
  slug: string;
  title: string;
  question: string;
  description: string[];
  areas: string[];
  image: string;
  imageAlt: string;
  gallery: string[];
  memberIds: string[];
  teamComplete: boolean;
};

export const projects: Project[] = [
  {
    slug: 'reconhecimento-facial',
    title: 'Reconhecimento Facial',
    question: 'Como uma máquina reconhece um rosto?',
    description: ['Projeto sobre o uso de visão computacional para identificar rostos em imagens.'],
    areas: ['Visão computacional', 'Aprendizado de máquina'],
    image: '/images/projects/Reconhecimento-Facial.png',
    imageAlt: 'Ilustração de um rosto sendo escaneado dentro de uma moldura de foco',
    gallery: [],
    memberIds: ['icaro', 'anderson', 'paulo', 'joao', 'davi'],
    teamComplete: true,
  },
  {
    slug: 'deteccao-de-fake-news',
    title: 'Detecção de Fake News',
    question: 'Dá para identificar uma notícia falsa?',
    description: [
      'Projeto sobre o uso de inteligência artificial para identificar notícias falsas.',
    ],
    areas: ['Processamento de linguagem natural', 'Aprendizado de máquina'],
    image: '/images/projects/FakeNews.png',
    imageAlt: 'Ilustração de um documento analisado por uma lupa, com um selo de verificação',
    gallery: [],
    memberIds: ['isaque', 'renato', 'hugo'],
    teamComplete: true,
  },
  {
    slug: 'libras-arcade',
    title: 'Libras Arcade',
    question: 'Um jogo pode aproximar as pessoas da Libras?',
    description: [
      'Projeto que usa jogos e tecnologia para aproximar as pessoas da Língua Brasileira de Sinais.',
    ],
    areas: ['Acessibilidade', 'Jogos'],
    image: '/images/projects/Libras.png',
    imageAlt: 'Ilustração de duas mãos fazendo sinais em Libras',
    gallery: [],
    memberIds: ['samuel', 'ariel', 'welson'],
    teamComplete: true,
  },
  {
    slug: 'ia-conversacional',
    title: 'IA Conversacional',
    question: 'Como uma IA entende uma pergunta?',
    description: [
      'Projeto sobre assistentes que entendem perguntas e respondem em linguagem natural.',
    ],
    areas: ['Processamento de linguagem natural', 'Assistentes virtuais'],
    image: '/images/projects/IA-Conversacional.png',
    imageAlt: 'Ilustração de um robô sorridente ao lado de um balão de conversa',
    gallery: [],
    memberIds: ['samyr', 'odorlan'],
    teamComplete: true,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const getProjectMembers = (project: Project): Member[] =>
  project.memberIds.flatMap((id) => members.filter((item) => item.id === id));

export const getMemberProjects = (memberId: string) =>
  projects.filter((project) => project.memberIds.includes(memberId));

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
};

// Números exibidos no site: sempre calculados a partir dos dados, nunca digitados à mão.
export const stats = {
  projects: projects.length,
  people: members.length,
  areas: new Set(projects.flatMap((project) => project.areas)).size,
};

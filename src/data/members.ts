// Integrantes da liga. Para atualizar um card, basta preencher os campos abaixo:
//   photo:     caminho da foto em /public (ex.: '/images/team/anderson.jpg')
//   instagram: URL completa do perfil
//   linkedin:  URL completa do perfil
// Enquanto um link estiver como null, o ícone aparece desativado ("Link em breve").

export type Member = {
  id: string;
  name: string;
  role: string | null;
  secretariat: boolean;
  photo: string | null;
  instagram: string | null;
  linkedin: string | null;
};

type MemberInput = Pick<Member, 'id' | 'name'> & Partial<Member>;

const member = (input: MemberInput): Member => ({
  role: null,
  secretariat: false,
  photo: null,
  instagram: null,
  linkedin: null,
  ...input,
});

export const members: Member[] = [
  // Equipe de secretaria
  member({ id: 'samyr', name: 'Társio Samyr', role: 'Líder', secretariat: true }),
  member({ id: 'rafael', name: 'Rafael Tajira', role: 'Vice-líder', secretariat: true }),
  member({ id: 'icaro', name: 'Ícaro Lucas', role: 'Secretário', secretariat: true }),
  member({ id: 'anderson', name: 'Anderson Matos', role: 'Vice-secretário', secretariat: true }),
  member({ id: 'isaque', name: 'Isaque Silva', role: 'Diretor científico', secretariat: true }),
  member({
    id: 'renato',
    name: 'Renato Simões',
    role: 'Vice-diretor científico',
    secretariat: true,
  }),

  // Integrantes dos projetos
  member({ id: 'paulo', name: 'Paulo Henrique' }),
  member({ id: 'joao', name: 'João Pedro' }),
  member({ id: 'davi', name: 'Pedro Davi' }),
  member({ id: 'hugo', name: 'Hugo Leonardo' }),
  member({ id: 'samuel', name: 'Samuel Gomes' }),
  member({ id: 'ariel', name: 'Ariel Asafe' }),
  member({ id: 'welson', name: 'Welson Felipe' }),
  member({ id: 'odorlan', name: 'Odorlan Yves' }),
];

export const secretariat = members.filter((item) => item.secretariat);
export const projectOnlyMembers = members.filter((item) => !item.secretariat);

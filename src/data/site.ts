// Chave em que a escolha de tema da pessoa fica salva no navegador.
export const THEME_STORAGE_KEY = 'lia-theme';

// Contatos e links institucionais usados em todo o site.
export const site = {
  name: 'LIA',
  fullName: 'Liga Acadêmica de Inteligência Artificial',
  university: 'Universidade CEUMA',
  email: 'lia.tech.oficial@gmail.com',
  emailHref: 'https://mail.google.com/mail/?view=cm&fs=1&to=lia.tech.oficial@gmail.com',
  instagram: 'https://www.instagram.com/lia.ceuma/',
  instagramHandle: '@lia.ceuma',
  linkedin: 'https://www.linkedin.com/in/lia-inteligencia-artificial-25a581450/',
  linkedinName: 'LIA - Inteligência Artificial',
  // Instituições ligadas à trajetória da liga (não são apresentadas como parceiras).
  institutions: [
    {
      name: 'Universidade CEUMA',
      href: 'https://www.extranet.ceuma.br/hotsite/',
      logo: { src: '/logos/ceuma-logo.png', width: 927, height: 200 },
    },
    {
      name: 'Oxygeni Hub',
      href: 'https://oxygeni.com.br/',
      logo: { src: '/logos/oxygen-hub-logo.png', width: 663, height: 200 },
    },
    { name: 'INCODE', href: 'https://incode-tech-school.com.br/' },
  ],
} as const;

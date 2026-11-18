import type { NextConfig } from 'next';

// Subpasta onde o site fica publicado. No GitHub Pages, um repositório comum
// (ex.: "lia-site") é servido em usuario.github.io/lia-site, então o basePath
// precisa ser "/lia-site". O workflow do GitHub Actions preenche esta variável
// sozinho. Em `npm run dev` ela fica vazia e o site roda em localhost:3000.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Gera HTML/CSS/JS estáticos na pasta "out", que é o que o GitHub Pages sabe servir.
  output: 'export',
  basePath,
  // Gera /projetos/index.html em vez de /projetos.html: o GitHub Pages
  // abre essas URLs sem precisar de configuração extra.
  trailingSlash: true,
  // O GitHub Pages não tem servidor para otimizar imagens sob demanda.
  images: { unoptimized: true },
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents e partialPrefetching foram removidos: dependem de um servidor
  // Node.js e não funcionam com output: 'export'.
};

export default nextConfig;

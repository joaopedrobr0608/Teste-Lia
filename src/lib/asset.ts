/*
 * Prefixa caminhos de arquivos da pasta /public com o basePath do site.
 *
 * No GitHub Pages, um repositório comum é publicado em uma subpasta
 * (ex.: usuario.github.io/lia-site). O Next adiciona essa subpasta sozinho
 * nos links e nos arquivos de /_next, mas NÃO em strings como '/images/x.png'
 * usadas no <Image> ou em CSS. Esta função resolve isso.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  // Só mexe em caminhos absolutos locais; URLs externas passam direto.
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE_PATH}${path}`;
}

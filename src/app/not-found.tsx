import Link from 'next/link';

import { ArrowIcon } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <div className="container section">
      <span className="eyebrow">Erro 404</span>
      <h1 style={{ margin: '16px 0 24px', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Esta página não foi encontrada.
      </h1>
      <Link href="/" className="btn btn-primary">
        Voltar ao início
        <ArrowIcon />
      </Link>
    </div>
  );
}

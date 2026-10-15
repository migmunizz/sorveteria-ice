import { Link } from 'react-router-dom';
import { Mascot } from '../components/Mascot';
import { ButtonLink } from '../components/ui/Button';
import { FlavorCard } from '../components/ui/FlavorCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { useAsync } from '../hooks/useAsync';
import { getFlavors } from '../services/flavors';
import { site } from '../config/site';

const testimonials = [
  { name: 'Ana P.', text: 'Chegou geladinho mesmo no calor da praia. O de pistache é surreal!' },
  { name: 'Lucas M.', text: 'Pedido rápido pelo celular, sem complicação. Virou rotina de domingo.' },
  { name: 'Bia R.', text: 'O açaí é muito bem servido e o mascote é a coisa mais fofa.' },
];

export default function Home() {
  const { data, loading, error, retry } = useAsync(getFlavors);
  const highlights = data?.filter((f) => f.highlight).slice(0, 4) ?? [];
  const promos = data?.filter((f) => f.promo) ?? [];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <h1>Gelado, cremoso e <span>na sua porta.</span></h1>
            <p className="muted" style={{ fontSize: '1.15rem' }}>
              Sorvetes, casquinhas, picolés e açaí da {site.fullName}. Peça online e receba em até {site.deliveryRadiusKm} km no litoral de SP.
            </p>
            <div className="hero__actions">
              <ButtonLink to="/cardapio">Ver cardápio</ButtonLink>
              <ButtonLink to="/sobre" variant="secondary">Conheça a gente</ButtonLink>
            </div>
          </div>
          <div className="hero__mascot">
            <Mascot pose="waving" size={380} float />
          </div>
        </div>
      </section>

      <section className="section section--primary">
        <div className="container">
          <div className="row between" style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{ margin: 0 }}>Sabores em destaque</h2>
            <Link to="/cardapio" style={{ color: 'var(--color-text)', fontWeight: 700 }}>Ver todos →</Link>
          </div>
          {loading && <SkeletonGrid count={4} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {data && <div className="grid">{highlights.map((f) => <FlavorCard key={f.id} flavor={f} />)}</div>}
        </div>
      </section>

      {promos.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>Promoções da semana</h2>
            <div className="grid">{promos.map((f) => <FlavorCard key={f.id} flavor={f} />)}</div>
          </div>
        </section>
      )}

      <section className="section section--primary">
        <div className="container">
          <h2>Quem prova, volta</h2>
          <div className="testimonials">
            {testimonials.map((t) => (
              <figure key={t.name} className="card card--pad" style={{ margin: 0 }}>
                <blockquote style={{ margin: 0 }}>“{t.text}”</blockquote>
                <figcaption className="muted small" style={{ marginTop: 'var(--space-3)' }}>— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center stack" style={{ alignItems: 'center' }}>
          <h2>Bateu vontade?</h2>
          <p className="muted">Fale com a gente pelo WhatsApp ou faça seu pedido agora mesmo.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <ButtonLink to="/cardapio">Pedir agora</ButtonLink>
            <ButtonLink to="/contato" variant="secondary">Contato</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

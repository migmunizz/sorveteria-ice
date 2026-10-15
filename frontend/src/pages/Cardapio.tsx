import { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { FlavorCard } from '../components/ui/FlavorCard';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { EmptyState, ErrorState } from '../components/ui/States';
import { useAsync } from '../hooks/useAsync';
import { getFlavors } from '../services/flavors';
import { categories } from '../mocks/flavors';

export default function Cardapio() {
  const { data, loading, error, retry } = useAsync(getFlavors);
  const [cat, setCat] = useState<string>('todos');
  const [q, setQ] = useState('');

  const list = (data ?? []).filter(
    (f) => (cat === 'todos' || f.category === cat) && f.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="container section page-title">
      <div className="row between" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <h1>Cardápio</h1>
          <p className="muted">Escolha seus favoritos e monte o pedido.</p>
        </div>
        <Mascot pose="eating" size={140} />
      </div>

      <div className="field" style={{ maxWidth: 360 }}>
        <label htmlFor="busca" className="sr-only">Buscar</label>
        <input id="busca" className="input" placeholder="Buscar sabor..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="chips" role="group" aria-label="Filtrar por categoria">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${cat === c.id ? 'chip--active' : ''}`}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <SkeletonGrid />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {data && list.length === 0 && <EmptyState title="Nenhum sabor encontrado" text="Tente outra categoria ou busca." />}
      {data && list.length > 0 && <div className="grid">{list.map((f) => <FlavorCard key={f.id} flavor={f} />)}</div>}
    </div>
  );
}

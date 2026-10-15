import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FlavorImage } from '../components/ui/FlavorCard';
import { Badge, PriceBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { useAsync } from '../hooks/useAsync';
import { getFlavor } from '../services/flavors';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Produto() {
  const { id = '' } = useParams();
  const { data: f, loading, error, retry } = useAsync(() => getFlavor(id), [id]);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const toast = useToast();

  return (
    <div className="container section page-title">
      <p><Link to="/cardapio">← Voltar ao cardápio</Link></p>
      {loading && <Skeleton height={360} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {f && (
        <div className="two-col">
          <FlavorImage flavor={f} className="card flavor-card__img" />
          <div className="card card--pad stack">
            <div className="row">
              {f.promo && <Badge kind="promo" />}
              {f.isNew && <Badge kind="new" />}
            </div>
            <h1 style={{ fontSize: 'var(--text-h2)', margin: 0 }}>{f.name}</h1>
            <p className="muted" style={{ margin: 0 }}>{f.description}</p>
            <PriceBadge value={f.price} />
            {f.available ? (
              <>
                <div className="row">
                  <span>Quantidade:</span>
                  <div className="qty">
                    <button aria-label="Diminuir" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                    <span aria-live="polite">{qty}</span>
                    <button aria-label="Aumentar" onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>
                <Button block onClick={() => { add(f, qty); toast('success', `${qty}× ${f.name} no carrinho!`); }}>
                  Adicionar ao carrinho
                </Button>
              </>
            ) : (
              <p className="field__error"><span aria-hidden="true">✖</span>Este produto está esgotado no momento.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

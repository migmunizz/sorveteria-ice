import { Link } from 'react-router-dom';
import type { Flavor } from '../../types';
import { categoryVisual } from '../../mocks/flavors';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Badge, PriceBadge } from './Badge';
import { Button } from './Button';

export function FlavorImage({ flavor, className }: { flavor: Pick<Flavor, 'imageUrl' | 'category' | 'name'>; className?: string }) {
  const v = categoryVisual[flavor.category];
  if (flavor.imageUrl) return <img src={flavor.imageUrl} alt={flavor.name} className={className} />;
  return <div className={className} style={{ background: v.bg }} role="img" aria-label={flavor.name}>{v.emoji}</div>;
}

export function FlavorCard({ flavor }: { flavor: Flavor }) {
  const { add } = useCart();
  const toast = useToast();

  return (
    <article className="card flavor-card">
      {flavor.promo ? <Badge kind="promo" /> : flavor.isNew ? <Badge kind="new" /> : null}
      <Link to={`/produto/${flavor.id}`} className="flavor-card__link" aria-label={`Ver ${flavor.name}`}>
        <FlavorImage flavor={flavor} className="flavor-card__img" />
      </Link>
      <div className="flavor-card__body">
        <h3><Link to={`/produto/${flavor.id}`} style={{ color: 'inherit' }}>{flavor.name}</Link></h3>
        <p className="muted small">{flavor.description}</p>
        <div className="flavor-card__footer">
          <PriceBadge value={flavor.price} />
          <Button
            size="sm"
            disabled={!flavor.available}
            onClick={() => { add(flavor); toast('success', `${flavor.name} foi para o carrinho!`); }}
          >
            {flavor.available ? 'Adicionar' : 'Esgotado'}
          </Button>
        </div>
      </div>
    </article>
  );
}

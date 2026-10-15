import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categoryVisual } from '../mocks/flavors';
import { Button, ButtonLink } from '../components/ui/Button';
import { PriceBadge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/States';
import { formatPrice } from '../utils/format';
import { site } from '../config/site';

export default function Carrinho() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container section">
        <EmptyState title="Seu carrinho está vazio" text="Que tal dar uma olhada no cardápio?" action={<ButtonLink to="/cardapio">Ver cardápio</ButtonLink>} />
      </div>
    );
  }

  return (
    <div className="container section page-title">
      <h1>Carrinho</h1>
      <div className="two-col">
        <div className="card card--pad">
          {items.map((i) => (
            <div key={i.flavorId} className="cart-item">
              <div className="cart-item__emoji" style={{ background: categoryVisual[i.category].bg }} aria-hidden="true">
                {categoryVisual[i.category].emoji}
              </div>
              <div className="stack" style={{ gap: 'var(--space-2)' }}>
                <div className="row between">
                  <strong>{i.name}</strong>
                  <PriceBadge value={i.price * i.quantity} />
                </div>
                <div className="row between">
                  <div className="qty">
                    <button aria-label={`Diminuir ${i.name}`} onClick={() => setQty(i.flavorId, i.quantity - 1)}>−</button>
                    <span>{i.quantity}</span>
                    <button aria-label={`Aumentar ${i.name}`} onClick={() => setQty(i.flavorId, i.quantity + 1)}>+</button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => remove(i.flavorId)}>Remover</Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={clear}>Esvaziar carrinho</Button>
        </div>

        <aside className="card card--pad">
          <h3>Resumo</h3>
          <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-line muted"><span>Entrega</span><span>{formatPrice(site.deliveryFee)}</span></div>
          <div className="summary-line summary-total"><span>Total</span><PriceBadge value={subtotal + site.deliveryFee} /></div>
          <Button block onClick={() => navigate('/checkout')} style={{ marginTop: 'var(--space-4)' }}>Finalizar pedido</Button>
          <ButtonLink to="/cardapio" variant="ghost" block>Continuar comprando</ButtonLink>
        </aside>
      </div>
    </div>
  );
}

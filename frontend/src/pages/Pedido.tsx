import { useLocation, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getOrder } from '../services/orders';
import { Mascot } from '../components/Mascot';
import { Alert } from '../components/ui/Alert';
import { PriceBadge } from '../components/ui/Badge';
import { ButtonLink } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { formatDate, formatPrice } from '../utils/format';
import type { OrderStatus } from '../types';

const steps: { id: OrderStatus; label: string }[] = [
  { id: 'recebido', label: 'Pedido recebido' },
  { id: 'preparando', label: 'Preparando' },
  { id: 'saiu_para_entrega', label: 'Saiu para entrega' },
  { id: 'entregue', label: 'Entregue' },
];

const paymentLabel = { pix: 'Pix', cartao: 'Cartão', dinheiro: 'Dinheiro' };

export default function Pedido() {
  const { id = '' } = useParams();
  const { state } = useLocation() as { state?: { justCreated?: boolean } };
  const { data: o, loading, error, retry } = useAsync(() => getOrder(id), [id]);

  return (
    <div className="container section page-title">
      {loading && <Skeleton height={400} />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {o && (
        <div className="two-col">
          <div className="card card--pad">
            {state?.justCreated && (
              <div className="center stack" style={{ alignItems: 'center' }}>
                <Mascot pose="happy" size={180} />
                <Alert type="success">Pedido realizado com sucesso! Já estamos cuidando dele.</Alert>
              </div>
            )}
            <h1 style={{ fontSize: 'var(--text-h2)' }}>Pedido #{o.id}</h1>
            <p className="muted small">Feito em {formatDate(o.createdAt)}</p>
            <ol className="status-steps">
              {steps.map((s, i) => {
                const cur = steps.findIndex((x) => x.id === o.status);
                const cls = i < cur || o.status === 'entregue' ? 'done' : i === cur ? 'current done' : '';
                return <li key={s.id} className={cls}><span className="dot">{i <= cur ? '✔' : i + 1}</span>{s.label}</li>;
              })}
            </ol>
            <h3>Entrega</h3>
            <p className="muted">
              {o.address.street}, {o.address.number}{o.address.complement ? ` — ${o.address.complement}` : ''} · {o.address.district}
            </p>
          </div>
          <aside className="card card--pad">
            <h3>Itens</h3>
            {o.items.map((i) => (
              <div key={i.flavorId} className="summary-line small"><span>{i.quantity}× {i.name}</span><span>{formatPrice(i.price * i.quantity)}</span></div>
            ))}
            <div className="summary-line muted" style={{ marginTop: 'var(--space-2)' }}><span>Entrega</span><span>{formatPrice(o.deliveryFee)}</span></div>
            <div className="summary-line muted"><span>Pagamento</span><span>{paymentLabel[o.payment]}</span></div>
            <div className="summary-line summary-total"><span>Total</span><PriceBadge value={o.total} /></div>
            <div className="stack" style={{ marginTop: 'var(--space-4)' }}>
              <ButtonLink to="/minha-conta" variant="secondary" block>Meus pedidos</ButtonLink>
              <ButtonLink to="/cardapio" variant="ghost" block>Voltar ao cardápio</ButtonLink>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

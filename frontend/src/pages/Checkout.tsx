import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { createOrder } from '../services/orders';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { PriceBadge } from '../components/ui/Badge';
import { formatPrice } from '../utils/format';
import { site } from '../config/site';
import type { Address, PaymentMethod } from '../types';

const payments: { id: PaymentMethod; label: string }[] = [
  { id: 'pix', label: 'Pix' },
  { id: 'cartao', label: 'Cartão' },
  { id: 'dinheiro', label: 'Dinheiro na entrega' },
];

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>({ street: '', number: '', district: '', complement: '' });
  const [payment, setPayment] = useState<PaymentMethod>('pix');
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  if (items.length === 0) return <Navigate to="/carrinho" replace />;

  const set = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => setAddress({ ...address, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: typeof errors = {};
    if (!address.street.trim()) err.street = 'Informe a rua.';
    if (!address.number.trim()) err.number = 'Informe o número.';
    if (!address.district.trim()) err.district = 'Informe o bairro.';
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setApiError('');
    try {
      // Pagamento simulado: a forma escolhida só é registrada no pedido.
      const order = await createOrder(user!.id, { items, payment, address });
      clear();
      toast('success', 'Pedido realizado!');
      navigate(`/pedido/${order.id}`, { state: { justCreated: true } });
    } catch (e) {
      setApiError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container section page-title">
      <h1>Checkout</h1>
      <form className="two-col" onSubmit={submit} noValidate>
        <div className="card card--pad">
          {apiError && <Alert type="error">{apiError}</Alert>}
          <h3>Endereço de entrega</h3>
          <p className="muted small">Entregamos em até {site.deliveryRadiusKm} km da loja.</p>
          <Input label="Rua" value={address.street} onChange={set('street')} error={errors.street} autoComplete="address-line1" />
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 100 }}><Input label="Número" value={address.number} onChange={set('number')} error={errors.number} /></div>
            <div style={{ flex: 2, minWidth: 160 }}><Input label="Bairro" value={address.district} onChange={set('district')} error={errors.district} /></div>
          </div>
          <Input label="Complemento (opcional)" value={address.complement} onChange={set('complement')} />

          <h3 style={{ marginTop: 'var(--space-6)' }}>Pagamento</h3>
          <div className="chips" role="radiogroup" aria-label="Forma de pagamento">
            {payments.map((p) => (
              <button type="button" key={p.id} role="radio" aria-checked={payment === p.id}
                className={`chip ${payment === p.id ? 'chip--active' : ''}`} onClick={() => setPayment(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="card card--pad">
          <h3>Seu pedido</h3>
          {items.map((i) => (
            <div key={i.flavorId} className="summary-line small">
              <span>{i.quantity}× {i.name}</span><span>{formatPrice(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="summary-line" style={{ marginTop: 'var(--space-2)' }}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-line muted"><span>Entrega</span><span>{formatPrice(site.deliveryFee)}</span></div>
          <div className="summary-line summary-total"><span>Total</span><PriceBadge value={subtotal + site.deliveryFee} /></div>
          <Button type="submit" block loading={loading} style={{ marginTop: 'var(--space-4)' }}>Confirmar pedido</Button>
        </aside>
      </form>
    </div>
  );
}

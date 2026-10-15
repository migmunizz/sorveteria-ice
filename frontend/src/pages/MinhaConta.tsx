import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useAsync } from '../hooks/useAsync';
import { getMyOrders } from '../services/orders';
import { updateMe } from '../services/auth';
import { Input } from '../components/ui/Input';
import { Button, ButtonLink } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { formatDate, formatPrice, maskPhone } from '../utils/format';

const statusLabel = { recebido: 'Recebido', preparando: 'Preparando', saiu_para_entrega: 'A caminho', entregue: 'Entregue' };

export default function MinhaConta() {
  const { user, logout, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const orders = useAsync(() => getMyOrders(user!.id), [user!.id]);
  const [name, setName] = useState(user!.name);
  const [phone, setPhone] = useState(user!.phone);
  const [saving, setSaving] = useState(false);

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      setUser(await updateMe(user!.id, { name, phone }));
      toast('success', 'Dados atualizados.');
    } catch (err) {
      toast('error', (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container section page-title">
      <div className="row between">
        <h1 style={{ fontSize: 'var(--text-h2)' }}>Olá, {user!.name.split(' ')[0]}!</h1>
        <Button variant="ghost" onClick={() => { logout(); navigate('/'); }}>Sair</Button>
      </div>

      <div className="two-col">
        <section className="card card--pad">
          <h3>Meus pedidos</h3>
          {orders.loading && <Skeleton height={160} />}
          {orders.error && <ErrorState message={orders.error} onRetry={orders.retry} />}
          {orders.data && orders.data.length === 0 && (
            <div className="stack">
              <p className="muted">Você ainda não fez nenhum pedido.</p>
              <ButtonLink to="/cardapio">Fazer o primeiro pedido</ButtonLink>
            </div>
          )}
          {orders.data && orders.data.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead><tr><th>Pedido</th><th>Data</th><th>Status</th><th>Total</th></tr></thead>
                <tbody>
                  {orders.data.map((o) => (
                    <tr key={o.id}>
                      <td><Link to={`/pedido/${o.id}`}>#{o.id}</Link></td>
                      <td className="small">{formatDate(o.createdAt)}</td>
                      <td className="small">{statusLabel[o.status]}</td>
                      <td>{formatPrice(o.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <form className="card card--pad" onSubmit={save}>
          <h3>Meus dados</h3>
          <Input label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Telefone" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} />
          <Input label="E-mail" value={user!.email} disabled />
          <Input label="CPF" value={user!.cpf} disabled />
          <Button type="submit" block loading={saving}>Salvar</Button>
        </form>
      </div>
    </div>
  );
}

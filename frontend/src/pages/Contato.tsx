import { useState, type FormEvent } from 'react';
import { Mascot } from '../components/Mascot';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { site } from '../config/site';
import { delay } from '../services/api';
import { isValidEmail } from '../utils/format';

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Informe seu nome.';
    if (!isValidEmail(form.email)) err.email = 'E-mail inválido.';
    if (form.message.trim().length < 10) err.message = 'Escreva pelo menos 10 caracteres.';
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    await delay(); // TODO: POST /contato no backend
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="container section page-title">
      <div className="row between">
        <h1>Contato</h1>
        <Mascot pose="wink" size={140} />
      </div>
      <div className="two-col">
        <form className="card card--pad" onSubmit={submit} noValidate>
          {sent && <Alert type="success">Mensagem enviada! Respondemos em breve.</Alert>}
          <Input label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <Input label="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <Textarea label="Mensagem" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
          <Button type="submit" loading={loading}>Enviar mensagem</Button>
        </form>
        <aside className="card card--pad stack">
          <div>
            <h3>Fale com a gente</h3>
            <a className="btn btn--primary btn--block" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div><strong>Telefone:</strong> <span className="muted">{site.phone}</span></div>
          <div><strong>E-mail:</strong> <span className="muted">{site.email}</span></div>
          <div><strong>Endereço:</strong> <span className="muted">{site.address}</span></div>
          <div>
            <strong>Horários</strong>
            <ul className="muted" style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
              {site.hours.map((h) => <li key={h.label}>{h.label}</li>)}
              <li>{site.closedLabel}</li>
            </ul>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer">Instagram →</a>
        </aside>
      </div>
    </div>
  );
}

import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { isValidCpf, isValidEmail, maskCpf, maskPhone } from '../utils/format';
import type { RegisterData } from '../types';

type Form = RegisterData & { confirm: string };
type Errors = Partial<Record<keyof Form, string>>;

// Campos da entidade Usuário (Trello, card Backend): nome completo, CPF, e-mail, telefone, senha.
export default function Cadastro() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/minha-conta';
  const [form, setForm] = useState<Form>({ name: '', cpf: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Form, mask?: (v: string) => string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: mask ? mask(e.target.value) : e.target.value });

  function validate(): Errors {
    const err: Errors = {};
    if (form.name.trim().split(' ').length < 2) err.name = 'Informe nome e sobrenome.';
    if (!isValidCpf(form.cpf)) err.cpf = 'CPF inválido.';
    if (!isValidEmail(form.email)) err.email = 'E-mail inválido.';
    if (form.phone.replace(/\D/g, '').length < 10) err.phone = 'Telefone inválido.';
    if (form.password.length < 6) err.password = 'A senha precisa ter pelo menos 6 caracteres.';
    if (form.confirm !== form.password) err.confirm = 'As senhas não conferem.';
    return err;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setApiError('');
    try {
      const { confirm: _c, ...data } = form;
      await register(data);
      toast('success', 'Conta criada! Bem-vindo(a).');
      navigate(from, { replace: true });
    } catch (e) {
      setApiError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container section">
      <form className="form-narrow card card--pad" onSubmit={submit} noValidate>
        <h1 className="center" style={{ fontSize: 'var(--text-h2)' }}>Criar conta</h1>
        {apiError && <Alert type="error">{apiError}</Alert>}
        <Input label="Nome completo" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
        <Input label="CPF" inputMode="numeric" placeholder="000.000.000-00" value={form.cpf} onChange={set('cpf', maskCpf)} error={errors.cpf} />
        <Input label="E-mail" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
        <Input label="Telefone" type="tel" placeholder="(13) 99999-9999" value={form.phone} onChange={set('phone', maskPhone)} error={errors.phone} />
        <Input label="Senha" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} />
        <Input label="Confirmar senha" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
        <Button type="submit" block loading={loading}>Cadastrar</Button>
        <p className="center small" style={{ marginTop: 'var(--space-4)' }}>
          Já tem conta? <Link to="/auth/login" state={{ from }}>Entrar</Link>
        </p>
      </form>
    </div>
  );
}

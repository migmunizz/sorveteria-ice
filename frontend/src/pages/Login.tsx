import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { Mascot } from '../components/Mascot';
import { isValidEmail } from '../utils/format';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/minha-conta';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: typeof errors = {};
    if (!isValidEmail(email)) err.email = 'Informe um e-mail válido.';
    if (!password) err.password = 'Informe sua senha.';
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setApiError('');
    try {
      await login(email, password);
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
        <div className="center stack" style={{ alignItems: 'center' }}>
          <Mascot pose="face" size={96} />
          <h1 style={{ fontSize: 'var(--text-h2)', margin: 0 }}>Entrar</h1>
        </div>
        {apiError && <Alert type="error">{apiError}</Alert>}
        <Input label="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Input label="Senha" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <Button type="submit" block loading={loading}>Entrar</Button>
        <p className="center small" style={{ marginTop: 'var(--space-4)' }}>
          Ainda não tem conta? <Link to="/auth/cadastro" state={{ from }}>Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

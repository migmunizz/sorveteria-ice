import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { ButtonLink } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/cardapio', label: 'Cardápio' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user } = useAuth();
  const accountTo = user ? '/minha-conta' : '/auth/login';
  const accountLabel = user ? 'Minha conta' : 'Entrar';

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />

        <nav className="navbar__links" aria-label="Principal">
          {links.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          <NavLink to={accountTo}>{accountLabel}</NavLink>
        </nav>

        <div className="navbar__actions">
          <Link to="/carrinho" className="cart-link" aria-label={`Carrinho com ${count} itens`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6" />
            </svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
          <span className="navbar__cta"><ButtonLink to="/cardapio" size="sm">Pedir agora</ButtonLink></span>
          <button className="hamburger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" aria-label="Menu mobile" onClick={() => setOpen(false)}>
          {links.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          <NavLink to={accountTo}>{accountLabel}</NavLink>
          <ButtonLink to="/cardapio" block>Pedir agora</ButtonLink>
        </nav>
      )}
    </header>
  );
}

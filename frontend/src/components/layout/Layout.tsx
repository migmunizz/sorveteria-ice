import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Mascot } from '../Mascot';
import { isOpenNow, site } from '../../config/site';
import { useAuth } from '../../context/AuthContext';

function ClosedBanner() {
  if (isOpenNow()) return null;
  return (
    <div className="closed-banner" role="status">
      <div className="container">
        <Mascot pose="sleeping" size={36} />
        <span><strong>Estamos fechados agora.</strong> Você pode montar o pedido, mas a entrega só acontece no horário: {site.hours.map((h) => h.label).join(' · ')}.</span>
      </div>
    </div>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="app">
      <Navbar />
      <ClosedBanner />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}

// Rotas que exigem login: redireciona para /auth/login e volta depois.
export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  return children;
}

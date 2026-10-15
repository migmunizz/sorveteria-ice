import { Link } from 'react-router-dom';
import { site } from '../../config/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h3>{site.fullName}</h3>
            <p>{site.slogan}. Entregamos em até {site.deliveryRadiusKm} km no litoral de SP.</p>
          </div>
          <div>
            <h3>Navegação</h3>
            <ul>
              <li><Link to="/cardapio">Cardápio</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/minha-conta">Minha conta</Link></li>
            </ul>
          </div>
          <div>
            <h3>Horários</h3>
            <ul>
              {site.hours.map((h) => <li key={h.label}><span className="footer__icon" aria-hidden="true">◷</span>{h.label}</li>)}
              <li><span className="footer__icon" aria-hidden="true">◷</span>{site.closedLabel}</li>
              <li><span className="footer__icon" aria-hidden="true">✆</span>{site.phone}</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">© {new Date().getFullYear()} {site.fullName}. Projeto acadêmico.</div>
      </div>
    </footer>
  );
}

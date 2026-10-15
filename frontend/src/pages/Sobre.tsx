import { Mascot } from '../components/Mascot';
import { ButtonLink } from '../components/ui/Button';
import { site } from '../config/site';

const values = [
  { icon: '🍦', title: 'Feito todo dia', text: 'Produção artesanal e diária, com ingredientes frescos.' },
  { icon: '🏖️', title: 'Pé na areia', text: `Entregamos em até ${site.deliveryRadiusKm} km no litoral de SP.` },
  { icon: '😎', title: 'Sem estresse', text: 'Pedido rápido pelo celular, pagamento simples.' },
];

export default function Sobre() {
  return (
    <>
      <section className="container section page-title">
        <div className="hero__inner">
          <div>
            <h1>Sobre a {site.name}</h1>
            <p className="muted" style={{ fontSize: '1.1rem' }}>
              A {site.fullName} nasceu no litoral de São Paulo com uma ideia simples: sorvete bom, gelado de verdade e sem complicação.
              Nosso mascote de óculos escuros resume o espírito da casa: relaxado, divertido e sempre na temperatura certa.
            </p>
            <p className="muted">{/* PENDENTE: história real, equipe e fotos da loja */}Em breve: nossa história completa, a equipe e fotos da loja.</p>
            <ButtonLink to="/cardapio">Ver cardápio</ButtonLink>
          </div>
          <div className="hero__mascot"><Mascot pose="normal" size={320} /></div>
        </div>
      </section>
      <section className="section section--primary">
        <div className="container testimonials">
          {values.map((v) => (
            <div key={v.title} className="card card--pad">
              <div style={{ fontSize: '2.5rem' }} aria-hidden="true">{v.icon}</div>
              <h3>{v.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

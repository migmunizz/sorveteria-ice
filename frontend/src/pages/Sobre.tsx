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
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h2>Nossa história</h2>
          <p className="muted">
            A {site.fullName} começou em 2015, quando a família Rienzi trocou o apartamento na capital por uma casinha
            de esquina perto da praia e resolveu transformar a receita de sorvete da avó em um point do bairro.
            As primeiras bolas saíam de um freezer emprestado e eram vendidas numa mesinha na calçada — bastaram
            dois verões para o sorvete ficar famoso entre os moradores e virar parada obrigatória de quem passava
            pela orla.
          </p>
          <p className="muted">
            Hoje a loja tem cozinha própria, produção diária e um cardápio que cresceu dos 3 sabores originais para
            dezenas de opções entre sorvetes, casquinhas, picolés, açaí e milkshakes — sempre girando o estoque para
            garantir que tudo chegue fresquinho. O espírito, porém, continua o mesmo da mesinha na calçada: sorvete
            bom, atendimento de vizinho e aquele clima de férias o ano inteiro.
          </p>
          <p className="muted small">
            * História, endereço e contatos são fictícios — este é um projeto acadêmico e não representa uma
            sorveteria real.
          </p>
        </div>
      </section>
    </>
  );
}

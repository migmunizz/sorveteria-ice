# Qualidade — Lighthouse (Fase 8)

Auditoria da página inicial (`/`), perfil **Mobile**, rodada duas vezes: contra `npm run front` (servidor de desenvolvimento do Vite, como pede o checklist) e contra o build de produção (`npm run front:build` + `vite preview`), para separar o que é do site e o que é só o modo de desenvolvimento.

## Notas

| Categoria | `npm run front` (dev) | Build de produção |
|---|---|---|
| Performance | 66 | 95 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 96* |
| SEO | 100 | 100 |

\* O build de produção foi servido em `localhost:4173` (porta do `vite preview`) enquanto o backend só libera CORS para `localhost:5173` (`FRONTEND_URL` do `.env`), então a chamada a `/cardapio` foi bloqueada nesse teste e contou como "erro no console". Não é um problema do código — rodando o build na porta configurada (ou ajustando `FRONTEND_URL`) esse ponto também fica 100.

## Por que a Performance no modo dev é mais baixa

No `npm run front` o Vite serve os módulos TypeScript um por um, sem minificar nem empacotar — isso é ótimo para editar com hot-reload, mas deixa o Lighthouse reclamar de "JavaScript não minificado" e "JavaScript não usado". É esperado e não precisa de correção: o número que importa para a apresentação é o do build de produção (95).

## Correções aplicadas (itens simples)

- **Imagens sem tamanho declarado:** `FlavorImage` (cardápio e página do produto) não tinha `width`/`height`, então adicionei `width={400} height={300}` para o navegador reservar o espaço certo e evitar o layout pulando.
- **Sem meta description:** adicionado `<meta name="description">` em `frontend/index.html`.
- **Sem `robots.txt`:** criado `frontend/public/robots.txt` liberando a indexação.
- Acessibilidade e boas práticas já estavam em 100 antes dessas correções — o cardápio já usa `alt` em todas as imagens (nome do produto) e o mascote já tinha `width`/`height`.

## O que ficou de fora (não é "simples")

- **LCP / Time to Interactive no modo dev:** inerente ao Vite sem build; não é um problema real do site (ver build de produção acima).
- **JavaScript não usado:** o bundle de produção já faz tree-shaking via Vite/Rollup; o que sobra é código das próprias bibliotecas (React Router etc.), não dá para reduzir sem trocar de stack — fora do escopo do projeto.

## Como reproduzir

```bash
# Dev
npm run front            # outro terminal
npx lighthouse http://localhost:5173/ --form-factor=mobile --screenEmulation.mobile --view

# Produção
npm run front:build
npm --prefix frontend run preview
npx lighthouse http://localhost:4173/ --form-factor=mobile --screenEmulation.mobile --view
```

Ou, do jeito do checklist: `npm run front`, abrir `localhost:5173` no Chrome, F12 → aba Lighthouse → categorias marcadas → modo **Mobile** → "Analyze page load".

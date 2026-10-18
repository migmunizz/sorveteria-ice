# 🍦 Sorveteria ai-ce

Plataforma web de vendas de sorvetes: cardápio, carrinho, checkout, acompanhamento de pedidos e conta do usuário.

| Camada | Stack |
|---|---|
| Frontend | React 18 + TypeScript + Vite + React Router |
| Backend (Sprint II) | NestJS + TypeScript (MVC) + Prisma |
| Banco | MySQL 8, instalado direto no computador |
| Pagamento | Simulado (Pix, cartão, dinheiro) |
| Código | GitHub |
| Metodologia | Scrum / Kanban (Trello) |

---

## Fase 1 — Frontend (pronto)

### Como rodar

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Sem backend, o site funciona com **dados mockados** (`src/mocks`) e salva usuários, carrinho e pedidos no `localStorage`.
Quando a API NestJS existir, crie `frontend/.env` com:

```
VITE_API_URL=http://localhost:3000
```

e os serviços passam a chamar a API automaticamente (nenhuma tela precisa mudar).

### Rotas (iguais ao Trello / Design System)

| Rota | Página | Login? | Mascote |
|---|---|---|---|
| `/` | Home (hero, destaques, promoções, depoimentos) | – | acenando |
| `/cardapio` | Grid com filtro por categoria e busca | – | comendo |
| `/produto/:id` | Detalhe + quantidade | – | – |
| `/carrinho` | Itens, quantidade, resumo | – | placa (vazio) |
| `/checkout` | Endereço + pagamento | ✔ | – |
| `/pedido/:id` | Status do pedido | ✔ | feliz |
| `/minha-conta` | Pedidos + dados do usuário | ✔ | – |
| `/auth/login` · `/auth/cadastro` | Autenticação (nome, CPF, e-mail, telefone, senha) | – | rosto |
| `/sobre` · `/contato` | Institucional | – | normal · piscando |
| `*` | 404 | – | placa |

### Estrutura

```
frontend/src/
├── assets/mascot/        # mascote recortado (webp transparente)
├── components/
│   ├── ui/               # Button, Badge, PriceBadge, Input, Alert, Skeleton, FlavorCard, States
│   ├── layout/           # Navbar, Footer, Layout, RequireAuth, banner "fechado"
│   ├── Mascot.tsx        # componente único do mascote (todas as poses)
│   └── Logo.tsx          # logo provisório
├── config/site.ts        # nome, horários, contatos, taxa de entrega
├── context/              # AuthContext, CartContext, ToastContext
├── hooks/useAsync.ts     # estados carregando / erro / dados
├── mocks/flavors.ts      # cardápio provisório
├── pages/                # uma página por rota
├── services/             # api.ts + auth.ts, flavors.ts, orders.ts
├── styles/               # tokens.css (Design System §2.3) + global.css
├── types/                # Flavor, User, CartItem, Order...
└── utils/format.ts       # preço BRL, máscaras e validação de CPF
```

### Decisões tomadas (pendências do Design System)

- **CSS puro com variáveis** (sem Tailwind) — mais simples para o trabalho.
- **Magenta neon do mascote:** `#E000E8` (medido no contorno) → `--color-glow`.
- **Mascote:** fundo preto removido, exportado em WebP 512/1024 + favicon circular. As outras poses ainda não existem, então todas usam a pose normal como placeholder (basta adicionar o arquivo em `Mascot.tsx`).
- **Logo:** provisório (rosto do mascote + “ai-ce” em Fredoka).
- **Ainda pendente:** endereço, WhatsApp, redes (`config/site.ts`), lista real de produtos (`mocks/flavors.ts`) e fotos dos produtos (hoje são emojis por categoria).

---

## Próximas fases (backend e entrega)

O plano completo está em [`docs/fases/`](docs/fases/README.md), uma fase por arquivo, cada uma com checklist, critérios de aceite e verificação. Stack, arquitetura MVC, contrato da API e padrões de código estão em [`docs/arquitetura.md`](docs/arquitetura.md). As imagens do projeto (mascote, favicons, prints) e a descrição de cada uma estão em [`assets/`](assets/README.md).

| Fase | Conteúdo |
|---|---|
| 0 | Repositório e ambiente ✅ |
| 1 | Frontend React ✅ |
| 2 | Análise: requisitos, diagrama de classes, modelo do banco, BPMN, arquitetura MVC, padrões de projeto |
| 3 | Banco de dados + NestJS + Prisma |
| 4 | Usuários e login |
| 5 | Produtos / cardápio |
| 6 | Pedidos e checkout |
| 7 | Integração frontend ↔ backend |
| 8 | Revisão e entrega |

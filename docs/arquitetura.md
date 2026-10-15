# Arquitetura e padrões — Sorveteria ai-ce

Projeto acadêmico: site de vendas de uma sorveteria do litoral de SP (entrega em até 10 km), com cardápio, carrinho, checkout e acompanhamento de pedidos. Prioridade: código simples, legível e didático.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + TypeScript + Vite + React Router 6, CSS puro com variáveis (sem Tailwind) |
| Backend | NestJS 10 + TypeScript, arquitetura **MVC** |
| ORM / Banco | Prisma + **MySQL 8** (via Docker). MongoDB fica fora do MVP (ver Fase 2) |
| Auth | JWT (`@nestjs/jwt` + `passport-jwt`), senhas com `bcrypt` |
| Validação | `class-validator` + `class-transformer` (DTOs) |
| Docs da API | Swagger (`@nestjs/swagger`) em `/docs` |
| Pagamento | PagSeguro (sandbox) — fase opcional, começa com pagamento simulado |
| Deploy | Frontend na Vercel, backend no Render/Railway, código no GitHub |
| Gestão | Scrum/Kanban no Trello (export em `docs/trello-export.json`) |

## Estrutura

```
sorveteria-ice/
├── README.md               # README da disciplina (entregável)
├── frontend/               # React (Fase 1 — pronta)
├── backend/                # NestJS (Fases 3 a 6)
├── assets/                 # imagens-fonte do projeto (ver assets/README.md)
├── docs/
│   ├── arquitetura.md      # este arquivo
│   ├── fases/              # plano de implementação, uma fase por arquivo
│   ├── analise/            # diagramas e modelagem (gerados na Fase 2)
│   ├── design-system.md    # resumo do Design System (fonte: design-system.pdf)
│   └── trello.md           # resumo do quadro e sprints
```

## Comandos

```bash
# Frontend
cd frontend && npm install && npm run dev      # http://localhost:5173
cd frontend && npm run build                   # checa tipos + build

# Backend (a partir da Fase 3)
docker compose up -d                           # MySQL na porta 3306
cd backend && npm install
cd backend && npx prisma migrate dev           # cria/atualiza tabelas
cd backend && npx prisma db seed               # popula o cardápio
cd backend && npm run start:dev                # http://localhost:3000  (Swagger em /docs)
cd backend && npm run test                     # testes unitários
```

## MVC no NestJS (como este projeto interpreta)

- **Model** → `schema.prisma` (tabelas) + `*.service.ts` (regras de negócio e acesso a dados via `PrismaService`).
- **View** → o JSON devolvido pela API, consumido pelo frontend React. O formato do JSON está definido nos DTOs de resposta.
- **Controller** → `*.controller.ts`: só recebe a requisição, valida o DTO, chama o service e devolve a resposta. **Nenhuma regra de negócio no controller.**

Um módulo por recurso: `auth`, `users`, `products`, `orders`, `contact` em `backend/src/<recurso>/` com `module`, `controller`, `service` e `dto/`.

## Contrato frontend ↔ backend (não quebrar)

A fonte da verdade do JSON é `frontend/src/types/index.ts`. O backend deve devolver exatamente esses formatos.

| Método | Rota | Auth | Resposta |
|---|---|---|---|
| POST | `/auth/cadastro` | – | `{ token, user: User }` |
| POST | `/auth/login` | – | `{ token, user: User }` |
| GET | `/cardapio` | – | `Flavor[]` |
| GET | `/produto/:id` | – | `Flavor` (404 se não existir) |
| POST | `/checkout` | JWT | `Order` |
| GET | `/pedido/:id` | JWT | `Order` (só do próprio usuário) |
| GET | `/minha-conta/pedidos` | JWT | `Order[]` (mais recentes primeiro) |
| PATCH | `/minha-conta` | JWT | `User` |
| POST | `/contato` | – | `204` |

Erros: `{ message: string }` em português, com o status HTTP correto (400, 401, 404, 409).

## Regras de código

- TypeScript `strict` nos dois lados. Nada de `any`.
- **Textos de interface, mensagens de erro e rotas em pt-BR. Identificadores de código em inglês** (`createOrder`, `ProductsService`).
- Preço e total **sempre calculados no backend** a partir do banco; nunca confiar no preço que vem do frontend.
- Nunca devolver `password`/hash em nenhuma resposta.
- Segredos só em `.env` (há `.env.example` em cada app). Nunca commitar `.env`.
- Frontend: usar os tokens de `frontend/src/styles/tokens.css` — não escrever HEX solto em componentes. Toda tela que busca dados tem 3 estados (carregando, erro, vazio).
- Frontend: o mascote é sempre renderizado pelo componente `Mascot` (`src/components/Mascot.tsx`). Máximo de 1 mascote grande por tela.
- Commits pequenos, em português, no formato `tipo(escopo): descrição` — ex.: `feat(orders): cria endpoint de checkout`.

## Design System (resumo)

Tema só escuro, mobile first, visual cartoon com cantos arredondados. Detalhes em `docs/design-system.md`.

- Fundo `#171018` · superfície `#231628` · primária roxa `#7B1FA2` (só superfície, nunca texto) · rosa `#FF4081` (botões, texto escuro em cima) · laranja `#FF8C1A` · preço amarelo `#FFD43B` · texto creme `#FFF0C2` · glow magenta `#E000E8`.
- Fontes: Fredoka (títulos, botões, preços) e Nunito (texto).
- Alertas de sucesso/erro/aviso sempre com ícone + texto, nunca só cor.

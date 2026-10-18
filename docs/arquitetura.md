# Arquitetura e padrões — Sorveteria ai-ce

Projeto acadêmico: site de vendas de uma sorveteria do litoral de SP (entrega em até 10 km), com cardápio, carrinho, checkout e acompanhamento de pedidos, integrado a um banco de dados.

**Princípio do projeto: ser simples.** Só as ferramentas da tabela abaixo. Nada de Docker, filas, cache, microserviços, bibliotecas de estado (Redux etc.) ou frameworks de CSS. Se algo não estiver na tabela, não entra.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + TypeScript + Vite + React Router, CSS puro com variáveis |
| Backend | NestJS + TypeScript, arquitetura **MVC** |
| Banco de dados | **MySQL 8**, instalado direto no computador |
| Acesso ao banco | Prisma 6 (ORM) |
| Login | Simples: confere e-mail e senha (hash com `bcryptjs`) e devolve o usuário. **Sem JWT, sem guard, sem módulo auth** |
| Validação | `class-validator` nos DTOs (padrão do NestJS) |
| Testar a API | Postman, Thunder Client ou `curl` |
| Pagamento | Simulado (Pix, cartão ou dinheiro na entrega) |
| Gestão | Scrum/Kanban no Trello (export em `docs/trello-export.json`) |
| Código | GitHub |

## Estrutura

```
sorveteria-ice/
├── README.md
├── package.json            # só atalhos: npm run front / npm run back
├── frontend/               # React
├── backend/                # NestJS
├── assets/                 # imagens do projeto (ver assets/README.md)
└── docs/
    ├── arquitetura.md      # este arquivo
    ├── fases/              # plano de implementação, uma fase por arquivo
    ├── analise/            # requisitos e diagramas
    ├── design-system.md    # resumo do Design System (fonte: design-system.pdf)
    └── trello.md           # resumo do quadro e sprints
```

## Comandos

```bash
# Frontend
npm run front                                  # http://localhost:5173
npm run front:build                            # confere tipos + build

# Backend (a partir da Fase 3; o MySQL precisa estar ligado)
cd backend && npm install
cd backend && npx prisma migrate dev           # cria/atualiza as tabelas
cd backend && npx prisma db seed               # coloca o cardápio no banco
cd backend && npx prisma studio                # ver e editar o banco no navegador
npm run back                                   # http://localhost:3000
```

## MVC no NestJS

- **Model** → `prisma/schema.prisma` (tabelas) + `*.repository.ts` (acesso ao banco pelo `PrismaService`) + `*.service.ts` (regras de negócio).
- **View** → o JSON que a API devolve e que o React mostra na tela.
- **Controller** → `*.controller.ts`: recebe a requisição, valida o DTO, chama o service e devolve a resposta. **Nenhuma regra de negócio no controller.**

Um módulo por recurso em `backend/src/<recurso>/`, cada um com `module`, `controller`, `service`, `repository` e `dto/`: `users`, `products`, `orders`, `contact`. Quem fala com o banco é só o **repository** (usa o `PrismaService`); o service tem as regras; o controller só recebe e responde.

## Contrato frontend ↔ backend (não quebrar)

A fonte da verdade do JSON é `frontend/src/types/index.ts`. O backend devolve exatamente esses formatos.

| Método | Rota | Usuário | Resposta |
|---|---|---|---|
| POST | `/auth/cadastro` | – | `{ user: User }` |
| POST | `/auth/login` | – | `{ user: User }` |
| GET | `/cardapio` | – | `Flavor[]` |
| GET | `/produto/:id` | – | `Flavor` (404 se não existir) |
| POST | `/checkout` | `userId` no corpo | `Order` |
| GET | `/pedido/:id?userId=...` | `userId` na query | `Order` (404 se não for do usuário) |
| GET | `/minha-conta/:userId/pedidos` | – | `Order[]` (mais recentes primeiro) |
| PATCH | `/minha-conta/:userId` | – | `User` |
| POST | `/contato` | – | `204` |

Não há token: o React guarda o `user` devolvido no login e manda o `userId` quando precisa (checkout, pedidos, minha conta). Erros devolvem `{ message }` em português com o status HTTP certo (400, 401, 404, 409); o formato padrão de erro do NestJS já faz isso.

## Regras de código

- TypeScript nos dois lados, sem `any`.
- Textos de tela, mensagens de erro e rotas em pt-BR. Nomes no código em inglês (`createOrder`, `ProductsService`).
- Preço e total **sempre calculados no backend** com os valores do banco; nunca confiar no preço que vem do frontend.
- Nunca devolver a senha (nem o hash) em nenhuma resposta.
- Segredos só no `.env` (cada app tem um `.env.example`). Nunca commitar o `.env`.
- Código simples e legível, com poucos arquivos por módulo. Comentários curtos explicando o “porquê” quando ajudar quem for apresentar.
- Frontend: usar os tokens de `frontend/src/styles/tokens.css`, sem cor solta nos componentes. Toda tela que busca dados tem os estados carregando, erro e vazio. O mascote sempre pelo componente `Mascot`.
- Commits pequenos, em português, no formato `tipo(escopo): descrição` — ex.: `feat(orders): cria endpoint de checkout`.

## Design System (resumo)

Tema escuro, mobile first, visual cartoon com cantos arredondados. Detalhes em `docs/design-system.md`.

- Fundo `#171018` · superfície `#231628` · roxo `#7B1FA2` (só fundo, nunca texto) · rosa `#FF4081` (botões, com texto escuro) · laranja `#FF8C1A` · preço `#FFD43B` · texto creme `#FFF0C2` · brilho magenta `#E000E8`.
- Fontes: Fredoka (títulos, botões, preços) e Nunito (texto).
- Avisos de sucesso/erro sempre com ícone + texto, nunca só cor.

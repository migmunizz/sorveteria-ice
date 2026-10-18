# Trello — quadro “Sorveteria”

Resumo do quadro (export completo em `trello-export.json`). Responsável por todos os cards: Miguel Rienzi Muniz.

## Briefing (card “Reunião inicial”)

- Sorveteria para vender online **com carrinho de compras**.
- Cores creme e branco (no Design System virou tema escuro roxo com texto creme).
- Litoral de SP, entrega em até **10 km** (Long Beach).
- Pagamento: **PagSeguro** (no MVP o pagamento é simulado; integração real fica para depois).
- Tecnologias: React, NestJS, TypeScript, Prisma, MySQL e MongoDB (no MVP só MySQL).
- Metodologias: Scrum/Kanban, padrão de projeto, diagrama de classe, BPMN.
- Repositórios: GitHub (https://github.com/migmunizz/sorveteria-ice), Vercel, Google Docs.

## Sprint I — 29/09 a 20/10

| Card | Descrição | Fase |
|---|---|---|
| Reunião inicial | Briefing acima | 2 |
| mvp | Definição do MVP | 2 |
| wireframe | Telas | 1 |
| Repositorios | GitHub, Google Docs, iniciar projeto fullstack | 0 |
| Reunião Final | Retrospectiva: Krita ajudou; aprender Scrum/Kanban; próxima sprint inicia desenvolvimento | – |
| Pasta de imagens | Mascote (poses), logo e imagens dos produtos | 1 / `assets/` |
| Atualizar Repositorios | Atualizar Google Docs, resolver pendências, definir design system | 0 |

## Sprint II — 20/10 a 03/11

| Card | Descrição | Fase |
|---|---|---|
| Reunião inicial | – | – |
| Frontend - react | Criar com Vite, desenvolver telas, conectar com backend. Entrega 20/10 | 1, 7 |
| Backend - Nestjs | Rotas; model, services e controllers; banco; entidades (login, senha, nome completo, CPF, e-mail, telefone); cadastro/login; *se possível, IA com Python* (fora do MVP). Entrega 03/11 | 2–6 |
| Atualizar Repositorio - Commit | Commit e backup a cada atualização | todas |
| Elaborar o readme | Disciplina, professor, membros, descrição, figura, link, apresentação pessoal | 8 |
| Teste de usabilidade | – | 8 |
| Reunião final | – | 8 |
| Descoberta e planejamento | Requisitos, escopo do MVP, concorrentes, identidade visual, backlog | 2 |
| Finalização | Bugs do teste de usabilidade, Lighthouse, demo, retrospectiva | 8 |
| Lista Real | Preços, nomes, sabores e categorias | 1, 5 |

## Rotas definidas no Trello

| Backend (checklist “Rotas (endpoints)”) | Frontend (checklist “Pages (react-router)”) |
|---|---|
| `/auth/login`, `/auth/cadastro` | `auth` |
| `/cardapio`, `/produto{id}` | `cardapio`, `produto` |
| `/carrinho`, `/checkout` | `carrinho` |
| `/pedido{id}`, `/minha-conta` | `pedido`, `minha-conta` |
| `/sobre`, `/contato` | `index`, `sobre`, `contato` |

> `/carrinho`, `/sobre` e `/contato` são páginas do frontend. No backend, o carrinho fica no navegador e só vira pedido no `/checkout`; `/contato` vira `POST /contato`.

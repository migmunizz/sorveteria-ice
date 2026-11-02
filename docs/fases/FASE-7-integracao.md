# Fase 7 — Integração frontend ↔ backend

**Objetivo:** o site passa a usar a API e o banco de verdade. Sem `VITE_API_URL`, ele continua funcionando com os dados de exemplo (útil para apresentar sem o backend ligado).

**Trello:** card 7 — “Conectar com o backend”.
**Pré-requisitos:** Fases 4, 5 e 6.

## Checklist

### Backend
- [x] Módulo `contact`: `POST /contato` com `CreateContactDto` (`name`, `email`, `message` com 10+ caracteres) → salva em `ContactMessage` → `204`.

### Frontend
- [x] Criar `frontend/.env` com `VITE_API_URL=http://localhost:3000` (já existe o `.env.example`).
- [x] `src/services/contact.ts` com `sendContact(data)` (sem API = só espera; com API = `POST /contato`) e usar na página `Contato.tsx` no lugar do `TODO`. Mostrar o `Alert` de erro se falhar.
- [x] Adaptar o frontend à API sem token: `login`/`cadastro` passam a receber `{ user }`; remover o uso de `token` (cabeçalho `Authorization`) em `src/services/`; enviar o `user.id` no checkout (`userId` no corpo), em `GET /pedido/:id?userId=` e em `/minha-conta/:userId/...`. O modo mock continua igual.
- [x] Em `src/services/api.ts`: se `message` vier como lista (erro de validação do NestJS), juntar os textos com `"; "`.
- [x] No `Checkout.tsx`: se a API recusar por produto esgotado ou inexistente, mostrar a mensagem e um botão “Revisar carrinho”.

### Teste completo (manual, com front e back ligados)
- [x] Cadastrar um usuário → ele aparece no banco (`npx prisma studio`).
- [x] Sair e entrar de novo.
- [x] Adicionar 2 produtos → finalizar → a página do pedido mostra o número vindo do banco.
- [x] “Minha conta” lista o pedido; editar o telefone continua salvo depois de recarregar.
- [ ] Mudar o status do pedido no Prisma Studio → a página do pedido mostra o novo status ao recarregar. *(não verificado visualmente no navegador — ver resumo)*
- [x] Enviar uma mensagem de contato → aparece no banco.
- [ ] Desligar o backend e abrir o cardápio → aparece a tela de erro com “Tentar novamente”. *(não verificado visualmente no navegador — ver resumo)*

## Critérios de aceite

- Todos os itens do teste completo funcionam.
- `npm run build` passa no frontend e no backend.

## Verificação

```bash
npm run back      # terminal 1
npm run front     # terminal 2
npm run front:build && npm --prefix backend run build
```

## Commit

`feat: integra o frontend com a API e adiciona contato`

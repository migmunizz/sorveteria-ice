# Fase 7 — Integração frontend ↔ backend

**Objetivo:** o site passa a usar a API e o banco de verdade. Sem `VITE_API_URL`, ele continua funcionando com os dados de exemplo (útil para apresentar sem o backend ligado).

**Trello:** card 7 — “Conectar com o backend”.
**Pré-requisitos:** Fases 4, 5 e 6.

## Checklist

### Backend
- [ ] Módulo `contact`: `POST /contato` com `CreateContactDto` (`name`, `email`, `message` com 10+ caracteres) → salva em `ContactMessage` → `204`.

### Frontend
- [ ] Criar `frontend/.env` com `VITE_API_URL=http://localhost:3000` (já existe o `.env.example`).
- [ ] `src/services/contact.ts` com `sendContact(data)` (sem API = só espera; com API = `POST /contato`) e usar na página `Contato.tsx` no lugar do `TODO`. Mostrar o `Alert` de erro se falhar.
- [ ] Em `src/services/api.ts`: se a API responder **401**, limpar `token` e `user` do `localStorage` e mandar para `/auth/login`.
- [ ] Em `src/services/api.ts`: se `message` vier como lista (erro de validação do NestJS), juntar os textos com `"; "`.
- [ ] No `Checkout.tsx`: se a API recusar por produto esgotado ou inexistente, mostrar a mensagem e um botão “Revisar carrinho”.

### Teste completo (manual, com front e back ligados)
- [ ] Cadastrar um usuário → ele aparece no banco (`npx prisma studio`).
- [ ] Sair e entrar de novo.
- [ ] Adicionar 2 produtos → finalizar → a página do pedido mostra o número vindo do banco.
- [ ] “Minha conta” lista o pedido; editar o telefone continua salvo depois de recarregar.
- [ ] Mudar o status do pedido no Prisma Studio → a página do pedido mostra o novo status ao recarregar.
- [ ] Enviar uma mensagem de contato → aparece no banco.
- [ ] Desligar o backend e abrir o cardápio → aparece a tela de erro com “Tentar novamente”.

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

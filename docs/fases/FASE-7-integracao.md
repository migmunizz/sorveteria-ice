# Fase 7 — Integração frontend ↔ backend

**Objetivo:** o frontend passa a usar a API real. O modo mock continua existindo quando `VITE_API_URL` está vazio (útil para apresentar sem backend).

**Trello:** card 7 — comentário “Conectar com o backend”.
**Pré-requisitos:** Fases 4, 5 e 6.

## Checklist

### Backend
- [ ] Módulo `contact`: `POST /contato` com `CreateContactDto` (`name`, `email`, `message` ≥ 10 chars) → grava `ContactMessage` → `204`.

### Frontend
- [ ] Criar `frontend/.env` com `VITE_API_URL=http://localhost:3000` (já existe `.env.example`).
- [ ] `src/services/contact.ts` com `sendContact(data)` (mock = `delay()`; real = `POST /contato`) e usar na página `Contato.tsx` no lugar do `TODO`. Mostrar `Alert` de erro se falhar.
- [ ] Em `src/services/api.ts`: quando a resposta for **401** numa rota autenticada, limpar `token` e `user` do `localStorage` e redirecionar para `/auth/login` (disparar um `window.dispatchEvent(new Event('auth:logout'))` e o `AuthProvider` escuta e faz `logout()`).
- [ ] No `Checkout.tsx`: se a API responder 400 de produto inexistente/esgotado, mostrar a mensagem e oferecer botão “Revisar carrinho”.
- [ ] *(Opcional, simples)* Página `/admin/pedidos` só para `role = admin`: lista pedidos e botão “Avançar status”. Exige `GET /admin/pedidos` no backend (admin) e o campo `role` no `User` do login — se fizer, adicionar `role?: 'cliente' | 'admin'` ao tipo `User` e ao mapper `toPublic`.

### Teste ponta a ponta (manual, com front e back rodando)
- [ ] Cadastrar usuário novo → aparece no banco (`npx prisma studio`).
- [ ] Sair e entrar de novo.
- [ ] Adicionar 2 produtos → checkout → página do pedido mostra número vindo do banco.
- [ ] Minha conta lista o pedido; editar telefone persiste após recarregar.
- [ ] Contato grava mensagem.
- [ ] Derrubar o backend e abrir o cardápio → aparece o estado de erro com “Tentar novamente”.

## Critérios de aceite

- Todos os itens do teste ponta a ponta passam.
- `npm run build` passa no frontend e no backend.
- Com `VITE_API_URL` vazio o site continua funcionando em modo mock.

## Verificação

```bash
npm run db:up && npm run back &   # em outro terminal: npm run front
cd frontend && npm run build && cd ../backend && npm run build
```

## Commit

`feat: integra frontend com a API NestJS e adiciona contato`

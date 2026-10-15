# Fase 1 — Frontend React ✅

**Status:** concluída. Esta página documenta o que existe e lista as pendências de **conteúdo** (não de código).

**Trello:** card 7 “Frontend - react” (checklist *Pages (react-router)*), card 3 “wireframe”, card 15 “Pasta de imagens”.

## O que já está pronto

- [x] Projeto Vite + React 18 + TypeScript + React Router 6.
- [x] Tokens do Design System em `src/styles/tokens.css`; estilos globais em `src/styles/global.css`.
- [x] Componentes base: `Button`, `ButtonLink`, `Badge`, `PriceBadge`, `Input`, `Textarea`, `Alert`, `Skeleton`, `FlavorCard`, `ErrorState`, `EmptyState`.
- [x] Layout: `Navbar` (com menu mobile e contador do carrinho), `Footer`, banner “Estamos fechados”, `RequireAuth`.
- [x] Componente `Mascot` com todas as poses tipadas (placeholder = pose normal) e `Logo` provisório.
- [x] Páginas: `/`, `/cardapio`, `/produto/:id`, `/carrinho`, `/checkout`, `/pedido/:id`, `/minha-conta`, `/auth/login`, `/auth/cadastro`, `/sobre`, `/contato`, 404.
- [x] Contextos: `AuthContext`, `CartContext` (persistido no `localStorage`), `ToastContext`.
- [x] Camada de serviços (`src/services/`) com **modo mock** automático quando `VITE_API_URL` está vazio.
- [x] Validação de cadastro: nome e sobrenome, CPF (dígitos verificadores), e-mail, telefone, senha ≥ 6, confirmação.
- [x] Fluxo testado: cardápio → carrinho → cadastro → checkout → pedido.

## Pendências de conteúdo (quando os dados estiverem definidos)

- [ ] Preencher `src/config/site.ts`: endereço, WhatsApp, telefone, e-mail, Instagram, horários reais.
- [ ] Trocar o cardápio provisório (`src/mocks/flavors.ts`) pela **Lista Real** (card 16). Depois da Fase 5, o cardápio passa a vir do seed do backend — manter os dois iguais.
- [ ] Fotos dos produtos: salvar em `assets/produtos/` (ver `assets/README.md`) e preencher `imageUrl`. Enquanto isso, o card mostra o emoji da categoria.
- [ ] Novas poses do mascote: salvar em `frontend/src/assets/mascot/` e registrar no objeto `sources` de `Mascot.tsx`.
- [ ] Logo final (Design System §8): quando existir, substituir o conteúdo de `Logo.tsx`.

## Verificação

```bash
cd frontend && npm run build
```

# Fase 6 — Pedidos e checkout

**Objetivo:** criar pedidos com preço calculado no servidor, consultar pedidos do usuário e permitir que o admin avance o status.

**Trello:** card 8 — rotas `/checkout`, `/pedido{id}`, `/minha-conta`; card 1 — carrinho de compras, entrega em 10 km.
**Pré-requisitos:** Fases 4 e 5.

## Checklist

- [ ] `CreateOrderDto`:
  - `items`: array **não vazio** de `{ flavorId: string, quantity: int 1–20 }` (`@ValidateNested`, `@Type`). O frontend envia também `name`, `price` e `category` — **aceitar e ignorar** (usar `whitelist` sem rejeitar: declarar os campos como opcionais e não usá-los).
  - `payment`: enum `pix | cartao | dinheiro`.
  - `address`: `{ street, number, district, complement? }` obrigatórios e não vazios.
- [ ] `orders.service.ts`:
  - `create(userId, dto)`:
    1. Buscar os produtos pelos ids; se algum não existir → 400 `"Produto não encontrado: <id>"`; se `available = false` → 400 `"<nome> está esgotado."`.
    2. Calcular `subtotal` com o **preço do banco**; `deliveryFee` de `DELIVERY_FEE`; `total`.
    3. Gravar `Order` + `OrderItem` (snapshot de nome, preço e categoria) numa única operação (`prisma.order.create` com `items: { create: [...] }`).
  - `findOneForUser(id, user)` → 404 se não existir; 404 também se o pedido for de outro usuário (a menos que `role = admin`).
  - `findAllForUser(userId)` → mais recentes primeiro.
  - `updateStatus(id, status)` → só avança na ordem `recebido → preparando → saiu_para_entrega → entregue`; voltar → 400.
  - Mapper `toOrder(order)` → formato `Order` do contrato: `id` string, `items` como `CartItem[]` (`flavorId` = `productId`), valores como number, `address` montado a partir das colunas, `createdAt` ISO.
- [ ] `orders.controller.ts` (todas com `JwtAuthGuard`):
  - `POST /checkout` → 201 `Order`.
  - `GET /pedido/:id` → `Order` (`ParseIntPipe`).
  - `GET /minha-conta/pedidos` → `Order[]`.
  - `PATCH /pedido/:id/status` com `{ status }` — **só admin** (`@Roles('admin')`).
- [ ] Testes do service: total calculado com preço do banco mesmo se o cliente mandar `price: 0`; produto esgotado → 400; usuário A não vê pedido do usuário B.

## Critérios de aceite

- Mandar `price: 0.01` no body não altera o total.
- `GET /minha-conta/pedidos` só traz pedidos do usuário do token.
- O admin consegue levar um pedido até `entregue` pelo Swagger.

## Verificação

```bash
cd backend && npm run test && npm run build
TOKEN=$(curl -s -X POST localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"maria@teste.com","password":"123456"}' | node -pe "JSON.parse(require('fs').readFileSync(0)).token")
curl -s -X POST localhost:3000/checkout -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"items":[{"flavorId":"1","quantity":2,"price":0.01}],"payment":"pix","address":{"street":"Av. da Praia","number":"100","district":"Centro"}}'
# esperado: subtotal 25.8, deliveryFee 6, total 31.8
```

## Commit

`feat(orders): checkout com cálculo no servidor, consulta e status de pedidos`

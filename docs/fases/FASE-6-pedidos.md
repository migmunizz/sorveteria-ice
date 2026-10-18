# Fase 6 — Pedidos e checkout

**Objetivo:** criar pedidos com o preço calculado no servidor e consultar os pedidos do usuário.

**Trello:** card 8 — rotas `/checkout`, `/pedido{id}`, `/minha-conta`; card 1 — carrinho de compras, entrega em 10 km.
**Pré-requisitos:** Fases 4 e 5. Sem login por token: o usuário é identificado pelo `userId` enviado pelo frontend.

## Checklist

- [ ] `CreateOrderDto`:
  - `userId`: texto, obrigatório (o service confere se o usuário existe → 400 `"Usuário não encontrado"`).
  - `items`: lista **não vazia** de `{ flavorId, quantity }` (quantidade de 1 a 20). O frontend também manda `name`, `price` e `category` — declarar como opcionais e **ignorar**.
  - `payment`: `pix`, `cartao` ou `dinheiro`.
  - `address`: `{ street, number, district, complement? }`, os três primeiros obrigatórios.
- [ ] `orders.repository.ts`: `create(data)` (pedido + itens de uma vez), `findById(id)` e `findAllByUser(userId)` com o `PrismaService`; o service nunca usa o Prisma direto.
- [ ] `orders.service.ts`:
  - `create(dto)`:
    1. Buscar os produtos no banco; se algum não existir → 400 `"Produto não encontrado"`; se estiver esgotado → 400 `"<nome> está esgotado."`.
    2. Calcular o `subtotal` com o **preço do banco**, somar a taxa `DELIVERY_FEE` e gerar o `total`.
    3. Salvar o pedido e os itens de uma vez (`prisma.order.create` com `items: { create: [...] }`), copiando nome, preço e categoria de cada produto.
  - `findOne(id, userId)` → 404 se não existir **ou** se for de outro usuário.
  - `findAllByUser(userId)` → mais recentes primeiro.
  - Função `toOrder(order)` que devolve o formato `Order` do frontend: `id` como texto, `items` como `CartItem[]` (`flavorId` = `productId`), valores como número, `address` montado com as colunas e `createdAt` em ISO.
- [ ] `orders.controller.ts`:
  - `POST /checkout` → `Order`.
  - `GET /pedido/:id?userId=...` → `Order`.
  - `GET /minha-conta/:userId/pedidos` → `Order[]`.
- [ ] Pagamento: só guardar a forma escolhida (simulado). O pedido nasce como `recebido`. Para mostrar o andamento na apresentação, mudar o `status` pelo `npx prisma studio`.

## Critérios de aceite

- Mandar `price: 0.01` no corpo não muda o total.
- `GET /minha-conta/:userId/pedidos` traz só os pedidos daquele `userId`.
- `GET /pedido/:id` com o `userId` de outra pessoa → 404.

## Verificação

```bash
cd backend && npm run build
# 1) cadastrar um usuário (Fase 4) e copiar o `id` dele
# 2) criar um pedido:
curl -s -X POST localhost:3000/checkout -H "Content-Type: application/json" \
  -d '{"userId":"ID_DO_USUARIO","items":[{"flavorId":"1","quantity":2,"price":0.01}],"payment":"pix","address":{"street":"Av. da Praia","number":"100","district":"Centro"}}'
# esperado: subtotal 25.8, deliveryFee 6, total 31.8
```

## Commit

`feat(orders): checkout com cálculo no servidor e consulta de pedidos`

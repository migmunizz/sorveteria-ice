# Fase 6 — Pedidos e checkout

**Objetivo:** criar pedidos com o preço calculado no servidor e consultar os pedidos do usuário.

**Trello:** card 8 — rotas `/checkout`, `/pedido{id}`, `/minha-conta`; card 1 — carrinho de compras, entrega em 10 km.
**Pré-requisitos:** Fases 4 e 5.

## Checklist

- [ ] `CreateOrderDto`:
  - `items`: lista **não vazia** de `{ flavorId, quantity }` (quantidade de 1 a 20). O frontend também manda `name`, `price` e `category` — declarar como opcionais e **ignorar**.
  - `payment`: `pix`, `cartao` ou `dinheiro`.
  - `address`: `{ street, number, district, complement? }`, os três primeiros obrigatórios.
- [ ] `orders.service.ts`:
  - `create(userId, dto)`:
    1. Buscar os produtos no banco; se algum não existir → 400 `"Produto não encontrado"`; se estiver esgotado → 400 `"<nome> está esgotado."`.
    2. Calcular o `subtotal` com o **preço do banco**, somar a taxa `DELIVERY_FEE` e gerar o `total`.
    3. Salvar o pedido e os itens de uma vez (`prisma.order.create` com `items: { create: [...] }`), copiando nome, preço e categoria de cada produto.
  - `findOne(id, userId)` → 404 se não existir **ou** se for de outro usuário.
  - `findAllByUser(userId)` → mais recentes primeiro.
  - Função `toOrder(order)` que devolve o formato `Order` do frontend: `id` como texto, `items` como `CartItem[]` (`flavorId` = `productId`), valores como número, `address` montado com as colunas e `createdAt` em ISO.
- [ ] `orders.controller.ts` (todas com o `AuthGuard`):
  - `POST /checkout` → `Order`.
  - `GET /pedido/:id` → `Order`.
  - `GET /minha-conta/pedidos` → `Order[]`.
- [ ] Pagamento: só guardar a forma escolhida (simulado). O pedido nasce como `recebido`. Para mostrar o andamento na apresentação, mudar o `status` pelo `npx prisma studio`.

## Critérios de aceite

- Mandar `price: 0.01` no corpo não muda o total.
- `GET /minha-conta/pedidos` traz só os pedidos do usuário do token.
- Um usuário não consegue abrir o pedido de outro.

## Verificação

```bash
cd backend && npm run build
# 1) fazer login (Fase 4) e copiar o token
# 2) criar um pedido:
curl -s -X POST localhost:3000/checkout -H "Authorization: Bearer SEU_TOKEN" -H "Content-Type: application/json" \
  -d '{"items":[{"flavorId":"1","quantity":2,"price":0.01}],"payment":"pix","address":{"street":"Av. da Praia","number":"100","district":"Centro"}}'
# esperado: subtotal 25.8, deliveryFee 6, total 31.8
```

## Commit

`feat(orders): checkout com cálculo no servidor e consulta de pedidos`

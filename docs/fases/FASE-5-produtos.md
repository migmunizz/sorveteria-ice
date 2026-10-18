# Fase 5 — Produtos / cardápio

**Objetivo:** o cardápio passa a vir do banco, com os dados iniciais iguais aos do frontend.

**Trello:** card 8 — rotas `/cardapio` e `/produto{id}`; card 16 “Lista Real” (preços, nomes, sabores, categorias).
**Pré-requisitos:** Fase 3.

## Checklist

- [ ] `prisma/seed.ts` com os **12 produtos de `frontend/src/mocks/flavors.ts`**, com os **mesmos ids `"1"` a `"12"`** (assim carrinhos já salvos no navegador continuam funcionando). Usar `upsert` para poder rodar o seed mais de uma vez.
- [ ] No `package.json` do backend: `"prisma": { "seed": "ts-node prisma/seed.ts" }`.
- [ ] Módulo `products` (`src/products/`):
  - `products.repository.ts`: `findAll(category?)` (ordenado por categoria e nome) e `findById(id)` com o `PrismaService`.
  - `products.service.ts`: usa o repository; `findOne(id)` → 404 `"Produto não encontrado"`.
  - `dto/`: `ProductQueryDto` (`categoria?` validada pelo enum `Category`) e `ProductResponseDto` (formato `Flavor`).
  - Função `toFlavor(product)` que devolve o formato `Flavor` do frontend, com `price` como **número** (o Prisma devolve `Decimal`).
  - `products.controller.ts`: `GET /cardapio` (aceita `?categoria=acai`) e `GET /produto/:id`.

## Critérios de aceite

- `GET /cardapio` devolve os 12 produtos, no mesmo formato e com os mesmos valores do mock do frontend.
- `GET /produto/4` devolve o Pistache; `GET /produto/999` → 404.

## Verificação

```bash
cd backend && npx prisma db seed && npm run build
curl -s localhost:3000/cardapio
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/produto/999   # 404
```

## Commit

`feat(products): cardápio e detalhe do produto vindos do banco`

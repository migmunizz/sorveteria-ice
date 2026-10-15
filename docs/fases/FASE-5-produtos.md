# Fase 5 — Produtos / cardápio

**Objetivo:** servir o cardápio do banco, com seed inicial igual ao mock do frontend.

**Trello:** card 8 — rotas `/cardapio` e `/produto{id}`; card 16 “Lista Real” (preços, nomes, sabores, categorias).
**Pré-requisitos:** Fase 3 (a 4 não é obrigatória para esta).

## Checklist

- [ ] `prisma/seed.ts` com os **12 produtos de `frontend/src/mocks/flavors.ts`**, usando os **mesmos ids `"1"` a `"12"`** (assim carrinhos salvos no navegador continuam válidos). Usar `upsert` para o seed poder rodar várias vezes.
- [ ] No seed, criar também um usuário **admin**: `admin@ai-ce.com` / senha do `.env` `ADMIN_PASSWORD` (adicionar ao `.env.example`), `role: admin`, CPF válido de teste.
- [ ] Configurar `"prisma": { "seed": "ts-node prisma/seed.ts" }` no `package.json`.
- [ ] Módulo `products` (`src/products/`):
  - `products.service.ts`: `findAll()` ordenado por categoria e nome; `findOne(id)` → 404 `"Produto não encontrado"`.
  - Mapper `toFlavor(product)` → formato `Flavor` do contrato (`price` como **number**, não string de Decimal).
  - `products.controller.ts`: `GET /cardapio` e `GET /produto/:id`.
  - Query opcional `GET /cardapio?categoria=acai` (validar contra o enum; inválida → 400).
- [ ] Swagger com exemplo de resposta.
- [ ] Teste: `toFlavor` converte `Decimal('12.90')` em `12.9`.

## Critérios de aceite

- `GET /cardapio` devolve 12 itens com o mesmo formato e os mesmos valores do mock do frontend.
- `GET /produto/4` devolve o Pistache; `GET /produto/999` → 404 `{ "message": "Produto não encontrado" }`.

## Verificação

```bash
cd backend && npx prisma db seed && npm run test && npm run build
curl -s localhost:3000/cardapio | head -c 400; echo
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/produto/999   # 404
```

## Commit

`feat(products): cardápio e detalhe do produto com seed inicial`

# Fase 9 — Recomendação com IA em Python *(opcional)*

**Objetivo:** um microserviço Python que sugere sabores, consumido pelo NestJS e exibido pelo mascote no frontend.

**Trello:** card 8 — comentário “Se possível, fazer uma interação com Python com alguma IA”.
**Pré-requisitos:** Fase 5.

## Desenho

```
React  ──GET /recomendacao──▶  NestJS (RecommendationsController)
                                   │  HTTP
                                   ▼
                         Python FastAPI (ai/)  POST /recomendar
                         regras + (opcional) LLM
```

O NestJS **nunca quebra** se o Python estiver fora: nesse caso devolve uma recomendação padrão (os produtos com `highlight`).

## Checklist

### Serviço Python (`ai/`)
- [ ] `ai/requirements.txt`: `fastapi`, `uvicorn`, `pydantic`.
- [ ] `ai/main.py` com `POST /recomendar` recebendo `{ hour: int, cartCategories: string[], products: Flavor[] }` e devolvendo `{ productIds: string[], message: string }` (até 3 produtos, mensagem curta em pt-BR na voz do mascote).
- [ ] Lógica baseada em regras, simples e explicável:
  - Antes das 15h → priorizar açaí e picolés; à noite → milkshakes e sorvetes.
  - Não sugerir categorias que já estão no carrinho; nunca sugerir `available = false`.
  - Desempate por `promo`, depois `highlight`.
- [ ] *(Opcional)* se `LLM_API_KEY` estiver definida, gerar só a `message` com um modelo de linguagem (qualquer provedor); a escolha dos produtos continua nas regras.
- [ ] `ai/README.md` com como rodar: `python -m venv .venv && pip install -r requirements.txt && uvicorn main:app --port 8000`.
- [ ] Testes com `pytest` para as regras.

### NestJS
- [ ] Módulo `recommendations`: `GET /recomendacao?categorias=acai,sorvetes` → chama `AI_URL` (`.env`, padrão `http://localhost:8000`) com timeout de 2 s; fallback para os destaques.

### Frontend
- [ ] `services/recommendations.ts` (mock = 3 destaques).
- [ ] Bloco “O mascote sugere” no carrinho: mascote pequeno (pose `thumbs-up`) + mensagem + até 3 `FlavorCard`.

## Critérios de aceite

- Com o Python desligado, o carrinho continua funcionando e mostra os destaques.
- Com o Python ligado, as sugestões mudam conforme a hora e o carrinho.

## Commit

`feat(ai): recomendação de sabores com microserviço Python`

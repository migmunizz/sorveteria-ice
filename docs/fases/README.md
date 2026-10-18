# Plano de implementação — fases

Cada fase é pequena, tem checklist, critérios de aceite e um comando de verificação. Stack, padrões e contrato da API estão em [`../arquitetura.md`](../arquitetura.md). Faça um commit ao final de cada fase.

| # | Fase | Sprint (Trello) | Status |
|---|---|---|---|
| 0 | [Repositório e ambiente](FASE-0-repositorio.md) | I · 29/09–20/10 | ✅ concluída (restam pendências manuais) |
| 1 | [Frontend React](FASE-1-frontend.md) | I | ✅ concluída (restam pendências de conteúdo) |
| 2 | [Análise e modelagem do backend (MVC)](FASE-2-analise-backend.md) | I | ✅ concluída |
| 3 | [Banco de dados + NestJS + Prisma](FASE-3-setup-backend.md) | II · 20/10–03/11 | ✅ concluída |
| 4 | [Usuários e login](FASE-4-auth-usuarios.md) | II | ✅ concluída |
| 5 | [Produtos / cardápio](FASE-5-produtos.md) | II | ⬜ pendente |
| 6 | [Pedidos e checkout](FASE-6-pedidos.md) | II | ⬜ pendente |
| 7 | [Integração frontend ↔ backend](FASE-7-integracao.md) | II | ⬜ pendente |
| 8 | [Revisão e entrega](FASE-8-entrega.md) | II | ⬜ pendente |

Legenda: ⬜ pendente · 🟨 em andamento · ✅ concluída

## Ordem

```
0 ✅ → 1 ✅ → 2 ✅ → 3 ✅ → 4 ✅ → 5 → 6 → 7 → 8
```

## Fora do escopo (ideias para depois do MVP)

Painel administrativo, pagamento real pelo PagSeguro, recomendação de sabores com IA, MongoDB, cupons e avaliações.

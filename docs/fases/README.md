# Plano de implementação — fases

Cada fase é pequena, tem checklist, critérios de aceite e um comando de verificação. Stack, padrões e contrato da API estão em [`../arquitetura.md`](../arquitetura.md). Faça um commit ao final de cada fase.

| # | Fase | Sprint (Trello) | Status |
|---|---|---|---|
| 0 | [Repositório e ambiente](FASE-0-repositorio.md) | I · 29/09–20/10 | ⬜ pendente |
| 1 | [Frontend React](FASE-1-frontend.md) | I | ✅ concluída (restam pendências de conteúdo) |
| 2 | [Análise e modelagem do backend (MVC)](FASE-2-analise-backend.md) | I | ⬜ pendente |
| 3 | [Setup NestJS + Prisma + MySQL](FASE-3-setup-backend.md) | II · 20/10–03/11 | ⬜ pendente |
| 4 | [Usuários e autenticação](FASE-4-auth-usuarios.md) | II | ⬜ pendente |
| 5 | [Produtos / cardápio](FASE-5-produtos.md) | II | ⬜ pendente |
| 6 | [Pedidos e checkout](FASE-6-pedidos.md) | II | ⬜ pendente |
| 7 | [Integração frontend ↔ backend](FASE-7-integracao.md) | II | ⬜ pendente |
| 8 | [Pagamento PagSeguro](FASE-8-pagamento.md) *(opcional)* | II | ⬜ pendente |
| 9 | [Recomendação com IA em Python](FASE-9-ia-python.md) *(opcional)* | II | ⬜ pendente |
| 10 | [Qualidade, deploy e entrega](FASE-10-entrega.md) | II | ⬜ pendente |

Legenda: ⬜ pendente · 🟨 em andamento · ✅ concluída

## Ordem e dependências

```
0 → 1 ✅ → 2 → 3 → 4 → 5 → 6 → 7 → 10
                              ├→ 8 (opcional, depois da 6)
                              └→ 9 (opcional, depois da 5)
```

As fases 8 e 9 são extras. Se o prazo apertar, pule direto da 7 para a 10.

# Fase 8 — Pagamento PagSeguro *(opcional)*

**Objetivo:** demonstrar o padrão **Strategy** com um gateway de pagamento: simulado por padrão, PagSeguro sandbox quando houver token.

**Trello:** card 1 — “pag seguro - pagamento”.
**Pré-requisitos:** Fase 6.

> Mantenha simples. O objetivo acadêmico é a arquitetura (Strategy + configuração por ambiente), não um checkout de produção.

## Checklist

- [ ] Adicionar ao schema: `enum PaymentStatus { pendente aprovado recusado }` e `Order.paymentStatus PaymentStatus @default(pendente)`, `Order.paymentRef String?`. Migrar. Incluir `paymentStatus?` no tipo `Order` do frontend e no mapper.
- [ ] `src/payments/payment-gateway.interface.ts`:
  ```ts
  export interface PaymentGateway {
    charge(order: { id: number; total: number; payment: 'pix' | 'cartao' | 'dinheiro' }): Promise<{ status: 'aprovado' | 'recusado' | 'pendente'; ref?: string; pixCode?: string }>;
  }
  export const PAYMENT_GATEWAY = Symbol('PAYMENT_GATEWAY');
  ```
- [ ] `FakePaymentGateway`: `dinheiro` → `pendente`; `pix` e `cartao` → `aprovado` com `ref` aleatória.
- [ ] `PagSeguroGateway`: usa a API **sandbox** do PagBank/PagSeguro (consultar a documentação oficial atual antes de implementar; o token vem de `PAGSEGURO_TOKEN`). Para Pix, gerar a cobrança e devolver o código copia-e-cola.
- [ ] `PaymentsModule` com provider por fábrica: se `PAGSEGURO_TOKEN` existir → `PagSeguroGateway`, senão `FakePaymentGateway`.
- [ ] `OrdersService.create` chama `gateway.charge()` depois de gravar o pedido e atualiza `paymentStatus`/`paymentRef`.
- [ ] Frontend: na página do pedido, mostrar o status do pagamento (com ícone + texto) e, se houver `pixCode`, um botão “Copiar código Pix”.

## Critérios de aceite

- Sem `PAGSEGURO_TOKEN`, todo o fluxo funciona com o gateway simulado.
- O controller e o service de pedidos não conhecem a classe concreta do gateway (só a interface).

## Verificação

```bash
cd backend && npm run test && npm run build
```

## Commit

`feat(payments): gateway de pagamento com Strategy (simulado e PagSeguro sandbox)`

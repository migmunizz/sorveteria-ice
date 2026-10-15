# Fase 2 — Análise e modelagem do backend (MVC)

**Objetivo:** produzir a documentação de análise exigida pela disciplina (requisitos, diagrama de classes, modelo de dados, BPMN, arquitetura MVC e padrões de projeto) **antes** de escrever código do backend. Esta fase **não cria código**, só arquivos em `docs/analise/`.

**Trello:** card 1 “Reunião inicial” (metodologias: diagrama de classe, BPMN, padrão de projeto), card 8 “Backend - Nestjs” (entidades e rotas), card 13 “Descoberta e planejamento”.
**Pré-requisitos:** Fase 1. Ler `frontend/src/types/index.ts` (é o contrato) e `docs/trello.md`.

## Checklist

Todos os diagramas em **Mermaid** dentro de Markdown (o GitHub renderiza). Escrever em pt-BR.

- [ ] `docs/analise/01-requisitos.md`
  - Descrição do problema e público (clientes do litoral de SP, raio de 10 km).
  - **Requisitos funcionais** numerados (RF01…): cadastro, login, listar cardápio, filtrar por categoria, ver produto, carrinho, checkout com endereço e pagamento, acompanhar pedido, histórico na minha conta, editar dados, contato, (admin) atualizar status do pedido.
  - **Requisitos não funcionais** (RNF01…): mobile first, tema escuro, acessibilidade (contraste WCAG, foco visível), senha com hash, JWT, resposta da API < 500 ms local, pt-BR.
  - **Escopo do MVP** × **Backlog futuro** (ex.: cupons, avaliações, painel admin completo, app mobile, MongoDB para logs).
- [ ] `docs/analise/02-casos-de-uso.md` — diagrama (flowchart Mermaid com atores Cliente, Visitante, Admin) + tabela com os casos de uso principais (fluxo principal e alternativo de “Fazer pedido”).
- [ ] `docs/analise/03-diagrama-de-classes.md` — `classDiagram` com as classes do domínio e as classes MVC de cada módulo:
  - Domínio: `User`, `Product`, `Order`, `OrderItem`, `ContactMessage`, enums `Category`, `OrderStatus`, `PaymentMethod`, `Role`.
  - Por módulo: `XController` → `XService` → `PrismaService`, e os DTOs (`RegisterDto`, `LoginDto`, `CreateOrderDto`, `UpdateMeDto`, `CreateContactDto`).
- [ ] `docs/analise/04-modelo-de-dados.md` — `erDiagram` coerente com o schema abaixo + explicação de cada tabela.
- [ ] `docs/analise/05-bpmn-pedido.md` — processo “Pedido de sorvete” com raias (Cliente, Sistema, Sorveteria): escolher produtos → login/cadastro → informar endereço → pagar → pedido recebido → preparando → saiu para entrega → entregue; incluir gateway “dentro do horário?” e “pagamento aprovado?”. Usar `flowchart LR` com `subgraph` por raia. Adicionar nota: *se o professor exigir notação BPMN oficial, redesenhar em https://demo.bpmn.io a partir deste fluxo*.
- [ ] `docs/analise/06-arquitetura-mvc.md`
  - Diagrama do fluxo de uma requisição: React (View) → HTTP/JSON → `Controller` → `Service` (Model/regra) → `PrismaService` → MySQL.
  - Tabela “camada MVC → arquivos do Nest” (igual à seção MVC de `docs/arquitetura.md`).
  - Estrutura de pastas do `backend/src` (ver Fase 3).
- [ ] `docs/analise/07-padroes-de-projeto.md` — explicar, com trecho de código curto de exemplo, onde cada padrão aparece:
  - **MVC**, **Injeção de dependência** (NestJS), **Module**, **DTO**, **Repository** (services sobre o Prisma), **Singleton** (`PrismaService`), **Guard / Chain of Responsibility** (`JwtAuthGuard`), **Strategy** (gateway de pagamento da Fase 8), **Mapper** (entidade do banco → JSON do contrato).
- [ ] `docs/analise/08-decisoes.md` — decisões registradas (formato: contexto, decisão, consequência):
  1. Somente **MySQL** no MVP; MongoDB fica no backlog (era citado na reunião inicial, mas duas bases complicam um projeto simples).
  2. **Prisma** como ORM.
  3. **JWT** stateless, expiração de 7 dias.
  4. Preço sempre recalculado no backend.
  5. Pagamento começa **simulado**; PagSeguro sandbox é opcional (Fase 8).
  6. Rotas em pt-BR, código em inglês.

## Schema de referência (usar nos diagramas e na Fase 3)

```prisma
enum Role          { cliente admin }
enum Category      { sorvetes casquinhas picoles acai milkshakes }
enum OrderStatus   { recebido preparando saiu_para_entrega entregue }
enum PaymentMethod { pix cartao dinheiro }

model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  cpf          String   @unique
  phone        String
  passwordHash String
  role         Role     @default(cliente)
  createdAt    DateTime @default(now())
  orders       Order[]
}

model Product {
  id          String      @id @default(uuid())
  name        String
  description String      @db.Text
  price       Decimal     @db.Decimal(10, 2)
  category    Category
  imageUrl    String      @default("")
  available   Boolean     @default(true)
  highlight   Boolean     @default(false)
  isNew       Boolean     @default(false)
  promo       Boolean     @default(false)
  orderItems  OrderItem[]
}

model Order {
  id          Int           @id @default(autoincrement())
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  status      OrderStatus   @default(recebido)
  payment     PaymentMethod
  street      String
  number      String
  district    String
  complement  String?
  subtotal    Decimal       @db.Decimal(10, 2)
  deliveryFee Decimal       @db.Decimal(10, 2)
  total       Decimal       @db.Decimal(10, 2)
  createdAt   DateTime      @default(now())
  items       OrderItem[]
}

model OrderItem {
  id        Int      @id @default(autoincrement())
  orderId   Int
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  name      String   // cópia do nome no momento da compra
  price     Decimal  @db.Decimal(10, 2) // cópia do preço no momento da compra
  category  Category
  quantity  Int
}

model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())
}
```

> `Order.id` é `Int` no banco (pedidos numerados #1, #2…) e vai como **string** no JSON, porque o contrato do frontend usa `id: string`.

## Critérios de aceite

- Os 8 arquivos existem e todos os blocos Mermaid renderizam (sem erro de sintaxe).
- Entidades, campos e rotas batem com `frontend/src/types/index.ts` e com a tabela de contrato de `docs/arquitetura.md`.

## Verificação

```bash
ls docs/analise/
# validar Mermaid (opcional): npx -y @mermaid-js/mermaid-cli -i docs/analise/03-diagrama-de-classes.md -o /tmp/check.md
```

## Commit

`docs(analise): requisitos, diagramas UML/ER/BPMN, arquitetura MVC e decisões`

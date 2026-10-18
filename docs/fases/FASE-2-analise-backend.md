# Fase 2 — Análise e modelagem do backend (MVC)

**Objetivo:** escrever a análise do sistema (requisitos, casos de uso, diagrama de classes, modelo do banco, BPMN, arquitetura MVC e padrões de projeto) **antes** de programar o backend. Esta fase **não cria código**, só arquivos em `docs/analise/`.

**Trello:** card 1 “Reunião inicial” (diagrama de classe, BPMN, padrão de projeto), card 8 “Backend - Nestjs” (entidades e rotas), card 13 “Descoberta e planejamento”.
**Pré-requisitos:** Fase 1. Ler `frontend/src/types/index.ts` (é o contrato), `docs/arquitetura.md` e `docs/trello.md`.

## Checklist

Diagramas em **Mermaid** dentro do Markdown (o GitHub desenha automaticamente). Tudo em pt-BR, com texto curto e direto — é material para apresentar.

- [ ] `docs/analise/01-requisitos.md`
  - Problema e público (clientes do litoral de SP, entrega em até 10 km).
  - **Requisitos funcionais** (RF01…): cadastro, login, ver cardápio, filtrar por categoria, ver produto, carrinho, finalizar pedido com endereço e forma de pagamento, acompanhar pedido, histórico em “minha conta”, editar dados, enviar mensagem de contato.
  - **Requisitos não funcionais** (RNF01…): funciona bem no celular, tema escuro, acessível (contraste e foco visível), senha guardada com hash, login com token, textos em pt-BR.
  - **Escopo do MVP** × **Fora do escopo** (painel administrativo, pagamento real pelo PagSeguro, cupons, avaliações, recomendação com IA, app mobile).
- [ ] `docs/analise/02-casos-de-uso.md` — diagrama (flowchart Mermaid com os atores Visitante e Cliente) + tabela dos casos de uso, detalhando “Fazer pedido” (fluxo principal e alternativos: carrinho vazio, não logado, campo de endereço faltando).
- [ ] `docs/analise/03-diagrama-de-classes.md` — `classDiagram` com:
  - Domínio: `User`, `Product`, `Order`, `OrderItem`, `ContactMessage` e os enums `Category`, `OrderStatus`, `PaymentMethod`.
  - Camadas MVC de cada módulo: `XController` → `XService` → `PrismaService`, e os DTOs (`RegisterDto`, `LoginDto`, `UpdateMeDto`, `CreateOrderDto`, `CreateContactDto`).
- [ ] `docs/analise/04-modelo-de-dados.md` — `erDiagram` igual ao schema abaixo + uma frase explicando cada tabela e cada relacionamento.
- [ ] `docs/analise/05-bpmn-pedido.md` — processo “Pedido de sorvete” com raias Cliente, Sistema e Sorveteria: escolher produtos → entrar/cadastrar → informar endereço → escolher pagamento → pedido recebido → preparando → saiu para entrega → entregue. Incluir as decisões “está logado?” e “dentro do horário de funcionamento?”. Usar `flowchart LR` com um `subgraph` por raia. Nota no fim: *se for exigida a notação BPMN oficial, redesenhar em https://demo.bpmn.io seguindo este fluxo.*
- [ ] `docs/analise/06-arquitetura-mvc.md`
  - Diagrama do caminho de uma requisição: tela React → HTTP/JSON → Controller → Service → PrismaService → MySQL, e a volta.
  - Tabela “parte do MVC → arquivos do NestJS” (igual à de `docs/arquitetura.md`).
  - Árvore de pastas do `backend/src` (ver Fase 3).
- [ ] `docs/analise/07-padroes-de-projeto.md` — para cada padrão, 2–3 linhas e um trecho curto de código mostrando onde ele aparece:
  **MVC**, **Injeção de dependência** (o Nest entrega o service pronto no controller), **Módulos**, **DTO**, **Service como camada de acesso a dados** (parecido com Repository), **Singleton** (`PrismaService`, uma conexão só), **Guard** (`AuthGuard` bloqueia rotas sem login) e **Mapper** (converte o registro do banco no JSON que o frontend espera).
- [ ] `docs/analise/08-decisoes.md` — decisões no formato contexto → decisão → consequência:
  1. **MySQL** como único banco (o MongoDB citado na reunião inicial ficou de fora para manter o projeto simples).
  2. Banco instalado direto no computador, **sem Docker** (no Fedora, MariaDB, compatível com MySQL).
  3. **Prisma** para acessar o banco sem escrever SQL na mão.
  4. Login com **JWT** e senha com hash (`bcryptjs`).
  5. Preço sempre recalculado no backend.
  6. Pagamento **simulado**; integração real com PagSeguro fica para depois do MVP.
  7. Rotas em português, código em inglês.

## Schema do banco (usar nos diagramas e na Fase 3)

```prisma
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

> `Order.id` é número no banco (pedidos #1, #2…) e vai como **texto** no JSON, porque o frontend usa `id: string`.

## Critérios de aceite

- Os 8 arquivos existem e os diagramas aparecem desenhados no GitHub.
- Entidades, campos e rotas batem com `frontend/src/types/index.ts` e com a tabela de contrato de `docs/arquitetura.md`.

## Verificação

```bash
ls docs/analise/
```
Depois do push, abrir cada arquivo no GitHub e conferir se os diagramas foram desenhados.

## Commit

`docs(analise): requisitos, diagramas UML/ER/BPMN, arquitetura MVC e decisões`

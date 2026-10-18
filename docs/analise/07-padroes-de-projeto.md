# Padrões de projeto

## MVC

Separa a entrada da requisição (Controller), a regra de negócio (Service/Model) e o formato de saída (View, no caso o JSON). Evita que o controller acumule lógica que deveria estar no service.

```ts
// orders.controller.ts
@Post()
create(@Body() dto: CreateOrderDto, @Req() req) {
  return this.ordersService.create(req.user.id, dto); // sem regra de negócio aqui
}
```

## Injeção de dependência

O Nest cria e entrega as instâncias prontas (via construtor), em vez de cada classe criar suas próprias dependências com `new`.

```ts
// orders.service.ts
constructor(private readonly prisma: PrismaService) {}
```

## Módulos

Cada recurso (`auth`, `products`, `orders`...) é um módulo independente, que declara seus próprios controllers e providers e importa só o que precisa.

```ts
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
```

## DTO (Data Transfer Object)

Classe que descreve o formato dos dados de entrada e, com `class-validator`, valida a requisição antes de chegar no service.

```ts
export class CreateOrderDto {
  @IsArray() items: CartItem[];
  @IsEnum(PaymentMethod) payment: PaymentMethod;
  @ValidateNested() address: AddressDto;
}
```

## Service como camada de acesso a dados

Parecido com o padrão **Repository**: o controller não conhece o Prisma, só chama métodos do service (`create`, `findByUser`...), que concentra todo o acesso ao banco.

```ts
findByUser(userId: string) {
  return this.prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}
```

## Singleton

O `PrismaService` é registrado como provider global (`@Global()`) e o Nest mantém **uma única instância**, reaproveitando a mesma conexão com o MySQL em toda a aplicação.

```ts
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
```

## Guard

O `AuthGuard` intercepta a requisição antes do controller e bloqueia rotas que exigem login sem um token JWT válido (ex.: `/checkout`, `/minha-conta`).

```ts
@UseGuards(AuthGuard)
@Get('pedidos')
findMine(@Req() req) {
  return this.ordersService.findByUser(req.user.id);
}
```

## Mapper

Função que converte o registro bruto do banco (com `Decimal` do Prisma, por exemplo) no JSON exato que o frontend espera (com `number` e `id` em `string`).

```ts
function toOrderResponse(order: OrderWithItems): Order {
  return { ...order, id: String(order.id), total: Number(order.total) };
}
```

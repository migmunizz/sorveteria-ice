# Diagrama de classes

## Domínio

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String cpf
        +String phone
        +String passwordHash
        +DateTime createdAt
    }

    class Product {
        +String id
        +String name
        +String description
        +Decimal price
        +Category category
        +String imageUrl
        +Boolean available
        +Boolean highlight
        +Boolean isNew
        +Boolean promo
    }

    class Order {
        +Int id
        +String userId
        +OrderStatus status
        +PaymentMethod payment
        +String street
        +String number
        +String district
        +String complement
        +Decimal subtotal
        +Decimal deliveryFee
        +Decimal total
        +DateTime createdAt
    }

    class OrderItem {
        +Int id
        +Int orderId
        +String productId
        +String name
        +Decimal price
        +Category category
        +Int quantity
    }

    class ContactMessage {
        +Int id
        +String name
        +String email
        +String message
        +DateTime createdAt
    }

    class Category {
        <<enumeration>>
        sorvetes
        casquinhas
        picoles
        acai
        milkshakes
    }

    class OrderStatus {
        <<enumeration>>
        recebido
        preparando
        saiu_para_entrega
        entregue
    }

    class PaymentMethod {
        <<enumeration>>
        pix
        cartao
        dinheiro
    }

    User "1" --> "0..*" Order : faz
    Order "1" --> "1..*" OrderItem : contém
    Product "1" --> "0..*" OrderItem : referenciado por
    Product --> Category
    Order --> OrderStatus
    Order --> PaymentMethod
    OrderItem --> Category
```

> `OrderItem` guarda uma cópia de `name`, `price` e `category` no momento da compra — se o produto mudar de preço depois, o pedido antigo não muda.

## Camadas MVC por módulo

Cada recurso (`auth`, `users`, `products`, `orders`, `contact`) segue o mesmo caminho: **Controller → Service → PrismaService**, usando DTOs para validar a entrada.

```mermaid
classDiagram
    class XController {
        +handle(dto) Response
    }
    class XService {
        +execute(dto) Result
    }
    class PrismaService {
        +user
        +product
        +order
        +contactMessage
    }

    class RegisterDto {
        +String name
        +String email
        +String cpf
        +String phone
        +String password
    }
    class LoginDto {
        +String email
        +String password
    }
    class UpdateMeDto {
        +String name
        +String phone
    }
    class CreateOrderDto {
        +CartItem[] items
        +PaymentMethod payment
        +Address address
    }
    class CreateContactDto {
        +String name
        +String email
        +String message
    }

    XController --> XService : injeta
    XService --> PrismaService : injeta
    XController ..> RegisterDto : auth
    XController ..> LoginDto : auth
    XController ..> UpdateMeDto : users
    XController ..> CreateOrderDto : orders
    XController ..> CreateContactDto : contact
```

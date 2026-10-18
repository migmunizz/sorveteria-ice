# Decisões de arquitetura

Formato: contexto → decisão → consequência.

## 1. MySQL como único banco

**Contexto:** a reunião inicial com o cliente citou React, NestJS, TypeScript, Prisma, MySQL e MongoDB.
**Decisão:** usar só MySQL no MVP; o MongoDB citado na reunião inicial ficou de fora.
**Consequência:** um único banco relacional para todas as entidades (usuário, produto, pedido, contato), com um schema e uma conexão só — menos complexidade para um projeto acadêmico.

## 2. Banco instalado direto no computador, sem Docker

**Contexto:** o projeto prioriza simplicidade e poucas ferramentas.
**Decisão:** instalar o MySQL/MariaDB direto no sistema (no Fedora, o pacote `mariadb-server`, compatível com MySQL), sem Docker/docker-compose.
**Consequência:** não é preciso aprender Docker para rodar o projeto; em compensação, o ambiente depende do banco já estar instalado e ligado na máquina de quem for rodar.

## 3. Prisma para acessar o banco

**Contexto:** é preciso ler e escrever nas tabelas sem escrever SQL na mão em cada service.
**Decisão:** usar o Prisma como ORM, com `schema.prisma` como fonte única das tabelas e `prisma migrate` para versionar o banco.
**Consequência:** menos código repetido de acesso a dados e tipos gerados automaticamente a partir do schema; em troca, qualquer mudança de modelo exige gerar uma nova migração.

## 4. Login com JWT e senha com hash

**Contexto:** o sistema precisa identificar o cliente em rotas como checkout e "minha conta", sem guardar senha em texto puro.
**Decisão:** gerar hash da senha com `bcryptjs` no cadastro e, no login, devolver um token JWT (`@nestjs/jwt`) que o frontend envia no cabeçalho `Authorization` nas rotas protegidas.
**Consequência:** a senha nunca aparece em nenhuma resposta da API (RNF04); o backend não guarda sessão — cada requisição prova a identidade pelo token.

## 5. Preço sempre recalculado no backend

**Contexto:** o carrinho de compras vive no navegador, então o preço que ele envia no checkout não é confiável.
**Decisão:** o backend sempre busca o preço atual do produto no banco e recalcula subtotal, taxa de entrega e total — nunca usa o preço que vem do frontend.
**Consequência:** impossível manipular o preço de um pedido alterando a requisição; o item do pedido guarda uma cópia do preço no momento da compra, para o histórico não mudar depois.

## 6. Pagamento simulado

**Contexto:** a reunião inicial pediu integração com PagSeguro, mas isso exige conta de sandbox, webhook e mais tempo de desenvolvimento.
**Decisão:** no MVP, o checkout só registra a forma de pagamento escolhida (Pix, cartão ou dinheiro) sem processar nenhum pagamento real.
**Consequência:** o fluxo de compra fica completo e testável sem depender de um serviço externo; a integração real com o PagSeguro fica fora do escopo do MVP (ver `01-requisitos.md`).

## 7. Rotas em português, código em inglês

**Contexto:** o produto é em português (público brasileiro), mas o código segue convenções comuns de nomenclatura em inglês.
**Decisão:** rotas da API, textos de tela e mensagens de erro em português; nomes de classes, métodos e variáveis em inglês (`OrdersService`, `createOrder`).
**Consequência:** a experiência do usuário final fica inteiramente em português, enquanto o código permanece legível por quem conhece as convenções usuais de TypeScript/NestJS.

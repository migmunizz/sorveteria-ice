# Requisitos

## Problema e público

A sorveteria é um pequeno negócio do litoral de São Paulo que hoje vende só por WhatsApp. O objetivo do sistema é dar um canal de vendas online: o cliente vê o cardápio, monta o carrinho, finaliza o pedido com endereço e forma de pagamento, e acompanha o status até a entrega.

Público: moradores e visitantes do litoral dentro do raio de entrega (até **10 km** da loja). Uso principal pelo celular, no calor, muitas vezes com uma mão só.

## Requisitos funcionais

| Código | Descrição |
|---|---|
| RF01 | O visitante pode se cadastrar com nome completo, e-mail, CPF, telefone e senha. |
| RF02 | O visitante cadastrado pode fazer login com e-mail e senha. |
| RF03 | Qualquer pessoa pode ver o cardápio (lista de produtos) sem precisar estar logada. |
| RF04 | O cardápio pode ser filtrado por categoria (sorvetes, casquinhas, picolés, açaí, milkshakes). |
| RF05 | Qualquer pessoa pode ver a página de um produto específico. |
| RF06 | O cliente pode adicionar e remover produtos de um carrinho de compras. |
| RF07 | O cliente pode finalizar o pedido informando endereço de entrega e forma de pagamento (Pix, cartão ou dinheiro). |
| RF08 | O sistema exige login para finalizar um pedido. |
| RF09 | O cliente pode acompanhar o status do seu pedido (recebido, preparando, saiu para entrega, entregue). |
| RF10 | O cliente vê o histórico dos próprios pedidos em "minha conta". |
| RF11 | O cliente pode editar os próprios dados cadastrais em "minha conta". |
| RF12 | Qualquer pessoa pode enviar uma mensagem de contato (nome, e-mail, mensagem). |

## Requisitos não funcionais

| Código | Descrição |
|---|---|
| RNF01 | Interface responsiva, com prioridade para o uso no celular (mobile first). |
| RNF02 | Tema visual escuro, seguindo o Design System do projeto. |
| RNF03 | Acessibilidade mínima: contraste adequado entre texto e fundo, foco visível nos elementos interativos. |
| RNF04 | A senha do usuário nunca é guardada em texto puro — só o hash (`bcryptjs`). |
| RNF05 | Rotas que exigem login usam token JWT enviado no cabeçalho `Authorization`. |
| RNF06 | Todos os textos de interface, mensagens de erro e rotas da API estão em português. |

## Escopo do MVP

- Cadastro e login de cliente.
- Cardápio público com filtro por categoria.
- Carrinho de compras (no navegador) e checkout.
- Pagamento simulado (Pix, cartão ou dinheiro na entrega).
- Acompanhamento de pedido e histórico em "minha conta".
- Edição de dados cadastrais.
- Formulário de contato.

## Fora do escopo

- Painel administrativo (gestão de produtos e pedidos é feita direto no banco, via `prisma studio`).
- Pagamento real pelo PagSeguro (fica simulado no MVP).
- Cupons de desconto.
- Avaliações de produtos.
- Recomendação de sabores com IA.
- Aplicativo mobile nativo.

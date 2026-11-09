# Fase 8 — Revisão e entrega

**Objetivo:** deixar o projeto pronto para a apresentação: teste de usabilidade, ajustes finais e README da disciplina.

**Trello:** card 14 “Finalização”, card 11 “Teste de usabilidade”, card 10 “Elaborar o readme”, card 12 “Reunião final”, card 9 “Atualizar Repositorio - Commit”.
**Pré-requisitos:** Fase 7.

## Checklist

### Conteúdo fictício (produtos, imagens e textos)
Os dados reais da sorveteria não existem, então o projeto usa conteúdo **inventado**, coerente e marcado como fictício. Nada de marca, foto ou texto copiado de outro lugar.
- [x] **Produtos:** revisar os 12 produtos de `frontend/src/mocks/flavors.ts` (ids `"1"` a `"12"`, 5 categorias, pelo menos 2 de cada). Nomes criativos, descrições de 1 ou 2 frases em português, preços plausíveis (R$ 6 a R$ 28), alguns `highlight`, `isNew` e `promo`. Um produto `available: false` para mostrar o estado “esgotado”.
- [x] **Imagens:** criar uma ilustração **original** por produto em SVG (cores do Design System, estilo simples e alegre, sem usar personagem ou marca existente), salvando em `frontend/public/produtos/<id>.svg`. Preencher o `imageUrl` com `/produtos/<id>.svg`. Se existir a pasta `assets/produtos/`, deixar lá uma cópia e atualizar `assets/README.md`.
- [x] **Sincronizar o banco:** `backend/prisma/seed.ts` com os mesmos produtos, ids e `imageUrl` do mock (o `upsert` precisa atualizar também esses campos). Rodar `npx prisma db seed` e conferir `GET /cardapio` igual ao mock.
- [x] **Textos do site (`frontend/src/config/site.ts` e páginas Home, Sobre e Contato):** nome da loja, slogan, endereço, telefone, WhatsApp, e-mail, Instagram e horários **fictícios** (telefone no formato `(00) 00000-0000`, e-mail em `exemplo.com`, endereço inventado). Texto “Sobre nós” de 2 ou 3 parágrafos contando uma história inventada da sorveteria.
- [x] Deixar um aviso discreto no rodapé e no README: “Projeto acadêmico. Dados, produtos e imagens fictícios.”
- [x] Conferir no navegador que nenhum card ficou sem imagem e que o texto não estoura no celular.

### Teste de usabilidade
- [x] Criar `docs/teste-usabilidade.md` com: roteiro de 5 tarefas (achar um açaí, adicionar 2 itens, criar conta, finalizar pedido, achar o pedido em “minha conta”), uma tabela para 3 a 5 pessoas (conseguiu? quanto tempo? onde travou?) e uma seção “problemas encontrados → correção”.
- [ ] Aplicar o teste com as pessoas (manual) e corrigir os problemas anotados. *(tarefa manual — ver resumo)*

### Revisão rápida
- [x] Rodar o Lighthouse (via CLI, headless, já que não há sessão interativa do Chrome DevTools nesta máquina) na página inicial com `npm run front` e também no build de produção. Notas em `docs/qualidade.md`; corrigidos os itens simples (imagens sem tamanho, meta description, `robots.txt`).
- [x] Conferir que `backend/.env.example` e `frontend/.env.example` têm todas as variáveis usadas.
- [x] Revisar o README de “como rodar” do zero: instalar o banco, criar o usuário, `npm install`, migrar, seed, ligar back e front.

### Publicação (opcional)
- [x] Criado `frontend/vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
  O deploy em si na Vercel não foi feito (ação externa opcional — ver resumo). Na apresentação, o sistema completo (com banco) roda no computador.

### README da disciplina (substituir o `README.md` da raiz)
Itens do card 10:
- [x] Disciplina: **Desenvolvimento Web II**
- [x] Professor: **Bruno Zolotareff dos Santos** (titulação: `PENDENTE`, o autor informa; se não souber, omitir a titulação)
- [x] Membros do grupo (Miguel Rienzi Muniz)
- [x] Breve descrição do projeto com base no MVP
- [x] Uma figura (`assets/referencias/tela-home.png`)
- [x] Link da aplicação (Vercel, se publicada) e do repositório
- [x] Stack, como rodar localmente e links para `docs/analise/`
- [ ] No final: breve apresentação pessoal (estilo entrevista de emprego) — texto pessoal do autor (manual); deixado um modelo com 3 perguntas-guia.

## Critérios de aceite

- Alguém consegue rodar o projeto do zero seguindo só o README.
- README com todos os itens do card 10.

## Commit

`docs: teste de usabilidade, revisão final e README da disciplina`

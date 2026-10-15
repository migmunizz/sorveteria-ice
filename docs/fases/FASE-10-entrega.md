# Fase 10 — Qualidade, deploy e entrega

**Objetivo:** preparar o projeto para a apresentação final: testes, performance, deploy e README da disciplina.

**Trello:** card 14 “Finalização”, card 11 “Teste de usabilidade”, card 10 “Elaborar o readme”, card 12 “Reunião final”, card 9 “Atualizar Repositorio - Commit”.
**Pré-requisitos:** Fase 7 (8 e 9 se tiverem sido feitas).

## Checklist

### Testes e qualidade
- [ ] Teste e2e do backend (`test/app.e2e-spec.ts`): cadastro → login → cardápio → checkout → consultar pedido.
- [ ] `npm run lint` sem erros no backend.
- [ ] Lighthouse no build do frontend (mobile): meta **Performance ≥ 85, Acessibilidade ≥ 90**. Registrar as notas em `docs/qualidade.md` e corrigir o que for simples (ex.: `alt`, contraste, tamanho de imagens).

### Teste de usabilidade
- [ ] Criar `docs/teste-usabilidade.md` com: roteiro de 5 tarefas (encontrar um açaí, adicionar 2 itens, criar conta, finalizar pedido, achar o pedido na minha conta), tabela para 3–5 participantes (concluiu? tempo, dificuldades) e seção “bugs encontrados → correção”.
- [ ] Aplicar o teste com os participantes (manual) e corrigir os bugs anotados.

### Deploy
- [ ] Backend no Render ou Railway com MySQL gerenciado; `prisma migrate deploy` no build; variáveis do `.env.example`.
- [ ] Frontend na Vercel com `VITE_API_URL` apontando para o backend e `vercel.json` com rewrite de SPA:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- [ ] `FRONTEND_URL` do backend = domínio da Vercel (CORS).

### README da disciplina (substituir o `README.md` da raiz)
Itens exigidos pelo card 10:
- [ ] Nome da disciplina — `PENDENTE`
- [ ] Nome e titulação do professor — `PENDENTE`
- [ ] Membros do grupo (Miguel Rienzi Muniz)
- [ ] Breve descrição do projeto com base no MVP
- [ ] Uma figura (usar `assets/referencias/tela-home.png` ou um print novo do deploy)
- [ ] Link da aplicação no ar
- [ ] Stack, como rodar localmente, links para `docs/analise/`
- [ ] No final: breve apresentação pessoal (estilo entrevista de emprego) — texto pessoal do autor (manual); deixar um modelo com 3 perguntas-guia.

## Critérios de aceite

- Aplicação acessível pelo link público, fluxo de pedido completo funcionando.
- README com todos os itens do card 10.

## Commit

`chore: testes e2e, relatório de qualidade, deploy e README final`

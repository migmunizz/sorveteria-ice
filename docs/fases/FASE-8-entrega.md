# Fase 8 — Revisão e entrega

**Objetivo:** deixar o projeto pronto para a apresentação: teste de usabilidade, ajustes finais e README da disciplina.

**Trello:** card 14 “Finalização”, card 11 “Teste de usabilidade”, card 10 “Elaborar o readme”, card 12 “Reunião final”, card 9 “Atualizar Repositorio - Commit”.
**Pré-requisitos:** Fase 7.

## Checklist

### Teste de usabilidade
- [ ] Criar `docs/teste-usabilidade.md` com: roteiro de 5 tarefas (achar um açaí, adicionar 2 itens, criar conta, finalizar pedido, achar o pedido em “minha conta”), uma tabela para 3 a 5 pessoas (conseguiu? quanto tempo? onde travou?) e uma seção “problemas encontrados → correção”.
- [ ] Aplicar o teste com as pessoas (manual) e corrigir os problemas anotados.

### Revisão rápida
- [ ] Rodar o Lighthouse do Chrome (F12 → Lighthouse → Mobile) na página inicial com `npm run front`. Anotar as notas em `docs/qualidade.md` e corrigir o que for simples (texto alternativo, contraste, imagem pesada).
- [ ] Conferir que `backend/.env.example` e `frontend/.env.example` têm todas as variáveis usadas.
- [ ] Revisar o README de “como rodar” do zero: instalar o banco, criar o usuário, `npm install`, migrar, seed, ligar back e front.

### Publicação (opcional)
- [ ] Publicar só o frontend na Vercel (sem `VITE_API_URL`, roda com os dados de exemplo), com `frontend/vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
  Na apresentação, o sistema completo (com banco) roda no computador.

### README da disciplina (substituir o `README.md` da raiz)
Itens do card 10:
- [ ] Nome da disciplina — `PENDENTE`
- [ ] Nome e titulação do professor — `PENDENTE`
- [ ] Membros do grupo (Miguel Rienzi Muniz)
- [ ] Breve descrição do projeto com base no MVP
- [ ] Uma figura (`assets/referencias/tela-home.png` ou um print novo)
- [ ] Link da aplicação (Vercel, se publicada) e do repositório
- [ ] Stack, como rodar localmente e links para `docs/analise/`
- [ ] No final: breve apresentação pessoal (estilo entrevista de emprego) — texto pessoal do autor (manual); deixar um modelo com 3 perguntas-guia.

## Critérios de aceite

- Alguém consegue rodar o projeto do zero seguindo só o README.
- README com todos os itens do card 10.

## Commit

`docs: teste de usabilidade, revisão final e README da disciplina`

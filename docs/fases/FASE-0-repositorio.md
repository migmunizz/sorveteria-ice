# Fase 0 — Repositório e ambiente

**Objetivo:** deixar o monorepo pronto no GitHub, com o frontend rodando e o ambiente local preparado para o backend.

**Trello:** card 4 “Repositorios” e card 17 “Atualizar Repositorios”.
**Pré-requisitos:** Node 20+, npm, Git, Docker Desktop (para o MySQL na Fase 3).

## Checklist

- [x] Conferir que a raiz do repositório tem: `README.md`, `frontend/`, `backend/`, `assets/`, `docs/`.
- [x] Criar `.gitignore` na raiz com: `node_modules/`, `dist/`, `.env`, `*.log`, `.DS_Store`, `coverage/`, `backend/prisma/*.db`, `__pycache__/`, `.venv/`.
- [x] Criar `.editorconfig` (UTF-8, LF, 2 espaços, newline final).
- [x] Criar `package.json` na raiz **só com scripts de atalho** (sem dependências):
  ```json
  {
    "name": "sorveteria-ice",
    "private": true,
    "scripts": {
      "front": "npm --prefix frontend run dev",
      "front:build": "npm --prefix frontend run build",
      "back": "npm --prefix backend run start:dev",
      "db:up": "docker compose up -d",
      "db:down": "docker compose down"
    }
  }
  ```
- [x] Rodar `npm --prefix frontend install` e `npm run front:build` — deve passar sem erros.
- [ ] Configurar o remoto, se ainda não estiver (manual): `git remote add origin https://github.com/migmunizz/sorveteria-ice.git`.
- [ ] Atualizar o card “Repositorios” no Trello com o link do GitHub (tarefa manual).

## Critérios de aceite

- `npm run front:build` termina com `✓ built`.
- `git status` não mostra `node_modules`, `dist` nem `.env`.

## Verificação

```bash
npm run front:build
git status --short | grep -E "node_modules|dist/|\.env$" && echo "ERRO: arquivos que deviam ser ignorados" || echo "OK"
```

## Commit

`chore: estrutura do monorepo, gitignore e scripts de atalho`

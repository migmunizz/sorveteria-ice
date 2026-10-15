# Fase 3 — Setup NestJS + Prisma + MySQL

**Objetivo:** backend NestJS rodando, conectado ao MySQL via Prisma, com validação global, CORS, Swagger e tratamento de erros padronizado. Ainda **sem** regras de negócio.

**Trello:** card 8 “Backend - Nestjs” (definir banco, model/services/controllers).
**Pré-requisitos:** Fase 2 (schema definido). Docker rodando.

## Checklist

### Banco
- [ ] Criar `docker-compose.yml` na **raiz**:
  ```yaml
  services:
    mysql:
      image: mysql:8.0
      container_name: sorveteria-mysql
      restart: unless-stopped
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: sorveteria
      ports: ["3306:3306"]
      volumes: [mysql_data:/var/lib/mysql]
  volumes:
    mysql_data:
  ```

### Projeto Nest
- [ ] Apagar a pasta vazia `backend/` (só tem `.gitkeep`) e, a partir da raiz, gerar o projeto: `npx @nestjs/cli new backend --package-manager npm --skip-git`.
- [ ] Instalar: `@prisma/client`, `@nestjs/config`, `@nestjs/swagger`, `class-validator`, `class-transformer`; dev: `prisma`.
- [ ] Remover `app.controller.ts`, `app.service.ts` e o spec de exemplo; criar `GET /health` → `{ status: 'ok' }` em `src/health/health.controller.ts`.
- [ ] `backend/.env.example` e `backend/.env`:
  ```
  DATABASE_URL="mysql://root:root@localhost:3306/sorveteria"
  JWT_SECRET="troque-por-um-segredo-grande"
  JWT_EXPIRES_IN="7d"
  DELIVERY_FEE=6
  FRONTEND_URL="http://localhost:5173"
  PORT=3000
  ```

### Prisma
- [ ] `npx prisma init --datasource-provider mysql`.
- [ ] Copiar o schema da Fase 2 (seção *Schema de referência*) para `prisma/schema.prisma`.
- [ ] `npx prisma migrate dev --name init`.
- [ ] `src/prisma/prisma.service.ts` (estende `PrismaClient`, `onModuleInit` → `$connect`) e `src/prisma/prisma.module.ts` marcado com `@Global()`.

### main.ts
- [ ] `app.enableCors({ origin: process.env.FRONTEND_URL })`.
- [ ] `app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))`.
- [ ] Mensagens do `class-validator` em português (passar `message` em cada decorator nos DTOs das próximas fases).
- [ ] Swagger em `/docs` com título “Sorveteria ai-ce API” e `addBearerAuth()`.
- [ ] Filtro global `src/common/http-exception.filter.ts` que sempre responde `{ message: string }` (se o Nest gerar `message` como array de validação, juntar com `; `).
- [ ] `ConfigModule.forRoot({ isGlobal: true })` no `AppModule`.

### Estrutura final esperada
```
backend/
├── prisma/schema.prisma
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/http-exception.filter.ts
│   ├── health/health.controller.ts
│   └── prisma/{prisma.module.ts, prisma.service.ts}
├── .env.example
└── package.json
```

## Critérios de aceite

- `docker compose up -d` sobe o MySQL; `npx prisma migrate dev` cria as 5 tabelas.
- `GET http://localhost:3000/health` → `200 {"status":"ok"}`.
- `http://localhost:3000/docs` abre o Swagger.
- `npm run build` sem erros.

## Verificação

```bash
docker compose up -d
cd backend && npx prisma migrate status && npm run build
npm run start:dev &  sleep 8 && curl -s localhost:3000/health; kill %1
```

## Commit

`feat(backend): setup NestJS com Prisma, MySQL, validação, CORS e Swagger`

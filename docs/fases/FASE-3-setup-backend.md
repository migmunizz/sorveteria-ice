# Fase 3 — Banco de dados + NestJS + Prisma

**Objetivo:** backend NestJS rodando e conectado ao MySQL pelo Prisma, com as tabelas criadas. Ainda **sem** regras de negócio.

**Trello:** card 8 “Backend - Nestjs” (definir banco; model, services e controllers).
**Pré-requisitos:** Fase 2 (schema definido).

## Passo manual (o autor faz antes): ligar o MySQL no Fedora

```bash
sudo dnf install mysql-server        # se ainda não estiver instalado
sudo systemctl enable --now mysqld   # liga agora e a cada boot
sudo mysql -u root                   # se pedir senha: sudo mysql -u root -p
```

Dentro do `mysql`, criar o banco e um usuário só para o projeto:

```sql
CREATE DATABASE sorveteria;
CREATE USER 'sorveteria'@'localhost' IDENTIFIED BY 'sorveteria123';
GRANT ALL PRIVILEGES ON *.* TO 'sorveteria'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

(O `*.*` é necessário porque o Prisma cria um banco temporário ao gerar as migrações.)

Teste: `mysql -u sorveteria -psorveteria123 -e "SHOW DATABASES;"` deve listar `sorveteria`.

## Checklist

### Projeto Nest
- [x] Apagar a pasta vazia `backend/` (só tem `.gitkeep`) e, a partir da raiz, criar o projeto: `npx @nestjs/cli new backend --package-manager npm --skip-git`.
- [x] Instalar: `npm i @prisma/client@6 @nestjs/config class-validator class-transformer` e `npm i -D prisma@6`.
- [x] Apagar `app.controller.ts`, `app.service.ts` e o teste de exemplo. Criar `GET /health` → `{ "status": "ok" }` em `src/health/health.controller.ts`.
- [x] `backend/.env.example` e `backend/.env`:
  ```
  DATABASE_URL="mysql://sorveteria:sorveteria123@localhost:3306/sorveteria"
  JWT_SECRET="troque-por-um-texto-grande-e-secreto"
  DELIVERY_FEE=6
  FRONTEND_URL="http://localhost:5173"
  PORT=3000
  ```

### Prisma
- [x] `npx prisma init --datasource-provider mysql`.
- [x] Copiar o schema da Fase 2 para `prisma/schema.prisma` (abaixo do `generator` e do `datasource`).
- [x] `npx prisma migrate dev --name init`.
- [x] `src/prisma/prisma.service.ts` (estende `PrismaClient` e conecta no `onModuleInit`) e `src/prisma/prisma.module.ts` com `@Global()` exportando o service.

### main.ts e app.module.ts
- [x] `ConfigModule.forRoot({ isGlobal: true })` e `PrismaModule` no `AppModule`.
- [x] `app.enableCors({ origin: process.env.FRONTEND_URL })`.
- [x] `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))`.
- [x] Porta de `process.env.PORT`.

### Estrutura esperada
```
backend/
├── prisma/schema.prisma
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── health/health.controller.ts
│   └── prisma/{prisma.module.ts, prisma.service.ts}
├── .env.example
└── package.json
```

## Critérios de aceite

- `npx prisma migrate dev` cria as 5 tabelas (ver com `npx prisma studio`).
- `GET http://localhost:3000/health` responde `{"status":"ok"}`.
- `npm run build` sem erros.

## Verificação

```bash
cd backend && npx prisma migrate status && npm run build
npm run start:dev    # em outro terminal: curl localhost:3000/health
```

## Commit

`feat(backend): cria API NestJS conectada ao MySQL com Prisma`

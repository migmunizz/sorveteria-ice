# Fase 4 — Usuários e autenticação

**Objetivo:** cadastro, login com JWT e rotas da “minha conta”, seguindo MVC.

**Trello:** card 8 — entidades “login, senha, nome completo, CPF, e-mail, telefone” e “Cadastro/Login”; rotas `/auth/login`, `/auth/cadastro`, `/minha-conta`.
**Pré-requisitos:** Fase 3.

## Checklist

- [ ] Instalar: `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt`; dev: `@types/passport-jwt`, `@types/bcrypt`.

### Módulo `users` (`src/users/`)
- [ ] `users.service.ts`
  - `create(data)` — salva com `passwordHash = await bcrypt.hash(password, 10)`. CPF salvo **só com dígitos**.
  - `findByEmail(email)`, `findById(id)`.
  - `update(id, { name?, phone? })`.
  - `toPublic(user)` — mapper que remove `passwordHash` e `role` e devolve o formato `User` do contrato: `{ id, name, email, cpf, phone }` com CPF formatado `000.000.000-00`.
- [ ] `users.controller.ts` (rotas `/minha-conta`, protegidas por JWT)
  - `PATCH /minha-conta` com `UpdateMeDto` (`name?` mín. 2 palavras, `phone?` 10–11 dígitos) → `User`.
  - (A rota `GET /minha-conta/pedidos` é criada na Fase 6.)

### Módulo `auth` (`src/auth/`)
- [ ] DTOs:
  - `RegisterDto`: `name` (nome e sobrenome), `cpf` (validar dígitos verificadores com um validator próprio `@IsCpf()` em `src/common/validators/is-cpf.ts`), `email` (`@IsEmail`), `phone` (10–11 dígitos após remover máscara), `password` (mín. 6).
  - `LoginDto`: `email`, `password`.
- [ ] `auth.service.ts`
  - `register(dto)` → 409 `"Este e-mail já está cadastrado."` / `"Este CPF já está cadastrado."`; retorna `{ token, user }`.
  - `login(dto)` → 401 `"E-mail ou senha incorretos."` (mesma mensagem para e-mail inexistente e senha errada); retorna `{ token, user }`.
  - Payload do JWT: `{ sub: user.id, role: user.role }`.
- [ ] `auth.controller.ts`: `POST /auth/cadastro` (201), `POST /auth/login` (200 — usar `@HttpCode(200)`).
- [ ] `jwt.strategy.ts`, `jwt-auth.guard.ts`, `roles.guard.ts` + decorator `@Roles('admin')`, decorator `@CurrentUser()` que devolve `{ id, role }`.
- [ ] Documentar tudo no Swagger (`@ApiTags`, `@ApiBearerAuth`, exemplos nos DTOs).

### Testes
- [ ] `auth.service.spec.ts`: cadastro com e-mail duplicado → 409; login com senha errada → 401; resposta nunca contém `passwordHash`.
- [ ] Teste do validator de CPF (válido `529.982.247-25`, inválido `111.111.111-11`).

## Critérios de aceite

- Cadastro devolve `{ token, user }` no formato exato do tipo `User` do frontend.
- Login com credenciais corretas devolve token; o token dá acesso a `PATCH /minha-conta`; sem token → 401.
- Nenhuma resposta contém `password` ou `passwordHash`.

## Verificação

```bash
cd backend && npm run test && npm run build
curl -s -X POST localhost:3000/auth/cadastro -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","cpf":"529.982.247-25","email":"maria@teste.com","phone":"(13) 99999-8888","password":"123456"}'
curl -s -X POST localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"maria@teste.com","password":"123456"}'
```

## Commit

`feat(auth): cadastro e login com JWT, rotas de minha conta`

# Fase 4 — Usuários e login

**Objetivo:** cadastro, login com token JWT e as rotas de “minha conta”, seguindo MVC.

**Trello:** card 8 — entidades “login, senha, nome completo, CPF, e-mail, telefone” e “Cadastro/Login”; rotas `/auth/login`, `/auth/cadastro`, `/minha-conta`.
**Pré-requisitos:** Fase 3.

## Checklist

- [ ] Instalar: `npm i @nestjs/jwt bcryptjs`.

### Módulo `users` (`src/users/`)
- [ ] `users.service.ts`
  - `create(data)` — salva com `passwordHash = await bcrypt.hash(password, 10)`. CPF salvo **só com números**.
  - `findByEmail(email)`, `findById(id)`, `update(id, { name?, phone? })`.
  - `toPublic(user)` — devolve só `{ id, name, email, cpf, phone }` (formato `User` do frontend), com o CPF formatado `000.000.000-00`. **Nunca** devolve o hash.
- [ ] `users.controller.ts` — `PATCH /minha-conta` (com login) recebendo `UpdateMeDto` (`name?`, `phone?`) e devolvendo o `User`.

### Módulo `auth` (`src/auth/`)
- [ ] DTOs com `class-validator` e mensagens em português:
  - `RegisterDto`: `name` (nome e sobrenome), `cpf`, `email`, `phone`, `password` (mínimo 6).
  - `LoginDto`: `email`, `password`.
- [ ] Validação de CPF numa função simples `isValidCpf()` em `src/common/cpf.ts` (mesma lógica de `frontend/src/utils/format.ts`), chamada no `AuthService.register` → 400 `"CPF inválido."`.
- [ ] `auth.service.ts`
  - `register(dto)` → 409 `"Este e-mail já está cadastrado."` ou `"Este CPF já está cadastrado."`; devolve `{ token, user }`.
  - `login(dto)` → 401 `"E-mail ou senha incorretos."` (mesma mensagem para e-mail que não existe e senha errada); devolve `{ token, user }`.
  - Token com `jwtService.signAsync({ sub: user.id })`, validade de 7 dias.
- [ ] `auth.controller.ts`: `POST /auth/cadastro` e `POST /auth/login` (`@HttpCode(200)` no login).
- [ ] `auth.guard.ts` — guard simples (como na documentação oficial do NestJS): lê o `Authorization: Bearer <token>`, valida com `jwtService.verifyAsync` e coloca `{ id }` em `request.user`; sem token ou token inválido → 401.
- [ ] `JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '7d' } })` no `AuthModule`.

## Critérios de aceite

- Cadastro devolve `{ token, user }` exatamente no formato do tipo `User` do frontend.
- Login certo devolve token; com o token, `PATCH /minha-conta` funciona; sem token → 401.
- Nenhuma resposta tem `password` ou `passwordHash`.

## Verificação (curl ou Postman)

```bash
cd backend && npm run build
curl -s -X POST localhost:3000/auth/cadastro -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","cpf":"529.982.247-25","email":"maria@teste.com","phone":"(13) 99999-8888","password":"123456"}'
curl -s -X POST localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"maria@teste.com","password":"123456"}'
```

## Commit

`feat(auth): cadastro e login com JWT e rotas de minha conta`

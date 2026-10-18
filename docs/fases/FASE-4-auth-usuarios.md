# Fase 4 — Usuários e login

**Objetivo:** cadastro, login e “minha conta” com o padrão **controller → service → repository → DTO**, sem token e sem módulo de autenticação.

**Trello:** card 8 — entidades “login, senha, nome completo, CPF, e-mail, telefone” e “Cadastro/Login”; rotas `/auth/login`, `/auth/cadastro`, `/minha-conta`.
**Pré-requisitos:** Fase 3.

## Regras desta fase

- **Não usar** JWT, guard, Passport nem módulo `auth`. Tudo fica no módulo `users`.
- Única biblioteca nova: `bcryptjs` (a senha nunca é salva em texto puro).
- O login só confere e-mail e senha e devolve o usuário. O frontend guarda esse usuário e manda o `id` quando precisar.

## Checklist

- [x] Instalar: `npm i bcryptjs`.

### Módulo `users` (`src/users/`)
- [x] `dto/register.dto.ts` — `RegisterDto` (`class-validator`, mensagens em português): `name` (nome e sobrenome), `cpf`, `email`, `phone`, `password` (mínimo 6).
- [x] `dto/login.dto.ts` — `LoginDto`: `email`, `password`.
- [x] `dto/update-user.dto.ts` — `UpdateUserDto`: `name?`, `phone?`.
- [x] `dto/user-response.dto.ts` — `UserResponseDto`: `{ id, name, email, cpf, phone }` (formato `User` do frontend, CPF formatado `000.000.000-00`). **Nunca** inclui o hash.
- [x] `users.repository.ts` — só acesso ao banco com o `PrismaService`: `create`, `findByEmail`, `findByCpf`, `findById`, `update`.
- [x] `users.service.ts` — usa o repository:
  - `register(dto)`: valida o CPF com `isValidCpf` (400 `"CPF inválido."`), 409 `"Este e-mail já está cadastrado."` ou `"Este CPF já está cadastrado."`, salva `passwordHash = await bcrypt.hash(password, 10)` e o CPF **só com números**; devolve `UserResponseDto`.
  - `login(dto)`: 401 `"E-mail ou senha incorretos."` (mesma mensagem para e-mail inexistente e senha errada); devolve `UserResponseDto`.
  - `update(id, dto)`: 404 `"Usuário não encontrado"` se não existir; devolve `UserResponseDto`.
- [x] `users.controller.ts` — só recebe, chama o service e responde:
  - `POST /auth/cadastro` → `{ user }`
  - `POST /auth/login` → `{ user }` (`@HttpCode(200)`)
  - `PATCH /minha-conta/:userId` → `User` (o usuário atualizado, sem envolver em `{ user }`)
- [x] `users.module.ts` registrado no `AppModule`.
- [x] `src/common/cpf.ts` com `isValidCpf`, `sanitizeCpf` e `formatCpf` (mesma lógica de `frontend/src/utils/format.ts`).

## Critérios de aceite

- Cadastro e login devolvem `{ user }` no formato do tipo `User` do frontend.
- E-mail ou CPF repetido → 409; CPF inválido → 400; senha errada → 401.
- Nenhuma resposta tem `password` ou `passwordHash`.
- Não existe pasta `auth/`, nem `@nestjs/jwt`, nem `AuthGuard` no projeto.

## Verificação (curl ou Postman)

```bash
cd backend && npm run build
curl -s -X POST localhost:3000/auth/cadastro -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","cpf":"529.982.247-25","email":"maria@teste.com","phone":"(13) 99999-8888","password":"123456"}'
curl -s -X POST localhost:3000/auth/login -H "Content-Type: application/json" \
  -d '{"email":"maria@teste.com","password":"123456"}'
curl -s -X PATCH localhost:3000/minha-conta/ID_DO_USUARIO -H "Content-Type: application/json" \
  -d '{"phone":"(13) 98888-7777"}'
```

## Commit

`feat(users): cadastro, login e minha conta com service e repository`

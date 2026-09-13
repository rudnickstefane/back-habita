# Habita

API GraphQL do sistema imobiliário Habita, focada na AC 1: autenticação JWT e gestão de corretores.

## Stack

- NestJS + GraphQL
- Prisma + PostgreSQL 14
- JWT + Argon2

## Como rodar

1. Copie `.env.example` para `.env` e ajuste `DATABASE_URL` e `JWT_SECRET`.
2. Instale as dependências com `pnpm install`.
3. Gere o client e aplique o schema:

```bash
pnpm prisma:generate
pnpm db:push
pnpm prisma:seed
```

4. Suba a API:

```bash
pnpm start:dev
```

- GraphQL: `http://localhost:3000/graphql`
- Health: `http://localhost:3000/health`

## Acesso inicial

O seed cria o corretor administrador:

- e-mail: `admin@habita.com`
- senha: `habita123`

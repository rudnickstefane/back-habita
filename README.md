# Habita - Back-end

API GraphQL do sistema de gestão imobiliária Habita.

**(Entrega: 14/09) - AC 1: Autenticação JWT e cadastro de corretores**

## Descrição

O back-end concentra as regras de negócio e a persistência. Nesta AC 1 ele entrega o acesso seguro ao sistema e o cadastro da equipe comercial - **somente o administrador cadastra corretores**.

## Tecnologias

- NestJS
- GraphQL (Apollo)
- Prisma
- PostgreSQL 14
- JWT
- Argon2
- pnpm

## Módulo da AC 1

### Auth

- Mutation `login(email, senha)`: valida o corretor e devolve `{ token, corretor }`.
- Guard JWT nas operações protegidas.

### Corretores

- Mutation `criarCorretor`: cadastra nome, e-mail e senha (hash) com perfil `CORRETOR`.
- Query `corretores`: lista os corretores.
- Cadastro e listagem exigem JWT **e perfil ADMIN**.

## Próximos módulos

| Entrega       | Módulo        | Valor                                         |
| ------------- | ------------- | --------------------------------------------- |
| AC 2 (13/10)  | Proprietários | Cadastro dos donos - administrador e corretor |
| AC 3 (08/11)  | Imóveis       | Catálogo vinculado ao proprietário            |
| Final (22/11) | Visitas       | Agenda de visitas                             |

## Como rodar

```bash
pnpm install
pnpm prisma:generate
pnpm db:push
pnpm prisma:seed
pnpm start:dev
```

- GraphQL: `http://localhost:3000/graphql`
- Health: `http://localhost:3000/health`

Acesso inicial: `admin@habita.com` / `habita123`

Ajuste `DATABASE_URL` e `JWT_SECRET` no `.env` (veja `.env.example`).

# Habita - Back-end

API GraphQL do sistema de gestão imobiliária Habita.

**(Entrega: 13/10) - AC 2: Cadastro de proprietários**

## Descrição

O back-end concentra as regras de negócio e a persistência. Nesta AC 2, administrador e corretor cadastram os donos dos imóveis. O cadastro de corretores continua exclusivo do administrador.

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

### Proprietários (AC 2)

- Mutation `criarProprietario`: cadastra nome, e-mail, telefone e documento.
- Query `proprietarios`: lista os proprietários.
- Cadastro e listagem exigem JWT e estão liberados para **administrador e corretor**.

## Próximos módulos

| Entrega       | Módulo  | Valor                              |
| ------------- | ------- | ---------------------------------- |
| AC 3 (08/11)  | Imóveis | Catálogo vinculado ao proprietário |
| Final (22/11) | Visitas | Agenda de visitas                  |

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

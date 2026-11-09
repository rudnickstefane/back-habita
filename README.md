# Habita - Back-end

API GraphQL do sistema de gestão imobiliária Habita.

**(Entrega: 08/11) - AC 3: Cadastro de imóveis**

## Descrição

O back-end concentra as regras de negócio e a persistência. Nesta AC 3, o catálogo de imóveis fica vinculado a um proprietário. O proprietário também acessa o portal: solicita o cadastro do imóvel (pendente) e o corretor ou o administrador aprova.

## Tecnologias

- NestJS
- GraphQL (Apollo)
- Prisma
- PostgreSQL 14
- JWT
- Argon2
- Fastify multipart (fotos locais)
- pnpm

## Módulos

### Auth

- Mutation `login(email, senha)`: autentica administrador, corretor ou proprietário e devolve `{ token, usuario }`.
- Guard JWT nas operações protegidas.
- `StaffGuard`: administrador e corretor.

### Corretores

- Mutation `criarCorretor` e query `corretores`: JWT **e perfil ADMIN**.

### Proprietários (AC 2)

- Mutation `criarProprietario`: nome, e-mail, **senha**, telefone e documento.
- Query `proprietarios`: lista os proprietários.
- Cadastro e listagem exigem JWT de **administrador ou corretor**.

### Imóveis (AC 3)

- Tabela `Imoveis` ligada a `Proprietarios`.
- Mutation `criarImovel`: staff cadastra já **aprovado**; proprietário solicita com status **PENDENTE**.
- Query `imoveis`: staff vê o catálogo; proprietário vê as próprias solicitações.
- Mutations `aprovarImovel` e `recusarImovel`: administrador e corretor.
- REST `POST /uploads/fotos`: envio local das fotos (mínimo 2 no cadastro).
- Arquivos servidos em `/uploads/fotos`.

## Próximos módulos

| Entrega       | Módulo  | Valor             |
| ------------- | ------- | ----------------- |
| Final (22/11) | Visitas | Agenda de visitas |

## Como rodar

```bash
pnpm install
pnpm prisma:generate
pnpm migrate:dev
pnpm prisma:seed
pnpm start:dev
```

- GraphQL: `http://localhost:3000/graphql`
- Health: `http://localhost:3000/health`
- Fotos: `http://localhost:3000/uploads/fotos`

Acesso inicial:

- `admin@habita.com` / `habita123`
- `proprietario@habita.com` / `habita123`

Ajuste `DATABASE_URL` e `JWT_SECRET` no `.env` (veja `.env.example`).

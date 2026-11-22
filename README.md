# Habita - Back-end

API GraphQL do sistema de gestão imobiliária Habita.

**(Entrega: 22/11) - Final: Agendamento de visitas**

## Descrição

O back-end concentra as regras de negócio e a persistência. Nesta entrega final, o visitante vê os imóveis aprovados e solicita uma visita. O corretor (ou o administrador) aceita, recusa ou reserva a visita na agenda.

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

- Mutation `criarProprietario`: nome, e-mail, senha, telefone e documento.
- Query `proprietarios`: JWT de administrador ou corretor.

### Imóveis (AC 3)

- Mutation `criarImovel` / query `imoveis`: JWT.
- Query pública `imoveisDisponiveis`: só imóveis **aprovados**.
- REST `POST /uploads/fotos`.

### Visitas (Final)

- Tabela `Visitas` ligada a `Imoveis` e `Corretores`.
- Mutation pública `solicitarVisita`: visitante informa nome, telefone, data e horário; status **PENDENTE**.
- Query `visitas` e mutations `agendarVisita`, `aceitarVisita`, `recusarVisita`: JWT de administrador ou corretor.
- `agendarVisita` já entra na agenda como **ACEITA**, vinculada ao corretor.

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

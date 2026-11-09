import { PrismaClient } from '@prisma/client';
import { ArgonCrypto } from '../src/common/utils/argon-crypto.util';
import { prismaAdapter } from './adapter';

const prisma = new PrismaClient({ adapter: prismaAdapter });

async function main() {
  const adminEmail = 'admin@habita.com';
  const senha = await ArgonCrypto.hash('habita123');

  await prisma.corretores.upsert({
    where: { email: adminEmail },
    update: { perfil: 'ADMIN' },
    create: {
      nome: 'Administrador Habita',
      email: adminEmail,
      senha,
      perfil: 'ADMIN',
    },
  });

  await prisma.proprietarios.upsert({
    where: { email: 'proprietario@habita.com' },
    update: { senha },
    create: {
      nome: 'Maria Proprietária',
      email: 'proprietario@habita.com',
      senha,
      telefone: '11988887777',
      documento: '12345678901',
    },
  });

  console.log('Administrador disponível: admin@habita.com / habita123');
  console.log('Proprietário disponível: proprietario@habita.com / habita123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

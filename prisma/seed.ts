import { PrismaClient } from '@prisma/client';
import { ArgonCrypto } from '../src/common/utils/argon-crypto.util';
import { prismaAdapter } from './adapter';

const prisma = new PrismaClient({ adapter: prismaAdapter });

async function main() {
  const email = 'admin@habita.com';

  await prisma.corretores.upsert({
    where: { email },
    update: { perfil: 'ADMIN' },
    create: {
      nome: 'Administrador Habita',
      email,
      senha: await ArgonCrypto.hash('habita123'),
      perfil: 'ADMIN',
    },
  });

  console.log('Administrador disponível: admin@habita.com / habita123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

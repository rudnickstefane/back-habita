import { PrismaClient } from '@prisma/client';
import { ArgonCrypto } from '../src/common/utils/argon-crypto.util';
import { prismaAdapter } from './adapter';

const prisma = new PrismaClient({ adapter: prismaAdapter });

async function main() {
  const email = 'admin@habita.com';
  const existing = await prisma.corretores.findUnique({ where: { email } });

  if (existing) {
    console.log('Corretor administrador já existe:', email);
    return;
  }

  await prisma.corretores.create({
    data: {
      nome: 'Administrador Habita',
      email,
      senha: await ArgonCrypto.hash('habita123'),
    },
  });

  console.log('Corretor administrador criado: admin@habita.com / habita123');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

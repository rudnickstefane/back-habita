import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class CorretoresRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.corretores.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findAll() {
    return this.prisma.corretores.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        createdAt: true,
      },
    });
  }

  create(data: { nome: string; email: string; senha: string }) {
    return this.prisma.corretores.create({
      data: {
        nome: data.nome.trim(),
        email: data.email.toLowerCase().trim(),
        senha: data.senha,
        perfil: 'CORRETOR',
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        createdAt: true,
      },
    });
  }
}

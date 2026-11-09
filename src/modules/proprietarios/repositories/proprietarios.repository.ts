import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class ProprietariosRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.proprietarios.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findCorretorByEmail(email: string) {
    return this.prisma.corretores.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findByDocumento(documento: string) {
    return this.prisma.proprietarios.findUnique({
      where: { documento },
    });
  }

  findAll() {
    return this.prisma.proprietarios.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        documento: true,
        createdAt: true,
      },
    });
  }

  create(data: { nome: string; email: string; senha: string; telefone: string; documento: string }) {
    return this.prisma.proprietarios.create({
      data: {
        nome: data.nome.trim(),
        email: data.email.toLowerCase().trim(),
        senha: data.senha,
        telefone: data.telefone.trim(),
        documento: data.documento,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        documento: true,
        createdAt: true,
      },
    });
  }
}

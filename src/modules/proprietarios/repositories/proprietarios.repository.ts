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

  findByDocumento(documento: string) {
    return this.prisma.proprietarios.findUnique({
      where: { documento },
    });
  }

  findAll() {
    return this.prisma.proprietarios.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: { nome: string; email: string; telefone: string; documento: string }) {
    return this.prisma.proprietarios.create({
      data: {
        nome: data.nome.trim(),
        email: data.email.toLowerCase().trim(),
        telefone: data.telefone.trim(),
        documento: data.documento,
      },
    });
  }
}

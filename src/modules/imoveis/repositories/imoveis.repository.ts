import { Inject, Injectable } from '@nestjs/common';
import { StatusImovel, TipoImovel } from '@prisma/client';
import { PrismaService } from '@src/prisma.service';

const imovelInclude = {
  proprietario: true,
} as const;

@Injectable()
export class ImoveisRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findProprietarioById(id: number) {
    return this.prisma.proprietarios.findUnique({
      where: { id },
    });
  }

  findById(id: number) {
    return this.prisma.imoveis.findUnique({
      where: { id },
      include: imovelInclude,
    });
  }

  findAll() {
    return this.prisma.imoveis.findMany({
      include: imovelInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  findAprovados() {
    return this.prisma.imoveis.findMany({
      where: { status: 'APROVADO' },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByProprietario(proprietarioId: number) {
    return this.prisma.imoveis.findMany({
      where: { proprietarioId },
      include: imovelInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: {
    tipo: string;
    endereco: string;
    valor: number;
    fotos: string[];
    status: string;
    proprietarioId: number;
  }) {
    return this.prisma.imoveis.create({
      data: {
        tipo: data.tipo as TipoImovel,
        endereco: data.endereco.trim(),
        valor: data.valor,
        fotos: data.fotos,
        status: data.status as StatusImovel,
        proprietarioId: data.proprietarioId,
      },
      include: imovelInclude,
    });
  }

  updateStatus(id: number, status: string) {
    return this.prisma.imoveis.update({
      where: { id },
      data: { status: status as StatusImovel },
      include: imovelInclude,
    });
  }
}

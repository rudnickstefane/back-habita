import { Inject, Injectable } from '@nestjs/common';
import { StatusVisita } from '@prisma/client';
import { PrismaService } from '@src/prisma.service';

const visitaInclude = {
  imovel: {
    include: {
      proprietario: true,
    },
  },
  corretor: {
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      createdAt: true,
    },
  },
} as const;

@Injectable()
export class VisitasRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findImovelById(id: number) {
    return this.prisma.imoveis.findUnique({
      where: { id },
      include: { proprietario: true },
    });
  }

  findById(id: number) {
    return this.prisma.visitas.findUnique({
      where: { id },
      include: visitaInclude,
    });
  }

  findAll() {
    return this.prisma.visitas.findMany({
      include: visitaInclude,
      orderBy: { dataHora: 'asc' },
    });
  }

  findAceitaNoHorario(imovelId: number, dataHora: Date, ignoreId?: number) {
    return this.prisma.visitas.findFirst({
      where: {
        imovelId,
        dataHora,
        status: 'ACEITA',
        ...(ignoreId ? { id: { not: ignoreId } } : {}),
      },
    });
  }

  create(data: {
    visitanteNome: string;
    visitanteTelefone: string;
    dataHora: Date;
    status: string;
    imovelId: number;
    corretorId?: number;
  }) {
    return this.prisma.visitas.create({
      data: {
        visitanteNome: data.visitanteNome.trim(),
        visitanteTelefone: data.visitanteTelefone.trim(),
        dataHora: data.dataHora,
        status: data.status as StatusVisita,
        imovelId: data.imovelId,
        corretorId: data.corretorId,
      },
      include: visitaInclude,
    });
  }

  updateDecisao(id: number, status: string, corretorId: number) {
    return this.prisma.visitas.update({
      where: { id },
      data: {
        status: status as StatusVisita,
        corretorId,
      },
      include: visitaInclude,
    });
  }
}

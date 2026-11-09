import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findCorretorByEmail(email: string) {
    return this.prisma.corretores.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findCorretorById(id: number) {
    return this.prisma.corretores.findUnique({
      where: { id },
    });
  }

  findProprietarioByEmail(email: string) {
    return this.prisma.proprietarios.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findProprietarioById(id: number) {
    return this.prisma.proprietarios.findUnique({
      where: { id },
    });
  }
}

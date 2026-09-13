import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.corretores.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findById(id: number) {
    return this.prisma.corretores.findUnique({
      where: { id },
    });
  }
}

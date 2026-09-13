import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CorretoresRepository } from './repositories/corretores.repository';
import { CorretoresResolver } from './resolvers/corretores.resolver';
import { CorretoresService } from './services/corretores.service';

@Module({
  providers: [CorretoresResolver, CorretoresService, CorretoresRepository, PrismaService],
})
export class CorretoresModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { VisitasRepository } from './repositories/visitas.repository';
import { VisitasResolver } from './resolvers/visitas.resolver';
import { VisitasService } from './services/visitas.service';

@Module({
  providers: [VisitasResolver, VisitasService, VisitasRepository, PrismaService],
})
export class VisitasModule {}

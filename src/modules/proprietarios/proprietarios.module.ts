import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { ProprietariosRepository } from './repositories/proprietarios.repository';
import { ProprietariosResolver } from './resolvers/proprietarios.resolver';
import { ProprietariosService } from './services/proprietarios.service';

@Module({
  providers: [ProprietariosResolver, ProprietariosService, ProprietariosRepository, PrismaService],
})
export class ProprietariosModule {}

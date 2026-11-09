import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { ImoveisRepository } from './repositories/imoveis.repository';
import { ImoveisResolver } from './resolvers/imoveis.resolver';
import { ImoveisService } from './services/imoveis.service';

@Module({
  providers: [ImoveisResolver, ImoveisService, ImoveisRepository, PrismaService],
})
export class ImoveisModule {}

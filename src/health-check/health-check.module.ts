import { HealthController } from '@health-check/health.controller';
import { HealthService } from '@health-check/health.service';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from '@src/prisma.service';

@Module({
  imports: [TerminusModule],
  providers: [PrismaService, HealthService],
  controllers: [HealthController],
})
export class HealthCheckModule {}

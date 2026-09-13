import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { config as graphqlConfig } from '@config/graphql.config';
import { config as pinoConfig } from '@config/pino.config';
import { Logger, LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { CorretoresModule } from './modules';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    TerminusModule,
    HealthCheckModule,
    AuthModule,
    CorretoresModule,
  ],
  providers: [PrismaService, Logger],
})
export class AppModule {}

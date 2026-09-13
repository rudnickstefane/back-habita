import { ModuleMetadata } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@src/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { LoggerModule } from 'nestjs-pino';

export const compileUnitTestModule = (metadata: ModuleMetadata = {}): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports: [
      LoggerModule.forRoot({
        pinoHttp: { enabled: false },
      }),
      ...(metadata.imports || []),
    ],
    providers: [
      {
        provide: CONTEXT,
        useValue: 'uuid',
      },
      {
        provide: PrismaService,
        useFactory: () => mockDeep<PrismaClient>(),
      },
      ...(metadata.providers || []),
    ],
  }).compile();
};

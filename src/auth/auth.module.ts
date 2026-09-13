import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { GraphQLJWTGuard } from './guards';
import { AuthRepository } from './repositories/auth.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Global()
@Module({
  providers: [AuthService, AuthRepository, AuthResolver, GraphQLJWTGuard, PrismaService],
  exports: [AuthService, AuthRepository, GraphQLJWTGuard],
})
export class AuthModule {}

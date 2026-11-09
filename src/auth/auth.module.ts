import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { AdminGuard, GraphQLJWTGuard, StaffGuard } from './guards';
import { AuthRepository } from './repositories/auth.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Global()
@Module({
  providers: [
    AuthService,
    AuthRepository,
    AuthResolver,
    GraphQLJWTGuard,
    AdminGuard,
    StaffGuard,
    PrismaService,
  ],
  exports: [AuthService, AuthRepository, GraphQLJWTGuard, AdminGuard, StaffGuard],
})
export class AuthModule {}

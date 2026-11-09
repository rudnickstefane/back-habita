import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (user?.perfil !== PerfilAcesso.ADMIN && user?.perfil !== PerfilAcesso.CORRETOR) {
      throw new ForbiddenException('Apenas administrador e corretor podem executar esta operação.');
    }

    return true;
  }
}

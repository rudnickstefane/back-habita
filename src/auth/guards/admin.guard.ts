import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PerfilCorretor } from '@src/common/contracts/enums/perfil-corretor.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (user?.perfil !== PerfilCorretor.ADMIN) {
      throw new ForbiddenException('Apenas o administrador pode gerenciar corretores.');
    }

    return true;
  }
}

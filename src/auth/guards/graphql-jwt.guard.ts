import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GraphQLJWTGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly repository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader) {
      throw new ForbiddenException('Token de autenticação ausente.');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new ForbiddenException('Formato do token de autenticação inválido.');
    }

    const payload = this.authService.validateToken(token);
    const corretor = await this.repository.findById(Number(payload.sub));

    if (!corretor) {
      throw new ForbiddenException('O token fornecido é inválido ou expirou.');
    }

    request.user = {
      id: corretor.id,
      nome: corretor.nome,
      email: corretor.email,
      perfil: corretor.perfil,
      sub: corretor.id,
    };

    return true;
  }
}

import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';
import { AuthUser } from '../contracts/types/auth-user.type';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GraphQLJWTGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly repository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader) {
      throw new ForbiddenException('Token de autenticação ausente.');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new ForbiddenException('Formato do token de autenticação inválido.');
    }

    const payload = this.authService.validateToken(token);
    const user = await this.resolveUser(payload.perfil, Number(payload.sub));

    if (!user) {
      throw new ForbiddenException('O token fornecido é inválido ou expirou.');
    }

    request.user = user;
    return true;
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    return GqlExecutionContext.create(context).getContext().req;
  }

  private async resolveUser(perfil: PerfilAcesso, id: number): Promise<AuthUser | null> {
    if (perfil === PerfilAcesso.PROPRIETARIO) {
      const proprietario = await this.repository.findProprietarioById(id);
      if (!proprietario) {
        return null;
      }

      return {
        id: proprietario.id,
        nome: proprietario.nome,
        email: proprietario.email,
        perfil: PerfilAcesso.PROPRIETARIO,
        sub: proprietario.id,
      };
    }

    const corretor = await this.repository.findCorretorById(id);
    if (!corretor) {
      return null;
    }

    return {
      id: corretor.id,
      nome: corretor.nome,
      email: corretor.email,
      perfil: corretor.perfil as PerfilAcesso,
      sub: corretor.id,
    };
  }
}

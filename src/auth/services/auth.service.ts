import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';
import { ArgonCrypto } from '@src/common/utils';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from '../contracts/inputs/login.input';
import { JwtPayload } from '../contracts/types/auth-user.type';
import { LoginType } from '../contracts/types/login.type';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET;
  private readonly expiresIn = '24h';

  constructor(private readonly repository: AuthRepository) {}

  async login(data: LoginInput): Promise<LoginType> {
    if (!this.secret) {
      throw new UnauthorizedException('JWT_SECRET não configurado.');
    }

    const corretor = await this.repository.findCorretorByEmail(data.email);
    if (corretor && (await ArgonCrypto.verifyPassword(data.senha, corretor.senha))) {
      const perfil = corretor.perfil as PerfilAcesso;
      return this.buildLogin({
        sub: corretor.id,
        email: corretor.email,
        nome: corretor.nome,
        perfil,
      });
    }

    const proprietario = await this.repository.findProprietarioByEmail(data.email);
    if (
      proprietario?.senha &&
      (await ArgonCrypto.verifyPassword(data.senha, proprietario.senha))
    ) {
      return this.buildLogin({
        sub: proprietario.id,
        email: proprietario.email,
        nome: proprietario.nome,
        perfil: PerfilAcesso.PROPRIETARIO,
      });
    }

    throw new UnauthorizedException('E-mail ou senha inválidos.');
  }

  validateToken(token: string): JwtPayload {
    if (!this.secret) {
      throw new UnauthorizedException('JWT_SECRET não configurado.');
    }

    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch {
      throw new UnauthorizedException('O token fornecido é inválido ou expirou.');
    }
  }

  private buildLogin(payload: JwtPayload): LoginType {
    return {
      token: this.signToken(payload),
      usuario: {
        id: payload.sub,
        nome: payload.nome,
        email: payload.email,
        perfil: payload.perfil,
      },
    };
  }

  private signToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }
}

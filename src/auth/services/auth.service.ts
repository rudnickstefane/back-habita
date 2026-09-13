import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ArgonCrypto } from '@src/common/utils';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from '../contracts/inputs/login.input';
import { LoginType } from '../contracts/types/login.type';
import { AuthRepository } from '../repositories/auth.repository';

type JwtPayload = {
  sub: number;
  email: string;
  nome: string;
};

@Injectable()
export class AuthService {
  private readonly secret = process.env.JWT_SECRET;
  private readonly expiresIn = '24h';

  constructor(private readonly repository: AuthRepository) {}

  async login(data: LoginInput): Promise<LoginType> {
    if (!this.secret) {
      throw new UnauthorizedException('JWT_SECRET não configurado.');
    }

    const corretor = await this.repository.findByEmail(data.email);
    const senhaValida = corretor ? await ArgonCrypto.verifyPassword(data.senha, corretor.senha) : false;

    if (!corretor || !senhaValida) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const token = this.signToken({
      sub: corretor.id,
      email: corretor.email,
      nome: corretor.nome,
    });

    return {
      token,
      corretor: {
        id: corretor.id,
        nome: corretor.nome,
        email: corretor.email,
      },
    };
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

  private signToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }
}

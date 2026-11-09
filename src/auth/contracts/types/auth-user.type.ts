import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';

export type AuthUser = {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilAcesso;
  sub: number;
};

export type JwtPayload = {
  sub: number;
  email: string;
  nome: string;
  perfil: PerfilAcesso;
};

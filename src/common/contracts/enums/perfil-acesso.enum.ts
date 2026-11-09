import { registerEnumType } from '@nestjs/graphql';

export enum PerfilAcesso {
  ADMIN = 'ADMIN',
  CORRETOR = 'CORRETOR',
  PROPRIETARIO = 'PROPRIETARIO',
}

registerEnumType(PerfilAcesso, {
  name: 'PerfilAcesso',
  description: 'Perfil de quem acessa o portal Habita.',
});

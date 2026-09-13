import { registerEnumType } from '@nestjs/graphql';

export enum PerfilCorretor {
  ADMIN = 'ADMIN',
  CORRETOR = 'CORRETOR',
}

registerEnumType(PerfilCorretor, {
  name: 'PerfilCorretor',
  description: 'Perfil de acesso do corretor no Habita.',
});

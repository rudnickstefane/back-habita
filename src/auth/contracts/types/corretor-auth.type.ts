import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerfilCorretor } from '@src/common/contracts/enums/perfil-corretor.enum';

@ObjectType({ description: 'Dados públicos do corretor autenticado.' })
export class CorretorAuthType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => PerfilCorretor)
  perfil: PerfilCorretor;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerfilCorretor } from '@src/common/contracts/enums/perfil-corretor.enum';

@ObjectType({ description: 'Corretor cadastrado na Habita.' })
export class CorretorType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => PerfilCorretor)
  perfil: PerfilCorretor;

  @Field(() => Date)
  createdAt: Date;
}

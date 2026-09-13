import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Dados públicos do corretor autenticado.' })
export class CorretorAuthType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;
}

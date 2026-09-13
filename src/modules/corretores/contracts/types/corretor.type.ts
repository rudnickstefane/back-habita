import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Corretor cadastrado na Habita.' })
export class CorretorType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;
}

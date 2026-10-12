import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Proprietário cadastrado na Habita.' })
export class ProprietarioType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  telefone: string;

  @Field(() => String)
  documento: string;

  @Field(() => Date)
  createdAt: Date;
}

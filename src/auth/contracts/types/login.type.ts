import { Field, ObjectType } from '@nestjs/graphql';
import { CorretorAuthType } from './corretor-auth.type';

@ObjectType({ description: 'Resultado da autenticação JWT.' })
export class LoginType {
  @Field(() => String, { description: 'Token JWT de acesso.' })
  token: string;

  @Field(() => CorretorAuthType)
  corretor: CorretorAuthType;
}

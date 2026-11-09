import { Field, ObjectType } from '@nestjs/graphql';
import { UsuarioAuthType } from './usuario-auth.type';

@ObjectType({ description: 'Resultado da autenticação JWT.' })
export class LoginType {
  @Field(() => String, { description: 'Token JWT de acesso.' })
  token: string;

  @Field(() => UsuarioAuthType)
  usuario: UsuarioAuthType;
}

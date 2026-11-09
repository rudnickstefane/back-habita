import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';

@ObjectType({ description: 'Dados públicos do usuário autenticado.' })
export class UsuarioAuthType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => PerfilAcesso)
  perfil: PerfilAcesso;
}

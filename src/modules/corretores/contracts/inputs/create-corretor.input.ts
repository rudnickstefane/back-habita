import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Dados para cadastro de um corretor.' })
export class CreateCorretorInput {
  @Field(() => String, { description: 'Nome completo do corretor.' })
  @IsString()
  @MinLength(2, { message: 'Informe o nome do corretor.' })
  nome: string;

  @Field(() => String, { description: 'E-mail único do corretor.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @Field(() => String, { description: 'Senha que será armazenada com hash.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha: string;
}

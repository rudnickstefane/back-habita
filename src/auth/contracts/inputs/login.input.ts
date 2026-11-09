import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Credenciais de acesso ao portal Habita.' })
export class LoginInput {
  @Field(() => String, { description: 'E-mail do administrador, corretor ou proprietário.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @Field(() => String, { description: 'Senha de acesso.' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

@InputType({ description: 'Dados para cadastro de um proprietário.' })
export class CreateProprietarioInput {
  @Field(() => String, { description: 'Nome completo do proprietário.' })
  @IsString()
  @MinLength(2, { message: 'Informe o nome do proprietário.' })
  nome: string;

  @Field(() => String, { description: 'E-mail de contato.' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @Field(() => String, { description: 'Telefone de contato.' })
  @IsString()
  @MinLength(8, { message: 'Informe um telefone válido.' })
  telefone: string;

  @Field(() => String, { description: 'CPF ou CNPJ do proprietário.' })
  @IsString()
  @Matches(/^[\d./-]{11,18}$/, { message: 'Informe um CPF ou CNPJ válido.' })
  documento: string;
}

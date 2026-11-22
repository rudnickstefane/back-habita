import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Dados para solicitar ou reservar uma visita.' })
export class CreateVisitaInput {
  @Field(() => Int, { description: 'Imóvel a ser visitado.' })
  @IsInt()
  imovelId: number;

  @Field(() => String, { description: 'Nome do visitante.' })
  @IsString()
  @MinLength(2, { message: 'Informe o nome do visitante.' })
  visitanteNome: string;

  @Field(() => String, { description: 'Telefone do visitante.' })
  @IsString()
  @MinLength(8, { message: 'Informe um telefone válido.' })
  visitanteTelefone: string;

  @Field(() => Date, { description: 'Data e horário da visita.' })
  dataHora: Date;
}

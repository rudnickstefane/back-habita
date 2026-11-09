import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { TipoImovel } from '@src/common/contracts/enums/imovel.enum';
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

@InputType({ description: 'Dados para cadastro ou solicitação de um imóvel.' })
export class CreateImovelInput {
  @Field(() => TipoImovel, { description: 'Tipo do imóvel.' })
  @IsEnum(TipoImovel)
  tipo: TipoImovel;

  @Field(() => String, { description: 'Endereço completo do imóvel.' })
  @IsString()
  @MinLength(8, { message: 'Informe o endereço do imóvel.' })
  endereco: string;

  @Field(() => Float, { description: 'Valor do imóvel em reais.' })
  @IsNumber()
  @Min(1, { message: 'Informe um valor maior que zero.' })
  valor: number;

  @Field(() => [String], { description: 'URLs das fotos locais. Mínimo de 2.' })
  @IsArray()
  @ArrayMinSize(2, { message: 'Envie no mínimo 2 fotos do imóvel.' })
  fotos: string[];

  @Field(() => Int, {
    nullable: true,
    description: 'Proprietário do imóvel. Obrigatório para administrador e corretor.',
  })
  @IsOptional()
  @IsInt()
  proprietarioId?: number;
}

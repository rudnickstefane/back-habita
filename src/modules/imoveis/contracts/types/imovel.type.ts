import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { StatusImovel, TipoImovel } from '@src/common/contracts/enums/imovel.enum';
import { ProprietarioType } from '@src/modules/proprietarios/contracts/types/proprietario.type';

@ObjectType({ description: 'Imóvel do catálogo Habita.' })
export class ImovelType {
  @Field(() => Int)
  id: number;

  @Field(() => TipoImovel)
  tipo: TipoImovel;

  @Field(() => String)
  endereco: string;

  @Field(() => Float)
  valor: number;

  @Field(() => StatusImovel)
  status: StatusImovel;

  @Field(() => [String])
  fotos: string[];

  @Field(() => Int)
  proprietarioId: number;

  @Field(() => ProprietarioType)
  proprietario: ProprietarioType;

  @Field(() => Date)
  createdAt: Date;
}

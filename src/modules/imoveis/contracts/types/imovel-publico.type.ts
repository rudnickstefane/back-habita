import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { TipoImovel } from '@src/common/contracts/enums/imovel.enum';

@ObjectType({ description: 'Imóvel aprovado visível no catálogo público.' })
export class ImovelPublicoType {
  @Field(() => Int)
  id: number;

  @Field(() => TipoImovel)
  tipo: TipoImovel;

  @Field(() => String)
  endereco: string;

  @Field(() => Float)
  valor: number;

  @Field(() => [String])
  fotos: string[];
}

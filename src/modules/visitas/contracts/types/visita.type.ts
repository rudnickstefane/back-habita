import { Field, Int, ObjectType } from '@nestjs/graphql';
import { StatusVisita } from '@src/common/contracts/enums/visita.enum';
import { CorretorType } from '@src/modules/corretores/contracts/types/corretor.type';
import { ImovelType } from '@src/modules/imoveis/contracts/types/imovel.type';

@ObjectType({ description: 'Visita agendada ou solicitada a um imóvel.' })
export class VisitaType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  visitanteNome: string;

  @Field(() => String)
  visitanteTelefone: string;

  @Field(() => Date)
  dataHora: Date;

  @Field(() => StatusVisita)
  status: StatusVisita;

  @Field(() => Int)
  imovelId: number;

  @Field(() => ImovelType)
  imovel: ImovelType;

  @Field(() => Int, { nullable: true })
  corretorId?: number | null;

  @Field(() => CorretorType, { nullable: true })
  corretor?: CorretorType | null;

  @Field(() => Date)
  createdAt: Date;
}

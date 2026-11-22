import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '@src/auth/contracts/types/auth-user.type';
import { GraphQLJWTGuard, StaffGuard } from '@src/auth/guards';
import { CurrentUser } from '@src/common/decorators/current-user.decorator';
import { CreateImovelInput } from '../contracts/inputs/create-imovel.input';
import { ImovelPublicoType } from '../contracts/types/imovel-publico.type';
import { ImovelType } from '../contracts/types/imovel.type';
import { ImoveisService } from '../services/imoveis.service';

@Resolver(() => ImovelType)
export class ImoveisResolver {
  constructor(private readonly service: ImoveisService) {}

  @Query(() => [ImovelType], {
    description:
      'Lista o catálogo de imóveis. Administrador e corretor veem todos; o proprietário vê os próprios.',
  })
  @UseGuards(GraphQLJWTGuard)
  imoveis(@CurrentUser() user: AuthUser): Promise<ImovelType[]> {
    return this.service.listar(user);
  }

  @Query(() => [ImovelPublicoType], {
    description: 'Lista os imóveis aprovados visíveis ao visitante, sem exigir login.',
  })
  imoveisDisponiveis(): Promise<ImovelPublicoType[]> {
    return this.service.listarDisponiveis();
  }

  @Mutation(() => ImovelType, {
    description:
      'Cadastra um imóvel (aprovado) ou, no portal do proprietário, solicita o cadastro (pendente).',
  })
  @UseGuards(GraphQLJWTGuard)
  criarImovel(
    @Args('data', {
      type: () => CreateImovelInput,
      description: 'Dados do imóvel, incluindo no mínimo 2 fotos.',
    })
    data: CreateImovelInput,
    @CurrentUser() user: AuthUser,
  ): Promise<ImovelType> {
    return this.service.criar(data, user);
  }

  @Mutation(() => ImovelType, {
    description: 'Aprova a solicitação de cadastro de um imóvel. Administrador e corretor.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  aprovarImovel(
    @Args('id', { type: () => Int, description: 'Identificador do imóvel pendente.' })
    id: number,
  ): Promise<ImovelType> {
    return this.service.aprovar(id);
  }

  @Mutation(() => ImovelType, {
    description: 'Recusa a solicitação de cadastro de um imóvel. Administrador e corretor.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  recusarImovel(
    @Args('id', { type: () => Int, description: 'Identificador do imóvel pendente.' })
    id: number,
  ): Promise<ImovelType> {
    return this.service.recusar(id);
  }
}

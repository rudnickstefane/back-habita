import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard, GraphQLJWTGuard } from '@src/auth/guards';
import { CreateCorretorInput } from '../contracts/inputs/create-corretor.input';
import { CorretorType } from '../contracts/types/corretor.type';
import { CorretoresService } from '../services/corretores.service';

@Resolver(() => CorretorType)
export class CorretoresResolver {
  constructor(private readonly service: CorretoresService) {}

  @Query(() => [CorretorType], {
    description: 'Lista os corretores cadastrados. Apenas o administrador.',
  })
  @UseGuards(GraphQLJWTGuard, AdminGuard)
  corretores(): Promise<CorretorType[]> {
    return this.service.listar();
  }

  @Mutation(() => CorretorType, {
    description: 'Cadastra um novo corretor. Apenas o administrador.',
  })
  @UseGuards(GraphQLJWTGuard, AdminGuard)
  criarCorretor(
    @Args('data', {
      type: () => CreateCorretorInput,
      description: 'Dados do corretor.',
    })
    data: CreateCorretorInput,
  ): Promise<CorretorType> {
    return this.service.criar(data);
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLJWTGuard } from '@src/auth/guards';
import { CreateProprietarioInput } from '../contracts/inputs/create-proprietario.input';
import { ProprietarioType } from '../contracts/types/proprietario.type';
import { ProprietariosService } from '../services/proprietarios.service';

@Resolver(() => ProprietarioType)
export class ProprietariosResolver {
  constructor(private readonly service: ProprietariosService) {}

  @Query(() => [ProprietarioType], {
    description: 'Lista os proprietários cadastrados. Disponível para administrador e corretor.',
  })
  @UseGuards(GraphQLJWTGuard)
  proprietarios(): Promise<ProprietarioType[]> {
    return this.service.listar();
  }

  @Mutation(() => ProprietarioType, {
    description: 'Cadastra um novo proprietário. Disponível para administrador e corretor.',
  })
  @UseGuards(GraphQLJWTGuard)
  criarProprietario(
    @Args('data', {
      type: () => CreateProprietarioInput,
      description: 'Dados do proprietário.',
    })
    data: CreateProprietarioInput,
  ): Promise<ProprietarioType> {
    return this.service.criar(data);
  }
}

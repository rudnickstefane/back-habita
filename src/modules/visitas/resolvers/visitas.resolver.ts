import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '@src/auth/contracts/types/auth-user.type';
import { GraphQLJWTGuard, StaffGuard } from '@src/auth/guards';
import { CurrentUser } from '@src/common/decorators/current-user.decorator';
import { CreateVisitaInput } from '../contracts/inputs/create-visita.input';
import { VisitaType } from '../contracts/types/visita.type';
import { VisitasService } from '../services/visitas.service';

@Resolver(() => VisitaType)
export class VisitasResolver {
  constructor(private readonly service: VisitasService) {}

  @Query(() => [VisitaType], {
    description: 'Lista as visitas. Disponível para administrador e corretor.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  visitas(): Promise<VisitaType[]> {
    return this.service.listar();
  }

  @Mutation(() => VisitaType, {
    description: 'Visitante solicita uma visita a um imóvel aprovado. Fica pendente até o corretor decidir.',
  })
  solicitarVisita(
    @Args('data', {
      type: () => CreateVisitaInput,
      description: 'Nome, telefone, data, horário e imóvel.',
    })
    data: CreateVisitaInput,
  ): Promise<VisitaType> {
    return this.service.solicitar(data);
  }

  @Mutation(() => VisitaType, {
    description: 'Corretor ou administrador reserva uma visita já aceita na agenda.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  agendarVisita(
    @Args('data', {
      type: () => CreateVisitaInput,
      description: 'Nome, telefone, data, horário e imóvel.',
    })
    data: CreateVisitaInput,
    @CurrentUser() user: AuthUser,
  ): Promise<VisitaType> {
    return this.service.agendar(data, user.id);
  }

  @Mutation(() => VisitaType, {
    description: 'Aceita uma solicitação de visita pendente.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  aceitarVisita(
    @Args('id', { type: () => Int, description: 'Identificador da visita pendente.' })
    id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<VisitaType> {
    return this.service.aceitar(id, user.id);
  }

  @Mutation(() => VisitaType, {
    description: 'Recusa uma solicitação de visita pendente.',
  })
  @UseGuards(GraphQLJWTGuard, StaffGuard)
  recusarVisita(
    @Args('id', { type: () => Int, description: 'Identificador da visita pendente.' })
    id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<VisitaType> {
    return this.service.recusar(id, user.id);
  }
}

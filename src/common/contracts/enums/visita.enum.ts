import { registerEnumType } from '@nestjs/graphql';

export enum StatusVisita {
  PENDENTE = 'PENDENTE',
  ACEITA = 'ACEITA',
  RECUSADA = 'RECUSADA',
}

registerEnumType(StatusVisita, {
  name: 'StatusVisita',
  description: 'Situação do agendamento de visita.',
});

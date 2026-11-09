import { registerEnumType } from '@nestjs/graphql';

export enum TipoImovel {
  CASA = 'CASA',
  APARTAMENTO = 'APARTAMENTO',
  TERRENO = 'TERRENO',
  COMERCIAL = 'COMERCIAL',
}

export enum StatusImovel {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  RECUSADO = 'RECUSADO',
}

registerEnumType(TipoImovel, {
  name: 'TipoImovel',
  description: 'Tipo do imóvel no catálogo.',
});

registerEnumType(StatusImovel, {
  name: 'StatusImovel',
  description: 'Situação da solicitação de cadastro do imóvel.',
});

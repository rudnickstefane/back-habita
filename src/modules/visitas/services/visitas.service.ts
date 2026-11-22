import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PerfilCorretor } from '@src/common/contracts/enums/perfil-corretor.enum';
import { StatusImovel, TipoImovel } from '@src/common/contracts/enums/imovel.enum';
import { StatusVisita } from '@src/common/contracts/enums/visita.enum';
import { CreateVisitaInput } from '../contracts/inputs/create-visita.input';
import { VisitaType } from '../contracts/types/visita.type';
import { VisitasRepository } from '../repositories/visitas.repository';

@Injectable()
export class VisitasService {
  constructor(private readonly repository: VisitasRepository) {}

  async listar(): Promise<VisitaType[]> {
    const registros = await this.repository.findAll();
    return registros.map((visita) => this.toType(visita));
  }

  async solicitar(data: CreateVisitaInput): Promise<VisitaType> {
    const dataHora = this.parseDataHora(data.dataHora);
    const imovel = await this.garantirImovelAprovado(data.imovelId);
    await this.garantirHorarioLivre(imovel.id, dataHora);

    const visita = await this.repository.create({
      visitanteNome: data.visitanteNome,
      visitanteTelefone: data.visitanteTelefone,
      dataHora,
      status: StatusVisita.PENDENTE,
      imovelId: imovel.id,
    });

    return this.toType(visita);
  }

  async agendar(data: CreateVisitaInput, corretorId: number): Promise<VisitaType> {
    const dataHora = this.parseDataHora(data.dataHora);
    const imovel = await this.garantirImovelAprovado(data.imovelId);
    await this.garantirHorarioLivre(imovel.id, dataHora);

    const visita = await this.repository.create({
      visitanteNome: data.visitanteNome,
      visitanteTelefone: data.visitanteTelefone,
      dataHora,
      status: StatusVisita.ACEITA,
      imovelId: imovel.id,
      corretorId,
    });

    return this.toType(visita);
  }

  async aceitar(id: number, corretorId: number): Promise<VisitaType> {
    const visita = await this.repository.findById(id);

    if (!visita) {
      throw new NotFoundException('Visita não encontrada.');
    }

    if (visita.status !== StatusVisita.PENDENTE) {
      throw new BadRequestException('Só é possível decidir sobre solicitações pendentes.');
    }

    await this.garantirHorarioLivre(visita.imovelId, visita.dataHora, visita.id);

    return this.toType(await this.repository.updateDecisao(id, StatusVisita.ACEITA, corretorId));
  }

  async recusar(id: number, corretorId: number): Promise<VisitaType> {
    const visita = await this.repository.findById(id);

    if (!visita) {
      throw new NotFoundException('Visita não encontrada.');
    }

    if (visita.status !== StatusVisita.PENDENTE) {
      throw new BadRequestException('Só é possível decidir sobre solicitações pendentes.');
    }

    return this.toType(await this.repository.updateDecisao(id, StatusVisita.RECUSADA, corretorId));
  }

  private async garantirImovelAprovado(imovelId: number) {
    const imovel = await this.repository.findImovelById(imovelId);

    if (!imovel) {
      throw new NotFoundException('Imóvel não encontrado.');
    }

    if (imovel.status !== StatusImovel.APROVADO) {
      throw new BadRequestException('Só é possível agendar visita em imóvel aprovado no catálogo.');
    }

    return imovel;
  }

  private async garantirHorarioLivre(imovelId: number, dataHora: Date, ignoreId?: number) {
    const conflito = await this.repository.findAceitaNoHorario(imovelId, dataHora, ignoreId);

    if (conflito) {
      throw new BadRequestException('Já existe uma visita aceita neste imóvel para o mesmo horário.');
    }
  }

  private parseDataHora(value: Date | string) {
    const dataHora = new Date(value);

    if (Number.isNaN(dataHora.getTime())) {
      throw new BadRequestException('Informe uma data e um horário válidos.');
    }

    dataHora.setSeconds(0, 0);

    if (dataHora.getTime() < Date.now()) {
      throw new BadRequestException('A visita precisa ser em data e horário futuros.');
    }

    return dataHora;
  }

  private toType(visita: {
    id: number;
    visitanteNome: string;
    visitanteTelefone: string;
    dataHora: Date;
    status: string;
    imovelId: number;
    corretorId: number | null;
    createdAt: Date;
    imovel: {
      id: number;
      tipo: string;
      endereco: string;
      valor: { toNumber(): number } | number | string;
      status: string;
      fotos: string[];
      proprietarioId: number;
      createdAt: Date;
      proprietario: {
        id: number;
        nome: string;
        email: string;
        telefone: string;
        documento: string;
        createdAt: Date;
      };
    };
    corretor: {
      id: number;
      nome: string;
      email: string;
      perfil: string;
      createdAt: Date;
    } | null;
  }): VisitaType {
    const valor =
      typeof visita.imovel.valor === 'object' && visita.imovel.valor && 'toNumber' in visita.imovel.valor
        ? visita.imovel.valor.toNumber()
        : Number(visita.imovel.valor);

    return {
      id: visita.id,
      visitanteNome: visita.visitanteNome,
      visitanteTelefone: visita.visitanteTelefone,
      dataHora: visita.dataHora,
      status: visita.status as StatusVisita,
      imovelId: visita.imovelId,
      corretorId: visita.corretorId,
      createdAt: visita.createdAt,
      imovel: {
        id: visita.imovel.id,
        tipo: visita.imovel.tipo as TipoImovel,
        endereco: visita.imovel.endereco,
        valor,
        status: visita.imovel.status as StatusImovel,
        fotos: visita.imovel.fotos,
        proprietarioId: visita.imovel.proprietarioId,
        createdAt: visita.imovel.createdAt,
        proprietario: visita.imovel.proprietario,
      },
      corretor: visita.corretor
        ? {
            ...visita.corretor,
            perfil: visita.corretor.perfil as PerfilCorretor,
          }
        : null,
    };
  }
}

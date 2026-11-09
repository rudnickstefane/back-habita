import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUser } from '@src/auth/contracts/types/auth-user.type';
import { StatusImovel, TipoImovel } from '@src/common/contracts/enums/imovel.enum';
import { PerfilAcesso } from '@src/common/contracts/enums/perfil-acesso.enum';
import { CreateImovelInput } from '../contracts/inputs/create-imovel.input';
import { ImovelType } from '../contracts/types/imovel.type';
import { ImoveisRepository } from '../repositories/imoveis.repository';

@Injectable()
export class ImoveisService {
  constructor(private readonly repository: ImoveisRepository) {}

  async listar(user: AuthUser): Promise<ImovelType[]> {
    const registros = this.isStaff(user)
      ? await this.repository.findAll()
      : await this.repository.findByProprietario(user.id);

    return registros.map((imovel) => this.toType(imovel));
  }

  async criar(data: CreateImovelInput, user: AuthUser): Promise<ImovelType> {
    if (data.fotos.length < 2) {
      throw new BadRequestException('Envie no mínimo 2 fotos do imóvel.');
    }

    const staff = this.isStaff(user);
    const proprietarioId = staff ? data.proprietarioId : user.id;
    const status = staff ? StatusImovel.APROVADO : StatusImovel.PENDENTE;

    if (!proprietarioId) {
      throw new BadRequestException('Selecione o proprietário do imóvel.');
    }

    const proprietario = await this.repository.findProprietarioById(proprietarioId);
    if (!proprietario) {
      throw new NotFoundException('Proprietário não encontrado.');
    }

    if (!staff && proprietarioId !== user.id) {
      throw new ForbiddenException('O proprietário só pode solicitar cadastro dos próprios imóveis.');
    }

    const imovel = await this.repository.create({
      tipo: data.tipo,
      endereco: data.endereco,
      valor: data.valor,
      fotos: data.fotos,
      status,
      proprietarioId,
    });

    return this.toType(imovel);
  }

  async aprovar(id: number): Promise<ImovelType> {
    return this.alterarStatus(id, StatusImovel.APROVADO);
  }

  async recusar(id: number): Promise<ImovelType> {
    return this.alterarStatus(id, StatusImovel.RECUSADO);
  }

  private async alterarStatus(id: number, status: StatusImovel): Promise<ImovelType> {
    const imovel = await this.repository.findById(id);

    if (!imovel) {
      throw new NotFoundException('Imóvel não encontrado.');
    }

    if (imovel.status !== StatusImovel.PENDENTE) {
      throw new BadRequestException('Só é possível decidir sobre solicitações pendentes.');
    }

    return this.toType(await this.repository.updateStatus(id, status));
  }

  private isStaff(user: AuthUser) {
    return user.perfil === PerfilAcesso.ADMIN || user.perfil === PerfilAcesso.CORRETOR;
  }

  private toType(imovel: {
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
  }): ImovelType {
    const valor =
      typeof imovel.valor === 'object' && imovel.valor && 'toNumber' in imovel.valor
        ? imovel.valor.toNumber()
        : Number(imovel.valor);

    return {
      id: imovel.id,
      tipo: imovel.tipo as TipoImovel,
      endereco: imovel.endereco,
      valor,
      status: imovel.status as StatusImovel,
      fotos: imovel.fotos,
      proprietarioId: imovel.proprietarioId,
      createdAt: imovel.createdAt,
      proprietario: {
        id: imovel.proprietario.id,
        nome: imovel.proprietario.nome,
        email: imovel.proprietario.email,
        telefone: imovel.proprietario.telefone,
        documento: imovel.proprietario.documento,
        createdAt: imovel.proprietario.createdAt,
      },
    };
  }
}

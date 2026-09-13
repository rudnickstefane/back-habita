import { ConflictException, Injectable } from '@nestjs/common';
import { PerfilCorretor } from '@src/common/contracts/enums/perfil-corretor.enum';
import { ArgonCrypto } from '@src/common/utils';
import { CreateCorretorInput } from '../contracts/inputs/create-corretor.input';
import { CorretorType } from '../contracts/types/corretor.type';
import { CorretoresRepository } from '../repositories/corretores.repository';

@Injectable()
export class CorretoresService {
  constructor(private readonly repository: CorretoresRepository) {}

  async listar(): Promise<CorretorType[]> {
    const corretores = await this.repository.findAll();
    return corretores.map((corretor) => this.toType(corretor));
  }

  async criar(data: CreateCorretorInput): Promise<CorretorType> {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
      throw new ConflictException('Já existe um corretor cadastrado com este e-mail.');
    }

    const corretor = await this.repository.create({
      nome: data.nome,
      email: data.email,
      senha: await ArgonCrypto.hash(data.senha),
    });

    return this.toType(corretor);
  }

  private toType(corretor: {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    createdAt: Date;
  }): CorretorType {
    return {
      ...corretor,
      perfil: corretor.perfil as PerfilCorretor,
    };
  }
}

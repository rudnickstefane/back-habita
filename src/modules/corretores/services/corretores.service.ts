import { ConflictException, Injectable } from '@nestjs/common';
import { ArgonCrypto } from '@src/common/utils';
import { CreateCorretorInput } from '../contracts/inputs/create-corretor.input';
import { CorretorType } from '../contracts/types/corretor.type';
import { CorretoresRepository } from '../repositories/corretores.repository';

@Injectable()
export class CorretoresService {
  constructor(private readonly repository: CorretoresRepository) {}

  listar(): Promise<CorretorType[]> {
    return this.repository.findAll();
  }

  async criar(data: CreateCorretorInput): Promise<CorretorType> {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
      throw new ConflictException('Já existe um corretor cadastrado com este e-mail.');
    }

    return this.repository.create({
      nome: data.nome,
      email: data.email,
      senha: await ArgonCrypto.hash(data.senha),
    });
  }
}

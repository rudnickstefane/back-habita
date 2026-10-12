import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProprietarioInput } from '../contracts/inputs/create-proprietario.input';
import { ProprietarioType } from '../contracts/types/proprietario.type';
import { ProprietariosRepository } from '../repositories/proprietarios.repository';

@Injectable()
export class ProprietariosService {
  constructor(private readonly repository: ProprietariosRepository) {}

  listar(): Promise<ProprietarioType[]> {
    return this.repository.findAll();
  }

  async criar(data: CreateProprietarioInput): Promise<ProprietarioType> {
    const documento = data.documento.replace(/\D/g, '');

    if (documento.length !== 11 && documento.length !== 14) {
      throw new BadRequestException('Informe um CPF (11 dígitos) ou CNPJ (14 dígitos).');
    }

    const [emailExistente, documentoExistente] = await Promise.all([
      this.repository.findByEmail(data.email),
      this.repository.findByDocumento(documento),
    ]);

    if (emailExistente) {
      throw new ConflictException('Já existe um proprietário cadastrado com este e-mail.');
    }

    if (documentoExistente) {
      throw new ConflictException('Já existe um proprietário cadastrado com este documento.');
    }

    return this.repository.create({
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      documento,
    });
  }
}

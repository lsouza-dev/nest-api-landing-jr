import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(usuario: Usuario) {
    return await this.usuarioRepository.save(usuario);
  }

  async obterPorEmail(email: string) {
    return await this.usuarioRepository.findOneBy({ email });
  }
}

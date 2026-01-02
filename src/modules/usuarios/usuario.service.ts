import { UsuarioCriacaoDTO } from 'src/dtos/usuarios/usuarioCriacaoDTO';
import { Usuario } from './usuario.entity';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioResponseDTO } from 'src/dtos/usuarios/usuarioResponseDTO';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsuarioService {
  constructor(
    private config: ConfigService,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async criar(dto: UsuarioCriacaoDTO): Promise<UsuarioResponseDTO> {
    try {
      const usuario = new Usuario();
      Object.assign(usuario, dto);
      await this.verificaEmailExistente(usuario.email);
      const senhaCriptografada = await bcrypt.hash(
        dto.senha,
        Number(this.config.get<string>('SALT_ROUNDS')),
      );
      usuario.senha = senhaCriptografada;
      await this.usuarioRepository.criar(usuario);
      return new UsuarioResponseDTO(usuario);
    } catch (e) {
      throw e;
    }
  }
  obterPorId(id: string) {
    throw new Error('Method not implemented.');
  }
  listar() {
    throw new Error('Method not implemented.');
  }

  async obterPorEmail(email: string) {
    try {
      const usuario = await this.usuarioRepository.obterPorEmail(email);
      if (!usuario) {
        throw new NotFoundException(
          'Nenhum usuário cadastrado com este e-mail.',
        );
      }
      return usuario;
    } catch (e) {
      throw e;
    }
  }

  async verificaEmailExistente(email: string) {
    return (await this.usuarioRepository.obterPorEmail(email)) != null;
  }
}

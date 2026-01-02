import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCriacaoDTO } from 'src/dtos/usuarios/usuarioCriacaoDTO';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/api/v1/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async listar() {
    return await this.usuarioService.listar();
  }

  @Get(':id')
  public async obterPorId(@Param('id') id: string) {
    return await this.usuarioService.obterPorId(id);
  }

  @Post()
  public async criar(@Body() dto: UsuarioCriacaoDTO) {
    return await this.usuarioService.criar(dto);
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO } from '../../dtos/auth/LoginDTO'
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuario.service';
import bcrypt from 'bcrypt'
import { AuthPayload } from './AuthPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    private configService:ConfigService,
    private usuarioService:UsuarioService
  ){}

  async login(dto: LoginDTO) {
    const usuario = await this.usuarioService.obterPorEmail(dto.email);
    const senhaCorreta = await bcrypt.compareSync(dto.senha,usuario.senha)

    if(!senhaCorreta){
      throw new ForbiddenException('Senha incorreta.')
    }

    const payload:AuthPayload = {
      id:usuario.id,
      email:usuario.email,
      nome:usuario.nome
    }

    const token =  this.jwtService.sign(payload,{
      secret: this.configService.get<string>('JWT_SECRET')
    })

    return {
      usuario: payload,
      access_token:token
    }
  }

}
  
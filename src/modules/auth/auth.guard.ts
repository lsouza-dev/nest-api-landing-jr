import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReqComUsuario } from './interfaces/ReqComUsuario';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/AuthPayload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ReqComUsuario>();
    const token = this.obterTokenNoHeader(req);
    if (!token) {
      throw new UnauthorizedException('Erro de Autorização no Token.');
    }

    try {
      const payload: AuthPayload = await this.jwtService.verifyAsync(token);
      req.usuario = payload;
      return true;
    } catch (e) {
      console.error('Erro ao verificar JWT:', e);
      throw new UnauthorizedException(
        'Token JWT inválido. ' + (e?.message ?? ''),
      );
    }
  }

  obterTokenNoHeader(req: Request | ReqComUsuario): string | undefined {
    const [tipo, token] = req.headers.authorization?.split(' ') ?? [];
    console.log(tipo, token);
    return tipo === 'Bearer' ? token : undefined;
  }
}

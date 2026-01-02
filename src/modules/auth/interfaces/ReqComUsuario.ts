import { Request } from 'express';
import { AuthPayload } from './AuthPayload';

export interface ReqComUsuario extends Request {
  usuario: AuthPayload;
}

import { UsuarioCriacaoDTO } from './usuarioCriacaoDTO';
import { PartialType } from '@nestjs/mapped-types';

export class UsuarioEdicaoDTO extends PartialType(UsuarioCriacaoDTO) {}

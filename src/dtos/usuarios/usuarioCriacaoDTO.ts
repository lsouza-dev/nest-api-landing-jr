import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UsuarioCriacaoDTO {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MinLength(5, { message: 'O nome deve ao menos 5 caracteres.' })
  nome: string;

  @IsEmail(undefined, { message: 'Insira um e-mail válido.' })
  @MinLength(6, { message: 'O e-mail deve ter ao menos 6 caracteres.' })
  email: string;

  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[\w $*&@#]{8,}/gm, {
    message:
      'A senha deve conter ao menos um dígito,uma letra minúscula,uma letra maiúscula, um caractere especial e ao menos 8 dígitos',
  })
  senha: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail(undefined, { message: 'Insira um e-mail válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha: string;
}

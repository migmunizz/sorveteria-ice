import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Informe nome e sobrenome.' })
  @MinLength(3, { message: 'Informe nome e sobrenome.' })
  name: string;

  @IsString({ message: 'CPF é obrigatório.' })
  cpf: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @IsString({ message: 'Telefone é obrigatório.' })
  phone: string;

  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres.' })
  password: string;
}

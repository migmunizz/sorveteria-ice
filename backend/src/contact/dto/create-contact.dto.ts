import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString({ message: 'Nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @MinLength(10, { message: 'Escreva pelo menos 10 caracteres.' })
  message: string;
}

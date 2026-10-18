import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Informe nome e sobrenome.' })
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

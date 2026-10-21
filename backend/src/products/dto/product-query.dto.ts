import { Category } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class ProductQueryDto {
  @IsOptional()
  @IsEnum(Category, { message: 'Categoria inválida.' })
  categoria?: Category;
}

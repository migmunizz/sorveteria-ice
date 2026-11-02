import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class AddressDto {
  @IsString({ message: 'Rua é obrigatória.' })
  street: string;

  @IsString({ message: 'Número é obrigatório.' })
  number: string;

  @IsString({ message: 'Bairro é obrigatório.' })
  district: string;

  @IsOptional()
  @IsString()
  complement?: string;
}

export class OrderItemDto {
  @IsString({ message: 'Sabor é obrigatório.' })
  flavorId: string;

  @IsInt()
  @Min(1, { message: 'Quantidade mínima é 1.' })
  @Max(20, { message: 'Quantidade máxima é 20.' })
  quantity: number;

  // O frontend também manda estes campos; o backend ignora e recalcula com o preço do banco.
  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  category?: string;
}

export class CreateOrderDto {
  @IsString({ message: 'Usuário é obrigatório.' })
  userId: string;

  @ArrayNotEmpty({ message: 'O carrinho está vazio.' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsIn(['pix', 'cartao', 'dinheiro'], { message: 'Forma de pagamento inválida.' })
  payment: PaymentMethod;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

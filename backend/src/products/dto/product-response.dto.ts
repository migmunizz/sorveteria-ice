import type { Category, Product } from '@prisma/client';

export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  available: boolean;
  highlight: boolean;
  isNew: boolean;
  promo: boolean;
}

// O Prisma devolve price como Decimal; o frontend espera number (formato Flavor).
export function toFlavor(product: Product): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    imageUrl: product.imageUrl,
    available: product.available,
    highlight: product.highlight,
    isNew: product.isNew,
    promo: product.promo,
  };
}

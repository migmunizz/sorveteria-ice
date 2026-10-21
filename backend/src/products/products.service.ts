import { Injectable, NotFoundException } from '@nestjs/common';
import type { Category } from '@prisma/client';
import { toFlavor } from './dto/product-response.dto.js';
import { ProductsRepository } from './products.repository.js';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(category?: Category) {
    const products = await this.productsRepository.findAll(category);
    return products.map(toFlavor);
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return toFlavor(product);
  }
}

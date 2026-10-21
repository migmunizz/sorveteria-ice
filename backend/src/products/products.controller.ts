import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { ProductsService } from './products.service.js';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('cardapio')
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query.categoria);
  }

  @Get('produto/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}

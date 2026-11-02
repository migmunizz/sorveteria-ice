import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get('pedido/:id')
  findOne(@Param('id') id: string, @Query('userId') userId: string) {
    const orderId = Number(id);
    if (!Number.isInteger(orderId)) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return this.ordersService.findOne(orderId, userId);
  }

  @Get('minha-conta/:userId/pedidos')
  findAllByUser(@Param('userId') userId: string) {
    return this.ordersService.findAllByUser(userId);
  }
}

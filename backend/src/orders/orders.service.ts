import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository.js';
import { UsersRepository } from '../users/users.repository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { toOrder } from './dto/order-response.dto.js';
import { OrdersRepository } from './orders.repository.js';

const DELIVERY_FEE = Number(process.env.DELIVERY_FEE ?? 0);

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(dto: CreateOrderDto) {
    if (!(await this.usersRepository.findById(dto.userId))) {
      throw new BadRequestException('Usuário não encontrado');
    }

    let subtotal = 0;
    const items = [];
    for (const item of dto.items) {
      const product = await this.productsRepository.findById(item.flavorId);
      if (!product) {
        throw new BadRequestException('Produto não encontrado');
      }
      if (!product.available) {
        throw new BadRequestException(`${product.name} está esgotado.`);
      }

      const price = Number(product.price);
      subtotal += price * item.quantity;
      items.push({
        productId: product.id,
        name: product.name,
        price,
        category: product.category,
        quantity: item.quantity,
      });
    }

    const order = await this.ordersRepository.create({
      userId: dto.userId,
      payment: dto.payment,
      street: dto.address.street,
      number: dto.address.number,
      district: dto.address.district,
      complement: dto.address.complement,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      items,
    });
    return toOrder(order);
  }

  async findOne(id: number, userId: string) {
    const order = await this.ordersRepository.findById(id);
    if (!order || order.userId !== userId) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return toOrder(order);
  }

  async findAllByUser(userId: string) {
    const orders = await this.ordersRepository.findAllByUser(userId);
    return orders.map(toOrder);
  }
}

import { Injectable } from '@nestjs/common';
import type { Category, PaymentMethod } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

interface CreateOrderItemData {
  productId: string;
  name: string;
  price: number;
  category: Category;
  quantity: number;
}

interface CreateOrderData {
  userId: string;
  payment: PaymentMethod;
  street: string;
  number: string;
  district: string;
  complement?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: CreateOrderItemData[];
}

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateOrderData) {
    const { items, ...order } = data;
    return this.prisma.order.create({
      data: { ...order, items: { create: items } },
      include: { items: true },
    });
  }

  findById(id: number) {
    return this.prisma.order.findUnique({ where: { id }, include: { items: true } });
  }

  findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

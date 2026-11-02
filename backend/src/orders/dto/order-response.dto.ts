import type { Order, OrderItem } from '@prisma/client';

type OrderWithItems = Order & { items: OrderItem[] };

export class OrderResponseDto {
  id: string;
  userId: string;
  items: {
    flavorId: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: string;
  payment: string;
  address: {
    street: string;
    number: string;
    district: string;
    complement?: string;
  };
  createdAt: string;
}

// O Prisma devolve Decimal e o id da Order como number; o frontend espera o formato Order.
export function toOrder(order: OrderWithItems): OrderResponseDto {
  return {
    id: String(order.id),
    userId: order.userId,
    items: order.items.map((item) => ({
      flavorId: item.productId,
      name: item.name,
      price: Number(item.price),
      category: item.category,
      quantity: item.quantity,
    })),
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    status: order.status,
    payment: order.payment,
    address: {
      street: order.street,
      number: order.number,
      district: order.district,
      complement: order.complement ?? undefined,
    },
    createdAt: order.createdAt.toISOString(),
  };
}

import type { CreateOrderData, Order } from '../types';
import { site } from '../config/site';
import { api, delay, USE_MOCK, ApiError } from './api';

const read = (): Order[] => JSON.parse(localStorage.getItem('mock_orders') ?? '[]');
const write = (o: Order[]) => localStorage.setItem('mock_orders', JSON.stringify(o));

export async function createOrder(userId: string, data: CreateOrderData): Promise<Order> {
  if (USE_MOCK) {
    await delay(700);
    const subtotal = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const order: Order = {
      ...data,
      id: String(1000 + read().length + 1),
      userId,
      subtotal,
      deliveryFee: site.deliveryFee,
      total: subtotal + site.deliveryFee,
      status: 'recebido',
      createdAt: new Date().toISOString(),
    };
    write([order, ...read()]);
    return order;
  }
  return api<Order>('/checkout', { method: 'POST', body: JSON.stringify({ userId, ...data }) });
}

export async function getOrder(id: string, userId: string): Promise<Order> {
  if (USE_MOCK) {
    await delay(300);
    const o = read().find((x) => x.id === id && x.userId === userId);
    if (!o) throw new ApiError(404, 'Pedido não encontrado');
    return o;
  }
  return api<Order>(`/pedido/${id}?userId=${userId}`);
}

export async function getMyOrders(userId: string): Promise<Order[]> {
  if (USE_MOCK) {
    await delay(300);
    return read().filter((x) => x.userId === userId);
  }
  return api<Order[]>(`/minha-conta/${userId}/pedidos`);
}

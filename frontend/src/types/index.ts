// Modelos compartilhados com o backend NestJS (contrato da API)

export type Category = 'sorvetes' | 'casquinhas' | 'picoles' | 'acai' | 'milkshakes';

export interface Flavor {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string; // vazio até existirem as fotos dos produtos
  available: boolean;
  highlight: boolean;
  isNew?: boolean;
  promo?: boolean;
}

export interface CartItem {
  flavorId: string;
  name: string;
  price: number;
  category: Category;
  quantity: number;
}

export interface User {
  id: string;
  name: string; // nome completo
  email: string;
  cpf: string;
  phone: string;
}

export interface RegisterData extends Omit<User, 'id'> {
  password: string;
}

export type OrderStatus = 'recebido' | 'preparando' | 'saiu_para_entrega' | 'entregue';
export type PaymentMethod = 'pix' | 'cartao' | 'dinheiro';

export interface Address {
  street: string;
  number: string;
  district: string;
  complement?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  payment: PaymentMethod;
  address: Address;
  createdAt: string;
}

export interface CreateOrderData {
  items: CartItem[];
  payment: PaymentMethod;
  address: Address;
}

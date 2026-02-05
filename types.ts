export type Role = 'admin' | 'client' | 'guest';

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  active: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  hasOrders: boolean; // For deletion logic
}

export type OrderStatus = 'Novo' | 'Pago' | 'Preparação' | 'Faturado' | 'Despachado' | 'Entregue' | 'Cancelado';
export type PaymentStatus = 'Pendente' | 'Pago' | 'Reembolsado';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
}

export interface CartItem extends OrderItem {
  image: string;
}

export interface KPI {
  label: string;
  value: string;
  type: 'currency' | 'number';
}

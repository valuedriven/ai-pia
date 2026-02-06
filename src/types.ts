export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST'
}

export enum OrderStatus {
  PENDING = 'Pendente',
  PAID = 'Pago',
  SHIPPED = 'Enviado',
  DELIVERED = 'Entregue',
  CANCELLED = 'Cancelado'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  ref: string;
  status: 'Ativo' | 'Inativo';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  since: string;
  initials: string;
  color: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: Customer;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  paymentMethod: string;
}

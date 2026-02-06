import { Customer, Order, OrderStatus, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kit Sabonetes Artesanais',
    category: 'Higiene & Bem-estar',
    price: 45.00,
    stock: 120,
    image: 'https://picsum.photos/200/200?random=1',
    ref: 'HB-001',
    status: 'Ativo'
  },
  {
    id: '2',
    name: 'Vela Aromática Lavanda',
    category: 'Decoração',
    price: 30.00,
    stock: 85,
    image: 'https://picsum.photos/200/200?random=2',
    ref: 'DC-002',
    status: 'Ativo'
  },
  {
    id: '3',
    name: 'Vaso Cerâmica Minimalista',
    category: 'Decoração',
    price: 60.00,
    stock: 40,
    image: 'https://picsum.photos/200/200?random=3',
    ref: 'DC-003',
    status: 'Ativo'
  },
  {
    id: '4',
    name: 'Planta Decorativa Suculenta',
    category: 'Jardinagem',
    price: 35.00,
    stock: 200,
    image: 'https://picsum.photos/200/200?random=4',
    ref: 'JD-004',
    status: 'Ativo'
  },
  {
    id: '5',
    name: 'Caderno Artesanal Couro',
    category: 'Papelaria',
    price: 85.00,
    stock: 15,
    image: 'https://picsum.photos/200/200?random=5',
    ref: 'PP-005',
    status: 'Ativo'
  },
  {
    id: '6',
    name: 'Cesta de Bambu Natural',
    category: 'Decoração',
    price: 55.00,
    stock: 0,
    image: 'https://picsum.photos/200/200?random=6',
    ref: 'DC-006',
    status: 'Inativo'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123, São Paulo - SP',
    since: 'Jan 2023',
    initials: 'MS',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'c2',
    name: 'João Oliveira',
    email: 'joao.souza@example.com',
    phone: '(11) 98888-8888',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    since: 'Fev 2023',
    initials: 'JO',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'c3',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    phone: '(21) 97777-7777',
    address: 'Rua Central, 45, Rio de Janeiro - RJ',
    since: 'Mar 2023',
    initials: 'AC',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    id: 'c4',
    name: 'Carlos Lima',
    email: 'carlos.lima@example.com',
    phone: '(31) 96666-6666',
    address: 'Av. do Estado, 500, Belo Horizonte - MG',
    since: 'Abr 2023',
    initials: 'CL',
    color: 'bg-green-100 text-green-700'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-051',
    customer: MOCK_CUSTOMERS[0],
    date: '14 Out, 2023 14:32',
    total: 150.00,
    status: OrderStatus.PAID,
    paymentMethod: 'Cartão de Crédito',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 2 },
      { product: MOCK_PRODUCTS[2], quantity: 1 }
    ]
  },
  {
    id: 'ORD-2024-050',
    customer: MOCK_CUSTOMERS[1],
    date: '14 Out, 2023 10:15',
    total: 89.90,
    status: OrderStatus.PENDING,
    paymentMethod: 'Pix',
    items: [
      { product: MOCK_PRODUCTS[1], quantity: 3 }
    ]
  },
  {
    id: 'ORD-2024-049',
    customer: MOCK_CUSTOMERS[2],
    date: '13 Out, 2023 18:45',
    total: 210.50,
    status: OrderStatus.SHIPPED,
    paymentMethod: 'Cartão de Crédito',
    items: [
      { product: MOCK_PRODUCTS[4], quantity: 1 },
      { product: MOCK_PRODUCTS[3], quantity: 2 }
    ]
  },
  {
    id: 'ORD-2024-048',
    customer: MOCK_CUSTOMERS[3],
    date: '13 Out, 2023 09:20',
    total: 45.00,
    status: OrderStatus.CANCELLED,
    paymentMethod: 'Boleto',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1 }
    ]
  }
];

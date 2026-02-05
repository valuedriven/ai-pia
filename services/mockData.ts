import { Product, Client, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Café Artesanal Torra Média',
    image: 'https://picsum.photos/400/400?random=1',
    description: 'Café especial 100% arábica, notas de chocolate e nozes.',
    price: 35.00,
    stock: 50,
    category: 'Alimentos',
    active: true,
  },
  {
    id: '2',
    name: 'Caneca de Cerâmica',
    image: 'https://picsum.photos/400/400?random=2',
    description: 'Feita à mão, esmalte azul marinho.',
    price: 45.00,
    stock: 15,
    category: 'Casa',
    active: true,
  },
  {
    id: '3',
    name: 'Kit de Sabonetes Naturais',
    image: 'https://picsum.photos/400/400?random=3',
    description: 'Lavanda, Alecrim e Capim Limão.',
    price: 28.90,
    stock: 0,
    category: 'Beleza',
    active: true,
  },
  {
    id: '4',
    name: 'Bolsa de Lona Reciclada',
    image: 'https://picsum.photos/400/400?random=4',
    description: 'Ideal para compras e dia a dia.',
    price: 89.90,
    stock: 5,
    category: 'Acessórios',
    active: false,
  },
];

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    hasOrders: true,
  },
  {
    id: 'c2',
    name: 'João Souza',
    email: 'joao@example.com',
    phone: '(11) 88888-8888',
    address: 'Av. Paulista, 1000',
    hasOrders: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    customerId: 'c1',
    customerName: 'Maria Silva',
    date: '2023-10-25',
    total: 80.00,
    status: 'Novo',
    paymentStatus: 'Pendente',
    items: [
      { productId: '1', productName: 'Café Artesanal', quantity: 1, price: 35.00 },
      { productId: '2', productName: 'Caneca', quantity: 1, price: 45.00 },
    ]
  },
  {
    id: 'o2',
    customerId: 'c1',
    customerName: 'Maria Silva',
    date: '2023-10-20',
    total: 35.00,
    status: 'Entregue',
    paymentStatus: 'Pago',
    items: [
      { productId: '1', productName: 'Café Artesanal', quantity: 1, price: 35.00 },
    ]
  },
  {
    id: 'o3',
    customerId: 'c2',
    customerName: 'João Souza',
    date: '2023-10-24',
    total: 100.00,
    status: 'Preparação',
    paymentStatus: 'Pago',
    items: [
       { productId: '1', productName: 'Café Artesanal', quantity: 2, price: 35.00 },
    ]
  }
];

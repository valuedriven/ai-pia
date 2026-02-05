import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ClientLayout, AdminLayout } from './components/Layouts';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Badge } from './components/ui/Badge';
import { mockProducts, mockOrders, mockClients } from './services/mockData';
import { CartItem, Product, Order } from './types';
import { 
  ArrowRight, 
  Trash2, 
  Plus, 
  Edit2, 
  Search, 
  Filter,
  DollarSign,
  ShoppingBag,
  CreditCard 
} from 'lucide-react';

/* --- TEL-01 Page Home --- */
const HomePage: React.FC = () => {
  return (
    <div>
      <section className="bg-[#1F3A5F] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Seu negócio, simplificado.</h1>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            A plataforma ideal para microempreendedores venderem mais e gerenciarem melhor.
          </p>
          <Link to="/store">
            <Button variant="secondary" className="bg-white text-[#1F3A5F] font-bold">
              Ver Vitrine
            </Button>
          </Link>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-[#111827]">Destaques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map(p => (
            <div key={p.id} className="bg-white rounded-lg overflow-hidden border border-[#E5E7EB]">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{p.name}</h3>
                <p className="text-[#1565C0] font-bold mt-2">R$ {p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* --- TEL-02 Login --- */
const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="bg-white p-8 rounded-lg border border-[#E5E7EB] w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1F3A5F]">Entrar</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="E-mail" type="email" placeholder="seu@email.com" />
          <Input label="Senha" type="password" placeholder="********" />
          <Link to="/store">
            <Button className="w-full mt-4">Entrar (Demo Cliente)</Button>
          </Link>
          <Link to="/admin/dashboard">
            <Button variant="secondary" className="w-full">Entrar (Demo Admin)</Button>
          </Link>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-[#1F3A5F] hover:underline">Criar conta (Cliente)</a>
        </div>
      </div>
    </div>
  );
};

/* --- TEL-03 Vitrine --- */
const StorePage: React.FC<{ addToCart: (p: Product) => void }> = ({ addToCart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Vitrine de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.filter(p => p.active).map(product => (
          <div key={product.id} className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden flex flex-col">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-[#4B5563] mb-4 flex-1 line-clamp-2">{product.description}</p>
              <div className="mt-auto">
                <p className="text-xl font-bold text-[#1F3A5F] mb-3">R$ {product.price.toFixed(2)}</p>
                <Button 
                  className="w-full" 
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                >
                  {product.stock === 0 ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TEL-04 Carrinho --- */
const CartPage: React.FC<{ cart: CartItem[], updateQty: (id: string, q: number) => void }> = ({ cart, updateQty }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-[#E5E7EB]">
          <p className="text-[#4B5563] mb-4">Seu carrinho está vazio.</p>
          <Link to="/store"><Button>Ir para Vitrine</Button></Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cart.map(item => (
              <div key={item.productId} className="flex gap-4 bg-white p-4 rounded-lg border border-[#E5E7EB]">
                <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-sm text-[#4B5563]">Unit: R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                    >-</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-lg border border-[#E5E7EB]">
            <h2 className="text-lg font-bold mb-4">Resumo</h2>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold text-xl">R$ {total.toFixed(2)}</span>
            </div>
            <Link to="/orders">
              <Button className="w-full">Confirmar Pedido</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- TEL-05 Meus Pedidos (Client) --- */
const ClientOrdersPage: React.FC = () => {
  const myOrders = mockOrders.filter(o => o.customerId === 'c1');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>
      <div className="space-y-4">
        {myOrders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg border border-[#E5E7EB] flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex-1">
               <p className="font-bold">Pedido #{order.id}</p>
               <p className="text-sm text-[#4B5563]">{order.date}</p>
             </div>
             <div className="flex gap-4">
                <Badge label={order.status} type="status" />
                <span className="font-bold">R$ {order.total.toFixed(2)}</span>
             </div>
             <Link to={`/orders/${order.id}`}>
               <Button variant="secondary" className="text-sm">Detalhes</Button>
             </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TEL-06 Detalhe do Pedido --- */
const OrderDetailPage: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  const order = mockOrders[0]; // Mocking fetching specific ID

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pedido #{order.id}</h1>
        {isAdmin && (
           <Button>Alterar Status</Button>
        )}
      </div>
      
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden mb-6">
        <div className="p-6 border-b border-[#E5E7EB] bg-gray-50 flex justify-between">
           <div>
             <p className="text-sm text-[#4B5563]">Data</p>
             <p className="font-medium">{order.date}</p>
           </div>
           <div>
             <p className="text-sm text-[#4B5563]">Status</p>
             <Badge label={order.status} type="status" />
           </div>
            <div>
             <p className="text-sm text-[#4B5563]">Pagamento</p>
             <Badge label={order.paymentStatus} type="payment" />
           </div>
        </div>
        <div className="p-6">
          <h3 className="font-bold mb-4">Itens</h3>
          <ul className="space-y-3">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                <span>{item.quantity}x {item.productName}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end border-t pt-4">
            <span className="text-lg font-bold">Total: R$ {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- TEL-10 Dashboard (Admin) --- */
const AdminDashboard: React.FC = () => {
  const totalSales = mockOrders.reduce((acc, o) => acc + o.total, 0);
  const pending = mockOrders.filter(o => o.paymentStatus === 'Pendente').reduce((acc, o) => acc + o.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#1F3A5F]">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB]">
          <h3 className="text-[#4B5563] text-sm font-medium mb-2">Total de Vendas</h3>
          <p className="text-3xl font-bold text-[#1F3A5F]">{mockOrders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB]">
          <h3 className="text-[#4B5563] text-sm font-medium mb-2">Valor Recebido</h3>
          <p className="text-3xl font-bold text-[#2E7D32]">R$ {totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB]">
          <h3 className="text-[#4B5563] text-sm font-medium mb-2">Valor Pendente</h3>
          <p className="text-3xl font-bold text-[#F9A825]">R$ {pending.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB]">
        <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
          <h2 className="font-bold text-lg">Últimos Pedidos</h2>
          <Link to="/admin/orders" className="text-sm text-[#1F3A5F] hover:underline">Ver todos</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[#4B5563]">
              <tr>
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td className="px-6 py-4 font-medium">#{o.id}</td>
                  <td className="px-6 py-4">{o.customerName}</td>
                  <td className="px-6 py-4">{o.date}</td>
                  <td className="px-6 py-4">R$ {o.total.toFixed(2)}</td>
                  <td className="px-6 py-4"><Badge label={o.status} type="status"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- TEL-07 Gestão de Produtos --- */
const AdminProducts: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1F3A5F]">Produtos</h1>
        <Button><Plus size={16} className="mr-2"/> Novo Produto</Button>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[#4B5563]">
            <tr>
              <th className="px-6 py-3 font-medium">Produto</th>
              <th className="px-6 py-3 font-medium">Preço</th>
              <th className="px-6 py-3 font-medium">Estoque</th>
              <th className="px-6 py-3 font-medium">Categoria</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockProducts.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-10 h-10 rounded object-cover bg-gray-100" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">R$ {p.price.toFixed(2)}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${p.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {p.active ? 'Ativo' : 'Inativo'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#4B5563] hover:text-[#1F3A5F] mr-3"><Edit2 size={16}/></button>
                  <button className="text-[#C62828] hover:text-red-800"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mockProducts.length === 0 && <div className="p-8 text-center text-gray-500">Nenhum registro encontrado</div>}
      </div>
      
      {/* Mock Form Structure (visually protected) */}
      <div className="mt-8 p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
         <h3 className="font-bold mb-4 text-[#4B5563]">Formulário (Simulado)</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input label="Nome" placeholder="Nome do produto" />
           <Input label="Preço" type="number" placeholder="0.00" />
           <Input label="Imagem URL" placeholder="https://..." />
           <div className="flex items-center mt-6">
             <input type="checkbox" id="active" className="mr-2" /> <label htmlFor="active">Ativo</label>
           </div>
         </div>
      </div>
    </div>
  );
};

/* --- TEL-08 Gestão de Clientes --- */
const AdminClients: React.FC = () => {
  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1F3A5F]">Clientes</h1>
        <Button><Plus size={16} className="mr-2"/> Novo Cliente</Button>
      </div>
      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[#4B5563]">
            <tr>
              <th className="px-6 py-3 font-medium">Nome</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Telefone</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockClients.map(c => (
              <tr key={c.id}>
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.phone}</td>
                <td className="px-6 py-4 text-right">
                   <button className="text-[#4B5563] hover:text-[#1F3A5F] mr-3"><Edit2 size={16}/></button>
                   <button 
                    className={`text-[#C62828] ${c.hasOrders ? 'opacity-30 cursor-not-allowed' : 'hover:text-red-800'}`}
                    disabled={c.hasOrders}
                    title={c.hasOrders ? 'Cliente possui pedidos' : 'Excluir'}
                   >
                     <Trash2 size={16}/>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- TEL-09 Gestão de Pedidos --- */
const AdminOrders: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F3A5F] mb-6">Gestão de Pedidos</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input type="text" placeholder="Buscar por cliente ou ID..." className="pl-10 w-full rounded-md border border-[#E5E7EB] py-2 text-sm" />
        </div>
        <div className="relative">
           <select className="pl-3 pr-8 py-2 border border-[#E5E7EB] rounded-md text-sm bg-white appearance-none">
             <option>Todos Status</option>
             <option>Novo</option>
             <option>Pago</option>
             <option>Entregue</option>
           </select>
           <Filter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={14} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[#4B5563]">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Data</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockOrders.map(o => (
              <tr key={o.id}>
                <td className="px-6 py-4">#{o.id}</td>
                <td className="px-6 py-4">{o.customerName}</td>
                <td className="px-6 py-4">{o.date}</td>
                <td className="px-6 py-4">R$ {o.total.toFixed(2)}</td>
                <td className="px-6 py-4"><Badge label={o.status} type="status"/></td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/orders/${o.id}`} className="text-[#1F3A5F] hover:underline font-medium">Detalhes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- Main App Component --- */
const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId: product.id, productName: product.name, price: product.price, quantity: 1, image: product.image }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.productId !== id));
    } else {
      setCart(prev => prev.map(i => i.productId === id ? { ...i, quantity: qty } : i));
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public/Client Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><HomePage /></ClientLayout>} />
        <Route path="/store" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><StorePage addToCart={addToCart} /></ClientLayout>} />
        <Route path="/cart" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><CartPage cart={cart} updateQty={updateQty} /></ClientLayout>} />
        <Route path="/orders" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><ClientOrdersPage /></ClientLayout>} />
        <Route path="/orders/:id" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><OrderDetailPage /></ClientLayout>} />
        <Route path="/profile" element={<ClientLayout cartCount={cart.reduce((a,c) => a + c.quantity, 0)}><div className="p-8">Perfil do Cliente (Placeholder)</div></ClientLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
        <Route path="/admin/clients" element={<AdminLayout><AdminClients /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
        <Route path="/admin/orders/:id" element={<AdminLayout><OrderDetailPage isAdmin /></AdminLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Users, Package, LayoutDashboard, Home, Store, User, LogOut, ShoppingCart, Search } from 'lucide-react';
import { Button } from './ui/Button';

// Admin Sidebar
export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-[#1F3A5F] text-white' : 'text-[#4B5563] hover:bg-gray-100';

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E7EB] fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h1 className="text-xl font-bold text-[#1F3A5F]">Tractus Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/admin/dashboard')}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/orders" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/admin/orders')}`}>
            <ShoppingBag size={20} /> Pedidos
          </Link>
          <Link to="/admin/products" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/admin/products')}`}>
            <Package size={20} /> Produtos
          </Link>
          <Link to="/admin/clients" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/admin/clients')}`}>
            <Users size={20} /> Clientes
          </Link>
        </nav>
        <div className="p-4 border-t border-[#E5E7EB]">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#C62828] hover:bg-red-50 rounded-md">
             <LogOut size={20} /> Sair
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

// Client Layout
export const ClientLayout: React.FC<{ children: React.ReactNode, cartCount: number }> = ({ children, cartCount }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-[#1F3A5F]' : 'text-[#4B5563]';

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Desktop Top Bar */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-[#1F3A5F]">Tractus</Link>
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/login" className="text-sm font-medium text-[#1F3A5F] hover:underline">Entrar</Link>
             <Link to="/cart" className="relative p-2 text-[#4B5563] hover:text-[#1F3A5F]">
               <ShoppingCart size={24} />
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#C62828] rounded-full">
                   {cartCount}
                 </span>
               )}
             </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-20 md:pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-[#4B5563]">
          &copy; 2023 Tractus. Todos os direitos reservados.
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-[#E5E7EB] flex justify-around py-3 z-50">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
          <Home size={24} />
          <span className="text-xs">Início</span>
        </Link>
        <Link to="/store" className={`flex flex-col items-center gap-1 ${isActive('/store')}`}>
          <Store size={24} />
          <span className="text-xs">Vitrine</span>
        </Link>
        <Link to="/orders" className={`flex flex-col items-center gap-1 ${isActive('/orders')}`}>
          <ShoppingBag size={24} />
          <span className="text-xs">Pedidos</span>
        </Link>
         <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}>
          <User size={24} />
          <span className="text-xs">Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

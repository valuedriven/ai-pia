"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ensureCustomerExists } from "@/lib/customer-sync";
import { OrderStatus } from "@/types";
import StatusBadge from "@/components/ui/status-badge";
import { ChevronRight, ShoppingBag, Truck, Search, ArrowRight, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function MyOrdersPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos Status");
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const customerId = await ensureCustomerExists(user);

            if (!customerId) {
                setOrders([]);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('customer_id', customerId)
                .order('date', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error: any) {
            console.error("Error fetching orders:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (isUserLoaded) {
            fetchOrders();
        }
    }, [isUserLoaded, fetchOrders]);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "Todos Status" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <nav className="flex items-center text-sm text-muted-foreground mb-2">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-foreground font-medium">Meus Pedidos</span>
                </nav>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground">
                            Acompanhamento de Pedidos
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Visualize e gerencie o histórico de todas as suas compras.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Pedidos Hoje
                        </p>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{orders.length}</p>
                </div>
                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Em Trânsito
                        </p>
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-400">
                            <Truck className="h-5 w-5" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">
                        {orders.filter(o => o.status === OrderStatus.SHIPPED).length}
                    </p>
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64 group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Search className="h-5 w-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar por ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none bg-background text-foreground transition-all"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
                    >
                        <option>Todos Status</option>
                        {Object.values(OrderStatus).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Pedido</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading || !isUserLoaded ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                            <p className="text-muted-foreground animate-pulse font-medium">Carregando seus pedidos...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : !user ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-muted-foreground font-medium">Você precisa estar logado para ver seus pedidos.</p>
                                            <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                                Fazer Login
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-muted/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 font-black text-foreground group-hover:text-primary transition-colors font-mono">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-medium">
                                            {new Date(order.date).toLocaleDateString('pt-BR')}
                                            <span className="text-[10px] text-muted-foreground/50 block font-normal">
                                                {new Date(order.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-black text-foreground">
                                            R$ {Number(order.total).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/my-orders/${order.id}`}
                                                className="text-primary hover:text-primary-hover font-bold inline-flex items-center gap-1.5 transition-all bg-primary/5 px-4 py-2 rounded-xl"
                                            >
                                                Detalhes
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic bg-muted/5">
                                        Você ainda não possui pedidos registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

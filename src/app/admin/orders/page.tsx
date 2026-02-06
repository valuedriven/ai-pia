"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StatusBadge from "@/components/ui/status-badge";
import { Loader2, Search, Filter, Download, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminOrders() {
    const { showToast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [search, setSearch] = useState("");

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, customer:customers(*)')
                .order('date', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error: any) {
            showToast("Erro ao carregar pedidos: " + error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === "Todos" || order.status === statusFilter;
        const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer?.name.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        Todos: orders.length,
        Pendente: orders.filter(o => o.status === "Pendente").length,
        Pago: orders.filter(o => o.status === "Pago").length,
        Enviado: orders.filter(o => o.status === "Enviado").length,
    };
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Gestão de Pedidos
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Visualize e gerencie todos os pedidos da sua loja.
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar pedido ou cliente..."
                        className="pl-10 pr-4 py-2 bg-surface border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 transition-transform active:scale-95">
                    <Download className="h-4 w-4" />
                    Exportar
                </button>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0">
                        {Object.entries(statusCounts).map(([status, count]) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${statusFilter === status
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "bg-surface border border-input text-muted-foreground hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {status} ({count})
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">ID do Pedido</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                            <p className="text-muted-foreground animate-pulse font-medium">Carregando remessas...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-muted/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 font-bold text-foreground group-hover:text-primary transition-colors font-mono">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(order.date).toLocaleDateString('pt-BR')}{" "}
                                            <span className="text-[10px] text-muted-foreground/60 block uppercase font-medium">
                                                {new Date(order.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-8 w-8 rounded-full ${order.customer?.color || "bg-primary/10 text-primary"} flex items-center justify-center text-[10px] font-black border border-border/50 shadow-sm`}
                                                >
                                                    {order.customer?.initials || "??"}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">
                                                        {order.customer?.name || "Cliente Desconhecido"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                                                        {order.customer?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-foreground">
                                            R$ {Number(order.total).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center text-xs font-bold text-primary hover:text-blue-700 transition-all group/link bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10"
                                            >
                                                Detalhes
                                                <ArrowRight className="h-3 w-3 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic bg-muted/0.5">
                                        Nenhum pedido encontrado nesta categoria.
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

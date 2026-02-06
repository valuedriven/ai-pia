"use client";

import React from "react";
import Link from "next/link";
import { MOCK_ORDERS } from "@/constants";
import StatusBadge from "@/components/ui/status-badge";
import { ChevronRight, ShoppingBag, Truck, Search, ArrowRight } from "lucide-react";

export default function MyOrdersPage() {
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
                    <p className="text-3xl font-bold text-foreground">12</p>
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
                    <p className="text-3xl font-bold text-foreground">2</p>
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                            <Search className="h-5 w-5" />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar por ID..."
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none bg-background text-foreground"
                        />
                    </div>
                    <select className="w-full sm:w-auto px-4 py-2 border border-input rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary outline-none">
                        <option>Todos Status</option>
                        <option>Pendente</option>
                        <option>Pago</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Pedido</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_ORDERS.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        R$ {order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/my-orders/${order.id}`}
                                            className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                                        >
                                            Ver Detalhes
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

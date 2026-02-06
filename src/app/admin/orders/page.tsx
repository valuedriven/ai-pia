"use client";

import React from "react";
import Link from "next/link";
import { MOCK_ORDERS } from "@/constants";
import StatusBadge from "@/components/ui/status-badge";

export default function AdminOrders() {
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
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-surface border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">
                            filter_list
                        </span>
                        Filtros
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">
                            download
                        </span>
                        Exportar
                    </button>
                </div>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0">
                        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold">
                            Todos
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-surface border border-input text-muted-foreground text-xs font-semibold hover:border-primary hover:text-primary">
                            Novos
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-surface border border-input text-muted-foreground text-xs font-semibold hover:border-primary hover:text-primary">
                            Pagos
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-surface border border-input text-muted-foreground text-xs font-semibold hover:border-primary hover:text-primary">
                            Enviados
                        </button>
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
                            {MOCK_ORDERS.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-muted/50 transition-colors group"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {order.date.split(" ")[0]}{" "}
                                        <span className="text-xs text-muted-foreground/70 block">
                                            {order.date.split(" ")[1]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-8 w-8 rounded-full ${order.customer.color} flex items-center justify-center text-xs font-bold`}
                                            >
                                                {order.customer.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {order.customer.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.customer.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-foreground">
                                        R$ {order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                                        >
                                            Detalhes
                                            <span className="material-symbols-outlined text-[16px] ml-1">
                                                arrow_forward
                                            </span>
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

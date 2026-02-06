"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { MOCK_ORDERS } from "@/constants";
import StatusBadge from "@/components/ui/status-badge";

const data = [
    { name: "Seg", value: 4000 },
    { name: "Ter", value: 3000 },
    { name: "Qua", value: 2000 },
    { name: "Qui", value: 2780 },
    { name: "Sex", value: 1890 },
    { name: "Sab", value: 2390 },
    { name: "Dom", value: 3490 },
];

export default function AdminDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
                    <p className="text-muted-foreground text-sm">
                        Acompanhe o desempenho da sua loja em tempo real.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground bg-surface border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">
                            calendar_today
                        </span>
                        Out 2023
                    </span>
                    <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Novo Pedido
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Total de Vendas
                        </h3>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg dark:bg-blue-900/20 dark:text-blue-400">
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">1,240</span>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center dark:bg-green-900/20 dark:text-green-400">
                            <span className="material-symbols-outlined text-[14px] mr-0.5">
                                trending_up
                            </span>
                            +12%
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">vs. mês anterior</p>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Valor Recebido
                        </h3>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg dark:bg-green-900/20 dark:text-green-400">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">R$ 45.200</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Receita líquida confirmada
                    </p>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Valor Pendente
                        </h3>
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-400">
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">R$ 3.150</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Aguardando pagamento
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-border shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6">
                        Receita Semanal
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="var(--border)"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        backgroundColor: "var(--surface)",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground">
                            Últimos Pedidos
                        </h3>
                        <a href="#" className="text-sm text-primary hover:underline">
                            Ver todos
                        </a>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <div className="space-y-4">
                            {MOCK_ORDERS.slice(0, 5).map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors border border-border"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-8 w-8 rounded-full ${order.customer.color} flex items-center justify-center text-xs font-bold`}
                                        >
                                            {order.customer.initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {order.customer.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {order.id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-foreground">
                                            R$ {order.total.toFixed(2)}
                                        </p>
                                        <StatusBadge status={order.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

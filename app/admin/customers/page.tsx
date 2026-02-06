"use client";

import React from "react";
import { MOCK_CUSTOMERS } from "@/constants";

export default function AdminCustomers() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Gestão de Clientes
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie sua base de clientes e históricos.
                    </p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                        person_add
                    </span>
                    Novo Cliente
                </button>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 bg-muted/30">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                            placeholder="Buscar por nome, email..."
                        />
                    </div>
                    <select className="border border-input rounded-lg text-sm py-2 px-3 text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary bg-background">
                        <option>Todos os Clientes</option>
                        <option>Novos</option>
                        <option>Recorrentes</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Endereço</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Telefone</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_CUSTOMERS.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-10 w-10 rounded-full ${customer.color} flex items-center justify-center font-bold text-sm`}
                                            >
                                                {customer.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {customer.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Desde {customer.since}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">
                                        {customer.address}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {customer.phone}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    edit
                                                </span>
                                            </button>
                                            <button className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
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

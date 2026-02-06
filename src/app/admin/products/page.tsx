"use client";

import React from "react";
import { MOCK_PRODUCTS } from "@/constants";

export default function AdminProducts() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Gestão de Produtos
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie seu inventário, preços e estoque.
                    </p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Novo Produto
                </button>
            </div>

            <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between bg-muted/30">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                            placeholder="Buscar produtos..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-2 bg-surface border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">
                                filter_list
                            </span>
                            Filtros
                        </button>
                        <button className="px-3 py-2 bg-surface border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted">
                            <span className="material-symbols-outlined text-[18px]">
                                download
                            </span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Produto</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4">Preço</th>
                                <th className="px-6 py-4">Estoque</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_PRODUCTS.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden border border-border">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    REF: {product.ref}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-muted text-foreground rounded-md">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        R$ {product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            ></div>
                                            <span className="text-muted-foreground">
                                                {product.stock} un.
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-semibold ${product.status === "Ativo"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
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

                <div className="p-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        Mostrando 1-6 de 45 produtos
                    </span>
                    <div className="flex gap-1">
                        <button
                            className="p-2 border border-input rounded-md hover:bg-muted disabled:opacity-50 text-foreground"
                            disabled
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                chevron_left
                            </span>
                        </button>
                        <button className="px-3 py-1 border border-primary bg-primary text-white rounded-md text-sm">
                            1
                        </button>
                        <button className="px-3 py-1 border border-input hover:bg-muted rounded-md text-sm text-foreground">
                            2
                        </button>
                        <button className="p-2 border border-input rounded-md hover:bg-muted text-foreground">
                            <span className="material-symbols-outlined text-[16px]">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

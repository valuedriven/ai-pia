"use client";

import React from "react";
import { MOCK_PRODUCTS } from "@/constants";
import { ChevronDown, Heart, ShoppingCart } from "lucide-react";

export default function ShopHome() {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Catálogo de Produtos
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Explore nossa seleção exclusiva.
                    </p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <button className="px-4 py-2 bg-surface border border-input rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1 text-foreground">
                        Categoria: Todos
                        <ChevronDown className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 bg-surface border border-input rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1 text-foreground">
                        Preço: Menor para Maior
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.filter((p) => p.status === "Ativo").map((product) => (
                    <div
                        key={product.id}
                        className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                    >
                        <div className="relative aspect-square bg-muted overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-surface/90 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                                {product.category}
                            </p>
                            <h3 className="font-bold text-foreground line-clamp-1 mb-3">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-foreground">
                                    R$ {product.price.toFixed(2)}
                                </span>
                                <button className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors shadow-sm">
                                    <ShoppingCart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>© 2024 Tractus. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

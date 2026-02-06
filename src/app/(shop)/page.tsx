"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronDown, Heart, ShoppingCart, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export default function ShopHome() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('status', 'Ativo')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error: any) {
            console.error("Error fetching products:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image || "https://placehold.co/400x400?text=Sem+Imagem",
            quantity: 1
        });
    };

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
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden animate-pulse">
                            <div className="aspect-square bg-muted" />
                            <div className="p-4 space-y-3">
                                <div className="h-3 bg-muted rounded w-1/3" />
                                <div className="h-5 bg-muted rounded w-2/3" />
                                <div className="flex justify-between items-center pt-2">
                                    <div className="h-6 bg-muted rounded w-1/4" />
                                    <div className="h-8 w-8 bg-muted rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative aspect-square bg-muted overflow-hidden">
                                <img
                                    src={product.image || "https://placehold.co/400x400?text=Sem+Imagem"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <button className="absolute top-3 right-3 p-2 bg-surface/90 backdrop-blur-sm rounded-full text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-lg border border-border/50">
                                    <Heart className="h-5 w-5" />
                                </button>
                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Esgotado</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
                                    {product.category}
                                </p>
                                <h3 className="font-bold text-foreground line-clamp-1 mb-3 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-black text-foreground">
                                        R$ {Number(product.price).toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                        className={`h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-hover transition-all shadow-md shadow-primary/20 active:scale-95 disabled:grayscale disabled:opacity-50`}
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground font-medium">Nenhum produto disponível no momento.</p>
                    </div>
                )}
            </div>

            <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                <p>© 2024 Tractus. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

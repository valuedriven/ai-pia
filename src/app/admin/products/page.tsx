"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/toast";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types";
import { X, Loader2 } from "lucide-react";

export default function AdminProducts() {
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error: any) {
            showToast("Erro ao carregar produtos: " + error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOpenModal = (product?: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(false);
    };

    const handleSave = async (data: Partial<Product>) => {
        try {
            if (selectedProduct) {
                const { error } = await supabase
                    .from('products')
                    .update(data)
                    .eq('id', selectedProduct.id);
                if (error) throw error;
                showToast("Produto atualizado com sucesso!");
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([data]);
                if (error) throw error;
                showToast("Produto criado com sucesso!");
            }
            handleCloseModal();
            fetchProducts();
        } catch (error: any) {
            showToast("Erro ao salvar produto: " + error.message, "error");
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Tem certeza que deseja excluir "${product.name}"?`)) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', product.id);
            if (error) throw error;
            showToast("Produto removido com sucesso!");
            fetchProducts();
        } catch (error: any) {
            showToast("Erro ao remover produto: " + error.message, "error");
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.ref?.toLowerCase().includes(search.toLowerCase())
    );

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
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
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
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                            placeholder="Buscar produtos por nome ou referência..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => showToast("Filtros habilitados", "info")}
                            className="px-3 py-2 bg-surface border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                filter_list
                            </span>
                            Filtros
                        </button>
                        <button
                            onClick={() => showToast("Exportando dados...", "info")}
                            className="px-3 py-2 bg-surface border border-input rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                            <p className="text-muted-foreground animate-pulse font-medium">Carregando catálogo...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-muted/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden border border-border group-hover:border-primary/50 transition-colors shadow-sm">
                                                    <img
                                                        src={product.image || "https://placehold.co/400x400?text=Sem+Imagem"}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                                        REF: {product.ref || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary rounded-md border border-primary/10">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-black text-foreground">
                                            R$ {Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2 w-2 rounded-full shadow-sm ${product.stock > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"
                                                        }`}
                                                ></div>
                                                <span className="text-muted-foreground font-medium">
                                                    {product.stock} un.
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight rounded-full border shadow-sm ${product.status === "Ativo"
                                                    ? "bg-feedback-success text-feedback-success-text border-feedback-success/20"
                                                    : "bg-feedback-error/10 text-feedback-error-text border-feedback-error/20"
                                                    }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                                    title="Editar"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Excluir"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic bg-muted/5">
                                        Nenhum produto encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        Mostrando {filteredProducts.length} de {products.length} produtos
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

            {/* Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    <div
                        className="fixed inset-0 bg-background/40 backdrop-blur-md animate-in fade-in duration-300 ease-out"
                        onClick={handleCloseModal}
                    />
                    <div className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-xl border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
                        {/* Decorative background element */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                        <div className="flex items-center justify-between px-8 py-6 border-b border-border/50">
                            <div>
                                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    {selectedProduct ? (
                                        <span className="material-symbols-outlined text-primary">edit</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-primary">add_circle</span>
                                    )}
                                    {selectedProduct ? "Editar Produto" : "Novo Produto"}
                                </h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Preencha as informações para {selectedProduct ? "atualizar o" : "cadastrar um novo"} catálogo.
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all duration-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <ProductForm
                                product={selectedProduct}
                                onSave={handleSave}
                                onCancel={handleCloseModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

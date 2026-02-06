"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import {
    X,
    Upload,
    Save,
    AlertCircle,
    Tag,
    DollarSign,
    Layers,
    Hash,
    Activity,
    Package as BoxIcon,
    Image as ImageIcon,
    ChevronDown
} from "lucide-react";

interface ProductFormProps {
    product?: Partial<Product>;
    onSave: (data: Partial<Product>) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: "",
            category: "",
            price: 0,
            stock: 0,
            image: "",
            ref: "",
            status: "Ativo"
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [imageError, setImageError] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Nome é obrigatório";
        if (!formData.category) newErrors.category = "Categoria é obrigatória";
        if (!formData.price || formData.price <= 0) newErrors.price = "Preço deve ser maior que zero";
        if (formData.stock === undefined || formData.stock < 0) newErrors.stock = "Estoque inválido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    const inputClasses = (hasError?: boolean) => `
        w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl 
        focus:ring-2 focus:ring-primary/20 focus:border-primary 
        outline-none transition-all duration-200 
        ${hasError ? 'border-destructive bg-destructive/5' : 'border-border hover:border-muted-foreground/30'}
    `;

    const labelClasses = "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block ml-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Name */}
                <div className="space-y-1">
                    <label className={labelClasses}>Nome do Produto</label>
                    <div className="relative group">
                        <BoxIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            className={inputClasses(!!errors.name)}
                            placeholder="Ex: Kit Sabonetes Artesanais"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="h-3 w-3" /> {errors.name}
                        </p>
                    )}
                </div>

                {/* Reference (SKU) */}
                <div className="space-y-1">
                    <label className={labelClasses}>Referência (SKU)</label>
                    <div className="relative group">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            className={inputClasses()}
                            placeholder="Ex: HB-001"
                            value={formData.ref}
                            onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                    <label className={labelClasses}>Categoria</label>
                    <div className="relative group">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select
                            className={`${inputClasses(!!errors.category)} appearance-none cursor-pointer`}
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="Higiene & Bem-estar">Higiene & Bem-estar</option>
                            <option value="Decoração">Decoração</option>
                            <option value="Jardinagem">Jardinagem</option>
                            <option value="Papelaria">Papelaria</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.category && (
                        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="h-3 w-3" /> {errors.category}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div className="space-y-1">
                    <label className={labelClasses}>Status do Produto</label>
                    <div className="relative group">
                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select
                            className={`${inputClasses()} appearance-none cursor-pointer`}
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-1">
                    <label className={labelClasses}>Preço Base (R$)</label>
                    <div className="relative group">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="number"
                            step="0.01"
                            className={inputClasses(!!errors.price)}
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                    </div>
                    {errors.price && (
                        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="h-3 w-3" /> {errors.price}
                        </p>
                    )}
                </div>

                {/* Stock */}
                <div className="space-y-1">
                    <label className={labelClasses}>Estoque Disponível</label>
                    <div className="relative group">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="number"
                            className={inputClasses(!!errors.stock)}
                            placeholder="0"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                        />
                    </div>
                    {errors.stock && (
                        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="h-3 w-3" /> {errors.stock}
                        </p>
                    )}
                </div>
            </div>

            {/* Image URL & Preview Section */}
            <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 space-y-4">
                <div className="space-y-1">
                    <label className={labelClasses}>Mídia do Produto (URL)</label>
                    <div className="flex gap-4 items-start">
                        <div className="relative flex-1 group">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                className={inputClasses(imageError)}
                                placeholder="https://exemplo.com/imagem.jpg (use o endereço da imagem)"
                                value={formData.image}
                                onChange={(e) => {
                                    setFormData({ ...formData, image: e.target.value });
                                    setImageError(false);
                                }}
                            />
                            {imageError && (
                                <p className="text-[10px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                                    <AlertCircle className="h-3 w-3" />
                                    A URL não parece ser de uma imagem válida. Use o link direto (ex: .jpg, .png).
                                </p>
                            )}
                        </div>
                        {formData.image && (
                            <div className={`h-[46px] w-[46px] rounded-xl overflow-hidden border-2 shadow-md transform hover:scale-110 transition-all duration-200 flex items-center justify-center bg-muted/50 ${imageError ? 'border-destructive/50' : 'border-primary/20'}`}>
                                {imageError ? (
                                    <ImageIcon className="h-5 w-5 text-destructive/50" />
                                ) : (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={() => setImageError(true)}
                                        onLoad={() => setImageError(false)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight italic">
                    * Todos os campos são editáveis em tempo real
                </p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all duration-200"
                    >
                        <Save className="h-4 w-4" />
                        Salvar Produto
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;

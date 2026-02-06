"use client";

import React, { useState } from "react";
import { Customer } from "@/types";
import {
    X,
    Save,
    AlertCircle,
    Mail,
    Phone,
    MapPin,
    User,
    Palette,
    Check
} from "lucide-react";

interface CustomerFormProps {
    customer?: Partial<Customer>;
    onSave: (data: Partial<Customer>) => void;
    onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Customer>>(
        customer || {
            name: "",
            email: "",
            phone: "",
            address: "",
            initials: "",
            color: "bg-blue-100 text-blue-700"
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Nome é obrigatório";
        if (!formData.email) newErrors.email = "Email é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const initials = formData.name
                ? formData.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
                : "??";
            onSave({ ...formData, initials });
        }
    };

    const inputClasses = (hasError?: boolean) => `
        w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl 
        focus:ring-2 focus:ring-primary/20 focus:border-primary 
        outline-none transition-all duration-200 
        ${hasError ? 'border-destructive bg-destructive/5' : 'border-border hover:border-muted-foreground/30'}
    `;

    const labelClasses = "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block ml-1";

    const colorOptions = [
        { name: "Blue", class: "bg-blue-100 text-blue-700", ring: "ring-blue-400" },
        { name: "Purple", class: "bg-purple-100 text-purple-700", ring: "ring-purple-400" },
        { name: "Orange", class: "bg-orange-100 text-orange-700", ring: "ring-orange-400" },
        { name: "Green", class: "bg-green-100 text-green-700", ring: "ring-green-400" },
        { name: "Pink", class: "bg-pink-100 text-pink-700", ring: "ring-pink-400" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-1">
                    <label className={labelClasses}>Nome Completo</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            className={inputClasses(!!errors.name)}
                            placeholder="Ex: Maria Silva"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                className={inputClasses(!!errors.email)}
                                placeholder="usuario@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-[11px] text-destructive mt-1 flex items-center gap-1 font-medium animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="h-3 w-3" /> {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Telefone</label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                className={inputClasses()}
                                placeholder="(00) 00000-0000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                    <label className={labelClasses}>Endereço Completo</label>
                    <div className="relative group">
                        <MapPin className="absolute left-3 top-4 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <textarea
                            rows={3}
                            className={`${inputClasses()} pl-10 resize-none min-h-[100px]`}
                            placeholder="Rua, Número, Bairro, Cidade - UF"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                </div>

                {/* Profile Color Selection */}
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <label className={labelClasses + " mb-0"}>Tema do Perfil</label>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {colorOptions.map((option) => (
                            <button
                                key={option.class}
                                type="button"
                                onClick={() => setFormData({ ...formData, color: option.class })}
                                className={`
                                    relative h-10 w-10 rounded-xl transition-all duration-300
                                    ${option.class.split(" ")[0]}
                                    ${formData.color === option.class
                                        ? `ring-4 ${option.ring} scale-110 shadow-lg z-10`
                                        : 'hover:scale-105 opacity-70 hover:opacity-100'}
                                `}
                            >
                                {formData.color === option.class && (
                                    <Check className={`absolute inset-0 m-auto h-5 w-5 ${option.class.split(" ")[1]}`} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                    Avatar será gerado automaticamente
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
                        Salvar Cliente
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CustomerForm;

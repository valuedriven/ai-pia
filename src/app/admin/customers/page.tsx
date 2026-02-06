"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/toast";
import CustomerForm from "@/components/admin/CustomerForm";
import { Customer } from "@/types";
import { X, Search, Loader2 } from "lucide-react";

export default function AdminCustomers() {
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchCustomers = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
        } catch (error: any) {
            showToast("Erro ao carregar clientes: " + error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleOpenModal = (customer?: Customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCustomer(undefined);
        setIsModalOpen(false);
    };

    const handleSave = async (data: Partial<Customer>) => {
        try {
            if (selectedCustomer) {
                const { error } = await supabase
                    .from('customers')
                    .update(data)
                    .eq('id', selectedCustomer.id);
                if (error) throw error;
                showToast("Cliente atualizado com sucesso!");
            } else {
                const { error } = await supabase
                    .from('customers')
                    .insert([data]);
                if (error) throw error;
                showToast("Cliente cadastrado com sucesso!");
            }
            handleCloseModal();
            fetchCustomers();
        } catch (error: any) {
            showToast("Erro ao salvar cliente: " + error.message, "error");
        }
    };

    const handleDelete = async (customer: Customer) => {
        if (!confirm(`Tem certeza que deseja excluir "${customer.name}"?`)) return;

        try {
            const { error } = await supabase
                .from('customers')
                .delete()
                .eq('id', customer.id);
            if (error) throw error;
            showToast("Cliente removido com sucesso!");
            fetchCustomers();
        } catch (error: any) {
            showToast("Erro ao remover cliente: " + error.message, "error");
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 text-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestão de Clientes
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Gerencie sua base de clientes e históricos.
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
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
                            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                            placeholder="Buscar por nome, email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="border border-input rounded-lg text-sm py-2 px-3 text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary bg-background">
                        <option>Todos os Clientes</option>
                        <option>Novos</option>
                        <option>Recorrentes</option>
                    </select>
                </div>

                <div className="overflow-x-auto text-foreground">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border font-bold">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Endereço</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Telefone</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                            <p className="text-muted-foreground animate-pulse font-medium">Carregando base de clientes...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-muted/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-10 w-10 rounded-full ${customer.color || 'bg-primary/10 text-primary'} flex items-center justify-center font-bold text-sm shadow-sm border border-border/50 group-hover:border-primary/30 transition-colors`}
                                                >
                                                    {customer.initials || customer.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                                                        Cliente desde {new Date(customer.created_at || Date.now()).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground max-w-xs truncate font-medium">
                                            {customer.address}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-medium">
                                            {customer.email}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-medium">
                                            {customer.phone}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(customer)}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                                    title="Editar"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(customer)}
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
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic bg-muted/5">
                                        Nenhum cliente encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                                    {selectedCustomer ? (
                                        <span className="material-symbols-outlined text-primary">edit</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-primary">person_add</span>
                                    )}
                                    {selectedCustomer ? "Editar Cliente" : "Novo Cliente"}
                                </h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {selectedCustomer ? "Atualize as informações de contato e endereço." : "Cadastre um novo cliente na sua base de dados."}
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
                            <CustomerForm
                                customer={selectedCustomer}
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

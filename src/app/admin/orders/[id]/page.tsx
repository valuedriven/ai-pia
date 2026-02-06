"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StatusBadge from "@/components/ui/status-badge";
import { ChevronLeft, Printer, Edit3, Loader2, ShoppingCart, MapPin, Calendar, User } from "lucide-react";

export default function AdminOrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrderDetails = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    customer:customers(*),
                    items:order_items(
                        *,
                        product:products(*)
                    )
                `)
                .eq('id', id)
                .single();

            if (error) throw error;
            setOrder(data);
        } catch (error: any) {
            console.error("Error fetching order details:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-muted-foreground font-bold animate-pulse">Obtendo detalhes da transação...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-8 max-w-7xl mx-auto text-center">
                <h1 className="text-2xl font-bold">Pedido não encontrado</h1>
                <Link href="/admin/orders" className="text-primary hover:underline mt-4 inline-block">
                    Voltar para pedidos
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <nav className="flex items-center text-sm font-medium text-muted-foreground">
                <Link href="/admin/dashboard" className="hover:text-primary transition-colors">
                    Admin
                </Link>
                <span className="mx-2 text-border">/</span>
                <Link href="/admin/orders" className="hover:text-primary transition-colors">
                    Pedidos
                </Link>
                <span className="mx-2 text-border">/</span>
                <span className="text-foreground">Detalhe #{order.id}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <Link href="/admin/orders" className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground hover:text-primary transition-all shadow-sm">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-3xl font-black text-foreground tracking-tight">
                            Pedido <span className="text-primary">#{order.id}</span>
                        </h1>
                        <StatusBadge status={order.status} />
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2 font-medium px-14">
                        <Calendar className="h-4 w-4" />
                        Realizado em {new Date(order.date).toLocaleDateString('pt-BR')} às {new Date(order.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-border bg-surface rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-all shadow-sm active:scale-95">
                        <Printer className="h-4 w-4" />
                        Imprimir DACTE
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-black hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
                        <Edit3 className="h-4 w-4" />
                        Atualizar Status
                    </button>
                </div>
            </div>

            {/* Reuse structure from Customer View but maybe additional Admin Controls later */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-primary" />
                                Itens do Pedido
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {order.items?.reduce((acc: number, i: any) => acc + (i.quantity || 0), 0)} itens
                            </span>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/30 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Produto</th>
                                    <th className="px-6 py-3 font-medium text-right">
                                        Preço Un.
                                    </th>
                                    <th className="px-6 py-3 font-medium text-center">Qtd</th>
                                    <th className="px-6 py-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {order.items?.map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-xl bg-muted border border-border overflow-hidden shadow-sm">
                                                    <img
                                                        src={item.product?.image || "https://placehold.co/400x400?text=Sem+Imagem"}
                                                        alt={item.product?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {item.product?.name || "Produto Removido"}
                                                    </p>
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 w-fit px-1.5 py-0.5 rounded mt-1">
                                                        SKU: {item.product?.ref || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-medium text-muted-foreground">
                                            R$ {Number(item.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-5 text-center font-bold text-foreground">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-5 text-right font-black text-foreground">
                                            R$ {(Number(item.price) * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-muted/30 px-6 py-4 border-t border-border">
                            <div className="ml-auto w-full max-w-xs space-y-2">
                                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="text-foreground">
                                        R$ {Number(order.total).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Frete (Taxa de Entrega)</span>
                                    <span className="text-foreground">
                                        R$ 15,00
                                    </span>
                                </div>
                                <div className="border-t border-border pt-3 flex justify-between text-xl font-black text-foreground">
                                    <span className="text-primary">Total</span>
                                    <span className="bg-primary/5 px-2 rounded-lg leading-relaxed">R$ {(Number(order.total) + 15).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
                        <h2 className="text-lg font-black text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Informações do Cliente
                        </h2>
                        <div className="flex gap-4 mb-4 bg-muted/20 p-4 rounded-xl border border-border/50">
                            <div className={`h-12 w-12 rounded-full ${order.customer?.color || "bg-primary/10 text-primary"} flex items-center justify-center font-black text-lg shadow-sm border border-border/50`}>
                                {order.customer?.initials || "??"}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="font-black text-foreground">{order.customer?.name}</div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.customer?.email}</div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.customer?.phone}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
                        <h2 className="text-lg font-black text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Endereço de Entrega
                        </h2>
                        <div className="flex gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
                            <div>
                                <p className="text-sm text-foreground leading-relaxed font-bold">
                                    {order.customer?.address || "Endereço não informado"}
                                </p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                                    Verificado via sistema
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button className="w-full py-3 bg-surface border border-border rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted hover:text-primary transition-all flex items-center justify-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Rastrear no Mapa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

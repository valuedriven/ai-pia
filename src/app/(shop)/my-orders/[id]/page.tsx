"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import StatusBadge from "@/components/ui/status-badge";
import { Calendar, Printer, ShoppingCart, Truck, Check, Package, MapPin, Loader2, ChevronLeft, ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { user, isLoaded: isUserLoaded } = useUser();
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
        if (isUserLoaded) {
            fetchOrderDetails();
        }
    }, [isUserLoaded, fetchOrderDetails]);

    if (isLoading || !isUserLoaded) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-muted-foreground font-medium animate-pulse">Carregando detalhes do pedido...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto p-20 text-center">
                <h1 className="text-2xl font-black mb-4">Pedido não localizado</h1>
                <p className="text-muted-foreground mb-8">Não conseguimos encontrar as informações deste pedido no momento.</p>
                <Link href="/my-orders" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Meus Pedidos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <nav className="mb-6 flex items-center text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                    Loja
                </Link>
                <span className="mx-2 text-border">/</span>
                <Link href="/my-orders" className="hover:text-primary transition-colors">
                    Meus Pedidos
                </Link>
                <span className="mx-2 text-border">/</span>
                <span className="text-foreground">Detalhe do Pedido</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <Link href="/my-orders" className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface border border-border text-muted-foreground hover:text-primary transition-all shadow-sm">
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
                    <button className="flex items-center gap-2 px-4 py-2 border border-border bg-surface rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-all shadow-sm active:scale-95">
                        <Printer className="h-5 w-5" />
                        Imprimir
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-black hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95">
                        Pedir Novamente
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Order Items */}
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                                <ShoppingCart className="text-primary h-6 w-6" />
                                Itens do Pedido
                            </h2>
                            <span className="text-sm font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                {order.items?.reduce((acc: number, i: any) => acc + (i.quantity || 0), 0)} unidades
                            </span>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/30 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                                    <th className="px-6 py-3 font-bold uppercase tracking-wider text-[10px] text-right">
                                        Preço Un.
                                    </th>
                                    <th className="px-6 py-3 font-bold uppercase tracking-wider text-[10px] text-center">Qtd</th>
                                    <th className="px-6 py-3 font-bold uppercase tracking-wider text-[10px] text-right">Total</th>
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
                                                    <p className="font-bold text-foreground">
                                                        {item.product?.name || "Produto Removido"}
                                                    </p>
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">
                                                        REF: {item.product?.ref || "N/A"}
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
                                    <span className="text-foreground font-bold">
                                        R$ {Number(order.total).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Frete</span>
                                    <span className="text-foreground font-bold">
                                        R$ 15,00
                                    </span>
                                </div>
                                <div className="border-t border-border pt-4 flex justify-between text-xl font-black text-foreground">
                                    <span className="text-primary">Total Pago</span>
                                    <span className="bg-primary/5 px-3 rounded-lg leading-relaxed">R$ {(Number(order.total) + 15).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden p-6">
                        <h2 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                            <Truck className="text-primary h-6 w-6" />
                            Rastreamento do Pedido
                        </h2>
                        <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 pb-4">
                            <div className="ml-6 relative">
                                <span className="absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-lg shadow-primary/20">
                                    <Check className="text-white h-4 w-4" />
                                </span>
                                <h3 className="text-sm font-black text-foreground">
                                    Pedido Confirmado
                                </h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">
                                    {new Date(order.date).toLocaleDateString('pt-BR')} - Processado
                                </p>
                            </div>
                            <div className="ml-6 relative">
                                <span className="absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full bg-muted border-2 border-border ring-4 ring-background">
                                    <Package className="text-muted-foreground h-4 w-4" />
                                </span>
                                <h3 className="text-sm font-black text-muted-foreground">
                                    Em separação no estoque
                                </h3>
                                <p className="text-[10px] font-bold text-muted-foreground/50 uppercase">
                                    Aguardando processamento logístico...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
                        <h2 className="text-lg font-black text-foreground mb-4 border-b border-border pb-4 flex items-center gap-2">
                            <MapPin className="text-primary h-5 w-5" />
                            Endereço de Entrega
                        </h2>
                        <div className="flex gap-4 bg-muted/20 p-4 rounded-xl border border-border/50 transition-all hover:bg-muted/30">
                            <div>
                                <p className="text-sm text-foreground leading-relaxed font-bold">
                                    Entrega no endereço de cadastro
                                </p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase mt-2 tracking-widest opacity-60">
                                    Verificado via sistema
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">
                                Método de Envio
                            </p>
                            <p className="text-sm font-black text-foreground">
                                Transportadora Local (Expresso)
                            </p>
                        </div>
                        <button className="w-full mt-6 py-4 bg-muted/30 hover:bg-muted/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all">
                            Alterar Endereço de Entrega
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

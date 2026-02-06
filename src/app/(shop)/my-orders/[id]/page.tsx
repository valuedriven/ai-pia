"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_ORDERS } from "@/constants";
import StatusBadge from "@/components/ui/status-badge";
import { Calendar, Printer, ShoppingCart, Truck, Check, Package, MapPin } from "lucide-react";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    // Fallback to first order if ID not found for demo purposes
    const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];

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
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-3xl font-black text-foreground">
                            Pedido #{order.id}
                        </h1>
                        <StatusBadge status={order.status} />
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-[18px] w-[18px]" />
                        Realizado em {order.date}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                        <Printer className="h-5 w-5" />
                        Imprimir
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover shadow-sm transition-colors">
                        Pedir Novamente
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Order Items */}
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <ShoppingCart className="text-primary h-6 w-6" />
                                Itens do Pedido
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {order.items.reduce((acc, i) => acc + i.quantity, 0)} itens
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
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-muted border border-border overflow-hidden">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Ref: {item.product.ref}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-muted-foreground">
                                            R$ {item.product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-center text-foreground">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-foreground">
                                            R$ {(item.product.price * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-muted/30 px-6 py-4 border-t border-border">
                            <div className="ml-auto w-full max-w-xs space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-foreground">
                                        R$ {order.total.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Frete</span>
                                    <span className="font-medium text-foreground">
                                        R$ 15,00
                                    </span>
                                </div>
                                <div className="border-t border-border pt-2 flex justify-between text-base font-bold text-foreground">
                                    <span>Total</span>
                                    <span>R$ {(order.total + 15).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden p-6">
                        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                            <Truck className="text-muted-foreground h-6 w-6" />
                            Rastreamento
                        </h2>
                        <div className="relative border-l border-border ml-3 space-y-8">
                            <div className="ml-6 relative">
                                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-surface">
                                    <Check className="text-white h-3.5 w-3.5" />
                                </span>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Pedido Criado
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    24 out, 2023 - 14:30
                                </p>
                            </div>
                            <div className="ml-6 relative">
                                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-4 ring-surface">
                                    <Package className="text-muted-foreground h-3.5 w-3.5" />
                                </span>
                                <h3 className="text-sm font-semibold text-muted-foreground">
                                    Em separação
                                </h3>
                                <p className="text-xs text-muted-foreground/70">
                                    Aguardando...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
                        <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-4">
                            Endereço de Entrega
                        </h2>
                        <div className="flex gap-3">
                            <MapPin className="text-muted-foreground h-6 w-6" />
                            <div>
                                <p className="text-sm text-foreground leading-relaxed">
                                    Rua das Flores, 123, Apt 45
                                    <br />
                                    Jardim Paulista
                                    <br />
                                    São Paulo - SP
                                    <br />
                                    CEP 01402-000
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                                Método
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                Sedex (Expresso)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

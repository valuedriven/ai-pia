"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowLeft, Trash2, Lock, Tag, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ensureCustomerExists } from "@/lib/customer-sync";
import { supabase } from "@/lib/supabase";

export default function CartPage() {
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const [isConfirming, setIsConfirming] = useState(false);

    const subtotal = totalAmount;
    const shipping = cartItems.length > 0 ? 25.0 : 0;
    const total = subtotal + shipping;

    const handleConfirmOrder = async () => {
        if (cartItems.length === 0) return;

        if (!isSignedIn || !user) {
            router.push("/login?redirect_url=/cart");
            return;
        }

        setIsConfirming(true);
        try {
            // 1. Ensure customer exists in Supabase
            const customerId = await ensureCustomerExists(user);

            if (!customerId) {
                throw new Error("Não foi possível validar seu cadastro de cliente.");
            }

            console.log("Customer validated/created with ID:", customerId);

            // 2. Here we would normally create the order in Supabase
            // For now, we simulate the logic as requested to allow "efetivar a compra"
            // through a valid customer record.

            await new Promise((resolve) => setTimeout(resolve, 1500));

            clearCart();
            setIsConfirming(false);
            router.push("/my-orders");
        } catch (error: any) {
            console.error("Erro ao processar pedido:", error.message);
            alert("Erro ao processar seu pedido. Por favor, tente novamente.");
            setIsConfirming(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-2 mb-8">
                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 mb-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Loja
                </Link>
                <h1 className="text-3xl font-black text-foreground">Meu Carrinho</h1>
                <p className="text-muted-foreground">
                    Revise os itens selecionados antes de finalizar sua compra.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 bg-surface rounded-xl border border-border shadow-sm overflow-hidden h-fit">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Produto</th>
                                    <th className="px-6 py-4">Detalhes</th>
                                    <th className="px-6 py-4">Preço Unit.</th>
                                    <th className="px-6 py-4">Qtd.</th>
                                    <th className="px-6 py-4">Subtotal</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {cartItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden border border-border">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Variante: {item.variant}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            R$ {item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center h-8 w-24 rounded-lg border border-input bg-surface">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-full flex items-center justify-center text-muted-foreground hover:bg-muted rounded-l-lg transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="flex-1 text-center text-sm font-medium text-foreground">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-full flex items-center justify-center text-muted-foreground hover:bg-muted rounded-r-lg transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-foreground text-sm">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-md transition-colors"
                                            >
                                                <Trash2 className="h-[18px] w-[18px]" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-border lg:hidden">
                        <p className="text-center text-xs text-muted-foreground">
                            Arraste para o lado para ver mais
                        </p>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[360px] flex flex-col gap-6">
                    <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
                        <h3 className="text-lg font-bold text-foreground mb-6">
                            Resumo do Pedido
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}{" "}
                                    itens)
                                </span>
                                <span className="font-medium text-foreground">
                                    R$ {subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Frete Estimado</span>
                                <span className="font-medium text-foreground">
                                    R$ {shipping.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Desconto</span>
                                <span className="font-medium text-primary">- R$ 0,00</span>
                            </div>
                            <div className="border-t border-border pt-4 mt-4">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-foreground">Total</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-black text-foreground tracking-tight">
                                            R$ {total.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            em até 3x sem juros
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            disabled={cartItems.length === 0 || isConfirming}
                            className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isConfirming ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Processando...
                                </>
                            ) : (
                                "Confirmar Pedido"
                            )}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Lock className="h-3.5 w-3.5" />
                            Compra 100% segura
                        </div>
                    </div>

                    <div className="bg-surface rounded-xl border border-border shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
                            <Tag className="h-[18px] w-[18px]" />
                            Cupom de Desconto
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Digite seu código"
                                className="flex-1 bg-muted border border-input rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none text-foreground placeholder-muted-foreground"
                            />
                            <button className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

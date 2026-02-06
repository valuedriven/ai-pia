"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Mail, Lock, ArrowRight, Store } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        // Simulate login logic
        router.push("/admin/dashboard");
    };

    const handleCustomerLogin = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl overflow-hidden border border-border">
                <div className="bg-primary p-8 text-center flex flex-col items-center">
                    <div className="bg-white p-3 rounded-2xl mb-4 shadow-lg">
                        <Logo className="h-10" showText={false} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Bem-vindo de volta</h2>
                    <p className="text-blue-100 mt-2 text-sm">
                        Gerencie seus pedidos em um só lugar.
                    </p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                E-mail
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-foreground">
                                    Senha
                                </label>
                                <a
                                    href="#"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                                    <Lock className="h-5 w-5" />
                                </span>
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-foreground"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            Entrar como Admin
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-muted-foreground">
                                    Ou
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            <button
                                onClick={handleCustomerLogin}
                                className="w-full inline-flex justify-center py-2.5 px-4 border border-input rounded-lg shadow-sm bg-surface text-sm font-medium text-foreground hover:bg-muted transition-colors"
                            >
                                <Store className="h-5 w-5 mr-2 text-muted-foreground" />
                                Acessar Loja (Cliente)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 bg-muted border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        © 2024 Tractus. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}

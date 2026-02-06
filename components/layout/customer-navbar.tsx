"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Search, ShoppingCart, LogIn } from "lucide-react";

const CustomerNavbar: React.FC = () => {
    const pathname = usePathname();

    const getNavLinkClass = (path: string) => {
        const isActive = pathname.startsWith(path);
        return `text-sm font-medium ${isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
            }`;
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Logo className="h-8" />
                        </Link>

                        <nav className="hidden md:flex gap-6">
                            <Link href="/" className={getNavLinkClass("/")}>
                                Loja
                            </Link>
                            <Link
                                href="/my-orders"
                                className={getNavLinkClass("/my-orders")}
                            >
                                Meus Pedidos
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                                <Search className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="pl-10 pr-4 py-1.5 border-none bg-muted rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        <Link
                            href="/cart"
                            className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                        </Link>

                        <div className="h-6 w-px bg-border mx-2"></div>

                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Entrar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CustomerNavbar;

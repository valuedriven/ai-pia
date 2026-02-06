"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Search, ShoppingCart, LogIn } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

const CustomerNavbar: React.FC = () => {
    const pathname = usePathname();
    const { itemCount } = useCart();

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
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center border-2 border-surface">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <div className="h-6 w-px bg-border mx-2"></div>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                                    <LogIn className="h-5 w-5" />
                                    <span>Entrar</span>
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CustomerNavbar;

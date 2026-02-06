"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from "lucide-react";

const AdminSidebar: React.FC = () => {
    const pathname = usePathname();

    const getLinkClass = (path: string) => {
        const isActive = pathname.startsWith(path);
        return `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`;
    };

    return (
        <aside className="hidden w-64 flex-col border-r border-border bg-surface md:flex h-full">
            <div className="flex h-16 items-center px-6 border-b border-border">
                <Link href="/admin/dashboard" className="hover:opacity-90 transition-opacity">
                    <Logo className="h-8" />
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                <Link href="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <Link href="/admin/products" className={getLinkClass("/admin/products")}>
                    <Package className="h-5 w-5" />
                    <span className="text-sm font-medium">Produtos</span>
                </Link>
                <Link href="/admin/orders" className={getLinkClass("/admin/orders")}>
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-sm font-medium">Pedidos</span>
                </Link>
                <Link href="/admin/customers" className={getLinkClass("/admin/customers")}>
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-medium">Clientes</span>
                </Link>

                <div className="my-4 border-t border-border"></div>

                <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Sair</span>
                </Link>
            </nav>

            <div className="border-t border-border p-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://picsum.photos/id/64/100/100"
                        alt="Admin"
                        className="h-9 w-9 rounded-full object-cover border border-border"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                            Ricardo Silva
                        </span>
                        <span className="text-xs text-muted-foreground">Loja Principal</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;

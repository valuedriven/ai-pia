"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command, Search, ShoppingBag, Users, Package, LayoutDashboard, Plus } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { showToast } = useToast();

    const commands = [
        { id: "dash", label: "Dashboard", icon: LayoutDashboard, action: () => router.push("/admin/dashboard") },
        { id: "prod", label: "Produtos", icon: Package, action: () => router.push("/admin/products") },
        { id: "ord", label: "Pedidos", icon: ShoppingBag, action: () => router.push("/admin/orders") },
        { id: "cust", label: "Clientes", icon: Users, action: () => router.push("/admin/customers") },
        { id: "new-prod", label: "Novo Produto", icon: Plus, action: () => showToast("Funcionalidade de Novo Produto em breve!", "info") },
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center px-4 border-b border-border">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Pesquisar comandos..."
                        className="flex-1 px-4 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">ESC</span>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto p-2">
                    {filteredCommands.length > 0 ? (
                        <div className="space-y-1">
                            <p className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Comandos Sugeridos
                            </p>
                            {filteredCommands.map((cmd) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => {
                                        cmd.action();
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted text-left transition-colors group"
                                >
                                    <cmd.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                    <span className="flex-1 text-sm font-medium text-foreground">
                                        {cmd.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-muted-foreground">
                            Nenhum comando encontrado para "{search}"
                        </div>
                    )}
                </div>

                <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-medium shadow-sm">Enter</kbd>
                            <span className="text-[10px] text-muted-foreground">Executar</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-[10px] font-medium shadow-sm">↑↓</kbd>
                            <span className="text-[10px] text-muted-foreground">Navegar</span>
                        </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Admin Command Center</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;

"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import { Loader2, Menu, X } from "lucide-react";
import { ToastProvider } from "@/components/ui/toast";
import CommandPalette from "@/components/admin/CommandPalette";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            const role = (user?.publicMetadata?.role as string)?.toLowerCase();
            if (!isSignedIn || role !== "admin") {
                console.log("Access denied: role is", role);
                router.push("/");
            }
        }
    }, [isLoaded, isSignedIn, user, router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsPaletteOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const role = (user?.publicMetadata?.role as string)?.toLowerCase();

    if (!isLoaded || !isSignedIn || role !== "admin") {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">
                        Verificando permissões...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ToastProvider>
            <div className="flex h-screen bg-background overflow-hidden relative">
                {/* Background Pattern Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-soft-light">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-background/40 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Container */}
                <div className={`
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    fixed inset-y-0 left-0 z-50 w-64 bg-surface/80 backdrop-blur-xl 
                    border-r border-border/50 shadow-xl transition-transform duration-300 ease-in-out 
                    md:relative md:translate-x-0
                `}>
                    <AdminSidebar />
                    {/* Close button for mobile */}
                    <button
                        className="absolute top-6 right-4 p-2.5 text-muted-foreground hover:text-foreground md:hidden bg-muted rounded-xl"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col min-w-0 z-10 relative">
                    {/* Mobile Header */}
                    <header className="flex h-16 items-center px-6 border-b border-border/50 bg-surface/80 backdrop-blur-md md:hidden shrink-0">
                        <button
                            className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="ml-4 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/20" />
                            <span className="font-bold text-sm tracking-tight">Painel Admin</span>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto bg-transparent text-foreground p-6 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}

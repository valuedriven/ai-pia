import React from "react";
import CustomerNavbar from "@/components/layout/customer-navbar";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <CustomerNavbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
        </div>
    );
}

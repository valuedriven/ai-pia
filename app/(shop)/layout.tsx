import React from "react";
import CustomerNavbar from "@/components/layout/customer-navbar";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <CustomerNavbar />
            <main>{children}</main>
        </div>
    );
}

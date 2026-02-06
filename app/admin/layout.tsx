import AdminSidebar from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 overflow-auto bg-background text-foreground">
                {children}
            </div>
        </div>
    );
}

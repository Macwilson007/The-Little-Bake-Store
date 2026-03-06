import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
    title: 'Admin Dashboard | The Little Bake Store',
    description: 'Secure admin interface for The Little Bake Store',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout" suppressHydrationWarning style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}

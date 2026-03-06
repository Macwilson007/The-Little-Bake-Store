'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Orders', href: '/admin/orders' },
        { label: 'Customers', href: '/admin/customers' },
        { label: 'Analytics', href: '/admin/analytics' },
        { label: 'Content', href: '/admin/content' },
    ];

    return (
        <aside className="admin-sidebar" style={{ width: '250px', background: '#3A1F1D', color: '#fff', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'Playfair Display' }}>Little Bake Store</h2>
                <span style={{ fontSize: '0.8rem', color: '#D6A36D' }}>Admin Portal</span>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            background: pathname === item.href ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: pathname === item.href ? '#fff' : 'rgba(255,255,255,0.7)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(255,50,50,0.1)',
                        color: '#ff6b6b',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.1)'}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

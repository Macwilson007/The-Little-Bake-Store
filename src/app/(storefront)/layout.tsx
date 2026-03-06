import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import BakeBot from '@/components/BakeBot/BakeBot';

export default function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <BakeBot />
        </>
    );
}

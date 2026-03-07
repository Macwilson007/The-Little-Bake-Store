import React, { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}

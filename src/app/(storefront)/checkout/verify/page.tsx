'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
    const reference = searchParams.get('reference');

    useEffect(() => {
        if (!reference) {
            setStatus('failed');
            return;
        }

        const verifyPayment = async () => {
            try {
                const res = await fetch(`/api/checkout/verify?reference=${reference}`);
                const data = await res.json();

                if (data.status === 'success') {
                    setStatus('success');
                    // Maybe clear cart here?
                } else {
                    setStatus('failed');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                setStatus('failed');
            }
        };

        verifyPayment();
    }, [reference]);

    return (
        <div className="verify-page container" style={{ padding: '100px 20px', textAlign: 'center' }}>
            {status === 'verifying' && (
                <div className="verify-card animate-pulse">
                    <span style={{ fontSize: '4rem' }}>⏳</span>
                    <h2>Verifying Payment...</h2>
                    <p>Please do not close this window.</p>
                </div>
            )}

            {status === 'success' && (
                <div className="verify-card animate-fade-in">
                    <span style={{ fontSize: '4rem' }}>✨</span>
                    <h2 style={{ color: 'var(--color-success)' }}>Payment Successful!</h2>
                    <p>Your order has been received and is being prepared with love.</p>
                    <div style={{ marginTop: '2rem' }}>
                        <Link href="/" className="btn btn-primary">Return Home</Link>
                    </div>
                </div>
            )}

            {status === 'failed' && (
                <div className="verify-card animate-fade-in">
                    <span style={{ fontSize: '4rem' }}>❌</span>
                    <h2 style={{ color: 'var(--color-error)' }}>Payment Failed</h2>
                    <p>Something went wrong with your transaction. Please try again or contact support.</p>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/checkout" className="btn btn-secondary">Try Again</Link>
                        <Link href="/contact" className="btn btn-primary">Contact Support</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function VerifyPaymentPage() {
    return (
        <Suspense fallback={<div>Loading verification...</div>}>
            <VerifyContent />
        </Suspense>
    );
}

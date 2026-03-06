import React from 'react';
import '../about/content.css';

export default function PrivacyPage() {
    return (
        <div className="content-page container">
            <h1>Privacy Policy</h1>
            <div className="content-section">
                <p>Last updated: October 2023</p>
                <p>The Little Bake Store operates the website and is committed to protecting your privacy. We collect personal information (name, email, address) solely for the purpose of fulfilling your orders and improving your customer experience.</p>
                <h2>Data Protection</h2>
                <p>We use industry-standard encryption to protect your payment details. We do not store your credit card information on our servers; payments are processed securely via Paystack.</p>
                <h2>Data Sharing</h2>
                <p>We never sell your data to third parties. We may share necessary delivery details with our logistics partners solely to fulfill your order.</p>
            </div>
        </div>
    );
}

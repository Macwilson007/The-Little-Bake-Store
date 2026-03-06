import React from 'react';
import '../about/content.css';

export default function RefundPage() {
    return (
        <div className="content-page container">
            <h1>Refund Policy</h1>
            <div className="content-section">
                <p>Due to the perishable nature of our products, we do not accept returns. However, your satisfaction is our top priority.</p>
                <h2>Quality Issues</h2>
                <p>If you receive a product that does not meet our quality standards, please contact us immediately upon receipt with photos. We will evaluate the issue and offer a replacement or store credit where appropriate.</p>
                <h2>Delivery Issues</h2>
                <p>If your order arrives heavily damaged due to transit, please refuse delivery and contact us immediately so we can dispatch a replacement.</p>
            </div>
        </div>
    );
}

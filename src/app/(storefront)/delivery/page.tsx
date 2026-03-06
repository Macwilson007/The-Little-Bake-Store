import React from 'react';

export default function DeliveryPage() {
    return (
        <div className="content-page container">
            <h1>Delivery & Shipping</h1>
            <div className="content-section">
                <h2>Abuja Deliveries</h2>
                <p>We offer same-day delivery for all orders placed before 2:00 PM (WAT), Monday through Saturday. Orders placed after 2:00 PM will be delivered the next business day.</p>
                <ul>
                    <li><strong>Standard Delivery:</strong> ₦2,000 (Delivered within 3-5 hours)</li>
                    <li><strong>Express Delivery:</strong> ₦3,500 (Delivered within 1 hour)</li>
                    <li><strong>Free Delivery:</strong> On all orders above ₦50,000</li>
                </ul>

                <h2>Store Pickup</h2>
                <p>You can choose to pick up your order at our Wuse 2 location free of charge. Please allow 2 hours for us to prepare your order. You will receive an SMS when your order is ready for pickup.</p>

                <h2>Outside Abuja</h2>
                <p>At this time, we only deliver delicate items (cakes, cupcakes) within Abuja. For dry goods like cookies and biscotti, nationwide shipping via DHL is available. Please email us for custom shipping arrangements.</p>
            </div>
        </div>
    );
}

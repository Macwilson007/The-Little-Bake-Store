import React from 'react';
import '../about/content.css';

export default function FAQPage() {
    return (
        <div className="content-page container">
            <h1>Frequently Asked Questions</h1>
            <div className="content-section">
                <h2>Ordering</h2>
                <div className="faq-item">
                    <p><strong>How far in advance should I order?</strong></p>
                    <p>Standard cakes and treats require 24-48 hours notice. Custom designs and elaborate birthday cakes should be ordered at least 7 days in advance. For wedding cakes, we recommend 1-2 months.</p>
                </div>

                <div className="faq-item">
                    <p><strong>Can I change my order after placing it?</strong></p>
                    <p>Minor changes can be made up to 48 hours before your delivery time. Significant design changes for custom cakes cannot be made within 5 days of the event.</p>
                </div>

                <h2>Delivery</h2>
                <div className="faq-item">
                    <p><strong>Where do you deliver?</strong></p>
                    <p>We deliver to all major areas in Abuja, including Wuse, Garki, Maitama, Asokoro, Gwarinpa, and Lugbe. Delivery fees vary based on distance.</p>
                </div>

                <div className="faq-item">
                    <p><strong>What happens if I'm not home during delivery?</strong></p>
                    <p>Our driver will attempt to contact you. If we cannot reach you, the order may be returned to our studio for pickup, and a redelivery fee will apply.</p>
                </div>

                <h2>Ingredients & Allergies</h2>
                <div className="faq-item">
                    <p><strong>Do you offer sugar-free or vegan options?</strong></p>
                    <p>Yes, we have a selection of vegan and sugar-free treats. Please check the 'Dietary' labels in our shop or ask BakeBot for current recommendations.</p>
                </div>

                <div className="faq-item">
                    <p><strong>What about nut allergies?</strong></p>
                    <p>We use nuts in our kitchen. While we can omit nuts from specific recipes, trace amounts may still be present. We do not recommend our products for individuals with severe nut allergies.</p>
                </div>

                <h2>Storage & Care</h2>
                <div className="faq-item">
                    <p><strong>How should I store my cake?</strong></p>
                    <p>Cakes should be kept in a cool, air-conditioned room or refrigerated. If refrigerated, let the cake sit at room temperature for 1-2 hours before serving for the best texture and flavor.</p>
                </div>
            </div>
        </div>
    );
}

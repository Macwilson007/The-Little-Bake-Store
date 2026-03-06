import React from 'react';
import './content.css';

export default function AboutPage() {
    return (
        <div className="content-page container">
            <h1>About The Little Bake Store</h1>
            <div className="content-section">
                <p>Welcome to The Little Bake Store, Abuja's premier destination for artisan baked goods. Founded in 2020 by Chef Amina, our mission is simple: to create moments of joy through the universal language of sweet treats.</p>
                <p>Every cake, cupcake, and pastry that leaves our kitchen is handcrafted using the finest locally-sourced ingredients and premium imports, such as Belgian chocolate and real Madagascar vanilla.</p>
                <h2>Our Promise</h2>
                <ul>
                    <li><strong>Quality:</strong> No shortcuts, no artificial preservatives, just real, wholesome baking.</li>
                    <li><strong>Freshness:</strong> Everything is baked fresh daily in small batches.</li>
                    <li><strong>Community:</strong> We believe in supporting local farmers and giving back to the Abuja community.</li>
                </ul>
                <p>Whether you're celebrating a milestone or just treating yourself on a Tuesday, we're here to make it special.</p>
            </div>
        </div>
    );
}

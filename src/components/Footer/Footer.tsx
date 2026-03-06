'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/products';
import './Footer.css';

export default function Footer() {
    const [settings, setSettings] = React.useState<any>(null);

    React.useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.settings) setSettings(data.settings);
            })
            .catch(err => console.error('Failed to load footer settings'));
    }, []);

    return (
        <footer className="footer" id="main-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand */}
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <span className="logo-icon">🧁</span>
                                <div>
                                    <span className="logo-name">The Little Bake Store</span>
                                    <span className="logo-tagline">Artisan Bakery • Abuja</span>
                                </div>
                            </div>
                            <p className="footer-desc">
                                Handcrafted with love in Abuja. We bring you freshly baked artisan treats made with premium ingredients, delivered right to your doorstep.
                            </p>
                            <div className="footer-social">
                                <a href={settings?.instagramUrl || "#"} aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href={settings?.twitterUrl || "#"} aria-label="Twitter" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                </a>
                                <a href={settings?.facebookUrl || "#"} aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a href={settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}` : "#"} aria-label="WhatsApp" className="social-link" target="_blank" rel="noopener noreferrer">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Shop</h4>
                            <ul className="footer-links">
                                {categories.map((cat) => (
                                    <li key={cat.slug}>
                                        <Link href={`/shop?category=${cat.slug}`}>{cat.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Company</h4>
                            <ul className="footer-links">
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                                <li><Link href="/delivery">Delivery Info</Link></li>
                                <li><Link href="/faq">FAQ</Link></li>
                                <li><Link href="/careers">Careers</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="footer-column">
                            <h4 className="footer-heading">Contact Us</h4>
                            <div className="footer-contact">
                                <div className="footer-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{settings?.contactAddress || 'Abuja, Nigeria'}</span>
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>{settings?.contactPhone || '+234 (0) 800 000 0000'}</span>
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <span>{settings?.contactEmail || 'hello@thelittlebakestore.ng'}</span>
                                </div>
                                <div className="footer-contact-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span>Mon - Sat: 7am - 8pm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
                <div className="container">
                    <div className="newsletter-inner">
                        <div className="newsletter-text">
                            <h3>Get 10% Off Your First Order</h3>
                            <p>Subscribe for sweet deals, new flavors & exclusive offers</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="newsletter-input"
                                id="newsletter-email"
                            />
                            <button type="submit" className="btn btn-highlight" id="newsletter-submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <p>&copy; 2026 The Little Bake Store. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                            <Link href="/refund">Refund Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import './Header.css';

export default function Header() {
    const { itemCount, toggleCart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMegaMenuEnter = () => {
        if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
        setMegaMenuOpen(true);
    };

    const handleMegaMenuLeave = () => {
        megaMenuTimeout.current = setTimeout(() => {
            setMegaMenuOpen(false);
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
        };
    }, []);

    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

    // Close mobile menu on route change
    useEffect(() => {
        const timer = setTimeout(() => {
            setMenuOpen(false);
            setMegaMenuOpen(false);
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <span>🚚 Same-Day Delivery in Abuja | Freshly Baked Daily ✨</span>
            </div>

            {/* Header */}
            <header className="header" id="main-header">
                <div className="header-inner container-wide">
                    {/* Hamburger */}
                    <button
                        className="hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        id="hamburger-btn"
                    >
                        <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
                        <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
                    </button>

                    {/* Logo */}
                    <Link href="/" className="logo" id="logo">
                        <span className="logo-icon">🧁</span>
                        <div className="logo-text">
                            <span className="logo-name">The Little Bake Store</span>
                            <span className="logo-tagline">Artisan Bakery • Abuja</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop" id="desktop-nav">
                        <Link href="/" className="nav-link">Home</Link>
                        <div
                            className="nav-link nav-link-shop"
                            onMouseEnter={handleMegaMenuEnter}
                            onMouseLeave={handleMegaMenuLeave}
                        >
                            <Link href="/shop">Shop</Link>
                            <svg className="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>

                            {/* Mega Menu */}
                            <div
                                className={`mega-menu ${megaMenuOpen ? 'open' : ''}`}
                                ref={megaMenuRef}
                                onMouseEnter={handleMegaMenuEnter}
                                onMouseLeave={handleMegaMenuLeave}
                            >
                                <div className="mega-menu-inner">
                                    {categories.map((cat) => (
                                        <div key={cat.slug} className="mega-menu-column">
                                            <Link href={`/shop?category=${cat.slug}`} className="mega-menu-title">
                                                {cat.name}
                                            </Link>
                                            <ul className="mega-menu-list">
                                                {cat.subcategories.map((sub) => (
                                                    <li key={sub.slug}>
                                                        <Link
                                                            href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                                            className="mega-menu-link"
                                                            onClick={() => setMegaMenuOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    <div className="mega-menu-promo">
                                        <div className="mega-menu-promo-card">
                                            <span className="mega-menu-promo-badge">Special Offer</span>
                                            <h4>Party Dessert Box</h4>
                                            <p>Save 17% on our curated party selection</p>
                                            <Link href="/shop/party-dessert-box" className="btn btn-highlight btn-sm">
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {categories.map((cat) => (
                            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="nav-link">
                                {cat.name}
                            </Link>
                        ))}
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        <button
                            className="header-action-btn"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search"
                            id="search-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </button>
                        <Link href="/wishlist" className="header-action-btn" aria-label="Wishlist" id="wishlist-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </Link>
                        <button
                            className="header-action-btn cart-btn"
                            onClick={toggleCart}
                            aria-label="Cart"
                            id="cart-btn"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="cart-badge">{itemCount}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="search-overlay animate-slide-down">
                        <div className="container">
                            <div className="search-bar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search for cakes, cupcakes, pastries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                    autoFocus
                                    id="search-input"
                                />
                                <button onClick={() => setSearchOpen(false)} className="search-close" aria-label="Close search">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
                <div className="mobile-menu-header">
                    <span className="logo-name">The Little Bake Store</span>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <nav className="mobile-nav">
                    <Link href="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/shop" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Shop All</Link>
                    {categories.map((cat) => (
                        <div key={cat.slug} className="mobile-nav-group">
                            <Link href={`/shop?category=${cat.slug}`} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                                {cat.name}
                            </Link>
                            <div className="mobile-nav-sub">
                                {cat.subcategories.map((sub) => (
                                    <Link
                                        key={sub.slug}
                                        href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                        className="mobile-nav-sub-link"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Link href="/contact" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
                </nav>
            </div>
            {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
        </>
    );
}

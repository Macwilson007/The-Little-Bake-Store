'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard/ProductCard';
import './product.css';

export default function ProductPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addItem } = useCart();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // We'll search by slug. Our current [id] route actually handles ID, 
                // so I'll create a dedicated slug route or filter on products.
                const res = await fetch('/api/products');
                const products = await res.json();
                const found = products.find((p: any) => p.slug === slug);
                setProduct(found);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading product...</div>;

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <Link href="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
            </div>
        );
    }

    const relatedProducts: any[] = []; // We can implement this later with real data
    const categoryData = product.category;


    const handleAddToCart = () => {
        addItem(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="product-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="breadcrumb-sep">/</span>
                        <Link href="/shop">Shop</Link>
                        {categoryData && (
                            <>
                                <span className="breadcrumb-sep">/</span>
                                <Link href={`/shop?category=${categoryData.slug}`}>{categoryData.name}</Link>
                            </>
                        )}
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-current">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container">
                {/* Product Main */}
                <div className="product-main">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="product-gallery-main" style={{ position: 'relative' }}>
                            {product.image ? (
                                <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
                            ) : (
                                <div className="product-gallery-placeholder">
                                    {product.category === 'cakes' && '🎂'}
                                    {product.category === 'cupcakes' && '🧁'}
                                    {product.category === 'desserts' && '🍮'}
                                    {product.category === 'pastries' && '🥐'}
                                    {product.category === 'event-packages' && '🎁'}
                                </div>
                            )}
                            {product.badge && (
                                <span className={`product-badge badge-${product.badge}`}>
                                    {product.badge === 'bestseller' ? '🔥 Best Seller' :
                                        product.badge === 'new' ? '✨ New' :
                                            product.badge === 'sale' ? '💰 Sale' :
                                                product.badge === 'popular' ? '⭐ Popular' : product.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <div className="product-info-head">
                            <div className="product-rating-full">
                                <div className="stars">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                                    ))}
                                </div>
                                <span className="rating-text">{product.rating} ({product.reviewCount} reviews)</span>
                            </div>
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-price-main">
                                <span className="product-current-price">{formatPrice(product.price)}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                                        <span className="product-discount">
                                            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="product-short-desc">{product.shortDescription}</p>

                        {/* Quantity & Add to Cart */}
                        <div className="product-actions">
                            <div className="product-qty">
                                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span className="qty-value">{quantity}</span>
                                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button
                                className={`btn btn-primary btn-lg product-atc-btn ${addedToCart ? 'added' : ''}`}
                                onClick={handleAddToCart}
                            >
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                            <button
                                className={`btn-icon product-wish-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                aria-label="Add to wishlist"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="product-delivery">
                            <div className="delivery-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <span>Same-day delivery in Abuja (order before 2pm)</span>
                            </div>
                            <div className="delivery-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>Quality guaranteed — freshly baked to order</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="product-tabs">
                    <div className="product-tabs-header">
                        {['description', 'ingredients', 'delivery', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                className={`product-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="product-tab-content">
                        {activeTab === 'description' && (
                            <div className="tab-description">
                                <p>{product.description}</p>
                                <p style={{ marginTop: '1rem' }}><strong>Serving Suggestion:</strong> {product.servingSuggestions}</p>
                            </div>
                        )}
                        {activeTab === 'ingredients' && (
                            <div className="tab-ingredients">
                                <ul>
                                    {product.ingredients.map((ing: string) => (
                                        <li key={ing}>{ing}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'delivery' && (
                            <div className="tab-delivery">
                                <h4>Delivery Information</h4>
                                <ul>
                                    <li>Same-day delivery available for orders placed before 2pm</li>
                                    <li>Delivery fee: ₦2,000 within Abuja</li>
                                    <li>Free delivery on orders above ₦50,000</li>
                                    <li>Delivery hours: 9am - 7pm Monday to Saturday</li>
                                    <li>We deliver to all areas in Abuja</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="tab-reviews">
                                <div className="review-summary">
                                    <div className="review-avg">
                                        <span className="review-avg-num">{product.rating}</span>
                                        <div className="stars">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                                            ))}
                                        </div>
                                        <span className="review-avg-count">{product.reviewCount} reviews</span>
                                    </div>
                                </div>
                                <p className="review-placeholder">Customer reviews will appear here after purchase.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h2>You Might Also Like</h2>
                        <div className="section-divider" style={{ margin: '1rem 0 2rem' }}></div>
                        <div className="grid grid-4">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

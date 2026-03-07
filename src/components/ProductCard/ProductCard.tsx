'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1500);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="product-card" id={`product-${product.id}`}>
            <Link href={`/shop/${product.slug}`} className="product-card-link">
                <div className="product-card-image" style={{ position: 'relative' }}>
                    {product.image ? (
                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 25vw" />
                    ) : (
                        <div className="product-card-image-placeholder">
                            {(product.category?.slug === 'cakes' || product.category === 'cakes') && '🎂'}
                            {(product.category?.slug === 'cupcakes' || product.category === 'cupcakes') && '🧁'}
                            {(product.category?.slug === 'desserts' || product.category === 'desserts') && '🍮'}
                            {(product.category?.slug === 'pastries' || product.category === 'pastries') && '🥐'}
                            {(product.category?.slug === 'event-packages' || product.category === 'event-packages') && '🎁'}
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

                    <div className="product-card-actions">
                        <button
                            className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={handleWishlist}
                            aria-label="Add to wishlist"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>

                    <button
                        className={`product-add-btn ${addedToCart ? 'added' : ''}`}
                        onClick={handleAddToCart}
                    >
                        {addedToCart ? (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Added!
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add to Cart
                            </>
                        )}
                    </button>
                </div>

                <div className="product-card-info">
                    <div className="product-card-rating">
                        <div className="stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                            ))}
                        </div>
                        <span className="review-count">({product.reviewCount})</span>
                    </div>
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-desc">{product.shortDescription}</p>
                    <div className="product-card-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

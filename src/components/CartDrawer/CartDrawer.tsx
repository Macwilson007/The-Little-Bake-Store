'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import Link from 'next/link';
import './CartDrawer.css';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, deliveryFee, total, itemCount } = useCart();

    return (
        <>
            {isOpen && <div className="cart-overlay" onClick={closeCart} />}
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cart-drawer">
                <div className="cart-drawer-header">
                    <h3>Your Cart ({itemCount})</h3>
                    <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <span className="cart-empty-icon">🛒</span>
                        <p>Your cart is empty</p>
                        <span className="cart-empty-sub">Add some delicious treats!</span>
                        <button className="btn btn-primary" onClick={closeCart}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map((item) => (
                                <div key={item.product.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <div className="cart-item-image-placeholder">🧁</div>
                                    </div>
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.product.name}</h4>
                                        <p className="cart-item-price">{formatPrice(item.product.price)}</p>
                                        <div className="cart-item-quantity">
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-item-right">
                                        <span className="cart-item-total">
                                            {formatPrice(item.product.price * item.quantity)}
                                        </span>
                                        <button
                                            className="cart-item-remove"
                                            onClick={() => removeItem(item.product.id)}
                                            aria-label="Remove item"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Recommendation */}
                        <div className="cart-recommendation">
                            <p className="cart-rec-label">🤖 BakeBot suggests:</p>
                            <p className="cart-rec-text">Add a Dessert Cup Set for the perfect combo!</p>
                        </div>

                        <div className="cart-summary">
                            <div className="cart-summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Delivery Fee</span>
                                <span>{formatPrice(deliveryFee)}</span>
                            </div>
                            <div className="cart-summary-row cart-summary-total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <Link href="/checkout" className="btn btn-primary btn-lg cart-checkout-btn" onClick={closeCart}>
                                Proceed to Checkout
                            </Link>
                            <button className="cart-continue-btn" onClick={closeCart}>
                                Continue Shopping
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

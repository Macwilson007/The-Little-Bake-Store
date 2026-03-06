'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import './checkout.css';

type CheckoutStep = 'info' | 'address' | 'delivery' | 'payment';

export default function CheckoutPage() {
    const { items, subtotal, deliveryFee, total, itemCount } = useCart();
    const [step, setStep] = useState<CheckoutStep>('info');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Abuja',
        state: 'FCT',
        deliveryOption: 'standard',
        paymentMethod: 'card',
    });

    const steps: { key: CheckoutStep; label: string; number: number }[] = [
        { key: 'info', label: 'Information', number: 1 },
        { key: 'address', label: 'Address', number: 2 },
        { key: 'delivery', label: 'Delivery', number: 3 },
        { key: 'payment', label: 'Payment', number: 4 },
    ];

    const currentStepIndex = steps.findIndex((s) => s.key === step);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setStep(steps[nextIndex].key);
        }
    };

    const handleBack = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setStep(steps[prevIndex].key);
        }
    };

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    customer: formData,
                    subtotal,
                    deliveryFee,
                    total,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to initialize payment: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('An error occurred during checkout.');
        } finally {
            setLoading(false);
        }
    };

    if (itemCount === 0) {
        return (
            <div className="checkout-empty container">
                <span className="checkout-empty-icon">🛒</span>
                <h2>Your cart is empty</h2>
                <p>Add some delicious treats before checking out!</p>
                <Link href="/shop" className="btn btn-primary btn-lg">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                {/* Progress Steps */}
                <div className="checkout-progress" id="checkout-progress">
                    {steps.map((s, i) => (
                        <div
                            key={s.key}
                            className={`progress-step ${i <= currentStepIndex ? 'active' : ''} ${i < currentStepIndex ? 'completed' : ''}`}
                        >
                            <div className="progress-step-num">
                                {i < currentStepIndex ? '✓' : s.number}
                            </div>
                            <span className="progress-step-label">{s.label}</span>
                            {i < steps.length - 1 && <div className="progress-line"></div>}
                        </div>
                    ))}
                </div>

                <div className="checkout-layout">
                    {/* Form */}
                    <div className="checkout-form">
                        {step === 'info' && (
                            <div className="checkout-section animate-fade-in">
                                <h3>Customer Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input className="form-input" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+234 812 345 6789" required />
                                </div>
                            </div>
                        )}

                        {step === 'address' && (
                            <div className="checkout-section animate-fade-in">
                                <h3>Delivery Address</h3>
                                <div className="form-group">
                                    <label className="form-label">Street Address</label>
                                    <input className="form-input" name="address" value={formData.address} onChange={handleChange} placeholder="123 Baker Street" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">City</label>
                                        <input className="form-input" name="city" value={formData.city} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">State</label>
                                        <input className="form-input" name="state" value={formData.state} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 'delivery' && (
                            <div className="checkout-section animate-fade-in">
                                <h3>Delivery Option</h3>
                                <div className="delivery-options">
                                    <label className={`delivery-option ${formData.deliveryOption === 'standard' ? 'selected' : ''}`}>
                                        <input type="radio" name="deliveryOption" value="standard" checked={formData.deliveryOption === 'standard'} onChange={handleChange} />
                                        <div className="delivery-option-content">
                                            <div>
                                                <strong>Standard Delivery</strong>
                                                <p>Delivered within 2-4 hours</p>
                                            </div>
                                            <span className="delivery-option-price">₦2,000</span>
                                        </div>
                                    </label>
                                    <label className={`delivery-option ${formData.deliveryOption === 'express' ? 'selected' : ''}`}>
                                        <input type="radio" name="deliveryOption" value="express" checked={formData.deliveryOption === 'express'} onChange={handleChange} />
                                        <div className="delivery-option-content">
                                            <div>
                                                <strong>Express Delivery</strong>
                                                <p>Delivered within 1 hour</p>
                                            </div>
                                            <span className="delivery-option-price">₦3,500</span>
                                        </div>
                                    </label>
                                    <label className={`delivery-option ${formData.deliveryOption === 'pickup' ? 'selected' : ''}`}>
                                        <input type="radio" name="deliveryOption" value="pickup" checked={formData.deliveryOption === 'pickup'} onChange={handleChange} />
                                        <div className="delivery-option-content">
                                            <div>
                                                <strong>Store Pickup</strong>
                                                <p>Pick up at our Wuse 2 location</p>
                                            </div>
                                            <span className="delivery-option-price">Free</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {step === 'payment' && (
                            <div className="checkout-section animate-fade-in">
                                <h3>Payment Method</h3>
                                <div className="payment-methods">
                                    <label className={`payment-method ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                                        <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                                        <div className="payment-method-content">
                                            <span className="payment-icon">💳</span>
                                            <span>Card Payment</span>
                                        </div>
                                    </label>
                                    <label className={`payment-method ${formData.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                                        <input type="radio" name="paymentMethod" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={handleChange} />
                                        <div className="payment-method-content">
                                            <span className="payment-icon">🏦</span>
                                            <span>Bank Transfer</span>
                                        </div>
                                    </label>
                                    <label className={`payment-method ${formData.paymentMethod === 'ussd' ? 'selected' : ''}`}>
                                        <input type="radio" name="paymentMethod" value="ussd" checked={formData.paymentMethod === 'ussd'} onChange={handleChange} />
                                        <div className="payment-method-content">
                                            <span className="payment-icon">📱</span>
                                            <span>USSD</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="paystack-badge">
                                    <span>🔒 Secured by Paystack</span>
                                </div>

                                {/* AI Upsell */}
                                <div className="checkout-upsell">
                                    <h4>🤖 BakeBot suggests adding:</h4>
                                    <div className="upsell-items">
                                        <div className="upsell-item">
                                            <span className="upsell-icon">🎁</span>
                                            <div>
                                                <strong>Gift Packaging</strong>
                                                <span>₦1,500</span>
                                            </div>
                                            <button className="btn btn-sm btn-secondary">Add</button>
                                        </div>
                                        <div className="upsell-item">
                                            <span className="upsell-icon">🧁</span>
                                            <div>
                                                <strong>Extra Cupcake (3)</strong>
                                                <span>₦3,500</span>
                                            </div>
                                            <button className="btn btn-sm btn-secondary">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="checkout-nav">
                            {currentStepIndex > 0 && (
                                <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                            )}
                            <div style={{ flex: 1 }}></div>
                            {step !== 'payment' ? (
                                <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue</button>
                            ) : (
                                <button
                                    className="btn btn-highlight btn-lg"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="checkout-summary">
                        <div className="checkout-summary-card">
                            <h3>Order Summary</h3>
                            <div className="checkout-items">
                                {items.map((item) => (
                                    <div key={item.product.id} className="checkout-item">
                                        <div className="checkout-item-img">
                                            <span>{item.quantity}×</span>
                                        </div>
                                        <div className="checkout-item-info">
                                            <span className="checkout-item-name">{item.product.name}</span>
                                            <span className="checkout-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="checkout-totals">
                                <div className="checkout-total-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="checkout-total-row">
                                    <span>Delivery</span>
                                    <span>{formatPrice(deliveryFee)}</span>
                                </div>
                                <div className="checkout-total-row checkout-grand-total">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

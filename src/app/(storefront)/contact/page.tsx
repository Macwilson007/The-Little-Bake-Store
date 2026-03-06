'use client';

import React, { useState } from 'react';
import './contact.css';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Reach out for custom orders, event catering, or general inquiries.</p>
                </div>

                <div className="contact-layout">
                    <div className="contact-info">
                        <div className="contact-card">
                            <div className="contact-icon">📍</div>
                            <h3>Visit Us</h3>
                            <p>123 Gourmet Lane,<br />Wuse 2, Abuja, FCT<br />Nigeria</p>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">📞</div>
                            <h3>Call Us</h3>
                            <p>+234 (0) 812 345 6789<br />+234 (0) 903 456 7890</p>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">✉️</div>
                            <h3>Email Us</h3>
                            <p>hello@thelittlebakestore.ng<br />orders@thelittlebakestore.ng</p>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">🕒</div>
                            <h3>Opening Hours</h3>
                            <p>Monday - Saturday: 7:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 5:00 PM</p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <h2>Send us a Message</h2>
                        {submitted ? (
                            <div className="success-message">
                                <span className="success-icon">✓</span>
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input className="form-input" required placeholder="Jane" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input className="form-input" required placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" type="email" required placeholder="jane@example.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select className="form-input" required>
                                        <option value="">Select an option</option>
                                        <option value="custom-order">Custom Cake Order</option>
                                        <option value="event">Event Catering</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-input" required rows={6} placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

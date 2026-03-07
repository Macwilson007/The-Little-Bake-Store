'use client';

import React from 'react';
import './admin.css';

export default function AdminDashboard() {
    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Dashboard Overview</h1>
                <div className="admin-user">
                    <span>Admin User</span>
                    <div className="admin-avatar">A</div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="admin-grid admin-stats">
                <div className="admin-card">
                    <h4>Daily Revenue</h4>
                    <div className="stat-value">₦425,000</div>
                    <div className="stat-trend positive">↑ 12% vs yesterday</div>
                </div>
                <div className="admin-card">
                    <h4>Monthly Revenue</h4>
                    <div className="stat-value">₦12,450,000</div>
                    <div className="stat-trend positive">↑ 8% vs last month</div>
                </div>
                <div className="admin-card">
                    <h4>Customer Growth</h4>
                    <div className="stat-value">+145</div>
                    <div className="stat-trend positive">↑ This month</div>
                </div>
                <div className="admin-card">
                    <h4>Conversion Rate</h4>
                    <div className="stat-value">3.2%</div>
                    <div className="stat-trend negative">↓ 0.4% vs last week</div>
                </div>
            </div>

            <div className="admin-grid-2">
                {/* AI Forecasting */}
                <div className="admin-card ai-card">
                    <div className="ai-header">
                        <h3>🤖 AI Sales Forecasting</h3>
                        <span className="badge badge-new">Grok Powered</span>
                    </div>
                    <div className="ai-content">
                        <div className="ai-prediction">
                            <h4>Next Week Revenue Prediction</h4>
                            <div className="prediction-value">₦3,200,000</div>
                            <p>Expected 15% increase due to upcoming Valentine&apos;s weekend.</p>
                        </div>

                        <div className="ai-list">
                            <h4>Predicted Best Sellers</h4>
                            <ul>
                                <li>1. Red Velvet Layer Cake (Trend: Very High)</li>
                                <li>2. Strawberries & Cream Cupcakes</li>
                                <li>3. Party Dessert Box</li>
                            </ul>
                        </div>

                        <div className="ai-alerts">
                            <h4>⚠️ Inventory Restock Alerts</h4>
                            <div className="alert-item">
                                <span>Belgian Dark Chocolate</span>
                                <button className="btn btn-sm btn-secondary">Order Now</button>
                            </div>
                            <div className="alert-item">
                                <span>Premium Vanilla Extract</span>
                                <button className="btn btn-sm btn-secondary">Order Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="admin-card">
                    <h3>Recent Orders</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-8942</td>
                                <td>Amara Okafor</td>
                                <td>₦35,000</td>
                                <td><span className="status-badge preparing">Preparing</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-8941</td>
                                <td>Chukwudi Eze</td>
                                <td>₦55,000</td>
                                <td><span className="status-badge delivered">Delivered</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-8940</td>
                                <td>Funke Adeyemi</td>
                                <td>₦12,000</td>
                                <td><span className="status-badge out-for-delivery">Out for Delivery</span></td>
                            </tr>
                            <tr>
                                <td>#ORD-8939</td>
                                <td>Ibrahim Musa</td>
                                <td>₦28,000</td>
                                <td><span className="status-badge delivered">Delivered</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

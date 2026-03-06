'use client';

import React from 'react';
import '../admin.css';

export default function AnalyticsPage() {
    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Business Analytics</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Current Month</option>
                        <option>Year to Date</option>
                    </select>
                </div>
            </div>

            <div className="admin-grid">
                <div className="admin-card">
                    <h4>Total Revenue</h4>
                    <div className="stat-value">₦1,245,000</div>
                    <div className="stat-trend positive">↑ 15.2%</div>
                </div>
                <div className="admin-card">
                    <h4>Avg. Order Value</h4>
                    <div className="stat-value">₦15,400</div>
                    <div className="stat-trend positive">↑ 4.1%</div>
                </div>
                <div className="admin-card">
                    <h4>Total Orders</h4>
                    <div className="stat-value">84</div>
                    <div className="stat-trend positive">↑ 12%</div>
                </div>
                <div className="admin-card">
                    <h4>New Customers</h4>
                    <div className="stat-value">22</div>
                    <div className="stat-trend negative">↓ 2.4%</div>
                </div>
            </div>

            <div className="admin-grid-2">
                <div className="admin-card">
                    <h3>Popular Products</h3>
                    <div style={{ marginTop: '1rem' }}>
                        {[
                            { name: 'Classic Chocolate Cake', sales: 45, revenue: '₦1,125,000' },
                            { name: 'Red Velvet Layer Cake', sales: 32, revenue: '₦960,000' },
                            { name: 'Strawberry Cupcakes', sales: 28, revenue: '₦336,000' },
                            { name: 'Party Dessert Box', sales: 15, revenue: '₦525,000' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.sales} units sold</div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#3A1F1D' }}>{item.revenue}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-card ai-card">
                    <div className="ai-header">
                        <h3>🤖 AI Insights</h3>
                        <span className="badge badge-new" style={{ background: '#6b21a8', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>Powered by Grok</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <p><strong>Revenue Optimization:</strong> Your "Afternoon Tea" category is underperforming. Consider a limited-time 15% discount on weekdays between 2 PM and 4 PM to boost sales.</p>
                        <p style={{ marginTop: '1rem' }}><strong>Customer Behavior:</strong> 65% of your customers who buy Chocolate Cakes also purchase Cupcakes within 14 days. Suggesting a "Party Bundle" at checkout could increase AOV by 20%.</p>
                        <p style={{ marginTop: '1rem' }}><strong>Inventory Forecast:</strong> Demand for Red Velvet is expected to peak this weekend. Ensure you have 30% more stock than usual.</p>
                    </div>
                </div>
            </div>

            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <h3>Sales Performance (Monthly)</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '2rem', padding: '0 1rem' }}>
                    {[60, 45, 80, 55, 90, 70, 85].map((height, idx) => (
                        <div key={idx} style={{ flex: 1, background: '#D6A36D', height: `${height}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                            <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: '#666' }}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

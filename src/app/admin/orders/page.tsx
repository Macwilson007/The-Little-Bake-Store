'use client';

import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/data/products';
import '../admin.css';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchOrders();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (loading) return <div className="admin-page">Loading orders...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Orders Management</h1>
            </div>

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td><strong>{order.orderNumber}</strong></td>
                                <td>
                                    {order.firstName} {order.lastName}<br />
                                    <small>{order.email}</small>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{formatPrice(order.totalAmount)}</td>
                                <td>
                                    <span className={`status-badge ${order.paymentStatus === 'PAID' ? 'status-paid' : 'status-unpaid'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                        className="status-select"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="PREPARING">Preparing</option>
                                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

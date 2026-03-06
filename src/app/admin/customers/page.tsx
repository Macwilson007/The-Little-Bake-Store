'use client';

import React from 'react';
import '../admin.css';

export default function CustomersPage() {
    const customers = [
        { id: 1, name: 'Amara Okafor', email: 'amara@example.com', orders: 12, totalSpent: '₦145,000', status: 'Active' },
        { id: 2, name: 'Chukwudi Eze', email: 'chukwudi@example.com', orders: 8, totalSpent: '₦92,000', status: 'Active' },
        { id: 3, name: 'Funke Adeyemi', email: 'funke@example.com', orders: 5, totalSpent: '₦45,500', status: 'Inactive' },
        { id: 4, name: 'Ibrahim Musa', email: 'ibrahim@example.com', orders: 15, totalSpent: '₦210,000', status: 'Active' },
        { id: 5, name: 'Chioma Adebayo', email: 'chioma@example.com', orders: 3, totalSpent: '₦22,000', status: 'Active' },
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Customer Management</h1>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', background: '#3A1F1D', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Export CSV
                </button>
            </div>

            <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>All Customers</h3>
                    <input
                        type="text"
                        placeholder="Search customers..."
                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', width: '300px' }}
                    />
                </div>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.orders}</td>
                                <td>{customer.totalSpent}</td>
                                <td>
                                    <span className={`status-badge ${customer.status === 'Active' ? 'delivered' : 'preparing'}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    <button style={{ background: 'none', border: 'none', color: '#3A1F1D', cursor: 'pointer', fontWeight: 'bold' }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
